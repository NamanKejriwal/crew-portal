import React, { useState, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import AddEmployeeModal from "@/components/AddEmployeeModal";
import TaskAssignmentModal from "@/components/TaskAssignmentModal";
import PerformanceDetailModal from "@/components/PerformanceDetailModal";
import EmployeeEditModal from "@/components/EmployeeEditModal";
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
  Users,
  UserPlus,
  ClipboardList,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Download,
  Edit,
  Plus,
  Receipt,
} from "lucide-react";
import {
  getEmployeesByDepartment,
  getTasksByDepartment,
  getLeaveRequestsByDepartment,
  getSalarySlipsByDepartment,
  getPerformanceReportsByDepartment,
  getExpenseClaimsByDepartment,
  tasks,
  leaveRequests,
  expenseClaims,
  salarySlips,
  updateSalaryWithExpense,
} from "@shared/database";
import {
  User,
  Employee,
  Task,
  LeaveRequest,
  ExpenseClaim,
  PerformanceReport,
} from "@shared/api";
import { downloadSalarySlipPDF } from "@/utils/pdfGenerator";

export default function HRDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departmentTasks, setDepartmentTasks] = useState<Task[]>([]);
  const [departmentLeaves, setDepartmentLeaves] = useState<LeaveRequest[]>([]);
  const [departmentExpenses, setDepartmentExpenses] = useState<ExpenseClaim[]>(
    [],
  );
  const [performanceReports, setPerformanceReports] = useState<
    PerformanceReport[]
  >([]);

  const hrUser = user as User;

  const departmentData = useMemo(() => {
    const currentEmployees =
      employees.length > 0
        ? employees
        : getEmployeesByDepartment(hrUser.department);
    const currentTasks =
      departmentTasks.length > 0
        ? departmentTasks
        : getTasksByDepartment(hrUser.department);
    const currentLeaves =
      departmentLeaves.length > 0
        ? departmentLeaves
        : getLeaveRequestsByDepartment(hrUser.department);
    const currentExpenses =
      departmentExpenses.length > 0
        ? departmentExpenses
        : getExpenseClaimsByDepartment(hrUser.department);
    const currentReports =
      performanceReports.length > 0
        ? performanceReports
        : getPerformanceReportsByDepartment(hrUser.department);
    const departmentSalarySlips = getSalarySlipsByDepartment(hrUser.department);

    return {
      employees: currentEmployees,
      tasks: currentTasks,
      leaveRequests: currentLeaves,
      expenseClaims: currentExpenses,
      salarySlips: departmentSalarySlips,
      performanceReports: currentReports,
      stats: {
        totalEmployees: currentEmployees.length,
        pendingLeaveRequests: currentLeaves.filter(
          (req) => req.status === "Pending",
        ).length,
        completedTasks: currentTasks.filter((task) => task.status === "Done")
          .length,
        pendingTasks: currentTasks.filter((task) => task.status === "Pending")
          .length,
        pendingExpenses: currentExpenses.filter(
          (exp) => exp.status === "Pending",
        ).length,
      },
    };
  }, [
    hrUser.department,
    employees,
    departmentTasks,
    departmentLeaves,
    departmentExpenses,
    performanceReports,
  ]);

  // Initialize data on component mount
  React.useEffect(() => {
    setEmployees(getEmployeesByDepartment(hrUser.department));
    setDepartmentTasks(getTasksByDepartment(hrUser.department));
    setDepartmentLeaves(getLeaveRequestsByDepartment(hrUser.department));
    setDepartmentExpenses(getExpenseClaimsByDepartment(hrUser.department));
    setPerformanceReports(getPerformanceReportsByDepartment(hrUser.department));
  }, [hrUser.department]);

  const handleEmployeeAdded = (newEmployee: Employee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const handleTaskAssigned = (newTask: Task) => {
    setDepartmentTasks((prev) => [...prev, newTask]);
  };

  const handleLeaveStatusUpdate = (
    leaveId: string,
    status: "Approved" | "Rejected",
    comments?: string,
  ) => {
    setDepartmentLeaves((prev) =>
      prev.map((leave) =>
        leave.id === leaveId
          ? {
              ...leave,
              status,
              reviewedBy: hrUser.id,
              reviewComments: comments,
              reviewedAt: new Date().toISOString(),
            }
          : leave,
      ),
    );

    // Update the global array as well
    const leaveIndex = leaveRequests.findIndex((l) => l.id === leaveId);
    if (leaveIndex !== -1) {
      leaveRequests[leaveIndex].status = status;
      leaveRequests[leaveIndex].reviewedBy = hrUser.id;
      leaveRequests[leaveIndex].reviewComments = comments;
      leaveRequests[leaveIndex].reviewedAt = new Date().toISOString();
    }
  };

  const handleExpenseStatusUpdate = (
    expenseId: string,
    status: "Approved" | "Rejected",
    comments?: string,
  ) => {
    setDepartmentExpenses((prev) =>
      prev.map((expense) =>
        expense.id === expenseId
          ? {
              ...expense,
              status,
              reviewedBy: hrUser.id,
              reviewComments: comments,
              reviewedAt: new Date().toISOString(),
            }
          : expense,
      ),
    );

    // Update the global array as well
    const expenseIndex = expenseClaims.findIndex((e) => e.id === expenseId);
    if (expenseIndex !== -1) {
      expenseClaims[expenseIndex].status = status;
      expenseClaims[expenseIndex].reviewedBy = hrUser.id;
      expenseClaims[expenseIndex].reviewComments = comments;
      expenseClaims[expenseIndex].reviewedAt = new Date().toISOString();

      // If approved, add to salary slip as bonus
      if (status === "Approved") {
        const expense = expenseClaims[expenseIndex];
        updateSalaryWithExpense(expense.employeeId, expense.amount);
      }
    }
  };

  const handlePerformanceReportUpdate = (updatedReport: PerformanceReport) => {
    setPerformanceReports((prev) =>
      prev.map((report) =>
        report.id === updatedReport.id ? updatedReport : report,
      ),
    );
  };

  const handleEmployeeUpdated = (updatedEmployee: Employee) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee,
      ),
    );
  };

  const handleDownloadSalarySlip = (slip: any) => {
    const employee = getEmployeeById(slip.employeeId);
    if (employee) {
      downloadSalarySlipPDF(slip, employee);
    }
  };

  const getEmployeeById = (employeeId: string) => {
    return departmentData.employees.find((emp) => emp.id === employeeId);
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
              {hrUser.department} Department
            </h2>
            <p className="text-slate-600 text-lg mt-2">
              HR Management Dashboard
            </p>
          </div>
          <div className="flex gap-3">
            <TaskAssignmentModal
              employees={departmentData.employees}
              onTaskAssigned={handleTaskAssigned}
            />
            <AddEmployeeModal onEmployeeAdded={handleEmployeeAdded} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10 animate-slide-up">
          <Card className="shadow-soft border-0 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-medium">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 tracking-wide uppercase">
                    Total Employees
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {departmentData.stats.totalEmployees}
                  </p>
                </div>
                <div className="bg-slate-100 p-3 rounded-xl">
                  <Users className="h-8 w-8 text-slate-700" />
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
                    {departmentData.stats.pendingLeaveRequests}
                  </p>
                </div>
                <div className="bg-amber-100 p-3 rounded-xl">
                  <AlertCircle className="h-8 w-8 text-amber-600" />
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
                    {departmentData.stats.completedTasks}
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
                    Pending Tasks
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {departmentData.stats.pendingTasks}
                  </p>
                </div>
                <div className="bg-slate-100 p-3 rounded-xl">
                  <Clock className="h-8 w-8 text-slate-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-medium">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 tracking-wide uppercase">
                    Pending Expenses
                  </p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    {departmentData.stats.pendingExpenses}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Receipt className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7 bg-white/60 backdrop-blur-sm border-0 shadow-soft">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="employees"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg"
            >
              Employees
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg"
            >
              Tasks
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
              value="payroll"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg"
            >
              Payroll
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg"
            >
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Leave Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentData.leaveRequests.slice(0, 3).map((leave) => {
                      const employee = getEmployeeById(leave.employeeId);
                      return (
                        <div
                          key={leave.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{employee?.fullName}</p>
                            <p className="text-sm text-gray-600">
                              {leave.leaveType} • {formatDate(leave.startDate)}
                            </p>
                          </div>
                          <Badge className={getStatusColor(leave.status)}>
                            {leave.status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Task Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentData.tasks.slice(0, 3).map((task) => {
                      const employee = getEmployeeById(task.employeeId);
                      return (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-gray-600">
                              {employee?.fullName} • Due:{" "}
                              {formatDate(task.deadline)}
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
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>Department Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joining Date</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentData.employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">
                          {employee.fullName}
                        </TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>
                          {formatDate(employee.joiningDate)}
                        </TableCell>
                        <TableCell>{employee.mobileNumber}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Task Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentData.tasks.map((task) => {
                      const employee = getEmployeeById(task.employeeId);
                      return (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">
                            {task.title}
                          </TableCell>
                          <TableCell>{employee?.fullName}</TableCell>
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
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaves">
            <Card>
              <CardHeader>
                <CardTitle>Leave Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentData.leaveRequests.map((leave) => {
                      const employee = getEmployeeById(leave.employeeId);
                      return (
                        <TableRow key={leave.id}>
                          <TableCell className="font-medium">
                            {employee?.fullName}
                          </TableCell>
                          <TableCell>{leave.leaveType}</TableCell>
                          <TableCell>
                            {formatDate(leave.startDate)} -{" "}
                            {formatDate(leave.endDate)}
                          </TableCell>
                          <TableCell>{leave.reason}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(leave.status)}>
                              {leave.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {leave.status === "Pending" && (
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleLeaveStatusUpdate(
                                      leave.id,
                                      "Approved",
                                      "Leave approved by HR",
                                    )
                                  }
                                  className="text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:border-emerald-300"
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleLeaveStatusUpdate(
                                      leave.id,
                                      "Rejected",
                                      "Leave rejected by HR",
                                    )
                                  }
                                  className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll">
            <Card>
              <CardHeader>
                <CardTitle>Salary Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Month/Year</TableHead>
                      <TableHead>Basic Pay</TableHead>
                      <TableHead>HRA</TableHead>
                      <TableHead>Net Pay</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentData.salarySlips.map((slip) => {
                      const employee = getEmployeeById(slip.employeeId);
                      return (
                        <TableRow key={slip.id}>
                          <TableCell className="font-medium">
                            {employee?.fullName}
                          </TableCell>
                          <TableCell>
                            {slip.month} {slip.year}
                          </TableCell>
                          <TableCell>
                            ₹{slip.basicPay.toLocaleString()}
                          </TableCell>
                          <TableCell>₹{slip.hra.toLocaleString()}</TableCell>
                          <TableCell>₹{slip.netPay.toLocaleString()}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadSalarySlip(slip)}
                            >
                              <FileText className="mr-1 h-3 w-3" />
                              View PDF
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
                  Expense Claims
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-700 font-semibold">
                        Employee
                      </TableHead>
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
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentData.expenseClaims.map((expense) => {
                      const employee = getEmployeeById(expense.employeeId);
                      return (
                        <TableRow
                          key={expense.id}
                          className="hover:bg-slate-50/50"
                        >
                          <TableCell className="font-medium">
                            {employee?.fullName}
                          </TableCell>
                          <TableCell>{expense.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-100">
                              {expense.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">
                            ₹{expense.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {formatDate(expense.submittedAt)}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(expense.status)}>
                              {expense.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {expense.status === "Pending" && (
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleExpenseStatusUpdate(
                                      expense.id,
                                      "Approved",
                                      "Expense approved by HR",
                                    )
                                  }
                                  className="text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:border-emerald-300"
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleExpenseStatusUpdate(
                                      expense.id,
                                      "Rejected",
                                      "Expense rejected by HR",
                                    )
                                  }
                                  className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Review Period</TableHead>
                      <TableHead>Tasks Completed</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Comments</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentData.performanceReports.map((report) => {
                      const employee = getEmployeeById(report.employeeId);
                      const getRatingColor = (rating: string) => {
                        switch (rating) {
                          case "Excellent":
                            return "bg-green-100 text-green-800";
                          case "Good":
                            return "bg-blue-100 text-blue-800";
                          case "Average":
                            return "bg-yellow-100 text-yellow-800";
                          case "Below Average":
                            return "bg-orange-100 text-orange-800";
                          case "Poor":
                            return "bg-red-100 text-red-800";
                          default:
                            return "bg-gray-100 text-gray-800";
                        }
                      };

                      return (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">
                            {employee?.fullName}
                          </TableCell>
                          <TableCell>{report.reviewPeriod}</TableCell>
                          <TableCell>
                            {report.tasksCompleted}/{report.totalTasks}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {report.completionRate}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getRatingColor(report.rating)}>
                              {report.rating}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {report.comments}
                          </TableCell>
                          <TableCell>
                            <PerformanceDetailModal
                              report={report}
                              employee={employee!}
                              onReportUpdated={handlePerformanceReportUpdate}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
