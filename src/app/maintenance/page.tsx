export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-amber-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Site en construction</h1>
        <p className="text-xl text-slate-300 mb-8">Clarisse Surin — Avocat au Barreau de Paris</p>
        <p className="text-slate-400">Notre site sera bientôt disponible.</p>
      </div>
    </div>
  )
}
