import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  try {
    const { name, email, mobile, password } = await req.json();
    if (!name || !email || !password || !mobile) {
      return new NextResponse("Please fill all fields", { status: 400 });
    }

    const cleanedName = name?.trim().toLowerCase();
    if (cleanedName?.length < 3) {
      return new NextResponse("Name must be at least 3 characters long", {
        status: 400,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new NextResponse("Invalid email format", { status: 400 });
    }

    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(mobile)) {
      return new NextResponse(
        "Invalid phone number format. Must be 11 digits.",
        { status: 400 }
      );
    }

    if (mobile && !validator.isMobilePhone(mobile, "any")) {
      throw createError(400, "Invalid mobile number");
    }

    if (password.length < 6) {
      return new NextResponse("Password must be at least 6 characters long", {
        status: 400,
      });
    }

    const db = await connectDB();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ email }, { mobile });
    if (existingUser) {
      return new NextResponse("Email or Mobile already exists", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: cleanedName,
      email,
      password: hashedPassword,
      mobile,
      role: "user",
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    if (!result?.insertedId) {
      return new NextResponse("Something went wrong, try again", {
        status: 500,
      });
    }

    return NextResponse.json({
      message: "User created successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
