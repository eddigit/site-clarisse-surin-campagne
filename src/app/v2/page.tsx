"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Zap, Network, Shield, Users, Globe, ChevronDown, Mail, Linkedin, Twitter, Briefcase } from "lucide-react";

function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-violet-500/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent blur-3xl" />
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
              <div className="absolute inset-[2px] bg-black rounded-lg rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-['Space_Grotesk'] font-bold text-lg">B</span>
            </div>
            <span className="font-['Space_Grotesk'] text-white font-medium tracking-tight">
              Barreau <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">2025</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {['Vision', 'Candidats', 'Programme', 'IA & Innovation'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ & /g, '-')}`}
                className="px-4 py-2 text-white/60 hover:text-white font-['Space_Grotesk'] text-sm transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-full transition-all" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3 py-1.5 text-xs font-['Space_Grotesk'] text-white/50 hover:text-white border border-white/10 rounded-full hover:border-white/30 transition-all"
            >
              V1
            </Link>
            <Link
              href="/v3"
              className="px-3 py-1.5 text-xs font-['Space_Grotesk'] text-black bg-white rounded-full hover:bg-white/90 transition-all"
            >
              V3
            </Link>
            <a
              href="#contact"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-full font-['Space_Grotesk'] text-sm font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-['Space_Grotesk'] text-violet-300">Élection Bâtonnier 2025</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-['Syne'] text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95] tracking-tight"
        >
          Le Barreau
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
            entre dans l&apos;ère
          </span>
          <br />
          de l&apos;Intelligence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-['Space_Grotesk'] text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Une vision audacieuse pour transformer notre profession. 
          <span className="text-white/80"> IA, innovation, accessibilité</span> — 
          construisons ensemble le Barreau de demain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#vision"
            className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-['Space_Grotesk'] font-medium hover:bg-white/90 transition-all"
          >
            Découvrir notre vision
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#candidats"
            className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-full font-['Space_Grotesk'] font-medium hover:bg-white/5 transition-all"
          >
            Rencontrer le binôme
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-24 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "30K+", label: "Avocats" },
            { value: "N°1", label: "Europe" },
            { value: "2025", label: "Transformation" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="font-['Syne'] text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                {stat.value}
              </div>
              <div className="font-['Space_Grotesk'] text-sm text-white/40 mt-2 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-8 h-8 text-white/30" />
      </motion.div>
    </section>
  );
}

function VisionSection() {
  const features = [
    {
      icon: Users,
      title: "Leadership Féminin",
      description: "Promouvoir l'égalité hommes-femmes à la tête des cabinets d'avocats et favoriser la parité dans les instances dirigeantes.",
      gradient: "from-fuchsia-500 to-pink-600"
    },
    {
      icon: Briefcase,
      title: "Attractivité de la Profession",
      description: "Réformer le numerus clausus et créer la grande famille du droit pour renforcer l'attractivité de notre métier.",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Déontologie & IA",
      description: "Adapter nos règles déontologiques aux évolutions numériques et à l'intelligence artificielle tout en préservant nos valeurs.",
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <section id="vision" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-violet-400 text-sm font-['Space_Grotesk'] mb-6">
            Notre vision
          </span>
          <h2 className="font-['Syne'] text-4xl md:text-6xl font-bold text-white mb-6">
            Réinventer la profession
          </h2>
          <p className="font-['Space_Grotesk'] text-xl text-white/50 max-w-2xl mx-auto">
            Face à la révolution numérique, le Barreau doit évoluer pour mieux servir la justice.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all h-full">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-['Syne'] text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="font-['Space_Grotesk'] text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CandidatesSection() {
const candidates = [
      {
        name: "Clarisse Surin",
        role: "Bâtonnière",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f1dffb1-af34-4504-ad53-002ab57ea34a/Clarisse-Surin-Barreau-de-Paris-agrandi-1768856738089.png?width=8000&height=8000&resize=contain",
        quote: "L'innovation n'est pas une option, c'est notre responsabilité envers les générations futures d'avocats.",
        expertise: ["Droit des affaires", "Arbitrage", "LegalTech"]
      },
    {
      name: "Philippe Moreau",
      role: "Vice-Bâtonnier",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
      quote: "Moderniser sans perdre notre âme, innover en préservant nos valeurs fondamentales.",
      expertise: ["Droit pénal", "Libertés", "Numérique"]
    }
  ];

  return (
    <section id="candidats" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-['Space_Grotesk'] mb-6">
            Le binôme
          </span>
          <h2 className="font-['Syne'] text-4xl md:text-6xl font-bold text-white mb-6">
            Deux visions, une ambition
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {candidates.map((candidate, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all bg-gradient-to-b from-white/[0.04] to-transparent">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-full min-h-[300px]">
                    <Image
                      src={candidate.image}
                      alt={candidate.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 md:block hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-['Space_Grotesk'] text-sm uppercase tracking-wider mb-2">
                      {candidate.role}
                    </span>
                    <h3 className="font-['Syne'] text-3xl font-bold text-white mb-4">
                      {candidate.name}
                    </h3>
                    <p className="font-['Space_Grotesk'] text-white/60 italic mb-6 leading-relaxed">
                      &ldquo;{candidate.quote}&rdquo;
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.expertise.map((exp, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-['Space_Grotesk'] text-white/70"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgrammeSection() {
  const pillars = [
    { icon: Users, title: "Leadership Féminin", items: ["Parité dans les instances", "Mentorat pour les avocates", "Égalité à la direction des cabinets"] },
    { icon: Briefcase, title: "Attractivité Profession", items: ["Réforme numerus clausus", "Grande famille du droit", "Valorisation du métier"] },
    { icon: Shield, title: "Déontologie & IA", items: ["Charte éthique IA", "Règles numériques adaptées", "Secret professionnel digital"] },
    { icon: Globe, title: "Rayonnement mondial", items: ["Hub LegalTech européen", "Partenariats internationaux", "Export du droit français"] },
    { icon: Zap, title: "Accès à la justice", items: ["Consultations en ligne", "IA pour l'aide juridictionnelle", "Simplification des procédures"] },
    { icon: Network, title: "Gouvernance moderne", items: ["Vote électronique", "Transparence totale", "Démocratie participative"] }
  ];

  return (
    <section id="programme" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-fuchsia-400 text-sm font-['Space_Grotesk'] mb-6">
            Programme 2025-2027
          </span>
          <h2 className="font-['Syne'] text-4xl md:text-6xl font-bold text-white mb-6">
            6 piliers pour demain
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-6 rounded-2xl border border-white/10 hover:border-violet-500/50 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
                  <pillar.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-['Syne'] text-xl font-semibold text-white">
                  {pillar.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {pillar.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-['Space_Grotesk'] text-white/60 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section id="ia-innovation" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 text-violet-300 text-sm font-['Space_Grotesk'] mb-6">
              Intelligence Artificielle
            </span>
            <h2 className="font-['Syne'] text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Déontologie adaptée
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                à l&apos;ère numérique
              </span>
            </h2>
            <p className="font-['Space_Grotesk'] text-lg text-white/50 mb-8 leading-relaxed">
              Notre engagement : adapter nos règles déontologiques aux évolutions numériques 
              et à l&apos;intelligence artificielle, tout en préservant nos valeurs fondamentales.
            </p>

            <div className="space-y-4">
              {[
                "Charte éthique de l'IA dans la profession",
                "Adaptation des règles déontologiques au numérique",
                "Protection du secret professionnel à l'ère digitale",
                "Formation aux enjeux éthiques de l'IA"
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-['Space_Grotesk'] text-white/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20" />
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)
                  `,
                  backgroundSize: '24px 24px'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="w-64 h-64 rounded-full border border-violet-500/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute w-48 h-48 rounded-full border border-cyan-500/30"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-32 h-32 rounded-full border border-fuchsia-500/30"
                />
                <div className="absolute w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                  <Cpu className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/30 to-transparent" />
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-['Syne'] text-4xl md:text-6xl font-bold text-white mb-6">
            Prêt à construire
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
              le futur ensemble ?
            </span>
          </h2>
          <p className="font-['Space_Grotesk'] text-xl text-white/50 mb-10 max-w-2xl mx-auto">
            Rejoignez le mouvement. Votre voix façonnera le Barreau de demain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-full font-['Space_Grotesk'] font-medium hover:shadow-2xl hover:shadow-violet-500/30 transition-all text-lg"
            >
              Rejoindre le mouvement
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="relative py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg rotate-45" />
                <div className="absolute inset-[2px] bg-black rounded-lg rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center text-white font-['Space_Grotesk'] font-bold">B</span>
              </div>
              <span className="font-['Space_Grotesk'] text-white font-medium">Barreau 2025</span>
            </div>
            <p className="font-['Space_Grotesk'] text-white/50 max-w-sm leading-relaxed mb-6">
              Construisons ensemble un Barreau de Paris innovant, solidaire et tourné vers l&apos;avenir.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Mail].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Icon className="w-5 h-5 text-white/60" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-['Syne'] text-lg font-semibold text-white mb-4">Navigation</h4>
            <div className="space-y-3">
              {['Vision', 'Candidats', 'Programme', 'IA & Innovation'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block font-['Space_Grotesk'] text-white/50 hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-['Syne'] text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3 font-['Space_Grotesk'] text-white/50">
              <p>contact@barreau2025.fr</p>
              <p>Maison du Barreau</p>
              <p>Paris, France</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['Space_Grotesk'] text-white/30 text-sm">
            © 2025 Campagne Bâtonnier. Tous droits réservés.
          </p>
          <Link href="/" className="font-['Space_Grotesk'] text-white/30 hover:text-white/60 text-sm transition-colors">
            Voir la version classique →
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function V2Page() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap');
      `}</style>
      <GridBackground />
      <FloatingOrbs />
      <Navigation />
      <HeroSection />
      <VisionSection />
      <CandidatesSection />
      <ProgrammeSection />
      <AISection />
      <CTASection />
      <Footer />
    </main>
  );
}
