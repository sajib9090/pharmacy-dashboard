import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/config/db";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error("Please fill in both email and password.");
        }

        const db = await connectDB();
        if (!db) {
          throw new Error("Failed to connect to the database");
        }

        const usersCollection = await db.collection("users");
        const existingUser = await usersCollection.findOne({ email });
        if (!existingUser) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser?.password
        );
        if (!isPasswordValid) {
          throw new Error("Password is incorrect.");
        }

        return existingUser;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.mobile = user.mobile;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass token data to session for access on client side
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.mobile = token.mobile;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
