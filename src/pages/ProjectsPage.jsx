import { useState } from 'react'
import { Footer, MenuBar, ProjectCard } from '../components/index.js'
import projectData from '../data/projects.json'

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

const projectFilters = ['All', 'Software', 'Hardware', 'Data Science']

function ProjectsPage() {
  const [activeProjectFilter, setActiveProjectFilter] = useState('All')

  const filteredProjects =
    activeProjectFilter === 'All'
      ? projects
      : projects.filter((project) =>
          project.categories?.includes(activeProjectFilter),
        )

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--surface-container-lowest)] text-[var(--on-background)]">
      <MenuBar fixed />

      <main className="flex-1 px-3.5 py-12 pt-[calc(3.5rem+3rem)] md:px-10 md:py-16 md:pt-[calc(3.5rem+4rem)]">
        <section className="mx-auto max-w-[72rem]">
          <div className="mb-4">
            <p className="font-['Space_Mono'] text-[1.45rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)] md:text-[1.9rem]">
              Projects
            </p>

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

          <div className="mx-auto grid max-w-[72rem] justify-items-center gap-x-3.5 gap-y-3.5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ProjectsPage
