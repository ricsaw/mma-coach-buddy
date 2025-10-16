import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export interface UserProfile {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  weight: number;
  height: number;
  goal: "lose_weight" | "gain_muscle" | "maintain" | "mma_training";
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  equipment: string[];
}

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    equipment: [],
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(profile as UserProfile);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return profile.name && profile.age && profile.gender;
      case 2:
        return profile.weight && profile.height;
      case 3:
        return profile.goal;
      case 4:
        return profile.activityLevel;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="mx-4 w-full max-w-lg p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold">Welcome to FitCoach AI! 💪</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Let's set up your personalized fitness journey
          </p>
          <Progress value={progress} className="h-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            Step {step} of {totalSteps}
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  value={profile.name || ""}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age || ""}
                    onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                    placeholder="25"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={profile.gender}
                    onValueChange={(value: UserProfile["gender"]) =>
                      setProfile({ ...profile, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Body Metrics */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight || ""}
                    onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })}
                    placeholder="180"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (inches)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={profile.height || ""}
                    onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })}
                    placeholder="70"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goal */}
          {step === 3 && (
            <div className="space-y-4">
              <Label>What's your primary goal?</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "lose_weight", label: "Lose Weight", emoji: "⚖️" },
                  { value: "gain_muscle", label: "Build Muscle", emoji: "💪" },
                  { value: "maintain", label: "Maintain", emoji: "🎯" },
                  { value: "mma_training", label: "MMA Training", emoji: "🥊" },
                ].map((goal) => (
                  <Button
                    key={goal.value}
                    variant={profile.goal === goal.value ? "default" : "outline"}
                    className="h-auto flex-col gap-2 py-6"
                    onClick={() =>
                      setProfile({ ...profile, goal: goal.value as UserProfile["goal"] })
                    }
                  >
                    <span className="text-2xl">{goal.emoji}</span>
                    <span>{goal.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Activity Level */}
          {step === 4 && (
            <div className="space-y-4">
              <Label>How active are you?</Label>
              <Select
                value={profile.activityLevel}
                onValueChange={(value: UserProfile["activityLevel"]) =>
                  setProfile({ ...profile, activityLevel: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                  <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="very_active">Very Active (athlete level)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          <Button onClick={handleNext} disabled={!canProceed()} className="flex-1">
            {step === totalSteps ? "Get Started" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
