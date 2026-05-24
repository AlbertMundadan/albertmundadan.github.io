import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import resumePdf from '../assets/files/albert_mundadan_resume.pdf'
import headshot from '../assets/images/Headshot.jpg'
import { Footer, MenuBar, ProjectCard } from '../components/index.js'
import projectData from '../data/projects.json'
import experienceData from '../data/experience.json'
import roleData from '../data/roles.json'
import skillData from '../data/skills.json'
import certificationData from '../data/certifications.json'

const imageAssets = import.meta.glob('../assets/images/**/*', {
  eager: true,
  import: 'default',
})

const projects = projectData.map((project, index) => ({
  ...project,
  id: `${project.title}-${index}`,
  imageSrc: project.imageSrc
    ? imageAssets[`../assets/images/projects/${project.imageSrc}`] ?? null
    : null,
}))

const experience = experienceData.map((item, index) => ({
  ...item,
  id: `${item.company}-${index}`,
  logoSrc: item.logo ? imageAssets[`../assets/images/logos/${item.logo}`] ?? null : null,
}))

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

function HomePage() {
  const [activeProjectFilter, setActiveProjectFilter] = useState('All')
  const [activeRoleIndex, setActiveRoleIndex] = useState(0)
  const [typedRole, setTypedRole] = useState(() => roleData[0] ?? '')
  const [isDeletingRole, setIsDeletingRole] = useState(false)
  const [projectLayout, setProjectLayout] = useState(() => {
    if (typeof window === 'undefined') {
      return { columns: 3, pageSize: 6 }
    }

    return getProjectLayout(window.innerWidth)
  })
  const [currentProjectPage, setCurrentProjectPage] = useState(0)

  useEffect(() => {
    const updateProjectLayout = () => {
      const nextLayout = getProjectLayout(window.innerWidth)

      setProjectLayout((currentLayout) => {
        if (currentLayout.pageSize !== nextLayout.pageSize) {
          setCurrentProjectPage(0)
        }

        return currentLayout.columns === nextLayout.columns &&
          currentLayout.pageSize === nextLayout.pageSize
          ? currentLayout
          : nextLayout
      })
    }

    window.addEventListener('resize', updateProjectLayout)

    return () => window.removeEventListener('resize', updateProjectLayout)
  }, [])

  useEffect(() => {
    if (!roleData.length) {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      const timeoutId = window.setTimeout(() => {
        setTypedRole(roleData[activeRoleIndex] ?? '')
        setIsDeletingRole(false)
      }, 0)

      return () => window.clearTimeout(timeoutId)
    }

    const currentRole = roleData[activeRoleIndex] ?? ''
    let timeoutDelay = isDeletingRole ? 40 : 85

    if (!isDeletingRole && typedRole === currentRole) {
      timeoutDelay = 1400
    }

    const timeoutId = window.setTimeout(() => {
      if (!isDeletingRole && typedRole === currentRole) {
        setIsDeletingRole(true)
        setTypedRole(currentRole.slice(0, -1))
        return
      }

      if (isDeletingRole) {
        if (typedRole.length === 0) {
          setIsDeletingRole(false)
          setActiveRoleIndex((index) => (index + 1) % roleData.length)
          return
        }

        setTypedRole((role) => role.slice(0, -1))
        return
      }

      setTypedRole(currentRole.slice(0, typedRole.length + 1))
    }, timeoutDelay)

    return () => window.clearTimeout(timeoutId)
  }, [activeRoleIndex, isDeletingRole, typedRole])

  const filteredProjects =
    activeProjectFilter === 'All'
      ? projects
      : projects.filter((project) =>
          project.categories?.includes(activeProjectFilter),
        )

  const totalProjectPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / projectLayout.pageSize),
  )
  const visibleProjectPage = Math.min(currentProjectPage, totalProjectPages - 1)

  const visibleProjects = filteredProjects.slice(
    visibleProjectPage * projectLayout.pageSize,
    visibleProjectPage * projectLayout.pageSize + projectLayout.pageSize,
  )
  const paddedVisibleProjects = [
    ...visibleProjects,
    ...Array.from(
      { length: Math.max(0, projectLayout.pageSize - visibleProjects.length) },
      (_, index) =>
        createPlaceholderProject(visibleProjectPage * projectLayout.pageSize + index),
    ),
  ]

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--background)] text-[var(--on-background)]">
      <MenuBar fixed />

      <main className="relative flex-1 pt-13">
        <section className="backdrop-glow relative px-3.5 py-14 pt-9 md:px-10 md:py-14">
          <div className="mx-auto flex max-w-[72rem] flex-col gap-5 md:flex-row md:justify-between">
            <div className="order-2 pt-10 flex-1 pl-25 md:order-1 md:max-w-[60%] md:pt-5">
              <h1 className="font-['Libre_Caslon_Text'] text-[1.8rem] font-bold tracking-[-0.02em] text-[var(--on-background)] md:text-[40px] md:leading-[52px]">
                Hey, I&apos;m Albert
              </h1>
              <h1 className="font-['Libre_Caslon_Text'] text-[1.7rem] tracking-[-0.02em] text-[var(--on-background)] md:text-[25px] md:leading-[38px]">
                I&apos;m a {typedRole}
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
                  href={resumePdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--secondary)] px-3.5 py-1.5 font-['Space_Mono'] text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[var(--primary-container)] shadow-[0_0_12px_rgba(200,198,197,0.16)] transition-transform hover:scale-[1.02]"
                >
                  Resume
                  <span aria-hidden="true" className="text-[0.9rem] leading-none">
                    ↓
                  </span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--secondary)]/50 px-3.5 py-1.5 font-['Space_Mono'] text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[var(--secondary)] transition-colors hover:bg-[color:var(--secondary)]/6"
                >
                  Contact Me
                  <span aria-hidden="true" className="text-[0.9rem] leading-none">
                    ↗
                  </span>
                </Link>
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
          className="bg-[var(--surface-container)] px-3.5 py-12 md:px-10"
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
                  onClick={() => {
                    setActiveProjectFilter(filter)
                    setCurrentProjectPage(0)
                  }}
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
                disabled={visibleProjectPage === 0}
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
                    aria-current={visibleProjectPage === index ? 'page' : undefined}
                    onClick={() => setCurrentProjectPage(index)}
                    className={
                      visibleProjectPage === index
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
                disabled={visibleProjectPage === totalProjectPages - 1}
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
          className="bg-background px-3.5 py-12 md:px-10"
        >
          <div className="mx-auto max-w-[72rem]">
            <div>
              <span className="block font-['Space_Mono'] text-[1.2rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)] md:text-[1.3rem]">
                Experience
              </span>
            </div>
            <div className="mt-4 space-y-6 md:mt-5 lg:ml-55 lg:mr-40">
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
                          className="mt-0.5 h-9 w-9 shrink-0 rounded-sm object-contain md:h-10 md:w-10"
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
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[var(--secondary)] px-5 py-2.5 font-['Space_Mono'] text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--secondary)] transition-all duration-300 hover:bg-[var(--secondary)] hover:text-[var(--primary-container)]"
                >
                  View Full Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="bg-[var(--surface-container-lowest)] px-3.5 py-12 md:px-10"
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
          className="bg-[var(--surface-container-low)] px-3.5 py-12 md:px-10"
        >
          <div className="mx-auto max-w-[72rem]">
            <div className="mb-5">
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

      <Footer />
    </div>
  )
}

export default HomePage
