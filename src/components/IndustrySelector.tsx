import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Building2, Users, Code, Briefcase, Camera, Truck } from "lucide-react";

interface IndustrySelectorProps {
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
}

const industries = [
  { value: "freelancer", label: "Freelancer/Consultant", icon: Users },
  { value: "agency", label: "Marketing Agency", icon: Building2 },
  { value: "saas", label: "SaaS/Technology", icon: Code },
  { value: "professional", label: "Professional Services", icon: Briefcase },
  { value: "creative", label: "Creative Services", icon: Camera },
  { value: "logistics", label: "Logistics/Supply Chain", icon: Truck },
];

export const IndustrySelector = ({ selectedIndustry, onIndustryChange }: IndustrySelectorProps) => {
  const selectedIndustryData = industries.find(i => i.value === selectedIndustry);
  const Icon = selectedIndustryData?.icon || Building2;

  return (
    <Card className="p-6 shadow-soft">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Industry Type</h3>
          <p className="text-sm text-muted-foreground">
            Get industry-specific contract analysis
          </p>
        </div>
      </div>
      
      <Select value={selectedIndustry} onValueChange={onIndustryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select your industry" />
        </SelectTrigger>
        <SelectContent>
          {industries.map((industry) => {
            const IconComponent = industry.icon;
            return (
              <SelectItem key={industry.value} value={industry.value}>
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4" />
                  <span>{industry.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </Card>
  );
};