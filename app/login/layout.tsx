import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tittle Halaman Login",
  description: "Deskripsi Halaman Login",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
