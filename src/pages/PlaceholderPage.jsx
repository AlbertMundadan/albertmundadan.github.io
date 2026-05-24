import { Footer, MenuBar } from '../components/index.js'

function PlaceholderPage({ title }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--on-background)]">
      <MenuBar />

      <main className="flex-1 px-3.5 py-12 md:px-10 md:py-16">
        <section className="mx-auto max-w-[72rem]">
          <p className="font-['Space_Mono'] text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">
            {title}
          </p>
          <h1 className="mt-3 font-['Libre_Caslon_Text'] text-[2rem] tracking-[-0.02em] md:text-[3rem]">
            This page is not built yet.
          </h1>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default PlaceholderPage
