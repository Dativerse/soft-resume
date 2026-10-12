import type { ReactNode } from "react";
import {
  FaBell,
  FaDesktop,
  FaGlobe,
  FaHandshake,
  FaIdCard,
  FaMoneyCheckAlt,
  FaServer,
  FaUserShield,
  FaWallet,
} from "react-icons/fa";
import { SiApachekafka, SiKubernetes, SiPostgresql, SiRedis } from "react-icons/si";
import { ArrowDown, Canvas, Chip, FanOut, Frame, Node, Notes } from "./primitives";

const hubs: { caller: ReactNode; title: string; subtitle: string }[] = [
  {
    caller: <Node icon={<FaDesktop />} title="User Portal" subtitle="React · Vite · i18n" className="w-full justify-center" />,
    title: "External API Hub",
    subtitle: "user APIs · JWT · SSE",
  },
  {
    caller: <Node icon={<FaUserShield />} title="Admin Portal" subtitle="React · Ant Design" className="w-full justify-center" />,
    title: "Internal API Hub",
    subtitle: "admin APIs · permissions · SSE",
  },
  {
    caller: (
      <div className="flex w-full flex-col items-center gap-1.5">
        <Node icon={<FaHandshake />} title="Partner Platforms" subtitle="deposits · withdrawals" tone="rose" className="w-full justify-center" />
        <Chip>+ Platform Portal</Chip>
      </div>
    ),
    title: "Platform API Hub",
    subtitle: "API keys · HMAC webhooks",
  },
];

const coreServices = [
  { title: "Account Service", subtitle: "users · KYC · limits", icon: <FaIdCard /> },
  { title: "Wallet Service", subtitle: "balances · transactions", icon: <FaWallet /> },
  { title: "Payment Service", subtitle: "providers · banks · payouts", icon: <FaMoneyCheckAlt /> },
  { title: "Notification Service", subtitle: "email · SMS · messages", icon: <FaBell /> },
];

const postgres = (owner: string) => (
  <Node icon={<SiPostgresql />} title="PostgreSQL" subtitle={`${owner} DB`} tone="emerald" className="w-full justify-center" />
);

const kafka = (subtitle: string) => (
  <Node icon={<SiApachekafka />} title="Kafka" subtitle={subtitle} tone="amber" className="w-full justify-center" />
);

const providers = (subtitle: string) => (
  <Node icon={<FaGlobe />} title="Payment Providers" subtitle={subtitle} tone="rose" className="justify-center" />
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
      <ArrowDown label="Kafka request / completed events · HTTP for reads" />
      <Frame label="Cashquora core services · .NET 8 · database per service" tone="blue">
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
          <Chip tone="blue">Dapper · no ORM</Chip>
          <Chip tone="blue">own schema</Chip>
          <Chip tone="blue">own Docker image</Chip>
        </div>
      </Frame>
      <ArrowDown label="payin / payout APIs · webhooks" />
      {providers("providers · local banks")}
      <Frame label="Shared infrastructure · AWS ap-southeast-1" tone="neutral" className="mt-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {kafka("events · log shipping")}
          <Node icon={<SiRedis />} title="Redis" subtitle="cache · locks · rate limits" tone="red" className="w-full justify-center" />
          <Node icon={<SiKubernetes />} title="EKS" subtitle="Fargate + Karpenter" tone="yellow" className="w-full justify-center" />
        </div>
      </Frame>
      <Notes
        kind="pro"
        items={[
          "One API hub per audience — users, admins and partner platforms never share an entry point or auth model",
          "State-changing commands flow through Kafka request / completed event pairs; reads use internal HTTP",
          "Each core service owns its own PostgreSQL database — no shared tables, no cross-service joins",
        ]}
      />
    </Canvas>
  );
}
