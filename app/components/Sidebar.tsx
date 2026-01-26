"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  UserPlus,
  FilePenLine,
  DollarSign,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import clsx from "clsx";
import { ThemeToggle } from "./ThemeToggle";

interface SidebarProps {
  className?: string;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { name: "Add Employee", icon: UserPlus, id: "add" },
  { name: "Update Records", icon: FilePenLine, id: "update" },
  { name: "Payroll Records", icon: DollarSign, id: "payroll" },
  { name: "Profile", icon: User, id: "profile" },
];

export default function Sidebar({ className, isCollapsed, setIsCollapsed, activeItem, setActiveItem }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-foreground shadow-lg active:scale-95 transition-transform"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={clsx(
          "fixed top-0 left-0 h-full z-40 bg-white/80 dark:bg-white/5 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-300 ease-in-out flex flex-col",
          "md:translate-x-0", // Always visible on desktop
          isMobileOpen ? "translate-x-0" : "-translate-x-full", // Toggle on mobile
          isCollapsed ? "w-20" : "w-72",
          className
        )}
      >
        {/* Header / Logo Area */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200 dark:border-white/10 shrink-0">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="font-bold text-xl text-foreground tracking-wider cursor-default"
              >
                EMP<span className="text-primary">MANAGER</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors cursor-pointer"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-2 p-4 mt-4 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  setIsMobileOpen(false);
                }}
                className={clsx(
                  "flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden cursor-pointer",
                  isActive
                    ? "bg-gradient-to-r from-[#5a189a] to-[#7b2cbf] text-white shadow-lg shadow-purple-500/20"
                    : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-foreground"
                )}
              >
                <div className="relative z-10 flex items-center gap-4">
                  <Icon
                    size={22}
                    className={clsx(
                      "transition-transform duration-300",
                      isActive ? "scale-110" : "group-hover:scale-110"
                    )}
                  />
                  {!isCollapsed && (
                    <span className="font-medium whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
                
                {/* Hover Glow Effect */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer / User Section */}
        <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-black/5 shrink-0 flex flex-col gap-2">
          <div className={clsx("flex items-center gap-2", isCollapsed ? "justify-center" : "justify-between")}>
             {!isCollapsed && <span className="text-xs font-medium text-gray-500 uppercase">Theme</span>}
             <div className="cursor-pointer"><ThemeToggle /></div>
          </div>
          
          <button className={clsx(
            "flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-500 dark:text-gray-400 hover:text-red-500 cursor-pointer",
            isCollapsed ? "justify-center" : ""
          )}>
            <LogOut size={20} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
