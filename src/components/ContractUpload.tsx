import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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
  const { user } = useAuth();

  // Function to read file content as text
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.includes('pdf') && !file.type.includes('document') && !file.type.includes('text')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or TXT file",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to analyze contracts",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Read file content
      const contractText = await readFileAsText(file);
      
      // Call our edge function for AI analysis
      const { data, error } = await supabase.functions.invoke('analyze-contract', {
        body: {
          contractText,
          industryType,
          fileName: file.name
        }
      });

      if (error) {
        throw error;
      }

      onFileUploaded(data);
      
      toast({
        title: "Analysis complete",
        description: `Contract analysis finished for ${file.name}`,
      });
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error.message || "Failed to analyze contract. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [onFileUploaded, industryType, toast, user, readFileAsText]);

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