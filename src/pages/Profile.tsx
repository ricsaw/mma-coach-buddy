import { User, Target, Ruler, Weight, Calendar, Settings, Moon, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);

  const userProfile = {
    name: "Jordan Smith",
    age: 28,
    gender: "Male",
    height: "6'0\"",
    currentWeight: 179,
    goalWeight: 175,
    startWeight: 185,
    goal: "Fat Loss & MMA Training",
    joined: "March 2024",
    stats: {
      totalWorkouts: 142,
      streakDays: 7,
      caloriesBurned: 65420,
      mealsLogged: 486,
    },
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Your fitness journey</p>
      </div>

      {/* Profile Card */}
      <Card className="fitness-card">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
              {userProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{userProfile.name}</h2>
            <p className="text-sm text-muted-foreground">
              {userProfile.age} years • {userProfile.gender}
            </p>
            <p className="mt-2 text-sm">
              <span className="font-medium">Goal:</span> {userProfile.goal}
            </p>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="fitness-card text-center">
          <p className="text-3xl font-bold text-primary">{userProfile.stats.totalWorkouts}</p>
          <p className="text-sm text-muted-foreground">Total Workouts</p>
        </Card>
        <Card className="fitness-card text-center">
          <p className="text-3xl font-bold text-orange-500">{userProfile.stats.streakDays}</p>
          <p className="text-sm text-muted-foreground">Day Streak</p>
        </Card>
        <Card className="fitness-card text-center">
          <p className="text-3xl font-bold text-success">{(userProfile.stats.caloriesBurned / 1000).toFixed(1)}k</p>
          <p className="text-sm text-muted-foreground">Calories Burned</p>
        </Card>
        <Card className="fitness-card text-center">
          <p className="text-3xl font-bold">{userProfile.stats.mealsLogged}</p>
          <p className="text-sm text-muted-foreground">Meals Logged</p>
        </Card>
      </div>

      {/* Body Metrics */}
      <Card className="fitness-card">
        <h3 className="mb-4 font-semibold">Body Metrics</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Ruler className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Height</p>
                <p className="font-semibold">{userProfile.height}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Weight className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Weight</p>
                <p className="font-semibold">{userProfile.currentWeight} lbs</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-success/10 p-2">
                <Target className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Goal Weight</p>
                <p className="font-semibold">{userProfile.goalWeight} lbs</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-2">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Starting Weight</p>
                <p className="font-semibold">{userProfile.startWeight} lbs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-success/10 p-3 text-center">
          <p className="text-sm font-medium text-success">
            Progress: {userProfile.startWeight - userProfile.currentWeight} lbs lost • {userProfile.currentWeight - userProfile.goalWeight} lbs to go!
          </p>
        </div>
      </Card>

      {/* Settings */}
      <Card className="fitness-card">
        <h3 className="mb-4 font-semibold">Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle theme</p>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>

          <Button variant="outline" className="w-full justify-start gap-3">
            <Settings className="h-5 w-5" />
            Edit Profile
          </Button>

          <Button variant="outline" className="w-full justify-start gap-3">
            <Target className="h-5 w-5" />
            Update Goals
          </Button>
        </div>
      </Card>
    </div>
  );
}
