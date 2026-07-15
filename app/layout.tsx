import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { cn } from './lib/utils';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-jakarta' 
});

export const metadata: Metadata = {
  title: 'ResumeAI - Smart Resume Analyzer & Optimizer',
  description: 'AI-powered resume analysis, ATS optimization, and smart job applications',
  keywords: 'resume analyzer, AI resume, ATS friendly, job application, career',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-white text-gray-900 font-sans antialiased',
        inter.variable,
        jakarta.variable
      )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}