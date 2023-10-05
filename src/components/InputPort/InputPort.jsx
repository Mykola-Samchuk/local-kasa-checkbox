'use client';
import "./inputPort.css"
export default function InputPort({onChange}) {
  return (
    <>
      <input className="inp-port" type="text" placeholder="Вкажіть порт." onChange={onChange}/>
    </>
  );
}
