"use client";
import "./localKasa.css";
import { useState } from "react";
import InputPort from "@/components/InputPort/InputPort";
import ButtonMethod from "../ButtonMethod/ButtonMethod";
import ErrorRequest from "../ErrorRequest/ErrorRequest";
import InputService from "../InputSend/InputPort/InputService";

export default function LocalKasa() {
  const [port, setPort] = useState("");
  const [srevice, setService] = useState("")
  const [requestDataMethod, setRequestDataMethod] = useState("");
  const [error, setError] = useState(null);

  const taxes = "/api/v1/tax/taxes";
  const getShifts = "/api/v1/shifts";
  const getofflineOnline = "/api/v1/kasa/status";
  const openShift = "/api/v1/shift/open";
  const closeShift = "/api/v1/shift/close";
  const serviceReceipt = "/api/v1/receipt/service";

  // Oтримуєм дані для порта з інпута
  const handlerInputPort = (e) => {
    setPort(e.target.value);
  };

  // Обробляєм запити з каси
  const handlerDataFromButtonMethod = (data, urlMethod) => {
    setRequestDataMethod(() => ({
      [urlMethod]: data,
    }));
    console.log(requestDataMethod);
    setError(null);
  };
  // const handlerErrorButtonMethod = (errorMessage) => {
  //   setError(errorMessage);
  // };
  const handlerErrorButtonMethod = (error) => {
    setError(error);
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
            <h2 className="title">Опції</h2>
            {/* Методи відкриття \ закриття зміни */}
            <div className="open-close">
              <ButtonMethod
                name={
                  requestDataMethod.openShift ||
                  requestDataMethod.openShift === false
                    ? "Зміна відкрита"
                    : "Відкрити зміну"
                }
                port={port}
                method={"post"}
                urlMethod={openShift}
                onDataReceived={(data) =>
                  handlerDataFromButtonMethod(data, "openShift")
                }
                onError={handlerErrorButtonMethod}
              />
              <ButtonMethod
                name={"Закрити зміну"}
                port={port}
                method={"post"}
                urlMethod={closeShift}
                onDataReceived={(data) =>
                  handlerDataFromButtonMethod(data, "closeShift")
                }
                onError={handlerErrorButtonMethod}
              />
            </div>
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
            <h2 className="title">Статус \ Інформація</h2>
            <div>
              {/* Відображення інформації */}
              {error ? (
                // <ErrorRequest errorMessage={error} />
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
              ) : requestDataMethod.getOfflineOnline &&
                requestDataMethod.hasOwnProperty("getOfflineOnline") ? (
                <div className="info-blc">
                  <div className="info-title">
                    Cтатус каси Offline \ Online:
                  </div>
                  <ul className="info-list">
                    <li className="info-list-item">
                      Статус -{" "}
                      {requestDataMethod.getOfflineOnline.online_status
                        ? "Online"
                        : "Offline"}
                    </li>
                    <li className="info-list-item">
                      Oфлайн коди -{" "}
                      {requestDataMethod.getOfflineOnline.offline_codes}
                    </li>
                    <li className="info-list-item">
                      Годин в офлайні -{" "}
                      {requestDataMethod.getOfflineOnline.hours_in_offline}
                    </li>
                    <li className="info-list-item"></li>
                  </ul>
                </div>
              ) : requestDataMethod.openShift ? (
                <div className="info-blc">
                  <div className="info-title">Зміна відкрита</div>
                </div>
              ) : requestDataMethod.closeShift ? (
                <div className="info-blc">
                  <div className="info-title">Зміна закрита</div>
                  <ul className="info-list">
                    <li className="info-list-item">
                      З-Звіт :{" "}
                      <a
                        target="_blank"
                        href={`https://api.checkbox.ua/api/v1/reports/${requestDataMethod.closeShift.id}/text`}
                      >{`https://api.checkbox.ua/api/v1/reports/${requestDataMethod.closeShift.id}/text`}</a>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="param-wrapp">
          <div className="method-wrapp">
            <h2 className="title">Внесення \ Винесення готівки</h2>
            <div className="request-wrapp">
              <div className="service-method">
                <ButtonMethod
                  name={"Внесення Готівки"}
                  port={port}
                  method={"post"}
                  urlMethod={serviceReceipt}
                  onDataReceived={(data) =>
                    handlerDataFromButtonMethod(data, "serviceReceipt")
                  }
                  onError={handlerErrorButtonMethod}
                />
                <InputService/>
              </div>

              <ButtonMethod
                name={"Винесення Готівки"}
                port={port}
                method={"post"}
                urlMethod={serviceReceipt}
                onDataReceived={(data) =>
                  handlerDataFromButtonMethod(data, "serviceReceipt")
                }
                onError={handlerErrorButtonMethod}
              />
            </div>
          </div>
          <div className="info-wrapp">
            <h2 className="title">Статус</h2>
          </div>
        </div>
      </section>
    </>
  );
}
