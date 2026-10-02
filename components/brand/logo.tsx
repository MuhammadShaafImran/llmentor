import Image from "next/image";
import logo from "@/public/logo.png";

type LogoProps = { compact?: boolean; className?: string };

export function Logo({ compact = false, className = "" }: LogoProps) {
    return <div className={`brand-logo ${compact ? "brand-logo-compact" : ""} ${className}`}><Image src={logo} alt="LLMentor logo" priority width={compact ? 38 : 168} height={compact ? 38 : 168} /><span>LLMentor</span></div>;
}
