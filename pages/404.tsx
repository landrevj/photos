import Meta, { defaultMetaProps } from '@/components/layout/meta';

export const Custom400 = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-slate-50 '>
      <Meta
        props={{
          ...defaultMetaProps,
          title: '404 | MongoDB Starter Kit',
          ogUrl: 'https://mongodb.vercel.app/404',
        }}
      />
      <h1>404</h1>
    </div>
  );
};

export default Custom400;
