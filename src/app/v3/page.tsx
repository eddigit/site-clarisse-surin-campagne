"use client";

import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = clientX - centerX;
    const y = clientY - centerY;
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-hover]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white mix-blend-difference pointer-events-none z-[100] hidden lg:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: isHovering ? 3 : 1,
      }}
    />
  );
}

function Grain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 brightness-100 contrast-150"></div>
    </div>
  );
}

function VersionSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 min-w-[200px]"
          >
            <p className="text-white/50 text-xs uppercase tracking-wider mb-3 font-['Bebas_Neue']">Versions</p>
            <div className="space-y-2">
              <Link href="/" className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all font-['Instrument_Sans']">
                V1 — Classique
              </Link>
              <Link href="/v2" className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all font-['Instrument_Sans']">
                V2 — Tech
              </Link>
              <div className="px-4 py-2 text-white bg-white/10 rounded-lg font-['Instrument_Sans']">
                V3 — Expérience
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Magnetic>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
          data-hover
        >
          {isOpen ? <X className="w-5 h-5" /> : <span className="font-['Bebas_Neue'] text-lg">V3</span>}
        </button>
      </Magnetic>
    </div>
  );
}

function IntroLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-[2px] bg-white mb-8 mx-auto"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/50 text-sm tracking-[0.3em] uppercase font-['Instrument_Sans']"
        >
          Barreau de Paris 2025
        </motion.p>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={containerRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image - Tour Eiffel */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1549144511-f099e773c147?w=1920&q=80"
            alt="Tour Eiffel Paris"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        </div>
        
        <motion.div style={{ opacity, scale }} className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative w-full max-w-[1800px] mx-auto px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-screen py-32">
              <motion.div
                style={{ y: y1 }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 2.8 }}
                className="relative group"
                data-hover
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f1dffb1-af34-4504-ad53-002ab57ea34a/Clarisse-Surin-Barreau-de-Paris-agrandi-1768856738089.png?width=8000&height=8000&resize=contain"
                    alt="Clarisse Surin"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-white/50 text-sm tracking-[0.2em] uppercase font-['Instrument_Sans'] block mb-2">
                      Candidate Bâtonnière
                    </span>
                    <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white tracking-wide">
                      Clarisse
                      <br />
                      Surin
                    </h2>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 3 }}
                className="text-center lg:py-20"
              >
                <div className="mb-8">
                  <span className="inline-block px-6 py-2 rounded-full border border-white/20 text-white/60 text-sm tracking-[0.15em] uppercase font-['Instrument_Sans']">
                    Élection 2025
                  </span>
                </div>

                <h1 className="font-['Bebas_Neue'] text-[12vw] lg:text-[8rem] leading-[0.85] tracking-tight text-white mb-8">
                  DEUX
                  <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                    VISIONS
                  </span>
                  <br />
                  UNE
                  <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                    AMBITION
                  </span>
                </h1>

                <p className="font-['Instrument_Sans'] text-white/40 max-w-sm mx-auto text-lg leading-relaxed">
                  Ensemble, réinventons le Barreau de Paris pour le rendre plus moderne, plus solidaire, plus influent.
                </p>

                <motion.div
                  className="mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5 }}
                >
                  <Magnetic>
                    <a
                      href="#manifeste"
                      className="inline-flex items-center gap-3 text-white font-['Instrument_Sans'] group"
                      data-hover
                    >
                      <span className="text-sm tracking-wider uppercase">Découvrir notre manifeste</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </a>
                  </Magnetic>
                </motion.div>
              </motion.div>

              <motion.div
                style={{ y: y2 }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 2.9 }}
                className="relative group lg:mt-32"
                data-hover
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                    alt="Philippe Moreau"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-white/50 text-sm tracking-[0.2em] uppercase font-['Instrument_Sans'] block mb-2">
                      Candidat Vice-Bâtonnier
                    </span>
                    <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white tracking-wide">
                      Philippe
                      <br />
                      Moreau
                    </h2>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-[0.2em] uppercase font-['Instrument_Sans']">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

function HorizontalScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  const items = [
    {
      title: "Leadership Féminin",
      desc: "Promouvoir l'égalité hommes-femmes à la tête des cabinets d'avocats.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
    },
    {
      title: "Attractivité de la Profession",
      desc: "Réformer le numerus clausus et créer la grande famille du droit.",
      image: "https://images.unsplash.com/photo-1521791136364-798a7bc0d262?w=800&q=80"
    },
    {
      title: "Déontologie & IA",
      desc: "Adapter nos règles aux évolutions numériques et à l'intelligence artificielle.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
    }
  ];

  return (
    <section ref={targetRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 pl-16">
          <div className="flex flex-col justify-center min-w-[300px] pr-8">
            <span className="text-white/30 text-sm tracking-[0.3em] uppercase font-['Instrument_Sans'] block mb-4">
              Nos engagements
            </span>
            <h2 className="font-['Bebas_Neue'] text-6xl text-white leading-none">
              LES CHANTIERS
              <br />
              PRIORITAIRES
            </h2>
          </div>

          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative h-[420px] w-[480px] flex-shrink-0 overflow-hidden rounded-3xl bg-neutral-900"
              data-hover
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform">
                <h3 className="font-['Bebas_Neue'] text-3xl text-white mb-3">{item.title}</h3>
                <p className="font-['Instrument_Sans'] text-white/60 text-base max-w-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ManifesteSection() {
  const words = ["Modernité", "Solidarité", "Excellence", "Innovation", "Justice", "Avenir"];
  
  return (
    <section id="manifeste" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...words, ...words, ...words].map((word, idx) => (
            <span key={idx} className="font-['Bebas_Neue'] text-[15vw] text-white/[0.03] tracking-wider">
              {word}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <span className="text-white/30 text-sm tracking-[0.3em] uppercase font-['Instrument_Sans'] block mb-6">
              Notre manifeste
            </span>
            <h2 className="font-['Bebas_Neue'] text-6xl md:text-8xl text-white leading-[0.9] mb-8">
              LE BARREAU
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>
                DE DEMAIN
              </span>
              <br />
              SE CONSTRUIT
              <br />
              AUJOURD&apos;HUI
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { num: "01", title: "Leadership Féminin", desc: "Promouvoir l'égalité hommes-femmes à la tête des cabinets et dans les instances dirigeantes." },
              { num: "02", title: "Attractivité de la Profession", desc: "Réformer le numerus clausus et créer la grande famille du droit." },
              { num: "03", title: "Déontologie & IA", desc: "Adapter nos règles déontologiques aux évolutions numériques et à l'intelligence artificielle." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group flex gap-6 p-6 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10"
                data-hover
              >
                <span className="font-['Bebas_Neue'] text-4xl text-white/20 group-hover:text-white/40 transition-colors">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-['Bebas_Neue'] text-2xl text-white mb-2 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-['Instrument_Sans'] text-white/50 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CandidatesDetailSection() {
  const [activeCandidate, setActiveCandidate] = useState(0);
  
  const candidates = [
    {
      name: "Clarisse Surin",
      role: "Bâtonnière",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f1dffb1-af34-4504-ad53-002ab57ea34a/Clarisse-Surin-Barreau-de-Paris-agrandi-1768856738089.png?width=8000&height=8000&resize=contain",
      quote: "L'innovation n'est pas une option, c'est notre responsabilité envers les générations futures d'avocats.",
      bio: "25 ans au Barreau de Paris. Spécialiste en droit des affaires et arbitrage international. Ancienne membre du Conseil de l'Ordre. Pionnière de la transformation numérique des cabinets.",
      engagements: ["Lab IA du Barreau", "Formation continue digitale", "Parité au Conseil"]
    },
    {
      name: "Philippe Moreau",
      role: "Vice-Bâtonnier",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80",
      quote: "Moderniser sans perdre notre âme, innover en préservant nos valeurs fondamentales.",
      bio: "20 ans d'expérience en droit pénal. Défenseur des libertés individuelles. Engagé pour l'accès au droit pour tous. Formateur reconnu auprès des jeunes avocats.",
      engagements: ["Aide juridictionnelle revalorisée", "Fonds de solidarité", "Mentorat structuré"]
    }
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex gap-4 mb-16 justify-center">
          {candidates.map((candidate, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCandidate(idx)}
              className={`px-8 py-4 rounded-full font-['Bebas_Neue'] text-xl tracking-wider transition-all ${
                activeCandidate === idx
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
              }`}
              data-hover
            >
              {candidate.name.split(' ')[0]}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCandidate}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image
                  src={candidates[activeCandidate].image}
                  alt={candidates[activeCandidate].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -bottom-8 -right-8 w-48 h-48 bg-white rounded-3xl p-6 flex flex-col justify-center shadow-2xl"
              >
                <span className="font-['Bebas_Neue'] text-6xl text-black">25+</span>
                <span className="font-['Instrument_Sans'] text-black/60 text-sm">années d&apos;expérience</span>
              </motion.div>
            </div>

            <div>
              <span className="text-white/30 text-sm tracking-[0.3em] uppercase font-['Instrument_Sans'] block mb-4">
                {candidates[activeCandidate].role}
              </span>
              <h2 className="font-['Bebas_Neue'] text-6xl md:text-7xl text-white mb-6 tracking-wide">
                {candidates[activeCandidate].name}
              </h2>
              
              <blockquote className="text-2xl text-white/70 font-['Instrument_Sans'] italic mb-8 leading-relaxed">
                &ldquo;{candidates[activeCandidate].quote}&rdquo;
              </blockquote>

              <p className="font-['Instrument_Sans'] text-white/50 mb-10 leading-relaxed">
                {candidates[activeCandidate].bio}
              </p>

              <div>
                <span className="text-white/30 text-xs tracking-[0.2em] uppercase font-['Instrument_Sans'] block mb-4">
                  Engagements prioritaires
                </span>
                <div className="flex flex-wrap gap-3">
                  {candidates[activeCandidate].engagements.map((eng, idx) => (
                    <span
                      key={idx}
                      className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 font-['Instrument_Sans'] text-sm"
                    >
                      {eng}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "30 000", label: "Avocats au Barreau" },
    { value: "N°1", label: "Barreau d'Europe" },
    { value: "200", label: "Ans d'histoire" },
    { value: "2025", label: "Nouvelle ère" }
  ];

  return (
    <section className="relative py-16 overflow-hidden border-y border-white/10 bg-white/5">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <span className="font-['Bebas_Neue'] text-7xl md:text-8xl text-white block mb-2">
                {stat.value}
              </span>
              <span className="font-['Instrument_Sans'] text-white/40 text-sm tracking-wider uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="relative py-20">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-['Bebas_Neue'] text-6xl md:text-[10rem] text-white leading-none mb-12">
            REJOIGNEZ
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>
              LE MOUVEMENT
            </span>
          </h2>
          
          <Magnetic>
            <a
              href="mailto:contact@barreau2025.fr"
              className="inline-flex items-center gap-6 px-16 py-8 bg-white text-black rounded-full font-['Bebas_Neue'] text-3xl tracking-wider hover:scale-105 transition-transform shadow-2xl"
              data-hover
            >
              Écrire l&apos;histoire
              <ArrowRight className="w-8 h-8" />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-['Bebas_Neue'] text-2xl text-white tracking-wider">
            BARREAU 2025
          </span>
          
          <div className="flex items-center gap-8">
            <Link href="/" className="font-['Instrument_Sans'] text-white/40 hover:text-white text-sm transition-colors">
              V1 Classique
            </Link>
            <Link href="/v2" className="font-['Instrument_Sans'] text-white/40 hover:text-white text-sm transition-colors">
              V2 Tech
            </Link>
            <span className="font-['Instrument_Sans'] text-white/40 text-sm">
              © 2025
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function V3Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Sans:wght@400;500;600;700&display=swap');
        
        html {
          cursor: none;
          scroll-behavior: smooth;
        }
        
        @media (max-width: 1024px) {
          html {
            cursor: auto;
          }
        }

        ::selection {
          background: white;
          color: black;
        }
      `}</style>

      <AnimatePresence>
        {isLoading && <IntroLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        <Grain />
        <Cursor />
        <VersionSwitcher />
        <HeroSection />
        <ManifesteSection />
        <HorizontalScrollSection />
        <CandidatesDetailSection />
        <StatsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
