"use client"
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import MAN from "../public/man.json";
import COIN from "../public/coin.json";
import FANS from "../public/fans.json";
import { Player } from '@lordicon/react';
import { Lottie } from "lottie-react";

export default function Home() {
  const [gifKey, setGifKey] = useState(0);

  const handleHover = () => {
    setGifKey((prev) => prev + 1);
  };

  const manRef = useRef(null);
  const coinRef = useRef(null);
  const fanRef = useRef(null);

  useEffect(() => {
    manRef.current?.playFromBeginning()
    coinRef.current?.playFromBeginning()
    fanRef.current?.playFromBeginning()
  }, [])


  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center h-[44vh]">
        <div className="font-bold text-5xl text-blue-950 flex justify-center items-center gap-8">
          <span> Buy me a NOTE </span>
          <div onMouseEnter={handleHover} className="cursor-pointer">
            <Image
              key={gifKey}
              src="/creditcard.gif"
              alt="Lordicon"
              width={50}
              height={50}
              priority
              unoptimized
            />
          </div>
        </div>
        <p>A crowdfunding Platform to earn Money</p>
        <div className="flex gap-1">
          <button className="bg-blue-600 text-white font-bold border rounded-full p-2 cursor-pointer hover:scale-110">
            Start Now!
          </button>
          <button className="bg-blue-600 text-white font-bold border rounded-full p-2 cursor-pointer hover:scale-110">
            Read More
          </button>

        </div>
      </div>
      <div className="line h-0.5 bg-black opacity-10 w-full"></div>
      <div className="flex flex-col p-16">
        <h1 className="text-lg font-bold text-center my-4">Your Supporters can buy you a Chai</h1>
        <div className="flex gap-5 items-center justify-center">
          <div className="item flex justify-around gap-5 md:w-full md:flex-row flex-col">
            <div className="rounded-full p-4 bg-slate-700 flex flex-col items-center">
              <div
                className="cursor-pointer"
                onMouseEnter={() => manRef.current?.playFromBeginning()}
              >
                <Player
                  ref={manRef}
                  icon={MAN}
                  size={50}
                />
              </div>
              <p className="text-white font-bold">Fund Yourself</p>
            </div>
            <div className="rounded-full p-4 bg-slate-700 flex flex-col items-center">
              <div
                className="cursor-pointer"
                onMouseEnter={() => coinRef.current?.playFromBeginning()}
              >
                <Player
                  ref={coinRef}
                  icon={COIN}
                  size={50}
                />
              </div>
              <p className="text-white font-bold">Fund Yourself</p>
            </div>
            <div className="rounded-full p-4 bg-slate-700 flex flex-col items-center">
              <div
                className="cursor-pointer"
                onMouseEnter={() => fanRef.current?.playFromBeginning()}
              >
                <Player
                  ref={fanRef}
                  icon={FANS}
                  size={50}
                />
              </div>
              <p className="text-white font-bold">Fans want to help </p>
            </div>
          </div>
        </div>
      </div>
      <div className="line h-0.5 bg-black opacity-10 w-full"></div>

      <div className="flex flex-col p-16">
        <h1 className="text-lg font-bold text-center my-4">Learn More About Us</h1>
        <div className="flex gap-5 items-center justify-center">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/GCm2Akdz3Qg?si=MOCzmJzvcyoYQOEU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>

    </>
  );
}
