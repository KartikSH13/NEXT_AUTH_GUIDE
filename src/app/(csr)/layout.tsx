// CLIENT SIDE LAYOUT

import React from "react";
// import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {NextAuthProvider} from "../../provider/next-auth";

export default function Layout({children}){
    const { data: session } = useSession();

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