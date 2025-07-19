/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// User roles
export type UserRole = "hr" | "employee";

// Departments
export type Department = "Marketing" | "IT" | "Finance" | "Research";

// User interface
export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  department: Department;
  fullName: string;
  isActive: boolean;
}

// Employee interface
export interface Employee {
  id: string;
  fullName: string;
  email: string;
  password: string;
  department: Department;
  role: string;
  gender: "Male" | "Female";
  joiningDate: string;
  mobileNumber: string;
  emergencyContact: string;
  isActive: boolean;
}

// Task interface
export interface Task {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  deadline: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Done";
  assignedBy: string; // HR user id
  createdAt: string;
  updatedAt: string;
}

// Leave request interface
export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: "Casual" | "Sick" | "Earned" | "Maternity" | "Paternity";
  startDate: string;
  endDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  reviewedBy?: string; // HR user id
  reviewComments?: string;
  appliedAt: string;
  reviewedAt?: string;
}

// Salary slip interface
export interface SalarySlip {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicPay: number;
  hra: number;
  bonuses: number;
  deductions: number;
  netPay: number;
  generatedBy: string; // HR user id
  generatedAt: string;
}

// Team allocation interface
export interface TeamAllocation {
  id: string;
  employeeId: string;
  projectName: string;
  reportingManager: string;
  allocatedBy: string; // HR user id
  startDate: string;
  endDate?: string;
}

// Performance report interface
export interface PerformanceReport {
  id: string;
  employeeId: string;
  reviewPeriod: string;
  tasksCompleted: number;
  totalTasks: number;
  completionRate: number;
  rating: "Excellent" | "Good" | "Average" | "Below Average" | "Poor";
  comments: string;
  reviewedBy: string; // HR user id
  reviewDate: string;
}

// Expense claim interface
export interface ExpenseClaim {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  amount: number;
  category:
    | "Travel"
    | "Meals"
    | "Office Supplies"
    | "Software"
    | "Training"
    | "Other";
  receiptUrl?: string;
  submittedAt: string;
  status: "Pending" | "Approved" | "Rejected";
  reviewedBy?: string;
  reviewComments?: string;
  reviewedAt?: string;
}

// Authentication context
export interface AuthContextType {
  user: User | Employee | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isHR: boolean;
  isEmployee: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Dashboard stats
export interface HRDashboardStats {
  totalEmployees: number;
  pendingLeaveRequests: number;
  completedTasks: number;
  pendingTasks: number;
  pendingExpenses: number;
}

export interface EmployeeDashboardStats {
  assignedTasks: number;
  completedTasks: number;
  pendingLeaveRequests: number;
  approvedLeaves: number;
  pendingExpenses: number;
}
