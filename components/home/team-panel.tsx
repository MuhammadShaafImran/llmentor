"use client";

import { useState, type FormEvent } from "react";
import { useOrganization } from "@clerk/nextjs";
import { DataSection } from "@/components/home/data-section";

type TeamPanelProps = {
    canInvite: boolean;
    inviteOpen: boolean;
    onCloseInvite: () => void;
};

type Feedback = { text: string; tone: "success" | "error" };

const roleLabels: Record<string, string> = {
    "org:admin": "Admin",
    "org:member": "Member",
    "org:billing_member": "Billing",
};

function roleLabel(role: string) {
    return roleLabels[role] ?? role;
}

export function TeamPanel({ canInvite, inviteOpen, onCloseInvite }: TeamPanelProps) {
    const { isLoaded, organization, memberships, invitations } = useOrganization({ memberships: true, invitations: true });
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("org:member");
    const [sending, setSending] = useState(false);
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    const members = memberships?.data ?? [];
    const pendingInvitations = invitations?.data ?? [];

    async function handleInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!organization) return;
        const address = email.trim();
        setSending(true);
        setFeedback(null);
        try {
            await organization.inviteMember({ emailAddress: address, role });
            setFeedback({ text: `Invitation sent to ${address}.`, tone: "success" });
            setEmail("");
            await invitations?.revalidate?.();
        } catch (error) {
            setFeedback({ text: error instanceof Error ? error.message : "Could not send the invitation.", tone: "error" });
        } finally {
            setSending(false);
        }
    }

    if (!isLoaded) return <p className="team-note">Loading team...</p>;
    if (!organization) return <p className="team-note">No active organization. Use the organization switcher in the header to create or select one.</p>;

    return <>
        <DataSection title="Pending Invitations">
            {inviteOpen && canInvite && <form className="invite-form" onSubmit={handleInvite}>
                <input type="email" required placeholder="teammate@company.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                    <option value="org:member">Member</option>
                    <option value="org:admin">Admin</option>
                </select>
                <button type="submit" className="table-button" disabled={sending}>{sending ? "Sending..." : "Send invite"}</button>
                <button type="button" className="table-button muted-button" onClick={onCloseInvite}>Close</button>
                {feedback && <p className={`invite-feedback${feedback.tone === "error" ? " is-error" : ""}`}>{feedback.text}</p>}
            </form>}
            <table>
                <thead><tr><th>EMAIL</th><th>ROLE</th><th>SENT</th><th>STATUS</th></tr></thead>
                <tbody>
                    {pendingInvitations.length === 0 && <tr><td colSpan={4}>No pending invitations.</td></tr>}
                    {pendingInvitations.map((invitation) => <tr key={invitation.id}>
                        <td><strong>{invitation.emailAddress}</strong></td>
                        <td><span className="role-tag">{roleLabel(invitation.role)}</span></td>
                        <td>{invitation.createdAt.toLocaleDateString()}</td>
                        <td><span className={`user-status ${invitation.status === "accepted" ? "online" : "offline"}`}>{invitation.status}</span></td>
                    </tr>)}
                </tbody>
            </table>
        </DataSection>
        <DataSection title="Active Organization Users" action={memberships?.hasNextPage ? <button className="export-button" onClick={() => memberships?.fetchNext()}>Load more</button> : undefined}>
            <table>
                <thead><tr><th>NAME / EMAIL</th><th>ROLE</th><th>JOINED</th></tr></thead>
                <tbody>
                    {members.length === 0 && <tr><td colSpan={3}>No members yet.</td></tr>}
                    {members.map((member) => {
                        const fullName = [member.publicUserData?.firstName, member.publicUserData?.lastName].filter(Boolean).join(" ");
                        const name = fullName || member.publicUserData?.identifier || "Unknown member";
                        return <tr key={member.id}>
                            <td><strong>{name}</strong><small>{member.publicUserData?.identifier ?? ""}</small></td>
                            <td><span className="role-tag">{member.roleName}</span></td>
                            <td>{member.createdAt.toLocaleDateString()}</td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </DataSection>
    </>;
}
