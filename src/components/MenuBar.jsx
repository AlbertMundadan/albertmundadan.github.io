import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import headerMark from '../assets/images/Name.png'
import { siteNavLinks } from '../siteNav.js'

function getNavClass(isActive, size) {
  const baseClass =
    size === 'mobile'
      ? "pl-3 font-['Space_Mono'] text-[9px] font-bold uppercase tracking-[0.16em] transition-all duration-300"
      : "font-['Space_Mono'] text-[12px] font-bold uppercase tracking-[0.16em] transition-colors duration-500"

  if (size === 'mobile') {
    return isActive
      ? `${baseClass} border-l-2 border-[var(--secondary)] text-[var(--secondary)]`
      : `${baseClass} text-[var(--outline)] hover:bg-[color:var(--surface-variant)]/20`
  }

  return isActive
    ? `${baseClass} text-[var(--secondary)]`
    : `${baseClass} text-[var(--on-surface-variant)] hover:text-[var(--secondary)]`
}

function MenuBar({ fixed = false }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsDrawerOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={`${fixed ? 'fixed top-0 z-50' : 'relative'} flex h-14 w-full items-center justify-between border-b border-[color:var(--outline-variant)]/20 bg-[color:rgba(19,19,19,0.9)] px-3.5 backdrop-blur-xl md:px-7`}
      >
        <button
          type="button"
          className="font-['Space_Mono'] text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--on-surface-variant)] transition-colors hover:text-[var(--secondary)] md:hidden"
          onClick={() => setIsDrawerOpen(true)}
        >
          Menu
        </button>
        <Link to="/" className="ml-auto md:ml-0">
          <img
            src={headerMark}
            alt="Albert Mundadan"
            className="h-4.5 w-auto object-contain md:h-[1.8rem]"
          />
        </Link>
        <div className="flex items-center gap-3.5">
          <nav className="hidden gap-8 md:flex">
            {siteNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => getNavClass(isActive, 'desktop')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

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
            {siteNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => getNavClass(isActive, 'mobile')}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuBar
