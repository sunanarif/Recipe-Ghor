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
    Separator,
} from '@heroui/react'
import { Envelope, Lock } from '@gravity-ui/icons'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { IconBase } from 'react-icons'
import { FcGoogle } from 'react-icons/fc'

export default function SignInPage() {
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMsg('')

        const formData = new FormData(e.currentTarget)
        const formValues = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email({
            email: formValues.email,
            password: formValues.password,
        });

        setLoading(false)

        if (error) {
            setErrorMsg(error.message || 'Failed to sign in')
            return
        }

        if (data?.user?.isBlock) {
            router.push('/user-block')
            return
        }

        router.push('/')
    }

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google"
        })

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

                {errorMsg && (
                    <div className="mb-4 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 text-sm font-medium">
                        {errorMsg}
                    </div>
                )}

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
                <div>
                    <div className="flex justify-center items-center gap-3">
                        <Separator />
                        <div className="whitespace-nowrap">
                            Or sing with
                        </div>
                        <Separator />
                    </div>
                    <div>
                        <Button onClick={handleGoogleSignin} className="w-full" variant="tertiary">
                            <IconBase icon="devicon:google" />
                            <FcGoogle />Sign in with Google
                        </Button>
                    </div>
                </div>

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