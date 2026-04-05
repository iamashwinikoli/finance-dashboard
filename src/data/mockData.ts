export type Role = "admin" | "viewer";
export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export const CATEGORIES = [
  "Salary", "Freelance", "Food", "Utilities", "Transport",
  "Entertainment", "Health", "Education", "Housing", "Shopping", "Other",
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", date: "2025-04-01", description: "Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "2", date: "2025-04-02", description: "Grocery Shopping", amount: 156.50, category: "Food", type: "expense" },
  { id: "3", date: "2025-04-03", description: "Electric Bill", amount: 89.00, category: "Utilities", type: "expense" },
  { id: "4", date: "2025-04-05", description: "Freelance Work", amount: 800, category: "Freelance", type: "income" },
  { id: "5", date: "2025-04-06", description: "Netflix", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: "6", date: "2025-04-08", description: "Gas Station", amount: 45.00, category: "Transport", type: "expense" },
  { id: "7", date: "2025-04-10", description: "Restaurant Dinner", amount: 72.30, category: "Food", type: "expense" },
  { id: "8", date: "2025-04-12", description: "Side Project Income", amount: 350, category: "Freelance", type: "income" },
  { id: "9", date: "2025-04-14", description: "Gym Membership", amount: 40.00, category: "Health", type: "expense" },
  { id: "10", date: "2025-04-15", description: "Online Course", amount: 29.99, category: "Education", type: "expense" },
  { id: "11", date: "2025-04-17", description: "Coffee Shop", amount: 18.50, category: "Food", type: "expense" },
  { id: "12", date: "2025-04-19", description: "Book Purchase", amount: 24.99, category: "Education", type: "expense" },
  { id: "13", date: "2025-03-01", description: "Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "14", date: "2025-03-05", description: "Rent", amount: 1200, category: "Housing", type: "expense" },
  { id: "15", date: "2025-03-10", description: "Groceries", amount: 210, category: "Food", type: "expense" },
  { id: "16", date: "2025-03-15", description: "Internet Bill", amount: 60, category: "Utilities", type: "expense" },
  { id: "17", date: "2025-03-20", description: "Freelance Project", amount: 600, category: "Freelance", type: "income" },
  { id: "18", date: "2025-03-25", description: "Clothing", amount: 130, category: "Shopping", type: "expense" },
];
