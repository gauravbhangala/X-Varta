import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="bg-black overflow-x-hidden min-h-screen flex items-center justify-center">
      <section className="relative px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-acid/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div>
            <h1 className="font-bebas text-9xl text-cyan mb-6">404</h1>
          </div>

          <div>
            <h2 className="font-bebas text-5xl md:text-6xl text-white mb-6">Page Not Found</h2>
          </div>

          <p className="text-lg text-muted mb-12 leading-relaxed">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan to-acid text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition-all"
            >
              Back to Home
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M9 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-card border border-cyan/20 text-cyan font-bold rounded-lg hover:border-cyan/40 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
