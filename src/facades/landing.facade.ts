/**
 * Landing experience facade — Lenis smooth scroll plus GSAP scroll-driven animations.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let teardown: (() => void) | null = null;

export function bootstrapLandingAnimations(): () => void {
	if (typeof document === 'undefined') {
		return () => {};
	}
	if (teardown) {
		return teardown;
	}

	const lenis = new Lenis({
		smoothWheel: true,
		anchors: true,
	});

	lenis.on('scroll', ScrollTrigger.update);

	const tickerCb = (time: number) => {
		lenis.raf(time * 1000);
	};
	gsap.ticker.add(tickerCb);
	gsap.ticker.lagSmoothing(0);

	const heroTl = gsap.timeline({
		delay: 0.05,
		defaults: { ease: 'power3.out' },
	});

	heroTl
		.from('[data-animate="hero-title-1"]', { opacity: 0, yPercent: 110, duration: 0.9 }, 0)
		.from('[data-animate="hero-title-2"]', { opacity: 0, yPercent: 110, duration: 0.85 }, 0.12)
		.from('[data-animate="hero-caption"]', { opacity: 0, y: 20, duration: 0.5 }, '-=0.25')
		.from('[data-animate="hero-cta"]', { opacity: 0, y: 14, duration: 0.45 }, '-=0.3');

	gsap.utils.toArray<HTMLElement>('[data-animate-section]').forEach((section) => {
		gsap.from(section, {
			opacity: 0,
			y: 52,
			duration: 0.88,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: section,
				start: 'top 86%',
				toggleActions: 'play none none none',
				immediateRender: false,
			},
		});
	});

	gsap.from('[data-animate-video-play-inner]', {
		scale: 0.55,
		opacity: 0,
		duration: 0.65,
		ease: 'back.out(1.45)',
		scrollTrigger: {
			trigger: '[data-animate-video-section]',
			start: 'top 78%',
			toggleActions: 'play none none none',
			immediateRender: false,
		},
	});

	gsap.fromTo(
		'[data-animate-footer-brand]',
		{ scale: 0.94, opacity: 0.45 },
		{
			scale: 1,
			opacity: 1,
			ease: 'none',
			scrollTrigger: {
				trigger: '[data-animate-footer-brand]',
				start: 'top 95%',
				end: 'bottom 40%',
				scrub: true,
				immediateRender: false,
			},
		},
	);

	ScrollTrigger.refresh();

	teardown = () => {
		gsap.ticker.remove(tickerCb);
		lenis.destroy();
		ScrollTrigger.getAll().forEach((st) => st.kill());
		heroTl.kill();
		teardown = null;
	};

	return teardown;
}
