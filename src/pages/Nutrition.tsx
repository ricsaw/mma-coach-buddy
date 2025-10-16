import { Apple } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFitness } from "@/contexts/FitnessContext";
import { MealLogger } from "@/components/MealLogger";

export default function Nutrition() {
  const { dailyStats, dailyMeals, addMeal, removeMeal, caloriesTarget, macrosTarget } = useFitness();

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nutrition</h1>
          <p className="text-muted-foreground">Track your daily intake</p>
        </div>
        <Apple className="h-8 w-8 text-primary" />
      </div>

      <Card className="fitness-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Daily Summary</h3>
            <span className="text-sm text-muted-foreground">
              {dailyStats.caloriesConsumed} / {caloriesTarget} kcal
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">{dailyStats.protein}g</div>
              <p className="text-xs text-muted-foreground">Protein</p>
              <Progress value={(dailyStats.protein / macrosTarget.protein) * 100} className="h-1.5" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-success">{dailyStats.carbs}g</div>
              <p className="text-xs text-muted-foreground">Carbs</p>
              <Progress value={(dailyStats.carbs / macrosTarget.carbs) * 100} className="h-1.5 [&>div]:bg-success" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-warning">{dailyStats.fat}g</div>
              <p className="text-xs text-muted-foreground">Fat</p>
              <Progress value={(dailyStats.fat / macrosTarget.fat) * 100} className="h-1.5 [&>div]:bg-warning" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="fitness-card">
        <h3 className="mb-4 font-semibold">Today's Meals</h3>
        <MealLogger meals={dailyMeals} onAddMeal={addMeal} onRemoveMeal={removeMeal} />
      </Card>
    </div>
  );
}
