import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PageLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const loaderMapRef = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    // Add is-loading class to body to coordinate page reveal delays
    document.body.classList.add("is-loading");

    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    // Set initial dasharray and dashoffset to hide path initially
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Initialize plane starting position
    const startPoint = path.getPointAtLength(0);
    const nextPointInit = path.getPointAtLength(2);
    const angleInit = Math.atan2(nextPointInit.y - startPoint.y, nextPointInit.x - startPoint.x) * (180 / Math.PI);
    gsap.set(planeRef.current, {
      x: startPoint.x,
      y: startPoint.y,
      rotation: angleInit,
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      opacity: 1,
    });

    // Particle Trail Spawning logic
    let particleIndex = 0;
    const spawnParticle = (x, y) => {
      const el = document.getElementById(`loader-particle-${particleIndex}`);
      if (el) {
        gsap.killTweensOf(el);
        gsap.set(el, {
          x,
          y,
          scale: Math.random() * 0.4 + 0.6,
          opacity: 0.8,
        });
        gsap.to(el, {
          x: x - (Math.random() * 25 + 15),
          y: y + (Math.random() * 12 - 6),
          scale: 0.1,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
        });
      }
      particleIndex = (particleIndex + 1) % 15;
    };

    // Timeline configuration
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        onComplete();
      },
    });

    const flightData = { progress: 0 };

    // 1. Text sequential animations
    timeline
      .fromTo(".loader-text-1", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.65 }, 0.2)
      .to(".loader-text-1", { opacity: 0, y: -15, duration: 0.45 }, 1.1)

      .fromTo(".loader-text-2", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.65 }, 1.3)
      .to(".loader-text-2", { opacity: 0, y: -15, duration: 0.45 }, 2.2)

      .fromTo(".loader-text-3", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7 }, 2.4);

    // 2. Flight Path drawing & Plane motion
    timeline.to(
      flightData,
      {
        progress: 1,
        duration: 3.0,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentLength = flightData.progress * length;
          const point = path.getPointAtLength(currentLength);

          // Animate drawing path
          gsap.set(path, {
            strokeDashoffset: length - currentLength,
          });

          // Position and rotate plane along the path
          if (planeRef.current) {
            const nextP = path.getPointAtLength(Math.min(currentLength + 2, length));
            const angle = Math.atan2(nextP.y - point.y, nextP.x - point.x) * (180 / Math.PI);

            gsap.set(planeRef.current, {
              x: point.x,
              y: point.y,
              rotation: angle,
            });

            // Spawn trails
            if (Math.random() < 0.4) {
              spawnParticle(point.x, point.y);
            }
          }
        },
      },
      0.1
    );

    // 3. Dubai Marker pulses *before* plane arrives (starting at t = 1.4s)
    timeline.fromTo(
      ".marker-dxb-ring",
      { scale: 0.7, opacity: 0 },
      {
        scale: 2.2,
        opacity: 0,
        duration: 1.1,
        repeat: -1,
        ease: "power1.out",
      },
      1.4
    );

    // 4. Plane landing flash & glow at t = 3.1s (when progress approaches 1)
    timeline.to(
      ".marker-dxb-dot",
      {
        scale: 2.5,
        fill: "#8EC5FF",
        filter: "drop-shadow(0 0 10px #8EC5FF)",
        duration: 0.25,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      },
      3.1
    );

    // 5. Morph/Transition Phase at t = 3.15s
    timeline.call(
      () => {
        // Remove loading state and trigger home page reveal
        document.body.classList.remove("is-loading");
        window.dispatchEvent(new CustomEvent("loader-complete"));
      },
      null,
      3.15
    );

    timeline.to(
      ".loader-bg",
      {
        opacity: 0,
        duration: 0.85,
        ease: "power3.inOut",
      },
      3.15
    );

    timeline.to(
      ".loader-map-bg",
      {
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      3.15
    );

    timeline.to(
      ".loader-text-3",
      {
        opacity: 0,
        y: -15,
        duration: 0.5,
        ease: "power3.in",
      },
      3.25
    );

    // Dynamically calculate and execute the morph scale & translate to match the Home page Hero Globe
    timeline.call(
      () => {
        const mapEl = loaderMapRef.current;
        if (!mapEl) return;

        const heroGlobe = document.querySelector(".hero-globe-container");
        if (heroGlobe) {
          const loaderRect = mapEl.getBoundingClientRect();
          const globeRect = heroGlobe.getBoundingClientRect();

          const loaderCenterX = loaderRect.left + loaderRect.width / 2;
          const loaderCenterY = loaderRect.top + loaderRect.height / 2;

          const globeCenterX = globeRect.left + globeRect.width / 2;
          const globeCenterY = globeRect.top + globeRect.height / 2;

          const deltaX = globeCenterX - loaderCenterX;
          const deltaY = globeCenterY - loaderCenterY;
          const scale = globeRect.width / loaderRect.width;

          gsap.to(mapEl, {
            x: deltaX,
            y: deltaY,
            scale: scale,
            opacity: 0,
            duration: 0.85,
            ease: "power3.inOut",
          });
        } else {
          // Fallback if globe container not found (e.g. non-home page routes)
          gsap.to(mapEl, {
            scale: 1.1,
            opacity: 0,
            duration: 0.7,
            ease: "power3.inOut",
          });
        }
      },
      null,
      3.15
    );

    return () => {
      timeline.kill();
      document.body.classList.remove("is-loading");
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background Panel */}
      <div className="loader-bg absolute inset-0 bg-[#08152D]" />
      
      {/* Background Radial Glow */}
      <div className="loader-bg absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,123,255,0.18),transparent_60%)]" />

      {/* Floating subtle clouds */}
      <div className="loader-bg absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg className="absolute left-10 top-[20%] h-8 w-24 text-white/10 animate-cloud-slow" viewBox="0 0 100 40">
          <path d="M 10 30 Q 15 15, 30 20 Q 40 10, 60 15 Q 75 10, 85 25 Q 95 30, 90 35 Z" fill="currentColor" />
        </svg>
        <svg className="absolute right-20 top-[60%] h-12 w-32 text-white/10 animate-cloud-fast" viewBox="0 0 100 40">
          <path d="M 10 30 Q 15 15, 30 20 Q 40 10, 60 15 Q 75 10, 85 25 Q 95 30, 90 35 Z" fill="currentColor" />
        </svg>
        <svg className="absolute left-[40%] top-[10%] h-10 w-28 text-white/10 animate-cloud-slow" viewBox="0 0 100 40">
          <path d="M 10 30 Q 15 15, 30 20 Q 40 10, 60 15 Q 75 10, 85 25 Q 95 30, 90 35 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 flex h-full w-full max-w-6xl flex-col items-center justify-center px-6">
        
        {/* Map, Flight route & markers wrapper */}
        <div ref={loaderMapRef} className="relative h-[320px] w-full max-w-4xl">
          
          {/* Background dot grid + abstract continent outline */}
          <div className="loader-map-bg absolute inset-0 text-brand-light opacity-12 transition-opacity duration-300">
            <svg className="h-full w-full" viewBox="0 0 1000 400" fill="none">
              <path d="M 50 120 Q 100 90 180 120 T 240 200 T 170 280 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 150 280 Q 220 320 190 390 T 140 370 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 390 80 Q 560 60 860 80 T 960 180 T 820 340 T 620 360 T 470 340 Z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 830 300 Q 910 310 890 380 T 810 360 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              
              <defs>
                <pattern id="dot-grid-loader" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.1" fill="currentColor" opacity="0.25" />
                </pattern>
              </defs>
              <rect width="1000" height="400" fill="url(#dot-grid-loader)" />
            </svg>
          </div>

          {/* SVG Flight Arc, Trails & Markers */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 400">
            <defs>
              <linearGradient id="flight-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8EC5FF" />
                <stop offset="50%" stopColor="#2E7BFF" />
                <stop offset="100%" stopColor="#0057FF" />
              </linearGradient>
              <filter id="path-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing route line path */}
            <path
              ref={pathRef}
              d="M173 233 C 335 132, 496 110, 776 134"
              fill="none"
              stroke="url(#flight-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Subtle wider glowing outline below path */}
            <path
              d="M173 233 C 335 132, 496 110, 776 134"
              fill="none"
              stroke="#2E7BFF"
              strokeWidth="6"
              opacity="0.3"
              filter="url(#path-glow)"
            />

            {/* Particle Elements Pool */}
            {Array.from({ length: 15 }).map((_, i) => (
              <circle
                key={i}
                id={`loader-particle-${i}`}
                r="3"
                fill="#8EC5FF"
                cx="0"
                cy="0"
                className="pointer-events-none"
                style={{ opacity: 0, filter: "drop-shadow(0 0 3px #2E7BFF)" }}
              />
            ))}

            {/* Bangalore Marker */}
            <g transform="translate(173, 233)" className="marker-blr">
              <circle r="4.5" fill="#8EC5FF" />
              <circle r="14" fill="none" stroke="#8EC5FF" strokeWidth="1.5" className="marker-ring" />
              <text
                x="-8"
                y="-18"
                fill="#8EC5FF"
                className="font-display text-[10px] font-bold tracking-[0.25em] opacity-80 uppercase"
                textAnchor="end"
              >
                Bangalore
              </text>
            </g>

            {/* Dubai Marker */}
            <g transform="translate(776, 134)" className="marker-dxb">
              <circle r="4.5" fill="#2E7BFF" className="marker-dxb-dot" />
              <circle r="14" fill="none" stroke="#2E7BFF" strokeWidth="1.5" className="marker-dxb-ring" style={{ transformOrigin: "center" }} />
              <text
                x="14"
                y="18"
                fill="#2E7BFF"
                className="font-display text-[10px] font-bold tracking-[0.25em] opacity-80 uppercase"
              >
                Dubai
              </text>
            </g>
          </svg>

          {/* Plane element (Rendered as absolute overlay positioned by GSAP) */}
          <div
            ref={planeRef}
            className="absolute pointer-events-none origin-center"
            style={{ width: "64px", height: "64px", left: 0, top: 0 }}
          >
            {/* Soft blue glow underneath the airplane */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: "70px",
                height: "36px",
                background: "radial-gradient(ellipse, rgba(46,123,255,0.48) 0%, transparent 75%)",
                filter: "blur(8px)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: "30px",
                height: "16px",
                background: "radial-gradient(ellipse, rgba(142,197,255,0.7) 0%, transparent 75%)",
                filter: "blur(3px)",
              }}
            />

            {/* Plane SVG */}
            <svg
              viewBox="0 0 512 512"
              className="h-full w-full"
              fill="none"
              style={{ transform: "scale(0.8)" }}
            >
              <polygon fill="#E2E8F0" points="267.342,237.829 173.993,0 226.41,0 377.713,237.829 " />
              <path
                fill="#FFFFFF"
                d="M497.958,259.18l-14.559-7.004l-6.745-14.284c-19.342-13.812-48.901-24.332-93.788-24.332c-142.684,0-328.62,0-328.62,0l-20.761-53.215H0v138.37h257.708L173.993,512h52.417c21.565-37.033,130.957-205.984,135.685-213.286H512C512,291.494,509.359,275.432,497.958,259.18z"
              />
              <g>
                <path
                  fill="#3B82F6"
                  d="M477.952,262.091h12.133c3.005,0,5.75-1.098,7.868-2.907c-5.136-7.322-12.051-14.679-21.303-21.286c-6.088,0.65-10.831,5.801-10.831,12.061C465.819,256.658,471.251,262.091,477.952,262.091z"
                />
                <path
                  fill="#2E7BFF"
                  d="M429.421,262.091h-12.133c-6.701,0-12.133-5.433-12.133-12.133s5.432-12.133,12.133-12.133h12.133c6.701,0,12.133,5.433,12.133,12.133S436.121,262.091,429.421,262.091z"
                />
                <path
                  fill="#2E7BFF"
                  d="M368.758,262.091h-12.133c-6.701,0-12.133-5.433-12.133-12.133s5.432-12.133,12.133-12.133h12.133c6.701,0,12.133,5.433,12.133,12.133S375.457,262.091,368.758,262.091z"
                />
                <path
                  fill="#2E7BFF"
                  d="M308.094,262.091h-12.133c-6.701,0-12.133-5.433-12.133-12.133s5.432-12.133,12.133-12.133h12.133c6.701,0,12.133,5.433,12.133,12.133S314.794,262.091,308.094,262.091z"
                />
                <path
                  fill="#2E7BFF"
                  d="M247.431,262.091h-12.133c-6.701,0-12.133-5.433-12.133-12.133s5.432-12.133,12.133-12.133h12.133c6.701,0,12.133,5.433,12.133,12.133S254.13,262.091,247.431,262.091z"
                />
                <path
                  fill="#2E7BFF"
                  d="M186.767,262.091h-12.133c-6.701,0-12.133-5.433-12.133-12.133s5.432-12.133,12.133-12.133h12.133c6.701,0,12.133,5.433,12.133,12.133S193.467,262.091,186.767,262.091z"
                />
                <path
                  fill="#2E7BFF"
                  d="M126.104,262.091h-12.133c-6.701,0-12.133-5.433-12.133-12.133s5.432-12.133,12.133-12.133h12.133c6.701,0,12.133,5.433,12.133,12.133S132.803,262.091,126.104,262.091z"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Elegant typography sequence at the bottom */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-xl text-center font-display">
          <div className="relative h-16 flex items-center justify-center overflow-hidden">
            <p className="loader-text-1 absolute text-sm uppercase tracking-[0.3em] text-brand-light/95 opacity-0">
              Connecting Global Talent
            </p>
            <p className="loader-text-2 absolute text-sm uppercase tracking-[0.3em] text-brand-light/95 opacity-0">
              From Bangalore to Dubai
            </p>
            <h1 className="loader-text-3 absolute text-2xl font-bold tracking-[0.16em] text-white sm:text-3xl opacity-0 w-full">
              AZION
              <span className="block mt-1.5 text-xs font-medium uppercase tracking-[0.35em] text-brand-light/70">
                Your Global Workforce Partner
              </span>
            </h1>
          </div>
        </div>

      </div>
    </div>
  );
}
