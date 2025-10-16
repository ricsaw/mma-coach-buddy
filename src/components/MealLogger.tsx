import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Meal {
  id: string;
  name: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealLoggerProps {
  meals: Meal[];
  onAddMeal: (meal: Meal) => void;
  onRemoveMeal: (id: string) => void;
}

export const MealLogger = ({ meals, onAddMeal, onRemoveMeal }: MealLoggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mealData, setMealData] = useState({
    name: "",
    mealType: "breakfast" as Meal["mealType"],
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const handleSubmit = () => {
    if (!mealData.name || !mealData.calories) return;

    const newMeal: Meal = {
      id: Date.now().toString(),
      name: mealData.name,
      mealType: mealData.mealType,
      calories: Number(mealData.calories),
      protein: Number(mealData.protein) || 0,
      carbs: Number(mealData.carbs) || 0,
      fat: Number(mealData.fat) || 0,
    };

    onAddMeal(newMeal);
    setMealData({
      name: "",
      mealType: "breakfast",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    });
    setIsOpen(false);
  };

  const getMealsByType = (type: Meal["mealType"]) =>
    meals.filter((m) => m.mealType === type);

  const renderMealSection = (type: Meal["mealType"], title: string) => {
    const typeMeals = getMealsByType(type);
    const totalCals = typeMeals.reduce((sum, m) => sum + m.calories, 0);

    return (
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h4 className="font-semibold capitalize">{title}</h4>
          <span className="text-sm text-muted-foreground">{totalCals} kcal</span>
        </div>
        {typeMeals.length === 0 ? (
          <p className="text-sm text-muted-foreground">No meals logged</p>
        ) : (
          <div className="space-y-2">
            {typeMeals.map((meal) => (
              <Card key={meal.id} className="flex items-center justify-between p-3">
                <div>
                  <p className="font-medium">{meal.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {meal.calories} cal • P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveMeal(meal.id)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderMealSection("breakfast", "Breakfast")}
      {renderMealSection("lunch", "Lunch")}
      {renderMealSection("dinner", "Dinner")}
      {renderMealSection("snack", "Snacks")}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Log Meal
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log a Meal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Meal Name</Label>
              <Input
                id="name"
                value={mealData.name}
                onChange={(e) => setMealData({ ...mealData, name: e.target.value })}
                placeholder="e.g., Chicken & Rice"
              />
            </div>

            <div>
              <Label htmlFor="mealType">Meal Type</Label>
              <Select
                value={mealData.mealType}
                onValueChange={(value: Meal["mealType"]) =>
                  setMealData({ ...mealData, mealType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  value={mealData.calories}
                  onChange={(e) => setMealData({ ...mealData, calories: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  value={mealData.protein}
                  onChange={(e) => setMealData({ ...mealData, protein: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  value={mealData.carbs}
                  onChange={(e) => setMealData({ ...mealData, carbs: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="fat">Fat (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  value={mealData.fat}
                  onChange={(e) => setMealData({ ...mealData, fat: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Add Meal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
