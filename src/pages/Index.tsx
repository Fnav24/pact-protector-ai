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
import heroImage from "@/assets/hero-tech-code.jpg";
import logoJustice from "@/assets/logo-justice.jpg";

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
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-hero">
          <img 
            src={heroImage} 
            alt="Modern AI Platform" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-white/15 rounded-full blur-lg animate-pulse delay-700"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <div className="mb-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
              ✨ Powered by Advanced AI
            </Badge>
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
              Smart Contract
              <br />
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Analysis
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Revolutionary AI that reads between the lines, protects your interests, 
              and negotiates better deals for your business.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12 text-white/90">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-medium">Instant Analysis</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-medium">Risk Detection</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-medium">Smart Negotiation</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-glow"
            >
              Try Free Analysis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              AI-Powered Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Sophisticated Legal Intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our advanced AI doesn't just read contracts—it understands context, identifies patterns, 
              and provides strategic insights that protect your business interests.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="group p-8 shadow-soft hover:shadow-glow transition-all duration-300 border-0 bg-gradient-card hover:scale-105">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Risk Intelligence</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Advanced pattern recognition identifies hidden risks, unfavorable terms, 
                  and potential legal pitfalls before you sign.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-legal-safe" />
                    <span>Liability exposure analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-legal-safe" />
                    <span>Termination clause review</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-legal-safe" />
                    <span>IP ownership protection</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="group p-8 shadow-soft hover:shadow-glow transition-all duration-300 border-0 bg-gradient-card hover:scale-105">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Plain English AI</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Transform complex legal jargon into clear, actionable insights 
                  that anyone can understand and act upon.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-legal-safe" />
                    <span>Legal language translation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-legal-safe" />
                    <span>Key terms extraction</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-legal-safe" />
                    <span>Impact summaries</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="group p-8 shadow-soft hover:shadow-glow transition-all duration-300 border-0 bg-gradient-card hover:scale-105">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Strategic Negotiation</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Get specific, industry-tested suggestions for better terms and 
                  winning negotiation strategies.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-legal-safe" />
                    <span>Alternative clause suggestions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-legal-safe" />
                    <span>Industry benchmarking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-legal-safe" />
                    <span>Negotiation playbooks</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                98%
              </div>
              <div className="text-sm font-medium text-muted-foreground">Risk Detection Accuracy</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                2min
              </div>
              <div className="text-sm font-medium text-muted-foreground">Average Analysis Time</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                50k+
              </div>
              <div className="text-sm font-medium text-muted-foreground">Contracts Analyzed</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-sm font-medium text-muted-foreground">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-24 bg-gradient-to-br from-muted/50 to-background relative">
        <div className="absolute inset-0 bg-gradient-accent opacity-50"></div>
        <div className="relative container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Start Your Analysis
            </h2>
            <p className="text-lg text-muted-foreground">
              Upload your contract and get instant, intelligent insights
            </p>
          </div>
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
      <section className="py-24 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Protect Your Business?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of smart businesses using AI to eliminate contract risks, 
            negotiate better terms, and save money on legal fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-glow"
            >
              Start Free Analysis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="text-sm text-white/70">
              No credit card required • 100% secure
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg p-1 overflow-hidden">
                <img 
                  src={logoJustice} 
                  alt="Lady of Justice - ContractGuard AI" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ContractGuard AI
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Revolutionary AI-powered contract analysis for modern businesses
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-legal-safe" />
                Secure & Private
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-primary" />
                Not Legal Advice
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-legal-warning" />
                Instant Results
              </span>
            </div>
            <div className="mt-8 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
              © 2024 ContractGuard AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
