import React, { useState, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import LeaveApplicationModal from "@/components/LeaveApplicationModal";
import ExpenseClaimModal from "@/components/ExpenseClaimModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  User,
  ClipboardList,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  FileText,
  CalendarPlus,
  Receipt,
} from "lucide-react";
import {
  tasks,
  leaveRequests,
  salarySlips,
  expenseClaims,
} from "@shared/database";
import { Employee, Task, LeaveRequest, ExpenseClaim } from "@shared/api";
import { downloadSalarySlipPDF } from "@/utils/pdfGenerator";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [employeeTasks, setEmployeeTasks] = useState<Task[]>([]);
  const [employeeLeaves, setEmployeeLeaves] = useState<LeaveRequest[]>([]);
  const [employeeExpenses, setEmployeeExpenses] = useState<ExpenseClaim[]>([]);

  const employee = user as Employee;

  const employeeData = useMemo(() => {
    const currentTasks =
      employeeTasks.length > 0
        ? employeeTasks
        : tasks.filter((task) => task.employeeId === employee.id);
    const currentLeaves =
      employeeLeaves.length > 0
        ? employeeLeaves
        : leaveRequests.filter((leave) => leave.employeeId === employee.id);
    const currentExpenses =
      employeeExpenses.length > 0
        ? employeeExpenses
        : expenseClaims.filter((expense) => expense.employeeId === employee.id);
    const employeeSalarySlips = salarySlips.filter(
      (slip) => slip.employeeId === employee.id,
    );

    return {
      tasks: currentTasks,
      leaveRequests: currentLeaves,
      expenseClaims: currentExpenses,
      salarySlips: employeeSalarySlips,
      stats: {
        assignedTasks: currentTasks.length,
        completedTasks: currentTasks.filter((task) => task.status === "Done")
          .length,
        pendingLeaveRequests: currentLeaves.filter(
          (leave) => leave.status === "Pending",
        ).length,
        approvedLeaves: currentLeaves.filter(
          (leave) => leave.status === "Approved",
        ).length,
        pendingExpenses: currentExpenses.filter(
          (expense) => expense.status === "Pending",
        ).length,
      },
    };
  }, [employee.id, employeeTasks, employeeLeaves, employeeExpenses]);

  // Initialize data on component mount
  React.useEffect(() => {
    setEmployeeTasks(tasks.filter((task) => task.employeeId === employee.id));
    setEmployeeLeaves(
      leaveRequests.filter((leave) => leave.employeeId === employee.id),
    );
    setEmployeeExpenses(
      expenseClaims.filter((expense) => expense.employeeId === employee.id),
    );
  }, [employee.id]);

  const handleTaskComplete = (taskId: string) => {
    setEmployeeTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "Done" as const,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );

    // Update the global array as well
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].status = "Done";
      tasks[taskIndex].updatedAt = new Date().toISOString();
    }
  };

  const handleLeaveApplied = (newLeave: LeaveRequest) => {
    setEmployeeLeaves((prev) => [...prev, newLeave]);
  };

  const handleExpenseSubmitted = (newExpense: ExpenseClaim) => {
    setEmployeeExpenses((prev) => [...prev, newExpense]);
  };

  const handleDownloadSalarySlip = (slip: any) => {
    downloadSalarySlipPDF(slip, employee);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white animate-fade-in">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-10 animate-slide-up">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              Welcome, {employee.fullName}
            </h2>
            <p className="text-slate-600 text-lg mt-2">
              Your personal workspace
            </p>
          </div>
          <div className="flex gap-3">
            <ExpenseClaimModal onExpenseSubmitted={handleExpenseSubmitted} />
            <LeaveApplicationModal onLeaveApplied={handleLeaveApplied} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-slide-up">
          <Card className="shadow-soft border-0 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-medium">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 tracking-wide uppercase">
                    Assigned Tasks
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {employeeData.stats.assignedTasks}
                  </p>
                </div>
                <div className="bg-slate-100 p-3 rounded-xl">
                  <ClipboardList className="h-8 w-8 text-slate-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-medium">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 tracking-wide uppercase">
                    Completed Tasks
                  </p>
                  <p className="text-3xl font-bold text-emerald-600 mt-2">
                    {employeeData.stats.completedTasks}
                  </p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-medium">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 tracking-wide uppercase">
                    Pending Leaves
                  </p>
                  <p className="text-3xl font-bold text-amber-600 mt-2">
                    {employeeData.stats.pendingLeaveRequests}
                  </p>
                </div>
                <div className="bg-amber-100 p-3 rounded-xl">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-medium">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 tracking-wide uppercase">
                    Approved Leaves
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {employeeData.stats.approvedLeaves}
                  </p>
                </div>
                <div className="bg-slate-100 p-3 rounded-xl">
                  <Calendar className="h-8 w-8 text-slate-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-white/60 backdrop-blur-sm border-0 shadow-soft">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg"
            >
              My Tasks
            </TabsTrigger>
            <TabsTrigger
              value="leaves"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg"
            >
              Leaves
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg"
            >
              Expenses
            </TabsTrigger>
            <TabsTrigger
              value="salary"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg"
            >
              Salary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Recent Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employeeData.tasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-gray-600">
                            Due: {formatDate(task.deadline)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Leave History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employeeData.leaveRequests.slice(0, 3).map((leave) => (
                      <div
                        key={leave.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{leave.leaveType}</p>
                          <p className="text-sm text-gray-600">
                            {formatDate(leave.startDate)} -{" "}
                            {formatDate(leave.endDate)}
                          </p>
                        </div>
                        <Badge className={getStatusColor(leave.status)}>
                          {leave.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Full Name
                      </label>
                      <p className="text-lg font-medium">{employee.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Email
                      </label>
                      <p className="text-lg font-medium">{employee.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Department
                      </label>
                      <p className="text-lg font-medium">
                        {employee.department}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Role
                      </label>
                      <p className="text-lg font-medium">{employee.role}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Joining Date
                      </label>
                      <p className="text-lg font-medium">
                        {formatDate(employee.joiningDate)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Gender
                      </label>
                      <p className="text-lg font-medium">{employee.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Mobile Number
                      </label>
                      <p className="text-lg font-medium">
                        {employee.mobileNumber}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Emergency Contact
                      </label>
                      <p className="text-lg font-medium">
                        {employee.emergencyContact}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeData.tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">
                          {task.title}
                        </TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(task.deadline)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {task.status === "Pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTaskComplete(task.id)}
                              className="text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:border-emerald-300"
                            >
                              Mark as Done
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaves">
            <Card>
              <CardHeader>
                <CardTitle>Leave History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Comments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeData.leaveRequests.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell className="font-medium">
                          {leave.leaveType}
                        </TableCell>
                        <TableCell>
                          {formatDate(leave.startDate)} -{" "}
                          {formatDate(leave.endDate)}
                        </TableCell>
                        <TableCell>{leave.reason}</TableCell>
                        <TableCell>{formatDate(leave.appliedAt)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(leave.status)}>
                            {leave.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{leave.reviewComments || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <Card className="shadow-soft border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Receipt className="h-5 w-5" />
                  My Expense Claims
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-700 font-semibold">
                        Title
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold">
                        Category
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold">
                        Amount
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold">
                        Submitted
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold">
                        Status
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold">
                        Comments
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeData.expenseClaims.map((expense) => (
                      <TableRow
                        key={expense.id}
                        className="hover:bg-slate-50/50"
                      >
                        <TableCell className="font-medium">
                          {expense.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-100">
                            {expense.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹{expense.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>{formatDate(expense.submittedAt)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(expense.status)}>
                            {expense.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{expense.reviewComments || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salary">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Salary Slips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month/Year</TableHead>
                      <TableHead>Basic Pay</TableHead>
                      <TableHead>HRA</TableHead>
                      <TableHead>Bonuses</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Pay</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeData.salarySlips.map((slip) => (
                      <TableRow key={slip.id}>
                        <TableCell className="font-medium">
                          {slip.month} {slip.year}
                        </TableCell>
                        <TableCell>₹{slip.basicPay.toLocaleString()}</TableCell>
                        <TableCell>₹{slip.hra.toLocaleString()}</TableCell>
                        <TableCell>₹{slip.bonuses.toLocaleString()}</TableCell>
                        <TableCell>
                          ₹{slip.deductions.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          ₹{slip.netPay.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadSalarySlip(slip)}
                            className="hover:bg-slate-50"
                          >
                            <FileText className="mr-1 h-3 w-3" />
                            Download PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
