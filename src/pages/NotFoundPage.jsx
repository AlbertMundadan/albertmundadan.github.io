import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--on-background)]">
      <main className="flex flex-1 items-center px-3.5 py-12 md:px-10">
        <div className="mx-auto w-full max-w-[40rem] rounded-lg border border-[color:var(--outline-variant)]/18 bg-[color:rgba(27,28,28,0.88)] px-6 py-8">
          <p className="font-['Space_Mono'] text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">
            404
          </p>
          <h1 className="mt-3 font-['Libre_Caslon_Text'] text-[2rem] tracking-[-0.02em] md:text-[2.4rem]">
            This page does not exist.
          </h1>
          <p className="mt-3 max-w-[32rem] font-['Space_Mono'] text-[0.78rem] leading-[1.25rem] text-[var(--on-surface-variant)]">
            The route may be wrong, outdated, or unavailable.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center rounded-full bg-[var(--secondary)] px-4 py-2 font-['Space_Mono'] text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--primary-container)]"
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFoundPage
