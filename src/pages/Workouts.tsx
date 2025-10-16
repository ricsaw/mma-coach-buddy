import { Clock, Flame, Dumbbell, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Workouts() {
  const todayWorkout = {
    name: "MMA Conditioning + Upper Body",
    duration: 45,
    caloriesBurn: 420,
    difficulty: "Intermediate",
    sections: [
      {
        name: "Warm-up",
        duration: 5,
        exercises: [
          { name: "Jump Rope", sets: "3 min", calories: 30 },
          { name: "Arm Circles", sets: "2 min", calories: 15 },
        ],
      },
      {
        name: "Main Workout",
        duration: 30,
        exercises: [
          { name: "Heavy Bag Combos", sets: "5 rounds x 3 min", calories: 150 },
          { name: "Push-ups", sets: "4 x 15", calories: 40 },
          { name: "Pull-ups", sets: "4 x 8", calories: 35 },
          { name: "Shadow Boxing", sets: "3 x 2 min", calories: 60 },
          { name: "Burpees", sets: "3 x 10", calories: 45 },
        ],
      },
      {
        name: "Cool Down",
        duration: 10,
        exercises: [
          { name: "Static Stretching", sets: "5 min", calories: 20 },
          { name: "Foam Rolling", sets: "5 min", calories: 25 },
        ],
      },
    ],
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Today's Workout</h1>
        <p className="text-muted-foreground">Let's get after it! 🥊</p>
      </div>

      {/* Workout Overview Card */}
      <Card className="fitness-card bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-bold">{todayWorkout.name}</h2>
              <Badge variant="secondary">{todayWorkout.difficulty}</Badge>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{todayWorkout.duration} min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Est. Burn</p>
                <p className="font-semibold">{todayWorkout.caloriesBurn} kcal</p>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full">
            Start Workout
          </Button>
        </div>
      </Card>

      {/* Workout Sections */}
      <div className="space-y-4">
        {todayWorkout.sections.map((section, sectionIdx) => (
          <Card key={sectionIdx} className="fitness-card">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{section.name}</h3>
                <Badge variant="outline">
                  <Clock className="mr-1 h-3 w-3" />
                  {section.duration} min
                </Badge>
              </div>

              <div className="space-y-2">
                {section.exercises.map((exercise, exerciseIdx) => (
                  <div
                    key={exerciseIdx}
                    className="flex items-center justify-between rounded-lg bg-muted/50 p-3 smooth-transition hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-sm text-muted-foreground">{exercise.sets}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-orange-500">
                      <Flame className="h-4 w-4" />
                      {exercise.calories}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Notes */}
      <Card className="fitness-card border-l-4 border-l-primary">
        <p className="text-sm">
          <span className="font-semibold">Coach's Tip:</span> Focus on form over speed today. Keep your core engaged during heavy bag work, and don't skip the cooldown!
        </p>
      </Card>
    </div>
  );
}
