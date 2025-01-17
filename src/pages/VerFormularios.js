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
          "required": true,
          "md": 12,
          "value": ""

        },
        {
          "name": "direccion_calle",
          "label": "Calle",
          "type": "text",
          "required": true,
          "md": 3,
          "value": ""
        },
        {
          "name": "direccion_numero",
          "label": "Número",
          "type": "number",
          "required": true,
          "md": 1,
          "value": ""
        },
        {
          "name": "direccion_sector",
          "label": "Sector/Barrio",
          "type": "text",
          "required": true,
          "md": 2,
          "value": ""
        },
        {
          "name": "direccion_municipio",
          "label": "Municipio",
          "type": "text",
          "required": true,
          "md": 2,
          "value": ""

        },
        {
          "name": "direccion_provincia",
          "label": "Provincia",
          "type": "select",
          "required": true,
          "modelOptions": "Provincia",
          "md": 3.38,
          "value": ""
        },
        {
          "name": "telefono",
          "label": "Teléfono",
          "type": "tel",
          "required": true,
          "md": 3 ,
          "value": ""

        },
        {
          "name": "correo_electronico",
          "label": "Correo Electrónico",
          "type": "email",
          "required": true,
          "md": 3.15 ,
          "value": ""

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
          "required": true,
          "md": 6.3 ,
          "value": ""

          
        },
        {
          "name": "cedula_responsable",
          "label": "Cédula de Identidad",
          "type": "id",
          "required": true,
          "md": 5.54 ,
          "value": ""

        },
        {
          "name": "titulo_universitario",
          "label": "Título Universitario",
          "type": "text",
          "required": true,
          "md": 6.3 ,
          "value": ""

        },
        {
          "name": "numero_exequatur",
          "label": "Número de Exequátur",
          "type": "number",
          "required": true,
          "md": 2 ,
          "value": ""

        },
        {
          "name": "telefono_responsable",
          "label": "Teléfono del Responsable Técnico",
          "type": "tel",
          "required": true,
          "md": 3.38,
          "value": ""
        },
        {
          "name": "correo_responsable",
          "label": "Correo Electrónico del Responsable Técnico",
          "type": "email",
          "required": true,
          "md": 3.15 ,
          "value": ""

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
          "modelOptions": "TipoFarmacia",
          "md": 3.15 ,
          "value": ""

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
          ],
          "md": 8,
          "value": ""

        },
        {
          "name": "descripcion_proyecto",
          "label": "Descripción del Proyecto",
          "type": "text",
          "required": false,
          "md": 12,
          "value": ""

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
          "required": true,
          "md": 3.9,
          "value": ""

        },
        {
          "name": "planos_local",
          "label": "Planos del Local Avalados (CODIA)",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""

        },
        {
          "name": "cedula_propietario",
          "label": "Cédula del Propietario",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""

        },
        {
          "name": "titulo_responsable",
          "label": "Título Universitario del Responsable Técnico",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""

        },
        {
          "name": "rnc",
          "label": "Certificado del RNC",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""

        },
        {
          "name": "contrato_titulo",
          "label": "Contrato de Alquiler o Título de Propiedad",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""

        },
        {
          "name": "declaracion_jurada",
          "label": "Declaración Jurada",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""

        },
        {
          "name": "comprobante_pago",
          "label": "Comprobante de Pago",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""
        }
      ]
    },
   
  ]
  ;
 

  const VerFormularios = () => {
    return (
        <div style={{ paddingLeft: "30px" }}>
        {/* <h1>Formulario Dinámico para Farmacias</h1> */}
        <DynamicForm formFields={jsonFields} />
      </div>
    );
  };
  
  export default VerFormularios;