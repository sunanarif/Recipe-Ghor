"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { ThemeToggle } from "./ThemeToggle";
export default function Navbar() {

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Browse Recipes", href: "/recipes" },

    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const pathName = usePathname()

    
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    
    const user = session?.user
    // console.log(user);
    // console.log(session);
    
    const handleLogout = async () => {
        await authClient.signOut();
    }
    if (pathName.includes("dashboard")) {
        return null
    }
    if (pathName.includes("user-block")) {
        return null
    }

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

                {/* Mobile Toggle & Brand Logo */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={
                            isMenuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        className="rounded-md p-2 text-foreground hover:bg-muted sm:hidden focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-inherit"
                    >
                        <span className="text-2xl">🍳</span>

                        <span className="text-xl font-extrabold tracking-tight text-orange-600">
                            Recipe
                            <span className="text-foreground">Hub</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden items-center gap-6 sm:flex">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-sm font-medium text-foreground transition-colors hover:text-orange-600"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Action Controls */}
                <div className="flex items-center gap-3">
                    {
                        user ? <>
                            <Dropdown>
                                <Dropdown.Trigger className="rounded-full">
                                    <Avatar>
                                        <Avatar.Image
                                            alt="Junior Garcia"
                                            src={user.image}
                                        />
                                        <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                                    </Avatar>
                                </Dropdown.Trigger>
                                <Dropdown.Popover>
                                    <div className="px-3 pt-3 pb-1">
                                        <div className="flex items-center gap-2">
                                            <Avatar size="sm">
                                                <Avatar.Image
                                                    alt="userImage"
                                                    src={user.image}
                                                />
                                                <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                                            </Avatar>
                                            <div className="flex flex-col gap-0">
                                                <p className="text-sm leading-5 font-medium">{user.name}</p>
                                                <p className="text-xs leading-none text-muted">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Dropdown.Menu>
                                        <Dropdown.Item id="dashboard" textValue="Dashboard">
                                            <Link href={`/dashboard/${user?.role}/overview`}>Dashboard</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item id="profile" textValue="Profile">
                                            <Link href={'/dashboard/user/profile'}>Profile</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                                            <div className="flex w-full items-center justify-between gap-2" onClick={handleLogout}>
                                                <Label >Log Out</Label>
                                                <ArrowRightFromSquare className="size-3.5 text-danger" />
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        </> :
                            <div className="hidden md:flex  gap-2">
                                <Link href="/singin">
                                    <Button
                                        color="warning"
                                        variant="flat"
                                        className="font-semibold text-white bg-orange-500 rounded-md"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/singup">
                                    <Button
                                        color="warning"
                                        variant="flat"
                                        className="font-semibold text-white bg-orange-500 rounded-md"
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                    }
                    
                <ThemeToggle></ThemeToggle>
                </div>
            </header>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="border-t border-border bg-background px-4 pb-4 pt-2 sm:hidden">


                    {/* Mobile Navigation Links */}
                    <ul className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="block w-full py-2 text-base font-medium text-foreground hover:text-orange-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        {/* Mobile Sign In */}
                        {
                            user ? <></> : <li className="pt-2 ">
                            <Link href="/singin" >
                                <Button
                                    onClick={() => setIsMenuOpen(false)}
                                    color="warning"
                                    variant="flat"
                                    className="my-4 w-full font-semibold text-orange-700 bg-orange-100 dark:bg-orange-950/40 dark:text-orange-400"
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/singup" >
                                <Button
                                    onClick={() => setIsMenuOpen(false)}
                                    color="warning"
                                    variant="flat"
                                    className="w-full font-semibold text-orange-700 bg-orange-100 dark:bg-orange-950/40 dark:text-orange-400"
                                >
                                    Sign Up
                                </Button>
                            </Link>

                        </li>
                        }
                    </ul>
                </div>
            )}
        </nav>
    );
}