"use client";
import "./localKasa.css";
import { useState } from "react";
import InputPort from "@/components/InputPort/InputPort";
import ButtonMethod from "../ButtonMethod/ButtonMethod";

export default function LocalKasa() {
  const [port, setPort] = useState("");
  // const [receivedData, setReceivedData] = useState(null);
  const [requestData, setRequestData] = useState({});

  const taxes = "/api/v1/tax/taxes";
  const getShifts = "/api/v1/shifts";
  const getofflineOnline = "/api/v1/kasa/status";
  const handlerInputPort = (e) => {
    console.log(e.target.value);
    setPort(e.target.value);
  };
  // const handleDataFromButtonMethod = (data) => {
  //   // Обробка отриманих даних з ButtonMethod
  //   setReceivedData(data); // Збереження отриманих даних у стейті
  //   console.log("Дані з ButtonMethod:", data);
  // };

  const handleDataFromButtonMethod = (data, urlMethod) => {
    // Створіть новий об'єкт з оновленими даними
    setRequestData((prevData) => ({
      ...prevData,
      [urlMethod]: data,
    }));

    console.log(`Дані з ${urlMethod}:`, data);
  };
  // console.log(requestData)

  return (
    <>
      <section className="section-content">
        <div className="param-wrapp">
          <div className="method-wrapp">
            <h2 className="title">Method</h2>
            <div className="setting-wrapp">
              <InputPort onChange={handlerInputPort} />
            </div>
            <div className="request-wrapp">
              <ButtonMethod
                name={"Податкові ставки"}
                port={port}
                urlMethod={taxes}
                // onDataReceived={handleDataFromButtonMethod}
                onDataReceived={(data) =>
                  handleDataFromButtonMethod(data, "getTaxes")
                }
              />
              <ButtonMethod
                name={"get  Shift info"}
                port={port}
                urlMethod={getShifts}
                // onDataReceived={handleDataFromButtonMethod}
                onDataReceived={(data) =>
                  handleDataFromButtonMethod(data, "getShifts")
                }
              />
              <ButtonMethod
                name={`Offline / Online`}
                port={port}
                urlMethod={getofflineOnline}
                // onDataReceived={handleDataFromButtonMethod}
                onDataReceived={(data) =>
                  handleDataFromButtonMethod(data, "getOfflineOnline")
                }
              />
            </div>
          </div>
          <div className="info-wrapp">
            <h2 className="title">Information</h2>
            <div>{requestData.getTaxes ? <div>Податок</div> : ""}</div>
            <div>{requestData.getShifts ? <>getShifts</> : ""}</div>
            <div>{requestData.getOfflineOnline ? <>getOfflineOnline</> : ""}</div>
          </div>
        </div>
      </section>
    </>
  );
}
