import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Receipt } from "lucide-react";
import { Employee, ExpenseClaim } from "@shared/types";
import { expenseClaims } from "@shared/database";

interface ExpenseClaimModalProps {
  onExpenseSubmitted: (expense: ExpenseClaim) => void;
}

export default function ExpenseClaimModal({
  onExpenseSubmitted,
}: ExpenseClaimModalProps) {
  const { user } = useAuth();
  const employee = user as Employee;

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.amount ||
        !formData.category
      ) {
        setError("Please fill in all required fields");
        return;
      }

      if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
        setError("Please enter a valid amount");
        return;
      }

      const newExpenseClaim: ExpenseClaim = {
        id: `exp-${Date.now()}`,
        employeeId: employee.id,
        title: formData.title,
        description: formData.description,
        amount: Number(formData.amount),
        category: formData.category as any,
        submittedAt: new Date().toISOString(),
        status: "Pending",
      };

      // Add to database
      expenseClaims.push(newExpenseClaim);

      // Call callback
      onExpenseSubmitted(newExpenseClaim);

      // Reset form
      setFormData({
        title: "",
        description: "",
        amount: "",
        category: "",
      });

      setIsOpen(false);
    } catch (err) {
      setError("Failed to submit expense claim. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 shadow-medium">
          <Receipt className="mr-2 h-4 w-4" />
          Submit Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-white/95 backdrop-blur-sm border-0 shadow-strong">
        <DialogHeader>
          <DialogTitle className="text-slate-900 text-xl font-semibold">
            Submit Expense Claim
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-700 font-semibold">
                Expense Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Client Meeting Lunch"
                className="bg-white/70 border-slate-200 focus:border-slate-400 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-slate-700 font-semibold"
              >
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger className="bg-white/70 border-slate-200 focus:border-slate-400 rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Meals">Meals</SelectItem>
                  <SelectItem value="Office Supplies">
                    Office Supplies
                  </SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-slate-700 font-semibold">
                Amount (₹) *
              </Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                placeholder="Enter amount"
                min="0"
                step="0.01"
                className="bg-white/70 border-slate-200 focus:border-slate-400 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-slate-700 font-semibold"
              >
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Provide detailed description of the expense"
                rows={4}
                className="bg-white/70 border-slate-200 focus:border-slate-400 rounded-xl resize-none"
                required
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 rounded-xl shadow-medium"
            >
              {isLoading ? "Submitting..." : "Submit Claim"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
