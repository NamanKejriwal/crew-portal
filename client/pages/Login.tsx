import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Lock, Mail, Building2 } from "lucide-react";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sampleCredentials = [
    {
      role: "HR",
      department: "Marketing",
      email: "hr.marketing@hrportal.com",
      password: "marketing@123",
    },
    {
      role: "HR",
      department: "IT",
      email: "hr.it@hrportal.com",
      password: "it@123",
    },
    {
      role: "Employee",
      department: "Marketing",
      email: "ananya@hrportal.com",
      password: "ananya@123",
    },
    {
      role: "Employee",
      department: "IT",
      email: "manish@hrportal.com",
      password: "manish@123",
    },
  ];

  const fillCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-8">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Crew Portal</h1>
              <p className="text-blue-600 font-medium">HR Management System</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Building2 className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Departmental Data Segregation
                </h3>
                <p className="text-gray-600">
                  Secure access with strict departmental boundaries for HR
                  operations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Lock className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Role-Based Access
                </h3>
                <p className="text-gray-600">
                  Tailored dashboards for HR administrators and employee
                  self-service.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Comprehensive Management
                </h3>
                <p className="text-gray-600">
                  Complete HR tools for employee management, tasks, leaves, and
                  payroll.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Welcome Back
              </CardTitle>
              <p className="text-gray-600">Sign in to your account</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Demo Credentials:
                </p>
                <div className="grid gap-2">
                  {sampleCredentials.map((cred, index) => (
                    <button
                      key={index}
                      onClick={() => fillCredentials(cred.email, cred.password)}
                      className="text-left p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors text-xs"
                    >
                      <div className="font-medium text-gray-900">
                        {cred.role} - {cred.department}
                      </div>
                      <div className="text-gray-600">{cred.email}</div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
