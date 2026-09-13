'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaAward,
  FaTimes,
  FaArrowRight
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

// Definisi tipe data untuk Project Detail Modal
interface Project {
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  problem: string;
  features: string[];
  tech: string[];
  video?: string;
  link: string;
  github: string;
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const userEmail = "muhammadirsyad@example.com"; // Ganti dengan email aslimu

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Data Projects
  const projects: Project[] = [
    {
      title: "Generative AI Video Showcase",
      category: "AI Video",
      description: "Project video berbasis kecerdasan buatan (AI) yang dirancang untuk konten visual interaktif, narasi dinamis, dan sinematik.",
      fullDescription: "Project eksperimental yang menggabungkan berbagai teknologi kecerdasan buatan untuk merancang konten sinematik. Menggunakan teknik prompt engineering tingkat lanjut untuk menghasilkan konsistensi karakter dan efek visual yang mulus.",
      problem: "Proses pembuatan video tradisional memerlukan waktu produksi yang lama serta alokasi resources yang besar untuk rendering sinematik.",
      features: [
        "Penggenerasian karakter AI yang konsisten antar-scene",
        "Pergerakan kamera sinematik (Pan, Zoom, Tracking)",
        "Pascaproduksi dan penyelarasan audio visual menggunakan CapCut & Flow AI"
      ],
      tech: ["AI Video Gen", "Prompt Engineering", "CapCut", "Flow AI"],
      video: "/video-ai.mp4",
      link: "#",
      github: "#"
    },
    {
      title: "Website Portofolio Interaktif",
      category: "Web Dev",
      description: "Portofolio modern berbasis web yang dibangun menggunakan Next.js, Tailwind CSS, serta efek 3D & animasi Framer Motion.",
      fullDescription: "Website portofolio pribadi modern dengan fokus pada performa cepat, aksesibilitas, serta integrasi visual 3D interaktif yang estetik.",
      problem: "Portofolio statis konvensional sering kali kurang menarik perhatian audiens dan kurang fleksibel dalam menampilkan karya berbasis multimedia interaktif.",
      features: [
        "Integrasi komponen 3D interaktif (Lanyard)",
        "Animasi UI dinamis & transisi modal menggunakan Framer Motion",
        "Desain responsif optimal di semua ukuran layar (Mobile & Desktop)"
      ],
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Three.js", "Framer Motion"],
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
    { name: 'CapCut / Flow AI', desc: 'Video post-processing, tracking, & AI editing' },
  ];

  // Data Statistik
  const stats = [
    { icon: FaProjectDiagram, value: "3+", label: "Projects Completed" },
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
      <nav className="fixed top-6 z-40 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-6 py-3 rounded-full flex items-center gap-6 text-slate-400 text-sm shadow-xl">
        <a href="#about" className="hover:text-white flex items-center gap-2"><FaUser /> About</a>
        <a href="#services" className="hover:text-white flex items-center gap-2"><FaMagic /> What I Can Do</a>
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

      {/* What I Can Do Section (Inspired by Video - 2 Column Layout) */}
      <motion.section 
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full max-w-4xl space-y-8 z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Kiri: Header & Grid Icon Tools */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                MY CAPABILITIES
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                What <span className="text-slate-400">I Can Do</span>
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Saya mengombinasikan keahlian teknis web development, pemecahan masalah, dan pembuatan konten Generative AI untuk membangun sistem web yang andal serta alur kerja digital yang efisien.
              </p>
            </div>

            {/* Grid Icon Tools */}
            <div className="grid grid-cols-4 gap-2.5 pt-2">
              {[
                { icon: SiReact, name: "React", color: "text-cyan-400" },
                { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
                { icon: SiTailwindcss, name: "Tailwind", color: "text-sky-400" },
                { icon: SiTypescript, name: "TypeScript", color: "text-blue-500" },
                { icon: SiNodedotjs, name: "Node.js", color: "text-green-500" },
                { icon: SiGit, name: "Git", color: "text-orange-500" },
                { icon: SiFigma, name: "Figma", color: "text-pink-500" },
                { icon: FaVideo, name: "Flow AI", color: "text-purple-400" },
              ].map((tool, idx) => {
                const IconComponent = tool.icon;
                return (
                  <div 
                    key={idx}
                    title={tool.name}
                    className="w-11 h-11 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center hover:border-blue-500/50 hover:bg-slate-800 transition-all shadow-md group cursor-pointer"
                  >
                    <IconComponent className={`text-lg ${tool.color} group-hover:scale-110 transition-transform`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kolom Kanan: Detail Capabilities Bernomor (01, 02) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Kartu 01: IT & Web Development */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3.5 backdrop-blur-sm relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl font-extrabold text-slate-700 group-hover:text-blue-500/40 transition-colors">
                    01
                  </span>
                  <div className="mt-1 inline-block px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200">
                    IT, WEB DEVELOPMENT & UI/UX
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <FaCode size={18} />
                </div>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed">
                Membangun dan menguji sistem digital fungsional mulai dari arsitektur frontend web berbasis Next.js hingga desain antarmuka responsif yang fokus pada fungsionalitas dan keandalan.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "Web Development",
                  "UI/UX Design",
                  "Bug Identification",
                  "Responsive Design",
                  "Next.js",
                  "React",
                  "Tailwind CSS",
                  "TypeScript"
                ].map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-[10px] bg-slate-950/70 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg font-medium hover:border-slate-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Kartu 02: AI Video & Digital Operations */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3.5 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-500/40 transition-all shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl font-extrabold text-slate-700 group-hover:text-cyan-500/40 transition-colors">
                    02
                  </span>
                  <div className="mt-1 inline-block px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200">
                    AI VIDEO & CREATIVE OPERATIONS
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <FaVideo size={18} />
                </div>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed">
                Menghasilkan video visual sinematik berbasis kecerdasan buatan (Flow AI & CapCut) dan merancang alur konten multimedia interaktif secara efisien.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "Generative AI Video",
                  "Prompt Engineering",
                  "Flow AI",
                  "CapCut Editing",
                  "Content Optimization",
                  "Media Production"
                ].map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-[10px] bg-slate-950/70 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg font-medium hover:border-slate-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
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
          <p className="text-sm text-slate-400">Beberapa hasil karya terbaik yang pernah saya buat (Klik kartu untuk melihat detail)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedProject(project)}
              className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/50 backdrop-blur-sm transition-all shadow-xl overflow-hidden cursor-pointer group"
            >
              <div className="space-y-3">
                {project.video && (
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-800 relative group">
                    <video 
                      src={project.video} 
                      controls 
                      onClick={(e) => e.stopPropagation()}
                      className="w-full h-full object-cover"
                    >
                      Browser kamu tidak mendukung tag video.
                    </video>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <span className="text-[10px] px-2.5 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 font-medium">
                    {project.category}
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 text-slate-400 text-sm border-t border-slate-800/50 mt-4">
                <span className="text-xs text-blue-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Detail Proyek <FaArrowRight size={10} />
                </span>
                <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                  <a href={project.github} className="hover:text-white transition-colors" title="Source Code">
                    <FaGithub size={16} />
                  </a>
                  <a href={project.link} className="hover:text-white transition-colors" title="Live Demo">
                    <FaExternalLinkAlt size={14} />
                  </a>
                </div>
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

      {/* Modal Pop-up Detail Project */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            
            {/* Background Click Overlay */}
            <div 
              className="absolute inset-0" 
              onClick={() => setSelectedProject(null)} 
            />

            {/* Content Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 space-y-6"
            >
              {/* Button Close (X) */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors"
              >
                <FaTimes size={16} />
              </button>

              {/* Video Player Preview */}
              {selectedProject.video && (
                <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <video src={selectedProject.video} controls className="w-full h-full object-cover" />
                </div>
              )}

              {/* Header Title & Category */}
              <div>
                <span className="text-xs font-semibold px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">{selectedProject.title}</h2>
              </div>

              {/* Full Description */}
              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold text-slate-300">Deskripsi Proyek</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{selectedProject.fullDescription}</p>
              </div>

              {/* Problem & Background */}
              {selectedProject.problem && (
                <div className="space-y-1.5 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                  <h4 className="text-sm font-semibold text-blue-400">Problem & Background</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{selectedProject.problem}</p>
                </div>
              )}

              {/* Key Features */}
              {selectedProject.features && (
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-slate-300">Fitur Utama</h4>
                  <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Badges */}
              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold text-slate-300">Teknologi Digunakan</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, idx) => (
                    <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-slate-800">
                <a 
                  href={selectedProject.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-center text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                  <FaExternalLinkAlt size={12} /> Live Demo
                </a>
                <a 
                  href={selectedProject.github} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-center text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <FaGithub size={14} /> Source Code
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}