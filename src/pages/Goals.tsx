
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { mockGoals } from "@/utils/mockData";
import { Goal } from "@/utils/mockData";
import GoalCard from "@/components/goals/GoalCard";
import GoalForm from "@/components/goals/GoalForm";
import AddMoneyForm from "@/components/goals/AddMoneyForm";
import { useToast } from "@/hooks/use-toast";

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddMoneyDialogOpen, setIsAddMoneyDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const { toast } = useToast();

  const initialGoalValues = {
    name: "",
    targetAmount: 0,
    currentAmount: 0,
    deadline: "",
    color: "#3CDFB4",
  };

  const handleAddGoal = (values: Omit<Goal, 'id'>) => {
    // Generate a unique ID
    const newGoal: Goal = {
      ...values,
      id: Math.random().toString(36).substr(2, 9),
    };
    
    // Add the new goal to the list
    setGoals([...goals, newGoal]);
    setIsAddDialogOpen(false);
    
    // Show success toast
    toast({
      title: "Goal Created",
      description: `${newGoal.name} has been created successfully.`,
    });
  };

  const handleEditGoal = (values: Omit<Goal, 'id'>) => {
    if (!selectedGoal) return;
    
    // Update the selected goal
    const updatedGoals = goals.map((goal) => 
      goal.id === selectedGoal.id ? { ...values, id: selectedGoal.id } : goal
    );
    
    setGoals(updatedGoals);
    setIsEditDialogOpen(false);
    setSelectedGoal(null);
    
    // Show success toast
    toast({
      title: "Goal Updated",
      description: `${values.name} has been updated successfully.`,
    });
  };

  const handleDeleteGoal = (id: string) => {
    // Find the goal to be deleted
    const goalToDelete = goals.find(goal => goal.id === id);
    if (!goalToDelete) return;
    
    // Filter out the goal with the matching ID
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
    
    // Show success toast
    toast({
      title: "Goal Deleted",
      description: `${goalToDelete.name} has been deleted.`,
    });
  };

  const handleAddMoney = (goalId: string, amount: number) => {
    // Update the goal with the added money
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const newAmount = goal.currentAmount + amount;
        const isCompleted = newAmount >= goal.targetAmount;
        
        return {
          ...goal,
          currentAmount: newAmount,
        };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    setIsAddMoneyDialogOpen(false);
    setSelectedGoal(null);
    
    // Show success toast
    toast({
      title: "Money Added",
      description: `₹${amount} has been added to your goal.`,
    });
  };

  const openEditDialog = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsEditDialogOpen(true);
  };

  const openAddMoneyDialog = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsAddMoneyDialogOpen(true);
  };

  return (
    <Layout>
      <div className="budget-container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
            <p className="text-muted-foreground mt-1">
              Set and track your financial goals
            </p>
          </div>
          
          {/* Add Goal Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-budget-teal text-budget-navy hover:bg-budget-teal/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Savings Goal</DialogTitle>
                <DialogDescription>
                  Set up a new financial goal to track your progress.
                </DialogDescription>
              </DialogHeader>
              <GoalForm 
                initialValues={initialGoalValues}
                onSubmit={handleAddGoal}
              />
            </DialogContent>
          </Dialog>
          
          {/* Edit Goal Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Savings Goal</DialogTitle>
                <DialogDescription>
                  Update your financial goal details.
                </DialogDescription>
              </DialogHeader>
              {selectedGoal && (
                <GoalForm 
                  initialValues={selectedGoal}
                  onSubmit={handleEditGoal}
                  isEditing={true}
                />
              )}
            </DialogContent>
          </Dialog>
          
          {/* Add Money Dialog */}
          <Dialog open={isAddMoneyDialogOpen} onOpenChange={setIsAddMoneyDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Money to Goal</DialogTitle>
                <DialogDescription>
                  Add money to your savings goal.
                </DialogDescription>
              </DialogHeader>
              {selectedGoal && (
                <AddMoneyForm 
                  goal={selectedGoal}
                  onSubmit={handleAddMoney}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={openEditDialog}
              onDelete={handleDeleteGoal}
              onAddMoney={openAddMoneyDialog}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Goals;
