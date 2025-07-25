import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Contract {
  id: string;
  title: string;
  file_name: string;
  created_at: string;
  status: string;
  contract_analyses: Array<{
    id: string;
    status: string;
    risk_score: number | null;
    analysis_summary: string | null;
    legal_issues: any;
    recommendations: any;
    completed_at: string | null;
  }>;
}

export const Dashboard = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchContracts();
    }
  }, [user]);

  const fetchContracts = async () => {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .select(`
          id,
          title,
          file_name,
          created_at,
          status,
          contract_analyses (
            id,
            status,
            risk_score,
            analysis_summary,
            legal_issues,
            recommendations,
            completed_at
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContracts(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading contracts",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeVariant = (riskScore: number | null) => {
    if (!riskScore) return "outline";
    if (riskScore >= 70) return "destructive";
    if (riskScore >= 40) return "outline";
    return "secondary";
  };

  const getRiskLevel = (riskScore: number | null) => {
    if (!riskScore) return "No Score";
    if (riskScore >= 70) return "High Risk";
    if (riskScore >= 40) return "Medium Risk";
    return "Low Risk";
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading your contracts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Contract Dashboard</h1>
        <p className="text-muted-foreground">
          View and manage your uploaded contracts and their analyses
        </p>
      </div>

      {contracts.length === 0 ? (
        <Card className="p-8 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No contracts yet</h2>
          <p className="text-muted-foreground mb-4">
            Upload your first contract to get started with AI-powered analysis
          </p>
          <Button onClick={() => window.location.href = '/demo'}>
            Upload Contract
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6">
          {contracts.map((contract) => {
            const latestAnalysis = contract.contract_analyses[0];
            
            return (
              <Card key={contract.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">{contract.title}</h3>
                    </div>
                    {contract.file_name && (
                      <p className="text-sm text-muted-foreground mb-2">
                        File: {contract.file_name}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Uploaded {format(new Date(contract.created_at), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {latestAnalysis ? (
                      <>
                        <Badge variant={getRiskBadgeVariant(latestAnalysis.risk_score)}>
                          {getRiskLevel(latestAnalysis.risk_score)} 
                          {latestAnalysis.risk_score && ` (${latestAnalysis.risk_score})`}
                        </Badge>
                        {latestAnalysis.status === 'completed' ? (
                          <div className="flex items-center gap-1 text-sm text-legal-safe">
                            <CheckCircle className="w-4 h-4" />
                            <span>Analysis Complete</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-sm text-primary">
                            <Clock className="w-4 h-4" />
                            <span>Analyzing...</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <Badge variant="outline">No Analysis</Badge>
                    )}
                  </div>
                </div>

                {latestAnalysis && latestAnalysis.status === 'completed' && latestAnalysis.analysis_summary && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Analysis Summary</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {latestAnalysis.analysis_summary}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4 text-legal-warning" />
                          Legal Issues ({Array.isArray(latestAnalysis.legal_issues) ? latestAnalysis.legal_issues.length : 0})
                        </h5>
                        {Array.isArray(latestAnalysis.legal_issues) && latestAnalysis.legal_issues.slice(0, 2).map((issue: any, index: number) => (
                          <div key={index} className="text-sm p-2 bg-muted rounded mb-1">
                            <span className="font-medium">{issue.type}:</span> {issue.description}
                          </div>
                        ))}
                        {Array.isArray(latestAnalysis.legal_issues) && latestAnalysis.legal_issues.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{latestAnalysis.legal_issues.length - 2} more issues
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-legal-safe" />
                          Recommendations ({Array.isArray(latestAnalysis.recommendations) ? latestAnalysis.recommendations.length : 0})
                        </h5>
                        {Array.isArray(latestAnalysis.recommendations) && latestAnalysis.recommendations.slice(0, 2).map((rec: any, index: number) => (
                          <div key={index} className="text-sm p-2 bg-muted rounded mb-1">
                            <span className="font-medium">{rec.clause}:</span> {rec.reasoning}
                          </div>
                        ))}
                        {Array.isArray(latestAnalysis.recommendations) && latestAnalysis.recommendations.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{latestAnalysis.recommendations.length - 2} more recommendations
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};