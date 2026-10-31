import Link from "next/link";

export default function HomePage() {
  return (
    <main lang="es" className="flex min-h-screen items-center justify-center bg-[#101010] px-6 text-center text-[#f5f5f3]">
      <section className="max-w-lg">
        <p className="text-xs font-semibold tracking-[0.25em] text-[#c1fe2a]">ONNEGRAM</p>
        <h1 className="mt-4 text-3xl font-medium">Tu espacio de trabajo</h1>
        <p className="mt-3 text-sm leading-6 text-[#99979b]">
          Organiza tus tareas, cursos y conversaciones desde un solo lugar.
        </p>
        <Link
          href="/dashboard"
          className="mt-7 inline-flex rounded-full bg-[#c1fe2a] px-6 py-3 text-sm font-semibold text-[#171914] transition hover:bg-[#d0ff58]"
        >
          Ir al dashboard
        </Link>
      </section>
    </main>
  );
}
