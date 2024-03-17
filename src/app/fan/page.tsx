'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './fan.module.css'
import Image from 'next/image'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [toggle,setToggle] = useState('/fan2.png');
  const checkRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(0);
  const fanGIF = ()=>{
    const fan = document.getElementById("fan");
    if(checkRef.current && checkRef.current.checked == true){
      setToggle('/fan1.gif');
    }
    else if(checkRef.current && checkRef.current.checked == false){
      setToggle('/fan2.png');
    }
  }

  useEffect(() => {
    (async () => {
      try{
        const data = await axios.get("https://kodessphere-api.vercel.app/devices/WOH0yD1")
        if(data.status == 200) {
          setValue(data.data.fan);
          if(data.data.fan == 0) {
            setToggle("/fan2.png")
            checkRef.current ? checkRef.current.checked = false : null;
            (document.getElementById("ifChecked") as HTMLDivElement).style.backgroundColor = "red"
            setValue(0)
          } else {
            setToggle("/fan1.gif")
            checkRef.current ? checkRef.current.checked = true : null;
            (document.getElementById("ifChecked") as HTMLDivElement).style.backgroundColor = "green"
            setValue(data.data.fan);
          }
        }
      } catch(e) {
        toast("Internal server error!");
      }
    })();
  }, [])

  const nyanCat = ()=>{
    const nyanCat1 = document.getElementById("nyanCat");
    if(nyanCat1 && checkRef.current && checkRef.current.checked == true){
      nyanCat1.style.opacity = "1";
      setValue(1);
      const checkbox: HTMLDivElement | null = document.getElementById("ifChecked") as HTMLDivElement;
      checkbox.style.backgroundColor = "#04AA6D";
      setToggle("/fan1.gif")
    }
    else if(nyanCat1 && checkRef.current && checkRef.current.checked == false){
      nyanCat1.style.opacity = "0";
      const checkbox: HTMLDivElement | null = document.getElementById("ifChecked") as HTMLDivElement;
      checkbox.style.backgroundColor = "#ff0800";
      setValue(0);
      setToggle("/fan2.png")
    }
  }
  const checkToggle = ()=>{
    const checkbox: HTMLDivElement | null = document.getElementById("ifChecked") as HTMLDivElement;
    if(checkRef.current && checkRef.current.checked == true){
      checkbox.style.backgroundColor = "#04AA6D";
      setValue(value + 1);
      setToggle("/fan1.gif");
    } else if(checkRef.current && checkRef.current.checked == false) {
      checkbox.style.backgroundColor = "#ff0800";
      setValue(0);
      setToggle("/fan2.png")
    }
  }

  // async function handleRangeChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   console.log(value);
  //   if(parseInt(value) == 0) {
  //     checkRef.current ? checkRef.current.checked = false : null;
  //     const checked = document.getElementById("ifChecked")
  //     if(checked){
  //       checked.style.backgroundColor = "red";
  //     }
  //   } else {
  //     checkRef.current ? checkRef.current.checked = true : null;
  //     const checked = document.getElementById("ifChecked")
  //     if(checked){
  //       checked.style.backgroundColor = "green";
  //     }
  //   }
  //   try{
  //     console.log("sending data: ", parseInt(`${value}`))
  //     const data = await axios.post("https://kodessphere-api.vercel.app/devices", {
  //       device: "fan",
  //       value: parseInt(`${value}`),
  //       teamid: "WOH0yD1"
  //     });
  //     if(data.status == 200) {
  //       toast("Fan speed changed successfully!");
  //     } else {
  //       toast("Internal server error", {
  //         type: "error"
  //       });
  //     }
  //   } catch(e) {
  //     toast("internal server error", {
  //       type: "error"
  //     });
  //   }
  // }

  return (
    <div className={styles.container}>
      <div className={styles.controlsContainer}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <div className={styles.toggle}>
          <h1 style = {{marginTop:'5px',fontSize:'2rem'}}>Fan Switch</h1>
          <label className={styles.switch}>
          <input ref={checkRef} onChange={(e) => {
            checkToggle();
            fanGIF();
            nyanCat();
          }} type="checkbox" />
          <span className={styles.sliderOne}></span>
          </label>
          </div>
          {toggle != '/fan2.png' ? <Image id='nyanCat' style={{marginTop:'20px',opacity:1}} src="/nyanCat1.gif" alt= "nyanCat.gif" width={260} height={100} /> : <></>}
          </div>
      <div className={styles.slidecontainer}>
          <h1>Control your fan speed ;D</h1>
          <h1>Current fan speed: {value}</h1>
          <div className='flex'>
            <button className='p-5 bg-green-500' onClick={async () => {
              setToggle("/fan1.gif")
              checkRef.current ? checkRef.current.checked = true : null;
              (document.getElementById("ifChecked") as HTMLDivElement).style.backgroundColor = "green"
              if(value >= 5) {
                setValue(5)
              } else {
                setValue(value + 1)
              }
              try{
                console.log("sending data: ", parseInt(`${value}`))
                const data = await axios.post("https://kodessphere-api.vercel.app/devices", {
                  device: "fan",
                  value: parseInt(`${value}`),
                  teamid: "WOH0yD1"
                });
                if(data.status == 200) {
                  toast("Fan speed changed successfully!");
                } else {
                  toast("Internal server error", {
                    type: "error"
                  });
                }
              } catch(e) {
                toast("internal server error", {
                  type: "error"
                });

              }
            }}>+</button>
            <button className="p-5 bg-red-500" onClick={async () => {
              if(value <= 0) {
                setToggle("/fan2.png")
                checkRef.current ? checkRef.current.checked = false : null;
                (document.getElementById("ifChecked") as HTMLDivElement).style.backgroundColor = "red"
                setValue(0)
              } else {
                setValue(value - 1)
              }
              try{
                console.log("sending data: ", parseInt(`${value}`))
                const data = await axios.post("https://kodessphere-api.vercel.app/devices", {
                  device: "fan",
                  value: parseInt(`${value}`),
                  teamid: "WOH0yD1"
                });
                if(data.status == 200) {
                  toast("Fan speed changed successfully!");
                } else {
                  toast("Internal server error", {
                    type: "error"
                  });
                }
              } catch(e) {
                toast("internal server error", {
                  type: "error"
                });
              }
            }}>-</button>

          </div>
      </div>
      <div className={styles.status}>
        <h1>Real Time 
          <p>status:</p></h1>
        <div id='ifChecked' className={styles.check}></div>
      </div>
      </div>
      <div className={styles.fanContainer}>
          <Image id='fan' src={toggle} alt='fan.png' width={200} height={500} />
      </div>
      <ToastContainer />
    </div>
  )
}

export default Page
