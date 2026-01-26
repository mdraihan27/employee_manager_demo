"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import clsx from "clsx";
import { Users, DollarSign, AlertCircle, CheckCircle2, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Employee, initialEmployees } from "../lib/data";

export default function Dashboard() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchQuery, setSearchQuery] = useState("");

  // Update Records State
  const [updateSearchId, setUpdateSearchId] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [updateMessage, setUpdateMessage] = useState("");

  // Add Employee State
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
    name: "",
    role: "",
    department: "",
    location: "",
    email: "",
    status: "Active",
    phone: "",
    joiningDate: "",
    salary: "",
    bloodGroup: "",
  });
  const [addMessage, setAddMessage] = useState("");

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleSearchForUpdate = () => {
    const emp = employees.find((e) => e.id.toLowerCase() === updateSearchId.toLowerCase());
    if (emp) {
      setEditingEmployee({ ...emp });
      setUpdateMessage("");
    } else {
      setEditingEmployee(null);
      setUpdateMessage("Employee not found");
    }
  };

  const handleUpdateSave = () => {
    if (editingEmployee) {
      setEmployees(employees.map((emp) => (emp.id === editingEmployee.id ? editingEmployee : emp)));
      setUpdateMessage("Employee updated successfully!");
      setTimeout(() => setUpdateMessage(""), 3000);
    }
  };

  const handleAddSubmit = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
      setAddMessage("Please fill in all required fields (Name, Email, Role).");
      return;
    }
    // Generate a simple ID based on timestamp to avoid collisions in this demo
    const newId = `EMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const employeeToAdd: Employee = { ...newEmployee, id: newId };
    
    setEmployees([employeeToAdd, ...employees]);
    setAddMessage(`Employee ${newId} added successfully!`);
    setNewEmployee({
      name: "",
      role: "",
      department: "",
      location: "",
      email: "",
      status: "Active",
      phone: "",
      joiningDate: "",
      salary: "",
      bloodGroup: "",
    });
    setTimeout(() => setAddMessage(""), 3000);
  };

  return (
    <div className="min-h-screen w-full relative bg-background text-foreground overflow-hidden transition-colors duration-300">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, var(--background) 40%, var(--primary) 100%)",
          opacity: 0.05
        }}
      />
      
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content Area */}
      <main
        className={clsx(
          "relative z-10 min-h-screen transition-all duration-300 ease-in-out p-6",
          isCollapsed ? "md:ml-20" : "md:ml-72"
        )}
      >
        <div className="max-w-7xl mx-auto">
          {activeItem === "dashboard" && (
            <>
              <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 pt-12 md:pt-0 gap-4">
                <div>
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Dashboard
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Admin</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                    <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-sm font-bold text-foreground">
                      AD
                    </div>
                  </div>
                </div>
              </header>

              {/* Dashboard Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Stats Card 1 */}
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-lg hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Employees</h3>
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Users size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{employees.length}</p>
                  <div className="mt-4 flex items-center text-sm text-green-500">
                    <CheckCircle2 size={16} className="mr-1" />
                    <span>+12% from last month</span>
                  </div>
                </div>

                {/* Stats Card 2 */}
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-lg hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Payroll Expenses</h3>
                    <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:scale-110 transition-transform duration-300">
                      <DollarSign size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-foreground">$45,231</p>
                  <div className="mt-4 flex items-center text-sm text-red-500">
                    <AlertCircle size={16} className="mr-1" />
                    <span>+5% from last month</span>
                  </div>
                </div>

                 {/* Stats Card 3 */}
                 <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-lg hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending Approvals</h3>
                    <div className="p-2 rounded-lg bg-accent/20 text-primary group-hover:scale-110 transition-transform duration-300">
                      <AlertCircle size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-foreground">8</p>
                  <div className="mt-4 flex items-center text-sm text-blue-500">
                    <span>Requires attention</span>
                  </div>
                </div>
              </div>

              {/* Employee Directory Section */}
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-bold text-foreground">Employee Directory</h2>
                  
                  {/* Search Bar */}
                  <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by Name or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                        <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                        <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Role</th>
                        <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Department</th>
                        <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Location</th>
                        <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                        <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((emp) => (
                          <tr 
                            key={emp.id} 
                            onClick={() => router.push(`/dashboard/employee/${emp.id}`)}
                            className="group border-b border-gray-100 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <td className="p-4 text-sm font-medium text-primary">{emp.id}</td>
                            <td className="p-4 text-sm text-foreground">
                              <div className="font-medium">{emp.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{emp.email}</div>
                            </td>
                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{emp.role}</td>
                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{emp.department}</td>
                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{emp.location}</td>
                            <td className="p-4 text-sm">
                              <span className={clsx(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                emp.status === "Active" && "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
                                emp.status === "On Leave" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
                                emp.status === "Remote" && "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
                              )}>
                                {emp.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(emp.id);
                                }}
                                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                                title="Delete Employee"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-gray-500 dark:text-gray-400">
                            No employees found matching "{searchQuery}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeItem === "update" && (
            <div className="max-w-3xl mx-auto pt-12 md:pt-0">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8">
                Update Records
              </h1>

              {/* Search Section */}
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-lg shadow-sm mb-8">
                <h2 className="text-lg font-semibold mb-4 text-foreground">Find Employee</h2>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Employee ID (e.g., EMP-1001)"
                      value={updateSearchId}
                      onChange={(e) => setUpdateSearchId(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder-gray-400"
                    />
                  </div>
                  <button
                    onClick={handleSearchForUpdate}
                    className="px-6 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    Search
                  </button>
                </div>
                {updateMessage && (
                  <p className={clsx("mt-4 text-sm", updateMessage.includes("success") ? "text-green-500" : "text-red-500")}>
                    {updateMessage}
                  </p>
                )}
              </div>

              {/* Edit Form */}
              {editingEmployee && (
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-lg shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h2 className="text-lg font-semibold mb-6 text-foreground">Edit Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                      <input
                        type="text"
                        value={editingEmployee.name}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
                      <input
                        type="text"
                        value={editingEmployee.role}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
                      <input
                        type="text"
                        value={editingEmployee.department}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                      <input
                        type="text"
                        value={editingEmployee.location}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, location: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                      <input
                        type="email"
                        value={editingEmployee.email}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                      <select
                        value={editingEmployee.status}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value as any })}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                      >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                      <input
                        type="text"
                        value={editingEmployee.phone}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Joining Date</label>
                      <input
                        type="date"
                        value={editingEmployee.joiningDate}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, joiningDate: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Salary</label>
                      <input
                        type="text"
                        value={editingEmployee.salary}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, salary: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Blood Group</label>
                      <input
                        type="text"
                        value={editingEmployee.bloodGroup}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, bloodGroup: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end gap-4">
                    <button
                      onClick={() => setEditingEmployee(null)}
                      className="px-6 py-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateSave}
                      className="px-6 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeItem === "add" && (
            <div className="max-w-3xl mx-auto pt-12 md:pt-0">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8">
                Add New Employee
              </h1>

              <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-lg shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-lg font-semibold mb-6 text-foreground">Employee Details</h2>
                
                {addMessage && (
                  <div className={clsx("mb-6 p-4 rounded-xl text-sm font-medium", addMessage.includes("success") ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400")}>
                    {addMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Role *</label>
                    <input
                      type="text"
                      placeholder="e.g. Software Engineer"
                      value={newEmployee.role}
                      onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
                    <input
                      type="text"
                      placeholder="e.g. IT"
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Dhaka"
                      value={newEmployee.location}
                      onChange={(e) => setNewEmployee({ ...newEmployee, location: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email *</label>
                    <input
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                    <select
                      value={newEmployee.status}
                      onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value as any })}
                      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                    <input
                      type="text"
                      placeholder="e.g. 01711223344"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Joining Date</label>
                    <input
                      type="date"
                      value={newEmployee.joiningDate}
                      onChange={(e) => setNewEmployee({ ...newEmployee, joiningDate: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Salary</label>
                    <input
                      type="text"
                      placeholder="e.g. 50,000 BDT"
                      value={newEmployee.salary}
                      onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Blood Group</label>
                    <input
                      type="text"
                      placeholder="e.g. A+"
                      value={newEmployee.bloodGroup}
                      onChange={(e) => setNewEmployee({ ...newEmployee, bloodGroup: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={() => setNewEmployee({ name: "", role: "", department: "", location: "", email: "", status: "Active" })}
                    className="px-6 py-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleAddSubmit}
                    className="px-6 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    Add Employee
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for other views */}
          {(activeItem === "payroll" || activeItem === "profile") && (
             <div className="flex items-center justify-center h-[60vh]">
               <div className="text-center">
                 <h2 className="text-2xl font-bold text-foreground mb-2">Coming Soon</h2>
                 <p className="text-gray-500 dark:text-gray-400">This feature is under development.</p>
               </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
