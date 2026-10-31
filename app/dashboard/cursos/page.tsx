import { ArrowUpRight, BookOpen, CheckSquare, MessageSquareText, UsersRound } from "lucide-react";

const courses = [
  {
    title: "Organiza tus tareas",
    description: "Crea un flujo de trabajo claro y mantén tus proyectos en marcha.",
    icon: CheckSquare,
    lessons: "Tareas y proyectos",
  },
  {
    title: "Mejora la comunicación",
    description: "Haz que las conversaciones de equipo sean más simples y útiles.",
    icon: MessageSquareText,
    lessons: "Chats y colaboración",
  },
  {
    title: "Construye comunidad",
    description: "Comparte conocimiento y crea espacios donde las personas conecten.",
    icon: UsersRound,
    lessons: "Comunidad y crecimiento",
  },
];

export default function CoursesPage() {
  return (
    <div className="dashboard-content">
      <section className="dashboard-page-heading">
        <p className="dashboard-eyebrow">APRENDE A TU RITMO</p>
        <h1>Cursos</h1>
        <p>Ideas y herramientas para trabajar mejor, colaborar y hacer crecer tu comunidad.</p>
      </section>

      <section className="course-grid" aria-label="Cursos disponibles próximamente">
        {courses.map(({ title, description, icon: Icon, lessons }, index) => (
          <article className="course-card" key={title}>
            <div className="course-card-head">
              <span className="course-icon"><Icon size={21} strokeWidth={1.7} /></span>
              <span className="course-number">0{index + 1}</span>
            </div>
            <p className="platform-category">{lessons}</p>
            <h2>{title}</h2>
            <p className="course-description">{description}</p>
            <div className="course-card-foot">
              <span><BookOpen size={14} /> Curso</span>
              <span className="course-soon">Próximamente <ArrowUpRight size={14} /></span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
