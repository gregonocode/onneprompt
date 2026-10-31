import { ArrowUpRight, Clock3 } from "lucide-react";

const platforms = [
  {
    name: "Notion",
    category: "Organización",
    description: "Reúne documentos, notas y proyectos de tu equipo.",
    mark: "N",
    color: "violet",
  },
  {
    name: "Trello",
    category: "Tareas",
    description: "Visualiza pendientes y sigue el avance de cada proyecto.",
    mark: "T",
    color: "blue",
  },
  {
    name: "Slack",
    category: "Trabajo en equipo",
    description: "Mantén las conversaciones de trabajo cerca de tus tareas.",
    mark: "S",
    color: "green",
  },
  {
    name: "Discord",
    category: "Comunidad",
    description: "Encuentra a tu comunidad y participa en sus espacios.",
    mark: "D",
    color: "indigo",
  },
  {
    name: "Telegram",
    category: "Mensajería",
    description: "Sigue tus grupos y conversaciones importantes.",
    mark: "Tg",
    color: "cyan",
  },
  {
    name: "Google Drive",
    category: "Archivos",
    description: "Ten tus documentos y recursos a mano en un mismo lugar.",
    mark: "G",
    color: "yellow",
  },
];

export default function DashboardHomePage() {
  return (
    <div className="dashboard-content">
      <section className="dashboard-welcome">
        <div>
          <p className="dashboard-eyebrow">TU ESPACIO DE TRABAJO</p>
          <h1>Todo conectado.<br /><span>Todo en movimiento.</span></h1>
          <p className="dashboard-lead">
            Organiza tus tareas, conversaciones y comunidades desde un solo lugar.
          </p>
        </div>
        <div className="dashboard-welcome-foot">
          <span><span className="dashboard-live-dot" /> Tu espacio, a tu manera</span>
          <span>Plataformas <b>·</b> tareas <b>·</b> comunidad</span>
        </div>
      </section>

      <section className="dashboard-platforms" aria-labelledby="platforms-heading">
        <div className="dashboard-section-heading">
          <div>
            <p className="dashboard-eyebrow">TU ECOSISTEMA</p>
            <h2 id="platforms-heading">Plataformas</h2>
            <p>Descubre los espacios que podrás reunir en OnneGram.</p>
          </div>
          <span className="dashboard-count">{platforms.length} plataformas</span>
        </div>

        <div className="platform-grid">
          {platforms.map((platform) => (
            <article className="platform-card" key={platform.name}>
              <div className="platform-card-top">
                <span className={`platform-mark mark-${platform.color}`} aria-hidden="true">{platform.mark}</span>
                <span className="platform-status"><Clock3 size={12} /> Próximamente</span>
              </div>
              <p className="platform-category">{platform.category}</p>
              <h3>{platform.name}</h3>
              <p className="platform-description">{platform.description}</p>
              <button className="platform-connect" type="button" disabled>
                Conectar <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <p className="dashboard-note">
        <span aria-hidden="true">i</span>
        Las conexiones con estas plataformas estarán disponibles próximamente.
      </p>
    </div>
  );
}
