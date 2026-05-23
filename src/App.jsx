import { useEffect, useState } from 'react'
import headshot from './assets/images/Headshot.jpg'
import headerMark from './assets/images/Name.png'
import { ProjectCard } from './components/index.js'
import projectData from './data/projects.json'
import experienceData from './data/experience.json'
import skillData from './data/skills.json'
import certificationData from './data/certifications.json'

const imageAssets = import.meta.glob('./assets/images/**/*', {
  eager: true,
  import: 'default',
})

const projects = projectData.map((project, index) => ({
  ...project,
  id: `${project.title}-${index}`,
  imageSrc: project.imageSrc
    ? imageAssets[`./assets/images/projects/${project.imageSrc}`] ?? null
    : null,
}))

const experience = experienceData.map((item, index) => ({
  ...item,
  id: `${item.company}-${index}`,
  logoSrc: item.logo ? imageAssets[`./assets/images/logos/${item.logo}`] ?? null : null,
}))

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

const projectFilters = ['All', 'Software', 'Hardware', 'Data Science']

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
  const [activeProjectFilter, setActiveProjectFilter] = useState('All')
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

  const filteredProjects =
    activeProjectFilter === 'All'
      ? projects
      : projects.filter((project) =>
          project.categories?.includes(activeProjectFilter),
        )

  const projectStartIndex = currentProjectPage * projectLayout.pageSize
  const totalProjectPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / projectLayout.pageSize),
  )

  useEffect(() => {
    setCurrentProjectPage((page) => Math.min(page, totalProjectPages - 1))
  }, [totalProjectPages])

  useEffect(() => {
    setCurrentProjectPage(0)
  }, [activeProjectFilter, projectLayout.pageSize])

  const visibleProjects = filteredProjects.slice(
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
          className="ml-auto h-4.5 w-auto object-contain md:ml-0 md:h-[1.8rem]"
        />
        <div className="flex items-center gap-3.5">
          <nav className="hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-['Space_Mono'] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--on-surface-variant)] transition-colors duration-500 hover:text-[var(--secondary)]"
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
            <div className="mb-4 text-left">
              <span className="block font-['Space_Mono'] text-[1.2rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)] md:text-[1.3rem]">
                Projects
              </span>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveProjectFilter(filter)}
                  className={`rounded-full px-3 py-1.5 font-['Space_Mono'] text-[0.63rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                    activeProjectFilter === filter
                      ? 'bg-[var(--secondary)] text-[var(--primary-container)]'
                      : 'border border-[color:var(--secondary)]/24 bg-[color:var(--secondary)]/4 text-[var(--secondary)] hover:bg-[color:var(--secondary)]/10'
                  }`}
                >
                  {filter}
                </button>
              ))}
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

            <div className="mt-5 flex items-center justify-center gap-2.5">
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
          id="experience"
          className="bg-background px-3.5 py-9 md:px-10"
        >
          <div className="mx-auto max-w-[72rem]">
            <div>
              <span className="block font-['Space_Mono'] text-[1.2rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)] md:text-[1.3rem]">
                Experience
              </span>
            </div>
            <div className="mt-4 space-y-6 md:mt-5 md:mx-30 lg:ml-55 lg:mr-40">
              {experience.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-[color:var(--outline-variant)]/50 pb-3"
                >
                  <div className="flex flex-col gap-2.5 md:grid md:grid-cols-[minmax(0,1fr)_18rem] md:items-start md:gap-8">
                    <div className="flex min-w-0 items-start gap-3.5 md:gap-4">
                      {item.logoSrc ? (
                        <img
                          src={item.logoSrc}
                          alt={`${item.company} logo`}
                          className="mt-0.5 h-9 w-9 rounded-sm shrink-0 object-contain md:h-10 md:w-10"
                        />
                      ) : null}
                      <div className="min-h-[3.25rem]">
                        <h4 className="text-[0.96rem] font-bold text-[var(--on-background)] md:text-[1.02rem]">
                          {item.company}
                        </h4>
                        <p className="font-['Space_Mono'] text-[0.75rem] text-[var(--on-surface-variant)] md:text-[0.8rem]">
                          {item.role}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1 font-['Space_Mono'] text-[0.7rem] text-[color:var(--outline)] md:w-[12rem] md:justify-self-end md:text-[0.76rem]">
                      <div className="grid grid-cols-[0.875rem_1fr] items-center gap-x-2">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5 shrink-0 text-[var(--outline)]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        <p>{item.dateRange}</p>
                      </div>
                      {item.location ? (
                        <div className="grid grid-cols-[0.875rem_1fr] items-center gap-x-2">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5 shrink-0 text-[var(--outline)]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
                            <circle cx="12" cy="10" r="2.5" />
                          </svg>
                          <p>{item.location}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-1">
                <button
                  type="button"
                  className="border border-[var(--secondary)] px-5 py-2.5 font-['Space_Mono'] text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--secondary)] transition-all duration-300 hover:bg-[var(--secondary)] hover:text-[var(--primary-container)]"
                >
                  View Full Resume
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="bg-[var(--surface-container-lowest)] px-3.5 py-18 md:px-10"
        >
          <div className="mx-auto max-w-[72rem]">
            <div className="mb-5">
              <span className="block font-['Space_Mono'] text-[1.2rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)] md:text-[1.3rem]">
                Skills
              </span>
            </div>
            <div className="grid gap-4 lg:ml-55 lg:mr-20 lg:max-w-[47rem] lg:grid-cols-2">
              {skillData.map((group) => (
                <div
                  key={group.title}
                  className="w-full rounded-lg border border-[color:var(--outline-variant)]/18 bg-[color:rgba(27,28,28,0.78)] px-4 py-4"
                >
                  <h3 className="mb-3 font-['Libre_Caslon_Text'] text-[1rem] text-[var(--on-background)]">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[color:var(--secondary)]/24 bg-[color:var(--secondary)]/4 px-2.5 py-1 font-sans text-[0.62rem] font-semibold tracking-[0.02em] text-[var(--secondary)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="certifications"
          className="bg-[var(--surface-container-low)] px-3.5 py-18 md:px-10"
        >
          <div className="mx-auto grid max-w-[72rem] grid-cols-1 items-start gap-5 md:grid-cols-2">
            <div className="md:sticky md:top-22">
              <span className="block font-['Space_Mono'] text-[1.2rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)] md:text-[1.3rem]">
                Certifications
              </span>
            </div>
            <div className="space-y-4">
              {certificationData.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-[color:var(--outline-variant)]/16 bg-[color:rgba(31,32,32,0.8)] px-4 py-4"
                >
                  <h3 className="font-['Libre_Caslon_Text'] text-[1rem] text-[var(--on-background)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-['Space_Mono'] text-[0.68rem] leading-[1.1rem] text-[var(--on-surface-variant)]">
                    {item.issuer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="flex w-full flex-col items-center justify-between gap-5 border-t border-[color:var(--outline-variant)]/10 bg-[var(--surface-container-lowest)] px-3.5 py-5 md:flex-row md:px-10"
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
