import { useDashboard } from "@/context/DashboardContext";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Activity } from "lucide-react";

const SummaryCards = () => {
  const { transactions } = useDashboard();

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const txCount = transactions.length;

  const cards = [
    { label: "Total Balance", value: balance, icon: DollarSign, color: "text-primary" },
    { label: "Income", value: totalIncome, icon: TrendingUp, color: "text-success" },
    { label: "Expenses", value: totalExpenses, icon: TrendingDown, color: "text-destructive" },
    { label: "Transactions", value: txCount, icon: Activity, color: "text-muted-foreground", isCurrency: false },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <Card key={c.label} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">{c.label}</span>
              <c.icon className={`h-4 w-4 ${c.color}`} />
            </div>
            <p className="text-2xl font-bold tracking-tight text-card-foreground">
              {c.isCurrency === false ? c.value : `$${c.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
