import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Formulario() {
  const [form, setForm] = useState({ id: uuidv4(), texto: '', numero: '' });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="texto"
        value={form.texto}
        onChange={handleChange}
      />
      <input
        type="number"
        name="numero"
        value={form.numero}
        onChange={handleChange}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
