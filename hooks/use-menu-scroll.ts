"use client";

import { RefObject, useEffect } from "react";

export default function useMenuScroll(
  navMenu: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    let scrollPosition = window.scrollY;
    let scrollTimeout: NodeJS.Timeout | null = null;

    function handleScroll() {
      const newScrollPosition = window.scrollY;
      const menu = navMenu.current;

      if (!menu) return;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      if (newScrollPosition > scrollPosition) {
        menu.classList.add("scrolling-down");
        menu.classList.remove("scroll-up", "pause");

        scrollTimeout = setTimeout(() => {
          if (navMenu.current) {
            navMenu.current.classList.add("pause");
            navMenu.current.classList.remove("scrolling-down");
          }
        }, 5000);
      } else if (newScrollPosition < scrollPosition && newScrollPosition > 0) {
        menu.classList.add("scroll-up");
        menu.classList.remove("scrolling-down", "pause");

        scrollTimeout = setTimeout(() => {
          if (navMenu.current) {
            navMenu.current.classList.remove("scrolling-down", "scroll-up");
            navMenu.current.classList.add("pause");
          }
        }, 5000);
      } else {
        menu.classList.remove("scrolling-down", "pause", "scroll-up");
      }

      scrollPosition = newScrollPosition;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [navMenu]);
}
