"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/components/auth/login";
import { AuthShell } from "@/components/auth/auth-shell";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); router.push(`/auth/verification?email=${encodeURIComponent(email)}`); };
    return <AuthShell><Login email={email} setEmail={setEmail} message={message} setMessage={setMessage} onSubmit={handleSubmit} onSignup={() => router.push("/signup")} /></AuthShell>;
}
