import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { UserProfile } from "@/components/OnboardingFlow";
import { Meal } from "@/components/MealLogger";
import { Exercise } from "@/data/exercises";

interface DailyStats {
  caloriesConsumed: number;
  caloriesBurned: number;
  protein: number;
  carbs: number;
  fat: number;
  workoutsCompleted: Exercise[];
}

interface FitnessContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  dailyMeals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (id: string) => void;
  dailyStats: DailyStats;
  caloriesTarget: number;
  macrosTarget: { protein: number; carbs: number; fat: number };
  streak: number;
  completeWorkout: (exercises: Exercise[]) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

const calculateCaloriesTarget = (profile: UserProfile): number => {
  // Simplified BMR calculation using Mifflin-St Jeor
  const heightCm = profile.height * 2.54;
  const weightKg = profile.weight * 0.453592;
  
  let bmr: number;
  if (profile.gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * profile.age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * profile.age - 161;
  }

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  let tdee = bmr * activityMultipliers[profile.activityLevel];

  // Adjust based on goal
  if (profile.goal === "lose_weight") {
    tdee -= 500;
  } else if (profile.goal === "gain_muscle") {
    tdee += 300;
  }

  return Math.round(tdee);
};

const calculateMacrosTarget = (calories: number, goal: string) => {
  let proteinRatio = 0.3;
  let carbsRatio = 0.4;
  let fatRatio = 0.3;

  if (goal === "gain_muscle") {
    proteinRatio = 0.35;
    carbsRatio = 0.45;
    fatRatio = 0.2;
  } else if (goal === "lose_weight") {
    proteinRatio = 0.4;
    carbsRatio = 0.3;
    fatRatio = 0.3;
  }

  return {
    protein: Math.round((calories * proteinRatio) / 4),
    carbs: Math.round((calories * carbsRatio) / 4),
    fat: Math.round((calories * fatRatio) / 9),
  };
};

export const FitnessProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : null;
  });

  const [dailyMeals, setDailyMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem("dailyMeals");
    return saved ? JSON.parse(saved) : [];
  });

  const [workoutsCompleted, setWorkoutsCompleted] = useState<Exercise[]>([]);
  const [streak, setStreak] = useState(7);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("dailyMeals", JSON.stringify(dailyMeals));
  }, [dailyMeals]);

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
  };

  const addMeal = (meal: Meal) => {
    setDailyMeals([...dailyMeals, meal]);
  };

  const removeMeal = (id: string) => {
    setDailyMeals(dailyMeals.filter((m) => m.id !== id));
  };

  const completeWorkout = (exercises: Exercise[]) => {
    setWorkoutsCompleted([...workoutsCompleted, ...exercises]);
    setStreak(streak + 1);
  };

  const caloriesTarget = userProfile ? calculateCaloriesTarget(userProfile) : 2400;
  const macrosTarget = userProfile
    ? calculateMacrosTarget(caloriesTarget, userProfile.goal)
    : { protein: 160, carbs: 200, fat: 70 };

  const dailyStats: DailyStats = {
    caloriesConsumed: dailyMeals.reduce((sum, m) => sum + m.calories, 0),
    caloriesBurned: workoutsCompleted.reduce((sum, e) => sum + e.caloriesBurned, 0),
    protein: dailyMeals.reduce((sum, m) => sum + m.protein, 0),
    carbs: dailyMeals.reduce((sum, m) => sum + m.carbs, 0),
    fat: dailyMeals.reduce((sum, m) => sum + m.fat, 0),
    workoutsCompleted,
  };

  return (
    <FitnessContext.Provider
      value={{
        userProfile,
        setUserProfile,
        dailyMeals,
        addMeal,
        removeMeal,
        dailyStats,
        caloriesTarget,
        macrosTarget,
        streak,
        completeWorkout,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error("useFitness must be used within FitnessProvider");
  }
  return context;
};
