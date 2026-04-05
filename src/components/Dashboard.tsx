import SummaryCards from "@/components/SummaryCards";
import BalanceTrendChart from "@/components/BalanceTrendChart";
import SpendingBreakdown from "@/components/SpendingBreakdown";
import Transactions from "@/components/Transactions";
import Insights from "@/components/Insights";
import RoleSwitcher from "@/components/RoleSwitcher";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Finance Tracker</h1>
          </div>
          <RoleSwitcher />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <SummaryCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BalanceTrendChart />
          <SpendingBreakdown />
        </div>
        <Insights />
        <Transactions />
      </main>
    </div>
  );
};

export default Dashboard;
