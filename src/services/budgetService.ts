
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ExpenseCategory } from "./expenseService";

export interface Budget {
  id: string;
  category: ExpenseCategory;
  limit: number;
  spent: number;
  period: "daily" | "weekly" | "monthly";
  user_id?: string;
}

export const fetchBudgets = async (): Promise<Budget[]> => {
  try {
    const { data, error } = await supabase
      .from("budgets")
      .select("*");

    if (error) throw error;

    return data.map(budget => ({
      id: budget.id,
      category: budget.category as ExpenseCategory,
      limit: Number(budget.limit_amount),
      spent: Number(budget.spent),
      period: budget.period as "daily" | "weekly" | "monthly",
      user_id: budget.user_id
    }));
  } catch (error: any) {
    toast.error(error.message || "Failed to fetch budgets");
    return [];
  }
};

export const createBudget = async (budgetData: Omit<Budget, "id">): Promise<Budget | null> => {
  try {
    const { data, error } = await supabase
      .from("budgets")
      .insert({
        category: budgetData.category,
        limit_amount: budgetData.limit,
        spent: budgetData.spent,
        period: budgetData.period
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      category: data.category as ExpenseCategory,
      limit: Number(data.limit_amount),
      spent: Number(data.spent),
      period: data.period as "daily" | "weekly" | "monthly",
      user_id: data.user_id
    };
  } catch (error: any) {
    toast.error(error.message || "Failed to create budget");
    return null;
  }
};

export const updateBudget = async (id: string, budgetData: Partial<Omit<Budget, "id">>): Promise<Budget | null> => {
  try {
    const dbData: any = {};
    if (budgetData.category !== undefined) dbData.category = budgetData.category;
    if (budgetData.limit !== undefined) dbData.limit_amount = budgetData.limit;
    if (budgetData.spent !== undefined) dbData.spent = budgetData.spent;
    if (budgetData.period !== undefined) dbData.period = budgetData.period;

    const { data, error } = await supabase
      .from("budgets")
      .update(dbData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      category: data.category as ExpenseCategory,
      limit: Number(data.limit_amount),
      spent: Number(data.spent),
      period: data.period as "daily" | "weekly" | "monthly",
      user_id: data.user_id
    };
  } catch (error: any) {
    toast.error(error.message || "Failed to update budget");
    return null;
  }
};

export const deleteBudget = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("budgets")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  } catch (error: any) {
    toast.error(error.message || "Failed to delete budget");
    return false;
  }
};
