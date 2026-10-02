import { ArrowLeft, Check, ShieldCheck } from "lucide-react";

type VerificationProps = { otp: string[]; updateOtp: (index: number, value: string) => void; email: string; onSubmit: () => void; onBack: () => void };

export function Verification({ otp, updateOtp, email, onSubmit, onBack }: VerificationProps) {
    return <div className="auth-form verify-form"><div className="verify-icon"><ShieldCheck size={25} /></div><h2>Verify identity</h2><p className="form-description">A six-digit code was sent to <strong>{email}</strong>. Enter it below to continue.</p><div className="otp-grid">{otp.map((digit, index) => <input key={index} aria-label={`Verification digit ${index + 1}`} value={digit} onChange={(event) => updateOtp(index, event.target.value)} inputMode="numeric" maxLength={1} />)}</div><button className="button primary" type="button" onClick={onSubmit}><Check size={15} /> VERIFY IDENTITY <span>-&gt;</span></button><div className="verify-meta"><span>CODE EXPIRES IN 09:42</span><button type="button" className="text-button">RESEND CODE</button></div><div className="terminal"><span>&gt; INIT auth_sequence... OK</span><span>&gt; AWAITING token_verification...</span></div><button type="button" className="back-button" onClick={onBack}><ArrowLeft size={13} /> Return to authentication</button></div>;
}
