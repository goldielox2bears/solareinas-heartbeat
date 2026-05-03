interface SectionKickerProps {
  number?: string;
  label: string;
  headline: string;
  scribbleWord?: string;
  className?: string;
  align?: "left" | "center";
}

const SectionKicker = ({
  number,
  label,
  headline,
  scribbleWord,
  className = "",
  align = "left",
}: SectionKickerProps) => {
  const renderHeadline = () => {
    if (!scribbleWord) return headline;
    const parts = headline.split(scribbleWord);
    return (
      <>
        {parts[0]}
        <span className="font-hand text-rust scribble-under">{scribbleWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <div className="kicker mb-3">
        {number && <span className="text-ink/60 mr-2">{number}</span>}
        <span>— {label}</span>
      </div>
      <h2 className="font-display font-black text-ink text-4xl md:text-6xl leading-[1.05] tracking-tight">
        {renderHeadline()}
      </h2>
    </div>
  );
};

export default SectionKicker;
