import Dashboard from "@shared/components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LongeAge Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Dashboard>{children}</Dashboard>;
}
