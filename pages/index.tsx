import { Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import React from "react";
import Theme_toggle_button from "../components/Theme_toggle_button";

const Home: NextPage = () => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : "dark"
  );
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-white dark:bg-zinc-900">
      <Head>
        <title>Luminity</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Theme_toggle_button
          className="absolute top-4 left-1 w-fit"
          theme={theme}
          setTheme={setTheme}
        ></Theme_toggle_button>
        <h1 className="tracking-widest font-thin text-7xl text-black dark:text-white">
          LUMINITY
        </h1>
        <Button
          href={"/Main_app#today"}
          variant="outlined"
          color="inherit"
          className="rounded-none px-6 py-3 text-white border-white border mt-6 dark:bg-white dark:text-zinc-900 hover:bg-white dark:hover:bg-zinc-900 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white bg-zinc-900"
        >
          <h2>Enter</h2>
        </Button>
      </main>
    </div>
  );
};

export default Home;
