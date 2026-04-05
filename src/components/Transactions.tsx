import { useDashboard } from "@/context/DashboardContext";
import { Transaction } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import AddTransactionDialog from "./AddTransactionDialog";

const Transactions = () => {
  const { transactions, filters, setFilters, role, deleteTransaction } = useDashboard();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  let filtered = transactions.filter((t) => {
    if (filters.type !== "all" && t.type !== filters.type) return false;
    if (filters.category && t.category !== filters.category) return false;
    if (filters.search && !t.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const mul = filters.sortOrder === "asc" ? 1 : -1;
    if (filters.sortBy === "date") return mul * a.date.localeCompare(b.date);
    return mul * (a.amount - b.amount);
  });

  const toggleSort = () => {
    setFilters((f) => ({ ...f, sortOrder: f.sortOrder === "asc" ? "desc" : "asc" }));
  };

  return (
    <>
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base font-semibold">Transactions</CardTitle>
            {role === "admin" && (
              <Button size="sm" onClick={() => { setEditingTx(null); setDialogOpen(true); }}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-9" value={filters.search} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))} />
            </div>
            <Select value={filters.type} onValueChange={(v) => setFilters((f) => ({ ...f, type: v as any }))}>
              <SelectTrigger className="w-full sm:w-[130px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.category || "all"} onValueChange={(v) => setFilters((f) => ({ ...f, category: v === "all" ? "" : v }))}>
              <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={toggleSort} title="Toggle sort order">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No transactions found.</div>
          ) : (
            <div className="space-y-2">
              {filtered.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-card-foreground truncate">{tx.description}</p>
                      <Badge variant={tx.type === "income" ? "default" : "destructive"} className="text-xs">{tx.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {tx.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${tx.type === "income" ? "text-success" : "text-destructive"}`}>
                      {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                    {role === "admin" && (
                      <div className="flex gap-1 ml-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditingTx(tx); setDialogOpen(true); }}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteTransaction(tx.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <AddTransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} editingTransaction={editingTx} />
    </>
  );
};

export default Transactions;
