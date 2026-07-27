'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  FileText, 
  Wand2, 
  LayoutTemplate, 
  User, 
  Briefcase, 
  GraduationCap, 
  Award,
  Plus,
  Trash2,
  Save,
  Eye,
  Sparkles,
  Check,
  ChevronRight,
  Upload
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '../lib/utils';
import { ResumePreview } from '../components/ResumePreview';

// Types
interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
}

interface Skill {
  id: string;
  name: string;
}

// Template data
// Template data with proper preview components
const TEMPLATES = [
  { 
    id: 'modern', 
    name: 'Modern', 
    description: 'Clean and contemporary design',
    color: 'from-blue-500 to-purple-600',
    preview: (
      <div className="w-full h-full p-3 bg-white rounded-lg shadow-sm flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="h-3 w-16 bg-blue-600 rounded mb-1" />
            <div className="h-2 w-24 bg-gray-300 rounded" />
          </div>
          <div className="text-right">
            <div className="h-2 w-20 bg-gray-200 rounded mb-1" />
            <div className="h-2 w-16 bg-gray-200 rounded" />
          </div>
        </div>
        {/* Content */}
        <div className="mt-2 flex-1">
          <div className="h-2 w-12 bg-blue-600 rounded mb-1" />
          <div className="space-y-1">
            <div className="h-2 w-full bg-gray-200 rounded" />
            <div className="h-2 w-3/4 bg-gray-200 rounded" />
            <div className="h-2 w-1/2 bg-gray-200 rounded" />
          </div>
          <div className="mt-2">
            <div className="h-2 w-12 bg-blue-600 rounded mb-1" />
            <div className="space-y-1">
              <div className="h-2 w-full bg-gray-200 rounded" />
              <div className="h-2 w-3/4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  { 
    id: 'classic', 
    name: 'Classic', 
    description: 'Traditional and professional',
    color: 'from-slate-500 to-gray-600',
    preview: (
      <div className="w-full h-full p-3 bg-white rounded-lg shadow-sm flex flex-col">
        <div className="text-center border-b border-gray-200 pb-2">
          <div className="h-3 w-24 bg-gray-800 rounded mx-auto mb-1" />
          <div className="h-2 w-32 bg-gray-400 rounded mx-auto" />
        </div>
        <div className="mt-2 flex-1">
          <div className="h-2 w-12 bg-gray-800 rounded mb-1" />
          <div className="space-y-1">
            <div className="h-2 w-full bg-gray-200 rounded" />
            <div className="h-2 w-3/4 bg-gray-200 rounded" />
          </div>
          <div className="mt-2">
            <div className="h-2 w-12 bg-gray-800 rounded mb-1" />
            <div className="space-y-1">
              <div className="h-2 w-full bg-gray-200 rounded" />
              <div className="h-2 w-3/4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  { 
    id: 'minimal', 
    name: 'Minimal', 
    description: 'Simple and elegant',
    color: 'from-gray-400 to-slate-500',
    preview: (
      <div className="w-full h-full p-4 bg-white rounded-lg shadow-sm flex flex-col">
        <div className="h-3 w-20 bg-gray-800 rounded mb-1" />
        <div className="h-2 w-28 bg-gray-400 rounded mb-2" />
        <div className="flex-1 space-y-2">
          <div>
            <div className="h-1.5 w-10 bg-gray-800 rounded mb-1" />
            <div className="h-1.5 w-full bg-gray-200 rounded" />
            <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
          </div>
          <div>
            <div className="h-1.5 w-10 bg-gray-800 rounded mb-1" />
            <div className="h-1.5 w-full bg-gray-200 rounded" />
            <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    )
  },
  { 
    id: 'creative', 
    name: 'Creative', 
    description: 'Stand out with unique design',
    color: 'from-rose-500 to-amber-600',
    preview: (
      <div className="w-full h-full rounded-lg shadow-sm flex overflow-hidden">
        <div className="w-1/3 bg-rose-500 p-3 flex flex-col">
          <div className="h-2 w-12 bg-white/80 rounded mb-2" />
          <div className="space-y-1">
            <div className="h-2 w-full bg-white/40 rounded" />
            <div className="h-2 w-3/4 bg-white/40 rounded" />
          </div>
          <div className="mt-auto">
            <div className="h-2 w-10 bg-white/80 rounded mb-1" />
            <div className="h-2 w-full bg-white/40 rounded" />
          </div>
        </div>
        <div className="w-2/3 bg-white p-3">
          <div className="h-2 w-12 bg-gray-800 rounded mb-1" />
          <div className="h-2 w-20 bg-gray-400 rounded mb-2" />
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-gray-200 rounded" />
            <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    )
  },
  { 
    id: 'executive', 
    name: 'Executive', 
    description: 'Premium corporate style',
    color: 'from-indigo-500 to-blue-600',
    preview: (
      <div className="w-full h-full p-3 bg-gradient-to-br from-indigo-900 to-blue-900 rounded-lg shadow-sm flex flex-col text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="h-3 w-20 bg-white/90 rounded mb-1" />
            <div className="h-2 w-28 bg-white/60 rounded" />
          </div>
          <div className="text-right">
            <div className="h-2 w-16 bg-white/40 rounded mb-1" />
            <div className="h-2 w-12 bg-white/40 rounded" />
          </div>
        </div>
        <div className="mt-3 flex-1">
          <div className="h-2 w-12 bg-white/80 rounded mb-1" />
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-white/20 rounded" />
            <div className="h-1.5 w-3/4 bg-white/20 rounded" />
          </div>
          <div className="mt-2">
            <div className="h-2 w-12 bg-white/80 rounded mb-1" />
            <div className="h-1.5 w-full bg-white/20 rounded" />
          </div>
        </div>
      </div>
    )
  },
  { 
    id: 'tech', 
    name: 'Tech', 
    description: 'Modern tech industry standard',
    color: 'from-cyan-500 to-emerald-600',
    preview: (
      <div className="w-full h-full p-3 bg-white rounded-lg shadow-sm flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-4 rounded-full bg-cyan-500" />
          <div className="h-3 w-20 bg-gray-800 rounded" />
        </div>
        <div className="flex gap-2 flex-1">
          <div className="w-1/3 space-y-1">
            <div className="h-2 w-8 bg-cyan-500 rounded" />
            <div className="h-1.5 w-full bg-gray-200 rounded" />
            <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
          </div>
          <div className="w-2/3 space-y-1">
            <div className="h-2 w-10 bg-gray-800 rounded" />
            <div className="h-1.5 w-full bg-gray-200 rounded" />
            <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    )
  },
];

export default function BuildResumePage() {
  const [activeTab, setActiveTab] = useState<'scratch' | 'templates'>('scratch');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  });
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: '1', company: '', role: '', startDate: '', endDate: '', description: '' }
  ]);
  const [educations, setEducations] = useState<Education[]>([
    { id: '1', institution: '', degree: '', field: '', year: '' }
  ]);
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: '' }
  ]);

  const steps = ['Personal Info', 'Experience', 'Education', 'Skills', 'Preview'];

  const handleAddExperience = () => {
    setExperiences([...experiences, { 
      id: Date.now().toString(), 
      company: '', 
      role: '', 
      startDate: '', 
      endDate: '', 
      description: '' 
    }]);
  };

  const handleRemoveExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const handleAddEducation = () => {
    setEducations([...educations, { 
      id: Date.now().toString(), 
      institution: '', 
      degree: '', 
      field: '', 
      year: '' 
    }]);
  };

  const handleRemoveEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id));
    }
  };

  const handleAddSkill = () => {
    setSkills([...skills, { id: Date.now().toString(), name: '' }]);
  };

  const handleRemoveSkill = (id: string) => {
    if (skills.length > 1) {
      setSkills(skills.filter(skill => skill.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              <span className="font-semibold text-foreground">Build Resume</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-secondary transition-colors">
              <Eye className="h-4 w-4" />
              Preview
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-all shadow-lg shadow-accent/25">
              <Sparkles className="h-4 w-4" />
              AI Enhance
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mode Selection */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Create Your Resume</h1>
            <p className="text-muted-foreground">Build from scratch or use a template</p>
          </div>
          <div className="flex items-center gap-2 p-1 bg-secondary rounded-lg">
            <button
              onClick={() => setActiveTab('scratch')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all",
                activeTab === 'scratch' 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Wand2 className="h-4 w-4" />
              From Scratch
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all",
                activeTab === 'templates' 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutTemplate className="h-4 w-4" />
              Templates
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Templates View */}
          {activeTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                  <LayoutTemplate className="h-4 w-4" />
                  Choose a Template
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Pick a design that fits you
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Each template is optimized for ATS and designed to impress recruiters
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {TEMPLATES.map((template) => (
    <motion.div
      key={template.id}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => setSelectedTemplate(template.id)}
      className={cn(
        "relative group rounded-2xl border-2 cursor-pointer transition-all duration-300 p-6",
        selectedTemplate === template.id
          ? "border-accent shadow-lg shadow-accent/20"
          : "border-border hover:border-accent/50"
      )}
    >
      {selectedTemplate === template.id && (
        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full p-1 shadow-lg">
          <Check className="h-4 w-4" />
        </div>
      )}
      <div className={cn(
        "aspect-[3/4] rounded-xl mb-4 overflow-hidden border border-border/50",
        "bg-gradient-to-br",
        template.id === 'modern' && "from-blue-50 to-purple-50",
        template.id === 'classic' && "from-gray-50 to-slate-50",
        template.id === 'minimal' && "from-white to-gray-50",
        template.id === 'creative' && "from-rose-50 to-amber-50",
        template.id === 'executive' && "from-indigo-50 to-blue-50",
        template.id === 'tech' && "from-cyan-50 to-emerald-50",
      )}>
        <ResumePreview template={template.id as any} />
      </div>
      <h3 className="font-semibold text-foreground">{template.name}</h3>
      <p className="text-sm text-muted-foreground">{template.description}</p>
      <button className="mt-4 w-full text-sm font-medium text-accent hover:underline">
        Select Template
      </button>
    </motion.div>
  ))}
</div>
              <div className="flex justify-center pt-8">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent/25 font-medium">
                  Continue with Template
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* From Scratch View */}
          {activeTab === 'scratch' && (
            <motion.div
              key="scratch"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Steps Progress */}
              <div className="mb-10">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <button
                        onClick={() => setActiveStep(index)}
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all",
                          index <= activeStep 
                            ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25" 
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {index + 1}
                      </button>
                      {index < steps.length - 1 && (
                        <div className={cn(
                          "w-12 sm:w-20 h-0.5 mx-2",
                          index < activeStep ? "bg-accent" : "bg-border"
                        )} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between max-w-2xl mx-auto mt-2">
                  {steps.map((step, index) => (
                    <span key={index} className={cn(
                      "text-xs font-medium",
                      index <= activeStep ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                  {activeStep === 0 && (
                    <motion.div
                      key="personal"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-accent/10 text-accent">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Personal Information</h3>
                          <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Professional Title
                          </label>
                          <input
                            type="text"
                            value={formData.jobTitle}
                            onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                            placeholder="Senior Software Engineer"
                            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Email
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="john@email.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Location
                          </label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            placeholder="San Francisco, CA"
                            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Professional Summary
                          </label>
                          <textarea
                            value={formData.summary}
                            onChange={(e) => setFormData({...formData, summary: e.target.value})}
                            placeholder="Write a brief summary of your professional background..."
                            rows={4}
                            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div
                      key="experience"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-accent/10 text-accent">
                            <Briefcase className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">Work Experience</h3>
                            <p className="text-sm text-muted-foreground">Add your professional experience</p>
                          </div>
                        </div>
                        <button
                          onClick={handleAddExperience}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          Add Experience
                        </button>
                      </div>

                      {experiences.map((exp, index) => (
                        <div key={exp.id} className="relative p-6 border border-border rounded-xl bg-card">
                          {experiences.length > 1 && (
                            <button
                              onClick={() => handleRemoveExperience(exp.id)}
                              className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-foreground mb-1.5">
                                Company Name
                              </label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => {
                                  const updated = [...experiences];
                                  updated[index].company = e.target.value;
                                  setExperiences(updated);
                                }}
                                placeholder="Google"
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-foreground mb-1.5">
                                Job Title
                              </label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => {
                                  const updated = [...experiences];
                                  updated[index].role = e.target.value;
                                  setExperiences(updated);
                                }}
                                placeholder="Software Engineer"
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-1.5">
                                Start Date
                              </label>
                              <input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => {
                                  const updated = [...experiences];
                                  updated[index].startDate = e.target.value;
                                  setExperiences(updated);
                                }}
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-1.5">
                                End Date
                              </label>
                              <input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => {
                                  const updated = [...experiences];
                                  updated[index].endDate = e.target.value;
                                  setExperiences(updated);
                                }}
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-foreground mb-1.5">
                                Description
                              </label>
                              <textarea
                                value={exp.description}
                                onChange={(e) => {
                                  const updated = [...experiences];
                                  updated[index].description = e.target.value;
                                  setExperiences(updated);
                                }}
                                placeholder="Describe your responsibilities and achievements..."
                                rows={3}
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="education"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-accent/10 text-accent">
                            <GraduationCap className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">Education</h3>
                            <p className="text-sm text-muted-foreground">Add your educational background</p>
                          </div>
                        </div>
                        <button
                          onClick={handleAddEducation}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          Add Education
                        </button>
                      </div>

                      {educations.map((edu, index) => (
                        <div key={edu.id} className="relative p-6 border border-border rounded-xl bg-card">
                          {educations.length > 1 && (
                            <button
                              onClick={() => handleRemoveEducation(edu.id)}
                              className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-foreground mb-1.5">
                                Institution
                              </label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => {
                                  const updated = [...educations];
                                  updated[index].institution = e.target.value;
                                  setEducations(updated);
                                }}
                                placeholder="Stanford University"
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-1.5">
                                Degree
                              </label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => {
                                  const updated = [...educations];
                                  updated[index].degree = e.target.value;
                                  setEducations(updated);
                                }}
                                placeholder="Bachelor's"
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-1.5">
                                Field of Study
                              </label>
                              <input
                                type="text"
                                value={edu.field}
                                onChange={(e) => {
                                  const updated = [...educations];
                                  updated[index].field = e.target.value;
                                  setEducations(updated);
                                }}
                                placeholder="Computer Science"
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-foreground mb-1.5">
                                Graduation Year
                              </label>
                              <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => {
                                  const updated = [...educations];
                                  updated[index].year = e.target.value;
                                  setEducations(updated);
                                }}
                                placeholder="2024"
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="skills"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-accent/10 text-accent">
                            <Award className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">Skills</h3>
                            <p className="text-sm text-muted-foreground">Add your key skills</p>
                          </div>
                        </div>
                        <button
                          onClick={handleAddSkill}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          Add Skill
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
                          <div key={skill.id} className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => {
                                const updated = [...skills];
                                updated[index].name = e.target.value;
                                setSkills(updated);
                              }}
                              placeholder="Skill name"
                              className="w-32 bg-transparent border-none focus:outline-none text-sm"
                            />
                            {skills.length > 1 && (
                              <button
                                onClick={() => handleRemoveSkill(skill.id)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 p-4 bg-secondary/50 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground">
                          💡 Tip: Add 5-10 relevant skills. Include both technical and soft skills.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 4 && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center py-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-sm font-medium mb-4">
                          <Check className="h-4 w-4" />
                          Ready to Review
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">Your resume is almost ready!</h3>
                        <p className="text-muted-foreground mt-1">Review your information and make any final changes</p>
                      </div>

                      {/* Resume Preview Card */}
                      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                        <div className="text-center border-b border-border pb-6 mb-6">
                          <h2 className="text-2xl font-bold text-foreground">
                            {formData.fullName || 'Your Name'}
                          </h2>
                          <p className="text-muted-foreground">
                            {formData.jobTitle || 'Your Title'}
                          </p>
                          <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-muted-foreground">
                            {formData.email && <span>{formData.email}</span>}
                            {formData.phone && <span>• {formData.phone}</span>}
                            {formData.location && <span>• {formData.location}</span>}
                          </div>
                        </div>

                        {formData.summary && (
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Professional Summary</h4>
                            <p className="text-sm text-muted-foreground">{formData.summary}</p>
                          </div>
                        )}

                        {experiences.some(e => e.company || e.role) && (
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Experience</h4>
                            {experiences.map((exp, i) => (
                              (exp.company || exp.role) && (
                                <div key={i} className="mb-3 last:mb-0">
                                  <div className="flex justify-between">
                                    <span className="font-medium text-sm text-foreground">{exp.role || 'Role'}</span>
                                    <span className="text-sm text-muted-foreground">
                                      {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''}
                                    </span>
                                  </div>
                                  <div className="text-sm text-muted-foreground">{exp.company || 'Company'}</div>
                                  {exp.description && (
                                    <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                                  )}
                                </div>
                              )
                            ))}
                          </div>
                        )}

                        {educations.some(e => e.institution || e.degree) && (
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Education</h4>
                            {educations.map((edu, i) => (
                              (edu.institution || edu.degree) && (
                                <div key={i} className="mb-2 last:mb-0">
                                  <div className="flex justify-between">
                                    <span className="font-medium text-sm text-foreground">{edu.degree || 'Degree'}</span>
                                    <span className="text-sm text-muted-foreground">{edu.year || ''}</span>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {edu.institution || 'Institution'} {edu.field ? `· ${edu.field}` : ''}
                                  </div>
                                </div>
                              )
                            ))}
                          </div>
                        )}

                        {skills.some(s => s.name) && (
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {skills.map((skill, i) => (
                                skill.name && (
                                  <span key={i} className="px-3 py-1 bg-secondary rounded-full text-sm text-foreground">
                                    {skill.name}
                                  </span>
                                )
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent/25 font-medium">
                          <Save className="h-4 w-4" />
                          Save Resume
                        </button>
                        <button className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl hover:bg-secondary transition-colors font-medium">
                          <Sparkles className="h-4 w-4" />
                          AI Optimize
                        </button>
                        <button className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl hover:bg-secondary transition-colors font-medium">
                          <Upload className="h-4 w-4" />
                          Export PDF
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      activeStep > 0 
                        ? "text-foreground hover:bg-secondary" 
                        : "text-muted-foreground cursor-not-allowed"
                    )}
                    disabled={activeStep === 0}
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Step {activeStep + 1} of {steps.length}
                    </span>
                    <button
                      onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                      className="px-4 py-2 text-sm font-medium bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-all"
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}