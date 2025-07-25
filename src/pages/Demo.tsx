import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  ArrowLeft,
  ArrowRight, 
  Upload, 
  FileText, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Lightbulb,
  MessageSquare,
  Download,
  Clock,
  Shield,
  Play,
  Pause
} from "lucide-react";
import logoJustice from "@/assets/logo-justice.jpg";
import sampleContract from "@/assets/sample-contract.jpg";
import analysisDashboard from "@/assets/analysis-dashboard.jpg";
import finalReport from "@/assets/final-report.jpg";

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      title: "Sample Contract Document",
      description: "This demo analyzes a sample freelance web development contract to show you how our AI works.",
      content: (
        <Card className="p-6 bg-gradient-card">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Service Agreement - Freelance Web Development.pdf</h3>
            <p className="text-muted-foreground mb-4">Sample contract document for demonstration</p>
          </div>
          <div className="relative overflow-hidden rounded-lg border shadow-sm">
            <img 
              src={sampleContract} 
              alt="Sample contract document" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className="bg-legal-safe text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Document Loaded
              </Badge>
            </div>
          </div>
        </Card>
      )
    },
    {
      title: "AI Analysis in Progress",
      description: "Our advanced AI scans every clause, identifies patterns, and evaluates risks in real-time.",
      content: (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Search className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-4">AI Analysis Dashboard</h3>
              <Progress value={75} className="mb-4" />
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-legal-safe" />
                  <span>Scanning 47 clauses</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-legal-safe" />
                  <span>Identifying risk patterns</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-primary animate-pulse" />
                  <span>Generating recommendations</span>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border shadow-sm">
              <img 
                src={analysisDashboard} 
                alt="AI analysis dashboard showing contract analysis" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            </div>
          </Card>
        </div>
      )
    },
    {
      title: "Risk Assessment",
      description: "Get a comprehensive overview of potential issues and risk levels in your contract.",
      content: (
        <div className="space-y-4">
          <Card className="p-6 border-l-4 border-l-legal-danger bg-gradient-card">
            <div className="flex items-start gap-4">
              <XCircle className="w-6 h-6 text-legal-danger mt-1" />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">Unlimited Liability Clause</h4>
                  <Badge variant="destructive">High Risk</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Section 8.2 contains broad indemnification that could expose you to unlimited financial liability.
                </p>
                <div className="p-3 bg-legal-safe/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="w-4 h-4 text-legal-safe" />
                    <span className="text-sm font-medium text-legal-safe">AI Recommendation</span>
                  </div>
                  <p className="text-xs">Add mutual indemnification and cap liability at contract value ($50,000)</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-legal-warning bg-gradient-card">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-legal-warning mt-1" />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">Payment Terms</h4>
                  <Badge variant="secondary">Medium Risk</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  30-day payment terms with no late fees could impact cash flow.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      title: "Plain English Summary",
      description: "Complex legal language translated into clear, understandable terms.",
      content: (
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">What This Contract Really Says</h3>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed mb-4">
              <strong>You're agreeing to:</strong> Provide web development services for $50,000 over 3 months. 
              The client can end the contract with 30 days notice, and you're responsible for any problems 
              that arise from your work with no financial limits.
            </p>
            <p className="text-foreground leading-relaxed">
              <strong>Payment:</strong> You'll be paid monthly, but they have 30 days to pay each invoice. 
              The client owns all the code you write, including any tools or methods you create.
            </p>
          </div>
          <div className="mt-4 p-4 bg-legal-warning/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-legal-warning" />
              <span className="font-medium text-legal-warning">Key Concerns</span>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Unlimited liability exposure</li>
              <li>• Client owns all your intellectual property</li>
              <li>• No compensation for early termination</li>
            </ul>
          </div>
        </Card>
      )
    },
    {
      title: "Negotiation Strategy",
      description: "Get specific, actionable suggestions to improve your contract terms.",
      content: (
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-card">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Recommended Changes
            </h4>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-legal-danger mb-2">Current: Payment Terms</div>
                <div className="p-3 bg-legal-danger/10 rounded-lg text-sm mb-2">
                  "Payment due within 30 days of invoice"
                </div>
                <div className="text-sm font-medium text-legal-safe mb-2">Suggested: Improved Payment</div>
                <div className="p-3 bg-legal-safe/10 rounded-lg text-sm mb-2">
                  "Payment due within 15 days of invoice with 1.5% monthly late fee"
                </div>
                <div className="text-xs text-muted-foreground">
                  💡 <strong>Why:</strong> Faster payment improves cash flow and late fees encourage timely payment
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-legal-safe mb-2">Add: Liability Cap</div>
                <div className="p-3 bg-legal-safe/10 rounded-lg text-sm mb-2">
                  "Total liability limited to the total contract value of $50,000"
                </div>
                <div className="text-xs text-muted-foreground">
                  💡 <strong>Why:</strong> Protects you from unlimited financial exposure while still covering contract value
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      title: "Final Report & Export",
      description: "Download your complete analysis report with all recommendations and redlined contract.",
      content: (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-legal-safe/10 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-legal-safe" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Analysis Complete!</h3>
            <p className="text-muted-foreground mb-6">
              Your comprehensive contract analysis is ready with 12 recommendations 
              and 3 high-priority risk alerts.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">Medium</div>
                <div className="text-sm text-muted-foreground">Overall Risk</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">$25k</div>
                <div className="text-sm text-muted-foreground">Potential Savings</div>
              </div>
            </div>
          </Card>
          
          <div className="relative overflow-hidden rounded-lg border shadow-sm">
            <img 
              src={finalReport} 
              alt="Final contract analysis report" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex gap-3">
              <Button className="flex-1" disabled>
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" className="flex-1" disabled>
                <FileText className="w-4 h-4 mr-2" />
                Export Contract
              </Button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= demoSteps.length - 1) {
            setIsPlaying(false);
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg p-1 overflow-hidden backdrop-blur-sm">
                <img 
                  src={logoJustice} 
                  alt="Lady of Justice - ContractGuard AI" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-xl font-bold">ContractGuard AI Demo</span>
            </div>
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Demo Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Interactive Demo</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlayback}
                className="flex items-center gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Auto Play'}
              </Button>
            </div>
          </div>
          <Progress value={(currentStep + 1) / demoSteps.length * 100} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {demoSteps.length}: {demoSteps[currentStep].title}
          </p>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">{demoSteps[currentStep].title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {demoSteps[currentStep].description}
            </p>
          </div>
          
          <div className="animate-fade-in">
            {demoSteps[currentStep].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {demoSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep 
                    ? 'bg-primary' 
                    : index < currentStep 
                      ? 'bg-primary/50' 
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {currentStep === demoSteps.length - 1 ? (
            <Button asChild className="flex items-center gap-2">
              <Link to="/">
                Try for Real
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          ) : (
            <Button 
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Call to Action */}
        {currentStep === demoSteps.length - 1 && (
          <Card className="mt-12 p-8 bg-gradient-hero text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Protect Your Business?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              This was just a demo with sample data. Upload your real contract to get 
              personalized AI analysis and recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link to="/">
                  Start Free Analysis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <div className="text-sm text-white/70">
                No signup required • 100% secure
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Demo;