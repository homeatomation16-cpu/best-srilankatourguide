"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function BookingBox({ vehicle }) {

  const [form,setForm] = useState({
    name:"",
    email:"",
    phone:"",
    date:"",
    time:"",
    notes:""
  });

  const handle=(k,v)=>setForm({...form,[k]:v});

  const send=async()=>{

    if(!form.name || !form.email){
      return alert("Fill required fields");
    }

    const params={
      ...form,
      vehicle: vehicle?.name
    };

    try{

      await emailjs.send(
        "service_9fflwkc",
        "template_4fclvxr",
        params,
        "_PDrKKzoflFb6YJUT"
      );

      const msg=`
Booking Request

Name: ${form.name}
Vehicle: ${vehicle?.name}
Phone: ${form.phone}
Date: ${form.date}
Time: ${form.time}
Notes: ${form.notes}
`;

      window.open(
        `https://wa.me/94769300334?text=${encodeURIComponent(msg)}`
      );

      alert("Booking Sent ✅");

    }catch(err){
      alert("Error ❌");
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg max-w-md">

      {/* NAME */}
      <label>Name</label>
      <input
        className="input"
        onChange={e=>handle("name",e.target.value)}
      />

      {/* EMAIL */}
      <label>Email</label>
      <input
        className="input"
        onChange={e=>handle("email",e.target.value)}
      />

      {/* PHONE */}
      <label>Whatsapp Number</label>
      <PhoneInput
        defaultCountry="LK"
        value={form.phone}
        onChange={(v)=>handle("phone",v)}
        className="phone"
      />

      {/* DATE */}
      <label>Date</label>
      <input
        type="date"
        className="input"
        onChange={e=>handle("date",e.target.value)}
      />

      {/* TIME */}
      <label>Time</label>
      <input
        type="time"
        className="input"
        onChange={e=>handle("time",e.target.value)}
      />

      {/* NOTES */}
      <label>Special Notes</label>
      <textarea
        rows="3"
        className="input"
        onChange={e=>handle("notes",e.target.value)}
      />

      <button
        onClick={send}
        className="w-full bg-orange-500 text-white py-3 mt-4 rounded"
      >
        Book Now
      </button>

      <style jsx>{`
        label{
          display:block;
          margin-top:12px;
          margin-bottom:4px;
          font-size:14px;
        }

        .input{
          width:100%;
          border:1px solid #ccc;
          padding:10px;
          border-radius:4px;
          background:white;
        }

        /* Phone input height fix */
        .phone{
          background:white;
          border:1px solid #ccc;
          padding:6px 10px;
          border-radius:4px;
        }
      `}</style>

    </div>
  );
}