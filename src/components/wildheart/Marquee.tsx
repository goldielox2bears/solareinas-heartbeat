interface MarqueeProps {
  items: string[];
}

const Marquee = ({ items }: MarqueeProps) => {
  const doubled = [...items, ...items];
  return (
    <div className="bg-bone border-y-2 border-ink overflow-hidden py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display font-black text-ink text-2xl md:text-3xl tracking-tight px-8 flex items-center gap-8"
          >
            {item}
            <span className="text-rust">★</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
