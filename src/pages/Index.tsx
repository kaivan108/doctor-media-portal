
import React from 'react';
import UploadForm from '@/components/UploadForm';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  return (
    <div className="min-h-screen animated-bg flex flex-col">
      <Toaster position="top-center" />
      
      <header className="w-full py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-2 inline-flex">
            <span className="heading-chip">Doctor Media Portal</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2 animate-slide-down">
            Medical Media Upload
          </h1>
          <p className="text-base text-gray-600 max-w-lg mx-auto animate-slide-down">
            Upload patient photos and videos securely to Google Drive, organized by ambulance/clinic and case number.
          </p>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pb-20 pt-4">
        <UploadForm />
      </main>
      
      <footer className="w-full py-6 px-4 border-t border-gray-100 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Doctor Media Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
