import { Footer, MenuBar } from '../components/index.js'

const contactMethods = [
  {
    title: 'LinkedIn',
    value: 'https://www.linkedin.com/in/albert-mundadan/',
    href: 'https://www.linkedin.com/in/albert-mundadan/',
    actionLabel: 'Connect',
    icon: (
      <path d="M8.5 9.5v7M8.5 6.75h.01M12.5 9.5v7M12.5 12.5a2.5 2.5 0 0 1 5 0v4M5 3.75h14A1.25 1.25 0 0 1 20.25 5v14A1.25 1.25 0 0 1 19 20.25H5A1.25 1.25 0 0 1 3.75 19V5A1.25 1.25 0 0 1 5 3.75Z" />
    ),
  },
  {
    title: 'GitHub',
    value: 'github.com/albertmundadan',
    href: 'https://github.com/albertmundadan',
    actionLabel: 'View Profile',
    icon: (
      <path d="M12 3.75a8.25 8.25 0 0 0-2.61 16.08c.41.08.56-.18.56-.4v-1.54c-2.28.5-2.76-.97-2.76-.97a2.18 2.18 0 0 0-.92-1.2c-.75-.51.06-.5.06-.5a1.73 1.73 0 0 1 1.26.85 1.77 1.77 0 0 0 2.41.69 1.78 1.78 0 0 1 .53-1.11c-1.82-.2-3.73-.91-3.73-4.06a3.17 3.17 0 0 1 .84-2.2 2.94 2.94 0 0 1 .08-2.17s.69-.22 2.25.84a7.8 7.8 0 0 1 4.1 0c1.56-1.06 2.25-.84 2.25-.84.33.7.36 1.5.08 2.17a3.17 3.17 0 0 1 .84 2.2c0 3.16-1.91 3.85-3.73 4.06a2 2 0 0 1 .57 1.56v2.31c0 .22.15.49.57.4A8.25 8.25 0 0 0 12 3.75Z" />
    ),
  },
  {
    title: 'Email',
    value: 'albertmundadan@gmail.com',
    href: 'mailto:albertmundadan@gmail.com',
    actionLabel: 'Send Email',
    icon: (
      <>
        <rect x="3.75" y="6" width="16.5" height="12" rx="1.75" />
        <path d="m5.25 7.5 6.09 4.88a1.05 1.05 0 0 0 1.32 0l6.09-4.88" />
      </>
    ),
  },
]

function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-container-lowest)] text-[var(--on-background)]">
      <MenuBar />

      <main className="flex-1 px-3.5 pt-12 pb-6 md:px-10 md:pt-16 md:pb-8">
        <section className="mx-auto max-w-[72rem]">
          <div className="mb-8 max-w-[36rem]">
            <p className="font-['Space_Mono'] text-[1.9rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">
              Contact
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="group rounded-lg border border-[color:var(--outline-variant)]/18 bg-[color:rgba(27,28,28,0.78)] px-5 py-5 transition-colors duration-300 hover:border-[color:var(--secondary)]/35 hover:bg-[color:rgba(33,34,34,0.92)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--secondary)]/24 bg-[color:var(--secondary)]/6 text-[var(--secondary)]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4.5 w-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {method.icon}
                  </svg>
                </div>
                <h2 className="font-['Libre_Caslon_Text'] text-[1.1rem] text-[var(--on-background)]">
                  {method.title}
                </h2>
                <p className="mt-2 font-['Space_Mono'] text-[0.7rem] leading-[1.15rem] text-[var(--on-surface-variant)]">
                  {method.value}
                </p>
                <div className="mt-5">
                  <a
                    href={method.href}
                    target={method.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={method.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    className="inline-flex items-center rounded-full border border-[color:var(--secondary)]/35 bg-[color:var(--secondary)]/6 px-4 py-2.5 font-['Space_Mono'] text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--secondary)] transition-transform duration-300 group-hover:translate-x-1 hover:bg-[color:var(--secondary)]/12"
                  >
                    {method.actionLabel}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage
