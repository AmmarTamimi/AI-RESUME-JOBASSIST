import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from './lib/utils';
import { AuthProvider } from './providers/auth-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ResumeAI - Smart Resume Analyzer & Optimizer',
  description: 'AI-powered resume analysis, ATS optimization, and smart job applications',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.variable
      )}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}































// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import { cn } from './lib/utils';
// import { AuthProvider } from './providers/auth-provider';
// // import { ThemeProvider } from './providers/theme-provider';
// import { AppearanceProvider } from './providers/appearance-provider';

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// export const metadata: Metadata = {
//   title: 'ResumeAI - Smart Resume Analyzer & Optimizer',
//   description: 'AI-powered resume analysis, ATS optimization, and smart job applications',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={cn(
//         'min-h-screen bg-background font-sans antialiased',
//         inter.variable
//       )}>
//         {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
//           <AppearanceProvider>
//             <AuthProvider>
//               {children}
//             </AuthProvider>
//           </AppearanceProvider>
//         {/* </ThemeProvider> */}
//       </body>
//     </html>
//   );
// }