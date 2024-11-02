"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import axiosInstance from "@/app/lib/axiosConfig";
import Link from "next/link";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const data = { name, email, mobile, password };

    try {
      const result = await axiosInstance.post(`/api/auth/register`, data);
      if (result?.status === 200) {
        const res = await signIn("credentials", { redirect: false, ...data });
        if (res?.error) {
          setError(res?.error || "Something went wrong");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      setError(error?.response?.data || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-10 space-y-8 bg-[#008f9948] rounded shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">
          Register
        </h2>
        <p className="text-center text-gray-500">Create a new account</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 border rounded-lg bg-gray-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009099] transition-all duration-200"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 border rounded-lg bg-gray-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009099] transition-all duration-200"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            onChange={(e) => {
              setMobile(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 border rounded-lg bg-gray-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009099] transition-all duration-200"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 border rounded-lg bg-gray-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009099] transition-all duration-200"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 border rounded-lg bg-gray-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009099] transition-all duration-200"
            />
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 font-semibold text-white bg-[#009099] rounded hover:bg-opacity-70 transition-all duration-200"
          >
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
