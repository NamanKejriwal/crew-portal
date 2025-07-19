import {
  User,
  Employee,
  Task,
  LeaveRequest,
  SalarySlip,
  PerformanceReport,
  Department,
} from "./types";

// HR Users (one per department)
export const hrUsers: User[] = [
  {
    id: "hr-marketing",
    email: "hr.marketing@hrportal.com",
    password: "marketing@123",
    role: "hr",
    department: "Marketing",
    fullName: "HR Marketing Manager",
    isActive: true,
  },
  {
    id: "hr-it",
    email: "hr.it@hrportal.com",
    password: "it@123",
    role: "hr",
    department: "IT",
    fullName: "HR IT Manager",
    isActive: true,
  },
  {
    id: "hr-finance",
    email: "hr.finance@hrportal.com",
    password: "finance@123",
    role: "hr",
    department: "Finance",
    fullName: "HR Finance Manager",
    isActive: true,
  },
  {
    id: "hr-research",
    email: "hr.research@hrportal.com",
    password: "research@123",
    role: "hr",
    department: "Research",
    fullName: "HR Research Manager",
    isActive: true,
  },
];

// Employee Database
export const employees: Employee[] = [
  // Marketing Department
  {
    id: "EMP101",
    fullName: "Ananya Rao",
    email: "ananya@hrportal.com",
    password: "ananya@123",
    department: "Marketing",
    role: "Employee",
    gender: "Female",
    joiningDate: "2023-05-10",
    mobileNumber: "9876501100",
    emergencyContact: "9876511100",
    isActive: true,
  },
  {
    id: "EMP102",
    fullName: "Rajeev Sinha",
    email: "rajeev@hrportal.com",
    password: "rajeev@123",
    department: "Marketing",
    role: "Employee",
    gender: "Male",
    joiningDate: "2022-01-12",
    mobileNumber: "9876501101",
    emergencyContact: "9876511101",
    isActive: true,
  },
  {
    id: "EMP103",
    fullName: "Swati Pandey",
    email: "swati@hrportal.com",
    password: "swati@123",
    department: "Marketing",
    role: "Employee",
    gender: "Female",
    joiningDate: "2023-08-20",
    mobileNumber: "9876501102",
    emergencyContact: "9876511102",
    isActive: true,
  },
  {
    id: "EMP104",
    fullName: "Nishant Tyagi",
    email: "nishant@hrportal.com",
    password: "nishant@123",
    department: "Marketing",
    role: "Employee",
    gender: "Male",
    joiningDate: "2021-03-25",
    mobileNumber: "9876501103",
    emergencyContact: "9876511103",
    isActive: true,
  },
  {
    id: "EMP105",
    fullName: "Pooja Chauhan",
    email: "pooja@hrportal.com",
    password: "pooja@123",
    department: "Marketing",
    role: "Employee",
    gender: "Female",
    joiningDate: "2024-02-01",
    mobileNumber: "9876501104",
    emergencyContact: "9876511104",
    isActive: true,
  },
  // IT Department
  {
    id: "EMP201",
    fullName: "Manish Rawat",
    email: "manish@hrportal.com",
    password: "manish@123",
    department: "IT",
    role: "Employee",
    gender: "Male",
    joiningDate: "2021-07-05",
    mobileNumber: "9876501200",
    emergencyContact: "9876511200",
    isActive: true,
  },
  {
    id: "EMP202",
    fullName: "Divya Sharma",
    email: "divya@hrportal.com",
    password: "divya@123",
    department: "IT",
    role: "Employee",
    gender: "Female",
    joiningDate: "2022-09-14",
    mobileNumber: "9876501201",
    emergencyContact: "9876511201",
    isActive: true,
  },
  {
    id: "EMP203",
    fullName: "Kunal Grover",
    email: "kunal@hrportal.com",
    password: "kunal@123",
    department: "IT",
    role: "Employee",
    gender: "Male",
    joiningDate: "2023-03-11",
    mobileNumber: "9876501202",
    emergencyContact: "9876511202",
    isActive: true,
  },
  {
    id: "EMP204",
    fullName: "Meenal Bhatia",
    email: "meenal@hrportal.com",
    password: "meenal@123",
    department: "IT",
    role: "Employee",
    gender: "Female",
    joiningDate: "2022-12-30",
    mobileNumber: "9876501203",
    emergencyContact: "9876511203",
    isActive: true,
  },
  {
    id: "EMP205",
    fullName: "Rohit Vaidya",
    email: "rohit@hrportal.com",
    password: "rohit@123",
    department: "IT",
    role: "Employee",
    gender: "Male",
    joiningDate: "2023-11-05",
    mobileNumber: "9876501204",
    emergencyContact: "9876511204",
    isActive: true,
  },
  // Research Department
  {
    id: "EMP301",
    fullName: "Tanvi Kulkarni",
    email: "tanvik@hrportal.com",
    password: "tanvi@123",
    department: "Research",
    role: "Employee",
    gender: "Female",
    joiningDate: "2024-01-18",
    mobileNumber: "9876501300",
    emergencyContact: "9876511300",
    isActive: true,
  },
  {
    id: "EMP302",
    fullName: "Arav Jain",
    email: "arav@hrportal.com",
    password: "arav@123",
    department: "Research",
    role: "Employee",
    gender: "Male",
    joiningDate: "2022-07-08",
    mobileNumber: "9876501301",
    emergencyContact: "9876511301",
    isActive: true,
  },
  {
    id: "EMP303",
    fullName: "Richa Singh",
    email: "richa@hrportal.com",
    password: "richa@123",
    department: "Research",
    role: "Employee",
    gender: "Female",
    joiningDate: "2023-05-25",
    mobileNumber: "9876501302",
    emergencyContact: "9876511302",
    isActive: true,
  },
  {
    id: "EMP304",
    fullName: "Sameer Khan",
    email: "sameer@hrportal.com",
    password: "sameer@123",
    department: "Research",
    role: "Employee",
    gender: "Male",
    joiningDate: "2021-09-17",
    mobileNumber: "9876501303",
    emergencyContact: "9876511303",
    isActive: true,
  },
  {
    id: "EMP305",
    fullName: "Isha Mehra",
    email: "isha@hrportal.com",
    password: "isha@123",
    department: "Research",
    role: "Employee",
    gender: "Female",
    joiningDate: "2024-03-01",
    mobileNumber: "9876501304",
    emergencyContact: "9876511304",
    isActive: true,
  },
  // Finance Department
  {
    id: "EMP401",
    fullName: "Meera Chopra",
    email: "meerac@hrportal.com",
    password: "meera@123",
    department: "Finance",
    role: "Employee",
    gender: "Female",
    joiningDate: "2023-06-22",
    mobileNumber: "9876501400",
    emergencyContact: "9876511400",
    isActive: true,
  },
  {
    id: "EMP402",
    fullName: "Harsh Vora",
    email: "harsh@hrportal.com",
    password: "harsh@123",
    department: "Finance",
    role: "Employee",
    gender: "Male",
    joiningDate: "2021-02-14",
    mobileNumber: "9876501401",
    emergencyContact: "9876511401",
    isActive: true,
  },
  {
    id: "EMP403",
    fullName: "Sakshi Jindal",
    email: "sakshi@hrportal.com",
    password: "sakshi@123",
    department: "Finance",
    role: "Employee",
    gender: "Female",
    joiningDate: "2022-08-11",
    mobileNumber: "9876501402",
    emergencyContact: "9876511402",
    isActive: true,
  },
  {
    id: "EMP404",
    fullName: "Ramesh Shetty",
    email: "ramesh@hrportal.com",
    password: "ramesh@123",
    department: "Finance",
    role: "Employee",
    gender: "Male",
    joiningDate: "2023-10-05",
    mobileNumber: "9876501403",
    emergencyContact: "9876511403",
    isActive: true,
  },
  {
    id: "EMP405",
    fullName: "Aarti Nanda",
    email: "aarti@hrportal.com",
    password: "aarti@123",
    department: "Finance",
    role: "Employee",
    gender: "Female",
    joiningDate: "2024-01-09",
    mobileNumber: "9876501404",
    emergencyContact: "9876511404",
    isActive: true,
  },
];

// Sample tasks
export let tasks: Task[] = [
  {
    id: "task-1",
    employeeId: "EMP101",
    title: "Prepare Q4 Marketing Campaign",
    description:
      "Create comprehensive marketing strategy for Q4 product launch",
    deadline: "2024-02-15",
    priority: "High",
    status: "Pending",
    assignedBy: "hr-marketing",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "task-2",
    employeeId: "EMP102",
    title: "Social Media Content Calendar",
    description: "Develop social media content calendar for next month",
    deadline: "2024-02-10",
    priority: "Medium",
    status: "Done",
    assignedBy: "hr-marketing",
    createdAt: "2024-01-05T14:30:00Z",
    updatedAt: "2024-01-15T16:45:00Z",
  },
  {
    id: "task-3",
    employeeId: "EMP201",
    title: "Server Migration",
    description: "Migrate legacy servers to cloud infrastructure",
    deadline: "2024-02-20",
    priority: "High",
    status: "Pending",
    assignedBy: "hr-it",
    createdAt: "2024-01-08T09:15:00Z",
    updatedAt: "2024-01-08T09:15:00Z",
  },
];

// Sample leave requests
export let leaveRequests: LeaveRequest[] = [
  {
    id: "leave-1",
    employeeId: "EMP101",
    leaveType: "Casual",
    startDate: "2024-02-05",
    endDate: "2024-02-07",
    reason: "Family function",
    status: "Pending",
    appliedAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "leave-2",
    employeeId: "EMP102",
    leaveType: "Sick",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    reason: "Fever and flu",
    status: "Approved",
    reviewedBy: "hr-marketing",
    reviewComments: "Get well soon",
    appliedAt: "2024-01-14T08:45:00Z",
    reviewedAt: "2024-01-14T14:20:00Z",
  },
];

// Sample salary slips
export let salarySlips: SalarySlip[] = [
  {
    id: "salary-1",
    employeeId: "EMP101",
    month: "January",
    year: 2024,
    basicPay: 50000,
    hra: 20000,
    bonuses: 5000,
    deductions: 3000,
    netPay: 72000,
    generatedBy: "hr-marketing",
    generatedAt: "2024-01-31T18:00:00Z",
  },
  {
    id: "salary-2",
    employeeId: "EMP102",
    month: "January",
    year: 2024,
    basicPay: 55000,
    hra: 22000,
    bonuses: 8000,
    deductions: 4000,
    netPay: 81000,
    generatedBy: "hr-marketing",
    generatedAt: "2024-01-31T18:00:00Z",
  },
];

// Sample performance reports
export let performanceReports: PerformanceReport[] = [
  {
    id: "perf-1",
    employeeId: "EMP101",
    reviewPeriod: "Q1 2024",
    tasksCompleted: 8,
    totalTasks: 10,
    completionRate: 80,
    rating: "Good",
    comments:
      "Consistently delivers quality work on time. Shows good initiative in marketing campaigns.",
    reviewedBy: "hr-marketing",
    reviewDate: "2024-01-31T10:00:00Z",
  },
  {
    id: "perf-2",
    employeeId: "EMP102",
    reviewPeriod: "Q1 2024",
    tasksCompleted: 12,
    totalTasks: 12,
    completionRate: 100,
    rating: "Excellent",
    comments:
      "Outstanding performance. Exceeded expectations in all assigned tasks and showed leadership qualities.",
    reviewedBy: "hr-marketing",
    reviewDate: "2024-01-31T10:00:00Z",
  },
  {
    id: "perf-3",
    employeeId: "EMP103",
    reviewPeriod: "Q1 2024",
    tasksCompleted: 6,
    totalTasks: 8,
    completionRate: 75,
    rating: "Average",
    comments:
      "Good effort but needs improvement in meeting deadlines. Has potential for growth.",
    reviewedBy: "hr-marketing",
    reviewDate: "2024-01-31T10:00:00Z",
  },
  {
    id: "perf-4",
    employeeId: "EMP201",
    reviewPeriod: "Q1 2024",
    tasksCompleted: 15,
    totalTasks: 16,
    completionRate: 94,
    rating: "Excellent",
    comments:
      "Exceptional technical skills and problem-solving abilities. Great mentor to junior developers.",
    reviewedBy: "hr-it",
    reviewDate: "2024-01-31T10:00:00Z",
  },
  {
    id: "perf-5",
    employeeId: "EMP202",
    reviewPeriod: "Q1 2024",
    tasksCompleted: 10,
    totalTasks: 12,
    completionRate: 83,
    rating: "Good",
    comments:
      "Solid technical contributor with good attention to detail. Reliable team member.",
    reviewedBy: "hr-it",
    reviewDate: "2024-01-31T10:00:00Z",
  },
];

// Helper functions to filter data by department
export const getEmployeesByDepartment = (
  department: Department,
): Employee[] => {
  return employees.filter((emp) => emp.department === department);
};

export const getTasksByDepartment = (department: Department): Task[] => {
  const deptEmployees = getEmployeesByDepartment(department);
  const employeeIds = deptEmployees.map((emp) => emp.id);
  return tasks.filter((task) => employeeIds.includes(task.employeeId));
};

export const getLeaveRequestsByDepartment = (
  department: Department,
): LeaveRequest[] => {
  const deptEmployees = getEmployeesByDepartment(department);
  const employeeIds = deptEmployees.map((emp) => emp.id);
  return leaveRequests.filter((leave) =>
    employeeIds.includes(leave.employeeId),
  );
};

export const getSalarySlipsByDepartment = (
  department: Department,
): SalarySlip[] => {
  const deptEmployees = getEmployeesByDepartment(department);
  const employeeIds = deptEmployees.map((emp) => emp.id);
  return salarySlips.filter((slip) => employeeIds.includes(slip.employeeId));
};

export const authenticateUser = (
  email: string,
  password: string,
): User | Employee | null => {
  // Check HR users
  const hrUser = hrUsers.find(
    (user) => user.email === email && user.password === password,
  );
  if (hrUser) return hrUser;

  // Check employees
  const employee = employees.find(
    (emp) => emp.email === email && emp.password === password,
  );
  if (employee) return employee;

  return null;
};
