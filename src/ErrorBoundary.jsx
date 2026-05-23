import { Component } from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center bg-[var(--background)] px-3.5 py-12 text-[var(--on-background)] md:px-10">
          <div className="mx-auto w-full max-w-[40rem] rounded-lg border border-[color:var(--outline-variant)]/18 bg-[color:rgba(27,28,28,0.88)] px-6 py-8">
            <p className="font-['Space_Mono'] text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">
              Error
            </p>
            <h1 className="mt-3 font-['Libre_Caslon_Text'] text-[2rem] tracking-[-0.02em] md:text-[2.4rem]">
              Something went wrong while loading this page.
            </h1>
            <p className="mt-3 max-w-[32rem] font-['Space_Mono'] text-[0.78rem] leading-[1.25rem] text-[var(--on-surface-variant)]">
              Try reloading the page. If the problem persists, return home and try again.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center rounded-full bg-[var(--secondary)] px-4 py-2 font-['Space_Mono'] text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--primary-container)]"
              >
                Reload
              </button>
              <Link
                to="/"
                className="inline-flex items-center rounded-full border border-[color:var(--secondary)]/50 px-4 py-2 font-['Space_Mono'] text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--secondary)]"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
