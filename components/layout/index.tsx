import Meta, { defaultMetaProps } from '@/components/layout/meta';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

export const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  // const [sidebarOpen, setSidebarOpen] = useState(false);

  if (router.isFallback) {
    return (
      <div className='flex h-screen w-screen items-center justify-center bg-black'>
        ...
      </div>
    );
  }

  return (
    <div className='mx-auto flex h-screen w-full overflow-hidden'>
      <Meta props={defaultMetaProps} />

      <div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
        <div className='relative z-0 flex flex-1 overflow-hidden'>
          <main className='relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last'>
            {/* Navbar */}

            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
