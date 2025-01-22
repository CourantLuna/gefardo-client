import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import Toolbox from "../components/ToolBox";
import Canvas from "../components/Canvas";
import PropertiesPanel from "../components/PropertiesPanel";
import JSONView from "../components/JSONView";

const CreateForm = () => {
  const [formFields, setFormFields] = useState([
    {
      sectionTitle: "Sección Inicial",
      divider: true,
      fields: [],
    },
  ]);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false); // Controla la visibilidad del panel
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  };

  const handleDrop = (e, sectionIndex = null) => {
    e.preventDefault();
    e.stopPropagation(); // Detiene la propagación del evento para evitar duplicados.
    const fieldType = e.dataTransfer.getData("type");

    if (fieldType === "section") {
      // Agregar una nueva sección si se arrastra una sección
      setFormFields((prev) => [
        ...prev,
        { sectionTitle: "Nueva Sección", divider: true, fields: [] },
      ]);
    } else if (sectionIndex !== null) {
      // Agregar un campo dentro de una sección específica
      setFormFields((prev) =>
        prev.map((section, index) =>
          index === sectionIndex
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
      prev.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              fields: section.fields.filter((_, i) => i !== fieldIndex),
            }
          : section
      )
    );
  };

  const handleRemoveSection = (sectionIndex) => {
    setFormFields((prev) => prev.filter((_, index) => index !== sectionIndex));
  };

  const handleFieldChange = (key, value) => {
    const { sectionIndex, fieldIndex } = selectedIndex;

    setFormFields((prev) =>
      prev.map((section, index) => {
        if (index === sectionIndex) {
          // Si fieldIndex es null o undefined, estamos editando una sección
          if (fieldIndex === undefined) {
            return { ...section, [key]: value };
          }

          // Caso contrario, estamos editando un campo dentro de la sección
          return {
            ...section,
            fields: section.fields.map((field, idx) =>
              idx === fieldIndex ? { ...field, [key]: value } : field
            ),
          };
        }
        return section;
      })
    );
  };

  return (
    <Box display="flex" flexDirection="column" height="fit-content">
      {/* Fila 1: Toolbox ocupa todo el ancho */}
      <Grid container spacing={2} sx={{ flex: "0 0 auto", padding: "16px" }}>
        <Grid item xs={12}>
          <Toolbox handleDragStart={handleDragStart} />
        </Grid>
      </Grid>

      {/* Fila 2: Canvas, PropertiesPanel y JSONView */}
      <Grid container spacing={2} sx={{ flex: "1 1 auto", overflow: "hidden" }}>
        <Grid item xs={12} md={7} >
          <Canvas
            formFields={formFields}
            handleDrop={handleDrop}
            handleRemoveField={handleRemoveField}
            handleRemoveSection={handleRemoveSection}
            onSelectField={(index) => {
              if (index.fieldIndex === undefined) {
                setSelectedIndex({ sectionIndex: index.sectionIndex });
              } else {
                setSelectedIndex(index);
              }
              setIsPropertiesPanelOpen(true); // Abre el panel al seleccionar un campo
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {isPropertiesPanelOpen && (
              <Box sx={{ flex: "1 1 auto", overflow: "auto" }}>
                <PropertiesPanel
                  selectedField={
                    selectedIndex
                      ? selectedIndex.fieldIndex === undefined
                        ? formFields[selectedIndex.sectionIndex]
                        : formFields[selectedIndex.sectionIndex].fields[
                            selectedIndex.fieldIndex
                          ]
                      : null
                  }
                  handleFieldChange={handleFieldChange}
                  onClose={() => setIsPropertiesPanelOpen(false)} // Cierra el panel
                />
              </Box>
            )}
            <Box
              sx={{
                flex: isPropertiesPanelOpen ? "1 1 auto" : "1 0 auto", // Ocupa todo el alto si no está abierto
              }}
            >
              <JSONView formFields={formFields} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateForm;
