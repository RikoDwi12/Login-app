"use client";

import { NavLink } from "@mantine/core";
import { IMenu } from "@shared/types/Menu";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  menus: IMenu[];
}
function MenuNavbar({ menus }: Props) {
  const router = useRouter();
  const pathName = usePathname();

  const onClick = (path: string) => {
    return router.push(`/dashboard${path}`);
  };

  const isActive = (path: string) => {
    if (path[path.length - 1] === "/") {
      return pathName === `/dashboard${path.slice(0, path.length - 1)}`;
    }
    return pathName === `/dashboard${path}`;
  };

  const isOpened = (path: string) => {
    return pathName.includes(`/dashboard${path}`);
  };

  return (
    <div>
      {menus.map(menu => {
        return (
          <NavLink
            defaultOpened={isOpened(menu.link)}
            className="h-12"
            classNames={{
              label: `${
                isActive(`${menu.link}`) && !menu.subMenus
                  ? "text-white font-semibold"
                  : "text-black"
              }`,
            }}
            color="dark"
            variant="filled"
            active={!menu.subMenus ? isActive(`${menu.link}`) : undefined}
            onClick={!menu.subMenus ? () => onClick(menu.link) : undefined}
            label={menu.name}
            icon={menu.icon}
            key={menu.link}
          >
            {menu.subMenus &&
              menu.subMenus.map(subMenu => {
                return (
                  <NavLink
                    key={menu.link}
                    className="h-10"
                    classNames={{
                      root: "rounded-md",
                      label: `${
                        isActive(`${menu.link}${subMenu.link}`)
                          ? "text-white font-semibold"
                          : "text-black"
                      }`,
                    }}
                    color="dark"
                    variant="filled"
                    active={isActive(`${menu.link}${subMenu.link}`)}
                    label={subMenu.name}
                    onClick={() => onClick(`${menu.link}${subMenu.link}`)}
                  />
                );
              })}
          </NavLink>
        );
      })}
    </div>
  );
}

export default MenuNavbar;
