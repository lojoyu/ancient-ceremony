import {useState, useEffect, useRef, useLayoutEffect} from 'react';
import { ReactP5Wrapper} from "react-p5-wrapper";
import styled from "styled-components";
import sketch from './P5Canvas.js';


//window.p5 = p5;
//import 'p5/lib/addons/p5.play'

//import p5 from 'p5';

// window.p5 = p5;
// addP5Play(window.p5);


const ItemContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
`
// div {
//     height: 100%;
//     width: 100%;
//   }

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  

export function P5() {
    const canvasRef = useRef(null)
    const [size, setSize] = useState({ w: 0, h: 0})
    const [width, height] = useWindowSize();
    // const resized = () => {
    //     setSize({ w: canvasRef.current.clientWidth, h: canvasRef.current.clientHeight })
    // }

    // useEffect(resized, [])
    // useEffect(() => {
    //     console.log('resize')
    //     window.addEventListener('resize', resized);
    //     return () => window.removeEventListener('resize', resized);
    // });

    return (
    <ItemContainer ref={canvasRef}>
        <ReactP5Wrapper sketch={sketch} size={{w: width, h:height}} />
    </ItemContainer>
    )  ;
}

 