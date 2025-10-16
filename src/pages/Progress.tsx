import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Progress() {
  const weightData = [
    { date: "Oct 8", weight: 182 },
    { date: "Oct 9", weight: 181.5 },
    { date: "Oct 10", weight: 181 },
    { date: "Oct 11", weight: 180.5 },
    { date: "Oct 12", weight: 180 },
    { date: "Oct 13", weight: 179.5 },
    { date: "Oct 14", weight: 179 },
  ];

  const caloriesData = [
    { day: "Mon", consumed: 2200, burned: 380, target: 2400 },
    { day: "Tue", consumed: 2350, burned: 420, target: 2400 },
    { day: "Wed", consumed: 2100, burned: 450, target: 2400 },
    { day: "Thu", consumed: 2450, burned: 390, target: 2400 },
    { day: "Fri", consumed: 2300, burned: 410, target: 2400 },
    { day: "Sat", consumed: 2500, burned: 350, target: 2400 },
    { day: "Sun", consumed: 1850, burned: 420, target: 2400 },
  ];

  const macrosData = [
    { name: "Protein", value: 145, target: 160, color: "hsl(var(--chart-protein))" },
    { name: "Carbs", value: 180, target: 200, color: "hsl(var(--chart-carbs))" },
    { name: "Fat", value: 62, target: 70, color: "hsl(var(--chart-fat))" },
  ];

  const workoutData = [
    { day: "Mon", calories: 380 },
    { day: "Tue", calories: 420 },
    { day: "Wed", calories: 450 },
    { day: "Thu", calories: 390 },
    { day: "Fri", calories: 410 },
    { day: "Sat", calories: 350 },
    { day: "Sun", calories: 420 },
  ];

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Progress</h1>
        <p className="text-muted-foreground">Track your journey</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="fitness-card">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Weekly Avg</p>
            <p className="text-2xl font-bold">2,250</p>
            <p className="text-xs text-muted-foreground">calories/day</p>
          </div>
        </Card>
        <Card className="fitness-card">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Burned</p>
            <p className="text-2xl font-bold text-orange-500">2,820</p>
            <p className="text-xs text-muted-foreground">this week</p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="weight" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="calories">Calories</TabsTrigger>
          <TabsTrigger value="macros">Macros</TabsTrigger>
        </TabsList>

        <TabsContent value="weight" className="space-y-4">
          <Card className="fitness-card">
            <h3 className="mb-4 font-semibold">Weight Trend (7 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  domain={[178, 183]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-2 text-sm text-muted-foreground">
              You've lost <span className="font-semibold text-success">3 lbs</span> this week! 🎉
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="calories" className="space-y-4">
          <Card className="fitness-card">
            <h3 className="mb-4 font-semibold">Daily Calories (7 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={caloriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="consumed" fill="hsl(var(--primary))" name="Consumed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="burned" fill="hsl(var(--warning))" name="Burned" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="hsl(var(--muted))" name="Target" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="fitness-card">
            <h3 className="mb-4 font-semibold">Workout Calories Burned</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={workoutData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="calories" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="macros" className="space-y-4">
          <Card className="fitness-card">
            <h3 className="mb-4 font-semibold">Today's Macro Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={macrosData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macrosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-3">
              {macrosData.map((macro, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: macro.color }}
                    />
                    <span className="text-sm font-medium">{macro.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {macro.value}g / {macro.target}g
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
