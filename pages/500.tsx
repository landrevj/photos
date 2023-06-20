import Meta, { defaultMetaProps } from '@/components/layout/meta';

export default function Custom500() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Meta
        props={{
          ...defaultMetaProps,
          title: '500 | MongoDB Starter Kit',
          ogUrl: 'https://mongodb.vercel.app/500'
        }}
      />
      <h1 className="text-2xl ">
        500
      </h1>
    </div>
  );
}
