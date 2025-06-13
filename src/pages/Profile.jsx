import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = "https://lawpal-backend.onrender.com";

export default function Profile({ user, onUpdateUser }) {
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [loading, setLoading] = useState(false);
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm({ name: user.name, email: user.email });
    setProfilePic(user.profilePic || "");
  }, [user]);

  async function handleProfileUpdate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${backendUrl}/api/user/update`,
        form,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      toast.success("Profile updated successfully!");
      onUpdateUser(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update profile");
    }
    setLoading(false);
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setPwLoading(true);
    try {
      await axios.put(
        `${backendUrl}/api/user/password`,
        pwForm,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      toast.success("Password changed successfully!");
      setPwForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to change password");
    }
    setPwLoading(false);
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePic", file);

    setUploading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/upload-profile-pic`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile picture updated successfully!");
      setProfilePic(res.data.profilePic);
      onUpdateUser(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to upload profile picture");
    }
    setUploading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
      {/* Profile Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
        <p className="text-gray-500">Manage your profile and security settings</p>
      </div>

      {/* Profile Picture Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-gray-200">
        <div className="relative">
          <img
            src={profilePic ? `${backendUrl}${profilePic}` : "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          {uploading && (
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile Picture</h3>
          <p className="text-gray-500 text-sm mb-4">
            Recommended: Square image, at least 200x200 pixels
          </p>
          <div className="flex flex-wrap gap-3">
            <label
              htmlFor="profilePicInput"
              className={`cursor-pointer px-4 py-2 rounded-lg font-medium flex items-center transition-colors ${
                uploading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {uploading ? "Uploading..." : "Upload Photo"}
            </label>
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            {profilePic && (
              <button
                onClick={() => {
                  if (window.confirm("Remove profile picture?")) {
                    setProfilePic("");
                    // You might want to add API call to remove profile picture
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Profile Information Form */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-medium flex items-center transition-colors ${
                loading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Password Change Form */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              type="password"
              autoComplete="current-password"
              value={pwForm.currentPassword}
              onChange={(e) => setPwForm((f) => ({ ...f, currentPassword: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              type="password"
              autoComplete="new-password"
              value={pwForm.newPassword}
              onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))}
              required
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={pwLoading}
              className={`px-6 py-2 rounded-lg font-medium flex items-center transition-colors ${
                pwLoading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {pwLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Changing...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
