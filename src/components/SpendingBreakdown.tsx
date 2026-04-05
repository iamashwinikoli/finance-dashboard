import { useDashboard } from "@/context/DashboardContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "hsl(220 70% 50%)", "hsl(142 71% 45%)", "hsl(38 92% 50%)", "hsl(0 72% 51%)",
  "hsl(270 60% 55%)", "hsl(180 60% 45%)", "hsl(320 60% 50%)", "hsl(45 80% 55%)",
];

const SpendingBreakdown = () => {
  const { transactions } = useDashboard();

  const expenses = transactions.filter((t) => t.type === "expense");
  const catMap = new Map<string, number>();
  expenses.forEach((t) => catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));

  const data = Array.from(catMap.entries())
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Spending Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="h-[220px] w-[220px] flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2}>
                  {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} contentStyle={{ borderRadius: "8px", fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2 w-full">
            {data.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-card-foreground">{d.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{((d.value / total) * 100).toFixed(0)}%</span>
                  <span className="font-medium text-card-foreground">${d.value.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingBreakdown;
