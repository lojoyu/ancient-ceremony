import {useState, useEffect, useRef} from 'react';
import { ReactP5Wrapper} from "react-p5-wrapper";
import styled from "styled-components";
import sketch from './P5Canvas.js';

//window.p5 = p5;
//import 'p5/lib/addons/p5.play'

//import p5 from 'p5';

// window.p5 = p5;
// addP5Play(window.p5);


const ItemContainer = styled.div`
  height: 100vh;
  width: 100%;
`
// div {
//     height: 100%;
//     width: 100%;
//   }

export function P5() {
    const canvasRef = useRef(null)
    const [size, setSize] = useState({ w: 0, h: 0})

    const resized = () => {
        setSize({ w: canvasRef.current.clientWidth, h: canvasRef.current.clientHeight })
    }

    useEffect(resized, [])
    useEffect(() => {
        window.addEventListener('resize', resized);
        return () => window.removeEventListener('resize', resized);
    });

    return (
    <ItemContainer ref={canvasRef}>
        <ReactP5Wrapper sketch={sketch} size={size} />
    </ItemContainer>
    )  ;
}

 