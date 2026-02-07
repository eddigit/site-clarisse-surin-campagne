"use client";

import { motion } from "framer-motion";
import { Scale, Users, Shield, Briefcase, Heart, Globe, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8 text-[#c9a55c]" />
            <span className="font-['Cormorant_Garamond'] text-xl font-semibold text-white">
              Barreau de Paris 2027
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#candidats" className="text-white/80 hover:text-[#c9a55c] transition-colors font-['Outfit']">Candidats</a>
            <a href="#programme" className="text-white/80 hover:text-[#c9a55c] transition-colors font-['Outfit']">Programme</a>
            <a href="#engagements" className="text-white/80 hover:text-[#c9a55c] transition-colors font-['Outfit']">Engagements</a>
            <a href="#contact" className="text-white/80 hover:text-[#c9a55c] transition-colors font-['Outfit']">Contact</a>
            <Link href="/v2" className="px-3 py-1.5 border border-[#c9a55c]/50 text-[#c9a55c] rounded-full text-xs font-['Outfit'] hover:bg-[#c9a55c]/10 transition-all">
              V2
            </Link>
            <Link href="/v3" className="px-3 py-1.5 bg-[#c9a55c] text-[#0a0f1c] rounded-full text-xs font-['Outfit'] hover:bg-[#d4b76a] transition-all">
              V3
            </Link>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-[#c9a55c] transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-[#c9a55c] transition-all ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-[#c9a55c] transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden mt-4 pb-4 flex flex-col gap-4"
          >
            <a href="#candidats" className="text-white/80 hover:text-[#c9a55c] transition-colors font-['Outfit']">Candidats</a>
            <a href="#programme" className="text-white/80 hover:text-[#c9a55c] transition-colors font-['Outfit']">Programme</a>
            <a href="#engagements" className="text-white/80 hover:text-[#c9a55c] transition-colors font-['Outfit']">Engagements</a>
            <a href="#contact" className="text-white/80 hover:text-[#c9a55c] transition-colors font-['Outfit']">Contact</a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f1c]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c]/80 via-[#0a0f1c]/60 to-[#0a0f1c]" />
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a55c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#c9a55c]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full border border-[#c9a55c]/30 text-[#c9a55c] text-sm font-['Outfit'] tracking-wider uppercase">
              Élection Bâtonnier 2027
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="font-['Cormorant_Garamond'] text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-6 leading-tight"
          >
            Ensemble pour un
            <span className="block text-gradient">Barreau d&apos;Excellence</span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="font-['Outfit'] text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 font-light"
          >
            Une vision moderne et ambitieuse pour défendre nos valeurs, 
            protéger nos confrères et faire rayonner le Barreau de Paris.
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#programme"
              className="group flex items-center gap-2 px-8 py-4 bg-[#c9a55c] text-[#0a0f1c] rounded-full font-['Outfit'] font-medium hover:bg-[#d4b76a] transition-all"
            >
              Découvrir notre programme
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#candidats"
              className="px-8 py-4 border border-white/20 text-white rounded-full font-['Outfit'] font-medium hover:bg-white/5 transition-all"
            >
              Rencontrer les candidats
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: "30 000+", label: "Avocats représentés" },
            { number: "200", label: "Ans d'histoire" },
            { number: "1er", label: "Barreau d'Europe" },
            { number: "100%", label: "Engagement" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold text-[#c9a55c] mb-2">
                {stat.number}
              </div>
              <div className="font-['Outfit'] text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[#c9a55c] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

function CandidatesSection() {
const candidates = [
      {
        name: "Clarisse Surin",
        role: "Candidate Bâtonnière",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f1dffb1-af34-4504-ad53-002ab57ea34a/Clarisse-Surin-Barreau-de-Paris-agrandi-1768856738089.png?width=8000&height=8000&resize=contain",
        description: "Avocate au Barreau de Paris depuis 25 ans, spécialisée en droit des affaires et en arbitrage international. Ancienne membre du Conseil de l'Ordre.",
        expertise: ["Droit des affaires", "Arbitrage international", "Médiation"],
        quote: "Je crois en un Barreau solidaire, moderne et engagé pour défendre les droits de tous."
      },
    {
      name: "Philippe Moreau",
      role: "Candidat Vice-Bâtonnier",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
      description: "Avocat pénaliste reconnu, 20 ans d'expérience. Défenseur acharné des libertés individuelles et de l'accès au droit pour tous.",
      expertise: ["Droit pénal", "Libertés publiques", "Droits de l'Homme"],
      quote: "Notre force réside dans notre unité et notre capacité à nous adapter aux défis de demain."
    }
  ];

  return (
    <section id="candidats" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f1c]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a55c]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-[#c9a55c]/30 text-[#c9a55c] text-sm font-['Outfit'] tracking-wider uppercase mb-6">
            Notre binôme
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl font-semibold text-white mb-6">
            Vos Candidats
          </h2>
          <p className="font-['Outfit'] text-xl text-white/60 max-w-2xl mx-auto">
            Deux personnalités complémentaires, une vision commune pour l&apos;avenir du Barreau de Paris.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {candidates.map((candidate, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group"
            >
              <div className="relative glass rounded-3xl overflow-hidden">
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={candidate.image}
                    alt={candidate.name}
                    fill
                    className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent" />
                </div>

                <div className="p-8">
                  <div className="mb-4">
                    <span className="text-[#c9a55c] font-['Outfit'] text-sm tracking-wider uppercase">
                      {candidate.role}
                    </span>
                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-white mt-2">
                      {candidate.name}
                    </h3>
                  </div>

                  <p className="font-['Outfit'] text-white/70 mb-6 leading-relaxed">
                    {candidate.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {candidate.expertise.map((exp, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-[#c9a55c]/10 text-[#c9a55c] rounded-full text-sm font-['Outfit']"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>

                  <blockquote className="border-l-2 border-[#c9a55c] pl-4 italic font-['Cormorant_Garamond'] text-lg text-white/80">
                    &ldquo;{candidate.quote}&rdquo;
                  </blockquote>
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
    {
      icon: Users,
      title: "Leadership Féminin",
      description: "Promouvoir l'égalité hommes-femmes à la tête des cabinets d'avocats et dans les instances dirigeantes du Barreau.",
      items: ["Parité dans les instances", "Mentorat pour les avocates", "Lutte contre les discriminations"]
    },
    {
      icon: Briefcase,
      title: "Attractivité de la Profession",
      description: "Réformer le numerus clausus et créer la grande famille du droit pour renforcer l'attractivité de notre profession.",
      items: ["Réforme du numerus clausus", "Grande famille du droit", "Valorisation du métier"]
    },
    {
      icon: Scale,
      title: "Déontologie & Numérique",
      description: "Adapter nos règles déontologiques aux évolutions numériques et à l'intelligence artificielle.",
      items: ["Charte éthique IA", "Règles numériques", "Secret professionnel digital"]
    },
    {
      icon: Shield,
      title: "Défense de la profession",
      description: "Protéger les intérêts des avocats face aux réformes judiciaires et garantir le secret professionnel.",
      items: ["Secret professionnel renforcé", "Dialogue avec les pouvoirs publics", "Protection sociale améliorée"]
    },
    {
      icon: Heart,
      title: "Solidarité confraternelle",
      description: "Renforcer les liens entre confrères et développer l'entraide au sein de notre Barreau.",
      items: ["Fonds de solidarité", "Mentorat jeunes avocats", "Réseau d'entraide"]
    },
    {
      icon: Globe,
      title: "Rayonnement international",
      description: "Faire du Barreau de Paris le leader européen et renforcer nos partenariats mondiaux.",
      items: ["Partenariats internationaux", "Formation à l'international", "Promotion du droit français"]
    }
  ];

  return (
    <section id="programme" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] via-[#111827] to-[#0a0f1c]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-[#c9a55c]/30 text-[#c9a55c] text-sm font-['Outfit'] tracking-wider uppercase mb-6">
            Notre vision
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl font-semibold text-white mb-6">
            Programme 2027-2029
          </h2>
          <p className="font-['Outfit'] text-xl text-white/60 max-w-2xl mx-auto">
            Six piliers fondamentaux pour construire le Barreau de demain.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group glass rounded-2xl p-8 hover:border-[#c9a55c]/40 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-[#c9a55c]/10 flex items-center justify-center mb-6 group-hover:bg-[#c9a55c]/20 transition-colors">
                <pillar.icon className="w-7 h-7 text-[#c9a55c]" />
              </div>

              <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-white mb-4">
                {pillar.title}
              </h3>

              <p className="font-['Outfit'] text-white/60 mb-6 leading-relaxed">
                {pillar.description}
              </p>

              <ul className="space-y-2">
                {pillar.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 font-['Outfit']">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a55c]" />
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

function EngagementsSection() {
  const engagements = [
    "Promouvoir l'égalité hommes-femmes à la direction des cabinets",
    "Réformer le numerus clausus pour renforcer l'attractivité",
    "Créer la grande famille du droit avec les professions juridiques",
    "Adapter la déontologie aux évolutions numériques et IA",
    "Négocier une revalorisation de l'aide juridictionnelle",
    "Organiser des états généraux de la profession"
  ];

  return (
    <section id="engagements" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f1c]">
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#c9a55c]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-[#c9a55c]/30 text-[#c9a55c] text-sm font-['Outfit'] tracking-wider uppercase mb-6">
              Nos promesses
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-semibold text-white mb-6">
              6 Engagements<br />
              <span className="text-gradient">Concrets</span>
            </h2>
            <p className="font-['Outfit'] text-xl text-white/60 mb-8 leading-relaxed">
              Des mesures concrètes et mesurables, pour un mandat au service de tous les avocats parisiens.
            </p>

            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
                alt="Justice"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {engagements.map((engagement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group glass rounded-xl p-6 hover:border-[#c9a55c]/40 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9a55c] text-[#0a0f1c] flex items-center justify-center font-['Outfit'] font-bold">
                    {idx + 1}
                  </div>
                  <p className="font-['Outfit'] text-lg text-white/90 pt-1.5">
                    {engagement}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a55c]/20 via-[#c9a55c]/10 to-[#c9a55c]/20" />
      <div className="absolute inset-0 bg-[#0a0f1c]/90" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Scale className="w-16 h-16 text-[#c9a55c] mx-auto mb-8" />
          
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl font-semibold text-white mb-6">
            Rejoignez le Mouvement
          </h2>
          
          <p className="font-['Outfit'] text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Ensemble, construisons un Barreau de Paris plus fort, plus solidaire et plus moderne. 
            Votre voix compte, votre engagement aussi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact"
              className="group flex items-center gap-2 px-8 py-4 bg-[#c9a55c] text-[#0a0f1c] rounded-full font-['Outfit'] font-medium hover:bg-[#d4b76a] transition-all"
            >
              Nous contacter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#programme"
              className="px-8 py-4 border border-[#c9a55c]/50 text-[#c9a55c] rounded-full font-['Outfit'] font-medium hover:bg-[#c9a55c]/10 transition-all"
            >
              Télécharger le programme
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-20 border-t border-[#c9a55c]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-8 h-8 text-[#c9a55c]" />
              <span className="font-['Cormorant_Garamond'] text-xl font-semibold text-white">
                Campagne 2027
              </span>
            </div>
            <p className="font-['Outfit'] text-white/60 leading-relaxed">
              Pour un Barreau de Paris d&apos;excellence, solidaire et tourné vers l&apos;avenir.
            </p>
          </div>

          <div>
            <h4 className="font-['Cormorant_Garamond'] text-xl font-semibold text-white mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <a href="mailto:contact@campagne2027.fr" className="flex items-center gap-3 text-white/60 hover:text-[#c9a55c] transition-colors font-['Outfit']">
                <Mail className="w-5 h-5" />
                contact@campagne2027.fr
              </a>
              <a href="tel:+33140398000" className="flex items-center gap-3 text-white/60 hover:text-[#c9a55c] transition-colors font-['Outfit']">
                <Phone className="w-5 h-5" />
                01 40 39 80 00
              </a>
              <div className="flex items-center gap-3 text-white/60 font-['Outfit']">
                <MapPin className="w-5 h-5" />
                Maison du Barreau, Paris
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-['Cormorant_Garamond'] text-xl font-semibold text-white mb-6">
              Liens rapides
            </h4>
            <div className="space-y-3">
              <a href="#candidats" className="block text-white/60 hover:text-[#c9a55c] transition-colors font-['Outfit']">Nos candidats</a>
              <a href="#programme" className="block text-white/60 hover:text-[#c9a55c] transition-colors font-['Outfit']">Programme complet</a>
              <a href="#engagements" className="block text-white/60 hover:text-[#c9a55c] transition-colors font-['Outfit']">Nos engagements</a>
              <a href="https://www.avocatparis.org" target="_blank" rel="noopener noreferrer" className="block text-white/60 hover:text-[#c9a55c] transition-colors font-['Outfit']">Barreau de Paris</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#c9a55c]/10 text-center">
          <p className="font-['Outfit'] text-white/40 text-sm">
            © 2027 Campagne Bâtonnier de Paris. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0f1c]">
      <Navigation />
      <HeroSection />
      <CandidatesSection />
      <ProgrammeSection />
      <EngagementsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
