"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Signup } from "@/components/auth/signup";

type AccountType = "individual" | "organization";

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState<AccountType>("individual");
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const destination = accountType === "organization" ? "/auth/review" : `/auth/verification?email=${encodeURIComponent(email)}`; router.push(destination); };
    return <AuthShell><Signup email={email} setEmail={setEmail} accountType={accountType} setAccountType={setAccountType} onSubmit={handleSubmit} onLogin={() => router.push("/signin")} /></AuthShell>;
}
