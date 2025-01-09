import React, { useState } from "react";

const DynamicForm = ({ jsonSchema, onSubmit }) => {
  const [formData, setFormData] = useState({});

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {jsonSchema.map((field, index) => (
        <div key={index}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            required={field.required}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default DynamicForm;
