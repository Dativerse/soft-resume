import {
  FaBoxOpen,
  FaClipboardList,
  FaCogs,
  FaDatabase,
  FaDesktop,
  FaLock,
  FaRoute,
  FaServer,
  FaSignInAlt,
  FaTable,
  FaUsers,
} from "react-icons/fa";
import { SiAngular, SiDotnet, SiJquery, SiReact } from "react-icons/si";
import { ArrowDown, ArrowRight, ArrowUp, Canvas, Chip, FanOut, Frame, Node, Notes } from "./primitives";

const browser = <Node icon={<FaDesktop />} title="Admin Browser" subtitle="backoffice users" />;
const database = (className = "") => (
  <Node
    icon={<FaDatabase />}
    title="SQL Server"
    subtitle="stored procedures · synced from product"
    className={`justify-center ${className}`}
  />
);

export function LegacyMonolith() {
  return (
    <Canvas>
      {browser}
      <ArrowDown />
      <Frame label="Licensee Admin Portal · ASP.NET 4.5 · one deployable" tone="rose">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <Chip>
            <SiDotnet /> Controller
          </Chip>
          <ArrowRight />
          <Chip>return View( custom page + inline &lt;script&gt; )</Chip>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          <Node icon={<SiJquery />} title="Page A" subtitle="jQuery" tone="yellow" />
          <Node icon={<SiAngular />} title="Page B" subtitle="AngularJS" tone="red" />
          <Node icon={<SiReact />} title="Page C" subtitle="React" tone="cyan" />
        </div>

        <div className="mt-3 rounded-lg border border-gray-700 bg-gray-900 p-3">
          <div className="text-xs sm:text-sm font-semibold text-gray-100">
            Business logic + data access <span className="font-normal text-gray-400">· all domains, one codebase</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Licenses", "Licensees", "Billing", "Reports", "Users", "…"].map((d) => (
              <Chip key={d}>{d}</Chip>
            ))}
          </div>
        </div>
      </Frame>
      <ArrowDown />
      {database()}
      <Notes
        kind="con"
        items={[
          "3 frontend frameworks shipped side by side, per page",
          "Every change = rebuild + redeploy the whole monolith",
          "Domains tightly coupled through shared code and tables",
        ]}
      />
    </Canvas>
  );
}

export function GatewayArchitecture() {
  const services = ["License Service", "Licensee Service", "Report / Billing …"];
  return (
    <Canvas>
      {browser}
      <ArrowDown label="same URL · same login" />
      <Frame label="API Gateway · legacy ASP.NET 4.5 host, repurposed" tone="blue">
        <div className="space-y-2">
          {[
            { route: "/app/*", target: "serve React SPA bundle" },
            { route: "/api/{service}/*", target: "reverse-proxy to backend service" },
          ].map(({ route, target }) => (
            <div key={route} className="flex items-center gap-1 sm:gap-2">
              <code className="w-28 sm:w-36 shrink-0 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] sm:text-xs text-amber-200">
                {route}
              </code>
              <ArrowRight />
              <span className="text-xs sm:text-sm text-gray-200">{target}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Chip tone="blue">
            <FaLock /> auth / session
          </Chip>
          <Chip tone="blue">
            <FaRoute /> routing table
          </Chip>
          <Chip tone="blue">
            <FaClipboardList /> request logging
          </Chip>
        </div>
      </Frame>

      <FanOut>
        {[
          <Node key="spa" icon={<SiReact />} title="React SPA" subtitle="static assets" tone="cyan" />,
          ...services.map((s) => <Node key={s} icon={<FaServer />} title={s} subtitle=".NET 6 API" tone="violet" />),
        ]}
      </FanOut>

      {/* Fan-in: the three services share one database; the SPA has no DB edge. */}
      <div className="grid w-full grid-cols-4 gap-2 sm:gap-3">
        <div />
        <div className="relative col-span-3 grid grid-cols-3 gap-2 sm:gap-3">
          {services.map((s) => (
            <div key={s} className="mx-auto h-4 w-px bg-gray-600" />
          ))}
          <div className="absolute bottom-0 h-px bg-gray-600" style={{ left: "16.67%", right: "16.67%" }} />
        </div>
        <div />
        <div className="col-span-3 flex flex-col items-center">
          <ArrowDown />
          {database("w-full")}
        </div>
      </div>

      <Notes
        kind="pro"
        items={[
          "One frontend, one framework",
          "Services build, deploy and scale independently",
          "Gateway keeps the old URL + auth, so users see no cutover",
        ]}
      />
    </Canvas>
  );
}

export function GatewayRouting() {
  return (
    <Canvas>
      <Chip>incoming request</Chip>
      <ArrowDown />
      <div className="flex items-center">
        <Node icon={<FaLock />} title="Authenticated?" tone="blue" />
        <ArrowRight label="no" />
        <Node icon={<FaSignInAlt />} title="302 → /login" tone="rose" />
      </div>
      <ArrowDown label="yes" />
      <Node icon={<FaRoute />} title="Match route prefix" tone="blue" />
      <FanOut labels={["/app/**", "/api/{service}/**", "not migrated"]}>
        {[
          <Node key="spa" icon={<SiReact />} title="Return index.html" subtitle="React Router takes over" tone="cyan" />,
          <Node key="api" icon={<FaServer />} title="Forward to service" subtitle="+ user context headers" tone="violet" />,
          <Node key="mvc" icon={<SiDotnet />} title="Render legacy view" subtitle="fallback during migration" tone="amber" />,
        ]}
      </FanOut>
    </Canvas>
  );
}

export function DataLayer() {
  return (
    <Canvas>
      <Node icon={<FaServer />} title="Admin services" subtitle=".NET 6 APIs" tone="violet" />
      <ArrowDown label="EXEC sp_* only" />
      <Frame label="Admin Portal DB · SQL Server" tone="emerald">
        <div className="flex flex-col items-center">
          <Node
            icon={<FaCogs />}
            title="Stored procedures"
            subtitle="every read + write · no inline SQL"
            tone="emerald"
            className="w-full justify-center"
          />
          <ArrowDown />
          <Node icon={<FaTable />} title="Tables" subtitle="copy of product data" className="w-full justify-center" />
        </div>
      </Frame>
      <ArrowUp label="one-way sync" />
      <Frame label="Licensee's product · user-facing" tone="neutral">
        <div className="flex items-center justify-center">
          <Node icon={<FaUsers />} title="End users" subtitle="licensee customers" />
          <ArrowRight />
          <Node icon={<FaBoxOpen />} title="Product DB" subtitle="source of truth" tone="amber" />
        </div>
      </Frame>
      <Notes
        kind="pro"
        items={[
          "Every query goes through a stored procedure: precompiled, plan-cached and tuned per screen",
          "Users never write to the admin DB directly — data arrives only through sync from the product",
          "Backoffice queries run on their own copy, off the product's live database",
        ]}
      />
    </Canvas>
  );
}
