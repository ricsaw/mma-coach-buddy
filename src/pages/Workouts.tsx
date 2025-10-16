import { Dumbbell, Clock, Flame, Trophy, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateWorkout } from "@/data/exercises";
import { useFitness } from "@/contexts/FitnessContext";
import { toast } from "@/hooks/use-toast";

export default function Workouts() {
  const { completeWorkout } = useFitness();
  const [workout] = useState(() => generateWorkout("mixed"));
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const totalCalories = workout.reduce((sum, ex) => sum + ex.caloriesBurned, 0);
  const completionRate = (completedExercises.size / workout.length) * 100;

  const toggleExercise = (id: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedExercises(newCompleted);
  };

  const finishWorkout = () => {
    completeWorkout(workout);
    toast({
      title: "Workout Complete! 🎉",
      description: `You burned ${totalCalories} calories. Keep it up!`,
    });
    setCompletedExercises(new Set());
  };

  const groupedExercises = {
    warmup: workout.filter((e) => e.category === "warmup"),
    main: workout.filter((e) => ["strength", "mma", "cardio"].includes(e.category)),
    cooldown: workout.filter((e) => e.category === "cooldown"),
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Today's Workout</h1>
        <p className="text-muted-foreground">Let's get after it! 🥊</p>
      </div>

      <Card className="fitness-card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">Mixed Training</h2>
            <div className="mt-2 flex gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>45 min</span>
              </div>
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-warning" />
                <span>{totalCalories} cal</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary">Today</Badge>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">{Math.round(completionRate)}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>
      </Card>

      {Object.entries(groupedExercises).map(([section, exercises]) => (
        <Card key={section} className="fitness-card">
          <div className="mb-4 flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            <h3 className="font-semibold capitalize">{section}</h3>
          </div>
          <div className="space-y-3">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between rounded-lg border bg-card p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => toggleExercise(exercise.id)}
              >
                <div className="flex items-center gap-3">
                  {completedExercises.has(exercise.id) ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets && exercise.reps
                        ? `${exercise.sets}x${exercise.reps}`
                        : exercise.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Flame className="h-4 w-4 text-warning" />
                  <span className="font-medium">{exercise.caloriesBurned}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {completedExercises.size === workout.length && (
        <Button onClick={finishWorkout} size="lg" className="w-full">
          <Trophy className="mr-2 h-5 w-5" />
          Complete Workout
        </Button>
      )}
    </div>
  );
}
