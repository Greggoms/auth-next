import { connect } from "@/db-config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // Check for duplicate user
    const foundbyUsername = await User.findOne({ username });
    const foundbyEmail = await User.findOne({ email });
    if (foundbyUsername) {
      return NextResponse.json({
        type: "username",
        message: "Username already taken.",
        status: 409,
      });
    } else if (foundbyEmail) {
      return NextResponse.json({
        type: "email",
        message: "Email already taken.",
        status: 409,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: `Welcome ${newUser.username}!` });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
