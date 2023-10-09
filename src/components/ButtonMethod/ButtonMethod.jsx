"use client";
import "./buttonMethod.css";
import axios from "axios";
import { useState } from "react";
export default function ButtonMethod({
  name,
  port,
  method,
  urlMethod,
  onDataReceived,
  onError
}) {
  const [status, setStatus] = useState({
    isLoaded: false,
    error: null,
    data: [],
  });

  const handlerButtonMthod = () => {
    if (!port) {
      onError("Не вказаний або не вірний порт");
      return
    }
    setStatus({ isLoaded: true });
    axios
      .get(`http://127.0.0.1:${port}${urlMethod}`)
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        setStatus({ isLoaded: false, data: result });
        onDataReceived(result, urlMethod);
      })
      .catch((error) => {
        setStatus({ isLoaded: false, error: error });
        onError(error.message)
      });
  };
  return (
    <>
      <button className="btn" onClick={handlerButtonMthod}>
        {name}
      </button>
    </>
  );
}
