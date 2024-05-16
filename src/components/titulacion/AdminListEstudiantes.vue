<script setup>

import { ref, onMounted  } from "vue";
import axios from "axios";

const headers = ref([
  { title: 'Nro. Carnet',text: 'Nro. Carnet',align: 'start',
          sortable: false,
          key: 'num_doc' },
  { title:'Nombre', text: 'Nombre', value: 'nombre' },
  { title:'Apellido',text: 'Apellido', value: 'apellidoPersona' },
  {title:'Fecha de Nacimiento', text: 'Fecha de Nacimiento', value: 'fecha_nacimiento' },
  { title:'Cod. Empaste', text: 'Cod. Empaste', value: 'codigo_empaste' },
  { title:'Inicio Tramite',text: 'Inicio Tramite', value: 'inicio_tramite' },
  { title:'Estado',text: 'Estado', value: 'estado' },
  { title:'Etapa',text: 'Etapa', value: 'etapa_tramite' },
  { title:'Programa',text: 'Programa', value: 'programa' },
  {title: 'Sede',text: 'Sede', value: 'sede' },
  { title:'Fecha Inscripcion',text: 'Fecha Inscripcion', value: 'fechaInscripcion' },
]); 
const registrosEstudiantes = ref([]);


const buscarPersona = async () => {
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
// Llama a buscarPersona para inicializar la tabla con datos
onMounted(() => {

  buscarPersona();
});

</script>



<template>
  <v-btn color="blue" variant="flat" :to="{ name: 'nuevo-reg-contabilidad' }">Subir archivo</v-btn>

  <h2 class="text-center text-h3 my-5 font-weight-bold">Lista de registros estudiantes</h2>

  <v-data-table 
  v-if="registrosEstudiantes.length" 
  :headers="headers" 
  :items="registrosEstudiantes"
  :items-per-page="10"
    class="elevation-1"
    :sort-by="[{ key: 'num_doc', order: 'asc' }]"
  >
    
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          Lista de registros
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="buscarPersona">
          Actualizar
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reiniciar
      </v-btn>
    </template>
  </v-data-table>  
</template>
