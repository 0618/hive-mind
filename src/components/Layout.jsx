import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {children}
    </div>
  );
};

export default Layout;
