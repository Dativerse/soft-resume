import type { ReactNode } from "react";
import {
  FaBell,
  FaDesktop,
  FaGlobe,
  FaHandshake,
  FaIdCard,
  FaLock,
  FaMoneyCheckAlt,
  FaRedo,
  FaServer,
  FaShieldAlt,
  FaUniversity,
  FaUserShield,
  FaWallet,
} from "react-icons/fa";
import { SiApachekafka, SiKubernetes, SiPostgresql, SiRedis } from "react-icons/si";
import { ArrowDown, ArrowRight, Canvas, Chip, FanOut, Frame, Node, Notes } from "./primitives";

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
  { title: "Risk Service", subtitle: "risk checks", icon: <FaShieldAlt /> },
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
      <ArrowDown label="Kafka · requested / completed events" />
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
          <Node icon={<SiRedis />} title="Redis" subtitle="cache · sessions" tone="red" className="w-full justify-center" />
          <Node icon={<SiKubernetes />} title="EKS" subtitle="Fargate + Karpenter" tone="yellow" className="w-full justify-center" />
        </div>
      </Frame>
      <Notes
        kind="pro"
        items={[
          "One API hub per audience — users, admins and partner platforms never share an entry point or auth model",
          "Hubs talk to core services through Kafka request / completed event pairs, so no service calls another directly",
          "Each core service owns its own PostgreSQL database — no shared tables, no cross-service joins",
        ]}
      />
    </Canvas>
  );
}

export function ProviderRouting() {
  return (
    <Canvas>
      <Node icon={<FaDesktop />} title="User Portal" subtitle="choose currency + payment method" />
      <ArrowDown label="GET payment methods" />
      <Node icon={<FaMoneyCheckAlt />} title="Payment Service" subtitle="pick one provider per method" tone="violet" />
      <ArrowDown />
      <Frame label="Provider selection rules" tone="violet">
        <div className="flex flex-col items-center">
          <Node title="1 · Priority schedule" subtitle="provider groups over a 24h timeline, full coverage required" className="w-full justify-center" />
          <ArrowDown />
          <Node title="2 · Priority order" subtitle="priority ASC, then max amount DESC" className="w-full justify-center" />
          <ArrowDown />
          <Node title="3 · Eligibility" subtitle="active provider · method · amount limits" className="w-full justify-center" />
        </div>
      </Frame>
      <ArrowDown label="best provider per method" />
      <div className="flex items-center">
        {providers("payin / payout")}
        <ArrowRight label="payout fails" />
        <Node icon={<FaRedo />} title="Admin Retry" subtitle="same or another provider" tone="cyan" />
      </div>
      <Notes
        kind="pro"
        items={[
          "Ops move traffic between providers by time of day without a deploy",
          "Users only see payment methods; the provider behind each one is chosen for them",
          "A failed payout is retried, not cancelled — the user never has to file a new withdrawal",
        ]}
      />
    </Canvas>
  );
}

export function PlatformDeposit() {
  return (
    <Canvas>
      <Node icon={<FaHandshake />} title="Partner Platform" subtitle="player starts a deposit" tone="rose" />
      <ArrowDown label="POST /client-platforms/deposits" />
      <div className="flex items-center">
        <Node icon={<FaServer />} title="Platform API Hub" subtitle="save as pending_user_claim" tone="cyan" />
        <ArrowRight label="portalUrl + token" />
        <Chip>unclaimed after 30 min → removed</Chip>
      </div>
      <ArrowDown label="redirect with transactionToken" />
      <Node icon={<FaDesktop />} title="User Portal" subtitle={'log in · confirm "credit to {username}?"'} />
      <FanOut labels={["bank transfer", "online banking · e-wallet"]}>
        {[
          <Node key="bank" icon={<FaUniversity />} title="Company Bank Account" subtitle="receipt upload → admin approves" className="justify-center" />,
          <Node key="provider" icon={<FaGlobe />} title="Payment Provider" subtitle="provider webhook → Payment Service" tone="rose" className="justify-center" />,
        ]}
      </FanOut>
      <ArrowDown label="Kafka · deposit approved" />
      <Node icon={<FaWallet />} title="Wallet Service" subtitle="credit balance · write history" tone="violet" />
      <FanOut labels={["HMAC-SHA256 webhook", "SSE"]}>
        {[
          <Node key="platform" icon={<FaHandshake />} title="Partner Platform" subtitle="DEPOSIT_APPROVED / REJECTED" tone="rose" className="justify-center" />,
          <Node key="user" icon={<FaDesktop />} title="User Portal" subtitle="live balance update" className="justify-center" />,
        ]}
      </FanOut>
      <Notes
        kind="pro"
        items={[
          "Stateless: partners create a transaction per request — no account linking or user pre-registration",
          "The user explicitly confirms the platform username before any money moves",
          "Signed webhooks let partners verify every callback came from Cashquora",
        ]}
      />
    </Canvas>
  );
}

export function AdminPayout() {
  return (
    <Canvas>
      <Node icon={<FaUserShield />} title="Admin Portal" subtitle="approve withdrawal · pick provider" />
      <ArrowDown label="POST /admin/transactions/{id}/payout" />
      <Node icon={<FaServer />} title="Internal API Hub" subtitle="publish request · wait up to 60 s" tone="cyan" />
      <ArrowDown label="admin-transaction-approval-requested" />
      {kafka("request / completed topics")}
      <ArrowDown />
      <div className="flex items-center">
        <Node icon={<FaMoneyCheckAlt />} title="Payment Service" subtitle="reject if already in progress" tone="violet" />
        <ArrowRight label="payout API" />
        <Node icon={<FaGlobe />} title="Provider" subtitle="local provider · bank" tone="rose" />
      </div>
      <ArrowDown label="wallet-transaction-approval-requested" />
      <Node icon={<FaWallet />} title="Wallet Service" subtitle="record PROVIDER_INITIATED" tone="violet" />
      <ArrowDown label="…-completed events back up the chain" />
      <Node icon={<FaServer />} title="Internal API Hub" subtitle="answer the waiting HTTP request" tone="cyan" />
      <Frame label="Later · asynchronous" tone="rose" className="mt-8">
        <div className="flex flex-col items-center">
          <Node icon={<FaGlobe />} title="Provider Webhook" subtitle="payout succeeded / failed" tone="rose" />
          <ArrowDown />
          <Node icon={<FaMoneyCheckAlt />} title="Payment Service" subtitle="verify · map status" tone="violet" />
          <ArrowDown label="callback-received event" />
          <Node icon={<FaWallet />} title="Wallet Service" subtitle="COMPLETED · or ERROR → admin can retry" tone="violet" />
        </div>
      </Frame>
      <Notes
        kind="pro"
        items={[
          "Request / completed event pairs give the admin a synchronous answer over an asynchronous backbone",
          "Payment Service checks existing attempts first, so a double click can't pay out twice",
          "Every provider attempt lands in the transaction timeline for audit",
        ]}
      />
    </Canvas>
  );
}

export function WalletConsistency() {
  return (
    <Canvas>
      <div className="grid w-full grid-cols-2 gap-2 sm:gap-3">
        <Node icon={<FaUniversity />} title="Deposit Callback" subtitle="credit" className="justify-center" />
        <Node icon={<FaDesktop />} title="Withdrawal Request" subtitle="debit · same wallet" className="justify-center" />
      </div>
      <ArrowDown label="concurrent Kafka events" />
      <Frame label="Wallet Service · one DB transaction" tone="violet">
        <div className="flex flex-col items-center">
          <Node icon={<FaLock />} title="SELECT … FOR UPDATE" subtitle="lock the wallet row on withdrawals" className="w-full justify-center" />
          <ArrowDown />
          <Node title="UPDATE wallets … WHERE version = @Version" subtitle="balance check in the same statement" className="w-full justify-center" />
          <ArrowDown />
          <Node title="Insert transaction + history" subtitle="commit or roll back together" className="w-full justify-center" />
        </div>
      </Frame>
      <ArrowDown label="version conflict → retry with backoff" />
      {postgres("Wallet")}
      <Notes
        kind="pro"
        items={[
          "No lost deposit updates — a stale read fails its version check and retries",
          "No double withdrawals — the balance check and the debit are one atomic statement",
          "Daily limits and pending amounts move in the same transaction as the balance",
        ]}
      />
    </Canvas>
  );
}
