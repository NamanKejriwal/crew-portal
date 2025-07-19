import React, { useState, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
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
} from "lucide-react";
import { tasks, leaveRequests, salarySlips } from "@shared/database";
import { Employee } from "@shared/types";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const employee = user as Employee;

  const employeeData = useMemo(() => {
    const employeeTasks = tasks.filter(
      (task) => task.employeeId === employee.id,
    );
    const employeeLeaves = leaveRequests.filter(
      (leave) => leave.employeeId === employee.id,
    );
    const employeeSalarySlips = salarySlips.filter(
      (slip) => slip.employeeId === employee.id,
    );

    return {
      tasks: employeeTasks,
      leaveRequests: employeeLeaves,
      salarySlips: employeeSalarySlips,
      stats: {
        assignedTasks: employeeTasks.length,
        completedTasks: employeeTasks.filter((task) => task.status === "Done")
          .length,
        pendingLeaveRequests: employeeLeaves.filter(
          (leave) => leave.status === "Pending",
        ).length,
        approvedLeaves: employeeLeaves.filter(
          (leave) => leave.status === "Approved",
        ).length,
      },
    };
  }, [employee.id]);

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
              Welcome, {employee.fullName}
            </h2>
            <p className="text-gray-600">Your personal dashboard</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Apply for Leave
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Assigned Tasks
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {employeeData.stats.assignedTasks}
                  </p>
                </div>
                <ClipboardList className="h-12 w-12 text-blue-600" />
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
                    {employeeData.stats.completedTasks}
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
                    Pending Leaves
                  </p>
                  <p className="text-3xl font-bold text-orange-600">
                    {employeeData.stats.pendingLeaveRequests}
                  </p>
                </div>
                <Clock className="h-12 w-12 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Approved Leaves
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {employeeData.stats.approvedLeaves}
                  </p>
                </div>
                <Calendar className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="leaves">Leave History</TabsTrigger>
            <TabsTrigger value="salary">Salary Slips</TabsTrigger>
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
                            <Button variant="outline" size="sm">
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
                          <Button variant="outline" size="sm">
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
