import type { ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

interface ScrollZoomHeroProps {
  /** Background image shown behind the headline. */
  image: string;
  /** Small uppercase label above the title, e.g. "Est. 2026". */
  eyebrow?: string;
  /** Main headline. */
  title: string;
  /** Supporting line under the title. */
  subtitle?: string;
  /** Whatever should scroll up normally after the hero effect finishes. */
  children?: ReactNode;
  /** How much the image scales by the end of the effect. */
  zoomTo?: number;
  /** Max blur (px) applied to the image by the end of the effect. */
  blurTo?: number;
}

export default function ScrollZoomHero({
  image,
  eyebrow,
  title,
  subtitle,
  children,
  zoomTo = 1.6,
  blurTo = 14,
}: ScrollZoomHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // scrollYProgress runs 0 -> 1 while the 200vh container scrolls
  // past the pinned (sticky) 100vh viewport beneath it.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  const scale = useTransform(
    smooth,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, zoomTo]
  );
  const blurPx = useTransform(
    smooth,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, blurTo]
  );
  const blur = useMotionTemplate`blur(${blurPx}px)`;
  const imageOpacity = useTransform(smooth, [0, 0.8], [1, 0]);

  const textY = useTransform(
    smooth,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 140]
  );
  const textOpacity = useTransform(smooth, [0, 0.4], [1, 0]);

  return (
    <>
      <section ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          {/* Zooming / blurring / fading image */}
          <motion.div
            style={{ scale, opacity: imageOpacity, filter: blur }}
            className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black"
          >
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/50" />
          </motion.div>

          {/* Headline */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          >
            {eyebrow && (
              <span className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                {eyebrow}
              </span>
            )}
            <h1 className="max-w-4xl text-balance text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-md text-balance text-base text-white/70 sm:text-lg">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/50">
              Scroll
            </span>
            <span className="h-8 w-px animate-pulse bg-white/40" />
          </motion.div>
        </div>
      </section>

      {/* Whatever comes after the hero scrolls up over it normally */}
      <section className="relative bg-white">{children}</section>
    </>
  );
}