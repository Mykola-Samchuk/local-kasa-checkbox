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
  onError,
}) {
  const [status, setStatus] = useState({
    isLoaded: false,
    error: null,
    data: [],
  });

  const handlerButtonMthod = () => {
    if (!port) {
      onError("Не вказаний або не вірний порт");
      return;
    }
    setStatus({ isLoaded: true });

    const axiosConfig = {
      method: method, // Вкажіть HTTP-метод (GET або POST)
      url: `http://127.0.0.1:${port}${urlMethod}`,
      headers: {
        "X-Client-Name": "web-kasa-manager",
        "X-Client-Version": "v1.01",
      },
    };
    // дані для POST-запиту (якщо метод - "post")
    if (method.toLowerCase() === "post") {
      //  дані або об'єкт для відправлення разом з POST-запитом
      const postData = {
        // Добавити дані
      };
      axiosConfig.data = postData;
    }
    axios(axiosConfig)
      .then((response) => response.data)
      .then((result) => {
        setStatus({ isLoaded: false, data: result });
        console.log(result);
        onDataReceived(result, urlMethod);
      })
      .catch((error) => {
        setStatus({ isLoaded: false, error: error });
        // console.log(error)
        // onError(error.message);
        onError(error.message);
      });
    // axios
    //   .get(`http://127.0.0.1:${port}${urlMethod}`)
    //   .then((response) => {
    //     return response.data;
    //   })
    //   .then((result) => {
    //     setStatus({ isLoaded: false, data: result });
    //     onDataReceived(result, urlMethod);
    //   })
    //   .catch((error) => {
    //     setStatus({ isLoaded: false, error: error });
    //     onError(error.message);
    //   });
  };
  return (
    <>
      <button className="btn" onClick={handlerButtonMthod}>
        {name}
      </button>
    </>
  );
}
