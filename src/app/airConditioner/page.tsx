'use client'
import React, { useState , useRef, useEffect } from 'react'
import styles from './ac.module.css'
import Image from 'next/image'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const page = () => {
    const [toggle,setToggle] = useState('/bulbasaur.gif');
    const checkRef = useRef<HTMLInputElement>(null);
    const [number,setNumber] = useState(16);
    useEffect(() => {
        (async () => {
        try{
            const data = await axios.get("https://kodessphere-api.vercel.app/devices/WOH0yD1")
            if(data.status == 200) {
                setNumber(data.data.ac);
                setToggle("/bulbasaur.gif");
                checkRef.current ? checkRef.current.checked = true : null;
                const div = (document.getElementById("ifChecked") as HTMLDivElement)
                div ? div.style.backgroundColor = "green" : null;
                setNumber(data.data.ac);
            } else {
                setToggle("/bulbasaur1.png");
                checkRef.current ? checkRef.current.checked = false : null;
                const div = (document.getElementById("ifChecked") as HTMLDivElement)
                div ? div.style.backgroundColor = "red" : null;
                setNumber(0)
            }
        } catch(e) {
            setToggle("/bulbasaur1.png");
            checkRef.current ? checkRef.current.checked = false : null;
            const div = (document.getElementById("ifChecked") as HTMLDivElement);
            if(div) {
                div.style.backgroundColor = "red"
            }
            setNumber(0)
            toast("Internal server error!");
        }
        })();
    }, [])
    const tempControls = async (operator: string)=>{
        const previousValue = number;
        if(operator == "+" && number<=29) {
            setNumber(number + 1);
        } else if(operator == "-" && number>=17) {
            setNumber(number - 1);
        }
        try{
            const data = await axios.post("https://kodessphere-api.vercel.app/devices", {
                teamid: "WOH0yD1",
                device: "ac",
                value: {
                    temp: number,
                    state: toggle == "/bulbasaur1.png" ? 0 : 1
                }
            });
            if(data.status == 200) {
                toast("AC Temperature changed successfully!")
            } else {
                setNumber(previousValue);
                toast("Something went wrong returned status was not 200", {
                    type: "error"
                })
            }
        } catch(e) {
            setNumber(previousValue);
            toast("Internal server error", {
                type: "error"
            });
        }
    }



    const image = async()=>{
        const img = document.getElementById("img");
        const previousValue = number;
        const previousToggle = toggle;
        if(checkRef.current && checkRef.current.checked == true){
          setToggle('/bulbasaur.gif');
        }
        else if(checkRef.current && checkRef.current.checked == false){
          setToggle('/bulbasaur1.png');
        }
        try{
            const data = await axios.post("https://kodessphere-api.vercel.app/devices", {
                teamid: "WOH0yD1",
                device: "ac",
                value: {
                    temp: number,
                    state: toggle == "/bulbasaur1.png" ? 0 : 1
                }
            });
            console.log(data);
            if(data.status == 200) {
                toast("AC Temperature changed successfully!")
            } else {
                setNumber(previousValue);
                setToggle(previousToggle);
                setCheck(false);
                toast("Something went wrong returned status was not 200", {
                    type: "error"
                })
            }
        } catch(e) {
            setNumber(previousValue);
            setToggle(previousToggle);
            setCheck(false);
            console.log("wtf");
            toast("Internal server error", {
                type: "error"
            });
        }
      }

      const setCheck = (checkValue: boolean) => {
        if(checkRef.current)
            checkRef.current.checked = checkValue
      }

  return (
    <div className={styles.container}>
        <div className={styles.controlsContainer}>
            <h1 style = {{marginTop:'5px',fontSize:'2rem'}}>Air Conditioner Switch</h1>
            <label className={styles.switch}>
          <input ref={checkRef} onChange={image} type="checkbox" />
          <span className={styles.sliderOne}></span>
          </label>
          <div style={{fontSize:'1rem'}} className={styles.counterContainer}>
            <h1>Temperature Control</h1>
            <div className={styles.counter}>{number}</div>
            <div className={styles.plusMinus}>
                <div style={{display:'flex',alignContent:'space-evenly', justifyContent:'space-evenly'}}>
                <button  className={styles.minus} onClick={() => tempControls("-")}>-</button>
                <button className={styles.plus} onClick={() => tempControls("+")}>+</button>
                </div>
            </div>
          </div>
          <div className={styles.realTimeContainer}><h1>Real time <p>Status: </p></h1>
            <Image style={{borderRadius:'10px'}} id='img' className={styles.bulbaImage} src={toggle} alt='bulba.png' height={100} width={200} />
          </div>
        </div>
        <div className={styles.acContainer}>
            <Image className={styles.acImage} src={toggle != "/bulbasaur1.png" ? "/Acper.gif" : "/ac.png"} alt='ac.png' height={300} width={200} />
            {
                toggle != "/bulbasaur1.png" ?
                <div className='rotate__wind'>
                    <Image src={"/wind.gif"} width={300} height={300} alt='wind'/>
                    </div>
                :
                <></>
            }
        </div>  
        <ToastContainer />
    </div>
  )
}

export default Page
