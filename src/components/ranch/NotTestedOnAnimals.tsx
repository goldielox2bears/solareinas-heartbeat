const NotTestedOnAnimals = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <p className="font-label uppercase tracking-[0.32em] text-[0.7rem] text-primary-foreground/70 mb-5">
          — Our Promise
        </p>
        <h2 className="font-prairie-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
          Not Tested on Animals.<br />
          <span className="italic">Tested on Ranch Life.</span>
        </h2>
        <div className="h-px w-20 bg-primary-foreground/40 mx-auto my-8" />
        <p className="font-prairie-body text-base md:text-lg text-primary-foreground/90 leading-relaxed">
          We try every product ourselves first — on hardworking hands, dry
          mountain skin, sun, wind, and the daily chaos of caring for animals.
          The animals are never the test subjects. They&rsquo;re the reason.
        </p>
      </div>
    </section>
  );
};

export default NotTestedOnAnimals;
