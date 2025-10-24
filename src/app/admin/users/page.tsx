"use client";

import { useState, useEffect } from "react";
import { adminAPI } from "@/lib/api";
import { Search, Shield, User as UserIcon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  address?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Role filter
    if (roleFilter === "admin") {
      filtered = filtered.filter((user) => user.isAdmin);
    } else if (roleFilter === "customer") {
      filtered = filtered.filter((user) => !user.isAdmin);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const handleRoleToggle = async (userId: string, currentIsAdmin: boolean) => {
    const newRole = !currentIsAdmin;
    const roleText = newRole ? "admin" : "customer";

    if (
      !confirm(
        `Are you sure you want to change this user's role to ${roleText}?`
      )
    )
      return;

    try {
      await adminAPI.updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isAdmin: newRole } : user
        )
      );
      toast.success(`User role updated to ${roleText}`);
    } catch (err) {
      toast.error("Failed to update user role");
    }
  };

  const handleDelete = async (userId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    )
      return;

    try {
      await adminAPI.deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      toast.success("User deleted");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <div className="bg-white rounded-xl p-6 animate-pulse">
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600 mt-1">Manage user accounts and roles</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="customer">Customers</option>
          </select>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <p className="text-xs md:text-sm text-blue-600 font-medium mb-1">
              Total Users
            </p>
            <p className="text-2xl md:text-3xl font-bold text-blue-700">
              {users.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <p className="text-xs md:text-sm text-purple-600 font-medium mb-1">
              Admins
            </p>
            <p className="text-2xl md:text-3xl font-bold text-purple-700">
              {users.filter((u) => u.isAdmin).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <p className="text-xs md:text-sm text-green-600 font-medium mb-1">
              Customers
            </p>
            <p className="text-2xl md:text-3xl font-bold text-green-700">
              {users.filter((u) => !u.isAdmin).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
            <p className="text-xs md:text-sm text-amber-600 font-medium mb-1">
              Showing
            </p>
            <p className="text-2xl md:text-3xl font-bold text-amber-700">
              {filteredUsers.length}
            </p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Address
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Joined
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 font-mono">
                            {user._id.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          user.isAdmin
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.isAdmin ? (
                          <>
                            <Shield className="w-3 h-3" />
                            Admin
                          </>
                        ) : (
                          <>
                            <UserIcon className="w-3 h-3" />
                            Customer
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 max-w-xs truncate">
                      {user.address || "-"}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleRoleToggle(user._id, user.isAdmin)
                          }
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            user.isAdmin
                              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                              : "bg-purple-50 text-purple-600 hover:bg-purple-100"
                          }`}
                        >
                          {user.isAdmin ? "Make Customer" : "Make Admin"}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
