"use client";
import { useEffect, useState } from "react";
import "./header.css";
import Link from "next/link";

export default function Header() {
  const [active, setActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Не забудьте удалить слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // window.addEventListener("scroll", function () {
  //   if (window.scrollY > 10) {
  //     setScrolled(true);
  //   } else setScrolled(false);
  // });

  const handlerLinkClose = () => {
    if (active) {
      setActive(false);
      enableScroll();
    }
  };

  const handleMenuToggle = () => {
    setActive((prevState) => !prevState);

    if (!active) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  const disableScroll = () => {
    document.body.classList.add("scroll-locked");
  };

  const enableScroll = () => {
    document.body.classList.remove("scroll-locked");
  };
  return (
    <>
      <header className={`header-wrapp ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <nav className="nav-wrapp">
            <ul className={`nav-link-wrapp ${active ? "active" : ""}`}>
              <li className="link-wrapp">
                <Link href="/">Local Kasa</Link>{" "}
              </li>
              <li className="link-wrapp">
                <Link href="Global">Global Kasa</Link>{" "}
              </li>
              <li className="link-wrapp"></li>
            </ul>
          </nav>
          <div
            className={`mobile-btn ${active ? "active" : ""}`}
            onClick={handleMenuToggle}
          >
            <span></span>
          </div>
        </div>
      </header>
    </>
  );
}
