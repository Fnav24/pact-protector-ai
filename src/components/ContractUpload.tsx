import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContractUploadProps {
  onFileUploaded: (analysis: ContractAnalysis) => void;
  industryType: string;
}

export interface ContractAnalysis {
  fileName: string;
  overallRisk: "low" | "medium" | "high";
  riskyClauses: Array<{
    type: string;
    description: string;
    risk: "low" | "medium" | "high";
    suggestion: string;
  }>;
  plainEnglishSummary: string;
  negotiationPoints: Array<{
    clause: string;
    currentText: string;
    suggestedText: string;
    reasoning: string;
  }>;
}

export const ContractUpload = ({ onFileUploaded, industryType }: ContractUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const simulateContractAnalysis = useCallback((fileName: string): ContractAnalysis => {
    // Simulate AI analysis based on file name and industry
    const analysisExamples = {
      "service-agreement": {
        overallRisk: "medium" as const,
        riskyClauses: [
          {
            type: "Indemnification",
            description: "Broad indemnification clause that may expose you to unlimited liability",
            risk: "high" as const,
            suggestion: "Add mutual indemnification and cap liability to contract value"
          },
          {
            type: "Termination",
            description: "Client can terminate without cause with only 30 days notice",
            risk: "medium" as const,
            suggestion: "Negotiate for 60-90 days notice and payment for work in progress"
          },
          {
            type: "Intellectual Property",
            description: "All work product automatically belongs to client",
            risk: "medium" as const,
            suggestion: "Retain rights to general methodologies and pre-existing IP"
          }
        ],
        plainEnglishSummary: "This is a standard service agreement where you'll provide consulting services in exchange for payment. The client can end the contract with 30 days notice, and you're responsible for any problems that arise from your work. You'll be paid monthly, but the client owns all the work you create.",
        negotiationPoints: [
          {
            clause: "Payment Terms",
            currentText: "Payment due within 30 days of invoice",
            suggestedText: "Payment due within 15 days of invoice with 1.5% monthly late fee",
            reasoning: "Faster payment improves cash flow and late fees encourage timely payment"
          },
          {
            clause: "Scope Changes",
            currentText: "Client may request changes to scope as needed",
            suggestedText: "Scope changes require written approval and additional compensation at agreed hourly rate",
            reasoning: "Prevents scope creep and ensures you're compensated for additional work"
          }
        ]
      },
      "nda": {
        overallRisk: "low" as const,
        riskyClauses: [
          {
            type: "Definition of Confidential Information",
            description: "Very broad definition that could include publicly available information",
            risk: "medium" as const,
            suggestion: "Add exceptions for publicly available information and independently developed ideas"
          }
        ],
        plainEnglishSummary: "This is a standard non-disclosure agreement that prevents you from sharing the client's confidential information. It's mutual, meaning both parties are bound by confidentiality. The agreement lasts for 3 years.",
        negotiationPoints: [
          {
            clause: "Duration",
            currentText: "This agreement shall remain in effect for 5 years",
            suggestedText: "This agreement shall remain in effect for 2-3 years",
            reasoning: "Shorter duration reduces long-term obligations while still protecting legitimate interests"
          }
        ]
      }
    };

    const fileType = fileName.toLowerCase().includes('nda') ? 'nda' : 'service-agreement';
    return {
      fileName,
      ...analysisExamples[fileType]
    };
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.includes('pdf') && !file.type.includes('document') && !file.type.includes('text')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or TXT file",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const analysis = simulateContractAnalysis(file.name);
    onFileUploaded(analysis);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis complete",
      description: `Contract analysis finished for ${file.name}`,
    });
  }, [onFileUploaded, simulateContractAnalysis, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  return (
    <Card className="p-8 shadow-medium bg-gradient-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Upload Your Contract</h2>
        <p className="text-muted-foreground">
          Get instant AI-powered analysis for {industryType.toLowerCase()} contracts
        </p>
      </div>
      
      {isAnalyzing ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Clock className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Analyzing your contract...</h3>
          <p className="text-muted-foreground">
            Our AI is reviewing clauses, identifying risks, and preparing recommendations
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-legal-safe" />
              <span>Scanning for risky clauses</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-legal-safe" />
              <span>Generating plain English summary</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Preparing negotiation suggestions</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Drop your contract here</h3>
            <p className="text-muted-foreground mb-4">
              or click to browse files (PDF, DOC, TXT)
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileText className="w-4 h-4 mr-2" />
                Choose File
              </label>
            </Button>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-legal-safe" />
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 text-legal-warning" />
            <span>No Legal Advice</span>
          </div>
        </div>
      </div>
    </Card>
  );
};