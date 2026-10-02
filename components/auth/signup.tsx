import type { FormEvent } from "react";

type AccountType = "individual" | "organization";

type SignupProps = {
    email: string;
    setEmail: (value: string) => void;
    accountType: AccountType;
    setAccountType: (value: AccountType) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onLogin: () => void;
};

export function Signup({ email, setEmail, accountType, setAccountType, onSubmit, onLogin }: SignupProps) {
    return <form className="auth-form" onSubmit={onSubmit}><h2>Deploy your account</h2><p className="form-description">Create a controlled workspace for secure model experimentation.</p><div className="field-group"><label>ACCOUNT TYPE</label><div className="account-switch"><button type="button" className={accountType === "individual" ? "active" : ""} onClick={() => setAccountType("individual")}>Student / Individual</button><button type="button" className={accountType === "organization" ? "active" : ""} onClick={() => setAccountType("organization")}>Academic / Enterprise</button></div></div><div className="field-group"><label htmlFor="signup-email">EMAIL ADDRESS</label><input id="signup-email" className="text-input" type="email" required placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} /></div><div className="field-group"><label htmlFor="signup-password">MASTER PASSWORD</label><input id="signup-password" className="text-input" type="password" required placeholder="Create a strong password" defaultValue="mentor-demo" /></div><label className="consent"><input type="checkbox" defaultChecked required /> <span>I acknowledge the <u>Terms of Service</u> and <u>Data Processing Agreement</u>.</span></label><p className="form-note">{accountType === "organization" ? "Organization accounts require administrator approval." : "We will verify your identity with a one-time code."}</p><button className="button primary" type="submit">DEPLOY ACCOUNT <span>-&gt;</span></button><p className="switch-copy">Already have a workspace? <button type="button" className="link-button" onClick={onLogin}>Authenticate here</button></p></form>;
}
