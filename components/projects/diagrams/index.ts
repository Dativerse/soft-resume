import type { ComponentType } from "react";
import * as Cashquora from "./Cashquora";
import { DataLayer, GatewayArchitecture, GatewayRouting, LegacyMonolith } from "./LicenseeAdminPortal";
import { DeferredSettlement, InstantTransaction, Reconciliation, ServiceMap, ThirdPartyAdapters } from "./S1";

export interface ProjectDiagram {
  title: string;
  Diagram: ComponentType;
}

export interface DiagramTab {
  label: string;
  diagrams: ProjectDiagram[];
}

/** Architecture diagrams for project detail pages, keyed by slug and grouped into tabs. */
const projectDiagrams: Record<string, DiagramTab[]> = {
  cashquora: [
    {
      label: "Software Architecture",
      diagrams: [
        { title: "01 · API Hubs over Core Services — One PostgreSQL Database per Service", Diagram: Cashquora.ServiceMap },
      ],
    },
    {
      label: "Transaction Flow",
      diagrams: [{ title: "01 · Asynchronous Transactions via Kafka", Diagram: Cashquora.TransactionFlow }],
    },
  ],
  s1: [
    {
      label: "Software Architecture",
      diagrams: [
        { title: "01 · Core Services — One MySQL Database per Service", Diagram: ServiceMap },
        { title: "02 · 3rd-Party Adapters around Integration + Payment", Diagram: ThirdPartyAdapters },
      ],
    },
    {
      label: "Transaction Flow",
      diagrams: [
        { title: "01 · Instant Transaction", Diagram: InstantTransaction },
        { title: "02 · Long-Settlement Transaction — Hold, then Capture / Release", Diagram: DeferredSettlement },
        { title: "03 · Reconciliation — Fetch & Compare 3rd-party Transactions", Diagram: Reconciliation },
      ],
    },
  ],
  "licensee-admin-portal": [
    {
      label: "Software Architecture",
      diagrams: [
        { title: "01 · Before — Legacy Backoffice Monolith", Diagram: LegacyMonolith },
        { title: "02 · After — Gateway + React SPA + Services (SOA)", Diagram: GatewayArchitecture },
        { title: "03 · Gateway Request Routing", Diagram: GatewayRouting },
      ],
    },
    {
      label: "Database Flow",
      diagrams: [{ title: "01 · Stored Procedures + Synced Source", Diagram: DataLayer }],
    },
  ],
};

export function findProjectDiagrams(slug: string): DiagramTab[] {
  return projectDiagrams[slug] ?? [];
}
