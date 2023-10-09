"use client";
import "./localKasa.css";
import { useState } from "react";
import InputPort from "@/components/InputPort/InputPort";
import ButtonMethod from "../ButtonMethod/ButtonMethod";
import ErrorRequest from "../ErrorRequest/ErrorRequest";

export default function LocalKasa() {
  const [port, setPort] = useState("");
  const [requestDataMethod, setRequestDataMethod] = useState("");
  const [error, setError] = useState(null);

  const taxes = "/api/v1/tax/taxes";
  const getShifts = "/api/v1/shifts";
  const getofflineOnline = "/api/v1/kasa/status";

  // Обробляєм отримуєм дані для порта з інпута
  const handlerInputPort = (e) => {
    setPort(e.target.value);
  };

  // Обробляєм запити з каси
  const handlerDataFromButtonMethod = (data, urlMethod) => {
    setRequestDataMethod(() => ({
      [urlMethod]: data,
    }));
    setError(null);
    console.log(requestDataMethod);
  };
  const handlerErrorButtonMethod = (errorMessage) => {
    setError(errorMessage);
    console.log(errorMessage);
  };

  return (
    <>
      <section className="section-content">
        <div className="port-setting">
          <div className="setting-wrapp">
            <InputPort onChange={handlerInputPort} />
          </div>
        </div>
        <div className="param-wrapp">
          <div className="method-wrapp">
            <h2 className="title">Method</h2>

            <div className="request-wrapp">
              <ButtonMethod
                name={"Податкові ставки"}
                port={port}
                method={"get"}
                urlMethod={taxes}
                onDataReceived={(data) =>
                  handlerDataFromButtonMethod(data, "getTaxes")
                }
                onError={handlerErrorButtonMethod}
              />
              <ButtonMethod
                name={"Поточна зміна"}
                port={port}
                method={"get"}
                urlMethod={getShifts}
                onDataReceived={(data) =>
                  handlerDataFromButtonMethod(data, "getShifts")
                }
                onError={handlerErrorButtonMethod}
              />
              <ButtonMethod
                name={`Offline / Online`}
                port={port}
                method={"get"}
                urlMethod={getofflineOnline}
                onDataReceived={(data) =>
                  handlerDataFromButtonMethod(data, "getOfflineOnline")
                }
                onError={handlerErrorButtonMethod}
              />
            </div>
          </div>
          <div className="info-wrapp">
            <h2 className="title">Information</h2>
            <div>
              {error ? (
                <ErrorRequest errorMessage={error} />
              ) : requestDataMethod.getTaxes &&
                requestDataMethod.hasOwnProperty("getTaxes") &&
                requestDataMethod.getTaxes.length > 0 ? (
                <div className="info-blc">
                  <div className="info-title">Податкові ставки:</div>
                  <ul className="info-list">
                    {requestDataMethod.getTaxes.map((item, index) => {
                      return (
                        <li className="info-list-item" key={index}>{`${
                          item.code
                        } - ${item.label} - ${item.symbol} - ( ${item.rate}%  ${
                          item.extra_rate ? `+${item.extra_rate}%` : ""
                        })`}</li>
                      );
                    })}
                  </ul>
                </div>
              ) : requestDataMethod.getShifts &&
                requestDataMethod.hasOwnProperty("getShifts") &&
                requestDataMethod.getShifts.length > 0 ? (
                <div className="info-blc">
                  <div className="info-title">Поточна зміна:</div>
                  <ul className="info-list">
                    {console.log(requestDataMethod.getShifts[0])}
                    <li className="info-list-item">
                      ID Зміни - {requestDataMethod.getShifts[0].external_id}
                    </li>
                    <li className="info-list-item">
                      Cтатус - {requestDataMethod.getShifts[0].status}
                    </li>
                    <li className="info-list-item">
                      Відкриття - {requestDataMethod.getShifts[0].opened_at}
                    </li>
                    <li className="info-list-item">
                      Закриття -{" "}
                      {requestDataMethod.getShifts[0].status === "CLOSED"
                        ? requestDataMethod.getShifts[0].updated_at
                        : "Зміна не закрита"}
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              {requestDataMethod.getOfflineOnline ? <>getOfflineOnline</> : ""}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
