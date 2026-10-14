import { FaCreditCard, FaDesktop, FaExchangeAlt, FaGlobe, FaPlug, FaServer, FaUserShield, FaUsers } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { ArrowDown, Canvas, Chip, FanOut, Frame, Node, Notes } from "./primitives";

const coreServices = [
  { title: "Client Service", subtitle: "client API · discount logic", icon: <FaUsers /> },
  { title: "Transaction Consumer", subtitle: "lifecycle · ledger · balances", icon: <FaExchangeAlt /> },
  { title: "Integration Service", subtitle: "3rd-party orchestration", icon: <FaPlug /> },
  { title: "Payment Service", subtitle: "making payments only", icon: <FaCreditCard /> },
  { title: "Admin Service", subtitle: "backoffice · config", icon: <FaUserShield /> },
];

const mysql = (owner: string) => (
  <Node icon={<SiMysql />} title="MySQL" subtitle={`${owner} DB`} tone="emerald" className="w-full justify-center" />
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
