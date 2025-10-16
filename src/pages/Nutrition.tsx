import { Plus, Apple, Coffee, Utensils, Cookie } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Nutrition() {
  const meals = [
    {
      type: "Breakfast",
      icon: Coffee,
      time: "8:30 AM",
      items: [
        { name: "Oatmeal with Berries", calories: 320, protein: 12, carbs: 54, fat: 8 },
        { name: "Protein Shake", calories: 180, protein: 30, carbs: 8, fat: 3 },
      ],
    },
    {
      type: "Lunch",
      icon: Utensils,
      time: "12:45 PM",
      items: [
        { name: "Grilled Chicken Salad", calories: 450, protein: 45, carbs: 35, fat: 18 },
        { name: "Brown Rice", calories: 215, protein: 5, carbs: 45, fat: 2 },
      ],
    },
    {
      type: "Snack",
      icon: Apple,
      time: "3:30 PM",
      items: [
        { name: "Greek Yogurt", calories: 150, protein: 15, carbs: 18, fat: 4 },
        { name: "Almonds", calories: 165, protein: 6, carbs: 6, fat: 14 },
      ],
    },
  ];

  const totalConsumed = meals.reduce(
    (acc, meal) => {
      meal.items.forEach((item) => {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        acc.fat += item.fat;
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const targets = {
    calories: 2400,
    protein: 160,
    carbs: 200,
    fat: 70,
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nutrition</h1>
          <p className="text-muted-foreground">Track your daily intake</p>
        </div>
        <Button size="icon" className="rounded-full">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Daily Summary */}
      <Card className="fitness-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Daily Summary</h3>
            <span className="text-sm text-muted-foreground">
              {totalConsumed.calories} / {targets.calories} kcal
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">{totalConsumed.protein}g</div>
              <p className="text-xs text-muted-foreground">Protein</p>
              <Progress
                value={(totalConsumed.protein / targets.protein) * 100}
                className="h-1.5"
              />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold" style={{ color: "hsl(var(--success))" }}>
                {totalConsumed.carbs}g
              </div>
              <p className="text-xs text-muted-foreground">Carbs</p>
              <Progress
                value={(totalConsumed.carbs / targets.carbs) * 100}
                className="h-1.5 [&>div]:bg-success"
              />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold" style={{ color: "hsl(var(--warning))" }}>
                {totalConsumed.fat}g
              </div>
              <p className="text-xs text-muted-foreground">Fat</p>
              <Progress
                value={(totalConsumed.fat / targets.fat) * 100}
                className="h-1.5 [&>div]:bg-warning"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Meals */}
      <div className="space-y-3">
        {meals.map((meal, mealIdx) => {
          const mealTotals = meal.items.reduce(
            (acc, item) => ({
              calories: acc.calories + item.calories,
              protein: acc.protein + item.protein,
              carbs: acc.carbs + item.carbs,
              fat: acc.fat + item.fat,
            }),
            { calories: 0, protein: 0, carbs: 0, fat: 0 }
          );

          return (
            <Card key={mealIdx} className="fitness-card">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <meal.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{meal.type}</h3>
                      <p className="text-sm text-muted-foreground">{meal.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{mealTotals.calories} kcal</p>
                    <p className="text-xs text-muted-foreground">
                      P: {mealTotals.protein}g • C: {mealTotals.carbs}g • F: {mealTotals.fat}g
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {meal.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-2"
                    >
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium">{item.calories} kcal</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}

        {/* Add Dinner Placeholder */}
        <Button variant="outline" className="w-full justify-start gap-3 py-6">
          <div className="rounded-full bg-muted p-2">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="font-semibold">Add Dinner</p>
            <p className="text-sm text-muted-foreground">Log your evening meal</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
