import { useEffect, useState } from 'react'
import headshot from './assets/images/Headshot.jpg'
import headerMark from './assets/images/Name.png'
import { ProjectCard } from './components/index.js'
import projectData from './data/projects.json'

const projectImages = import.meta.glob('./assets/images/*', {
  eager: true,
  import: 'default',
})

const projects = projectData.map((project, index) => ({
  ...project,
  id: `${project.title}-${index}`,
  imageSrc: project.imageSrc
    ? projectImages[`./assets/images/${project.imageSrc}`] ?? null
    : null,
}))

const experience = [
  {
    company: 'Airbnb',
    role: 'Senior Product Designer',
    dates: '2021 - Present',
  },
  {
    company: 'Google',
    role: 'Interaction Designer',
    dates: '2018 - 2021',
  },
  {
    company: 'Dropbox',
    role: 'Product Designer',
    dates: '2016 - 2018',
  },
]

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

function createPlaceholderProject(index) {
  return {
    id: `coming-soon-${index}`,
    title: 'Coming Soon',
    description: 'More exciting projects in development! :)',
    tags: ['In Progress'],
    icon: '…',
    imageSrc: null,
    code: '',
    isPlaceholder: true,
  }
}

function getProjectLayout(width) {
  if (width >= 1200) {
    return { columns: 3, pageSize: 6 }
  }

  return { columns: 2, pageSize: 4 }
}

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [projectLayout, setProjectLayout] = useState(() => {
    if (typeof window === 'undefined') {
      return { columns: 3, pageSize: 6 }
    }

    return getProjectLayout(window.innerWidth)
  })
  const [currentProjectPage, setCurrentProjectPage] = useState(0)

  useEffect(() => {
    const updateProjectLayout = () => {
      setProjectLayout(getProjectLayout(window.innerWidth))
    }

    updateProjectLayout()
    window.addEventListener('resize', updateProjectLayout)

    return () => window.removeEventListener('resize', updateProjectLayout)
  }, [])

  const totalProjectPages = Math.max(
    1,
    Math.ceil(projects.length / projectLayout.pageSize),
  )

  useEffect(() => {
    setCurrentProjectPage((page) => Math.min(page, totalProjectPages - 1))
  }, [totalProjectPages])

  const projectStartIndex = currentProjectPage * projectLayout.pageSize
  const visibleProjects = projects.slice(
    projectStartIndex,
    projectStartIndex + projectLayout.pageSize,
  )
  const paddedVisibleProjects = [
    ...visibleProjects,
    ...Array.from(
      { length: Math.max(0, projectLayout.pageSize - visibleProjects.length) },
      (_, index) => createPlaceholderProject(projectStartIndex + index),
    ),
  ]

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--on-background)]">
      <header className="fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b border-[color:var(--outline-variant)]/20 bg-[color:rgba(19,19,19,0.9)] px-3.5 backdrop-blur-xl md:px-7">
        <button
          type="button"
          className="font-['Space_Mono'] text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--on-surface-variant)] transition-colors hover:text-[var(--secondary)] md:hidden"
          onClick={() => setIsDrawerOpen(true)}
        >
          Menu
        </button>
        <img
          src={headerMark}
          alt="Albert Mundadan"
          className="ml-auto h-4.5 w-auto object-contain md:ml-0 md:h-[1.7rem]"
        />
        <div className="flex items-center gap-3.5">
          <nav className="hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-['Space_Mono'] text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--on-surface-variant)] transition-colors duration-500 hover:text-[var(--secondary)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative pt-13">
        <section className="backdrop-glow relative px-3.5 py-14 pt-9 md:px-10 md:py-14">
          <div className="mx-auto flex max-w-[72rem] flex-col gap-5 md:flex-row md:justify-between">
            <div className="order-2 pt-10 flex-1 md:order-1 md:max-w-[60%] md:pt-5 pl-25">
              <h1 className="font-['Libre_Caslon_Text'] text-[1.8rem] font-bold tracking-[-0.02em] text-[var(--on-background)] md:text-[40px] md:leading-[52px]">
                Hey, I&apos;m Albert.
              </h1>
              <h1 className="font-['Libre_Caslon_Text'] text-[1.9rem] tracking-[-0.02em] text-[var(--on-background)] md:text-[27px] md:leading-[38px]">
                I&apos;m a designer.
                <span className="animate-pulse text-[var(--tertiary)]">|</span>
              </h1>
              <div className="mt-2 max-w-[32rem] border-l border-[color:var(--outline-variant)]/30 pl-4.5">
                <p className="font-['Space_Mono'] text-[0.8rem] leading-[1.15rem] tracking-[0.02em] text-[var(--on-surface-variant)]">
                  I&apos;m an Honors Computer Science and Electrical Engineering
                  student at the University of Connecticut, passionate about
                  developing innovative solutions to complex problems.
                </p>
              </div>
              <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
                <a
                  href="#experience"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--secondary)] px-3.5 py-1.5 font-['Space_Mono'] text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[var(--primary-container)] shadow-[0_0_12px_rgba(200,198,197,0.16)] transition-transform hover:scale-[1.02]"
                >
                  Resume
                  <span aria-hidden="true" className="text-[0.9rem] leading-none">
                    ↓
                  </span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--secondary)]/50 px-3.5 py-1.5 font-['Space_Mono'] text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[var(--secondary)] transition-colors hover:bg-[color:var(--secondary)]/6"
                >
                  Contact Me
                  <span aria-hidden="true" className="text-[0.9rem] leading-none">
                    ↗
                  </span>
                </a>
              </div>
            </div>

            <div className="hidden overflow-hidden border border-[color:var(--secondary)]/10 md:absolute md:top-0 md:right-0 md:bottom-0 md:order-2 md:block md:w-[21.5%]">
              <img
                src={headshot}
                alt="Albert headshot"
                className="h-full w-full object-cover object-center transition-transform duration-500 md:hover:scale-[1.05]"
              />
              <div className="cinematic-image-overlay pointer-events-none absolute inset-0" />
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="bg-[var(--surface-container)] px-3.5 py-9 md:px-10"
        >
          <div className="mx-auto max-w-[72rem]">
            <div className="mb-7 text-left">
              <span className="block font-['Space_Mono'] text-[1.2rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)] md:text-[1.2rem]">
                Projects
              </span>
            </div>

            <div
              className={`mx-auto grid max-w-[72rem] justify-items-center gap-y-3.5 ${
                projectLayout.columns === 3
                  ? 'grid-cols-2 md:grid-cols-3 md:gap-x-3.5'
                  : 'grid-cols-2 gap-x-3.5'
              }`}
            >
              {paddedVisibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="mt-9 flex items-center justify-center gap-2.5 pb-2.5">
              <button
                type="button"
                aria-label="Previous project page"
                onClick={() =>
                  setCurrentProjectPage((page) => Math.max(0, page - 1))
                }
                disabled={currentProjectPage === 0}
                className="inline-flex h-8 w-8 items-center justify-center text-[var(--secondary)] transition-colors hover:text-[var(--on-background)] disabled:cursor-not-allowed disabled:text-[color:var(--outline)]/40 disabled:hover:text-[color:var(--outline)]/40"
              >
                <span aria-hidden="true" className="text-[1.35rem] leading-none">
                  ‹
                </span>
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalProjectPages }, (_, index) => (
                  <button
                    key={`project-page-${index + 1}`}
                    type="button"
                    aria-label={`Go to project page ${index + 1}`}
                    aria-current={currentProjectPage === index ? 'page' : undefined}
                    onClick={() => setCurrentProjectPage(index)}
                    className={
                      currentProjectPage === index
                        ? 'h-2 w-5 rounded-full bg-[var(--secondary)]'
                        : 'h-2 w-2 rounded-full bg-[color:var(--on-primary-container)]/40 transition-colors hover:bg-[color:var(--secondary)]/60'
                    }
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next project page"
                onClick={() =>
                  setCurrentProjectPage((page) =>
                    Math.min(totalProjectPages - 1, page + 1),
                  )
                }
                disabled={currentProjectPage === totalProjectPages - 1}
                className="inline-flex h-8 w-8 items-center justify-center text-[var(--secondary)] transition-colors hover:text-[var(--on-background)] disabled:cursor-not-allowed disabled:text-[color:var(--outline)]/40 disabled:hover:text-[color:var(--outline)]/40"
              >
                <span aria-hidden="true" className="text-[1.35rem] leading-none">
                  ›
                </span>
              </button>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="bg-[var(--surface-container-lowest)] px-3.5 py-18 md:px-10"
        >
          <div className="mx-auto grid max-w-[72rem] grid-cols-1 items-start gap-5 md:grid-cols-2">
            <div className="md:sticky md:top-22">
              <span className="mb-2 block font-['Space_Mono'] text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">
                About
              </span>
              <h2 className="max-w-sm font-['Libre_Caslon_Text'] text-[27px] leading-[32px] text-[var(--on-surface)]">
                A cinematic visual style paired with product thinking and
                engineering curiosity.
              </h2>
            </div>
            <div className="space-y-4.5 font-['Space_Mono'] text-[0.74rem] leading-5 text-[var(--on-surface-variant)]">
              <p>
                I&apos;m interested in interface design, front-end engineering, and
                building products that feel deliberate from the first interaction
                to the final detail.
              </p>
              <p>
                My work sits between visual systems and implementation, with a
                focus on typography, motion, and the structure that makes
                experiences feel clear and memorable.
              </p>
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="bg-[var(--surface-container-low)] px-3.5 py-18 md:px-10"
        >
          <div className="mx-auto grid max-w-[72rem] grid-cols-1 items-start gap-5 md:grid-cols-2">
            <div className="md:sticky md:top-22">
              <span className="mb-2 block font-['Space_Mono'] text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">
                Experience
              </span>
              <h2 className="max-w-sm font-['Libre_Caslon_Text'] text-[27px] leading-[32px] text-[var(--on-surface)]">
                Over a decade of shaping digital products at scale.
              </h2>
            </div>
            <div className="space-y-4.5">
              {experience.map((item) => (
                <div
                  key={item.company}
                  className="border-b border-[color:var(--outline-variant)]/10 pb-2"
                >
                  <h4 className="text-[0.86rem] font-bold text-[var(--on-background)]">
                    {item.company}
                  </h4>
                  <p className="font-['Space_Mono'] text-[0.65rem] text-[var(--on-surface-variant)]">
                    {item.role} • {item.dates}
                  </p>
                </div>
              ))}

              <div className="pt-1">
                <button
                  type="button"
                  className="border border-[var(--secondary)] px-4.5 py-2 font-['Space_Mono'] text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--secondary)] transition-all duration-300 hover:bg-[var(--secondary)] hover:text-[var(--primary-container)]"
                >
                  View Full Resume
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="flex w-full flex-col items-center justify-between gap-5 border-t border-[color:var(--outline-variant)]/10 bg-[var(--background)] px-3.5 py-5 md:flex-row md:px-10"
      >
        <span className="font-['Libre_Caslon_Text'] text-[1.05rem] tracking-tight text-[var(--on-background)]">
          ALBERT
        </span>
        <div className="flex flex-wrap justify-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-['Space_Mono'] text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--outline)] transition-colors hover:text-[var(--on-background)]"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="font-['Space_Mono'] text-[7px] uppercase tracking-[0.16em] text-[var(--outline)]">
          © 2026 Albert Mundadan All Rights Reserved.
        </p>
      </footer>

      <div
        className={`fixed inset-0 z-[60] flex flex-col justify-center bg-[color:rgba(19,19,19,0.95)] p-4.5 backdrop-blur-2xl transition-all duration-500 ${
          isDrawerOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-4.5 flex items-center justify-between">
            <span className="font-['Libre_Caslon_Text'] text-[1.05rem] text-[var(--on-surface)]">
              ALBERT
            </span>
            <button
              type="button"
              className="text-[0.74rem] uppercase tracking-[0.16em] text-[var(--on-background)]"
              onClick={() => setIsDrawerOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="flex flex-col gap-3.5">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsDrawerOpen(false)}
                className={`pl-3 font-['Space_Mono'] text-[9px] font-bold uppercase tracking-[0.16em] ${
                  index === 0
                    ? 'border-l-2 border-[var(--secondary)] text-[var(--secondary)]'
                    : 'text-[var(--outline)] transition-all duration-300 hover:bg-[color:var(--surface-variant)]/20'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
