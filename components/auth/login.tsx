import { Code2, KeyRound } from "lucide-react";
import type { FormEvent } from "react";

type LoginProps = {
    email: string;
    setEmail: (value: string) => void;
    message: string;
    setMessage: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onSignup: () => void;
};

export function Login({ email, setEmail, message, setMessage, onSubmit, onSignup }: LoginProps) {
    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <h2>Authenticate</h2>
            <p className="form-description">Access your personal workspace or organization lab.</p>
            <div className="field-group"><label htmlFor="email">EMAIL ADDRESS</label><input id="email" className="text-input" type="email" required placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} /></div>
            <div className="field-meta"><label htmlFor="password">PASSWORD</label><button type="button" className="text-button" onClick={() => setMessage("Password reset link queued for the mock account.")}>Forgot password?</button></div>
            <div className="password-wrap"><input id="password" className="text-input" type="password" placeholder="Enter your password" defaultValue="mentor-demo" /><KeyRound size={15} /></div>
            {message && <p className="inline-message">{message}</p>}
            <button className="button primary" type="submit">SECURE LOGIN <span>-&gt;</span></button>
            <div className="divider"><span>OR CONTINUE WITH</span></div>
            <div className="social-grid"><button type="button" className="button secondary"><span className="social-icon">G</span> Google</button><button type="button" className="button secondary"><Code2 size={14} /> GitHub</button></div>
            <p className="switch-copy">No authorized access yet? <button type="button" className="link-button" onClick={onSignup}>Deploy an account</button></p>
        </form>
    );
}
