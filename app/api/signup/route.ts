import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, message: "Password must be at least 8 characters" }, { status: 400 })
    }

    // This is where you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store the user in your database

    // For demonstration, we'll simulate a successful registration
    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: { id: "2", name, email },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during signup" }, { status: 500 })
  }
}

