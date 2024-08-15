import React from "react";

import "@shared/styles/tailwind.css";
import Components from "@shared/components/Components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard LongeAge",
  description: "Dashboard untuk LongeAge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Components>{children}</Components>
      </body>
    </html>
  );
}
