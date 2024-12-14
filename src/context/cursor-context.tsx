"use client";

import React, {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";

const SidebarContext = createContext<{
  isHovered: boolean;
  setIsHovered: Dispatch<SetStateAction<boolean>>;
}>({
  isHovered: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsHovered: () => {},
});

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [hover, setHover] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ isHovered: hover, setIsHovered: setHover }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
