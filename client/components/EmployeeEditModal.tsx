import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Edit } from "lucide-react";
import { Employee } from "@shared/api";
import { employees } from "@shared/database";

interface EmployeeEditModalProps {
  employee: Employee;
  onEmployeeUpdated: (employee: Employee) => void;
}

export default function EmployeeEditModal({
  employee,
  onEmployeeUpdated,
}: EmployeeEditModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: employee.fullName,
    email: employee.email,
    role: employee.role,
    gender: employee.gender,
    mobileNumber: employee.mobileNumber,
    emergencyContact: employee.emergencyContact,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const updatedEmployee: Employee = {
        ...employee,
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        gender: formData.gender as "Male" | "Female",
        mobileNumber: formData.mobileNumber,
        emergencyContact: formData.emergencyContact,
      };

      // Update in database
      const employeeIndex = employees.findIndex(
        (emp) => emp.id === employee.id,
      );
      if (employeeIndex !== -1) {
        employees[employeeIndex] = updatedEmployee;
      }

      // Call callback
      onEmployeeUpdated(updatedEmployee);

      setIsOpen(false);
    } catch (err) {
      setError("Failed to update employee. Please try again.");
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
        <Button variant="outline" size="sm" className="hover:bg-slate-50">
          <Edit className="mr-1 h-3 w-3" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm border-0 shadow-strong">
        <DialogHeader>
          <DialogTitle className="text-slate-900 text-xl font-semibold">
            Edit Employee Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-slate-700 font-semibold"
              >
                Full Name *
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="bg-white/70 border-slate-200 focus:border-slate-400 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-white/70 border-slate-200 focus:border-slate-400 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-slate-700 font-semibold">
                Role *
              </Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="bg-white/70 border-slate-200 focus:border-slate-400 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-slate-700 font-semibold">
                Gender *
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger className="bg-white/70 border-slate-200 focus:border-slate-400 rounded-xl">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="mobileNumber"
                className="text-slate-700 font-semibold"
              >
                Mobile Number *
              </Label>
              <Input
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) =>
                  handleInputChange("mobileNumber", e.target.value)
                }
                className="bg-white/70 border-slate-200 focus:border-slate-400 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="emergencyContact"
                className="text-slate-700 font-semibold"
              >
                Emergency Contact *
              </Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) =>
                  handleInputChange("emergencyContact", e.target.value)
                }
                className="bg-white/70 border-slate-200 focus:border-slate-400 rounded-xl"
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
              {isLoading ? "Updating..." : "Update Employee"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
