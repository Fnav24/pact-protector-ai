import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  FileText, 
  MessageSquare, 
  Download,
  Lightbulb,
  Shield
} from "lucide-react";
import { ContractAnalysis as ContractAnalysisType } from "./ContractUpload";

interface ContractAnalysisProps {
  analysis: ContractAnalysisType;
  onNewAnalysis: () => void;
}

const getRiskIcon = (risk: string) => {
  switch (risk) {
    case "low":
      return <CheckCircle className="w-4 h-4 text-legal-safe" />;
    case "medium":
      return <AlertTriangle className="w-4 h-4 text-legal-warning" />;
    case "high":
      return <XCircle className="w-4 h-4 text-legal-danger" />;
    default:
      return <AlertTriangle className="w-4 h-4 text-legal-warning" />;
  }
};

const getRiskBadgeVariant = (risk: string) => {
  switch (risk) {
    case "low":
      return "default";
    case "medium":
      return "secondary";
    case "high":
      return "destructive";
    default:
      return "secondary";
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "low":
      return "text-legal-safe";
    case "medium":
      return "text-legal-warning";
    case "high":
      return "text-legal-danger";
    default:
      return "text-legal-warning";
  }
};

export const ContractAnalysis = ({ analysis, onNewAnalysis }: ContractAnalysisProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 shadow-medium bg-gradient-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{analysis.fileName}</h2>
              <div className="flex items-center gap-2 mt-1">
                {getRiskIcon(analysis.overallRisk)}
                <span className={`font-semibold ${getRiskColor(analysis.overallRisk)}`}>
                  {analysis.overallRisk.charAt(0).toUpperCase() + analysis.overallRisk.slice(1)} Risk
                </span>
                <Badge variant={getRiskBadgeVariant(analysis.overallRisk)}>
                  Overall Assessment
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button onClick={onNewAnalysis} size="sm">
              Analyze New Contract
            </Button>
          </div>
        </div>
      </Card>

      {/* Analysis Tabs */}
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
          <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
          <TabsTrigger value="redline">Redlined Version</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Plain English Summary</h3>
            </div>
            <p className="text-foreground leading-relaxed">
              {analysis.plainEnglishSummary}
            </p>
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-medium">Quick Stats</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Risk Level:</span>
                  <div className="font-semibold">{analysis.overallRisk.toUpperCase()}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Risky Clauses:</span>
                  <div className="font-semibold">{analysis.riskyClauses.length}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Negotiation Points:</span>
                  <div className="font-semibold">{analysis.negotiationPoints.length}</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <div className="space-y-4">
            {analysis.riskyClauses.map((clause, index) => (
              <Card key={index} className="p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    {getRiskIcon(clause.risk)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{clause.type}</h4>
                      <Badge variant={getRiskBadgeVariant(clause.risk)}>
                        {clause.risk} risk
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {clause.description}
                    </p>
                    <div className="p-3 bg-legal-safe/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Lightbulb className="w-4 h-4 text-legal-safe" />
                        <span className="font-medium text-legal-safe">Recommendation</span>
                      </div>
                      <p className="text-sm text-foreground">
                        {clause.suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="negotiation">
          <div className="space-y-4">
            {analysis.negotiationPoints.map((point, index) => (
              <Card key={index} className="p-6 shadow-soft">
                <h4 className="font-semibold mb-3">{point.clause}</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-legal-danger mb-2">Current Text:</div>
                    <div className="p-3 bg-legal-danger/10 rounded-lg text-sm">
                      "{point.currentText}"
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-legal-safe mb-2">Suggested Text:</div>
                    <div className="p-3 bg-legal-safe/10 rounded-lg text-sm">
                      "{point.suggestedText}"
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium mb-1">Why this change helps:</div>
                    <p className="text-sm text-muted-foreground">
                      {point.reasoning}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="redline">
          <Card className="p-6 shadow-soft">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Redlined Contract</h3>
              <p className="text-muted-foreground text-sm">
                This shows your original contract with suggested changes highlighted.
              </p>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm">
              <div className="mb-4">
                <h4 className="font-bold text-base mb-2">SERVICE AGREEMENT</h4>
              </div>
              
              <div className="space-y-3 leading-relaxed">
                <p>
                  This Service Agreement ("Agreement") is entered into between [Client Name] ("Client") and [Your Name] ("Service Provider").
                </p>
                
                <p>
                  <strong>1. Payment Terms:</strong> <span className="bg-legal-danger/20 line-through">Payment due within 30 days of invoice</span>{" "}
                  <span className="bg-legal-safe/20">Payment due within 15 days of invoice with 1.5% monthly late fee</span>
                </p>
                
                <p>
                  <strong>2. Scope Changes:</strong> <span className="bg-legal-danger/20 line-through">Client may request changes to scope as needed</span>{" "}
                  <span className="bg-legal-safe/20">Scope changes require written approval and additional compensation at agreed hourly rate</span>
                </p>
                
                <p>
                  <strong>3. Termination:</strong> <span className="bg-legal-warning/20">Either party may terminate this agreement with 30 days written notice</span>{" "}
                  <span className="text-legal-warning text-xs">[Consider negotiating for 60-90 days]</span>
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-legal-danger/20 rounded"></div>
                <span>Removed text</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-legal-safe/20 rounded"></div>
                <span>Added text</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-legal-warning/20 rounded"></div>
                <span>Needs attention</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};