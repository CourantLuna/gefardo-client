import React from 'react';
import DynamicForm from '../components/CustomForm'; 

const jsonFields = [
    {
      "sectionTitle": "1. Información del Establecimiento",
      "divider": true,
      "fields": [
        {
          "name": "nombre_farmacia",
          "label": "Nombre Comercial de la Farmacia",
          "type": "text",
          "required": true
        },
        {
          "name": "direccion_calle",
          "label": "Calle",
          "type": "text",
          "required": true
        },
        {
          "name": "direccion_numero",
          "label": "Número",
          "type": "text",
          "required": true
        },
        {
          "name": "direccion_sector",
          "label": "Sector/Barrio",
          "type": "text",
          "required": true
        },
        {
          "name": "direccion_municipio",
          "label": "Municipio",
          "type": "text",
          "required": true
        },
        {
          "name": "direccion_provincia",
          "label": "Provincia",
          "type": "select",
          "required": true,
          "options": ["Santo Domingo", "Santiago", "La Vega", "Puerto Plata"]
        },
        {
          "name": "telefono",
          "label": "Teléfono",
          "type": "telefono",
          "required": true
        },
        {
          "name": "correo_electronico",
          "label": "Correo Electrónico",
          "type": "email",
          "required": true
        }
      ]
    },
    {
      "sectionTitle": "2. Información del Responsable Técnico",
      "divider": true,
      "fields": [
        {
          "name": "nombre_responsable",
          "label": "Nombre Completo del Responsable Técnico",
          "type": "text",
          "required": true
        },
        {
          "name": "cedula_responsable",
          "label": "Cédula de Identidad",
          "type": "text",
          "required": true
        },
        {
          "name": "titulo_universitario",
          "label": "Título Universitario",
          "type": "text",
          "required": true
        },
        {
          "name": "numero_exequatur",
          "label": "Número de Exequátur",
          "type": "text",
          "required": true
        },
        {
          "name": "telefono_responsable",
          "label": "Teléfono del Responsable Técnico",
          "type": "telefono",
          "required": true
        },
        {
          "name": "correo_responsable",
          "label": "Correo Electrónico del Responsable Técnico",
          "type": "email",
          "required": true
        }
      ]
    },
    {
      "sectionTitle": "3. Detalles del Proyecto",
      "divider": true,
      "fields": [
        {
          "name": "tipo_establecimiento",
          "label": "Tipo de Establecimiento",
          "type": "select",
          "required": true,
          "options": ["Farmacia Comunitaria", "Farmacia Hospitalaria", "Otra"]
        },
        {
          "name": "servicios_ofrecidos",
          "label": "Servicios Ofrecidos",
          "type": "checkbox",
          "options": [
            "Dispensación de Medicamentos",
            "Venta de Productos de Higiene",
            "Fórmulas Magistrales",
            "Otros"
          ]
        },
        {
          "name": "descripcion_proyecto",
          "label": "Descripción del Proyecto",
          "type": "text",
          "required": false
        }
      ]
    },
    {
      "sectionTitle": "4. Documentos Adjuntos",
      "divider": true,
      "fields": [
        {
          "name": "certificado_nombre",
          "label": "Certificado de Nombre Comercial (ONAPI)",
          "type": "file",
          "required": true
        },
        {
          "name": "planos_local",
          "label": "Planos del Local Avalados (CODIA)",
          "type": "file",
          "required": true
        },
        {
          "name": "cedula_propietario",
          "label": "Cédula del Propietario",
          "type": "file",
          "required": true
        },
        {
          "name": "titulo_responsable",
          "label": "Título Universitario del Responsable Técnico",
          "type": "file",
          "required": true
        },
        {
          "name": "rnc",
          "label": "Certificado del RNC",
          "type": "file",
          "required": true
        },
        {
          "name": "contrato_titulo",
          "label": "Contrato de Alquiler o Título de Propiedad",
          "type": "file",
          "required": true
        },
        {
          "name": "declaracion_jurada",
          "label": "Declaración Jurada",
          "type": "file",
          "required": true
        },
        {
          "name": "comprobante_pago",
          "label": "Comprobante de Pago",
          "type": "file",
          "required": true
        }
      ]
    },
    {
      "sectionTitle": "5. Información del Progreso",
      "divider": true,
      "fields": [
        {
          "name": "estado_solicitud",
          "label": "Estado de la Solicitud",
          "type": "select",
          "required": true,
          "options": [
            "Pendiente",
            "En Revisión",
            "Aprobado",
            "Rechazado"
          ]
        },
        {
          "name": "fecha_solicitud",
          "label": "Fecha de la Solicitud",
          "type": "date",
          "required": true
        },
        {
          "name": "fecha_actualizacion",
          "label": "Fecha de Actualización",
          "type": "date",
          "required": false
        },
        {
          "name": "observaciones",
          "label": "Observaciones",
          "type": "text",
          "required": false
        }
      ]
    }
  ]
  ;
 

  const VerFormularios = () => {
    return (
        <div style={{ padding: "20px" }}>
        <h1>Formulario Dinámico para Farmacias</h1>
        <DynamicForm formFields={jsonFields} />
      </div>
    );
  };
  
  export default VerFormularios;