<script setup>

import { ref, onMounted, computed  } from "vue";
import axios from "axios";
import * as XLSX from 'xlsx';

const headers = ref([
  { title: 'Nro. Carnet',text: 'Nro. Carnet',align: 'start',
          sortable: false,
          key: 'Carnet' },
  { title:'Nombre', text: 'Nombre', value: 'Nombre' },
  { title:'Apellido',text: 'Apellido', value: 'Apellidos' },
  { title:'Profesión', text: 'Profesión', value: 'Profesion' },
  { title:'Correo', text: 'Correo', value: 'Correo' },
  { title:'Teléfono',text: 'Teléfono', value: 'Telefono' },
  { title:'Área',text: 'Área', value: 'Nombre_Area' },
  { title: 'Acciones', key: 'actions', sortable: false },
]); 
const registrosDocentes = ref([]);
const filtroProfesion = ref(null);
const filtroArea = ref(null);

const buscarRegistrosDoc = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/buscar-docentes`
    );
    if (response.data) {
      registrosDocentes.value = response.data;
      console.log("los datos de los docentes: ",registrosDocentes.value)
     
    } else {
      nombreDocente.value = "Docente no encontrado";
    }
  } catch (error) {
    console.error("Error al buscar docente:", error);
    nombreDocente.value = "Error en la búsqueda";
  }
};
// Llama a buscarRegistrosDoc para inicializar la tabla con datos
onMounted(() => {

  buscarRegistrosDoc();
});

// exportar excel
const exportToExcel = () => {
  if (!registrosDocentes.value.length) {
    console.error('No hay datos para exportar.');
    return;
  }

  const ws = XLSX.utils.json_to_sheet(registrosDocentes.value.map(item => ({
    ci:item.Carnet,
    nombres: item.Nombre,
    apellidos: item.Apellidos,
    profesion:item.Profesion,
    correo: item.Correo,
    telefono: item.Telefono,
    area:item.Nombre_Area,
  })));
  
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Registros");
  XLSX.writeFile(wb, "Registros.xlsx");
};

const registrosFiltrados = computed(() => {
  return registrosDocentes.value.filter(registro => {
    const profesionMatch = !filtroProfesion.value || registro.Profesion === filtroProfesion.value;
    const areaMatch = !filtroArea.value || registro.Nombre_Area === filtroArea.value;

    return profesionMatch && areaMatch;

  })
})
function aplicarFiltros() {
  // Este método se llama cuando se cambian los filtros
  console.log('Aplicando filtros:', { etapa: filtroProfesion.value })
}

  // Funcion para limpiar los filtros 
function limpiarFiltros() {
  //rangoFecha.value = [];
  filtroProfesion.value = null;
  filtroArea.value = null;
}
// Obtener las profesion para el filtrado
const itemProfesion = computed(() => {
  const profesion = registrosDocentes.value.map(item => item.Profesion);
  return [...new Set(profesion)];
});
// Obtener los areas para el filtrado
const itemArea = computed(() => {
  const areas = registrosDocentes.value.map(item => item.Nombre_Area);
  return [...new Set(areas)];
});

const openCertificadoConclusion = (item) => {
  const url = `/admin/certificado-conclusion?num_doc=${item.num_doc}&nombre=${item.nombre}&apellido=${item.apellidoPersona}&ci=${item.ci}&tipo=${item.tipo}&programa=${item.programa}&sede=${item.sede}&fecha=${item.fecha}`;
  window.open(url, '_blank');
};
const openCertificadoDesarrollo = (item) => {
  const url = `/admin/certificado-desarrollo?num_doc=${item.num_doc}&nombre=${item.nombre}&apellido=${item.apellidoPersona}&ci=${item.ci}&tipo=${item.tipo}&programa=${item.programa}&sede=${item.sede}&fecha=${item.fecha}`;
  window.open(url, '_blank');
};
</script>

<template>
  <v-data-table 
  class="data-table"   
  v-if="registrosDocentes.length" 
  :headers="headers" 
  :items="registrosFiltrados"
  :items-per-page="10"
  :sort-by="[{ key: 'num_doc', order: 'asc' }]">
    
  <template v-slot:top>
     <!-- 
    <v-toolbar class="toolbar-tabla" flat>
        <div class="container-filtros">
          <v-text-field
          class="text-field-buscar"
          label="Buscar"
          clearable     
          variant="outlined"
          @change="aplicarFiltros"
        ></v-text-field>        
        <v-select
          class="select-fase"
          v-model="filtroArea"
          :items="itemArea"
          label="Área"
          variant="outlined"
          @change="aplicarFiltros"
        ></v-select>
        <v-select
          class="select-fase"
          v-model="filtroProfesion"
          :items="itemProfesion"
          label="Profesión"
          variant="outlined"
          @change="aplicarFiltros"
        ></v-select>

        <v-btn 
        class="btn-limpiar-filtro"
        variant="outlined"
        @click="limpiarFiltros">
        Limpiar Filtros
      </v-btn>
        <v-btn 
        class="btn-actualizar"
        prepend-icon="mdi-cached"
        variant="outlined"
        color="primary" dark 
       @click="initialize">
          Actualizar
        </v-btn>
        <v-btn
        class="btn-descargar" 
        prepend-icon="mdi-download"
        variant="outlined"
        color="success" 
        @click="exportToExcel">
        Excel
      </v-btn>

    </div>
    <v-spacer></v-spacer>
    <v-checkbox
    class="checkbox-ver-detalles"
    label="Ver detalles adicionales"
    v-model="showExtraColumns"
    color="success"
    @change="toggleExtraColumns"
  ></v-checkbox>
</v-toolbar>
-->
</template>
<template v-slot:item.actions="{ item }">
  <v-icon 
      v-tooltip="'Certificado Conclusión'"
      color="deep-purple-darken-1"
      size="small" 
      class="mr-2" 
      @click="openCertificadoConclusion(item)">mdi-book-multiple</v-icon>
  <v-icon 
      v-tooltip="'Certificado Desarrollo'"
      color="indigo-lighten-1"
      size="small" 
      class="mr-2" 
      @click="openCertificadoDesarrollo(item)">mdi-book</v-icon>

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