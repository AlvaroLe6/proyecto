<script setup>

import { ref, onMounted, computed  } from "vue";
import axios from "axios";

const headers = ref([
  { title: 'Nro. Carnet',text: 'Nro. Carnet',align: 'start',
          sortable: false,
          key: 'Carnet' },
  { title:'Nombre', text: 'Nombre', value: 'Nombre' },
  { title:'Apellido',text: 'Apellido', value: 'Apellido' },
  { title:'Teléfono',text: 'Teléfono', value: 'Telefono' },
  { title:'Fecha Generacion', text: 'Fecha Generacion', value: 'FechaGeneracion' },
  { title: 'Acciones', key: 'actions', sortable: false },
]); 
const registrosCertificados = ref([]);

const buscarRegistrosCer = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/buscar-estudiante-certificado-conclusion`
    );
    if (response.data) {
      registrosCertificados.value = response.data;
      console.log("los datos de los certificados: ",registrosCertificados.value)
     
    } else {
      nombreDocente.value = "certificados no encontrado";
    }
  } catch (error) {
    console.error("Error al buscar los certificados:", error);
    nombreDocente.value = "Error en la búsqueda";
  }
};
// Llama a buscarRegistrosCer para inicializar la tabla con datos
onMounted(() => {
  buscarRegistrosCer();
});
// Función para descargar el certificado PDF
const downloadCertificado = (archivoPath) => {
  window.open(`http://localhost:3000/${archivoPath}`, '_blank');
};

</script>

<template>
  <v-data-table 
  class="data-table"   
  v-if="registrosCertificados.length" 
  :headers="headers" 
  :items="registrosCertificados"
  :items-per-page="10"
  :sort-by="[{ key: 'num_doc', order: 'asc' }]">
    

<template v-slot:item.actions="{ item }">
  <v-icon 
      v-tooltip="'Ver Certificado'"
      color="green-darken-1"
      size="small" 
      class="mr-2" 
      @click="downloadCertificado(item.ArchivoCertificado)">mdi-eye</v-icon>

    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reiniciar
      </v-btn>
    </template>
  </v-data-table>  
</template>
<style>
.data-table{
  padding: 10px;
  border-collapse: collapse; /* Las líneas de la tabla no tienen espacios */
}
.toolbar-tabla {
  background-color: transparent;
  padding: 10px;
}
.container-filtros {
  display: flex;
  align-items: center;
  gap: 1rem;

}
.text-field-buscar,
.select-fase{
  max-width: 200px;
  width: 200px;
  height:40px;
}
.date-input-fecha
{
  max-width: 200px;
  width: 200px;
  height:40px;
  
}
.checkbox-ver-detalles{
  max-width: 220px;
  width: 220px;
  height:40px;
  font-size: 11;
}

/* Ajusta la altura del v-select y v-field */
.v-field__input {
  min-height: 0 !important; /* Sobrescribe el min-height */
  padding-bottom: 0 !important; 
  display: flex;
  align-items: center;
  height: 40px; /* Ajusta la altura*/
}
.v-input__control {
  min-height: 40px !important; /* Altura mínima*/
  display: flex;
  align-items: center;
}
.btn-descargar{
  padding: 10px 12px; 
  font-size: 12px; 
}
.btn-actualizar {
  padding: 10px 5px; 
  font-size: 12px; 
}
.btn-limpiar-filtro {
  padding: 10px 5px; 
  font-size: 12px; 
}
.data-table thead {
  background-color: #D1C4E9;
  padding: 10px;
 }
.data-table th, .data-table td {
  padding: 10px;
  border-bottom: 1px solid #162D4B; /* Añade una línea en la parte inferior de las celdas */
  border-right: 1px solid #162D4B; /* Añade una línea a la derecha de las celdas */
  border-left: 1px solid #162D4B; /* Añade una línea a la izquierda de las celdas */
  border-top: 1px solid #162D4B; /* Añade una línea en la parte superior de las celdas */

}

</style>