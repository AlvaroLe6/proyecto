<script setup>

import { ref, onMounted, computed  } from "vue";
import axios from "axios";
import * as XLSX from 'xlsx';

const headers = ref([
  { title: 'Nro. Carnet',text: 'Nro. Carnet',align: 'start',
          sortable: false,
          key: 'num_doc' },
  { title:'Nombre', text: 'Nombre', value: 'nombre' },
  { title:'Apellido',text: 'Apellido', value: 'apellidoPersona' },
  { title:'Fecha de Nacimiento', text: 'Fecha de Nacimiento', value: 'fecha_nacimiento' },
  { title:'Cod. Empaste', text: 'Cod. Empaste', value: 'codigo_empaste' },
  { title:'Inicio Tramite',text: 'Inicio Tramite', value: 'inicio_tramite' },
  { title:'Estado',text: 'Estado', value: 'estado' },
  { title:'Etapa',text: 'Etapa', value: 'etapa_tramite' },
  { title:'Tipo',text: 'Tipo', value: 'tipo' },
  { title:'Programa',text: 'Programa', value: 'programa' },
  { title: 'Sede',text: 'Sede', value: 'sede' },
  { title:'Fecha Inscripcion',text: 'Fecha Inscripcion', value: 'fechaInscripcion' },
  { title: 'Acciones', key: 'actions', sortable: false },
]); 
const registrosEstudiantes = ref([]);
const filtroEtapa = ref(null);
const filtroPrograma = ref(null);

const buscarRegistrosEst = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/buscar-estudiante-inscrito`
    );
    if (response.data) {
      registrosEstudiantes.value = response.data;
      console.log("los datos de los clientes: ",registrosEstudiantes.value)
     
      // Asegúrate de que la respuesta incluya el campo 'nombre'
    } else {
      nombrePersona.value = "Persona no encontrada";
    }
  } catch (error) {
    console.error("Error al buscar persona:", error);
    nombrePersona.value = "Error en la búsqueda";
  }
};
// Llama a buscarRegistrosEst para inicializar la tabla con datos
onMounted(() => {

  buscarRegistrosEst();
});

// exportar excel
const exportToExcel = () => {
  if (!registrosEstudiantes.value.length) {
    console.error('No hay datos para exportar.');
    return;
  }

  const ws = XLSX.utils.json_to_sheet(registrosEstudiantes.value.map(item => ({
    Nombres: item.nombre,
    Apellidos: item.apellidoPersona,
    Fecha_naciemiento: item.fecha_nacimiento,
    codigo_empaste:item.codigo_empaste,
    inicio_tramite:item.inicio_tramite,
    estado: item.estado,
    etapa_tramite: item.etapa_tramite,
    tipo: item.tipo,
    programa: item.programa,
    sede:item.sede,
    fechaInscripcion:item.fechaInscripcion,

  })));
  
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Registros");
  XLSX.writeFile(wb, "Registros.xlsx");
};

const registrosFiltrados = computed(() => {
  return registrosEstudiantes.value.filter(registro => {
    const etapaMatch = !filtroEtapa.value || registro.etapa_tramite === filtroEtapa.value;
    const programaMatch = !filtroPrograma.value || registro.programa === filtroPrograma.value;

    return etapaMatch && programaMatch;

  })
})
function aplicarFiltros() {
  // Este método se llama cuando se cambian los filtros
  console.log('Aplicando filtros:', { etapa: filtroEtapa.value })
}

  // Funcion para limpiar los filtros 
function limpiarFiltros() {
  //rangoFecha.value = [];
  filtroEtapa.value = null;
  filtroPrograma.value = null;
}
// Obtener las etapas para el filtrado
const itemEtapa = computed(() => {
  const etapas = registrosEstudiantes.value.map(item => item.etapa_tramite);
  return [...new Set(etapas)];
});
// Obtener los programas para el filtrado
const itemPrograma = computed(() => {
  const programas = registrosEstudiantes.value.map(item => item.programa);
  return [...new Set(programas)];
});

const openCertificadoConclusion = (item) => {
  const url = `/admin/certificado-conclusion?num_doc=${item.num_doc}&nombre=${item.nombre}&apellido=${item.apellidoPersona}&ci=${item.ci}&tipo=${item.tipo}&programa=${item.programa}&sede=${item.sede}&fecha=${item.fecha}`;
  window.open(url, '_blank');
};
</script>

<template>
  <v-btn color="blue" variant="flat" :to="{ name: 'nuevo-reg-contabilidad' }">Subir archivo</v-btn>

  <h2 class="text-center text-h3 my-5 font-weight-bold">Lista de registros estudiantes</h2>

  <v-data-table 
  class="data-table"   
  v-if="registrosEstudiantes.length" 
  :headers="headers" 
  :items="registrosFiltrados"
  :items-per-page="10"
  :sort-by="[{ key: 'num_doc', order: 'asc' }]">
    
  <template v-slot:top>
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
          v-model="filtroPrograma"
          :items="itemPrograma"
          label="Programa"
          variant="outlined"
          @change="aplicarFiltros"
        ></v-select>
        <v-select
          class="select-fase"
          v-model="filtroEtapa"
          :items="itemEtapa"
          label="Etapa"
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
</template>
<template v-slot:item.actions="{ item }">
  <v-icon 
      color="deep-purple-darken-1"
      size="small" 
      class="mr-2" 
      @click="openCertificadoConclusion(item)">mdi-book-multiple</v-icon>
  <v-icon 
      color="indigo-lighten-1
"
      size="small" 
      class="mr-2" 
      @click="openFaseDialog(item)">mdi-book</v-icon>
      
      <v-icon 
      color="green-accent-3"
      size="small" 
      class="mr-2" 
      @click="openFaseDialog(item)">mdi-cached</v-icon>

      <v-icon 
      color="blue-darken-2"
      size="small" 
      class="mr-2" 
      @click="showDetails(item)"> mdi-eye</v-icon>

      <v-icon 
      color="blue-grey-darken-2"
      size="small" 
      class="mr-2" 
      @click="openEditDialog(item)"> mdi-pencil</v-icon>

      <v-icon
      color="red-darken-2"
      size="small" 
      class="mr-2"
       @click="openDeleteDialog(item)"> mdi-delete</v-icon>

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