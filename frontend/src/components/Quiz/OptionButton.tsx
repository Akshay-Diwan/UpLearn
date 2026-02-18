
interface OptionButtonProps {
  option: string,
  index: number,
  isSelected: boolean
  onSelect: (option: string) => void

}
export  function OptionButton({ option, index, isSelected, onSelect }: OptionButtonProps) {
  const labels = ["A","B","C","D"];
  return (
     <button
      onClick={() => onSelect(option)}
      aria-pressed={isSelected}
      className={[
        "w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-200 group",
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 hover:shadow-sm",
      ].join(" ")}
    >
      <span
        className={[
          "shrink-0 w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center transition-colors duration-200",
          isSelected
            ? "bg-blue-500 text-white"
            : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600",
        ].join(" ")}
      >
        {labels[index]}
      </span>
      <span
        className={[
          "text-base transition-colors duration-200",
          isSelected ? "text-blue-700 font-medium" : "text-slate-700",
        ].join(" ")}
      >
        {option}
      </span>
    </button>
  );
}