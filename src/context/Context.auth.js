import React, { createContext } from 'react'
import { useState } from 'react';
import App from "../App"

export const authContext=createContext();

export const ContextAuth = () => {
    const[isLoggedIn,setIsLoggedIn]=useState(false);
    const [postArray,setPostArray]=useState([]);
  return (
    <authContext.Provider value={{isLoggedIn,setIsLoggedIn,postArray,setPostArray}}>
        <App/>
    </authContext.Provider>
  )
}