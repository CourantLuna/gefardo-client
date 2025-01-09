//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import DynamicForm from '../components/DynamicForm';

function Home() {
  const jsonSchema = [
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      required: false,
    },
  ];
  const handleSubmit = (data) => {
    console.log("Form Data Submitted: ", data);
  };


  return (
    <div>
      <h1>Dynamic Form</h1>
      <DynamicForm jsonSchema={jsonSchema} onSubmit={handleSubmit} />
    </div>
  );
}

export default Home;
