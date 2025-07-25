import { useState } from "react";
import { ContractUpload, ContractAnalysis as ContractAnalysisType } from "@/components/ContractUpload";
import { ContractAnalysis } from "@/components/ContractAnalysis";
import { IndustrySelector } from "@/components/IndustrySelector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  FileText,
  MessageSquare,
  Lightbulb
} from "lucide-react";
import heroImage from "@/assets/hero-legal.jpg";

const Index = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("freelancer");
  const [analysis, setAnalysis] = useState<ContractAnalysisType | null>(null);

  const handleFileUploaded = (contractAnalysis: ContractAnalysisType) => {
    setAnalysis(contractAnalysis);
  };

  const handleNewAnalysis = () => {
    setAnalysis(null);
  };

  if (analysis) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ContractAnalysis 
            analysis={analysis} 
            onNewAnalysis={handleNewAnalysis}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white py-20">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Legal AI Platform" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            Powered by Advanced AI
          </Badge>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            AI-Powered Contract Review
            <br />
            <span className="text-white/90">for SMBs & Freelancers</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Stop signing risky contracts. Get instant AI analysis, risk detection, 
            and negotiation strategies to protect your business.
          </p>
          <div className="flex items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Risk Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Negotiation Help</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful AI Legal Analysis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI scans every clause, identifies risks, and provides actionable insights 
              to help you negotiate better contracts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
              <div className="p-3 bg-legal-danger/10 rounded-lg w-fit mb-4">
                <Shield className="w-6 h-6 text-legal-danger" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Risk Detection</h3>
              <p className="text-muted-foreground">
                Automatically identify risky clauses like broad indemnification, 
                unfair termination terms, and IP ownership issues.
              </p>
            </Card>
            
            <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Plain English</h3>
              <p className="text-muted-foreground">
                Get complex legal language translated into clear, understandable 
                summaries so you know exactly what you're signing.
              </p>
            </Card>
            
            <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
              <div className="p-3 bg-legal-safe/10 rounded-lg w-fit mb-4">
                <Lightbulb className="w-6 h-6 text-legal-safe" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Negotiations</h3>
              <p className="text-muted-foreground">
                Receive specific suggestions for better terms and alternative 
                clauses based on industry best practices.
              </p>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Risk Detection Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3min</div>
              <div className="text-muted-foreground">Average Analysis Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">57M+</div>
              <div className="text-muted-foreground">Freelancers Need This</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">AI Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <IndustrySelector 
                selectedIndustry={selectedIndustry}
                onIndustryChange={setSelectedIndustry}
              />
            </div>
            <div className="md:col-span-2">
              <ContractUpload 
                onFileUploaded={handleFileUploaded}
                industryType={selectedIndustry}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stop Signing Risky Contracts
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers and small businesses who use AI to 
            protect themselves and negotiate better deals.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
          >
            Upload Your Contract Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Scale className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">ContractGuard AI</span>
          </div>
          <p className="text-sm">
            AI-powered contract analysis • Not legal advice • Secure & private
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
