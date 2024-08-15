"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Fetcher from "@shared/utils/fetcher";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";

export default function Components({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: (url: string) => Fetcher({ url }),
          onErrorRetry: error => {
            // Never retry on 404.
            return error.status !== 404;
          },
        }}
      >
        <MantineProvider
          withGlobalStyles
          withCSSVariables
          withNormalizeCSS
          theme={{
            fontFamily: "'Proxima Nova', sans-serif",
            primaryColor: "dark",
            components: {
              // Text: {
              //   classNames: {
              //     root: "text-base",
              //   },
              // },
              Button: {
                classNames: {
                  root: "bg-black hover:bg-black80 text-white w-full h-10 rounded-lg",
                },
              },
              Input: {
                classNames: {
                  error: "text-xs text-danger",
                  input:
                    "border-t-0 border-l-0 border-r-0 border-b-black80 rounded-none p-0 focus:border-b-disabled",
                },
              },
              NavLink: {
                classNames: {
                  label: "text-black font-medium",
                },
              },
              Select: {
                defaultProps: {
                  rightSection: <ChevronDownIcon />,
                },
              },
              Table: {
                styles: {
                  root: {
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    borderCollapse: "separate",
                    borderSpacing: 0,
                    "& thead tr": {
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                      position: "relative",
                      borderRadius: "12px",
                    },
                    "& thead tr th": {
                      borderBottom: "none",
                      "&:first-child": {
                        borderRadius: "12px 0 0 12px ",
                      },
                      "&:last-child": {
                        borderRadius: "0 12px 12px 0",
                      },
                      color: "#000",
                      fontSize: "12px",
                      height: "40px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      backgroundColor: "#f9f9f9",
                    },
                    "& tbody tr td": {
                      padding: "24px",
                      background: "#ffffff",
                      borderBottomColor: "#ccc",
                    },
                    "& tfoot tr td": {
                      padding: "24px",
                    },
                  },
                },
              },
            },
          }}
        >
          <Notifications />
          <main>{children}</main>
        </MantineProvider>
      </SWRConfig>
    </RecoilRoot>
  );
}
