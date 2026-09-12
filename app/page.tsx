'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt, FaCode, FaUser, FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiNodedotjs, SiGit, SiFigma } from 'react-icons/si';
import Lanyard from '@/components/Lanyard';

export default function Home() {
  const projects = [
    {
      title: "Generative AI Video Showcase",
      description: "Project video berbasis kecerdasan buatan (AI) yang dirancang untuk konten visual interaktif dan kreatif.",
      tech: ["AI Video Gen", "Prompt Engineering", "CapCut / Runway"],
      video: "/video-ai.mp4", // Mengambil file video dari folder public/video-ai.mp4
      link: "#",
      github: "#"
    },
    {
      title: "Website Portofolio Interaktif",
      description: "Portofolio modern yang dibangun menggunakan Next.js dan Tailwind CSS dengan tema gelap.",
      tech: ["Next.js", "Tailwind CSS", "TypeScript"],
      link: "#",
      github: "#"
    }
  ];

  // Data Tech Stack dengan Icon dan Warna Efek
  const techStack = [
    { name: 'React', icon: SiReact, color: 'hover:border-cyan-400 hover:shadow-cyan-500/20 text-cyan-400' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'hover:border-white hover:shadow-white/20 text-white' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'hover:border-sky-400 hover:shadow-sky-500/20 text-sky-400' },
    { name: 'TypeScript', icon: SiTypescript, color: 'hover:border-blue-500 hover:shadow-blue-500/20 text-blue-500' },
    { name: 'Node.js', icon: SiNodedotjs, color: 'hover:border-green-500 hover:shadow-green-500/20 text-green-500' },
    { name: 'Git', icon: SiGit, color: 'hover:border-orange-500 hover:shadow-orange-500/20 text-orange-500' },
    { name: 'Figma', icon: SiFigma, color: 'hover:border-pink-500 hover:shadow-pink-500/20 text-pink-500' },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6 space-y-20 py-12 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Navbar */}
      <nav className="fixed top-6 z-50 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-6 py-3 rounded-full flex items-center gap-6 text-slate-400 text-sm shadow-xl">
        <a href="#about" className="hover:text-white flex items-center gap-2"><FaUser /> About</a>
        <a href="#skills" className="hover:text-white flex items-center gap-2"><FaCode /> Skills</a>
        <a href="#projects" className="hover:text-white flex items-center gap-2"><FaBriefcase /> Projects</a>
        <a href="#contact" className="hover:text-white flex items-center gap-2"><FaEnvelope /> Contact</a>
      </nav>

      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center max-w-3xl space-y-4 pt-20 z-10 w-full flex flex-col items-center"
      >
        <div className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
          Available for Hire
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Halo, Saya <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Muhammad Irsyad Alhafidz Riyadi</span>
        </h1>
        
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Web Developer & Designer. Saya fokus membuat aplikasi web yang interaktif, cepat, dan responsif.
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
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 pt-4 text-slate-400 relative z-20">
          <a href="#" className="hover:text-white transition-colors transform hover:scale-110"><FaGithub size={22} /></a>
          <a href="#" className="hover:text-white transition-colors transform hover:scale-110"><FaLinkedin size={22} /></a>
          <a href="#" className="hover:text-white transition-colors transform hover:scale-110"><FaEnvelope size={22} /></a>
        </div>
      </motion.section>

      {/* Tech Stack / Skills Section */}
      <motion.section 
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full max-w-3xl space-y-6 z-10"
      >
        <h2 className="text-2xl font-bold text-center">Tech Stack & Tools</h2>
        <div className="flex flex-wrap justify-center gap-4">
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

      {/* Projects Section */}
      <motion.section 
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full max-w-3xl space-y-6 z-10"
      >
        <h2 className="text-2xl font-bold text-center">Featured Projects</h2>
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
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-800">
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
                    <span key={idx} className="text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-md border border-blue-500/20">
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

      {/* Experience / Journey Section */}
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
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-blue-500 rounded-full" />
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