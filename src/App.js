import React, { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

const schema = require("./jsonFiles/schema.json");
const uiSchema = require("./jsonFiles/uiSchema.json");

function App() {
  const [formData, setFormData] = useState({});

  const handleSubmit = ({ formData }) => {
    console.log("Form data submitted: ", formData);
  };

  const handleDownload = (formData) => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formData));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "formData.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleFormSubmit = ({ formData }) => {
    handleSubmit({ formData });
    handleDownload(formData);
  };

  return (
    <div className="container">
      <Form
        schema={schema}
        formData={formData}
        uiSchema={uiSchema}
        validator={validator}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;
