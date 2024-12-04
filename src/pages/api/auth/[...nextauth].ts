// src/pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import type { NextAuthOptions } from "next-auth"

import CredentialsProvider from 'next-auth/providers/credentials';
const isValidToken=(exp:number)=>{
  const currentTime = Math.floor(Date.now() / 1000);
  return (exp > currentTime)
}
async function refreshAccessToken(token:any) {
  try {
    let new_token="" // implement your refresh token logic here
    return {
      ...token,
      access_token:new_token,
    };
  } catch (err) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}
export const NEXT_AUTH_OPTIONS:NextAuthOptions= {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        // Write necessary fields for login
        email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
      },
      async authorize(credentials) {
        let data={email:credentials.email,password:credentials.password} // implement your login/signin logic here
        //NOTE If authentication type is jwt then attach issued time & expiry time
        // const {iat,exp}=jwtDecode(data.access_token);
        // return {...data,"iat": iat,"exp": exp,};
        return data;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return user
      }
      // check if jwt token is valid or not
      if(isValidToken(token.exp)){
        return token;
      }
      // refresh token before returning data
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      // extract necessary fields to be used in session
      session.user= {
        id: Number(token.id),
        name: token.name,
        email: token.email,
      }
      session.accessToken = token.access_token; // attach jwt access token
      session.error = token.error;
      return Promise.resolve(session);
    },
    
  },
  secret: process?.env.NEXTAUTH_SECRET || "secret", // Next auth secret (a random uuid or long string)
};

export default NextAuth(NEXT_AUTH_OPTIONS);

// This session data can be used by getSession or useSession
// getServerSession for ssr 
// useSession for csr

// for getting additional fields at ssr
// pass NEXT_AUTH_OPTIONS to getServerSession
// getServerSession(NEXT_AUTH_OPTIONS)