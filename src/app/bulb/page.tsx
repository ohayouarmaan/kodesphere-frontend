"use client";
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import styles from './bulb.module.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [isOn, setOn] = useState(false);
  const checkRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    (async () => {
        if(isOn) {
            try {
                await axios.post("https://kodessphere-api.vercel.app/devices", {
                    teamid: "WOH0yD1",
                    device: "bulb",
                    value: isOn ? 1 : 0
                });
                toast("Bulb turned on");
            } catch(e) {
                toast("internal server error", {
                    type: "error"
                });
            }
        } else {
            try{
                await axios.post("https://kodessphere-api.vercel.app/devices", {
                    teamid: "WOH0yD1",
                    device: "ac",
                    value: isOn ? 1 : 0
                });
                toast("Bulb turned off");
            } catch(e) {
                toast("internal server error", {
                    type: "error"
                });
            }
        }
    })()
  }, [isOn]);
  return (
    <div className={styles.container}>
        <div className={`${styles.statuscontainer}`}>
            <div className={styles.heading}>
                <h1 className={styles.title}>Bulb Switch </h1>
            </div>

            <div className={styles.toggle}>
                <label className={styles.switch}>
                <input ref={checkRef} onChange={async (e) => {
                    if(e.target.checked) {
                        setOn(true);
                        try {
                            const data = await axios.post("https://kodessphere-api.vercel.app/devices", {
                                teamid: "WOH0yD1",
                                device: "bulb",
                                value: isOn ? 1 : 0
                            });
                            if(data.status == 200) {
                                toast("Bulb turned on");
                                setOn(true);
                                checkRef.current ? checkRef.current.checked = true : null;
                            } else {
                                checkRef.current ? checkRef.current.checked = false : null;
                                toast("Internal server error", {
                                    type: "error"
                                });
                                setOn(false);
                            }
                        } catch(e) {
                            setOn(false);
                            checkRef.current ? checkRef.current.checked = false : null;
                            toast("internal server error", {
                                type: "error"
                            });
                        }
                    } else {
                        setOn(false);
                        try{
                            const data = await axios.post("https://kodessphere-api.vercel.app/devices", {
                                teamid: "WOH0yD1",
                                device: "ac",
                                value: isOn ? 1 : 0
                            });
                            if(data.status == 200) {
                                toast("Bulb turned off");
                                setOn(false);
                                checkRef.current ? checkRef.current.checked = true : null;
                            } else {
                                toast("Internal server error");
                                checkRef.current ? checkRef.current.checked = false : null;
                                setOn(false);
                            }
                        } catch(e) {
                            setOn(false);
                            toast("internal server error", {
                                type: "error"
                            });
                            checkRef.current ? checkRef.current.checked = false : null;
                        }
                    }
                }} type="checkbox" />
                <span className={styles.slider}></span>
                </label>
            </div>

            <div className={`${styles.status} gap-9`}>
                <div>
                    <h1>Real Time Status:</h1>
                    <h2>{isOn ? "On" : "Off" }</h2> 
                </div>
                <div>
                <Image src={isOn ? "/bongodown.png" : "/bongoup.png"} alt="bongo" width={150} height={125} />
                </div>
            </div>

        </div>

        <div className={isOn ? styles.designcontainer : styles.off__design__container}> 
            <Image src="/light-buld.svg" alt="off_bulb" width={250} height={200} />
        </div>
        <ToastContainer />
    </div>
  )
}

export default Page
