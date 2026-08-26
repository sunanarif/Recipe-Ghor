'use client'
import { useState } from 'react'
import {
  Form,
  TextField,
  Label,
  Input,
  Button,
  Card,
  Checkbox,
} from '@heroui/react'
import { Envelope, Lock } from '@gravity-ui/icons'
import Link from 'next/link'

export default function SignInPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData.entries())

    try {
      console.log('Sign in payload:', formValues)
      // TODO: call your auth API here
    } catch (error) {
      console.error(error)
      alert('Failed to sign in. Please check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md p-8 shadow-lg border border-slate-100">
        <div className="flex flex-col items-center gap-2 pb-6 border-b border-slate-100 mb-6">
          <div className="p-3 bg-orange-500 text-white rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center text-xl">
            🍲
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500 text-center">
            Sign in to Recipe Ghor to save and share your recipes
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-5">
          <TextField name="email" type="email" isRequired>
            <Label className="flex items-center gap-1">
              <Envelope className="h-4 w-4 text-slate-400" /> Email
            </Label>
            <Input placeholder="you@example.com" />
          </TextField>

          <TextField name="password" type="password" isRequired>
            <Label className="flex items-center gap-1">
              <Lock className="h-4 w-4 text-slate-400" /> Password
            </Label>
            <Input placeholder="••••••••" />
          </TextField>

          <div className="flex items-center justify-between">
            <Checkbox name="rememberMe">
              <span className="text-sm text-slate-600">Remember me</span>
            </Checkbox>
            <Link href="/forgot-password" className="text-sm text-orange-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            color="warning"
            isLoading={loading}
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600"
          >
            Sign In
          </Button>
        </Form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-orange-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  )
}