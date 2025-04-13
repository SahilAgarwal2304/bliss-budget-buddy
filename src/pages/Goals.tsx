
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Target, Edit, Trash2, IndianRupee } from "lucide-react";
import { mockGoals, CURRENCY_SYMBOL } from "@/utils/mockData";

const Goals = () => {
  const [goals, setGoals] = useState(mockGoals);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "0",
    deadline: "",
    color: "#3CDFB4",
  });

  const handleAddGoal = () => {
    // In a real app, this would add the goal to the database
    console.log("Adding goal:", newGoal);
    setIsAddDialogOpen(false);
    // Reset form
    setNewGoal({
      name: "",
      targetAmount: "",
      currentAmount: "0",
      deadline: "",
      color: "#3CDFB4",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const differenceInTime = deadlineDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
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
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Goal Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. Emergency Fund"
                    value={newGoal.name}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="targetAmount" className="text-right">
                    Target Amount
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <span className="mr-2"><IndianRupee size={16} /></span>
                    <Input
                      id="targetAmount"
                      type="number"
                      placeholder="0.00"
                      value={newGoal.targetAmount}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, targetAmount: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="currentAmount" className="text-right">
                    Current Amount
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <span className="mr-2"><IndianRupee size={16} /></span>
                    <Input
                      id="currentAmount"
                      type="number"
                      placeholder="0.00"
                      value={newGoal.currentAmount}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, currentAmount: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deadline" className="text-right">
                    Deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, deadline: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="color" className="text-right">
                    Color
                  </Label>
                  <div className="flex gap-2 col-span-3">
                    {["#3CDFB4", "#4CD964", "#007AFF", "#FF9500", "#FF2D55", "#5856D6"].map(
                      (color) => (
                        <button
                          key={color}
                          type="button"
                          className={`h-8 w-8 rounded-full ${
                            newGoal.color === color
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                              : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setNewGoal({ ...newGoal, color })}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleAddGoal}
                  className="bg-budget-teal text-budget-navy hover:bg-budget-teal/90"
                >
                  Create Goal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <Card key={goal.id} className="overflow-hidden">
              <div
                className="h-2"
                style={{ backgroundColor: goal.color }}
              ></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{goal.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground text-sm">Progress</span>
                      <span className="text-muted-foreground text-sm">
                        {((goal.currentAmount / goal.targetAmount) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="absolute h-full transition-all"
                        style={{ 
                          width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%`,
                          backgroundColor: goal.color 
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-muted-foreground text-sm">Current</div>
                      <div className="text-xl font-bold flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {goal.currentAmount}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm">Target</div>
                      <div className="text-xl font-bold flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {goal.targetAmount}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-2 border-t border-border">
                    <div>
                      <div className="text-muted-foreground text-sm">Deadline</div>
                      <div>{formatDate(goal.deadline)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-muted-foreground text-sm">Days Left</div>
                      <div>{calculateDaysRemaining(goal.deadline)}</div>
                    </div>
                  </div>
                  
                  <div className="pt-3">
                    <Button className="w-full" style={{ backgroundColor: goal.color, color: "#0F1721" }}>
                      <Target className="mr-2 h-4 w-4" />
                      Add Money
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Goals;
