"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const result = await signIn("credentials", { redirect: false, ...data });
      if (result?.error) {
        console.error("Login error:", result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <button type="submit">login</button>
    </form>
  );
};

export default LoginPage;
