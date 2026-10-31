import Image from "next/image";
import Link from "next/link";
import DashboardNav from "./dashboard-nav";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="dashboard-app" lang="es">
      <a className="dashboard-skip-link" href="#dashboard-content">Saltar al contenido</a>
      <aside className="dashboard-sidebar" aria-label="Menu del espacio de trabajo">
        <Link className="dashboard-brand" href="/" aria-label="OnneGram, inicio">
          <Image src="/icon/icon-onne-192.png" alt="" width={38} height={38} priority />
        </Link>

        <span className="dashboard-sidebar-divider" aria-hidden="true" />
        <DashboardNav />
      </aside>

      <div className="dashboard-main-column">
        <header className="dashboard-contextbar">
          <div className="dashboard-breadcrumb"><span>ONNEGRAM</span><b>/</b><strong>Tu espacio</strong></div>
          <span className="dashboard-context-tag"><span /> Vista previa</span>
        </header>
        <main id="dashboard-content" className="dashboard-main" tabIndex={-1}>{children}</main>
      </div>
    </div>
  );
}
