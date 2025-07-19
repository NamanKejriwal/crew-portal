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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 animate-gradient flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-10 lg:pr-12 animate-slide-up">
          <div className="flex items-center justify-center lg:justify-start gap-5">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 rounded-2xl shadow-strong animate-pulse-slow animate-float">
              <Users className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                Crew Portal
              </h1>
              <p className="text-slate-600 font-medium text-xl mt-2">
                Modern HR Management
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="flex items-start gap-5">
              <div className="bg-slate-100 p-3 rounded-xl flex-shrink-0 shadow-soft">
                <Building2 className="h-7 w-7 text-slate-700" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-900 text-xl mb-3">
                  Departmental Data Segregation
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Enterprise-grade security with strict departmental boundaries
                  for sensitive HR operations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="bg-slate-100 p-3 rounded-xl flex-shrink-0 shadow-soft">
                <Lock className="h-7 w-7 text-slate-700" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-900 text-xl mb-3">
                  Role-Based Access Control
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Intelligently designed dashboards with granular permissions
                  for administrators and employees.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="bg-slate-100 p-3 rounded-xl flex-shrink-0 shadow-soft">
                <Users className="h-7 w-7 text-slate-700" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-900 text-xl mb-3">
                  Complete HR Suite
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Comprehensive tools for workforce management, performance
                  tracking, and organizational growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto animate-scale-in">
          <Card className="shadow-strong border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8 pt-10">
              <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
                Welcome Back
              </CardTitle>
              <p className="text-slate-600 text-lg">Access your workspace</p>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-12 bg-white/50 border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 rounded-xl"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-12 bg-white/50 border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 rounded-xl"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert
                    variant="destructive"
                    className="bg-red-50 border-red-200"
                  >
                    <AlertDescription className="text-red-800">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 h-12 text-base font-semibold rounded-xl shadow-medium transition-all duration-300 hover:shadow-strong"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
