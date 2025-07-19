import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, Save, Edit } from "lucide-react";
import { PerformanceReport, Employee, User } from "@shared/api";
import { performanceReports } from "@shared/database";

interface PerformanceDetailModalProps {
  report: PerformanceReport;
  employee: Employee;
  onReportUpdated?: (updatedReport: PerformanceReport) => void;
}

export default function PerformanceDetailModal({
  report,
  employee,
  onReportUpdated,
}: PerformanceDetailModalProps) {
  const { user, isHR } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [editData, setEditData] = useState({
    rating: report.rating,
    comments: report.comments,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const updatedReport: PerformanceReport = {
        ...report,
        rating: editData.rating as any,
        comments: editData.comments,
        reviewDate: new Date().toISOString(),
      };

      // Update in database
      const reportIndex = performanceReports.findIndex(
        (r) => r.id === report.id,
      );
      if (reportIndex !== -1) {
        performanceReports[reportIndex] = updatedReport;
      }

      // Call callback
      if (onReportUpdated) {
        onReportUpdated(updatedReport);
      }

      setIsEditing(false);
    } catch (err) {
      setError("Failed to update performance report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Excellent":
        return "bg-emerald-100 text-emerald-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Average":
        return "bg-amber-100 text-amber-800";
      case "Below Average":
        return "bg-orange-100 text-orange-800";
      case "Poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          <FileText className="mr-1 h-3 w-3" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm border-0 shadow-strong">
        <DialogHeader>
          <DialogTitle className="text-slate-900 text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Report Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Employee Info */}
          <div className="bg-slate-50/70 p-4 rounded-xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-600 font-semibold text-sm">
                  Employee
                </Label>
                <p className="text-slate-900 font-medium">
                  {employee.fullName}
                </p>
              </div>
              <div>
                <Label className="text-slate-600 font-semibold text-sm">
                  Review Period
                </Label>
                <p className="text-slate-900 font-medium">
                  {report.reviewPeriod}
                </p>
              </div>
              <div>
                <Label className="text-slate-600 font-semibold text-sm">
                  Tasks Completion
                </Label>
                <p className="text-slate-900 font-medium">
                  {report.tasksCompleted} / {report.totalTasks} (
                  {report.completionRate}%)
                </p>
              </div>
              <div>
                <Label className="text-slate-600 font-semibold text-sm">
                  Review Date
                </Label>
                <p className="text-slate-900 font-medium">
                  {formatDate(report.reviewDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Performance Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">
                Performance Rating
              </Label>
              {isEditing ? (
                <Select
                  value={editData.rating}
                  onValueChange={(value) =>
                    setEditData((prev) => ({ ...prev, rating: value as any }))
                  }
                >
                  <SelectTrigger className="bg-white/70 border-slate-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Average">Average</SelectItem>
                    <SelectItem value="Below Average">Below Average</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={getRatingColor(report.rating)}>
                  {report.rating}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Comments</Label>
              {isEditing ? (
                <Textarea
                  value={editData.comments}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      comments: e.target.value,
                    }))
                  }
                  rows={4}
                  className="bg-white/70 border-slate-200 rounded-xl resize-none"
                  placeholder="Enter performance comments..."
                />
              ) : (
                <div className="bg-white/70 border border-slate-200 rounded-xl p-3">
                  <p className="text-slate-700 whitespace-pre-wrap">
                    {report.comments}
                  </p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            {isHR && !isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl"
                >
                  Close
                </Button>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 rounded-xl"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Report
                </Button>
              </>
            ) : isHR && isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({
                      rating: report.rating,
                      comments: report.comments,
                    });
                  }}
                  className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 rounded-xl"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 rounded-xl"
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
