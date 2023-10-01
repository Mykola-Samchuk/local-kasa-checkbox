"use client";
import "./localKasa.css";
import { useState } from "react";
import InputPort from "@/components/InputPort/InputPort";
import ButtonMethod from "../ButtonMethod/ButtonMethod";

export default function LocalKasa() {
  const [port, setPort] = useState("");
  const [receivedData, setReceivedData] = useState(null);
  //   const [status, setStatus] = useState({
  //     isLoaded: false,
  //     error: null,
  //     data: [],
  //   });
  const taxes = "/api/v1/tax/taxes";
  const handlerInputPort = (e) => {
    console.log(e.target.value);
    setPort(e.target.value);
  };
  const handleDataFromButtonMethod = (data) => {
    // Обробка отриманих даних з ButtonMethod
    setReceivedData(data); // Збереження отриманих даних у стейті
    console.log("Дані з ButtonMethod:", data);
  };

  //   const handlerTaxinfo = () => {
  //     setStatus({ isLoaded: true });
  //     fetch(`http://127.0.0.1:${port}/api/v1/tax/taxes`)
  //       .then((response) => {
  //         return response.json();
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         throw new Error("Network failed", { cause: response.status });
  //       })
  //       .then((result) => {
  //         setStatus({ isLoaded: false, data: result });
  //         console.log(status.data);
  //       })
  //       .catch((error) => {
  //         setStatus({ isLoaded: false, error: error });
  //         console.log(error.detail);
  //       });
  //   };
  return (
    <>
      <section className="section-content ">
        <div className="param-wrapp">
          <div className="method-wrapp">
            <h2 className="title">Method</h2>
            <InputPort onChange={handlerInputPort} />
            {/* <button onClick={handlerTaxinfo}>Податки</button> */}
            <ButtonMethod
              name={"Податки 2"}
              port={port}
              method={taxes}
              onDataReceived={handleDataFromButtonMethod}
            />
          </div>
          <div className="info-wrapp">
            <h2 className="title">Information</h2>
          </div>
        </div>
      </section>
    </>
  );
}
