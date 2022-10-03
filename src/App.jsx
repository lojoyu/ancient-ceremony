import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { P5 } from './P5'
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'20px'} width={'100%'} />
);

function App() {
  return (<>
      {/* <Loading type={'bubbles'} color={'#FFFFFF'}></Loading> */}
      <P5></P5>
  </>)
}
export default App
