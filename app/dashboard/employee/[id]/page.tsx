"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail, MapPin, Briefcase, Building2, User, Phone, Calendar, DollarSign, Droplet } from "lucide-react";
import clsx from "clsx";
import { initialEmployees } from "../../../lib/data";

export default function EmployeeDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const employee = initialEmployees.find(emp => emp.id === id);

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Employee Not Found</h1>
          <button 
            onClick={() => router.back()}
            className="text-primary hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative bg-background text-foreground overflow-hidden transition-colors duration-300 p-6 md:p-12">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, var(--background) 40%, var(--primary) 100%)",
          opacity: 0.05
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
            <div className="absolute -bottom-12 left-8 md:left-12">
              <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-primary to-secondary p-[3px] shadow-lg">
                <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                  <User size={40} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 px-8 md:px-12 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{employee.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">{employee.role}</p>
              </div>
              <span className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-medium border",
                employee.status === "Active" && "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
                employee.status === "On Leave" && "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20",
                employee.status === "Remote" && "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
              )}>
                {employee.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Building2 size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                  <p className="font-medium text-foreground">{employee.department}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium text-foreground">{employee.location}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/20 text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="font-medium text-foreground">{employee.email}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-300">
                  <Briefcase size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Employee ID</p>
                  <p className="font-medium text-foreground">{employee.id}</p>
                </div>
              </div>

              {/* New Details */}
              <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-foreground">{employee.phone}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Joining Date</p>
                  <p className="font-medium text-foreground">{employee.joiningDate}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                  <DollarSign size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Salary</p>
                  <p className="font-medium text-foreground">{employee.salary}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                  <Droplet size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Blood Group</p>
                  <p className="font-medium text-foreground">{employee.bloodGroup}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
