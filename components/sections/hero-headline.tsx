const LEAD = "From idea to launched product -";
const ACCENT = "built end to end.";

/**
 * Per-word entrance for the hero h1. Deliberately CSS-only, no framer-motion
 * - this heading is almost certainly the LCP element (92vh hero, no image,
 * text-7xl on desktop). A framer-motion m.span with initial={{opacity:0}}
 * renders as an inline `opacity:0` style, which Chrome does not count
 * toward LCP - it would defer LCP until hydration completes AND the
 * stagger finishes. This version starts animating on the first paint
 * frame, with no JS dependency at all, using the same fade-up keyframe and
 * expo curve as the rest of the hero.
 *
 * The accent phrase ("built end to end.") stays in ONE span rather than
 * being split per word: text-gradient uses background-clip:text painted
 * against that element's own box, so splitting it into separate word spans
 * would restart the gradient at each word instead of sweeping smoothly
 * across the phrase. It enters as a single trailing beat instead.
 *
 * The full sentence lives in an aria-label on the <h1> so it reads as one
 * clean accessible name; every span is aria-hidden so nothing is announced
 * word-by-word. The real text still sits in the DOM for crawlers and text
 * extraction - only the accessible-name path is deduplicated.
 */
export function HeroHeadline() {
  const words = LEAD.split(" ");

  return (
    <h1
      aria-label={`${LEAD} ${ACCENT}`}
      className="mt-5 font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
    >
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden="true"
          className="inline-block animate-fade-up"
          style={{ animationDelay: `${140 + i * 45}ms` }}
        >
          {word}{" "}
        </span>
      ))}
      <span
        aria-hidden="true"
        className="inline-block animate-fade-up text-gradient"
        style={{ animationDelay: `${140 + words.length * 45}ms` }}
      >
        {ACCENT}
      </span>
    </h1>
  );
}
