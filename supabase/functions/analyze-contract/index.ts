import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get user from auth header
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { contractText, industryType, fileName } = await req.json();

    if (!contractText) {
      throw new Error("Contract text is required");
    }

    // First, save the contract to database
    const { data: contractData, error: contractError } = await supabaseClient
      .from('contracts')
      .insert({
        user_id: user.id,
        title: fileName || 'Uploaded Contract',
        content: contractText,
        file_name: fileName,
        status: 'active'
      })
      .select()
      .single();

    if (contractError) {
      throw contractError;
    }

    // Start analysis in database
    const { data: analysisData, error: analysisError } = await supabaseClient
      .from('contract_analyses')
      .insert({
        user_id: user.id,
        contract_id: contractData.id,
        status: 'pending'
      })
      .select()
      .single();

    if (analysisError) {
      throw analysisError;
    }

    const startTime = Date.now();

    // Analyze with OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: `You are an expert legal contract analyst specializing in ${industryType} contracts. Analyze the provided contract and return a JSON response with the following structure:
            {
              "overallRisk": "low|medium|high",
              "riskScore": 1-100,
              "plainEnglishSummary": "A clear, non-technical explanation of what this contract means",
              "legalIssues": [
                {
                  "type": "Issue category",
                  "description": "Detailed description",
                  "risk": "low|medium|high",
                  "suggestion": "Specific recommendation"
                }
              ],
              "recommendations": [
                {
                  "clause": "Section reference",
                  "currentText": "Current problematic text",
                  "suggestedText": "Improved version",
                  "reasoning": "Why this change helps"
                }
              ]
            }
            
            Focus on practical risks and actionable advice. Be specific about clauses and provide concrete suggestions.`
          },
          {
            role: 'user',
            content: `Please analyze this ${industryType} contract:\n\n${contractText}`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const aiResult = await response.json();
    const analysis = JSON.parse(aiResult.choices[0].message.content);
    
    const processingTime = Date.now() - startTime;

    // Update analysis with results
    const { error: updateError } = await supabaseClient
      .from('contract_analyses')
      .update({
        status: 'completed',
        risk_score: analysis.riskScore,
        analysis_summary: analysis.plainEnglishSummary,
        legal_issues: analysis.legalIssues,
        recommendations: analysis.recommendations,
        processing_time_ms: processingTime,
        completed_at: new Date().toISOString(),
        ai_model_version: 'gpt-4.1-2025-04-14'
      })
      .eq('id', analysisData.id);

    if (updateError) {
      throw updateError;
    }

    // Return formatted response for frontend
    const formattedResponse = {
      fileName: fileName || 'Uploaded Contract',
      overallRisk: analysis.overallRisk,
      riskyClauses: analysis.legalIssues,
      plainEnglishSummary: analysis.plainEnglishSummary,
      negotiationPoints: analysis.recommendations
    };

    return new Response(JSON.stringify(formattedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in analyze-contract function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});