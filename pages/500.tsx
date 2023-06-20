import Meta, { defaultMetaProps } from '@/components/layout/meta';

export const Custom500 = () => {
  return (
    <div className='wfull flex h-screen items-center justify-center'>
      <Meta
        props={{
          ...defaultMetaProps,
          title: '500 | MongoDB Starter Kit',
          ogUrl: 'https://mongodb.vercel.app/500',
        }}
      />
      <h1 className='text-2xl '>500</h1>
    </div>
  );
};

export default Custom500;
