
export function NavigationButtons(
    { isFirst, isLast, canProceed, onPrev, onNext, onSubmit }:
    {isFirst: boolean, isLast: boolean, canProceed: boolean, onPrev: () => void, onNext: () => void , onSubmit: ()=> void}
) {
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
      <button
        onClick={onPrev}
        disabled={isFirst}
        className={[
          "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
          isFirst
            ? "text-slate-300 cursor-not-allowed"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
        ].join(" ")}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      {isLast ? (
        <button
          onClick={onSubmit}
          disabled={!canProceed}
          className={[
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
            canProceed
              ? "bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow-md"
              : "bg-slate-100 text-slate-400 cursor-not-allowed",
          ].join(" ")}
        >
          Submit Quiz
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={[
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
            canProceed
              ? "bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow-md"
              : "bg-slate-100 text-slate-400 cursor-not-allowed",
          ].join(" ")}
        >
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}