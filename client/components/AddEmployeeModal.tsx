import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
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
import { UserPlus } from "lucide-react";
import { Employee, User } from "@shared/types";
import { employees } from "@shared/database";

interface AddEmployeeModalProps {
  onEmployeeAdded: (employee: Employee) => void;
}

export default function AddEmployeeModal({
  onEmployeeAdded,
}: AddEmployeeModalProps) {
  const { user } = useAuth();
  const hrUser = user as User;

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Employee",
    gender: "",
    joiningDate: "",
    mobileNumber: "",
    emergencyContact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Generate new employee ID
      const deptPrefix =
        hrUser.department === "Marketing"
          ? "EMP1"
          : hrUser.department === "IT"
            ? "EMP2"
            : hrUser.department === "Research"
              ? "EMP3"
              : "EMP4";

      const existingIds = employees
        .filter((emp) => emp.department === hrUser.department)
        .map((emp) => parseInt(emp.id.slice(3)))
        .sort((a, b) => b - a);

      const nextId =
        existingIds.length > 0
          ? existingIds[0] + 1
          : hrUser.department === "Marketing"
            ? 106
            : hrUser.department === "IT"
              ? 206
              : hrUser.department === "Research"
                ? 306
                : 406;

      const newEmployee: Employee = {
        id: `${deptPrefix}${nextId.toString().padStart(2, "0")}`,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        department: hrUser.department,
        role: formData.role,
        gender: formData.gender as "Male" | "Female",
        joiningDate: formData.joiningDate,
        mobileNumber: formData.mobileNumber,
        emergencyContact: formData.emergencyContact,
        isActive: true,
      };

      // Add to database
      employees.push(newEmployee);

      // Call callback
      onEmployeeAdded(newEmployee);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "Employee",
        gender: "",
        joiningDate: "",
        mobileNumber: "",
        emergencyContact: "",
      });

      setIsOpen(false);
    } catch (err) {
      setError("Failed to add employee. Please try again.");
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
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@hrportal.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="john@123"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="joiningDate">Joining Date *</Label>
              <Input
                id="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={(e) =>
                  handleInputChange("joiningDate", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number *</Label>
              <Input
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) =>
                  handleInputChange("mobileNumber", e.target.value)
                }
                placeholder="9876543210"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact *</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) =>
                  handleInputChange("emergencyContact", e.target.value)
                }
                placeholder="9876543211"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                placeholder="Employee"
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Adding..." : "Add Employee"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
