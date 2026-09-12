// // 'use client';

// // import { useState } from 'react';
// // import { 
// //   User, 
// //   Lock, 
// //   Bell, 
// //   CreditCard, 
// //   AlertTriangle,
// //   Camera,
// //   Check,
// //   Loader2
// // } from 'lucide-react';
// // import { Input } from '../../components/ui/input';
// // import { Label } from '../../components/ui/label';
// // import { Button } from '../../components/ui/button';
// // import { Switch } from '../../components/ui/switch';
// // import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
// // import { cn } from '../../lib/utils';
// // import { createClient } from '../../lib/supabase/client';
// // import { useAuth } from '../../providers/auth-provider';

// // const tabs = [
// //   { id: 'profile', name: 'Profile', icon: User },
// //   { id: 'security', name: 'Security', icon: Lock },
// //   { id: 'notifications', name: 'Notifications', icon: Bell },
// //   { id: 'billing', name: 'Billing', icon: CreditCard },
// //   { id: 'danger', name: 'Danger Zone', icon: AlertTriangle },
// // ] as const;

// // type TabId = typeof tabs[number]['id'];

// // export default function SettingsPage() {
// //   const { user } = useAuth();
// //   const supabase = createClient();

// //   const [activeTab, setActiveTab] = useState<TabId>('profile');

// //   // Profile state
// //   const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
// //   const [savingProfile, setSavingProfile] = useState(false);
// //   const [profileSaved, setProfileSaved] = useState(false);

// //   // Security state
// //   const [newPassword, setNewPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [savingPassword, setSavingPassword] = useState(false);
// //   const [passwordError, setPasswordError] = useState('');
// //   const [passwordSaved, setPasswordSaved] = useState(false);

// //   // Notification state (local only — wire to your persistence layer)
// //   const [notifications, setNotifications] = useState({
// //     productUpdates: true,
// //     jobMatchAlerts: true,
// //     weeklyTips: false,
// //   });

// //   // Danger zone state
// //   const [deleteConfirmText, setDeleteConfirmText] = useState('');
// //   const [deleting, setDeleting] = useState(false);

// //   const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
// //   const email = user?.email || '';
// //   const avatarUrl = user?.user_metadata?.avatar_url;

// //   const handleSaveProfile = async () => {
// //     setSavingProfile(true);
// //     setProfileSaved(false);
// //     const { error } = await supabase.auth.updateUser({
// //       data: { full_name: fullName },
// //     });
// //     setSavingProfile(false);
// //     if (!error) {
// //       setProfileSaved(true);
// //       setTimeout(() => setProfileSaved(false), 2500);
// //     }
// //   };

// //   const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file || !user) return;

// //     // TODO: upload to your Supabase Storage bucket, then update user_metadata.avatar_url
// //     // const filePath = `${user.id}/avatar-${Date.now()}`;
// //     // const { error: uploadError } = await supabase.storage
// //     //   .from('avatars')
// //     //   .upload(filePath, file, { upsert: true });
// //     // const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
// //     // await supabase.auth.updateUser({ data: { avatar_url: urlData.publicUrl } });
// //   };

// //   const handleChangePassword = async () => {
// //     setPasswordError('');
// //     setPasswordSaved(false);

// //     if (newPassword.length < 8) {
// //       setPasswordError('Password must be at least 8 characters.');
// //       return;
// //     }
// //     if (newPassword !== confirmPassword) {
// //       setPasswordError('Passwords do not match.');
// //       return;
// //     }

// //     setSavingPassword(true);
// //     const { error } = await supabase.auth.updateUser({ password: newPassword });
// //     setSavingPassword(false);

// //     if (error) {
// //       setPasswordError(error.message);
// //     } else {
// //       setPasswordSaved(true);
// //       setNewPassword('');
// //       setConfirmPassword('');
// //       setTimeout(() => setPasswordSaved(false), 2500);
// //     }
// //   };

// //   const handleDeleteAccount = async () => {
// //     if (deleteConfirmText !== 'DELETE') return;
// //     setDeleting(true);
// //     // Requires a server route using the Supabase service-role key —
// //     // the client SDK cannot delete a user's own account.
// //     // await fetch('/api/account/delete', { method: 'POST' });
// //     setDeleting(false);
// //   };

// //   return (
// //     <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
// //       <div className="max-w-4xl mx-auto">
// //         {/* Page header */}
// //         <div className="mb-6 sm:mb-8">
// //           <h1 className="text-xl sm:text-2xl font-semibold text-[#0F172A] dark:text-white">
// //             Settings
// //           </h1>
// //           <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
// //             Manage your account, security, and preferences.
// //           </p>
// //         </div>

// //         <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
// //           {/* Tab rail */}
// //           <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible lg:w-56 flex-shrink-0 pb-1 lg:pb-0">
// //             {tabs.map((tab) => {
// //               const active = activeTab === tab.id;
// //               return (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => setActiveTab(tab.id)}
// //                   className={cn(
// //                     "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0",
// //                     active
// //                       ? "bg-white dark:bg-[#1E293B] text-[#2563EB] shadow-sm border border-[#E2E8F0] dark:border-[#334155]"
// //                       : "text-[#64748B] dark:text-[#94A3B8] hover:bg-white/60 dark:hover:bg-[#1E293B]/60 border border-transparent"
// //                   )}
// //                 >
// //                   <tab.icon className={cn("h-4 w-4 flex-shrink-0", active ? "text-[#2563EB]" : "text-[#94A3B8]")} />
// //                   {tab.name}
// //                 </button>
// //               );
// //             })}
// //           </nav>

// //           {/* Content panel */}
// //           <div className="flex-1 min-w-0 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl shadow-sm">
// //             {activeTab === 'profile' && (
// //               <div className="p-5 sm:p-6">
// //                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
// //                   Profile
// //                 </h2>
// //                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
// //                   This information may appear on resumes you export and shared links.
// //                 </p>

// //                 {/* Avatar */}
// //                 <div className="flex items-center gap-4 mb-6">
// //                   <div className="relative">
// //                     <Avatar className="h-16 w-16 rounded-full border border-[#E2E8F0] dark:border-[#334155]">
// //                       {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
// //                       <AvatarFallback className="bg-[#2563EB] text-white text-lg font-semibold">
// //                         {displayName[0]?.toUpperCase() || 'U'}
// //                       </AvatarFallback>
// //                     </Avatar>
// //                     <label
// //                       htmlFor="avatar-upload"
// //                       className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#2563EB] flex items-center justify-center cursor-pointer border-2 border-white dark:border-[#1E293B]"
// //                     >
// //                       <Camera className="h-3 w-3 text-white" />
// //                       <input
// //                         id="avatar-upload"
// //                         type="file"
// //                         accept="image/*"
// //                         className="hidden"
// //                         onChange={handleAvatarUpload}
// //                       />
// //                     </label>
// //                   </div>
// //                   <div>
// //                     <p className="text-sm font-medium text-[#0F172A] dark:text-white">{displayName}</p>
// //                     <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">JPG or PNG, up to 2MB</p>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-4 max-w-md">
// //                   <div>
// //                     <Label htmlFor="fullName" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">
// //                       Full name
// //                     </Label>
// //                     <Input
// //                       id="fullName"
// //                       value={fullName}
// //                       onChange={(e) => setFullName(e.target.value)}
// //                       className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
// //                     />
// //                   </div>
// //                   <div>
// //                     <Label htmlFor="email" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">
// //                       Email address
// //                     </Label>
// //                     <Input
// //                       id="email"
// //                       value={email}
// //                       disabled
// //                       className="mt-1.5 bg-[#F1F5F9] dark:bg-[#0B1220] border-[#E2E8F0] dark:border-[#334155] text-[#94A3B8] cursor-not-allowed"
// //                     />
// //                     <p className="text-xs text-[#94A3B8] mt-1">Email is managed by your login provider.</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-3 mt-6">
// //                   <Button
// //                     onClick={handleSaveProfile}
// //                     disabled={savingProfile}
// //                     className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
// //                   >
// //                     {savingProfile && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
// //                     Save changes
// //                   </Button>
// //                   {profileSaved && (
// //                     <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
// //                       <Check className="h-3.5 w-3.5" /> Saved
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //             {activeTab === 'security' && (
// //               <div className="p-5 sm:p-6">
// //                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
// //                   Security
// //                 </h2>
// //                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
// //                   Update your password to keep your account secure.
// //                 </p>

// //                 <div className="space-y-4 max-w-md">
// //                   <div>
// //                     <Label htmlFor="newPassword" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">
// //                       New password
// //                     </Label>
// //                     <Input
// //                       id="newPassword"
// //                       type="password"
// //                       value={newPassword}
// //                       onChange={(e) => setNewPassword(e.target.value)}
// //                       className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
// //                     />
// //                   </div>
// //                   <div>
// //                     <Label htmlFor="confirmPassword" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">
// //                       Confirm new password
// //                     </Label>
// //                     <Input
// //                       id="confirmPassword"
// //                       type="password"
// //                       value={confirmPassword}
// //                       onChange={(e) => setConfirmPassword(e.target.value)}
// //                       className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
// //                     />
// //                   </div>
// //                   {passwordError && (
// //                     <p className="text-xs text-red-500">{passwordError}</p>
// //                   )}
// //                 </div>

// //                 <div className="flex items-center gap-3 mt-6">
// //                   <Button
// //                     onClick={handleChangePassword}
// //                     disabled={savingPassword || !newPassword}
// //                     className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
// //                   >
// //                     {savingPassword && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
// //                     Update password
// //                   </Button>
// //                   {passwordSaved && (
// //                     <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
// //                       <Check className="h-3.5 w-3.5" /> Password updated
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //             {activeTab === 'notifications' && (
// //               <div className="p-5 sm:p-6">
// //                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
// //                   Notifications
// //                 </h2>
// //                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
// //                   Choose what you want to hear from us.
// //                 </p>

// //                 <div className="divide-y divide-[#E2E8F0] dark:divide-[#334155] max-w-lg">
// //                   {[
// //                     { key: 'productUpdates' as const, label: 'Product updates', desc: 'New features and improvements to ResumeAI.' },
// //                     { key: 'jobMatchAlerts' as const, label: 'Job match alerts', desc: 'Get notified when a strong match is found for your resume.' },
// //                     { key: 'weeklyTips' as const, label: 'Weekly resume tips', desc: 'A short email with tips to improve your resume.' },
// //                   ].map((item) => (
// //                     <div key={item.key} className="flex items-center justify-between py-4 first:pt-0">
// //                       <div className="pr-4">
// //                         <p className="text-sm font-medium text-[#0F172A] dark:text-white">{item.label}</p>
// //                         <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">{item.desc}</p>
// //                       </div>
// //                       <Switch
// //                         checked={notifications[item.key]}
// //                         onCheckedChange={(checked: any) =>
// //                           setNotifications((prev) => ({ ...prev, [item.key]: checked }))
// //                         }
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {activeTab === 'billing' && (
// //               <div className="p-5 sm:p-6">
// //                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
// //                   Billing
// //                 </h2>
// //                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
// //                   Manage your plan and payment details.
// //                 </p>

// //                 <div className="flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] max-w-lg">
// //                   <div>
// //                     <p className="text-sm font-semibold text-[#0F172A] dark:text-white">Free Plan</p>
// //                     <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
// //                       3 resumes · Basic AI suggestions
// //                     </p>
// //                   </div>
// //                   <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
// //                     Upgrade
// //                   </Button>
// //                 </div>
// //               </div>
// //             )}

// //             {activeTab === 'danger' && (
// //               <div className="p-5 sm:p-6">
// //                 <h2 className="text-base font-semibold text-red-600 dark:text-red-400 mb-1">
// //                   Danger Zone
// //                 </h2>
// //                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
// //                   These actions are permanent and cannot be undone.
// //                 </p>

// //                 <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-900/10 max-w-lg">
// //                   <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-1">
// //                     Delete account
// //                   </p>
// //                   <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-3">
// //                     This deletes your account, resumes, and all associated data immediately.
// //                   </p>
// //                   <Label htmlFor="deleteConfirm" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">
// //                     Type <span className="font-semibold">DELETE</span> to confirm
// //                   </Label>
// //                   <Input
// //                     id="deleteConfirm"
// //                     value={deleteConfirmText}
// //                     onChange={(e) => setDeleteConfirmText(e.target.value)}
// //                     className="mt-1.5 mb-3 bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
// //                   />
// //                   <Button
// //                     variant="destructive"
// //                     disabled={deleteConfirmText !== 'DELETE' || deleting}
// //                     onClick={handleDeleteAccount}
// //                     className="bg-red-600 hover:bg-red-700 text-white"
// //                   >
// //                     {deleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
// //                     Delete my account
// //                   </Button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
































































// 'use client';

// import { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';
// import { 
//   User, 
//   Lock, 
//   Bell, 
//   CreditCard, 
//   AlertTriangle,
//   Palette,
//   Camera,
//   Check,
//   Loader2,
//   Sun,
//   Moon,
//   Monitor,
//   Type
// } from 'lucide-react';
// import { Input } from '@/app/components/ui/input';
// import { Label } from '@/app/components/ui/label';
// import { Button } from '@/app/components/ui/button';
// import { Switch } from '@/app/components/ui/switch';
// import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
// import { cn } from '@/app/lib/utils';
// import { createClient } from '@/app/lib/supabase/client';
// import { useAuth } from '@/app/providers/auth-provider';
// import { useAppearance, ACCENT_VALUES } from '@/app/providers/appearance-provider';

// const tabs = [
//   { id: 'profile', name: 'Profile', icon: User },
//   { id: 'appearance', name: 'Appearance', icon: Palette },
//   { id: 'security', name: 'Security', icon: Lock },
//   { id: 'notifications', name: 'Notifications', icon: Bell },
//   { id: 'billing', name: 'Billing', icon: CreditCard },
//   { id: 'danger', name: 'Danger Zone', icon: AlertTriangle },
// ] as const;

// type TabId = typeof tabs[number]['id'];

// export default function SettingsPage() {
//   const { user } = useAuth();
//   const supabase = createClient();
//   const { theme, setTheme } = useTheme();
//   const { font, setFont, accent, setAccent } = useAppearance();

//   const [activeTab, setActiveTab] = useState<TabId>('profile');
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []); // avoids theme hydration mismatch

//   // Profile state
//   const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileSaved, setProfileSaved] = useState(false);

//   // Security state
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [savingPassword, setSavingPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const [passwordSaved, setPasswordSaved] = useState(false);

//   // Notification state (local only — wire to your persistence layer)
//   const [notifications, setNotifications] = useState({
//     productUpdates: true,
//     jobMatchAlerts: true,
//     weeklyTips: false,
//   });

//   // Danger zone state
//   const [deleteConfirmText, setDeleteConfirmText] = useState('');
//   const [deleting, setDeleting] = useState(false);

//   const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
//   const email = user?.email || '';
//   const avatarUrl = user?.user_metadata?.avatar_url;
//   const accentValue = ACCENT_VALUES[accent].base;
//   const accentHover = ACCENT_VALUES[accent].hover;

//   const handleSaveProfile = async () => {
//     setSavingProfile(true);
//     setProfileSaved(false);
//     const { error } = await supabase.auth.updateUser({ data: { full_name: fullName } });
//     setSavingProfile(false);
//     if (!error) {
//       setProfileSaved(true);
//       setTimeout(() => setProfileSaved(false), 2500);
//     }
//   };

//   const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || !user) return;
//     // TODO: upload to your Supabase Storage bucket, then update user_metadata.avatar_url
//   };

//   const handleChangePassword = async () => {
//     setPasswordError('');
//     setPasswordSaved(false);
//     if (newPassword.length < 8) {
//       setPasswordError('Password must be at least 8 characters.');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setPasswordError('Passwords do not match.');
//       return;
//     }
//     setSavingPassword(true);
//     const { error } = await supabase.auth.updateUser({ password: newPassword });
//     setSavingPassword(false);
//     if (error) {
//       setPasswordError(error.message);
//     } else {
//       setPasswordSaved(true);
//       setNewPassword('');
//       setConfirmPassword('');
//       setTimeout(() => setPasswordSaved(false), 2500);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (deleteConfirmText !== 'DELETE') return;
//     setDeleting(true);
//     // Requires a server route using the Supabase service-role key
//     // await fetch('/api/account/delete', { method: 'POST' });
//     setDeleting(false);
//   };

//   const themeOptions = [
//     { id: 'light', name: 'Light', icon: Sun },
//     { id: 'dark', name: 'Dark', icon: Moon },
//     { id: 'system', name: 'System', icon: Monitor },
//   ] as const;

//   const fontOptions = [
//     { id: 'sans' as const, name: 'Sans-serif', preview: 'Aa', style: { fontFamily: 'ui-sans-serif, system-ui, sans-serif' } },
//     { id: 'serif' as const, name: 'Serif', preview: 'Aa', style: { fontFamily: 'Georgia, serif' } },
//     { id: 'mono' as const, name: 'Monospace', preview: 'Aa', style: { fontFamily: 'ui-monospace, monospace' } },
//   ];

//   const accentOptions: Array<keyof typeof ACCENT_VALUES> = ['blue', 'violet', 'emerald', 'rose', 'amber'];

//   return (
//     <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-6 sm:mb-8">
//           <h1 className="text-xl sm:text-2xl font-semibold text-[#0F172A] dark:text-white">
//             Settings
//           </h1>
//           <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
//             Manage your account, appearance, and preferences.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//           <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible lg:w-56 flex-shrink-0 pb-1 lg:pb-0">
//             {tabs.map((tab) => {
//               const active = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={cn(
//                     "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0",
//                     active
//                       ? "bg-white dark:bg-[#1E293B] shadow-sm border border-[#E2E8F0] dark:border-[#334155]"
//                       : "text-[#64748B] dark:text-[#94A3B8] hover:bg-white/60 dark:hover:bg-[#1E293B]/60 border border-transparent"
//                   )}
//                   style={active ? { color: accentValue } : undefined}
//                 >
//                   <tab.icon
//                     className="h-4 w-4 flex-shrink-0"
//                     style={{ color: active ? accentValue : '#94A3B8' }}
//                   />
//                   {tab.name}
//                 </button>
//               );
//             })}
//           </nav>

//           <div className="flex-1 min-w-0 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl shadow-sm">

//             {activeTab === 'profile' && (
//               <div className="p-5 sm:p-6">
//                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Profile</h2>
//                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                   This information may appear on resumes you export and shared links.
//                 </p>

//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="relative">
//                     <Avatar className="h-16 w-16 rounded-full border border-[#E2E8F0] dark:border-[#334155]">
//                       {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
//                       <AvatarFallback className="text-white text-lg font-semibold" style={{ backgroundColor: accentValue }}>
//                         {displayName[0]?.toUpperCase() || 'U'}
//                       </AvatarFallback>
//                     </Avatar>
//                     <label
//                       htmlFor="avatar-upload"
//                       className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center cursor-pointer border-2 border-white dark:border-[#1E293B]"
//                       style={{ backgroundColor: accentValue }}
//                     >
//                       <Camera className="h-3 w-3 text-white" />
//                       <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
//                     </label>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-[#0F172A] dark:text-white">{displayName}</p>
//                     <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">JPG or PNG, up to 2MB</p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 max-w-md">
//                   <div>
//                     <Label htmlFor="fullName" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">Full name</Label>
//                     <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)}
//                       className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]" />
//                   </div>
//                   <div>
//                     <Label htmlFor="email" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">Email address</Label>
//                     <Input id="email" value={email} disabled
//                       className="mt-1.5 bg-[#F1F5F9] dark:bg-[#0B1220] border-[#E2E8F0] dark:border-[#334155] text-[#94A3B8] cursor-not-allowed" />
//                     <p className="text-xs text-[#94A3B8] mt-1">Email is managed by your login provider.</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 mt-6">
//                   <Button onClick={handleSaveProfile} disabled={savingProfile}
//                     className="text-white" style={{ backgroundColor: accentValue }}>
//                     {savingProfile && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
//                     Save changes
//                   </Button>
//                   {profileSaved && (
//                     <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
//                       <Check className="h-3.5 w-3.5" /> Saved
//                     </span>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'appearance' && (
//               <div className="p-5 sm:p-6">
//                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Appearance</h2>
//                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                   Customize how ResumeAI looks on your device.
//                 </p>

//                 {/* Theme */}
//                 <div className="mb-7">
//                   <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-3">Theme</p>
//                   <div className="grid grid-cols-3 gap-3 max-w-md">
//                     {mounted && themeOptions.map((opt) => {
//                       const active = theme === opt.id;
//                       return (
//                         <button
//                           key={opt.id}
//                           onClick={() => setTheme(opt.id)}
//                           className={cn(
//                             "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-colors",
//                             active ? "border-current" : "border-[#E2E8F0] dark:border-[#334155] hover:border-[#CBD5E1] dark:hover:border-[#475569]"
//                           )}
//                           style={active ? { color: accentValue } : undefined}
//                         >
//                           <opt.icon className="h-5 w-5" style={{ color: active ? accentValue : '#94A3B8' }} />
//                           <span className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">{opt.name}</span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Font */}
//                 <div className="mb-7">
//                   <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-3">Font</p>
//                   <div className="grid grid-cols-3 gap-3 max-w-md">
//                     {fontOptions.map((opt) => {
//                       const active = font === opt.id;
//                       return (
//                         <button
//                           key={opt.id}
//                           onClick={() => setFont(opt.id)}
//                           className={cn(
//                             "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-colors",
//                             active ? "border-current" : "border-[#E2E8F0] dark:border-[#334155] hover:border-[#CBD5E1] dark:hover:border-[#475569]"
//                           )}
//                           style={active ? { color: accentValue } : undefined}
//                         >
//                           <span className="text-lg text-[#0F172A] dark:text-white" style={opt.style}>{opt.preview}</span>
//                           <span className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">{opt.name}</span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Accent color */}
//                 <div>
//                   <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-3">Accent color</p>
//                   <div className="flex items-center gap-3">
//                     {accentOptions.map((opt) => {
//                       const active = accent === opt;
//                       const value = ACCENT_VALUES[opt].base;
//                       return (
//                         <button
//                           key={opt}
//                           onClick={() => setAccent(opt)}
//                           aria-label={opt}
//                           className="h-8 w-8 rounded-full flex items-center justify-center ring-offset-2 ring-offset-white dark:ring-offset-[#1E293B] transition-all"
//                           style={{ backgroundColor: value, boxShadow: active ? `0 0 0 2px ${value}` : undefined }}
//                         >
//                           {active && <Check className="h-4 w-4 text-white" />}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <p className="text-xs text-[#94A3B8] mt-3 max-w-md">
//                     Applies across buttons and highlights on this settings page. Extending it to the rest of the
//                     app (sidebar, nav) requires swapping their hardcoded blue for this same variable — say the word
//                     and I'll do that pass.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'security' && (
//               <div className="p-5 sm:p-6">
//                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Security</h2>
//                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                   Update your password to keep your account secure.
//                 </p>
//                 <div className="space-y-4 max-w-md">
//                   <div>
//                     <Label htmlFor="newPassword" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">New password</Label>
//                     <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
//                       className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]" />
//                   </div>
//                   <div>
//                     <Label htmlFor="confirmPassword" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">Confirm new password</Label>
//                     <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
//                       className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]" />
//                   </div>
//                   {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
//                 </div>
//                 <div className="flex items-center gap-3 mt-6">
//                   <Button onClick={handleChangePassword} disabled={savingPassword || !newPassword}
//                     className="text-white" style={{ backgroundColor: accentValue }}>
//                     {savingPassword && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
//                     Update password
//                   </Button>
//                   {passwordSaved && (
//                     <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
//                       <Check className="h-3.5 w-3.5" /> Password updated
//                     </span>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'notifications' && (
//               <div className="p-5 sm:p-6">
//                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Notifications</h2>
//                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">Choose what you want to hear from us.</p>
//                 <div className="divide-y divide-[#E2E8F0] dark:divide-[#334155] max-w-lg">
//                   {[
//                     { key: 'productUpdates' as const, label: 'Product updates', desc: 'New features and improvements to ResumeAI.' },
//                     { key: 'jobMatchAlerts' as const, label: 'Job match alerts', desc: 'Get notified when a strong match is found for your resume.' },
//                     { key: 'weeklyTips' as const, label: 'Weekly resume tips', desc: 'A short email with tips to improve your resume.' },
//                   ].map((item) => (
//                     <div key={item.key} className="flex items-center justify-between py-4 first:pt-0">
//                       <div className="pr-4">
//                         <p className="text-sm font-medium text-[#0F172A] dark:text-white">{item.label}</p>
//                         <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">{item.desc}</p>
//                       </div>
//                       <Switch
//                         checked={notifications[item.key]}
//                         onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'billing' && (
//               <div className="p-5 sm:p-6">
//                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Billing</h2>
//                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">Manage your plan and payment details.</p>
//                 <div className="flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] max-w-lg">
//                   <div>
//                     <p className="text-sm font-semibold text-[#0F172A] dark:text-white">Free Plan</p>
//                     <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">3 resumes · Basic AI suggestions</p>
//                   </div>
//                   <Button className="text-white" style={{ backgroundColor: accentValue }}>Upgrade</Button>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'danger' && (
//               <div className="p-5 sm:p-6">
//                 <h2 className="text-base font-semibold text-red-600 dark:text-red-400 mb-1">Danger Zone</h2>
//                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">These actions are permanent and cannot be undone.</p>
//                 <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-900/10 max-w-lg">
//                   <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-1">Delete account</p>
//                   <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-3">
//                     This deletes your account, resumes, and all associated data immediately.
//                   </p>
//                   <Label htmlFor="deleteConfirm" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">
//                     Type <span className="font-semibold">DELETE</span> to confirm
//                   </Label>
//                   <Input id="deleteConfirm" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)}
//                     className="mt-1.5 mb-3 bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]" />
//                   <Button variant="destructive" disabled={deleteConfirmText !== 'DELETE' || deleting}
//                     onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white">
//                     {deleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
//                     Delete my account
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



















































// 'use client';

// import { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';
// import { 
//   User, 
//   Lock, 
//   Bell, 
//   CreditCard, 
//   Palette,
//   Camera,
//   Check,
//   Loader2,
//   Sun,
//   Moon,
//   Monitor,
//   AlertTriangle
// } from 'lucide-react';
// import { Input } from '@/app/components/ui/input';
// import { Label } from '@/app/components/ui/label';
// import { Button } from '@/app/components/ui/button';
// import { Switch } from '@/app/components/ui/switch';
// import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
// import { cn } from '@/app/lib/utils';
// import { createClient } from '@/app/lib/supabase/client';
// import { useAuth } from '@/app/providers/auth-provider';
// import { useAppearance, ACCENT_VALUES } from '../../providers/appearance-provider';

// const tabs = [
//   { id: 'profile', name: 'Profile', icon: User },
//   { id: 'appearance', name: 'Appearance', icon: Palette },
//   { id: 'security', name: 'Security', icon: Lock },
//   { id: 'notifications', name: 'Notifications', icon: Bell },
//   { id: 'billing', name: 'Billing', icon: CreditCard },
// ] as const;

// type TabId = typeof tabs[number]['id'];

// export default function SettingsPage() {
//   const { user } = useAuth();
//   const supabase = createClient();
//   const { theme, setTheme } = useTheme();
//   const { font, setFont, accent, setAccent } = useAppearance();

//   const [activeTab, setActiveTab] = useState<TabId>('profile');
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   // Profile state
//   const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileSaved, setProfileSaved] = useState(false);

//   // Security state
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [savingPassword, setSavingPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const [passwordSaved, setPasswordSaved] = useState(false);

//   // Delete account state (moved from the old Danger Zone tab)
//   const [deleteConfirmText, setDeleteConfirmText] = useState('');
//   const [deleting, setDeleting] = useState(false);

//   // Notification state (local only — wire to your persistence layer)
//   const [notifications, setNotifications] = useState({
//     productUpdates: true,
//     jobMatchAlerts: true,
//     weeklyTips: false,
//   });

//   const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
//   const email = user?.email || '';
//   const avatarUrl = user?.user_metadata?.avatar_url;
//   const accentValue = ACCENT_VALUES[accent].base;

//   const handleSaveProfile = async () => {
//     setSavingProfile(true);
//     setProfileSaved(false);
//     const { error } = await supabase.auth.updateUser({ data: { full_name: fullName } });
//     setSavingProfile(false);
//     if (!error) {
//       setProfileSaved(true);
//       setTimeout(() => setProfileSaved(false), 2500);
//     }
//   };

//   const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || !user) return;
//     // TODO: upload to your Supabase Storage bucket, then update user_metadata.avatar_url
//   };

//   const handleChangePassword = async () => {
//     setPasswordError('');
//     setPasswordSaved(false);
//     if (newPassword.length < 8) {
//       setPasswordError('Password must be at least 8 characters.');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setPasswordError('Passwords do not match.');
//       return;
//     }
//     setSavingPassword(true);
//     const { error } = await supabase.auth.updateUser({ password: newPassword });
//     setSavingPassword(false);
//     if (error) {
//       setPasswordError(error.message);
//     } else {
//       setPasswordSaved(true);
//       setNewPassword('');
//       setConfirmPassword('');
//       setTimeout(() => setPasswordSaved(false), 2500);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (deleteConfirmText !== 'DELETE') return;
//     setDeleting(true);
//     // Requires a server route using the Supabase service-role key —
//     // the client SDK cannot delete a user's own account.
//     // await fetch('/api/account/delete', { method: 'POST' });
//     setDeleting(false);
//   };

//   const themeOptions = [
//     { id: 'light', name: 'Light', icon: Sun },
//     { id: 'dark', name: 'Dark', icon: Moon },
//     { id: 'system', name: 'System', icon: Monitor },
//   ] as const;

//   const fontOptions = [
//     { id: 'sans' as const, name: 'Sans-serif' },
//     { id: 'serif' as const, name: 'Serif' },
//     { id: 'mono' as const, name: 'Monospace' },
//   ];

//   const accentOptions: Array<keyof typeof ACCENT_VALUES> = ['blue', 'violet', 'emerald', 'rose', 'amber'];

//   return (
//     <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-6 sm:mb-8">
//           <h1 className="text-xl sm:text-2xl font-semibold text-[#0F172A] dark:text-white">
//             Settings
//           </h1>
//           <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
//             Manage your account, appearance, and preferences.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//           <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible lg:w-56 flex-shrink-0 pb-1 lg:pb-0">
//             {tabs.map((tab) => {
//               const active = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={cn(
//                     "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0",
//                     active
//                       ? "bg-white dark:bg-[#1E293B] shadow-sm border border-[#E2E8F0] dark:border-[#334155]"
//                       : "text-[#64748B] dark:text-[#94A3B8] hover:bg-white/60 dark:hover:bg-[#1E293B]/60 border border-transparent"
//                   )}
//                   style={active ? { color: accentValue } : undefined}
//                 >
//                   <tab.icon className="h-4 w-4 flex-shrink-0" style={{ color: active ? accentValue : '#94A3B8' }} />
//                   {tab.name}
//                 </button>
//               );
//             })}
//           </nav>

//           <div className="flex-1 min-w-0 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl shadow-sm">

//             {activeTab === 'profile' && (
//               <div className="p-5 sm:p-6">
//                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Profile</h2>
//                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                   This information may appear on resumes you export and shared links.
//                 </p>

//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="relative">
//                     <Avatar className="h-16 w-16 rounded-full border border-[#E2E8F0] dark:border-[#334155]">
//                       {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
//                       <AvatarFallback className="text-white text-lg font-semibold" style={{ backgroundColor: accentValue }}>
//                         {displayName[0]?.toUpperCase() || 'U'}
//                       </AvatarFallback>
//                     </Avatar>
//                     <label
//                       htmlFor="avatar-upload"
//                       className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center cursor-pointer border-2 border-white dark:border-[#1E293B]"
//                       style={{ backgroundColor: accentValue }}
//                     >
//                       <Camera className="h-3 w-3 text-white" />
//                       <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
//                     </label>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-[#0F172A] dark:text-white">{displayName}</p>
//                     <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">JPG or PNG, up to 2MB</p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 max-w-md">
//                   <div>
//                     <Label htmlFor="fullName" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">Full name</Label>
//                     <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)}
//                       className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]" />
//                   </div>
//                   <div>
//                     <Label htmlFor="email" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">Email address</Label>
//                     <Input id="email" value={email} disabled
//                       className="mt-1.5 bg-[#F1F5F9] dark:bg-[#0B1220] border-[#E2E8F0] dark:border-[#334155] text-[#94A3B8] cursor-not-allowed" />
//                     <p className="text-xs text-[#94A3B8] mt-1">Email is managed by your login provider.</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 mt-6">
//                   <Button onClick={handleSaveProfile} disabled={savingProfile}
//                     className="text-white" style={{ backgroundColor: accentValue }}>
//                     {savingProfile && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
//                     Save changes
//                   </Button>
//                   {profileSaved && (
//                     <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
//                       <Check className="h-3.5 w-3.5" /> Saved
//                     </span>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'appearance' && (
//               <div className="p-5 sm:p-6">
//                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Appearance</h2>
//                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                   Customize how ResumeAI looks on your device.
//                 </p>

//                 {/* Theme — radio chip group */}
//                 <div className="mb-6">
//                   <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-2.5">Theme</p>
//                   <div
//                     role="radiogroup"
//                     aria-label="Theme"
//                     className="inline-flex items-center gap-1 p-1 rounded-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155]"
//                   >
//                     {mounted && themeOptions.map((opt) => {
//                       const active = theme === opt.id;
//                       return (
//                         <button
//                           key={opt.id}
//                           role="radio"
//                           aria-checked={active}
//                           onClick={() => setTheme(opt.id)}
//                           className={cn(
//                             "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors",
//                             active
//                               ? "bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white shadow-sm"
//                               : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#334155] dark:hover:text-[#CBD5E1]"
//                           )}
//                         >
//                           <opt.icon className="h-3.5 w-3.5" style={{ color: active ? accentValue : undefined }} />
//                           {opt.name}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Font — radio chip group */}
//                 <div className="mb-6">
//                   <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-2.5">Font</p>
//                   <div
//                     role="radiogroup"
//                     aria-label="Font"
//                     className="inline-flex items-center gap-1 p-1 rounded-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155]"
//                   >
//                     {fontOptions.map((opt) => {
//                       const active = font === opt.id;
//                       return (
//                         <button
//                           key={opt.id}
//                           role="radio"
//                           aria-checked={active}
//                           onClick={() => setFont(opt.id)}
//                           className={cn(
//                             "px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors",
//                             active
//                               ? "bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white shadow-sm"
//                               : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#334155] dark:hover:text-[#CBD5E1]"
//                           )}
//                         >
//                           {opt.name}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Accent color */}
//                 <div>
//                   <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-2.5">Accent color</p>
//                   <div className="flex items-center gap-3">
//                     {accentOptions.map((opt) => {
//                       const active = accent === opt;
//                       const value = ACCENT_VALUES[opt].base;
//                       return (
//                         <button
//                           key={opt}
//                           onClick={() => setAccent(opt)}
//                           aria-label={opt}
//                           className="h-8 w-8 rounded-full flex items-center justify-center transition-all"
//                           style={{ backgroundColor: value, boxShadow: active ? `0 0 0 2px white, 0 0 0 4px ${value}` : undefined }}
//                         >
//                           {active && <Check className="h-4 w-4 text-white" />}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <p className="text-xs text-[#94A3B8] mt-3 max-w-md">
//                     Applies across buttons and highlights on this settings page. Extending it app-wide requires
//                     swapping the sidebar's hardcoded blue for the same variable — let me know if you want that done.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'security' && (
//               <div className="p-5 sm:p-6">
//                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Security</h2>
//                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                   Update your password to keep your account secure.
//                 </p>

//                 <div className="space-y-4 max-w-md">
//                   <div>
//                     <Label htmlFor="newPassword" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">New password</Label>
//                     <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
//                       className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]" />
//                   </div>
//                   <div>
//                     <Label htmlFor="confirmPassword" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">Confirm new password</Label>
//                     <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
//                       className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]" />
//                   </div>
//                   {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
//                 </div>

//                 <div className="flex items-center gap-3 mt-6">
//                   <Button onClick={handleChangePassword} disabled={savingPassword || !newPassword}
//                     className="text-white" style={{ backgroundColor: accentValue }}>
//                     {savingPassword && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
//                     Update password
//                   </Button>
//                   {passwordSaved && (
//                     <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
//                       <Check className="h-3.5 w-3.5" /> Password updated
//                     </span>
//                   )}
//                 </div>

//                 {/* Delete account — moved here from the removed Danger Zone tab */}
//                 <div className="mt-10 pt-6 border-t border-[#E2E8F0] dark:border-[#334155] max-w-md">
//                   <div className="flex items-center gap-2 mb-1">
//                     <AlertTriangle className="h-4 w-4 text-red-500" />
//                     <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">Delete account</h3>
//                   </div>
//                   <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-3">
//                     This permanently deletes your account, resumes, and all associated data. This cannot be undone.
//                   </p>
//                   <Label htmlFor="deleteConfirm" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">
//                     Type <span className="font-semibold">DELETE</span> to confirm
//                   </Label>
//                   <Input
//                     id="deleteConfirm"
//                     value={deleteConfirmText}
//                     onChange={(e) => setDeleteConfirmText(e.target.value)}
//                     className="mt-1.5 mb-3 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
//                   />
//                   <Button
//                     variant="destructive"
//                     disabled={deleteConfirmText !== 'DELETE' || deleting}
//                     onClick={handleDeleteAccount}
//                     className="bg-red-600 hover:bg-red-700 text-white"
//                   >
//                     {deleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
//                     Delete my account
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'notifications' && (
//               <div className="p-5 sm:p-6">
//                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Notifications</h2>
//                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">Choose what you want to hear from us.</p>
//                 <div className="divide-y divide-[#E2E8F0] dark:divide-[#334155] max-w-lg">
//                   {[
//                     { key: 'productUpdates' as const, label: 'Product updates', desc: 'New features and improvements to ResumeAI.' },
//                     { key: 'jobMatchAlerts' as const, label: 'Job match alerts', desc: 'Get notified when a strong match is found for your resume.' },
//                     { key: 'weeklyTips' as const, label: 'Weekly resume tips', desc: 'A short email with tips to improve your resume.' },
//                   ].map((item) => (
//                     <div key={item.key} className="flex items-center justify-between py-4 first:pt-0">
//                       <div className="pr-4">
//                         <p className="text-sm font-medium text-[#0F172A] dark:text-white">{item.label}</p>
//                         <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">{item.desc}</p>
//                       </div>
//                       <Switch
//                         checked={notifications[item.key]}
//                         onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'billing' && (
//               <div className="p-5 sm:p-6">
//                 <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Billing</h2>
//                 <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">Manage your plan and payment details.</p>
//                 <div className="flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] max-w-lg">
//                   <div>
//                     <p className="text-sm font-semibold text-[#0F172A] dark:text-white">Free Plan</p>
//                     <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">3 resumes · Basic AI suggestions</p>
//                   </div>
//                   <Button className="text-white" style={{ backgroundColor: accentValue }}>Upgrade</Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

































































// 'use client';

// import { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';
// import { 
//   User, 
//   Lock, 
//   Bell, 
//   CreditCard, 
//   Palette,
//   Camera,
//   Check,
//   Loader2,
//   Sun,
//   Moon,
//   Monitor,
//   AlertTriangle
// } from 'lucide-react';
// import { Input } from '@/app/components/ui/input';
// import { Label } from '@/app/components/ui/label';
// import { Button } from '@/app/components/ui/button';
// import { Switch } from '@/app/components/ui/switch';
// import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
// import { cn } from '@/app/lib/utils';
// import { createClient } from '@/app/lib/supabase/client';
// import { useAuth } from '@/app/providers/auth-provider';
// // import { useAppearance, ACCENT_VALUES } from '../../providers/appearance-provider';
// import { Shell } from '../../components/layout/Shell-temp';
// import Link from 'next/link';

// const tabs = [
//   { id: 'profile', name: 'Profile', icon: User },
//   { id: 'appearance', name: 'Appearance', icon: Palette },
//   { id: 'security', name: 'Security', icon: Lock },
//   { id: 'notifications', name: 'Notifications', icon: Bell },
//   { id: 'billing', name: 'Billing', icon: CreditCard },
// ] as const;

// type TabId = typeof tabs[number]['id'];

// export default function SettingsPage() {
//   const { user } = useAuth();
//   const supabase = createClient();
//   const { theme, setTheme } = useTheme();
//   // const { font, setFont, accent, setAccent } = useAppearance();

//   const [activeTab, setActiveTab] = useState<TabId>('profile');
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   // Profile state
//   const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || '');
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileSaved, setProfileSaved] = useState(false);

//   // Security state
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [savingPassword, setSavingPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const [passwordSaved, setPasswordSaved] = useState(false);

//   // Delete account state
//   const [deleteConfirmText, setDeleteConfirmText] = useState('');
//   const [deleting, setDeleting] = useState(false);

//   // Notification state
//   const [notifications, setNotifications] = useState({
//     productUpdates: true,
//     jobMatchAlerts: true,
//     weeklyTips: false,
//   });

//   const fullName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User';
//   const email = user?.email || '';
//   const avatarUrl = user?.user_metadata?.avatar_url;
//   // const accentValue = ACCENT_VALUES[accent].base;

//   const handleSaveProfile = async () => {
//     setSavingProfile(true);
//     setProfileSaved(false);
//     const { error } = await supabase.auth.updateUser({ data: { display_name: displayName } });
//     setSavingProfile(false);
//     if (!error) {
//       setProfileSaved(true);
//       setTimeout(() => setProfileSaved(false), 2500);
//     }
//   };

//   const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || !user) return;
//     // TODO: upload to your Supabase Storage bucket, then update user_metadata.avatar_url
//   };

//   const handleChangePassword = async () => {
//     setPasswordError('');
//     setPasswordSaved(false);
//     if (newPassword.length < 8) {
//       setPasswordError('Password must be at least 8 characters.');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setPasswordError('Passwords do not match.');
//       return;
//     }
//     setSavingPassword(true);
//     const { error } = await supabase.auth.updateUser({ password: newPassword });
//     setSavingPassword(false);
//     if (error) {
//       setPasswordError(error.message);
//     } else {
//       setPasswordSaved(true);
//       setNewPassword('');
//       setConfirmPassword('');
//       setTimeout(() => setPasswordSaved(false), 2500);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (deleteConfirmText !== 'DELETE') return;
//     setDeleting(true);
//     // Requires a server route using the Supabase service-role key —
//     // the client SDK cannot delete a user's own account.
//     // await fetch('/api/account/delete', { method: 'POST' });
//     setDeleting(false);
//   };

//   const themeOptions = [
//     { id: 'light', name: 'Light', icon: Sun },
//     { id: 'dark', name: 'Dark', icon: Moon },
//     { id: 'system', name: 'System', icon: Monitor },
//   ] as const;

//   const fontOptions = [
//     { id: 'sans' as const, name: 'Sans-serif' },
//     { id: 'serif' as const, name: 'Serif' },
//     { id: 'mono' as const, name: 'Monospace' },
//   ];

//   // const accentOptions: Array<keyof typeof ACCENT_VALUES> = ['blue', 'violet', 'emerald', 'rose', 'amber'];

//   return (
//     <Shell>
//       <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="mb-6 sm:mb-8">
//             <h1 className="text-xl sm:text-2xl font-semibold text-[#0F172A] dark:text-white">
//               Settings
//             </h1>
//             <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
//               Manage your account, appearance, and preferences.
//             </p>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//             <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible lg:w-56 flex-shrink-0 pb-1 lg:pb-0">
//               {tabs.map((tab) => {
//                 const active = activeTab === tab.id;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={cn(
//                       "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0",
//                       active
//                         ? "bg-white dark:bg-[#1E293B] shadow-sm border border-[#E2E8F0] dark:border-[#334155]"
//                         : "text-[#64748B] dark:text-[#94A3B8] hover:bg-white/60 dark:hover:bg-[#1E293B]/60 border border-transparent"
//                     )}
//                     // style={active ? { color: accentValue } : undefined}
//                   >
//                     {/* <tab.icon className="h-4 w-4 flex-shrink-0" style={{ color: active ? accentValue : '#94A3B8' }} />
//                     {tab.name} */}
//                   </button>
//                 );
//               })}
//             </nav>

//             <div className="flex-1 min-w-0 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl shadow-sm">

//               {activeTab === 'profile' && (
//                 <div className="p-5 sm:p-6">
//                   <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Profile</h2>
//                   <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                     This information may appear on resumes you export and shared links.
//                   </p>

//                   <div className="flex items-center gap-4 mb-6">
//                     <div className="relative">
//                       <Avatar className="h-16 w-16 rounded-full border border-[#E2E8F0] dark:border-[#334155]">
//                         {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
//                         <AvatarFallback className="text-white text-lg font-semibold">
//                           {displayName[0]?.toUpperCase() || 'U'}
//                         </AvatarFallback>
//                       </Avatar>
//                       <label
//                         htmlFor="avatar-upload"
//                         className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center cursor-pointer border-2 border-white dark:border-[#1E293B]"
//                       >
//                         <Camera className="h-3 w-3 text-white" />
//                         <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
//                       </label>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-[#0F172A] dark:text-white">{displayName}</p>
//                       <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">JPG or PNG, up to 2MB</p>
//                     </div>
//                   </div>

//                   <div className="space-y-4 max-w-md">
//                     <div>
//                       <Label htmlFor="fullName" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">Full name</Label>
//                       <Input id="fullName" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
//                         className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]" />
//                     </div>
//                     <div>
//                       <Label htmlFor="email" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">Email address</Label>
//                       <Input id="email" value={email} disabled
//                         className="mt-1.5 bg-[#F1F5F9] dark:bg-[#0B1220] border-[#E2E8F0] dark:border-[#334155] text-[#94A3B8] cursor-not-allowed" />
//                       <p className="text-xs text-[#94A3B8] mt-1">Email is managed by your login provider.</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 mt-6">
//                     <Button onClick={handleSaveProfile} disabled={savingProfile}
//                       className="text-white">
//                       {savingProfile && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
//                       Save changes
//                     </Button>
//                     {profileSaved && (
//                       <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
//                         <Check className="h-3.5 w-3.5" /> Saved
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'appearance' && (
//                 <div className="p-5 sm:p-6">
//                   <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Appearance</h2>
//                   <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                     Customize how ResumeAI looks on your device.
//                   </p>

//                   <div className="mb-6">
//                     <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-2.5">Theme</p>
//                     <div
//                       role="radiogroup"
//                       aria-label="Theme"
//                       className="inline-flex items-center gap-1 p-1 rounded-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155]"
//                     >
//                       {/* {mounted && themeOptions.map((opt) => {
//                         const active = theme === opt.id;
//                         return (
//                           <button
//                             key={opt.id}
//                             role="radio"
//                             aria-checked={active}
//                             onClick={() => setTheme(opt.id)}
//                             className={cn(
//                               "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors",
//                               active
//                                 ? "bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white shadow-sm"
//                                 : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#334155] dark:hover:text-[#CBD5E1]"
//                             )}
//                           >
//                             <opt.icon className="h-3.5 w-3.5" style={{ color: active ? accentValue : undefined }} />
//                             {opt.name}
//                           </button>
//                         );
//                       })} */}
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-2.5">Font</p>
//                     <div
//                       role="radiogroup"
//                       aria-label="Font"
//                       className="inline-flex items-center gap-1 p-1 rounded-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155]"
//                     >
//                       {/* {fontOptions.map((opt) => {
//                         const active = font === opt.id;
//                         return (
//                           <button
//                             key={opt.id}
//                             role="radio"
//                             aria-checked={active}
//                             onClick={() => setFont(opt.id)}
//                             className={cn(
//                               "px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors",
//                               active
//                                 ? "bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white shadow-sm"
//                                 : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#334155] dark:hover:text-[#CBD5E1]"
//                             )}
//                           >
//                             {opt.name}
//                           </button>
//                         );
//                       })} */}
//                     </div>
//                   </div>

//                   <div>
//                     {/* <p className="text-sm font-medium text-[#0F172A] dark:text-white mb-2.5">Accent color</p> */}
//                     <div className="flex items-center gap-3">
//                       {/* {accentOptions.map((opt) => {
//                         const active = accent === opt;
//                         const value = ACCENT_VALUES[opt].base;
//                         return (
//                           <button
//                             key={opt}
//                             onClick={() => setAccent(opt)}
//                             aria-label={opt}
//                             className="h-8 w-8 rounded-full flex items-center justify-center transition-all"
//                             style={{ backgroundColor: value, boxShadow: active ? `0 0 0 2px white, 0 0 0 4px ${value}` : undefined }}
//                           >
//                             {active && <Check className="h-4 w-4 text-white" />}
//                           </button>
//                         );
//                       })} */}
//                     </div>
//                     <p className="text-xs text-[#94A3B8] mt-3 max-w-md">
//                       Applies across buttons and highlights on this settings page. Extending it app-wide requires
//                       swapping the sidebar's hardcoded blue for the same variable — let me know if you want that done.
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'security' && (
//                 <div className="p-5 sm:p-6">
//                   <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Security</h2>
//                   <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                     Update your password to keep your account secure.
//                   </p>

//                   <div className="space-y-4 max-w-md">
//                     <div>
//                       <Label htmlFor="newPassword" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">New password</Label>
//                       <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
//                         className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]" />
//                     </div>
//                     <div>
//                       <Label htmlFor="confirmPassword" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">Confirm new password</Label>
//                       <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
//                         className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]" />
//                     </div>
//                     {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
//                   </div>

//                   <div className="flex items-center gap-3 mt-6">
//                     <Button onClick={handleChangePassword} disabled={savingPassword || !newPassword}
//                       className="text-white">
//                       {savingPassword && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
//                       Update password
//                     </Button>
//                     {passwordSaved && (
//                       <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
//                         <Check className="h-3.5 w-3.5" /> Password updated
//                       </span>
//                     )}
//                   </div>

//                   <div className="mt-10 pt-6 border-t border-[#E2E8F0] dark:border-[#334155] max-w-md">
//                     <div className="flex items-center gap-2 mb-1">
//                       <AlertTriangle className="h-4 w-4 text-red-500" />
//                       <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">Delete account</h3>
//                     </div>
//                     <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-3">
//                       This permanently deletes your account, resumes, and all associated data. This cannot be undone.
//                     </p>
//                     <Label htmlFor="deleteConfirm" className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">
//                       Type <span className="font-semibold">DELETE</span> to confirm
//                     </Label>
//                     <Input
//                       id="deleteConfirm"
//                       value={deleteConfirmText}
//                       onChange={(e) => setDeleteConfirmText(e.target.value)}
//                       className="mt-1.5 mb-3 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
//                     />
//                     <Button
//                       variant="destructive"
//                       disabled={deleteConfirmText !== 'DELETE' || deleting}
//                       onClick={handleDeleteAccount}
//                       className="bg-red-600 hover:bg-red-700 text-white"
//                     >
//                       {deleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
//                       Delete my account
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'notifications' && (
//                 <div className="p-5 sm:p-6">
//                   <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Notifications</h2>
//                   <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">Choose what you want to hear from us.</p>
//                   <div className="divide-y divide-[#E2E8F0] dark:divide-[#334155] max-w-lg">
//                     {[
//                       { key: 'productUpdates' as const, label: 'Product updates', desc: 'New features and improvements to ResumeAI.' },
//                       { key: 'jobMatchAlerts' as const, label: 'Job match alerts', desc: 'Get notified when a strong match is found for your resume.' },
//                       { key: 'weeklyTips' as const, label: 'Weekly resume tips', desc: 'A short email with tips to improve your resume.' },
//                     ].map((item) => (
//                       <div key={item.key} className="flex items-center justify-between py-4 first:pt-0">
//                         <div className="pr-4">
//                           <p className="text-sm font-medium text-[#0F172A] dark:text-white">{item.label}</p>
//                           <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">{item.desc}</p>
//                         </div>
//                         <Switch
//                           checked={notifications[item.key]}
//                           onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'billing' && (
//                 <div className="p-5 sm:p-6">
//                   <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">Billing</h2>
//                   <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">Manage your plan and payment details.</p>
//                   <div className="flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] max-w-lg">
//                     <div>
//                       <p className="text-sm font-semibold text-[#0F172A] dark:text-white">Free Plan</p>
//                       <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">3 resumes · Basic AI suggestions</p>
//                     </div>
//                     <Link href={"/dashboard/plans"}>
//                       <Button className="text-white">Upgrade</Button>
//                     </Link>

//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Shell>
//   );
// }

































































// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import {
//   User,
//   Lock,
//   Bell,
//   CreditCard,
//   Camera,
//   Check,
//   Loader2,
//   AlertTriangle,
//   Trash2,
// } from 'lucide-react';
// import { Input } from '@/app/components/ui/input';
// import { Label } from '@/app/components/ui/label';
// import { Button } from '@/app/components/ui/button';
// import { Switch } from '@/app/components/ui/switch';
// import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
// import { cn } from '@/app/lib/utils';
// import { createClient } from '@/app/lib/supabase/client';
// import { useAuth } from '@/app/providers/auth-provider';
// import { Shell } from '../../components/layout/Shell-temp';
// import Link from 'next/link';

// const tabs = [
//   { id: 'profile', name: 'Profile', icon: User },
//   { id: 'security', name: 'Security', icon: Lock },
//   { id: 'notifications', name: 'Notifications', icon: Bell },
//   { id: 'billing', name: 'Billing', icon: CreditCard },
// ] as const;

// type TabId = (typeof tabs)[number]['id'];

// const NOTIF_STORAGE_KEY = 'resumeai:notification-prefs';
// const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB
// const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// export default function SettingsPage() {
//   const { user } = useAuth();
//   const supabase = createClient();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [activeTab, setActiveTab] = useState<TabId>('profile');

//   // ---------- Profile state ----------
//   const [displayName, setDisplayName] = useState('');
//   const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [profileSaved, setProfileSaved] = useState(false);
//   const [profileError, setProfileError] = useState('');

//   // ---------- Avatar state ----------
//   const [uploadingAvatar, setUploadingAvatar] = useState(false);
//   const [removingAvatar, setRemovingAvatar] = useState(false);
//   const [avatarError, setAvatarError] = useState('');

//   // Seed from user on mount / when user changes
//   useEffect(() => {
//     if (user) {
//       setDisplayName(
//         user.user_metadata?.display_name ||
//           user.email?.split('@')[0] ||
//           ''
//       );
//       setAvatarUrl(user.user_metadata?.avatar_url);
//     }
//   }, [user]);

//   // ---------- Security state ----------
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [savingPassword, setSavingPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const [passwordSaved, setPasswordSaved] = useState(false);

//   // ---------- Delete account state ----------
//   const [deleteConfirmText, setDeleteConfirmText] = useState('');
//   const [deleting, setDeleting] = useState(false);
//   const [deleteError, setDeleteError] = useState('');

//   // ---------- Notification state ----------
//   const [notifications, setNotifications] = useState({
//     productUpdates: true,
//     jobMatchAlerts: true,
//     weeklyTips: false,
//   });

//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(NOTIF_STORAGE_KEY);
//       if (raw) setNotifications((prev) => ({ ...prev, ...JSON.parse(raw) }));
//     } catch {
//       /* ignore */
//     }
//   }, []);

//   useEffect(() => {
//     try {
//       localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(notifications));
//     } catch {
//       /* ignore */
//     }
//   }, [notifications]);

//   const fullName =
//     user?.user_metadata?.display_name ||
//     user?.email?.split('@')[0] ||
//     'User';
//   const email = user?.email || '';

//   // ---------- Profile handlers ----------
//   const handleSaveProfile = async () => {
//     setSavingProfile(true);
//     setProfileSaved(false);
//     setProfileError('');

//     const { error } = await supabase.auth.updateUser({
//       data: { display_name: displayName.trim() },
//     });

//     setSavingProfile(false);

//     if (error) {
//       setProfileError(error.message);
//       return;
//     }

//     await refreshUser?.();
//     setProfileSaved(true);
//     setTimeout(() => setProfileSaved(false), 2500);
//   };

//   // ---------- Avatar handlers ----------
//   const handleAvatarClick = () => {
//     if (uploadingAvatar || removingAvatar) return;
//     fileInputRef.current?.click();
//   };

//   const handleAvatarUpload = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (!file || !user) return;

//     setAvatarError('');

//     // Validate type
//     if (!ALLOWED_TYPES.includes(file.type)) {
//       setAvatarError('Please select a JPG, PNG, WEBP, or GIF image.');
//       e.target.value = '';
//       return;
//     }

//     // Validate size
//     if (file.size > MAX_AVATAR_SIZE) {
//       setAvatarError('Image must be under 2MB.');
//       e.target.value = '';
//       return;
//     }

//     setUploadingAvatar(true);

//     try {
//       const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
//       // Use a stable path per user so `upsert` replaces the old file,
//       // but add a timestamp to bust the CDN cache.
//       const path = `${user.id}/avatar.${ext}`;

//       // 1. Upload to Supabase Storage
//       const { error: uploadError } = await supabase.storage
//         .from('avatars')
//         .upload(path, file, {
//           upsert: true,
//           cacheControl: '3600',
//           contentType: file.type,
//         });

//       if (uploadError) throw uploadError;

//       // 2. Get public URL + cache-bust
//       const { data: publicUrlData } = supabase.storage
//         .from('avatars')
//         .getPublicUrl(path);

//       const newAvatarUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;

//       // 3. Persist to user metadata
//       const { error: updateError } = await supabase.auth.updateUser({
//         data: { avatar_url: newAvatarUrl },
//       });
//       if (updateError) throw updateError;

//       // 4. Update local state + refresh context
//       setAvatarUrl(newAvatarUrl);
//       await refreshUser?.();
//     } catch (err) {
//       console.error('Avatar upload failed:', err);
//       setAvatarError(
//         err instanceof Error ? err.message : 'Failed to upload avatar.'
//       );
//     } finally {
//       setUploadingAvatar(false);
//       // Reset input so the same file can be re-selected
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   const handleRemoveAvatar = async () => {
//     if (!user || removingAvatar || uploadingAvatar) return;
//     if (!avatarUrl) return; // nothing to remove

//     const confirmed = window.confirm(
//       'Remove your profile picture? You can upload a new one anytime.'
//     );
//     if (!confirmed) return;

//     setAvatarError('');
//     setRemovingAvatar(true);

//     try {
//       // 1. Best-effort delete from storage (ignore "not found")
//       // We try both common extensions since we don't store the exact path.
//       const pathsToTry = [
//         `${user.id}/avatar.png`,
//         `${user.id}/avatar.jpg`,
//         `${user.id}/avatar.jpeg`,
//         `${user.id}/avatar.webp`,
//         `${user.id}/avatar.gif`,
//       ];

//       // Supabase `remove` accepts an array — but we don't know which exists.
//       // Try each silently; failures are fine.
//       await Promise.all(
//         pathsToTry.map((p) =>
//           supabase.storage.from('avatars').remove([p]).catch(() => null)
//         )
//       );

//       // 2. Clear avatar_url in user metadata
//       const { error: updateError } = await supabase.auth.updateUser({
//         data: { avatar_url: null },
//       });
//       if (updateError) throw updateError;

//       // 3. Update local state + refresh context
//       setAvatarUrl(undefined);
//       await refreshUser?.();
//     } catch (err) {
//       console.error('Avatar removal failed:', err);
//       setAvatarError(
//         err instanceof Error ? err.message : 'Failed to remove avatar.'
//       );
//     } finally {
//       setRemovingAvatar(false);
//     }
//   };

//   // ---------- Password handlers ----------
//   const handleChangePassword = async () => {
//     setPasswordError('');
//     setPasswordSaved(false);

//     if (newPassword.length < 8) {
//       setPasswordError('Password must be at least 8 characters.');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setPasswordError('Passwords do not match.');
//       return;
//     }

//     setSavingPassword(true);
//     const { error } = await supabase.auth.updateUser({
//       password: newPassword,
//     });
//     setSavingPassword(false);

//     if (error) {
//       setPasswordError(error.message);
//     } else {
//       setPasswordSaved(true);
//       setNewPassword('');
//       setConfirmPassword('');
//       setTimeout(() => setPasswordSaved(false), 2500);
//     }
//   };

//   // ---------- Delete account ----------
//   const handleDeleteAccount = async () => {
//     if (deleteConfirmText !== 'DELETE') return;
//     setDeleting(true);
//     setDeleteError('');

//     try {
//       const res = await fetch('/api/account/delete', { method: 'POST' });
//       if (!res.ok) {
//         const body = await res.json().catch(() => ({}));
//         throw new Error(body?.error || 'Failed to delete account.');
//       }
//       window.location.href = '/';
//     } catch (err) {
//       setDeleteError(
//         err instanceof Error ? err.message : 'Something went wrong.'
//       );
//       setDeleting(false);
//     }
//   };

//   const avatarBusy = uploadingAvatar || removingAvatar;

//   // ---------- Render ----------
//   return (
//     <Shell>
//       <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="mb-6 sm:mb-8">
//             <h1 className="text-xl sm:text-2xl font-semibold text-[#0F172A] dark:text-white">
//               Settings
//             </h1>
//             <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
//               Manage your account and preferences.
//             </p>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//             {/* ---------- NAV ---------- */}
//             <nav
//               aria-label="Settings sections"
//               className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible lg:w-56 flex-shrink-0 pb-1 lg:pb-0"
//             >
//               {tabs.map((tab) => {
//                 const active = activeTab === tab.id;
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     type="button"
//                     onClick={() => setActiveTab(tab.id)}
//                     aria-current={active ? 'page' : undefined}
//                     className={cn(
//                       'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0',
//                       active
//                         ? 'bg-white dark:bg-[#1E293B] shadow-sm border border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-white'
//                         : 'text-[#64748B] dark:text-[#94A3B8] hover:bg-white/60 dark:hover:bg-[#1E293B]/60 border border-transparent'
//                     )}
//                   >
//                     <Icon
//                       className={cn(
//                         'h-4 w-4 flex-shrink-0',
//                         active ? 'text-blue-600' : 'text-[#94A3B8]'
//                       )}
//                     />
//                     {tab.name}
//                   </button>
//                 );
//               })}
//             </nav>

//             {/* ---------- PANEL ---------- */}
//             <div className="flex-1 min-w-0 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl shadow-sm">
//               {/* ========== PROFILE ========== */}
//               {activeTab === 'profile' && (
//                 <div className="p-5 sm:p-6">
//                   <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
//                     Profile
//                   </h2>
//                   <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                     This information may appear on resumes you export and
//                     shared links.
//                   </p>

//                   {/* ---------- Avatar block ---------- */}
//                   <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
//                     <div className="relative flex-shrink-0">
//                       <Avatar className="h-20 w-20 rounded-full border border-[#E2E8F0] dark:border-[#334155]">
//                         {avatarUrl ? (
//                           <AvatarImage
//                             src={avatarUrl}
//                             alt={displayName || 'User avatar'}
//                           />
//                         ) : null}
//                         <AvatarFallback className="bg-blue-600 text-white text-xl font-semibold">
//                           {displayName?.[0]?.toUpperCase() ||
//                             user?.email?.[0]?.toUpperCase() ||
//                             'U'}
//                         </AvatarFallback>
//                       </Avatar>

//                       {/* Camera overlay button */}
//                       <button
//                         type="button"
//                         onClick={handleAvatarClick}
//                         disabled={avatarBusy}
//                         aria-label="Change avatar"
//                         className={cn(
//                           'absolute -bottom-1 -right-1 h-7 w-7 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1E293B] bg-blue-600 hover:bg-blue-700 transition',
//                           avatarBusy && 'opacity-60 cursor-wait'
//                         )}
//                       >
//                         {uploadingAvatar ? (
//                           <Loader2 className="h-3.5 w-3.5 text-white animate-spin" />
//                         ) : (
//                           <Camera className="h-3.5 w-3.5 text-white" />
//                         )}
//                       </button>

//                       <input
//                         ref={fileInputRef}
//                         id="avatar-upload"
//                         type="file"
//                         accept={ALLOWED_TYPES.join(',')}
//                         className="hidden"
//                         onChange={handleAvatarUpload}
//                         disabled={avatarBusy}
//                       />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-[#0F172A] dark:text-white truncate">
//                         {displayName || fullName}
//                       </p>
//                       <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
//                         JPG, PNG, WEBP or GIF · up to 2MB
//                       </p>

//                       {/* Action buttons */}
//                       <div className="flex flex-wrap items-center gap-2 mt-2.5">
//                         <button
//                           type="button"
//                           onClick={handleAvatarClick}
//                           disabled={avatarBusy}
//                           className={cn(
//                             'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md border border-[#E2E8F0] dark:border-[#334155] text-[#334155] dark:text-[#CBD5E1] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A] transition',
//                             avatarBusy && 'opacity-50 cursor-not-allowed'
//                           )}
//                         >
//                           {uploadingAvatar ? (
//                             <Loader2 className="h-3 w-3 animate-spin" />
//                           ) : (
//                             <Camera className="h-3 w-3" />
//                           )}
//                           {avatarUrl ? 'Change' : 'Upload'}
//                         </button>

//                         {avatarUrl && (
//                           <button
//                             type="button"
//                             onClick={handleRemoveAvatar}
//                             disabled={avatarBusy}
//                             className={cn(
//                               'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition',
//                               avatarBusy && 'opacity-50 cursor-not-allowed'
//                             )}
//                           >
//                             {removingAvatar ? (
//                               <Loader2 className="h-3 w-3 animate-spin" />
//                             ) : (
//                               <Trash2 className="h-3 w-3" />
//                             )}
//                             Remove
//                           </button>
//                         )}
//                       </div>

//                       {avatarError && (
//                         <p className="text-xs text-red-500 mt-2">
//                           {avatarError}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* ---------- Name / Email ---------- */}
//                   <div className="space-y-4 max-w-md">
//                     <div>
//                       <Label
//                         htmlFor="fullName"
//                         className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
//                       >
//                         Full name
//                       </Label>
//                       <Input
//                         id="fullName"
//                         value={displayName}
//                         onChange={(e) => setDisplayName(e.target.value)}
//                         className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
//                       />
//                     </div>
//                     <div>
//                       <Label
//                         htmlFor="email"
//                         className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
//                       >
//                         Email address
//                       </Label>
//                       <Input
//                         id="email"
//                         value={email}
//                         disabled
//                         className="mt-1.5 bg-[#F1F5F9] dark:bg-[#0B1220] border-[#E2E8F0] dark:border-[#334155] text-[#94A3B8] cursor-not-allowed"
//                       />
//                       <p className="text-xs text-[#94A3B8] mt-1">
//                         Email is managed by your login provider.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 mt-6">
//                     <Button
//                       onClick={handleSaveProfile}
//                       disabled={savingProfile || !displayName.trim()}
//                       className="bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                       {savingProfile && (
//                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                       )}
//                       Save changes
//                     </Button>
//                     {profileSaved && (
//                       <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
//                         <Check className="h-3.5 w-3.5" /> Saved
//                       </span>
//                     )}
//                     {profileError && (
//                       <span className="text-xs text-red-500">
//                         {profileError}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* ========== SECURITY ========== */}
//               {activeTab === 'security' && (
//                 <div className="p-5 sm:p-6">
//                   <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
//                     Security
//                   </h2>
//                   <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                     Update your password to keep your account secure.
//                   </p>

//                   <div className="space-y-4 max-w-md">
//                     <div>
//                       <Label
//                         htmlFor="newPassword"
//                         className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
//                       >
//                         New password
//                       </Label>
//                       <Input
//                         id="newPassword"
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
//                       />
//                     </div>
//                     <div>
//                       <Label
//                         htmlFor="confirmPassword"
//                         className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
//                       >
//                         Confirm new password
//                       </Label>
//                       <Input
//                         id="confirmPassword"
//                         type="password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
//                       />
//                     </div>
//                     {passwordError && (
//                       <p className="text-xs text-red-500">{passwordError}</p>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-3 mt-6">
//                     <Button
//                       onClick={handleChangePassword}
//                       disabled={savingPassword || !newPassword}
//                       className="bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                       {savingPassword && (
//                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                       )}
//                       Update password
//                     </Button>
//                     {passwordSaved && (
//                       <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
//                         <Check className="h-3.5 w-3.5" /> Password updated
//                       </span>
//                     )}
//                   </div>

//                   <div className="mt-10 pt-6 border-t border-[#E2E8F0] dark:border-[#334155] max-w-md">
//                     <div className="flex items-center gap-2 mb-1">
//                       <AlertTriangle className="h-4 w-4 text-red-500" />
//                       <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
//                         Delete account
//                       </h3>
//                     </div>
//                     <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-3">
//                       This permanently deletes your account, resumes, and all
//                       associated data. This cannot be undone.
//                     </p>
//                     <Label
//                       htmlFor="deleteConfirm"
//                       className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
//                     >
//                       Type <span className="font-semibold">DELETE</span> to
//                       confirm
//                     </Label>
//                     <Input
//                       id="deleteConfirm"
//                       value={deleteConfirmText}
//                       onChange={(e) => setDeleteConfirmText(e.target.value)}
//                       className="mt-1.5 mb-3 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
//                     />
//                     {deleteError && (
//                       <p className="text-xs text-red-500 mb-2">
//                         {deleteError}
//                       </p>
//                     )}
//                     <Button
//                       variant="destructive"
//                       disabled={deleteConfirmText !== 'DELETE' || deleting}
//                       onClick={handleDeleteAccount}
//                       className="bg-red-600 hover:bg-red-700 text-white"
//                     >
//                       {deleting && (
//                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                       )}
//                       Delete my account
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               {/* ========== NOTIFICATIONS ========== */}
//               {activeTab === 'notifications' && (
//                 <div className="p-5 sm:p-6">
//                   <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
//                     Notifications
//                   </h2>
//                   <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                     Choose what you want to hear from us.
//                   </p>
//                   <div className="divide-y divide-[#E2E8F0] dark:divide-[#334155] max-w-lg">
//                     {(
//                       [
//                         {
//                           key: 'productUpdates' as const,
//                           label: 'Product updates',
//                           desc: 'New features and improvements to ResumeAI.',
//                         },
//                         {
//                           key: 'jobMatchAlerts' as const,
//                           label: 'Job match alerts',
//                           desc: 'Get notified when a strong match is found for your resume.',
//                         },
//                         {
//                           key: 'weeklyTips' as const,
//                           label: 'Weekly resume tips',
//                           desc: 'A short email with tips to improve your resume.',
//                         },
//                       ]
//                     ).map((item) => (
//                       <div
//                         key={item.key}
//                         className="flex items-center justify-between py-4 first:pt-0"
//                       >
//                         <div className="pr-4">
//                           <label
//                             htmlFor={`notif-${item.key}`}
//                             className="text-sm font-medium text-[#0F172A] dark:text-white cursor-pointer"
//                           >
//                             {item.label}
//                           </label>
//                           <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
//                             {item.desc}
//                           </p>
//                         </div>
//                         <Switch
//                           id={`notif-${item.key}`}
//                           checked={notifications[item.key]}
//                           onCheckedChange={(checked) =>
//                             setNotifications((prev) => ({
//                               ...prev,
//                               [item.key]: checked,
//                             }))
//                           }
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* ========== BILLING ========== */}
//               {activeTab === 'billing' && (
//                 <div className="p-5 sm:p-6">
//                   <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
//                     Billing
//                   </h2>
//                   <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
//                     Manage your plan and payment details.
//                   </p>
//                   <div className="flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] max-w-lg">
//                     <div>
//                       <p className="text-sm font-semibold text-[#0F172A] dark:text-white">
//                         Free Plan
//                       </p>
//                       <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
//                         3 resumes · Basic AI suggestions
//                       </p>
//                     </div>
//                     <Link href={'/dashboard/plans'}>
//                       <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//                         Upgrade
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Shell>
//   );
// }

// function refreshUser() {
//   throw new Error('Function not implemented.');
// }







































































'use client';

import { useState, useEffect, useRef } from 'react';
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Camera,
  Check,
  Loader2,
  AlertTriangle,
  Trash2,
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { cn } from '@/app/lib/utils';
import { createClient } from '@/app/lib/supabase/client';
import { useAuth } from '@/app/providers/auth-provider';
import { Shell } from '../../components/layout/Shell-temp';
import Link from 'next/link';

const tabs = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'security', name: 'Security', icon: Lock },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'billing', name: 'Billing', icon: CreditCard },
] as const;

type TabId = (typeof tabs)[number]['id'];

const NOTIF_STORAGE_KEY = 'resumeai:notification-prefs';
const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export default function SettingsPage() {
  const { user, refreshUser } = useAuth();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<TabId>('profile');

  // ---------- Profile state ----------
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState('');

  // ---------- Avatar state ----------
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [removingAvatar, setRemovingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState('');

  // Seed from user on mount / when user changes
  useEffect(() => {
    if (user) {
      setDisplayName(
        user.user_metadata?.display_name ||
          user.email?.split('@')[0] ||
          ''
      );
      setAvatarUrl(user.user_metadata?.avatar_url || undefined);
    }
  }, [user]);

  // ---------- Security state ----------
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  // ---------- Delete account state ----------
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // ---------- Notification state ----------
  const [notifications, setNotifications] = useState({
    productUpdates: true,
    jobMatchAlerts: true,
    weeklyTips: false,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(NOTIF_STORAGE_KEY);
      if (raw) setNotifications((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(notifications));
    } catch {
      /* ignore */
    }
  }, [notifications]);

  const fullName =
    user?.user_metadata?.display_name ||
    user?.email?.split('@')[0] ||
    'User';
  const email = user?.email || '';

  // ---------- Profile handlers ----------
  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setProfileSaved(false);
    setProfileError('');

    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName.trim() },
    });

    setSavingProfile(false);

    if (error) {
      setProfileError(error.message);
      return;
    }

    await refreshUser?.();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  // ---------- Avatar handlers ----------
  const handleAvatarClick = () => {
    if (uploadingAvatar || removingAvatar) return;
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setAvatarError('');

    if (!ALLOWED_TYPES.includes(file.type)) {
      setAvatarError('Please select a JPG, PNG, WEBP, or GIF image.');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      setAvatarError('Image must be under 2MB.');
      e.target.value = '';
      return;
    }

    setUploadingAvatar(true);

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
      const path = `${user.id}/avatar.${ext}`;

      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, {
          upsert: true,
          cacheControl: '3600',
          contentType: file.type,
        });

      if (uploadError) {
        // Surface the real reason instead of a generic message
        if (uploadError.message.toLowerCase().includes('bucket')) {
          throw new Error(
            "Storage bucket 'avatars' not found. Create it in Supabase → Storage."
          );
        }
        if (uploadError.message.toLowerCase().includes('policy')) {
          throw new Error(
            'Upload blocked by storage policy. Check your RLS policies.'
          );
        }
        throw uploadError;
      }

      // 2. Get public URL + cache-bust
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(path);

      const newAvatarUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;

      // 3. Persist to user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: newAvatarUrl },
      });
      if (updateError) throw updateError;

      // 4. Update local state + refresh context
      setAvatarUrl(newAvatarUrl);
      await refreshUser?.();
    } catch (err) {
      console.error('Avatar upload failed:', err);
      setAvatarError(
        err instanceof Error ? err.message : 'Failed to upload avatar.'
      );
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user || removingAvatar || uploadingAvatar) return;
    if (!avatarUrl) return;

    const confirmed = window.confirm(
      'Remove your profile picture? You can upload a new one anytime.'
    );
    if (!confirmed) return;

    setAvatarError('');
    setRemovingAvatar(true);

    try {
      // Best-effort delete — try common extensions
      const pathsToTry = [
        `${user.id}/avatar.png`,
        `${user.id}/avatar.jpg`,
        `${user.id}/avatar.jpeg`,
        `${user.id}/avatar.webp`,
        `${user.id}/avatar.gif`,
      ];

      await Promise.all(
        pathsToTry.map((p) =>
          supabase.storage.from('avatars').remove([p]).catch(() => null)
        )
      );

      // Clear avatar_url in user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: null },
      });
      if (updateError) throw updateError;

      // Update local state + refresh context
      setAvatarUrl(undefined);
      await refreshUser?.();
    } catch (err) {
      console.error('Avatar removal failed:', err);
      setAvatarError(
        err instanceof Error ? err.message : 'Failed to remove avatar.'
      );
    } finally {
      setRemovingAvatar(false);
    }
  };

  // ---------- Password handlers ----------
  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSaved(false);

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setSavingPassword(false);

    if (error) {
      setPasswordError(error.message);
    } else {
      setPasswordSaved(true);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSaved(false), 2500);
    }
  };

  // ---------- Delete account ----------
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') return;
    setDeleting(true);
    setDeleteError('');

    try {
      const res = await fetch('/api/account/delete', { method: 'POST' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Failed to delete account.');
      }
      window.location.href = '/';
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
      setDeleting(false);
    }
  };

  const avatarBusy = uploadingAvatar || removingAvatar;

  // ---------- Render ----------
  return (
    <Shell>
      <div className="min-h-full bg-[#F8FAFC] dark:bg-[#0B1220] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-[#0F172A] dark:text-white">
              Settings
            </h1>
            <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
              Manage your account and preferences.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* ---------- NAV ---------- */}
            <nav
              aria-label="Settings sections"
              className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible lg:w-56 flex-shrink-0 pb-1 lg:pb-0"
            >
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0',
                      active
                        ? 'bg-white dark:bg-[#1E293B] shadow-sm border border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-white'
                        : 'text-[#64748B] dark:text-[#94A3B8] hover:bg-white/60 dark:hover:bg-[#1E293B]/60 border border-transparent'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4 flex-shrink-0',
                        active ? 'text-blue-600' : 'text-[#94A3B8]'
                      )}
                    />
                    {tab.name}
                  </button>
                );
              })}
            </nav>

            {/* ---------- PANEL ---------- */}
            <div className="flex-1 min-w-0 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl shadow-sm">
              {/* ========== PROFILE ========== */}
              {activeTab === 'profile' && (
                <div className="p-5 sm:p-6">
                  <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
                    Profile
                  </h2>
                  <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
                    This information may appear on resumes you export and
                    shared links.
                  </p>

                  {/* ---------- Avatar block ---------- */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-20 w-20 rounded-full border border-[#E2E8F0] dark:border-[#334155]">
                        {avatarUrl ? (
                          <AvatarImage
                            src={avatarUrl}
                            alt={displayName || 'User avatar'}
                          />
                        ) : null}
                        <AvatarFallback className="bg-blue-600 text-white text-xl font-semibold">
                          {displayName?.[0]?.toUpperCase() ||
                            user?.email?.[0]?.toUpperCase() ||
                            'U'}
                        </AvatarFallback>
                      </Avatar>

                      {/* Camera overlay button */}
                      <button
                        type="button"
                        onClick={handleAvatarClick}
                        disabled={avatarBusy}
                        aria-label="Change avatar"
                        className={cn(
                          'absolute -bottom-1 -right-1 h-7 w-7 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1E293B] bg-blue-600 hover:bg-blue-700 transition',
                          avatarBusy && 'opacity-60 cursor-wait'
                        )}
                      >
                        {uploadingAvatar ? (
                          <Loader2 className="h-3.5 w-3.5 text-white animate-spin" />
                        ) : (
                          <Camera className="h-3.5 w-3.5 text-white" />
                        )}
                      </button>

                      <input
                        ref={fileInputRef}
                        id="avatar-upload"
                        type="file"
                        accept={ALLOWED_TYPES.join(',')}
                        className="hidden"
                        onChange={handleAvatarUpload}
                        disabled={avatarBusy}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F172A] dark:text-white truncate">
                        {displayName || fullName}
                      </p>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                        JPG, PNG, WEBP or GIF · up to 2MB
                      </p>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-2 mt-2.5">
                        <button
                          type="button"
                          onClick={handleAvatarClick}
                          disabled={avatarBusy}
                          className={cn(
                            'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md border border-[#E2E8F0] dark:border-[#334155] text-[#334155] dark:text-[#CBD5E1] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A] transition',
                            avatarBusy && 'opacity-50 cursor-not-allowed'
                          )}
                        >
                          {uploadingAvatar ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Camera className="h-3 w-3" />
                          )}
                          {avatarUrl ? 'Change' : 'Upload'}
                        </button>

                        {avatarUrl && (
                          <button
                            type="button"
                            onClick={handleRemoveAvatar}
                            disabled={avatarBusy}
                            className={cn(
                              'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition',
                              avatarBusy && 'opacity-50 cursor-not-allowed'
                            )}
                          >
                            {removingAvatar ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                            Remove
                          </button>
                        )}
                      </div>

                      {avatarError && (
                        <p className="text-xs text-red-500 mt-2">
                          {avatarError}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ---------- Name / Email ---------- */}
                  <div className="space-y-4 max-w-md">
                    <div>
                      <Label
                        htmlFor="fullName"
                        className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
                      >
                        Full name
                      </Label>
                      <Input
                        id="fullName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
                      >
                        Email address
                      </Label>
                      <Input
                        id="email"
                        value={email}
                        disabled
                        className="mt-1.5 bg-[#F1F5F9] dark:bg-[#0B1220] border-[#E2E8F0] dark:border-[#334155] text-[#94A3B8] cursor-not-allowed"
                      />
                      <p className="text-xs text-[#94A3B8] mt-1">
                        Email is managed by your login provider.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={savingProfile || !displayName.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {savingProfile && (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      )}
                      Save changes
                    </Button>
                    {profileSaved && (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3.5 w-3.5" /> Saved
                      </span>
                    )}
                    {profileError && (
                      <span className="text-xs text-red-500">
                        {profileError}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* ========== SECURITY ========== */}
              {activeTab === 'security' && (
                <div className="p-5 sm:p-6">
                  <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
                    Security
                  </h2>
                  <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
                    Update your password to keep your account secure.
                  </p>

                  <div className="space-y-4 max-w-md">
                    <div>
                      <Label
                        htmlFor="newPassword"
                        className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
                      >
                        New password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="confirmPassword"
                        className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
                      >
                        Confirm new password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
                      />
                    </div>
                    {passwordError && (
                      <p className="text-xs text-red-500">{passwordError}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <Button
                      onClick={handleChangePassword}
                      disabled={savingPassword || !newPassword}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {savingPassword && (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      )}
                      Update password
                    </Button>
                    {passwordSaved && (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3.5 w-3.5" /> Password updated
                      </span>
                    )}
                  </div>

                  <div className="mt-10 pt-6 border-t border-[#E2E8F0] dark:border-[#334155] max-w-md">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
                        Delete account
                      </h3>
                    </div>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-3">
                      This permanently deletes your account, resumes, and all
                      associated data. This cannot be undone.
                    </p>
                    <Label
                      htmlFor="deleteConfirm"
                      className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
                    >
                      Type <span className="font-semibold">DELETE</span> to
                      confirm
                    </Label>
                    <Input
                      id="deleteConfirm"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="mt-1.5 mb-3 bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#334155]"
                    />
                    {deleteError && (
                      <p className="text-xs text-red-500 mb-2">
                        {deleteError}
                      </p>
                    )}
                    <Button
                      variant="destructive"
                      disabled={deleteConfirmText !== 'DELETE' || deleting}
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {deleting && (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      )}
                      Delete my account
                    </Button>
                  </div>
                </div>
              )}

              {/* ========== NOTIFICATIONS ========== */}
              {activeTab === 'notifications' && (
                <div className="p-5 sm:p-6">
                  <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
                    Notifications
                  </h2>
                  <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
                    Choose what you want to hear from us.
                  </p>
                  <div className="divide-y divide-[#E2E8F0] dark:divide-[#334155] max-w-lg">
                    {(
                      [
                        {
                          key: 'productUpdates' as const,
                          label: 'Product updates',
                          desc: 'New features and improvements to ResumeAI.',
                        },
                        {
                          key: 'jobMatchAlerts' as const,
                          label: 'Job match alerts',
                          desc: 'Get notified when a strong match is found for your resume.',
                        },
                        {
                          key: 'weeklyTips' as const,
                          label: 'Weekly resume tips',
                          desc: 'A short email with tips to improve your resume.',
                        },
                      ]
                    ).map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between py-4 first:pt-0"
                      >
                        <div className="pr-4">
                          <label
                            htmlFor={`notif-${item.key}`}
                            className="text-sm font-medium text-[#0F172A] dark:text-white cursor-pointer"
                          >
                            {item.label}
                          </label>
                          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                        <Switch
                          id={`notif-${item.key}`}
                          checked={notifications[item.key]}
                          onCheckedChange={(checked) =>
                            setNotifications((prev) => ({
                              ...prev,
                              [item.key]: checked,
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========== BILLING ========== */}
              {activeTab === 'billing' && (
                <div className="p-5 sm:p-6">
                  <h2 className="text-base font-semibold text-[#0F172A] dark:text-white mb-1">
                    Billing
                  </h2>
                  <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6">
                    Manage your plan and payment details.
                  </p>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] max-w-lg">
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A] dark:text-white">
                        Free Plan
                      </p>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                        3 resumes · Basic AI suggestions
                      </p>
                    </div>
                    <Link href={'/dashboard/plans'}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Upgrade
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}