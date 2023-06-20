import Meta, { defaultMetaProps } from '@/components/layout/meta';

export default function Custom404() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
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
}
