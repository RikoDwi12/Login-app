// eslint-disable-next-line lines-around-directive
"use client";
import { UnstyledButton } from "@mantine/core";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { capitalize } from "@shared/utils/capitalize";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  title?: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
  withBreadcrumb?: boolean;
  back?: boolean;
}
export default function Heading({
  title,
  subtitle,
  rightComponent,
  withBreadcrumb,
  back,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const renderBreadcrumb = () => {
    if (!withBreadcrumb) return null;
    const path = pathname.split("/").filter(item => item !== "");

    const onClickPath = (index: number) => {
      router.replace(`/${path.slice(0, index + 1).join("/")}`);
    };

    return (
      <div className="flex flex-row text-sm my-1 mb-3">
        {path.map((item, index) => {
          return (
            <div key={index} className="flex flex-row items-center">
              <UnstyledButton onClick={() => onClickPath(index)}>
                <span
                  className={`${
                    index === path.length - 1 ? "text-gray-400" : ""
                  }`}
                >
                  {capitalize(item)}
                </span>
              </UnstyledButton>
              {index !== path.length - 1 && <span className="mx-2">/</span>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-row justify-between items-center shadow-header p-4">
      <div>
        {renderBreadcrumb()}
        <div className="flex flex-row items-center gap-2">
          {back && (
            <UnstyledButton onClick={() => router.back()}>
              <ChevronLeftIcon width={28} height={28} />
            </UnstyledButton>
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <h2 className="text-sm text-gray-400">{subtitle}</h2>
      </div>

      <div>{rightComponent}</div>
    </div>
  );
}
