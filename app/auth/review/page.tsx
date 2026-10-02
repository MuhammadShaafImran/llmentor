"use client";

import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Preview } from "@/components/auth/preview";

export default function ReviewPage() {
    const router = useRouter();
    return <AuthShell><Preview onBack={() => router.push("/signin")} /></AuthShell>;
}
