import React, { createContext, useContext, useState, useCallback } from "react";
import { Role, Transaction, TransactionType, MOCK_TRANSACTIONS } from "@/data/mockData";

interface Filters {
  search: string;
  type: "all" | TransactionType;
  category: string;
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

interface DashboardContextType {
  role: Role;
  setRole: (role: Role) => void;
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>("admin");
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "all",
    category: "",
    sortBy: "date",
    sortOrder: "desc",
  });

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ ...t, id: Date.now().toString() }, ...prev]);
  }, []);

  const editTransaction = useCallback((id: string, t: Omit<Transaction, "id">) => {
    setTransactions((prev) => prev.map((tx) => (tx.id === id ? { ...t, id } : tx)));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  return (
    <DashboardContext.Provider value={{ role, setRole, transactions, addTransaction, editTransaction, deleteTransaction, filters, setFilters }}>
      {children}
    </DashboardContext.Provider>
  );
};
