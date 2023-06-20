import { useState, ReactNode } from 'react';
import Meta, { defaultMetaProps } from '@/components/layout/meta';
import { useRouter } from 'next/router';
import LoadingDots from '../icons/loading-dots';

export default function Layout({
  children
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  // const [sidebarOpen, setSidebarOpen] = useState(false);

  if (router.isFallback) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <LoadingDots color="white" />
      </div>
    );
  }


  return (
    <div className="w-full mx-auto h-screen flex overflow-hidden">
      <Meta props={defaultMetaProps}/>

      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            {/* Navbar */}

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
