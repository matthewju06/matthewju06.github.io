"use client";

import { useEffect, useRef, useState } from "react";
import {
  about,
  education,
  experience,
  profile,
  projects,
  skills,
  type SiteLink,
} from "@/lib/content";

const STEP = -46;
const COMMIT = 18;

const tracks = [
  { id: "about", code: "1", label: "About" },
  { id: "education", code: "2", label: "Education" },
  { id: "experience", code: "3", label: "Experience" },
  { id: "projects", code: "4", label: "Projects" },
  { id: "skills", code: "5", label: "Skills" },
] as const;

type TrackId = (typeof tracks)[number]["id"];

type GrooveStep = {
  id: string;
  track: TrackId;
  title: string;
  meta?: string;
  stack?: string;
  paragraphs: string[];
  links?: SiteLink[];
  note?: string;
};

const steps: GrooveStep[] = [
  {
    id: "about",
    track: "about",
    title: "About",
    paragraphs: [
      about.lead,
      "I build backend services and data tools, from authenticated APIs and test pipelines to image-analysis services. I interned as a software engineer at Corteva, and I built PearlMetric, Tailor, and ListingLab.",
    ],
  },
  {
    id: "education",
    track: "education",
    title: education.school,
    meta: education.date,
    stack: education.degree,
    paragraphs: [`Coursework: ${education.coursework}`],
  },
  ...experience.map((job) => ({
    id: job.org.toLowerCase(),
    track: "experience" as const,
    title: job.org,
    meta: job.date,
    stack: job.role,
    paragraphs: job.paragraphs,
  })),
  ...projects.map((project) => ({
    id: project.id ?? project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    track: "projects" as const,
    title: project.name,
    stack: project.stack,
    paragraphs: project.paragraphs,
    links: project.links,
    note: project.note,
  })),
  {
    id: "skills",
    track: "skills",
    title: "Skills",
    paragraphs: [],
  },
];

function findStep(hash: string) {
  const exact = steps.findIndex((step) => step.id === hash);
  if (exact >= 0) return exact;
  return steps.findIndex((step) => step.track === hash);
}

function ExternalLink({ link, tone = "label" }: { link: SiteLink; tone?: "label" | "groove" }) {
  const color =
    tone === "groove"
      ? "text-lamp decoration-lamp/50 hover:decoration-lamp"
      : "text-[#f4eadf] decoration-[#f4eadf]/40 hover:decoration-[#f4eadf]";

  return (
    <a
      href={link.href}
      className={`underline underline-offset-4 ${color}`}
      {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {link.label}
    </a>
  );
}

const linkByLabel = Object.fromEntries(profile.links.map((link) => [link.label, link])) as Record<
  string,
  SiteLink
>;
const labelLinks = {
  left: [linkByLabel.Resume, linkByLabel.GitHub],
  right: [linkByLabel.LinkedIn, linkByLabel.Email],
};

function GrooveCut({
  step,
  live,
  onJump,
}: {
  step: GrooveStep;
  live: boolean;
  onJump: (id: string) => void;
}) {
  const track = tracks.find((item) => item.id === step.track);

  return (
    <article
      aria-live={live ? "polite" : undefined}
      className="absolute top-[68%] left-1/2 w-[38%] -translate-x-1/2 font-serif text-paper [text-shadow:0_1px_2px_rgba(0,0,0,0.9)] sm:top-1/2 sm:left-[67%] sm:w-[22%] sm:translate-x-0 sm:-translate-y-1/2"
    >
      <p className="text-sm text-lamp italic sm:text-base">
        {track?.code} {track?.label}
      </p>
      <h2 className="mt-1 text-xl leading-tight tracking-tight sm:text-3xl">{step.title}</h2>
      {step.meta ? <p className="mt-1 text-sm text-[#d9d0c4] tabular-nums sm:text-base">{step.meta}</p> : null}
      {step.stack ? <p className="mt-1 text-sm text-[#d9d0c4] sm:text-base">{step.stack}</p> : null}
      {step.id === "about" ? (
        <>
          <p className="mt-3 text-xl leading-snug sm:text-2xl">{about.lead}</p>
          <p className="mt-3 text-sm leading-4 sm:text-base sm:leading-7">
            I build backend services and data tools, from authenticated APIs and test pipelines to
            image-analysis services. I interned as a software engineer at Corteva, and I built{" "}
            <a
              href="#pearlmetric"
              className="text-lamp underline decoration-lamp/50 underline-offset-4"
              onClick={(event) => {
                event.preventDefault();
                onJump("pearlmetric");
              }}
            >
              PearlMetric
            </a>
            ,{" "}
            <a
              href="#tailor"
              className="text-lamp underline decoration-lamp/50 underline-offset-4"
              onClick={(event) => {
                event.preventDefault();
                onJump("tailor");
              }}
            >
              Tailor
            </a>
            , and{" "}
            <a
              href="https://listing-lab.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-lamp underline decoration-lamp/50 underline-offset-4"
            >
              ListingLab
            </a>
            .
          </p>
        </>
      ) : step.id === "skills" ? (
        <dl className="mt-1 grid grid-cols-2 gap-x-3 sm:mt-3 sm:grid-cols-1 sm:gap-x-0">
          {skills.map((group) => (
            <div key={group.label} className="border-t border-[#3a2e26] py-0 sm:py-1.5">
              <dt className="text-xs text-lamp sm:text-sm">{group.label}</dt>
              <dd className="text-xs leading-3 sm:text-base sm:leading-6">{group.items}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="mt-3 space-y-2 text-sm leading-4 sm:text-base sm:leading-7">
          {step.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
      {step.links && step.links.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm sm:text-base">
          {step.links.map((link) => (
            <li key={link.href}>
              <ExternalLink link={link} tone="groove" />
            </li>
          ))}
        </ul>
      ) : null}
      {step.note ? <p className="mt-3 text-sm text-[#d9d0c4] sm:text-base">{step.note}</p> : null}
    </article>
  );
}

type Motion = {
  x: number;
  v: number;
  target: number;
  stiffness: number;
  damping: number;
};

function stepMotion(motion: Motion, dt: number) {
  const force = (motion.target - motion.x) * motion.stiffness - motion.v * motion.damping;
  motion.v += force * dt;
  motion.x += motion.v * dt;
  return Math.abs(motion.target - motion.x) < 0.06 && Math.abs(motion.v) < 0.45;
}

export function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const modeRef = useRef<"idle" | "drag" | "turn" | "enter">("idle");
  const spinRef = useRef<Motion>({ x: 0, v: 0, target: 0, stiffness: 120, damping: 22 });
  const tiltRef = useRef<Motion>({ x: 0, v: 0, target: 0, stiffness: 150, damping: 12 });
  const restRef = useRef<(() => void) | null>(null);
  const frameRef = useRef(0);
  const [index, setIndex] = useState(0);

  function paint() {
    const spin = spinRef.current;
    const tilt = tiltRef.current;
    if (discRef.current) discRef.current.style.transform = `rotate(${spin.x}deg)`;
    if (textRef.current) {
      textRef.current.style.transform = `rotate(${tilt.x}deg)`;
      const mode = modeRef.current;
      const fade =
        mode === "turn"
          ? 1 - Math.min(1, Math.abs(tilt.x) / Math.abs(STEP))
          : mode === "enter"
            ? 1 - Math.min(1, Math.abs(tilt.x) / 18)
            : 1;
      textRef.current.style.opacity = String(fade);
    }
  }

  function stopSpring() {
    window.clearTimeout(frameRef.current);
    restRef.current = null;
  }

  function schedule(tick: (now: number) => void) {
    frameRef.current = window.setTimeout(() => tick(performance.now()), 16);
  }

  function spring(onRest?: () => void) {
    stopSpring();
    restRef.current = onRest ?? null;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const spinDone = stepMotion(spinRef.current, dt);
      const tiltDone = stepMotion(tiltRef.current, dt);
      paint();
      if (spinDone && tiltDone) {
        spinRef.current.x = spinRef.current.target;
        tiltRef.current.x = tiltRef.current.target;
        spinRef.current.v = 0;
        tiltRef.current.v = 0;
        paint();
        const done = restRef.current;
        restRef.current = null;
        done?.();
        return;
      }
      schedule(tick);
    };
    schedule(tick);
  }

  function snap(target: number) {
    stopSpring();
    indexRef.current = target;
    spinRef.current.x = target * STEP;
    spinRef.current.target = target * STEP;
    spinRef.current.v = 0;
    tiltRef.current.x = 0;
    tiltRef.current.target = 0;
    tiltRef.current.v = 0;
    modeRef.current = "idle";
    setIndex(target);
    paint();
  }

  function reduced() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function beginTurn(dir: 1 | -1) {
    if (modeRef.current === "turn" || modeRef.current === "enter") return;
    const next = indexRef.current + dir;
    if (next < 0 || next >= steps.length) {
      modeRef.current = "idle";
      spinRef.current.target = indexRef.current * STEP;
      tiltRef.current.target = 0;
      tiltRef.current.stiffness = 160;
      tiltRef.current.damping = 12;
      spinRef.current.stiffness = 160;
      spinRef.current.damping = 14;
      spring();
      return;
    }
    if (reduced()) {
      snap(next);
      return;
    }
    modeRef.current = "turn";
    spinRef.current.target = next * STEP;
    tiltRef.current.target = dir * STEP;
    spinRef.current.stiffness = 150;
    spinRef.current.damping = 22;
    tiltRef.current.stiffness = 150;
    tiltRef.current.damping = 22;
    spring(() => {
      indexRef.current = next;
      spinRef.current.x = next * STEP;
      spinRef.current.target = next * STEP;
      spinRef.current.v = 0;
      tiltRef.current.x = -dir * Math.sign(STEP) * 16;
      tiltRef.current.v = 0;
      tiltRef.current.target = 0;
      tiltRef.current.stiffness = 150;
      tiltRef.current.damping = 13;
      modeRef.current = "enter";
      setIndex(next);
      spring(() => {
        modeRef.current = "idle";
      });
    });
  }

  function go(target: number) {
    const current = indexRef.current;
    const next = Math.max(0, Math.min(steps.length - 1, target));
    if (next === current || modeRef.current === "turn" || modeRef.current === "enter") return;
    if (Math.abs(next - current) === 1) {
      beginTurn(next > current ? 1 : -1);
      return;
    }
    if (reduced()) {
      snap(next);
      return;
    }
    modeRef.current = "turn";
    const sign = Math.sign(next - current);
    spinRef.current.target = next * STEP;
    tiltRef.current.target = sign * Math.sign(STEP) * 28;
    spinRef.current.stiffness = 120;
    spinRef.current.damping = 20;
    tiltRef.current.stiffness = 120;
    tiltRef.current.damping = 20;
    spring(() => {
      indexRef.current = next;
      spinRef.current.x = next * STEP;
      spinRef.current.target = next * STEP;
      spinRef.current.v = 0;
      tiltRef.current.x = -sign * Math.sign(STEP) * 14;
      tiltRef.current.v = 0;
      tiltRef.current.target = 0;
      tiltRef.current.stiffness = 150;
      tiltRef.current.damping = 13;
      modeRef.current = "enter";
      setIndex(next);
      spring(() => {
        modeRef.current = "idle";
      });
    });
  }

  function nudge(delta: number) {
    if (modeRef.current === "turn" || modeRef.current === "enter") return;
    stopSpring();
    modeRef.current = "drag";
    const atStart = indexRef.current === 0 && delta < 0;
    const atEnd = indexRef.current === steps.length - 1 && delta > 0;
    const gain = atStart || atEnd ? 0.25 : 1;
    tiltRef.current.x += delta * Math.sign(STEP) * gain;
    const limit = Math.abs(STEP) * 0.78;
    tiltRef.current.x = Math.max(-limit, Math.min(limit, tiltRef.current.x));
    const drift = tiltRef.current.x;
    spinRef.current.x = indexRef.current * STEP + drift;
    tiltRef.current.v = 0;
    spinRef.current.v = 0;
    paint();
    if (Math.abs(drift) >= COMMIT && !atStart && !atEnd) {
      beginTurn(delta > 0 ? 1 : -1);
    }
  }

  function release() {
    if (modeRef.current !== "drag") return;
    const drift = tiltRef.current.x;
    if (Math.abs(drift) >= COMMIT) {
      const dir = Math.sign(drift) === Math.sign(STEP) ? 1 : -1;
      const blocked =
        (dir < 0 && indexRef.current === 0) || (dir > 0 && indexRef.current === steps.length - 1);
      if (!blocked) {
        beginTurn(dir);
        return;
      }
    }
    modeRef.current = "idle";
    spinRef.current.target = indexRef.current * STEP;
    tiltRef.current.target = 0;
    spinRef.current.stiffness = 170;
    spinRef.current.damping = 13;
    tiltRef.current.stiffness = 170;
    tiltRef.current.damping = 12;
    spring();
  }

  useEffect(() => {
    history.scrollRestoration = "manual";
    const lockScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (rootRef.current) rootRef.current.scrollTop = 0;
    };
    lockScroll();
    const hash = window.location.hash.replace(/^#/, "");
    const found = hash ? findStep(hash) : -1;
    if (found > 0) snap(found);
    else paint();
    window.addEventListener("pageshow", lockScroll);
    window.addEventListener("hashchange", lockScroll);
    return () => {
      window.clearTimeout(frameRef.current);
      window.removeEventListener("pageshow", lockScroll);
      window.removeEventListener("hashchange", lockScroll);
    };
  }, []);

  useEffect(() => {
    const id = steps[index].id;
    if (window.location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`);
  }, [index]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let wheelTimer = 0;
    let touchX = 0;
    let touchY = 0;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const vertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
      const delta = vertical ? event.deltaY : -event.deltaX;
      if (delta === 0) return;
      nudge(delta * 0.085);
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(release, 150);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        beginTurn(1);
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        beginTurn(-1);
      }
    };
    const onTouchStart = (event: TouchEvent) => {
      if (modeRef.current === "turn" || modeRef.current === "enter") return;
      touchX = event.touches[0]?.clientX ?? 0;
      touchY = event.touches[0]?.clientY ?? 0;
      stopSpring();
      modeRef.current = "drag";
    };
    const onTouchMove = (event: TouchEvent) => {
      if (modeRef.current === "turn" || modeRef.current === "enter") return;
      const x = event.touches[0]?.clientX ?? touchX;
      const y = event.touches[0]?.clientY ?? touchY;
      const up = touchY - y;
      const right = x - touchX;
      const delta = Math.abs(up) >= Math.abs(right) ? up : right;
      touchX = x;
      touchY = y;
      if (delta === 0) return;
      nudge(delta * 0.18);
    };
    const onTouchEnd = () => release();

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: true });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(wheelTimer);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const activeTrack = steps[index].track;
  const shown = steps[index];

  const trackLinks = (linkClass: string) =>
    tracks.map((track) => {
      const on = activeTrack === track.id;
      const first = steps.findIndex((step) => step.track === track.id);
      return (
        <a
          key={track.id}
          href={`#${track.id}`}
          aria-current={on ? "true" : undefined}
          onClick={(event) => {
            event.preventDefault();
            go(first);
          }}
          className={linkClass}
        >
          {track.code} {track.label}
        </a>
      );
    });

  const transport = (className: string) => (
    <>
      <button
        type="button"
        aria-label="Back"
        disabled={index === 0}
        onClick={() => beginTurn(-1)}
        className={className}
      >
        Back
      </button>
      <button
        type="button"
        aria-label="Next"
        disabled={index === steps.length - 1}
        onClick={() => beginTurn(1)}
        className={className}
      >
        Next
      </button>
    </>
  );

  return (
    <div ref={rootRef} className="wood fixed inset-0 touch-none overflow-clip">
      {[...new Set([...tracks.map((track) => track.id), ...steps.map((step) => step.id)])].map((id) => (
        <span
          key={id}
          id={id}
          className="pointer-events-none absolute top-0 left-0 h-px w-px overflow-clip"
        />
      ))}
      <div className="deck-side plinth absolute top-1/2 right-7 z-40 w-36 -translate-y-1/2 flex-col gap-4">
        <nav aria-label="Tracks" className="flex flex-col gap-2">
          {trackLinks("deck px-3 py-2 text-left text-xs tracking-wide")}
        </nav>
        <div className="flex items-center justify-center gap-3" aria-hidden>
          <div className="knob" style={{ transform: "rotate(-34deg)" }} />
          <div className="knob knob-sm" style={{ transform: "rotate(52deg)" }} />
        </div>
        {transport("deck px-3 py-2 text-sm")}
      </div>

      <nav
        aria-label="Tracks"
        className="deck-split absolute top-3 left-1/2 z-40 w-[calc(100%-1rem)] max-w-3xl -translate-x-1/2 flex-wrap justify-center gap-2"
      >
        {trackLinks("deck shrink-0 px-3 py-1.5 text-xs tracking-wide")}
      </nav>
      <div className="deck-split absolute bottom-4 left-1/2 z-40 -translate-x-1/2 gap-3">
        {transport("deck min-w-16 px-3 py-2 text-sm")}
      </div>

      <div className="absolute inset-x-3 bottom-3 z-40 flex flex-col items-center gap-2 sm:hidden">
        <nav aria-label="Tracks" className="flex max-w-full flex-wrap justify-center gap-1.5">
          {trackLinks("deck px-2 py-1 text-[11px] tracking-wide")}
        </nav>
        <div className="flex gap-2">{transport("deck min-w-16 px-3 py-2 text-sm")}</div>
      </div>

      <div className="absolute top-[32%] left-1/2 h-[min(118cqh,56.25rem)] w-[min(118cqh,56.25rem)] -translate-x-1/2 -translate-y-1/2 overflow-clip rounded-full sm:top-1/2 sm:left-[26%] sm:h-[min(170cqh,93.75rem)] sm:w-[min(170cqh,93.75rem)]">
        <div ref={discRef} className="absolute inset-0">
          <div className="vinyl absolute inset-0 rounded-full" />
        </div>
        <div ref={textRef} className="absolute inset-0 origin-center">
          <GrooveCut step={shown} live onJump={(id) => go(findStep(id))} />
        </div>

        <div className="absolute top-1/2 left-1/2 z-20 aspect-square h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-label text-[#f4eadf] shadow-[inset_0_0_0_1px_rgba(244,234,223,0.35)] sm:h-[26%] sm:w-[26%]">
          <h1 className="absolute top-[18%] left-1/2 -translate-x-1/2 scale-x-[0.58] text-center font-script text-[1.9rem] leading-none font-bold tracking-[-0.04em] whitespace-nowrap uppercase sm:text-[3.7rem]">
            Matthew Ju
          </h1>
          <div className="absolute top-1/2 left-[12%] -translate-y-1/2 space-y-1 text-left text-[8px] tracking-[0.16em] uppercase sm:text-[11px]">
            {labelLinks.left.map((link) => (
              <div key={link.label}>
                <ExternalLink link={link} />
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 right-[12%] -translate-y-1/2 space-y-1 text-right text-[8px] tracking-[0.16em] uppercase sm:text-[11px]">
            {labelLinks.right.map((link) => (
              <div key={link.label}>
                <ExternalLink link={link} />
              </div>
            ))}
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#efeae4] ring-4 ring-[#c4b8ae]"
          />
          <div className="absolute top-[66%] left-1/2 w-[64%] -translate-x-1/2 text-center">
            <p className="text-[9px] tracking-[0.16em] uppercase sm:text-xs">Software and AI Engineer</p>
            <p className="mt-1 text-[8px] leading-3 text-[#f4eadf]/80 sm:text-[11px] sm:leading-4">
              {education.school}
              <br />
              B.S. Computer Science &amp; Statistics
              <br />
              {education.date}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
