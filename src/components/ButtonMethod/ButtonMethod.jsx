"use client";
import { useState } from "react";
export default function ButtonMethod({ name, port, method, onDataReceived }) {
  const [status, setStatus] = useState({
    isLoaded: false,
    error: null,
    data: [],
  });

  const handlerTaxinfo = () => {
    setStatus({ isLoaded: true });
    fetch(`http://127.0.0.1:${port}${method}`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setStatus({ isLoaded: false, data: result });
        onDataReceived(result)
      })
      .catch((error) => {
        setStatus({ isLoaded: false, error: error });
        // console.log(error.detail);
      });
  };
  return (
    <>
      <button onClick={handlerTaxinfo}>{name}</button>
    </>
  );
}
