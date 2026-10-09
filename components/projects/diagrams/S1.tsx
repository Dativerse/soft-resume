import { FaBalanceScale, FaBell, FaClock, FaCreditCard, FaDesktop, FaGlobe, FaPlug, FaServer, FaUserShield, FaUsers } from "react-icons/fa";
import { SiApachekafka, SiMysql } from "react-icons/si";
import { ArrowDown, ArrowRight, Canvas, Chip, FanOut, Frame, Node, Notes } from "./primitives";

const coreServices = [
  { title: "Client Service", subtitle: "transactions · discount logic", icon: <FaUsers /> },
  { title: "Integration Service", subtitle: "3rd-party orchestration", icon: <FaPlug /> },
  { title: "Payment Service", subtitle: "ledger · balances", icon: <FaCreditCard /> },
  { title: "Admin Service", subtitle: "backoffice · config", icon: <FaUserShield /> },
  { title: "Notification Service", subtitle: "push · email · SMS", icon: <FaBell /> },
];

const mysql = (owner: string) => (
  <Node icon={<SiMysql />} title="MySQL" subtitle={`${owner} DB`} tone="emerald" className="w-full justify-center" />
);

const kafka = (subtitle: string) => (
  <Node icon={<SiApachekafka />} title="Kafka" subtitle={subtitle} tone="amber" className="w-full justify-center" />
);

export function ServiceMap() {
  return (
    <Canvas>
      <div className="grid w-full grid-cols-2 gap-2 sm:gap-3">
        <Node icon={<FaDesktop />} title="Client App" subtitle="customer-facing" className="justify-center" />
        <Node icon={<FaUserShield />} title="Admin App" subtitle="backoffice users" className="justify-center" />
      </div>
      <ArrowDown label="HTTPS" />
      <Frame label="S1 · true microservices · database per service" tone="blue">
        <FanOut>
          {coreServices.map((s) => (
            <div key={s.title} className="flex flex-col items-center">
              <Node icon={s.icon} title={s.title} subtitle={s.subtitle} tone="violet" className="w-full justify-center" />
              <ArrowDown />
              {mysql(s.title.split(" ")[0])}
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
          "Each service owns exactly one MySQL database — no shared tables, no cross-service joins",
          "Every service can be built, shipped and scaled as its own product",
          "Services talk through APIs and events, never through each other's data",
        ]}
      />
    </Canvas>
  );
}

function Satellites({ hub, tone, adapters }: { hub: string; tone: "violet" | "cyan"; adapters: string[] }) {
  return (
    <Frame label={`${hub} · core + adapters`} tone="neutral">
      <div className="flex flex-col items-center">
        <Node icon={<FaServer />} title={hub} subtitle="business rules · one contract" tone={tone} />
        <FanOut>
          {adapters.map((a) => (
            <div key={a} className="flex flex-col items-center">
              <Node icon={<FaPlug />} title={a} subtitle="adapter service" className="w-full justify-center" />
              <ArrowDown />
              <Node icon={<FaGlobe />} title="3rd-party" subtitle="external API" tone="rose" className="w-full justify-center" />
            </div>
          ))}
        </FanOut>
      </div>
    </Frame>
  );
}

export function ThirdPartyAdapters() {
  return (
    <Canvas>
      <div className="grid w-full gap-6 lg:grid-cols-2">
        <Satellites hub="Integration Service" tone="violet" adapters={["Provider A", "Provider B", "…"]} />
        <Satellites hub="Payment Service" tone="cyan" adapters={["Gateway A", "Gateway B", "…"]} />
      </div>
      <Notes
        kind="pro"
        items={[
          "Each 3rd-party gets its own small service, so one vendor's quirks stay out of the core",
          "Adding or swapping a provider = deploy a new adapter, core service untouched",
          "A failing provider is isolated — other adapters keep serving traffic",
        ]}
      />
    </Canvas>
  );
}

/** Shared entry: client submits, Client Service applies discount and hands off to Kafka. */
function Submit({ kind }: { kind: string }) {
  return (
    <>
      <Node icon={<FaDesktop />} title="Client App" subtitle={`creates ${kind} transaction`} />
      <ArrowDown label="POST /transactions" />
      <div className="flex items-center">
        <Node icon={<FaUsers />} title="Client Service" subtitle="apply discount · save as PENDING" tone="violet" />
        <ArrowRight label="202 Accepted" />
        <Chip>result pushed later</Chip>
      </div>
      <ArrowDown label={`publish transaction.requested · type=${kind}`} />
      {kafka("transaction topics")}
      <ArrowDown label="consume" />
    </>
  );
}

function Consumers({ event }: { event: string }) {
  return (
    <>
      {kafka(event)}
      <FanOut labels={["consume", "consume", "consume"]}>
        {[
          <Node key="client" icon={<FaUsers />} title="Client Service" subtitle="update status" tone="violet" className="justify-center" />,
          <Node key="admin" icon={<FaUserShield />} title="Admin Service" subtitle="reporting · reconciliation" tone="violet" className="justify-center" />,
          <Node key="notify" icon={<FaBell />} title="Notification Service" subtitle="push / email → Client App" tone="violet" className="justify-center" />,
        ]}
      </FanOut>
    </>
  );
}

export function InstantTransaction() {
  return (
    <Canvas>
      <Submit kind="instant" />
      <Node icon={<FaCreditCard />} title="Payment Service" subtitle="debit balance + ledger entry · one DB tx" tone="cyan" />
      <ArrowDown />
      <div className="flex items-center">
        <Node icon={<FaPlug />} title="Payment adapter" subtitle="vendor-specific call" />
        <ArrowRight label="seconds" />
        <Node icon={<FaGlobe />} title="3rd-party" subtitle="final answer in response" tone="rose" />
      </div>
      <ArrowDown label="success → keep · failure → reverse debit" />
      <Consumers event="transaction.completed / failed" />
      <Notes
        kind="pro"
        items={[
          "PENDING → SUCCESS / FAILED within seconds, in one pass through the pipeline",
          "Balance and ledger change in the same MySQL transaction — never out of sync",
          "Idempotency key per transaction, so a re-delivered Kafka message can't charge twice",
        ]}
      />
    </Canvas>
  );
}

export function DeferredSettlement() {
  return (
    <Canvas>
      <Submit kind="deferred" />
      <Node icon={<FaCreditCard />} title="Payment Service" subtitle="hold amount · available → held" tone="cyan" />
      <ArrowDown />
      <div className="flex items-center">
        <Node icon={<FaPlug />} title="Payment adapter" subtitle="submit for settlement" />
        <ArrowRight label="accepted · ref id" />
        <Node icon={<FaGlobe />} title="3rd-party" subtitle="settles in hours / days" tone="rose" />
      </div>
      <ArrowDown label="publish transaction.processing" />
      <Chip>status: PROCESSING · client notified</Chip>
      <ArrowDown label="… hours / days later …" />
      <div className="grid w-full grid-cols-2 gap-2 sm:gap-3">
        <Node icon={<FaGlobe />} title="Settlement webhook" subtitle="3rd-party pushes result" tone="rose" className="justify-center" />
        <Node icon={<FaServer />} title="Reconciliation flow" subtitle="fetch + compare · catches missed webhooks (03)" className="justify-center" />
      </div>
      <ArrowDown />
      <Node icon={<FaCreditCard />} title="Payment Service" subtitle="settled → capture hold · failed → release hold" tone="cyan" />
      <ArrowDown />
      <Consumers event="transaction.settled / failed" />
      <Notes
        kind="pro"
        items={[
          "Funds are held, not spent, so the balance can't be double-used while waiting",
          "Webhook + scheduled reconciliation: a lost callback can't leave money stuck in held",
          "Long waits live in the Payment DB, not in an open request or a Kafka consumer",
        ]}
      />
    </Canvas>
  );
}

export function Reconciliation() {
  return (
    <Canvas>
      <Node icon={<FaClock />} title="Scheduler" subtitle="per provider · per time window" />
      <ArrowDown label="publish reconcile.requested { provider, from, to }" />
      {kafka("reconciliation topics")}
      <FanOut labels={["consume", "consume", "consume"]}>
        {["Provider A", "Gateway A", "…"].map((a) => (
          <div key={a} className="flex flex-col items-center">
            <Node icon={<FaPlug />} title={`${a} adapter`} subtitle="GET /transactions · paged" className="w-full justify-center" />
            <ArrowDown />
            <Node icon={<FaGlobe />} title="3rd-party" subtitle="their record" tone="rose" className="w-full justify-center" />
          </div>
        ))}
      </FanOut>
      <ArrowDown label="publish 3rdparty.transactions.fetched · one msg per page" />
      {kafka("normalized to one contract")}
      <ArrowDown label="consume" />
      <Frame label="Owning service · Payment / Integration" tone="cyan">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <Node icon={<FaBalanceScale />} title="Compare by ref id" subtitle="amount · currency · status" tone="cyan" />
            <ArrowRight label="read" />
            <Node icon={<SiMysql />} title="MySQL" subtitle="our ledger" tone="emerald" />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            <Chip tone="emerald">matched</Chip>
            <Chip tone="amber">status behind → auto-fix (capture / release)</Chip>
            <Chip tone="rose">amount mismatch</Chip>
            <Chip tone="rose">missing on one side</Chip>
          </div>
        </div>
      </Frame>
      <ArrowDown label="publish reconciliation.mismatch" />
      {kafka("mismatch events")}
      <FanOut labels={["consume", "consume"]}>
        {[
          <Node key="admin" icon={<FaUserShield />} title="Admin Service" subtitle="review queue · manual resolve" tone="violet" className="justify-center" />,
          <Node key="notify" icon={<FaBell />} title="Notification Service" subtitle="alert ops team" tone="violet" className="justify-center" />,
        ]}
      </FanOut>
      <Notes
        kind="pro"
        items={[
          "3rd-party is the external truth — every transaction is checked against their API, not just their webhooks",
          "Fetching is split into page-sized messages, so large windows retry per page instead of all over",
          "Known gaps fix themselves; only real mismatches reach a human in Admin",
        ]}
      />
    </Canvas>
  );
}
