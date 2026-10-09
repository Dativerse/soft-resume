import type { ReactNode } from "react";
import { FaBell, FaDesktop, FaGlobe, FaIdCard, FaMoneyCheckAlt, FaServer, FaUserShield, FaWallet } from "react-icons/fa";
import { SiApachekafka, SiPostgresql } from "react-icons/si";
import { ArrowDown, ArrowRight, Canvas, Chip, FanOut, Frame, Node, Notes } from "./primitives";

const hubs: { caller: ReactNode; title: string; subtitle: string }[] = [
  {
    caller: <Node icon={<FaDesktop />} title="Client App" subtitle="customer-facing" className="w-full justify-center" />,
    title: "External API Hub",
    subtitle: "client APIs · business logic",
  },
  {
    caller: <Node icon={<FaUserShield />} title="Admin App" subtitle="backoffice users" className="w-full justify-center" />,
    title: "Internal API Hub",
    subtitle: "admin APIs · business logic",
  },
  {
    caller: (
      <div className="flex w-full flex-col items-center gap-1.5">
        <Node icon={<FaGlobe />} title="3rd-party Platforms" subtitle="settlement · callbacks" tone="rose" className="w-full justify-center" />
        <Chip>test client: Mock Platform Portal</Chip>
      </div>
    ),
    title: "Platform API Hub",
    subtitle: "platform APIs · settlement",
  },
];

const coreServices = [
  { title: "Account Service", subtitle: "account management", icon: <FaIdCard /> },
  { title: "Wallet Service", subtitle: "user balances · transactions", icon: <FaWallet /> },
  { title: "Payment Service", subtitle: "payment provider integration", icon: <FaMoneyCheckAlt /> },
  { title: "Notification Service", subtitle: "push · email · SMS", icon: <FaBell /> },
];

const postgres = (owner: string) => (
  <Node icon={<SiPostgresql />} title="PostgreSQL" subtitle={`${owner} DB`} tone="emerald" className="w-full justify-center" />
);

const kafka = (subtitle: string) => (
  <Node icon={<SiApachekafka />} title="Kafka" subtitle={subtitle} tone="amber" className="w-full justify-center" />
);

export function ServiceMap() {
  return (
    <Canvas>
      <div className="grid w-full grid-cols-3 gap-2 sm:gap-3">
        {hubs.map((h) => (
          <div key={h.title} className="flex flex-col items-center">
            {h.caller}
            <ArrowDown label="HTTPS" />
            <Node icon={<FaServer />} title={h.title} subtitle={h.subtitle} tone="cyan" className="w-full justify-center" />
          </div>
        ))}
      </div>
      <ArrowDown label="APIs · events" />
      <Frame label="Cashquora core services · database per service" tone="blue">
        <FanOut>
          {coreServices.map((s) => (
            <div key={s.title} className="flex flex-col items-center">
              <Node icon={s.icon} title={s.title} subtitle={s.subtitle} tone="violet" className="w-full justify-center" />
              <ArrowDown />
              {postgres(s.title.replace(/ Service$/, ""))}
            </div>
          ))}
        </FanOut>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          <Chip tone="blue">own codebase</Chip>
          <Chip tone="blue">own schema</Chip>
          <Chip tone="blue">own deploy pipeline</Chip>
        </div>
      </Frame>
      <Notes
        kind="pro"
        items={[
          "One API hub per audience — clients, admins and 3rd-party platforms never share an entry point",
          "Hubs hold the business logic; core services stay generic and reusable across all of them",
          "Each core service owns exactly one PostgreSQL database — no shared tables, no cross-service joins",
        ]}
      />
    </Canvas>
  );
}

export function TransactionFlow() {
  return (
    <Canvas>
      <Node icon={<FaDesktop />} title="Client App" subtitle="submits transaction" />
      <ArrowDown label="POST /transactions" />
      <div className="flex items-center">
        <Node icon={<FaServer />} title="External API Hub" subtitle="validate · apply fees · FX" tone="cyan" />
        <ArrowRight label="202 Accepted" />
        <Chip>result pushed later</Chip>
      </div>
      <ArrowDown />
      <Node icon={<FaWallet />} title="Wallet Service" subtitle="hold funds · save as PENDING" tone="violet" />
      <ArrowDown label="publish transaction.requested" />
      {kafka("transaction topics")}
      <ArrowDown label="consume" />
      <div className="flex items-center">
        <Node icon={<FaMoneyCheckAlt />} title="Payment Service" subtitle="call provider by country · currency" tone="violet" />
        <ArrowRight />
        <Node icon={<FaGlobe />} title="3rd-party Platform" subtitle="async settlement" tone="rose" />
      </div>
      <ArrowDown label="settlement callback" />
      <Node icon={<FaServer />} title="Platform API Hub" subtitle="verify · route to Payment Service" tone="cyan" />
      <ArrowDown label="Payment Service publishes result" />
      {kafka("transaction.completed / failed")}
      <FanOut labels={["consume", "consume", "consume"]}>
        {[
          <Node key="wallet" icon={<FaWallet />} title="Wallet Service" subtitle="PENDING → SUCCESS / FAILED · settle / release" tone="violet" className="justify-center" />,
          <Node key="admin" icon={<FaServer />} title="Internal API Hub" subtitle="reporting · reconciliation" tone="cyan" className="justify-center" />,
          <Node key="notify" icon={<FaBell />} title="Notification Service" subtitle="push / email → Client App" tone="violet" className="justify-center" />,
        ]}
      </FanOut>
      <Notes
        kind="pro"
        items={[
          "Client side never waits on a 3rd-party — request is accepted, Notification Service pushes the result",
          "Kafka buffers spikes and retries, so slow providers don't block the client",
          "Every state change is an event any service can subscribe to",
        ]}
      />
    </Canvas>
  );
}
