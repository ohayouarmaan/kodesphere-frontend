
"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="relative mt-[90px] pb-4 flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="logo-font relative p-5 logo-animation font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-8xl animate-gradient bg-300%">
          <div className="absolute top-[-150px] left-[-150px]">
            <Image src={"/kitty-chase-pixel.gif"} width={200} height={200} alt="something" />
          </div>
          Bright Sense
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="/fan"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl text-transparent logo-font font-semibold bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 bg-300%`}>
            Fan{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm logo-font opacity-50`}>
            Control the Fan using this.
          </p>
        </Link>

        <Link
          href="/bulb"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl text-transparent logo-font font-semibold bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 bg-300%`}>
            Bulb{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] logo-font text-sm opacity-50`}>
            Control the Fan using this.
          </p>
        </Link>

        <Link
          href="/led"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl text-transparent logo-font font-semibold bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 bg-300%`}>
            LED{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] logo-font text-sm opacity-50`}>
            Control your home LED using this.
          </p>
        </Link>

        <Link
          href="airConditioner"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl text-transparent logo-font font-semibold bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 bg-300%`}>
            Air Conditioner{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] logo-font text-sm opacity-50 text-balance`}>
            Instantly change your AC status and temperature.
          </p>
        </Link>
      </div>
    </main>
  );
}

