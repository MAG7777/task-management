import React, { useRef, useState } from "react";

export default function Hooks() {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    inputRef.current.value = "";
  };

  const printValue = () => {
    setInputValue("");
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={handleClick}>Click</button>
      </div>
      <div>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button onClick={printValue}>Click</button>
      </div>

      <div style={{ backgroundColor: "gray", marginTop: 20 }}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChangeInput}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChangeInput}
        />
        <input
          type="text"
          name="message"
          value={form.message}
          onChange={handleChangeInput}
        />
        <button>Send</button>
      </div>
    </div>
  );
}
