import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

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

    // Analyze contract using simple rule-based analysis (free alternative)
    const analysis = analyzeContractRuleBased(contractText, industryType);
    
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
        ai_model_version: 'rule-based-v1'
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

// Simple rule-based contract analysis function (free alternative)
function analyzeContractRuleBased(contractText: string, industryType: string) {
  const lowerText = contractText.toLowerCase();
  const issues = [];
  const recommendations = [];
  let riskScore = 20; // Base risk

  // Common risky terms
  const riskyTerms = [
    { term: 'liquidated damages', risk: 'high', score: 20 },
    { term: 'unlimited liability', risk: 'high', score: 25 },
    { term: 'indemnification', risk: 'medium', score: 15 },
    { term: 'non-compete', risk: 'medium', score: 10 },
    { term: 'automatic renewal', risk: 'medium', score: 10 },
    { term: 'penalty', risk: 'high', score: 15 },
    { term: 'force majeure', risk: 'low', score: 5 },
    { term: 'arbitration', risk: 'medium', score: 8 }
  ];

  riskyTerms.forEach(({ term, risk, score }) => {
    if (lowerText.includes(term)) {
      riskScore += score;
      issues.push({
        type: 'Contract Clause',
        description: `Contains ${term} clause which may have implications`,
        risk: risk,
        suggestion: `Review the ${term} clause carefully and consider negotiating terms`
      });
    }
  });

  // Industry-specific checks
  if (industryType.toLowerCase().includes('tech')) {
    if (lowerText.includes('intellectual property') || lowerText.includes('ip')) {
      issues.push({
        type: 'IP Rights',
        description: 'Intellectual property clauses detected',
        risk: 'medium',
        suggestion: 'Ensure IP ownership and licensing terms are clearly defined'
      });
    }
  }

  // Generate recommendations
  if (riskScore > 50) {
    recommendations.push({
      clause: 'Overall Contract',
      currentText: 'Multiple high-risk clauses identified',
      suggestedText: 'Consider legal review before signing',
      reasoning: 'High risk score indicates potential legal complications'
    });
  }

  // Determine overall risk
  let overallRisk = 'low';
  if (riskScore > 70) overallRisk = 'high';
  else if (riskScore > 40) overallRisk = 'medium';

  return {
    overallRisk,
    riskScore: Math.min(riskScore, 100),
    plainEnglishSummary: `This ${industryType} contract contains ${issues.length} potential issues. The contract appears to be ${overallRisk} risk based on the clauses identified. Key areas of concern include liability, payment terms, and termination conditions.`,
    legalIssues: issues,
    recommendations: recommendations.length > 0 ? recommendations : [{
      clause: 'General Recommendation',
      currentText: 'Standard contract terms',
      suggestedText: 'Review all terms carefully',
      reasoning: 'Always understand all contract terms before signing'
    }]
  };
}