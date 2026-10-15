import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
        Software Engineering · AI/ML
      </p>
      <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
        Building practical software skills, one project at a time.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        I am a Software Engineering student specializing in AI/ML. I develop
        practical technical skills through software projects, structured
        learning, and documented work.
      </p>
      <div className="mt-9">
        <Link href="/projects" className="inline-flex rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">
          View My Projects
        </Link>
      </div>
      <section aria-labelledby="featured-heading" className="mt-20">
        <h2 id="featured-heading" className="text-2xl font-bold text-slate-900">
          Featured Projects
        </h2>
        <p className="mt-3 text-slate-600">
          Project previews will be added here as I complete and document my work.
        </p>
      </section>
    </main>
  );
}
