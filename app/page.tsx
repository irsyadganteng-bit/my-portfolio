'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaFileAlt, 
  FaCode, 
  FaUser, 
  FaBriefcase, 
  FaExternalLinkAlt,
  FaCheck,
  FaCopy,
  FaMagic,
  FaVideo,
  FaProjectDiagram,
  FaAward
} from 'react-icons/fa';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiNodedotjs, 
  SiGit, 
  SiFigma 
} from 'react-icons/si';
import Lanyard from '@/components/Lanyard';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const userEmail = "muhammadirsyad@example.com"; // Ganti dengan email aslimu

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projects = [
    {
      title: "Generative AI Video Showcase",
      description: "Project video berbasis kecerdasan buatan (AI) yang dirancang untuk konten visual interaktif, narasi dinamis, dan sinematik.",
      tech: ["AI Video Gen", "Prompt Engineering", "CapCut / Runway"],
      video: "/video-ai.mp4",
      link: "#",
      github: "#"
    },
    {
      title: "Website Portofolio Interaktif",
      description: "Portofolio modern berbasis web yang dibangun menggunakan Next.js, Tailwind CSS, serta efek 3D & animasi Framer Motion.",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Three.js"],
      link: "#",
      github: "#"
    }
  ];

  // Tech Stack dengan Icon dan Glow Warna
  const techStack = [
    { name: 'React', icon: SiReact, color: 'hover:border-cyan-400 hover:shadow-cyan-500/20 text-cyan-400' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'hover:border-white hover:shadow-white/20 text-white' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'hover:border-sky-400 hover:shadow-sky-500/20 text-sky-400' },
    { name: 'TypeScript', icon: SiTypescript, color: 'hover:border-blue-500 hover:shadow-blue-500/20 text-blue-500' },
    { name: 'Node.js', icon: SiNodedotjs, color: 'hover:border-green-500 hover:shadow-green-500/20 text-green-500' },
    { name: 'Git', icon: SiGit, color: 'hover:border-orange-500 hover:shadow-orange-500/20 text-orange-500' },
    { name: 'Figma', icon: SiFigma, color: 'hover:border-pink-500 hover:shadow-pink-500/20 text-pink-500' },
  ];

  // AI & Creative Tools
  const aiTools = [
    { name: 'Generative AI Video', desc: 'Text-to-Video & Image-to-Video Generation' },
    { name: 'Prompt Engineering', desc: 'Crafting precise prompts for optimal AI visual outputs' },
    { name: 'CapCut / Runway', desc: 'Video post-processing, tracking, & editing' },
  ];

  // Data Statistik
  const stats = [
    { icon: FaProjectDiagram, value: "5+", label: "Projects Completed" },
    { icon: FaAward, value: "1+ Thn", label: "Experience" },
    { icon: FaCode, value: "100%", label: "Responsive Design" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6 space-y-24 py-12 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Floating Navbar */}
      <nav className="fixed top-6 z-50 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-6 py-3 rounded-full flex items-center gap-6 text-slate-400 text-sm shadow-xl">
        <a href="#about" className="hover:text-white flex items-center gap-2"><FaUser /> About</a>
        <a href="#skills" className="hover:text-white flex items-center gap-2"><FaCode /> Skills</a>
        <a href="#projects" className="hover:text-white flex items-center gap-2"><FaBriefcase /> Projects</a>
        <a href="#contact" className="hover:text-white flex items-center gap-2"><FaEnvelope /> Contact</a>
      </nav>

      {/* Hero Section */}
      <motion.section 
        id="about"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center max-w-3xl space-y-5 pt-20 z-10 w-full flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          Available for Hire & Projects
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Halo, Saya <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">Muhammad Irsyad Alhafidz Riyadi</span>
        </h1>
        
        <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          Web Developer & AI Content Specialist. Saya menciptakan aplikasi web yang interaktif, cepat, serta pengalaman konten visual berbasis kecerdasan buatan.
        </p>

        {/* Lanyard 3D Card Area */}
        <div className="w-full flex justify-center -my-6 relative z-10">
          <Lanyard />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 relative z-20 pt-2">
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-500/25 transform hover:scale-105"
          >
            Hubungi Saya
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium flex items-center gap-2 transition-all border border-slate-800 transform hover:scale-105"
          >
            <FaFileAlt size={18} /> Resume / CV
          </a>
          <button
            onClick={handleCopyEmail}
            className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium flex items-center gap-2 transition-all border border-slate-800"
            title="Salin Email"
          >
            {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
            <span>{copied ? "Copied!" : "Copy Email"}</span>
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 pt-2 text-slate-400 relative z-20">
          <a href="#" className="hover:text-white transition-colors transform hover:scale-110"><FaGithub size={22} /></a>
          <a href="#" className="hover:text-white transition-colors transform hover:scale-110"><FaLinkedin size={22} /></a>
          <a href="#contact" className="hover:text-white transition-colors transform hover:scale-110"><FaEnvelope size={22} /></a>
        </div>
      </motion.section>

      {/* Highlights / Stats Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4 z-10"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl flex items-center gap-4 backdrop-blur-sm"
            >
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </motion.section>

      {/* Tech Stack & Tools Section */}
      <motion.section 
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full max-w-3xl space-y-6 z-10"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">Tech Stack & Tools</h2>
          <p className="text-sm text-slate-400">Teknologi yang saya gunakan untuk mengembangkan aplikasi web modern</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.08, y: -4 }}
                className={`flex items-center gap-2.5 px-5 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-sm font-medium transition-all shadow-lg backdrop-blur-md cursor-pointer ${tech.color}`}
              >
                <Icon size={18} />
                <span className="text-slate-200">{tech.name}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* AI & Creative Specialties Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full max-w-3xl space-y-6 z-10"
      >
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-semibold mb-2 border border-cyan-500/20">
            <FaMagic /> Specialized Workflows
          </div>
          <h2 className="text-2xl font-bold">AI Video & Media Capabilities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiTools.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl space-y-2 backdrop-blur-sm hover:border-slate-700 transition-all"
            >
              <div className="text-cyan-400">
                <FaVideo size={20} />
              </div>
              <h3 className="font-semibold text-white text-base">{item.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full max-w-3xl space-y-6 z-10"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <p className="text-sm text-slate-400">Beberapa hasil karya terbaik yang pernah saya buat</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -6 }}
              className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-700 backdrop-blur-sm transition-all shadow-xl overflow-hidden"
            >
              <div className="space-y-3">
                {/* Menampilkan Pemutar Video jika properti 'video' ada */}
                {project.video && (
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-800 relative group">
                    <video 
                      src={project.video} 
                      controls 
                      className="w-full h-full object-cover"
                    >
                      Browser kamu tidak mendukung tag video.
                    </video>
                  </div>
                )}

                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-md border border-blue-500/20 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6 text-slate-400 text-sm border-t border-slate-800/50 mt-4">
                <a href={project.github} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <FaGithub size={16} /> Code
                </a>
                <a href={project.link} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <FaExternalLinkAlt size={14} /> Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Journey Timeline */}
      <motion.section 
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full max-w-3xl space-y-6 z-10"
      >
        <h2 className="text-2xl font-bold text-center">Journey Timeline</h2>
        <div className="border-l-2 border-slate-800 ml-4 pl-6 space-y-8">
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-slate-950" />
            <span className="text-xs text-blue-400 font-semibold">2024 - PRESENT</span>
            <h3 className="text-lg font-bold text-white">Informatics Student</h3>
            <p className="text-slate-400 text-sm">Fokus mempelajari pengembangan aplikasi web interaktif, AI, dan sistem perangkat lunak.</p>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full max-w-xl space-y-6 z-10 bg-slate-900/40 p-8 border border-slate-800 rounded-2xl backdrop-blur-sm shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center">Contact Me</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Nama</label>
            <input type="text" placeholder="Nama kamu" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input type="email" placeholder="email@contoh.com" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Pesan</label>
            <textarea rows={4} placeholder="Tuliskan pesan..." className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white" />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/25">
            Kirim Pesan
          </button>
        </form>
      </motion.section>

    </main>
  );
}