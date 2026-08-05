"use client"
import { Shell } from "../../components/layout/Shell-temp";
import { motion } from "framer-motion";
import { Plus, MoreVertical, Copy, Download, Trash2, Edit } from "lucide-react";
import { Button } from "../../components/ui/button";

const resumes = [
  {
    id: "1",
    title: "Senior Frontend Engineer - Google",
    updatedAt: "Updated 2 hours ago",
    status: "Active",
    image: "/resume_template_bold.png",
  },
  {
    id: "2",
    title: "Product Manager App",
    updatedAt: "Updated 3 days ago",
    status: "Draft",
    image: "/resume_template_professional.png",
  },
  {
    id: "3",
    title: "Startup Generalist",
    updatedAt: "Updated 1 week ago",
    status: "Active",
    image: "/resume_template_modern.png",
  },
  {
    id: "4",
    title: "Design Lead Variant",
    updatedAt: "Updated 2 weeks ago",
    status: "Draft",
    image: "/resume_template_editorial.png",
  },
];

export default function Resumes() {
  return (
    <Shell>
      <div className="flex-1 overflow-auto bg-background p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">My Resumes</h1>
              <p className="text-muted-foreground">Manage and edit your existing resumes.</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="h-4 w-4" />
              Create New Resume
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="aspect-[3/4] bg-muted relative border-b border-border overflow-hidden">
                  <img 
                    src={resume.image} 
                    alt={resume.title}
                    className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      resume.status === 'Active' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}>
                      {resume.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-tight">{resume.title}</h3>
                    <button className="text-muted-foreground hover:text-foreground shrink-0 -mt-1">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-auto">{resume.updatedAt}</p>
                </div>
              </div>
            ))}

            <div className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all min-h-[300px]">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Create from scratch</h3>
              <p className="text-sm text-muted-foreground">Start with a blank canvas or use the AI builder.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Shell>
  );
}
