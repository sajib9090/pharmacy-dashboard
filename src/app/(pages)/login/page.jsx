"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = { email, password };

    try {
      const result = await signIn("credentials", { redirect: false, ...data });
      if (result?.error) {
        setError(result?.error || "Something went wrong");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-10 space-y-8 bg-[#008f9948] rounded shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">Login</h2>
        <p className="text-center text-gray-500">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 border rounded-lg bg-gray-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#009099] transition-all duration-200"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
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
          {error && <p className="text-red-600 mt-2">{error}</p>}
          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 font-semibold text-white bg-[#009099] rounded hover:bg-opacity-70 transition-all duration-200"
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
