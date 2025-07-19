// Simple event system for real-time updates across components
type EventCallback = (data: any) => void;

class EventSystem {
  private listeners: Record<string, EventCallback[]> = {};

  subscribe(event: string, callback: EventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

    // Return unsubscribe function
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (cb) => cb !== callback,
      );
    };
  }

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }
}

export const eventSystem = new EventSystem();

// Event types
export const EVENTS = {
  LEAVE_STATUS_UPDATED: "leave_status_updated",
  EXPENSE_STATUS_UPDATED: "expense_status_updated",
  EMPLOYEE_UPDATED: "employee_updated",
  TASK_UPDATED: "task_updated",
  SALARY_UPDATED: "salary_updated",
} as const;
