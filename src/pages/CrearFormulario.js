import React, { useState } from "react";
import { Box, Grid, Container } from "@mui/material";
import Toolbox from "../components/ToolBox";
import Canvas from "../components/Canvas";
import PropertiesPanel from "../components/PropertiesPanel";
import JSONView from "../components/JSONView";

const CreateForm = () => {
  const [formFields, setFormFields] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  };

  const handleDrop = ({ sectionIndex, fieldType }) => {
    if (fieldType === "section") {
      setFormFields((prev) => [
        ...prev,
        { sectionTitle: "Nueva Sección", divider: false, fields: [] },
      ]);
    } else {
      setFormFields((prev) =>
        prev.map((section, idx) =>
          idx === sectionIndex
            ? {
                ...section,
                fields: [
                  ...section.fields,
                  { type: fieldType, label: "", name: "", required: false },
                ],
              }
            : section
        )
      );
    }
  };

  const handleRemoveField = ({ sectionIndex, fieldIndex }) => {
    setFormFields((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex
          ? { ...section, fields: section.fields.filter((_, i) => i !== fieldIndex) }
          : section
      )
    );
    setSelectedIndex(null);
  };

  const handleRemoveSection = (sectionIndex) => {
    setFormFields((prev) => prev.filter((_, idx) => idx !== sectionIndex));
  };

  const handleFieldChange = (key, value) => {
    const { sectionIndex, fieldIndex } = selectedIndex;
    setFormFields((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex
          ? {
              ...section,
              fields: section.fields.map((field, i) =>
                i === fieldIndex ? { ...field, [key]: value } : field
              ),
            }
          : section
      )
    );
  };

  const onSelectField = (index) => {
    setSelectedIndex(index);
    setShowPropertiesPanel(true);
  };

  const togglePropertiesPanel = () => {
    setShowPropertiesPanel((prev) => !prev);
  };

  return (
    <Container maxWidth="xl" sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Grid container spacing={2} sx={{ marginBottom: "16px", borderBottom: "1px solid #ccc" }}>
        {/* ToolBox */}
        <Grid item xs={12} sm={6} md={6}>
          <Toolbox handleDragStart={handleDragStart} />
        </Grid>

        {/* PropertiesPanel */}
        <Grid item xs={12} sm={6} md={6}>
          {showPropertiesPanel && (
            <PropertiesPanel
              selectedField={
                selectedIndex
                  ? formFields[selectedIndex.sectionIndex]?.fields[selectedIndex.fieldIndex]
                  : null
              }
              handleFieldChange={handleFieldChange}
              onClose={togglePropertiesPanel}
            />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Canvas */}
        <Grid item xs={12} sm={8} md={8}>
          <Canvas
            formFields={formFields}
            handleDrop={handleDrop}
            handleRemoveField={handleRemoveField}
            handleRemoveSection={handleRemoveSection}
            onSelectField={onSelectField}
          />
        </Grid>

        {/* JSONView */}
        <Grid item xs={12} sm={4} md={4}>
          <JSONView formFields={formFields} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateForm;
