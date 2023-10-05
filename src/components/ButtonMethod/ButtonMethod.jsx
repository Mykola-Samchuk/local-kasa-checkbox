"use client";
import "./buttonMethod.css";
import axios from "axios";
import { useState } from "react";
export default function ButtonMethod({ name, port, urlMethod, onDataReceived }) {
  const [status, setStatus] = useState({
    isLoaded: false,
    error: null,
    data: [],
  });

  const handlerTaxinfo = () => {
    if(!port){
      onDataReceived("Не вказаний або не вірний порт")
    }
    setStatus({ isLoaded: true });
    axios
      .get(`http://127.0.0.1:${port}${urlMethod}`)
      .then((response) => {
        // console.log(response.data)
        return response.data;
      })
      .then((result) => {
        setStatus({ isLoaded: false, data: result });
        // onDataReceived(result);
        
        onDataReceived(result, urlMethod); 
      })
      .catch((error) => {
        setStatus({ isLoaded: false, error: error });
        
      });
  };
  return (
    <>
      <button className="btn" onClick={handlerTaxinfo}>{name}</button>
    </>
  );
}
