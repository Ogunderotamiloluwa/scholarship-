/**
 * Notification System for Deadline Alerts and Status Updates
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, AlertCircle, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'deadline' | 'status' | 'success' | 'info';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  applicationId?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number; // Duration in ms before auto-dismiss, 0 = persistent
}

interface NotificationCenterProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onDismiss,
  onMarkAsRead,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <Clock className="text-amber-500" size={20} />;
      case 'status':
        return <TrendingUp className="text-blue-500" size={20} />;
      case 'success':
        return <CheckCircle2 className="text-emerald-500" size={20} />;
      case 'info':
        return <AlertCircle className="text-indigo-500" size={20} />;
      default:
        return <Bell className="text-slate-500" size={20} />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'deadline':
        return 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800';
      case 'status':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      case 'success':
        return 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800';
      case 'info':
        return 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800';
      default:
        return 'bg-slate-50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-800';
    }
  };

  return (
    <div className="fixed bottom-0 right-0 top-0 pointer-events-none z-[500]">
      <AnimatePresence mode="popLayout">
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 right-0 w-full max-w-md h-screen pointer-events-auto overflow-y-auto"
          >
            <div className="p-4 space-y-3">
              {/* Notification Header */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell size={20} className="text-indigo-600 dark:text-indigo-400" />
                    <h3 className="font-black text-slate-900 dark:text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="bg-indigo-600 text-white text-xs font-black rounded-full w-6 h-6 flex items-center justify-center ml-2">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 20, x: 400 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 20, x: 400 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl p-4 border ${getBackgroundColor(notification.type)} shadow-md backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                        {notification.message}
                      </p>

                      {/* Action Button */}
                      {notification.action && (
                        <button
                          onClick={() => {
                            notification.action?.onClick();
                            onMarkAsRead(notification.id);
                          }}
                          className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
                        >
                          {notification.action.label} →
                        </button>
                      )}

                      {/* Timestamp */}
                      <div className="text-[10px] text-slate-500 dark:text-slate-500 mt-2 flex items-center justify-between">
                        <span>
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                        {!notification.read && (
                          <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full"></span>
                        )}
                      </div>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => onDismiss(notification.id)}
                      className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const id = `notif-${Date.now()}-${Math.random()}`;
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: Date.now(),
      read: false,
      duration: notification.duration !== undefined ? notification.duration : 5000,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Auto-dismiss if duration is set
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        dismissNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addDeadlineAlert = (appName: string, daysUntilDeadline: number) => {
    addNotification({
      type: 'deadline',
      title: '⏰ Upcoming Deadline',
      message: `${appName} deadline is in ${daysUntilDeadline} days. Review and finalize your submission.`,
      duration: 0, // Persistent until dismissed
    });
  };

  const addStatusUpdate = (appName: string, newStatus: string) => {
    addNotification({
      type: 'status',
      title: '📊 Status Update',
      message: `${appName} status changed to: ${newStatus}`,
      duration: 7000,
    });
  };

  const addSuccessNotification = (message: string) => {
    addNotification({
      type: 'success',
      title: '✅ Success',
      message,
      duration: 5000,
    });
  };

  const addInfoNotification = (title: string, message: string) => {
    addNotification({
      type: 'info',
      title,
      message,
      duration: 6000,
    });
  };

  return {
    notifications,
    addNotification,
    dismissNotification,
    markAsRead,
    addDeadlineAlert,
    addStatusUpdate,
    addSuccessNotification,
    addInfoNotification,
  };
};

export default NotificationCenter;
