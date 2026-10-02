import { ArrowLeft, CircleAlert } from "lucide-react";

type PreviewProps = { onBack: () => void };

export function Preview({ onBack }: PreviewProps) {
    return <div className="auth-form pending-form"><div className="pending-icon"><CircleAlert size={24} /></div><h2>Pending review</h2><p className="form-description">Your organization request to join <strong>CyberCorp</strong> is pending review by an administrator.</p><div className="pending-status"><span className="status-dot warning" /><div><span>REQUEST STATUS</span><strong>Awaiting approval</strong></div></div><button type="button" className="button secondary" onClick={onBack}><ArrowLeft size={15} /> Return to personal workspace</button></div>;
}
