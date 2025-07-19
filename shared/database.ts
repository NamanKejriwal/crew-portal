import {
  User,
  Employee,
  Task,
  LeaveRequest,
  SalarySlip,
  PerformanceReport,
  ExpenseClaim,
  Department,
} from "./api";

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

// Enhanced salary configuration by department with experience levels
const salaryConfig = {
  Marketing: {
    basePay: 50000,
    hraPercent: 0.4,
    bonusPercent: 0.1,
    deductionPercent: 0.05,
  },
  IT: {
    basePay: 60000,
    hraPercent: 0.35,
    bonusPercent: 0.12,
    deductionPercent: 0.06,
  },
  Finance: {
    basePay: 55000,
    hraPercent: 0.38,
    bonusPercent: 0.08,
    deductionPercent: 0.05,
  },
  Research: {
    basePay: 65000,
    hraPercent: 0.32,
    bonusPercent: 0.15,
    deductionPercent: 0.07,
  },
};

// Function to calculate years of experience
const calculateExperience = (joiningDate: string): number => {
  const joining = new Date(joiningDate);
  const now = new Date();
  return Math.floor(
    (now.getTime() - joining.getTime()) / (1000 * 60 * 60 * 24 * 365),
  );
};

// Function to calculate salary based on employee data with experience adjustment
const calculateBaseSalary = (employee: Employee) => {
  const config = salaryConfig[employee.department];
  const experience = calculateExperience(employee.joiningDate);

  // Adjust base pay based on experience (5% increase per year, max 50%)
  const experienceMultiplier = Math.min(1 + experience * 0.05, 1.5);
  const adjustedBasePay = Math.round(config.basePay * experienceMultiplier);

  const hra = Math.round(adjustedBasePay * config.hraPercent);
  const standardBonuses = Math.round(adjustedBasePay * config.bonusPercent);
  const deductions = Math.round(adjustedBasePay * config.deductionPercent);

  return {
    basicPay: adjustedBasePay,
    hra,
    bonuses: standardBonuses,
    deductions,
    approvedExpenses: 0, // Initialize with no expenses
  };
};

// Function to get total approved expenses for an employee in a given month/year
export const getApprovedExpensesForMonth = (
  employeeId: string,
  month: string,
  year: number,
): { total: number; details: any[] } => {
  const monthExpenses = expenseClaims.filter(
    (expense) =>
      expense.employeeId === employeeId &&
      expense.status === "Approved" &&
      expense.reviewedAt &&
      new Date(expense.reviewedAt).getMonth() ===
        new Date(`${month} 1, ${year}`).getMonth() &&
      new Date(expense.reviewedAt).getFullYear() === year,
  );

  const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const details = monthExpenses.map((expense) => ({
    expenseId: expense.id,
    title: expense.title,
    amount: expense.amount,
    approvedAt: expense.reviewedAt!,
  }));

  return { total, details };
};

// Generate salary slips for all employees
export let salarySlips: SalarySlip[] = employees.map((employee) => {
  const salary = calculateSalary(employee);
  const hrUser = hrUsers.find((hr) => hr.department === employee.department);

  return {
    id: `salary-${employee.id}`,
    employeeId: employee.id,
    month: "January",
    year: 2024,
    ...salary,
    generatedBy: hrUser?.id || "system",
    generatedAt: "2024-01-31T18:00:00Z",
  };
});

// Function to update salary with approved expenses
export const updateSalaryWithExpense = (
  employeeId: string,
  expenseAmount: number,
) => {
  const employee = employees.find((emp) => emp.id === employeeId);
  if (!employee) return;

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const existingSlipIndex = salarySlips.findIndex(
    (slip) =>
      slip.employeeId === employeeId &&
      slip.month === currentMonth &&
      slip.year === currentYear,
  );

  if (existingSlipIndex !== -1) {
    // Update existing slip
    salarySlips[existingSlipIndex].bonuses += expenseAmount;
    salarySlips[existingSlipIndex].netPay += expenseAmount;
  } else {
    // Create new salary slip with expense
    const salary = calculateSalary(employee, expenseAmount);
    const hrUser = hrUsers.find((hr) => hr.department === employee.department);

    const newSlip: SalarySlip = {
      id: `salary-${employeeId}-${Date.now()}`,
      employeeId: employeeId,
      month: currentMonth,
      year: currentYear,
      ...salary,
      generatedBy: hrUser?.id || "system",
      generatedAt: new Date().toISOString(),
    };
    salarySlips.push(newSlip);
  }
};

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

// Sample expense claims
export let expenseClaims: ExpenseClaim[] = [
  {
    id: "exp-1",
    employeeId: "EMP101",
    title: "Client Meeting Lunch",
    description:
      "Business lunch with potential client for Q2 marketing campaign",
    amount: 1200,
    category: "Meals",
    submittedAt: "2024-01-25T14:30:00Z",
    status: "Pending",
  },
  {
    id: "exp-2",
    employeeId: "EMP102",
    title: "Marketing Conference Travel",
    description: "Flight tickets for Digital Marketing Summit 2024",
    amount: 15000,
    category: "Travel",
    submittedAt: "2024-01-24T10:15:00Z",
    status: "Approved",
    reviewedBy: "hr-marketing",
    reviewComments: "Approved for professional development",
    reviewedAt: "2024-01-24T16:20:00Z",
  },
  {
    id: "exp-3",
    employeeId: "EMP201",
    title: "Software License",
    description: "Annual subscription for development tools",
    amount: 8000,
    category: "Software",
    submittedAt: "2024-01-23T09:00:00Z",
    status: "Approved",
    reviewedBy: "hr-it",
    reviewComments: "Essential for development work",
    reviewedAt: "2024-01-23T14:45:00Z",
  },
  {
    id: "exp-4",
    employeeId: "EMP202",
    title: "Team Building Activity",
    description: "Quarterly team building event expenses",
    amount: 3500,
    category: "Other",
    submittedAt: "2024-01-22T11:30:00Z",
    status: "Pending",
  },
];

// Add more performance reports for all employees
performanceReports.push(
  {
    id: "perf-6",
    employeeId: "EMP104",
    reviewPeriod: "Q1 2024",
    tasksCompleted: 9,
    totalTasks: 10,
    completionRate: 90,
    rating: "Excellent",
    comments:
      "Consistently delivers high-quality work. Shows great initiative and leadership potential.",
    reviewedBy: "hr-marketing",
    reviewDate: "2024-01-31T10:00:00Z",
  },
  {
    id: "perf-7",
    employeeId: "EMP105",
    reviewPeriod: "Q1 2024",
    tasksCompleted: 7,
    totalTasks: 9,
    completionRate: 78,
    rating: "Good",
    comments:
      "Good performance for a new employee. Shows enthusiasm and willingness to learn.",
    reviewedBy: "hr-marketing",
    reviewDate: "2024-01-31T10:00:00Z",
  },
  {
    id: "perf-8",
    employeeId: "EMP203",
    reviewPeriod: "Q1 2024",
    tasksCompleted: 11,
    totalTasks: 13,
    completionRate: 85,
    rating: "Good",
    comments:
      "Solid technical skills. Good problem-solving abilities and team collaboration.",
    reviewedBy: "hr-it",
    reviewDate: "2024-01-31T10:00:00Z",
  },
  {
    id: "perf-9",
    employeeId: "EMP204",
    reviewPeriod: "Q1 2024",
    tasksCompleted: 8,
    totalTasks: 10,
    completionRate: 80,
    rating: "Good",
    comments:
      "Reliable team member with good attention to detail. Meets all deadlines consistently.",
    reviewedBy: "hr-it",
    reviewDate: "2024-01-31T10:00:00Z",
  },
  {
    id: "perf-10",
    employeeId: "EMP205",
    reviewPeriod: "Q1 2024",
    tasksCompleted: 6,
    totalTasks: 8,
    completionRate: 75,
    rating: "Average",
    comments:
      "Decent performance but has room for improvement in meeting deadlines.",
    reviewedBy: "hr-it",
    reviewDate: "2024-01-31T10:00:00Z",
  },
);

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

export const getPerformanceReportsByDepartment = (
  department: Department,
): PerformanceReport[] => {
  const deptEmployees = getEmployeesByDepartment(department);
  const employeeIds = deptEmployees.map((emp) => emp.id);
  return performanceReports.filter((report) =>
    employeeIds.includes(report.employeeId),
  );
};

export const getExpenseClaimsByDepartment = (
  department: Department,
): ExpenseClaim[] => {
  const deptEmployees = getEmployeesByDepartment(department);
  const employeeIds = deptEmployees.map((emp) => emp.id);
  return expenseClaims.filter((claim) =>
    employeeIds.includes(claim.employeeId),
  );
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
