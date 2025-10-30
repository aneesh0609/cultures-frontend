// src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, updateUserInfo, deleteUserAccount, clearUserMessage } from "../slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error, successMessage } = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    dispatch(fetchUserInfo());

    // Clear messages on unmount
    return () => {
      dispatch(clearUserMessage());
    };
  }, [dispatch]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      alert("Please fill both fields");
      return;
    }
    // Send both old and new passwords to backend
    dispatch(updateUserInfo({ oldPassword, newPassword }));
    setOldPassword("");
    setNewPassword("");
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirm) {
      dispatch(deleteUserAccount());
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-3xl font-bold mb-4 text-center panchang tracking-[0.1em]">Profile</h2>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        {/* Email (read-only) */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={userInfo?.email || ""}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>

      {/* Delete Account */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2    rounded hover:bg-red-700 transition"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
