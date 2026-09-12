'use client';

import { useState } from 'react';
import { useAuth } from '../../providers/auth-provider';
import { User, Mail, Briefcase, MapPin, Phone, Save, Camera } from 'lucide-react';

import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { motion } from 'framer-motion';
import { Sidebar } from '@/app/components/layout/Sidebar';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    jobTitle: '',
    location: '',
    phone: '',
    bio: '',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save to Supabase here
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/10">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-64">
        <DashboardHeader user={user} />
        <main className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-3xl mx-auto">
              {/* Profile Header */}
              <div className="relative bg-card border border-border rounded-2xl p-8 mb-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-r from-accent to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                      {formData.fullName?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-background border border-border hover:bg-secondary transition-colors">
                      <Camera className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-foreground">
                      {formData.fullName || 'Your Name'}
                    </h1>
                    <p className="text-muted-foreground">
                      {formData.jobTitle || 'Add your job title'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{formData.email}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 text-sm font-medium bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>

              {/* Profile Form */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-lg font-semibold text-foreground mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-secondary/50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Job Title
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        disabled={!isEditing}
                        placeholder="e.g., Senior Software Engineer"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          disabled={!isEditing}
                          placeholder="San Francisco, CA"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={!isEditing}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition shadow-lg shadow-accent/25"
                      >
                        <Save className="h-4 w-4" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}