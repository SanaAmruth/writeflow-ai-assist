
import React from 'react';
import BlogEditor from '@/components/BlogEditor';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <BlogEditor />
    </div>
  );
};

export default Index;
