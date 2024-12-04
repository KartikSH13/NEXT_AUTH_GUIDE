// SERVER LAYOUT

import React from "react";
// import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import {NextAuthProvider} from "../../provider/next-auth";
import { NEXT_AUTH_OPTIONS } from "../../pages/api/auth/[...nextauth]";

export default async function Layout({children}){
    const session=getServerSession(NEXT_AUTH_OPTIONS);
    if(!session){
        // session not available , write redirect logic

        // example
        // redirect('/signin');
    }
    return (
        <NextAuthProvider session={session}>
            <main className="pb-8 md:pb-12"> {children} </main>
        </NextAuthProvider>
    )
}