# NextAuth Guide

This repository demonstrates how to implement authentication using **NextAuth.js** in a Next.js project. It provides a comprehensive setup for authentication with credential-based login and JWT session management, as well as examples of both CSR (Client-Side Rendering) and SSR (Server-Side Rendering) authentication.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [File Structure](#file-structure)
- [Core Files](#core-files)
  - [`[...nextauth].ts`](#nextauth-file)
  - [`next-auth.ts`](#provider-file)
- [Usage](#usage)
  - [Client-Side Rendering (CSR)](#csr-example)
  - [Server-Side Rendering (SSR)](#ssr-example)
- [Next Steps](#next-steps)
- [Contributing](#contributing)

---

## Features

- Authentication with **Credentials Provider**
- **JWT-based session management** with access token refreshing logic
- Support for both **Client-Side Rendering (CSR)** and **Server-Side Rendering (SSR)**
- Centralized provider (`NextAuthProvider`) for managing session context
- Example usage of `useSession`, `getSession`, and `getServerSession`

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/next-auth-guide.git
   cd next-auth-guide
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root of the project and add the following variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-random-secret-key
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## File Structure

```
src/
├── pages/
│   └── api/
│       └── auth/
│           └── [...nextauth].ts
├── provider/
│   └── next-auth.ts
├── app/
│   ├── (csr)/
│   │   └── layout.tsx
│   ├── (ssr)/
│   │   └── layout.tsx
└── ...
```

---

## Core Files

### `[...]nextauth].ts` (NextAuth Configuration)

This file defines the main NextAuth configuration, using `CredentialsProvider` for custom authentication. It includes:

- **Authentication logic** (`authorize` method)
- **JWT callbacks** for token validation and refreshing
- **Session callbacks** to structure session data

**Key Sections:**
- `isValidToken`: Validates JWT expiry
- `refreshAccessToken`: Refreshes the access token
- `callbacks.jwt`: Manages token creation and validation
- `callbacks.session`: Attaches session data like `accessToken` and user details

```ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Full implementation is available in the source code.
export default NextAuth(NEXT_AUTH_OPTIONS);
```

---

### `next-auth.ts` (Session Provider)

The `NextAuthProvider` wraps your app to provide session management. It uses the `SessionProvider` from `next-auth/react` to manage authentication in both CSR and SSR environments.

```tsx
'use client';

import { SessionProvider } from 'next-auth/react';

export const NextAuthProvider = ({ session, children }: NextAuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
```

---

## Usage

### Client-Side Rendering (CSR) Example

Use the `NextAuthProvider` to wrap your app's layout for CSR. Example implementation in `src/app/(csr)/layout.tsx`:

```tsx
import { NextAuthProvider } from '@/provider/next-auth';

export default function Layout({ children }) {
  return (
    <NextAuthProvider>
      <main>{children}</main>
    </NextAuthProvider>
  );
}
```

In your components, you can use `useSession` to access session data:

```tsx
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) return <p>Please log in</p>;

  return <p>Welcome, {session.user.name}!</p>;
}
```

---

### Server-Side Rendering (SSR) Example

For SSR, use `getServerSession` to retrieve session data on the server. Example implementation in `src/app/(ssr)/layout.tsx`:

```tsx
import { getServerSession } from 'next-auth';
import { NEXT_AUTH_OPTIONS } from '@/pages/api/auth/[...nextauth]';

export default async function Layout({ children }) {
  const session = await getServerSession(NEXT_AUTH_OPTIONS);

  return (
    <NextAuthProvider session={session}>
      <main>{children}</main>
    </NextAuthProvider>
  );
}
```

---

## Next Steps

1. Add OAuth providers like Google, GitHub, etc.
2. Implement token refreshing with actual backend logic.
3. Secure API routes using middleware or server-side session validation.
4. Extend the session schema as per your application's requirements.