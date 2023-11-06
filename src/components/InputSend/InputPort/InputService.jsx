'use client';
import "./inputService.css"
export default function InputService({onChange}) {
  return (
    <>
      <input className="inp-service" type="text" placeholder="Вкажіть суму" onChange={onChange}/>
    </>
  );
}
