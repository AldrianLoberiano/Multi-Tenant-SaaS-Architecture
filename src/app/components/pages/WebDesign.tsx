import { useState } from "react";
import { motion } from "motion/react";
import { Heart, ArrowUpRight, Paintbrush } from "lucide-react";
import { ImageWithFallback } from "../model/ImageWithFallback";

const scheduleproImg = "/images/schedulepro_Saas.png";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const projects = [
  {
    title: "SchedulePro",
    desc: "A next-generation multi-tenant SaaS platform",
    year: "2025",
    img: scheduleproImg,
  },
];

export function WebDesign() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggle = (i: number) =>
    setLiked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-indigo-400 text-xs tracking-widest uppercase mb-2">
          <div className="w-2 h-2 rounded-full bg-indigo-400" />
          Design
        </div>
        <h1 className="text-3xl lg:text-4xl text-white tracking-tight">
          Web Design
        </h1>
        <p className="text-white/40 mt-2 max-w-2xl">
          Visual designs and product previews for the SchedulePro SaaS platform.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            {/* Card */}
            <div className="relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl group">
              <ImageWithFallback
                src={project.img}
                alt={project.title}
                className="w-full object-cover object-top"
              />
              {/* Heart button */}
              <button
                onClick={() => toggle(i)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <Heart
                  className="w-4 h-4"
                  fill={liked[i] ? "#f43f5e" : "transparent"}
                  stroke={liked[i] ? "#f43f5e" : "white"}
                />
              </button>
              {/* Arrow button */}
              <button className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Meta */}
            <div className="mt-4 px-1">
              <p className="text-xs text-white/40 mb-1">
                Web Design
                <span className="mx-2">•</span>
                {project.year}
              </p>
              <h2 className="text-white text-lg tracking-tight">{project.title}</h2>
              <p className="text-white/40 text-sm mt-0.5">{project.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
