import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Save,
  X,
  Building2,
} from "lucide-react";
import { User as UserType, Employee } from "@shared/types";

export default function Profile() {
  const { user, isHR, isEmployee } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [editData, setEditData] = useState({
    mobileNumber: isEmployee ? (user as Employee).mobileNumber : "",
    emergencyContact: isEmployee ? (user as Employee).emergencyContact : "",
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you'd update the user in the database
      if (isEmployee) {
        const employee = user as Employee;
        employee.mobileNumber = editData.mobileNumber;
        employee.emergencyContact = editData.emergencyContact;
      }

      setSuccess("Profile updated successfully!");
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (isEmployee) {
      const employee = user as Employee;
      setEditData({
        mobileNumber: employee.mobileNumber,
        emergencyContact: employee.emergencyContact,
      });
    }
    setIsEditing(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
              <p className="text-gray-600">Manage your personal information</p>
            </div>
            {isEmployee && !isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
            {isEditing && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>

          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Picture and Basic Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="h-32 w-32 mx-auto mb-4">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">
                      {getInitials(user.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {user.fullName}
                  </h3>
                  <p className="text-gray-600 mb-4">{user.email}</p>
                  <div className="flex flex-col gap-2">
                    <Badge
                      variant="secondary"
                      className="w-fit mx-auto text-sm"
                    >
                      {isHR ? "HR Manager" : "Employee"}
                    </Badge>
                    <Badge variant="outline" className="w-fit mx-auto text-sm">
                      <Building2 className="mr-1 h-3 w-3" />
                      {user.department}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Information */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Full Name
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <User className="h-4 w-4 text-gray-400" />
                          <p className="text-lg font-medium text-gray-900">
                            {user.fullName}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Email Address
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <p className="text-lg font-medium text-gray-900">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Department
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <p className="text-lg font-medium text-gray-900">
                            {user.department}
                          </p>
                        </div>
                      </div>

                      {isEmployee && (
                        <div>
                          <Label className="text-sm font-medium text-gray-600">
                            Role
                          </Label>
                          <div className="flex items-center gap-2 mt-1">
                            <User className="h-4 w-4 text-gray-400" />
                            <p className="text-lg font-medium text-gray-900">
                              {(user as Employee).role}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Employee-specific information */}
                    {isEmployee && (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600">
                            Employee ID
                          </Label>
                          <p className="text-lg font-medium text-gray-900 mt-1">
                            {(user as Employee).id}
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-600">
                            Joining Date
                          </Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <p className="text-lg font-medium text-gray-900">
                              {formatDate((user as Employee).joiningDate)}
                            </p>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-600">
                            Gender
                          </Label>
                          <p className="text-lg font-medium text-gray-900 mt-1">
                            {(user as Employee).gender}
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-600">
                            Mobile Number
                          </Label>
                          {isEditing ? (
                            <Input
                              value={editData.mobileNumber}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  mobileNumber: e.target.value,
                                }))
                              }
                              className="mt-1"
                              placeholder="Enter mobile number"
                            />
                          ) : (
                            <div className="flex items-center gap-2 mt-1">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <p className="text-lg font-medium text-gray-900">
                                {(user as Employee).mobileNumber}
                              </p>
                            </div>
                          )}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-600">
                            Emergency Contact
                          </Label>
                          {isEditing ? (
                            <Input
                              value={editData.emergencyContact}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  emergencyContact: e.target.value,
                                }))
                              }
                              className="mt-1"
                              placeholder="Enter emergency contact"
                            />
                          ) : (
                            <div className="flex items-center gap-2 mt-1">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <p className="text-lg font-medium text-gray-900">
                                {(user as Employee).emergencyContact}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
