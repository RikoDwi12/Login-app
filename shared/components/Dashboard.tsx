"use client";

import { AppShell } from "@mantine/core";
import { useState } from "react";
import Nav from "./Navbar";
import Head from "./Header";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="sm"
      navbar={<Nav opened={opened} />}
      header={<Head opened={opened} setOpened={setOpened} />}
    >
      {children}
    </AppShell>
  );
}
