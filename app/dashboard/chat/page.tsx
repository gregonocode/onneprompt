import { MessageCircle, Plus, UsersRound } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="dashboard-content">
      <section className="dashboard-page-heading chat-page-heading">
        <div>
          <p className="dashboard-eyebrow">HABLA Y COLABORA</p>
          <h1>Chat</h1>
          <p>Tus conversaciones de trabajo y comunidad, reunidas en un solo lugar.</p>
        </div>
        <button className="dashboard-primary-button" type="button" disabled>
          <Plus size={17} /> Nueva conversación
        </button>
      </section>

      <section className="chat-empty-panel" aria-label="Conversaciones">
        <div className="chat-empty-content">
          <div className="chat-empty-art" aria-hidden="true">
            <span className="chat-art-main"><MessageCircle size={31} strokeWidth={1.5} /></span>
            <span className="chat-art-small"><UsersRound size={19} strokeWidth={1.7} /></span>
          </div>
          <p className="dashboard-eyebrow">UN ESPACIO PARA CONECTAR</p>
          <h2>Tus conversaciones empiezan aquí</h2>
          <p>Cuando conectes tus plataformas, aquí aparecerán tus chats y comunidades.</p>
          <button className="dashboard-secondary-button" type="button" disabled>
            Conectar una plataforma
          </button>
          <span className="chat-coming-soon">Las integraciones estarán disponibles próximamente.</span>
        </div>
      </section>
    </div>
  );
}
