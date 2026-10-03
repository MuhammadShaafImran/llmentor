"use client";

import { Bell, BookOpen, Boxes, ChevronRight, CircleHelp, Download, FileText, LayoutDashboard, Menu, Plus, Search, Shield, Upload, Users } from "lucide-react";
import { useState } from "react";
import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs";
import { Logo } from "@/components/brand/logo";
import { DataSection } from "@/components/home/data-section";
import { TeamPanel } from "@/components/home/team-panel";

export function Dashboard() {
    const [activeNav, setActiveNav] = useState("Team");
    const [notice, setNotice] = useState("");
    const [inviteOpen, setInviteOpen] = useState(false);
    const { membership, memberships, invitations } = useOrganization({ memberships: true, invitations: true });
    const navItems = [["Dashboard", LayoutDashboard], ["Threat Logs", Shield], ["Model Inventory", Boxes], ["Policies", FileText], ["Team", Users]] as const;
    const canInvite = membership?.role === "org:admin";
    const memberCount = memberships?.count != null ? String(memberships.count) : "—";
    const invitationCount = invitations?.count != null ? String(invitations.count) : "—";
    const myRole = membership?.roleName ?? "—";
    return <main className="dashboard-shell"><aside className="dashboard-sidebar"><div className="workspace-brand"><Logo compact /><div><strong>LLMentor</strong><span>Enterprise Tier</span></div></div><nav>{navItems.map(([label, Icon]) => <button key={label} className={activeNav === label ? "active" : ""} onClick={() => setActiveNav(label)}><Icon size={15} />{label}</button>)}</nav><div className="sidebar-bottom"><button><BookOpen size={15} />Documentation</button><button><CircleHelp size={15} />Support</button></div></aside><section className="dashboard-content"><header className="dashboard-header"><button className="mobile-menu"><Menu size={18} /></button><h1>{activeNav}</h1><div className="org-switch"><OrganizationSwitcher /></div><div className="header-actions"><div className="search-box"><Search size={15} /><input placeholder="Search members, roles..." /></div>{canInvite && <button className="invite-button" onClick={() => setInviteOpen((open) => !open)}><Plus size={15} /> Invite Member</button>}<button className="icon-button"><Bell size={16} /></button><div className="avatar"><UserButton /></div></div></header><div className="dashboard-main">{notice && <div className="dashboard-notice">{notice}</div>}<div className="metrics-grid"><Metric label="TOTAL MEMBERS" value={memberCount} detail="" tone="green" icon={<Users size={15} />} /><Metric label="PENDING INVITATIONS" value={invitationCount} detail="" tone="orange" icon={<CircleHelp size={15} />} /><Metric label="YOUR ROLE" value={myRole} detail="" tone="blue" icon={<Shield size={15} />} /></div><div className="dashboard-columns"><div><TeamPanel canInvite={canInvite} inviteOpen={inviteOpen} onCloseInvite={() => setInviteOpen(false)} /></div><aside className="quick-column"><DataSection title="Quick Actions"><button className="quick-action">Manage Roles & Permissions <ChevronRight size={16} /></button><button className="quick-action" onClick={() => setNotice("Bulk import panel opened in mock mode.")}>Bulk Import Users <Upload size={15} /></button><button className="quick-action" onClick={() => setNotice("Audit log export prepared in mock mode.")}>Audit Log Export <Download size={15} /></button></DataSection><div className="sentinel-card"><h3>Sentinel Secure v4.2</h3><p>Last updated: 2 hours ago. All defense matrices are currently active and nominal.</p><div><span>NODE_COUNT</span><b>24</b></div><div><span>AVG_LATENCY</span><b>42ms</b></div><div><span>DB_SYNC</span><b className="sync-ok">OK</b></div></div></aside></div></div></section></main>;
}

function Metric({ label, value, detail, tone, icon }: { label: string; value: string; detail: string; tone: string; icon: React.ReactNode }) { return <div className={`metric-card ${tone}`}><div className="metric-label">{label}<span>{icon}</span></div><strong>{value}</strong>{detail && <em>{detail}</em>}<div className="metric-bars"><i /><i /><i /><i /><i /><i /></div></div>; }
