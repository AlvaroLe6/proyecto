<script setup>

import { ref, onMounted, computed} from "vue";
import { useRoute, useRouter  } from "vue-router";
import axios from "axios";
import * as XLSX from 'xlsx';

const route = useRoute();
const router = useRouter();

const InscProgramaData = ref({
  Cod_Programa:route.query.Cod_Programa,
  Nombre: route.query.Nombre,
});
const showExtraColumns = ref(false); 


const headers = ref([
  { title: 'Documento de identidad',text: 'Documento de identidad',align: 'start',
          sortable: false,
          key: 'carnet' },
  { title:'Nombres', text: 'Nombres', value: 'nombres' },
  { title:'Ap. paterno', text: 'Ap. paterno', value: 'ap_paterno' },
  { title:'Ap. materno', text: 'Ap. materno', value: 'ap_materno' },
  { title:'Celular', text: 'Celular', value: 'celular' },
  { title:'Correo', text: 'Correo', value: 'correo', hidden: true },
  { title:'Genero', text: 'Genero', value: 'genero',hidden: true },
  { title:'Univ. titulacion', text: 'Univ. titulacion', value: 'univ_titulacion',hidden:true },
  { title:'Profesión', text: 'Profesión', value: 'preofesion',hidden: true },
  { title:'Fecha N.', text: 'Fecha N.', value: 'fecha_n',hidden: true },
  { title:'Edad', text: 'Edad', value: 'edad',hidden: true },
  { title:'Ciudad', text: 'Ciudad', value: 'cuidad_rec',hidden:true },
  { title:'Asesor', text: 'Asesor', value: 'asesor',hidden: true },
  { title:'Nota 1', text: 'Nota 1', value: 'modulo1' },
  { title:'Nota 2', text: 'Nota 2', value: 'modulo2' },
  { title:'Nota 3', text: 'Nota 3', value: 'modulo3' },
  { title:'Nota 4', text: 'Nota 4', value: 'modulo4' },
  { title:'Nota 5', text: 'Nota 5', value: 'modulo5' },
  { title:'Nota 6', text: 'Nota 6', value: 'modulo6' },
  { title:'Nota final', text: 'Nota final', value: 'notas_finales' },
  { title:'Estado', text: 'Estado', value: 'estado' },
  { title:'Nivelación', text: 'Nivelación', value: 'nivelacion' },
  { title:'Observación', text: 'Observación', value: 'observaciones' },
  { title:'Titulo academico', text: 'Titulo academico', value: 'titulo_academico',hidden: true },
  { title:'Titulo prov.', text: 'Titulo prov.', value: 'titulo_prov',hidden:true },
  { title:'Cedula identidad', text: 'Cedula identidad', value: 'cedula_identidad',hidden: true},
  { title:'Certificado nac.', text: 'Certificado nac.', value: 'certificado_nac',hidden: true },
  { title:'Titulo academico leg.', text: 'Titulo academico leg.', value: 'titulo_academico_leg',hidden: true },
  { title:'Cedula identidad leg.', text: 'cedula identidad leg.', value: 'cedula_identidad_leg',hidden: true },
  { title:'Certificado nac. or', text: 'Certificado nac. or', value: 'certificado_nac_or',hidden: true },
  { title:'Fotos', text: 'Fotos', value: 'fotos',hidden: true },
  { title:'Elab. monografia', text: 'Elab. monografia', value: 'elab_monografia',hidden: true},
  { title:'Monografia recepcionada', text: 'Monografia recepcionada', value: 'monografia_rec',hidden:true},
  { title:'Tramite', text: 'Tramite', value: 'tramite',hidden: true },
  { title:'Titulo prov. lega.', text: 'Titulo prov. lega.', value: 'titulo_prov_lega',hidden: true},

]); 
const registrosEstudiantes = ref([]);
const filtroProfesion = ref(null);
const filtroCiudadResidencia = ref(null);

const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("");

//Muestra las inscripciones por programa
const inscripcionesPrograma = async () => {
  try {

    const response = await axios.get('http://localhost:3000/api/inscripciones_por_programa', {
      params: { Cod_Programa: InscProgramaData.value.Cod_Programa }
    });
    registrosEstudiantes.value = response.data;
  } catch (error) {
    console.error('Eroor no se encontró la portada del programa', error);
  }
};
// Inicializar registros y verificar certificados
onMounted(() => {
  inscripcionesPrograma();
});
// Función para actualizar la tabla
const initialize = async () => {
  await inscripcionesPrograma();
};
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
    profesion: item.profesion,
    tipo: item.tipo,
    ciudad_residencia: item.ciudad_residencia,
    sede:item.sede,
    fechaInscripcion:item.fechaInscripcion,

  })));
  
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Registros");
  XLSX.writeFile(wb, "Registros.xlsx");
};

const registrosFiltrados = computed(() => {
  return registrosEstudiantes.value.filter(registro => {
    const ProfesionMatch = !filtroProfesion.value || registro.profesion === filtroProfesion.value;
    const ciudadResidenciaMatch = !filtroCiudadResidencia.value || registro.ciudad_residencia === filtroCiudadResidencia.value;

    return ProfesionMatch && ciudadResidenciaMatch;

  })
})
function aplicarFiltros() {
  // Este método se llama cuando se cambian los filtros
  console.log('Aplicando filtros:', { Area: filtroProfesion.value })
}

  // Funcion para limpiar los filtros 
function limpiarFiltros() {
  //rangoFecha.value = [];
  filtroProfesion.value = null;
  filtroCiudadResidencia.value = null;
}
// Obtener las Profesiones para el filtrado
const itemProfesion = computed(() => {
  const Profesiones = registrosEstudiantes.value.map(item => item.profesion);
  return [...new Set(Profesiones)];
});
// Obtener los ciudadResidencia para el filtrado
const itemCiudadResidencia = computed(() => {
  const ciudadResidencia = registrosEstudiantes.value.map(item => item.ciudad_residencia);
  return [...new Set(ciudadResidencia)];
});

// Descargar el formulario
const descargarFormulario = (item) => {
  // Suponiendo que el campo apellidos contiene ambos apellidos separados por un espacio
  const [apellidoPaterno, apellidoMaterno] = item.apellidos.split(' '); // Asumiendo que el formato es "ApellidoPaterno ApellidoMaterno"
  router.push({
    name: 'link',
    query: {
      num_doc: item.num_doc,
      nombres: item.nombres,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      genero: item.genero,
      fecha_nac: item.fecha_nac,
      domicilio: item.domicilio,
      telefono: item.telefono,
      correo: item.correo,
      ciudad_residencia: item.ciudad_residencia,
      grado_academico: item.grado_academico,
      institucion_egreso: item.institucion_egreso,
      profesion: item.profesion,
      programa:item.programa

    }
  });
};
const visibleHeaders = computed(() => {
  return headers.value.filter(header => !header.hidden || showExtraColumns.value);
});
const toggleExtraColumns = () => {
  showExtraColumns.value = !showExtraColumns.value;
  // Reconfigura las columnas cuando se cambia el estado de showExtraColumns
  headers.value = headers.value.map(header => {
    if (header.hidden !== undefined) {
      header.hidden = !showExtraColumns.value;
    }
    return header;
  });
};


</script>

<template>
  <v-btn color="blue" variant="flat" :to="link">Registrar Programa</v-btn>

  <h2 class="text-center text-h5 font-weight-bold">{{ InscProgramaData.Nombre }}</h2>

  <v-data-table 
  class="data-table"   
  :headers="visibleHeaders" 
  :items="registrosFiltrados"
  :items-per-page="10"
  :sort-by="[{ key: 'num_doc', order: 'asc' }]"
  dense
  >
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
          v-model="filtroCiudadResidencia"
          :items="itemCiudadResidencia"
          label="Ciudad"
          variant="outlined"
          @change="aplicarFiltros"
        ></v-select>
        <v-select
          class="select-fase"
          v-model="filtroProfesion"
          :items="itemProfesion"
          label="Profesion"
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
<template v-slot:item="{ item }">
  <tr>
        <td>{{ item.carnet }}</td>
        <td>{{ item.nombres }}</td>
        <td>{{ item.ap_paterno }}</td>
        <td>{{ item.ap_materno }}</td>
        <td>{{ item.celular }}</td>
        <td v-if="showExtraColumns">{{ item.correo }}</td>
        <td v-if="showExtraColumns">{{ item.genero }}</td>
        <td v-if="showExtraColumns">{{ item.univ_titulacion }}</td>
        <td v-if="showExtraColumns">{{ item.preofesion }}</td>
        <td v-if="showExtraColumns">{{ item.fecha_n }}</td>
        <td v-if="showExtraColumns">{{ item.edad }}</td>
        <td v-if="showExtraColumns">{{ item.cuidad_rec }}</td>
        <td v-if="showExtraColumns">{{ item.asesor }}</td>
        <td :class="{ 'red-cell': item.modulo1 < 71 }">{{ item.modulo1 }}</td>
        <td :class="{ 'red-cell': item.modulo2 < 71 }">{{ item.modulo2 }}</td>
        <td :class="{ 'red-cell': item.modulo3 < 71 }">{{ item.modulo3 }}</td>
        <td :class="{ 'red-cell': item.modulo4 < 71 }">{{ item.modulo4 }}</td>
        <td :class="{ 'red-cell': item.modulo5 < 71 }">{{ item.modulo5 }}</td>
        <td :class="{ 'red-cell': item.modulo6 < 71 }">{{ item.modulo6 }}</td>
        <td :class="{ 'red-cell': item.notas_finales < 71 }">{{ item.notas_finales }}</td>
        <td>{{ item.estado }}</td>
        <td>{{ item.nivelacion }}</td>
        <td>{{ item.observaciones }}</td>
        <td v-if="showExtraColumns">{{ item.titulo_academico }}</td>
        <td v-if="showExtraColumns">{{ item.titulo_prov }}</td>
        <td v-if="showExtraColumns">{{ item.cedula_identidad }}</td>
        <td v-if="showExtraColumns">{{ item.certificado_nac }}</td>
        <td v-if="showExtraColumns">{{ item.titulo_academico_leg }}</td>
        <td v-if="showExtraColumns">{{ item.cedula_identidad_leg }}</td>
        <td v-if="showExtraColumns">{{ item.certificado_nac_or }}</td>
        <td v-if="showExtraColumns">{{ item.fotos }}</td>
        <td v-if="showExtraColumns">{{ item.elab_monografia }}</td>
        <td v-if="showExtraColumns">{{ item.monografia_rec }}</td>
        <td v-if="showExtraColumns">{{ item.tramite }}</td>
        <td v-if="showExtraColumns">{{ item.titulo_prov_lega }}</td>
    </tr>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reiniciar
      </v-btn>
    </template>
  </v-data-table>  

    <!-- Snackbar para mostrar el mensaje de certificado actualizado -->
    <v-snackbar v-model="snackbar" :color="snackbarColor">
    {{ snackbarText }}
    <template v-slot:options>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>
<style>
.text-center
{
  color: #162D4B;
  padding: 5px;
  margin: 0px;
}

.options-container {
  display: flex;
  align-items: center;
}
.status-row {
  display: flex;
  align-items: center;
}

.disabled-icon {
  opacity: 0.5;
  pointer-events: none; /* Deshabilita los clics en el icono */
}
.data-table{
  padding: 5px;
  border-collapse: collapse; /* Las líneas de la tabla no tienen espacios */
  font-size: 12px;
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
.file-input-certificado,
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
.btn-subir {
  padding: 10px 5px; 
  font-size: 12px; 
}
.data-table thead {
  background-color:#BBDEFB;
  padding: 5px;
  font-size: 12px; /* Ajusta el tamaño del texto del encabezado */

 }
 .data-table thead td, .data-table thead th {
  background-color:#BBDEFB;
  padding: 5px;
 }
.data-table th, .data-table td {
  padding:5px;
  border-bottom: 1px solid #162D4B; /* Añade una línea en la parte inferior de las celdas */
  border-right: 1px solid #162D4B; /* Añade una línea a la derecha de las celdas */
  border-left: 1px solid #162D4B; /* Añade una línea a la izquierda de las celdas */
  border-top: 1px solid #162D4B; /* Añade una línea en la parte superior de las celdas */
 
  /* Sobrescribir padding inline específico */
  padding-right: 5px !important; /* Ajusta el padding derecho */
  padding-left: 5px !important; /* Ajusta el padding izquierdo */
}
.red-cell {
  background-color: rgb(247, 164, 164);
  color: white; 
}
</style> 