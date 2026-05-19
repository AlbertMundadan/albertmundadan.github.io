function ProjectCard({ project }) {
  if (project.isPlaceholder) {
    return (
      <article className="flex h-[20rem] w-full max-w-[24.25rem] flex-col overflow-hidden rounded-lg border border-dashed border-[color:var(--outline-variant)]/30 bg-[color:rgba(42,42,42,0.4)]">
        <div className="aspect-[16/9] w-full max-h-[7.35rem] shrink-0 border-b border-dashed border-[color:var(--outline-variant)]/20 bg-[color:rgba(53,53,53,0.3)]" />
        <div className="flex flex-1 flex-col justify-center px-4 py-4 text-center">
          <h3 className="font-['Libre_Caslon_Text'] text-[1.08rem] font-bold leading-tight text-[color:var(--outline)]">
            {project.title}
          </h3>
          <p className="mt-2 font-['Space_Mono'] text-[0.68rem] leading-[1.15rem] text-[color:var(--outline)]/80">
            {project.description}
          </p>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex h-[20rem] w-full max-w-[24.25rem] flex-col overflow-hidden rounded-lg border border-[color:var(--outline-variant)]/15 bg-[var(--surface-container-high)] shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--secondary)]/18 hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)]">
      <div className="aspect-[16/9] w-full max-h-[7.35rem] shrink-0 overflow-hidden border-b border-[color:var(--outline-variant)]/10 bg-[var(--surface-container-highest)]">
        {project.imageSrc ? (
          <img
            src={project.imageSrc}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[2rem] text-[color:var(--outline)]/25">
              {project.icon}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-4 pt-3">
        <div className="mb-2.5 flex items-center gap-1.5">
          <span className="text-[1.2rem] leading-none text-[var(--secondary)]/90">
            {project.icon}
          </span>
          <h3 className="font-['Libre_Caslon_Text'] text-[1.12rem] leading-[1.18] font-bold text-[var(--on-background)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[var(--tertiary)]">
            {project.title}
          </h3>
        </div>

        <p className="project-description-clamp mb-3 font-sans text-[0.8rem] leading-[1.08rem] font-medium text-[var(--on-surface-variant)]">
          {project.description}
        </p>

        <div className="mb-3.5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[color:var(--secondary)]/24 bg-[color:var(--secondary)]/4 px-2.5 py-1 font-sans text-[0.65rem] font-semibold tracking-[0.02em] text-[var(--secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pb-3">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--secondary)] px-4.5 py-2 font-['Space_Mono'] text-[0.73rem] font-bold uppercase tracking-[0.08em] text-[var(--primary-container)] shadow-[0_0_12px_rgba(200,198,197,0.16)] transition-transform hover:scale-105"
          >
            Details
            <span aria-hidden="true" className="text-[0.9rem] leading-none">
              ↗
            </span>
          </button>
          {project.code ? (
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--secondary)]/36 px-4.5 py-2 font-['Space_Mono'] text-[0.73rem] font-bold uppercase tracking-[0.08em] text-[var(--secondary)] transition-colors hover:bg-[color:var(--secondary)]/6"
            >
              Code
              <span aria-hidden="true" className="text-[0.9rem] leading-none">
                &lt;&gt;
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
