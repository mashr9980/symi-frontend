import Link from "next/link";
import { CheckCircleIcon } from 'lucide-react';

// app/confirmation/page.tsx
export default function Confirmation() {
    return (
      <div className="min-h-screen sacred-grid bg-sacred-ground text-sacred-ash">
        <div className="max-w-4xl mx-auto text-center space-y-8 px-4 py-20">
          <div className="mx-auto w-24 h-24 bg-sacred-breath/10 rounded-full flex items-center justify-center">
            <CheckCircleIcon className="w-16 h-16 text-sacred-breath animate-sacred-pulse" />
          </div>
          
          <h1 className="text-4xl font-light">
            Sacred Blueprint Consecrated
          </h1>
          
          <p className="text-xl text-sacred-ash/80 max-w-2xl mx-auto">
            Your business architecture is being illuminated by cosmic wisdom. 
            Expect divine insights within 48 hours.
          </p>
          
          <div className="flex justify-center gap-4 mt-12">
            <Link href="/blueprint" className="sacred-button-primary">
              View Blueprints
            </Link>
            <Link href="/" className="sacred-button-secondary">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }