export function QuizContainer({ children, title }: {children: React.ReactElement, title: string}) {
  return (
    <main className="w-screen max-[100%] overflow-hidden bg-slate-50 flex items-start justify-center px-4 py-12 m-0">
      <div className="w-full max-w-2xl">
        {/* App header */}
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-base font-bold text-slate-800">{title}</span>
          </div>
          <p className="text-slate-400 text-sm">Test your knowledge, one question at a time.</p>
        </header>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {children}
        </div>
      </div>
    </main>
  );
}