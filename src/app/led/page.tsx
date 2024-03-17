
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RgbColorPicker, RgbColor } from "react-colorful";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page () {
  const [color, setColor] = useState<RgbColor>({
    r: 255,
    g: 255,
    b: 255,
  });

  const [status, setStatus] = useState(false);

  function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  const apiUrl = `https://kodessphere-api.vercel.app/devices`;
  useEffect(() => {
    (async () => {
      try {
        const data: {
          data: {
            led: string;
          };
        } = await axios.get(apiUrl + "/WOH0yD1");
        if (data.data.led == "#000000") {
          setStatus(false);
          setColor({
            r: 0,
            g: 0,
            b: 0,
          });
        } else {
          setStatus(true);
          const rgbValue = hexToRgb(data.data.led);
          if (rgbValue) {
            setColor({
              ...rgbValue,
            });
          }
        }
        console.log(JSON.stringify(data.data, null, 2));
      } catch {
        toast("something went wrong while getting device status.", {
          type: "error"
        });
      }
    })();
  }, []);

  function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r: number, g: number, b: number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  async function handleClick() {
    if (status) {
      setColor({
        r: 0,
        g: 0,
        b: 0,
      });
      setStatus(false);
    } else {
      setColor({
        r: 255,
        g: 255,
        b: 255,
      });
      setStatus(true);
    }
    try {
      const data = await axios.post(apiUrl, {
        teamid: "WOH0yD1",
        device: "led",
        value: rgbToHex(color.r, color.g, color.b),
      });
      if (data.status == 200) {
        toast("Led Color Changed successfully.");
      } else {
        toast("Led light can't be changed internal server error.");
      }
    } catch (e) {
      toast("Led light can't be changed internal server error.");
      setStatus(false);
    }
  }
  async function switchLight() {
    try {
      const data = await axios.post(apiUrl, {
        teamid: "WOH0yD1",
        device: "led",
        value: rgbToHex(color.r, color.g, color.b),
      });
      if (data.status == 200) {
        toast("Led Color Changed successfully.");
        setStatus(true);
      } else {
        toast("Led light can't be changed internal server error.");
        setStatus(false);
      }
    } catch (e) {
      toast("Led light can't be changed internal server error.", { type: "error" });
      setStatus(false);
    }
  }
  async function changeLight(value: RgbColor) {
    setColor(value);
  }
  return (
    <div className="flex h-[100%] animated_svg w-[100%] space-around items-center justify-center items-center w-screen">
      <div className="w-[70vw] gap-9 p-5 h-[80vh] flex flex-col justify-center items-start pl-[200px]">
        <h1
          style={{
            color: status ? `rgb(${color.r},${color.g},${color.b})` : "white",
          }}
          className="text-white font-bold logo-font text-5xl"
        >
          Control Your LED Lights
          <p className="inline logo-font logo-animation font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 pl-5 text-5xl animate-gradient bg-300%">
            :D
          </p>
        </h1>
        <div className="flex items-center justify-between w-[50%] space-between cursor-pointer">
          <RgbColorPicker
            color={color}
            onMouseUp={() => {
              switchLight();
            }}
            onChange={changeLight}
          />
          <div
            className={`text-container ${
              status ? "text-green-500" : "text-red-500"
            } logo-font flex flex-col text-4xl transition-transform hover:scale-125`}
            onClick={() => {
              handleClick();
            }}
          >
            <h1>Status:</h1>
            <div className="flex items-center justify-center">
              <p>{status ? "ON" : "OFF"}</p>
              <Image
                src={status ? "/happycat.png" : "/sadcatbetter.png"}
                alt="statuscat"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          background: `radial-gradient(rgba(${color.r},${color.g},${color.b},1) 0%, transparent 51%, transparent 100%)`,
        }}
        className="w-[30vw] flex flex-col items-center justify-center p-5 h-[80vh] "
      >
        <Image
          src={"/light-buld.svg"}
          width={200}
          height={200}
          alt="light bulb"
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Page;