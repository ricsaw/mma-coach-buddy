import { Flame, Target, Zap, Award, Dumbbell, Apple } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function Home() {
  const dailyStats = {
    caloriesConsumed: 1850,
    caloriesTarget: 2400,
    caloriesBurned: 420,
    streak: 7,
    protein: { current: 145, target: 160 },
    carbs: { current: 180, target: 200 },
    fat: { current: 62, target: 70 },
  };

  const caloriesRemaining = dailyStats.caloriesTarget - dailyStats.caloriesConsumed + dailyStats.caloriesBurned;
  const caloriesProgress = (dailyStats.caloriesConsumed / dailyStats.caloriesTarget) * 100;

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Hey Champion! 💪</h1>
        <p className="text-muted-foreground">Let's crush your goals today</p>
      </div>

      {/* Streak Card */}
      <Card className="fitness-card bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/20 p-3">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium opacity-90">Current Streak</p>
              <p className="text-3xl font-bold">{dailyStats.streak} Days</p>
            </div>
          </div>
          <Award className="h-12 w-12 opacity-80" />
        </div>
      </Card>

      {/* Calorie Summary */}
      <Card className="fitness-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Daily Calories</h3>
            <span className="text-sm text-muted-foreground">
              {dailyStats.caloriesConsumed} / {dailyStats.caloriesTarget} kcal
            </span>
          </div>
          
          <Progress value={caloriesProgress} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                <Target className="h-5 w-5" />
                {caloriesRemaining}
              </div>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{dailyStats.caloriesConsumed}</div>
              <p className="text-xs text-muted-foreground">Consumed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-success">
                <Zap className="h-5 w-5" />
                {dailyStats.caloriesBurned}
              </div>
              <p className="text-xs text-muted-foreground">Burned</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Macros */}
      <Card className="fitness-card">
        <h3 className="mb-4 font-semibold">Today's Macros</h3>
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">Protein</span>
              <span className="text-muted-foreground">
                {dailyStats.protein.current}g / {dailyStats.protein.target}g
              </span>
            </div>
            <Progress 
              value={(dailyStats.protein.current / dailyStats.protein.target) * 100} 
              className="h-2 bg-muted [&>div]:bg-primary"
            />
          </div>
          
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">Carbs</span>
              <span className="text-muted-foreground">
                {dailyStats.carbs.current}g / {dailyStats.carbs.target}g
              </span>
            </div>
            <Progress 
              value={(dailyStats.carbs.current / dailyStats.carbs.target) * 100} 
              className="h-2 bg-muted [&>div]:bg-success"
            />
          </div>
          
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">Fat</span>
              <span className="text-muted-foreground">
                {dailyStats.fat.current}g / {dailyStats.fat.target}g
              </span>
            </div>
            <Progress 
              value={(dailyStats.fat.current / dailyStats.fat.target) * 100} 
              className="h-2 bg-muted [&>div]:bg-warning"
            />
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button size="lg" className="h-auto flex-col gap-2 py-6">
          <Dumbbell className="h-6 w-6" />
          <span>Start Workout</span>
        </Button>
        <Button size="lg" variant="outline" className="h-auto flex-col gap-2 py-6">
          <Apple className="h-6 w-6" />
          <span>Log Meal</span>
        </Button>
      </div>

      {/* Motivational Message */}
      <Card className="fitness-card border-l-4 border-l-primary">
        <p className="text-sm font-medium">
          💡 You're {Math.round(caloriesProgress)}% through your calorie goal. Keep going strong! Remember, consistency beats perfection. 🔥
        </p>
      </Card>
    </div>
  );
}
