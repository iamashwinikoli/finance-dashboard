import { useDashboard } from "@/context/DashboardContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const Insights = () => {
  const { transactions } = useDashboard();

  const expenses = transactions.filter((t) => t.type === "expense");
  const catMap = new Map<string, number>();
  expenses.forEach((t) => catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));
  const highestCat = Array.from(catMap.entries()).sort((a, b) => b[1] - a[1])[0];

  const getMonthTotal = (month: string, type: "income" | "expense") =>
    transactions.filter((t) => t.date.startsWith(month) && t.type === type).reduce((s, t) => s + t.amount, 0);

  const currentMonth = "2025-04";
  const prevMonth = "2025-03";
  const currentExp = getMonthTotal(currentMonth, "expense");
  const prevExp = getMonthTotal(prevMonth, "expense");
  const expChange = prevExp > 0 ? ((currentExp - prevExp) / prevExp) * 100 : 0;

  const currentInc = getMonthTotal(currentMonth, "income");
  const prevInc = getMonthTotal(prevMonth, "income");
  const avgTxAmount = expenses.length > 0 ? expenses.reduce((s, t) => s + t.amount, 0) / expenses.length : 0;

  const insights = [
    { icon: BarChart3, title: "Highest Spending", value: highestCat ? `${highestCat[0]} — $${highestCat[1].toLocaleString()}` : "No data", color: "text-warning" },
    { icon: expChange <= 0 ? TrendingDown : TrendingUp, title: "Monthly Expenses", value: `${expChange > 0 ? "+" : ""}${expChange.toFixed(0)}% vs last month`, subtitle: `$${currentExp.toLocaleString()} this month`, color: expChange <= 0 ? "text-success" : "text-destructive" },
    { icon: TrendingUp, title: "Income This Month", value: `$${currentInc.toLocaleString()}`, subtitle: `vs $${prevInc.toLocaleString()} last month`, color: "text-primary" },
    { icon: Lightbulb, title: "Avg. Expense", value: `$${avgTxAmount.toFixed(2)}`, subtitle: `Across ${expenses.length} transactions`, color: "text-muted-foreground" },
  ];

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-warning" /> Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {insights.map((ins) => (
            <div key={ins.title} className="p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <ins.icon className={`h-4 w-4 ${ins.color}`} />
                <span className="text-xs font-medium text-muted-foreground">{ins.title}</span>
              </div>
              <p className="text-sm font-semibold text-card-foreground">{ins.value}</p>
              {ins.subtitle && <p className="text-xs text-muted-foreground mt-0.5">{ins.subtitle}</p>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Insights;
