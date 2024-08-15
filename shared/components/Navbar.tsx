"use client";

import { Navbar } from "@mantine/core";
import {
  EnvelopeClosedIcon,
  FileTextIcon,
  TokensIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import { IMenu } from "@shared/types/Menu";
import MenuNavbar from "./MenuNavbar";

interface Props {
  opened: boolean;
}

export default function Nav({ opened }: Props) {
  const Menus: IMenu[] = [
    {
      name: "ini list KATEGORI",
      icon: <TokensIcon />,
      link: "/category",
      subMenus: [
        {
          name: "List",
          link: "/",
        },
        {
          name: "Top Pick",
          link: "/top-pick",
        },
      ],
    },
    {
      name: "Article",
      icon: <FileTextIcon />,
      link: "/article",
      subMenus: [
        {
          name: "List",
          link: "/",
        },
        {
          name: "Top Pick",
          link: "/top-pick",
        },
      ],
    },
    {
      name: "NewsLetter",
      link: "/newsletter",
      icon: <EnvelopeClosedIcon />,
      subMenus: [
        {
          name: "List Subscriber",
          link: "/",
        },
        {
          name: "Push Information",
          link: "/push-information",
        },
      ],
    },
    {
      name: "Product",
      link: "/product",
      icon: <MagicWandIcon />,
    },
  ];

  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
      withBorder={false}
    >
      <MenuNavbar menus={Menus} />
    </Navbar>
  );
}
