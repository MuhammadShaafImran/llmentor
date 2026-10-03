import type { ReactNode } from "react";

export function DataSection({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
    return <section className="data-section"><div className="section-heading"><h2>{title}</h2>{action}</div>{children}</section>;
}
