"use client";

import {
  Burger,
  Header,
  MediaQuery,
  Menu,
  UnstyledButton,
} from "@mantine/core";
import useAuth from "@modules/Auth/hooks/useAuth";
import { ExitIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface Props {
  setOpened: (opened: boolean) => void;
  opened: boolean;
}

export default function Head({ setOpened, opened }: Props) {
  const router = useRouter();
  const { logout, Auth } = useAuth();

  const onLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <Header
      height={{ base: 64, md: 64 }}
      p="md"
      style={{ borderBottom: "none" }}
    >
      <div className="flex w-full md:px-6">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <div className="font-brand font-medium text-2xl flex flex-1">
          LonaLono
        </div>
        <Menu>
          <Menu.Target>
            <UnstyledButton>{Auth.user?.name}</UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>
              <span className="text-inactive text-sm">{Auth.user?.email}</span>
            </Menu.Label>
            <Menu.Item icon={<ExitIcon />} onClick={onLogout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </Header>
  );
}
