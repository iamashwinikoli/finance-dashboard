import { useDashboard } from "@/context/DashboardContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BalanceTrendChart = () => {
  const { transactions } = useDashboard();

  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
  const dailyMap = new Map<string, { income: number; expense: number }>();

  sorted.forEach((t) => {
    const existing = dailyMap.get(t.date) || { income: 0, expense: 0 };
    if (t.type === "income") existing.income += t.amount;
    else existing.expense += t.amount;
    dailyMap.set(t.date, existing);
  });

  let runningBalance = 0;
  const data = Array.from(dailyMap.entries()).map(([date, { income, expense }]) => {
    runningBalance += income - expense;
    return {
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      balance: Math.round(runningBalance * 100) / 100,
      income,
      expense,
    };
  });

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Balance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(220 70% 50%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(220 70% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" tickFormatter={(v) => `$${v}`} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220 13% 91%)", fontSize: 13 }} formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]} />
              <Area type="monotone" dataKey="balance" stroke="hsl(220 70% 50%)" fill="url(#balanceGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceTrendChart;
