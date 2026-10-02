import type { ReactNode } from "react";
import { Logo } from "@/components/brand/logo";

const systemRows = [["LAB RUNNER", "ACTIVE", "healthy"], ["CLOUD COMPUTE", "ACTIVE", "healthy"], ["MODEL SANDBOX", "SECURE", "info"]] as const;

export function AuthShell({ children }: { children: ReactNode }) {
    return <main className="auth-shell"><section className="brand-panel"><div><p className="eyebrow">SECURITY LAB PLATFORM / 01</p><Logo /><p className="brand-copy">Learn to secure language models through hands-on labs, guided attack paths, and controlled experimentation.</p></div><div className="brand-mark" aria-hidden="true"><span>LL</span><span className="brand-mark-line" /><span>MENTOR</span></div><div className="status-card"><div className="status-card-title"><span className="status-dot healthy" /> Platform Status</div>{systemRows.map(([label, status, tone]) => <div className="status-row" key={label}><span>{label}</span><span className={`status-value ${tone}`}>{status}</span></div>)}</div></section><section className="form-panel"><div className="form-wrap"><div className="form-header"><p className="eyebrow">AUTHENTICATION REQUIRED</p><div className="security-badge">SECURE CHANNEL / TLS 1.3</div></div>{children}</div><footer><span>HELP CENTER</span><span>SECURITY POLICY</span><span>STATUS: ALL SYSTEMS NOMINAL</span></footer></section></main>;
}
