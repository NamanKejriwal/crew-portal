import React, { useState, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import AddEmployeeModal from "@/components/AddEmployeeModal";
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
} from "lucide-react";
import {
  getEmployeesByDepartment,
  getTasksByDepartment,
  getLeaveRequestsByDepartment,
  getSalarySlipsByDepartment,
  getPerformanceReportsByDepartment,
} from "@shared/database";
import { User, Employee } from "@shared/types";
import { downloadSalarySlipPDF } from "@/utils/pdfGenerator";

export default function HRDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [employees, setEmployees] = useState<Employee[]>([]);

  const hrUser = user as User;

  const departmentData = useMemo(() => {
    const currentEmployees =
      employees.length > 0
        ? employees
        : getEmployeesByDepartment(hrUser.department);
    const tasks = getTasksByDepartment(hrUser.department);
    const leaveRequests = getLeaveRequestsByDepartment(hrUser.department);
    const salarySlips = getSalarySlipsByDepartment(hrUser.department);
    const performanceReports = getPerformanceReportsByDepartment(
      hrUser.department,
    );

    return {
      employees: currentEmployees,
      tasks,
      leaveRequests,
      salarySlips,
      performanceReports,
      stats: {
        totalEmployees: currentEmployees.length,
        pendingLeaveRequests: leaveRequests.filter(
          (req) => req.status === "Pending",
        ).length,
        completedTasks: tasks.filter((task) => task.status === "Done").length,
        pendingTasks: tasks.filter((task) => task.status === "Pending").length,
      },
    };
  }, [hrUser.department, employees]);

  // Initialize employees on component mount
  React.useEffect(() => {
    setEmployees(getEmployeesByDepartment(hrUser.department));
  }, [hrUser.department]);

  const handleEmployeeAdded = (newEmployee: Employee) => {
    setEmployees((prev) => [...prev, newEmployee]);
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {hrUser.department} Department
            </h2>
            <p className="text-gray-600">HR Management Dashboard</p>
          </div>
          <AddEmployeeModal onEmployeeAdded={handleEmployeeAdded} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Employees
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {departmentData.stats.totalEmployees}
                  </p>
                </div>
                <Users className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Leave Requests
                  </p>
                  <p className="text-3xl font-bold text-orange-600">
                    {departmentData.stats.pendingLeaveRequests}
                  </p>
                </div>
                <AlertCircle className="h-12 w-12 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Completed Tasks
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {departmentData.stats.completedTasks}
                  </p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Tasks
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {departmentData.stats.pendingTasks}
                  </p>
                </div>
                <Clock className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
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
                                  className="text-green-600 hover:text-green-700"
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
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
                            <Button variant="outline" size="sm">
                              <FileText className="mr-1 h-3 w-3" />
                              View Details
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
        </Tabs>
      </main>
    </div>
  );
}
