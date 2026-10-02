"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Verification } from "@/components/auth/verification";

export default function VerificationPage() {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const email = "student@llmentor.dev";
    const updateOtp = (index: number, value: string) => { const nextOtp = [...otp]; nextOtp[index] = value.replace(/\D/g, "").slice(-1); setOtp(nextOtp); };
    return <AuthShell><Verification otp={otp} updateOtp={updateOtp} email={email} onSubmit={() => router.push("/home")} onBack={() => router.push("/signin")} /></AuthShell>;
}
