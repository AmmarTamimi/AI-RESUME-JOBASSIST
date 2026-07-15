import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        
        <div className="bg-card p-8 rounded-2xl border shadow-sm">
          <h1 className="text-3xl font-bold mb-2">Contact Sales</h1>
          <p className="text-muted-foreground mb-8">
            Our sales team is ready to help you find the perfect plan for your needs.
          </p>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@company.com"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1.5">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                placeholder="Acme Inc."
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Tell us about your needs and team size..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-2.5 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition active:scale-[0.98] font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}