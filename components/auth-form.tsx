"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("login")

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  // Signup form state
  const [name, setName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  // Form validation errors
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({})
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({})

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset errors
    setLoginErrors({})
    setError(null)

    // Validate form
    const errors: Record<string, string> = {}

    if (!loginEmail) {
      errors.email = "Email is required"
    } else if (!validateEmail(loginEmail)) {
      errors.email = "Please enter a valid email"
    }

    if (!loginPassword) {
      errors.password = "Password is required"
    } else if (loginPassword.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors)
      return
    }

    // Submit form
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Login data:", { loginEmail, loginPassword, rememberMe })

      // Here you would typically authenticate with your backend
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      // })
      //
      // if (!response.ok) {
      //   throw new Error('Login failed')
      // }
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset errors
    setSignupErrors({})
    setError(null)

    // Validate form
    const errors: Record<string, string> = {}

    if (!name || name.length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    if (!signupEmail) {
      errors.email = "Email is required"
    } else if (!validateEmail(signupEmail)) {
      errors.email = "Please enter a valid email"
    }

    if (!signupPassword) {
      errors.password = "Password is required"
    } else if (signupPassword.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }

    if (signupPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (!agreeToTerms) {
      errors.terms = "You must agree to the terms and conditions"
    }

    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors)
      return
    }

    // Submit form
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Signup data:", { name, email: signupEmail, password: signupPassword })

      // Here you would typically register the user with your backend
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name,
      //     email: signupEmail,
      //     password: signupPassword
      //   }),
      // })
      //
      // if (!response.ok) {
      //   throw new Error('Signup failed')
      // }

      // Reset form and switch to login tab
      setName("")
      setSignupEmail("")
      setSignupPassword("")
      setConfirmPassword("")
      setAgreeToTerms(false)
      setActiveTab("login")
    } catch (err) {
      setError("There was a problem creating your account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <TabsContent value="login">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="name@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              {loginErrors.email && <p className="text-sm font-medium text-destructive">{loginErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              {loginErrors.password && <p className="text-sm font-medium text-destructive">{loginErrors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember-me" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>

              <Button variant="link" className="p-0 h-auto text-sm" type="button">
                Forgot password?
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              {signupErrors.name && <p className="text-sm font-medium text-destructive">{signupErrors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="name@example.com"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              {signupErrors.email && <p className="text-sm font-medium text-destructive">{signupErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              {signupErrors.password && <p className="text-sm font-medium text-destructive">{signupErrors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {signupErrors.confirmPassword && (
                <p className="text-sm font-medium text-destructive">{signupErrors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Button variant="link" className="p-0 h-auto text-sm" type="button">
                    terms of service
                  </Button>{" "}
                  and{" "}
                  <Button variant="link" className="p-0 h-auto text-sm" type="button">
                    privacy policy
                  </Button>
                </Label>
                {signupErrors.terms && <p className="text-sm font-medium text-destructive">{signupErrors.terms}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

