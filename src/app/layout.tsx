import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "ag-grid-community/styles/ag-grid.css";


export const metadata: Metadata = {
  title: "Next Application",
  description: "Next auth guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="4x4" href="/LOGO.png" />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}