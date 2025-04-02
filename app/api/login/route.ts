import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // This is where you would validate credentials against your database
    // For demonstration purposes, we'll just check for a dummy email/password
    if (email === "admin@hospital.com" && password === "password123") {
      // In a real application, you would:
      // 1. Generate a JWT or session token
      // 2. Set cookies or return the token
      // 3. Store session information

      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: { id: "1", name: "Admin User", email },
      })
    }

    // Invalid credentials
    return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}

