import clientPromise from '@/lib/mongodb';
// import GitHubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    //   profile(profile) {
    //     return {
    //       id: profile.id.toString(),
    //       name: profile.name || profile.login,
    //       username: profile.login,
    //       email: profile.email,
    //       image: profile.avatar_url,
    //       followers: profile.followers,
    //       verified: true,
    //     };
    //   },
    // }),
  ],
  // callbacks: {
  //   async session({ session, user }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.username = user.username;
  //     return session;
  //   },
  // },
});

export { handler as GET, handler as POST };
