export interface Exercise {
  id: string;
  name: string;
  category: "warmup" | "strength" | "cardio" | "mma" | "cooldown";
  sets?: number;
  reps?: number;
  duration?: string;
  caloriesBurned: number;
  description: string;
  equipment?: string;
}

export const exerciseDatabase: Exercise[] = [
  // Warm-up
  {
    id: "w1",
    name: "Jumping Jacks",
    category: "warmup",
    duration: "2 min",
    caloriesBurned: 20,
    description: "Full body warm-up to increase heart rate",
  },
  {
    id: "w2",
    name: "Arm Circles",
    category: "warmup",
    sets: 2,
    reps: 15,
    caloriesBurned: 10,
    description: "Shoulder mobility and warm-up",
  },
  {
    id: "w3",
    name: "Hip Rotations",
    category: "warmup",
    sets: 2,
    reps: 10,
    caloriesBurned: 8,
    description: "Hip mobility and flexibility",
  },

  // Strength
  {
    id: "s1",
    name: "Push-ups",
    category: "strength",
    sets: 3,
    reps: 15,
    caloriesBurned: 50,
    description: "Chest, triceps, and core strength",
    equipment: "Bodyweight",
  },
  {
    id: "s2",
    name: "Squats",
    category: "strength",
    sets: 4,
    reps: 12,
    caloriesBurned: 60,
    description: "Leg and glute strength",
    equipment: "Bodyweight",
  },
  {
    id: "s3",
    name: "Pull-ups",
    category: "strength",
    sets: 3,
    reps: 8,
    caloriesBurned: 55,
    description: "Back and bicep strength",
    equipment: "Pull-up bar",
  },
  {
    id: "s4",
    name: "Lunges",
    category: "strength",
    sets: 3,
    reps: 12,
    caloriesBurned: 45,
    description: "Single leg strength and balance",
    equipment: "Bodyweight",
  },

  // MMA Specific
  {
    id: "m1",
    name: "Shadow Boxing",
    category: "mma",
    duration: "3 rounds x 3 min",
    caloriesBurned: 150,
    description: "Practice striking combinations and footwork",
    equipment: "None",
  },
  {
    id: "m2",
    name: "Heavy Bag Work",
    category: "mma",
    duration: "5 rounds x 2 min",
    caloriesBurned: 200,
    description: "Power punching and kicking",
    equipment: "Heavy bag",
  },
  {
    id: "m3",
    name: "Pad Work",
    category: "mma",
    duration: "4 rounds x 3 min",
    caloriesBurned: 180,
    description: "Partner drills with focus mitts",
    equipment: "Focus mitts, partner",
  },
  {
    id: "m4",
    name: "Sprawl Drills",
    category: "mma",
    sets: 4,
    reps: 10,
    caloriesBurned: 70,
    description: "Takedown defense conditioning",
    equipment: "None",
  },

  // Cardio
  {
    id: "c1",
    name: "Burpees",
    category: "cardio",
    sets: 3,
    reps: 15,
    caloriesBurned: 80,
    description: "Full body conditioning",
    equipment: "Bodyweight",
  },
  {
    id: "c2",
    name: "Mountain Climbers",
    category: "cardio",
    duration: "3 x 1 min",
    caloriesBurned: 60,
    description: "Core and cardio conditioning",
    equipment: "Bodyweight",
  },
  {
    id: "c3",
    name: "Jump Rope",
    category: "cardio",
    duration: "10 min",
    caloriesBurned: 120,
    description: "Footwork and cardio",
    equipment: "Jump rope",
  },

  // Cool-down
  {
    id: "cd1",
    name: "Quad Stretch",
    category: "cooldown",
    duration: "2 min",
    caloriesBurned: 5,
    description: "Static stretching for quadriceps",
  },
  {
    id: "cd2",
    name: "Hamstring Stretch",
    category: "cooldown",
    duration: "2 min",
    caloriesBurned: 5,
    description: "Static stretching for hamstrings",
  },
  {
    id: "cd3",
    name: "Shoulder Stretch",
    category: "cooldown",
    duration: "2 min",
    caloriesBurned: 5,
    description: "Upper body stretching and recovery",
  },
];

export const generateWorkout = (
  focus: "strength" | "cardio" | "mma" | "mixed" = "mixed"
): Exercise[] => {
  const workout: Exercise[] = [];

  // Always add warm-up
  workout.push(exerciseDatabase.find((e) => e.id === "w1")!);
  workout.push(exerciseDatabase.find((e) => e.id === "w2")!);

  // Add main exercises based on focus
  if (focus === "mma" || focus === "mixed") {
    workout.push(exerciseDatabase.find((e) => e.id === "m1")!);
    workout.push(exerciseDatabase.find((e) => e.id === "m4")!);
  }

  if (focus === "strength" || focus === "mixed") {
    workout.push(exerciseDatabase.find((e) => e.id === "s1")!);
    workout.push(exerciseDatabase.find((e) => e.id === "s2")!);
  }

  if (focus === "cardio" || focus === "mixed") {
    workout.push(exerciseDatabase.find((e) => e.id === "c1")!);
    workout.push(exerciseDatabase.find((e) => e.id === "c3")!);
  }

  // Always add cool-down
  workout.push(exerciseDatabase.find((e) => e.id === "cd1")!);
  workout.push(exerciseDatabase.find((e) => e.id === "cd2")!);

  return workout;
};
