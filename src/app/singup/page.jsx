"use client"

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";

import { redirect } from "next/navigation";
import { IconBase } from "react-icons";

const SingUpPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
        console.log(user);
        const { data, error } = await authClient.signUp.email({
            name: user.name, // required
            email: user.email,
            password: user.password, // required
            image: user.image,
            plan:"free",
            isBlock:false,
        });
        console.log(data);
        if (data) {
            redirect('/')
        }
        
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
                <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        name="name"
                        type="text"


                    >
                        <Label>Name</Label>
                        <Input placeholder="Enter Your Name" />
                        <FieldError />
                    </TextField>
                    <TextField
                        name="image"
                        type="url"


                    >
                        <Label>Image Url</Label>
                        <Input placeholder="Enter Image Url" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex gap-2">
                        <Button className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600" type="submit">
                            Submit
                        </Button>
                    </div>
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
                            Sign in with Google
                        </Button>
                    </div>
                </div>
            </Card>

        </div>
    );
};

export default SingUpPage;