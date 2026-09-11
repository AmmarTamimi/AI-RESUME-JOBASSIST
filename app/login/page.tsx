// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { 
//   ArrowLeft, 
//   Mail, 
//   Lock, 
//   Eye, 
//   EyeOff,
//   Sparkles,
//   CheckCircle,
//   FileText
// } from 'lucide-react';
// import { cn } from '../lib/utils';
// import { useAuth } from '../providers/auth-provider';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("")
//   const {signIn, signInWithGoogle} = useAuth();
//   const router = useRouter();

//   const handleSubmit = async(e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//         console.log("signing in with email: ",email," password: ",password)
//         await signIn(email,password);
//         router.push("/dashboard");
//     } catch (error:any) {
//         setError(error.message || "failed to login");
//     } finally{
//         setIsLoading(false);
//     }
//   };


//   const handleGoogleLogin = async() => {
//     setIsLoading(true);
//     try {
//         await signInWithGoogle();
//     } catch (error:any) {
//         setError(error.message || "failed to login");
//     } finally{
//         setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/10 p-4">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         {/* Back button */}
//         <Link 
//           href="/" 
//           className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
//         >
//           <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
//           Back to home
//         </Link>

//         {/* Card */}
//         <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
//           {/* Logo */}
//           <div className="flex items-center justify-center gap-2 mb-6">
//             <div className="p-2 rounded-lg bg-accent/10 text-accent">
//               <FileText className="h-4 w-4" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
//               ResumeAI
//             </span>
//           </div>

//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
//             <p className="text-muted-foreground mt-1">
//               Sign in to your account to continue
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="john@example.com"
//                   className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <div className="flex items-center justify-between mb-1.5">
//                 <label htmlFor="password" className="block text-sm font-medium text-foreground">
//                   Password
//                 </label>
//                 <Link 
//                   href="/forgot-password" 
//                   className="text-sm text-accent hover:underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember me */}
//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 id="remember"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 className="h-4 w-4 rounded border-input text-accent focus:ring-ring focus:ring-2 focus:ring-offset-2 cursor-pointer"
//               />
//               <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
//                 Remember me
//               </label>
//             </div>
//             {error && <p className='text-red-500'>{error}</p>}

//             {/* Submit button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={cn(
//                 "w-full py-2.5 bg-accent text-accent-foreground rounded-lg font-medium transition-all",
//                 "hover:opacity-90 active:scale-[0.98]",
//                 "shadow-lg shadow-accent/25",
//                 "disabled:opacity-50 disabled:cursor-not-allowed",
//                 "flex items-center justify-center gap-2"
//               )}
//             >
//               {isLoading ? (
//                 <>
//                   <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
//                   Signing in...
//                 </>
//               ) : (
//                 'Sign In'
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-border" />
//             </div>
//             <div className="relative flex justify-center text-xs uppercase">
//               <span className="bg-card px-2 text-muted-foreground">
//                 Or continue with
//               </span>
//             </div>
//           </div>

//           {/* Social buttons */}
//           <div className="grid grid-cols-2 gap-3">
//             <button onClick={()=>handleGoogleLogin()} className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg hover:bg-secondary transition-colors text-sm font-medium">
//               <svg className="h-5 w-5" viewBox="0 0 24 24">
//                 <path
//                   fill="currentColor"
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                 />
//               </svg>
//               Google
//             </button>
//             <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg hover:bg-secondary transition-colors text-sm font-medium">
//               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.399 1.02 0 2.046.133 3.003.399 2.293-1.552 3.301-1.23 3.301-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//               </svg>
//               GitHub
//             </button>
//           </div>

//           {/* Sign up link */}
//           <p className="text-center text-sm text-muted-foreground mt-6">
//             Don't have an account?{' '}
//             <Link href="/register" className="text-accent hover:underline font-medium">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }








































'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Sparkles,
  CheckCircle,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../providers/auth-provider';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const {signIn, signInWithGoogle} = useAuth();
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        console.log("signing in with email: ",email," password: ",password)
        await signIn(email,password);
        router.push("/dashboard");
    } catch (error:any) {
        setError(error.message || "failed to login");
    } finally{
        setIsLoading(false);
    }
  };

  const handleGoogleLogin = async() => {
    setIsLoading(true);
    try {
        await signInWithGoogle();
    } catch (error:any) {
        setError(error.message || "failed to login");
    } finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/10 p-4 sm:p-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors mb-2 sm:mb-3 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-4 sm:p-5 md:p-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <div className="p-1.5 rounded-lg bg-accent/10 text-accent">
              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </div>

          {/* Header */}
          <div className="text-center mb-3 sm:mb-4">
            <h1 className="text-lg sm:text-xl font-bold text-foreground">Welcome back</h1>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[11px] sm:text-xs font-medium text-foreground mb-0.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full pl-8 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label htmlFor="password" className="block text-[11px] sm:text-xs font-medium text-foreground">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-[10px] sm:text-xs text-accent hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-8 pr-9 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-input text-accent focus:ring-ring focus:ring-2 focus:ring-offset-2 cursor-pointer"
              />
              <label htmlFor="remember" className="text-[11px] sm:text-xs text-muted-foreground cursor-pointer">
                Remember me
              </label>
            </div>
            {error && <p className='text-[11px] sm:text-xs text-red-500'>{error}</p>}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-1.5 sm:py-2 bg-accent text-accent-foreground rounded-lg font-medium transition-all text-xs sm:text-sm mt-1",
                "hover:opacity-90 active:scale-[0.98]",
                "shadow-lg shadow-accent/25",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-2"
              )}
            >
              {isLoading ? (
                <>
                  <div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-2.5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleGoogleLogin()} className="flex items-center justify-center gap-1.5 px-2 py-1.5 border border-border rounded-lg hover:bg-secondary transition-colors text-[11px] sm:text-xs font-medium">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-1.5 px-2 py-1.5 border border-border rounded-lg hover:bg-secondary transition-colors text-[11px] sm:text-xs font-medium">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.399 1.02 0 2.046.133 3.003.399 2.293-1.552 3.301-1.23 3.301-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-[11px] sm:text-xs text-muted-foreground mt-2.5">
            Don't have an account?{' '}
            <Link href="/register" className="text-accent hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}