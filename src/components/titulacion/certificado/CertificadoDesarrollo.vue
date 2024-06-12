<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import axios from 'axios';


const route = useRoute();

const certficadoData = ref({
  num_doc: route.query.num_doc,
  nombre: route.query.nombre,
  apellido: route.query.apellido,
  programa: route.query.programa,
  sede: route.query.sede,
  fecha: route.query.fecha,
  tipo: route.query.tipo,
});

const fecha = ref('');
const fondoCertificado = ref('');

// Configura la fecha en español
const esLocale = es;

// Variables para el snackbar al momento de actualizar el certificado
const snackbar = ref(false);
const nackbarText = ref("");
const snackbarColor = ref("");

// Variable para ocultar fecha
const showFecha = ref(false); // Variable para mostrar/ocultar ver más detalles

const downloadPDF = () => {

  if (showFecha.value == false) {
    nackbarText.value = "Debe actualizar el certificado";
    snackbar.value = true;
    snackbarColor.value = "red";
    return;
  }

  const element = document.getElementById("certificado");

// Asegura que la imagen de fondo se cargue con las cabeceras CORS
const img = new Image();
img.crossOrigin = "anonymous";
img.src = fondoCertificado.value;

img.onload = () => {
  html2canvas(element, { 
    scale: 2, 
    useCORS: true, 
    backgroundColor: null, // el fondo se renderiza correctamente
    onclone: (document) => {
      document.getElementById("certificado").style.backgroundImage = `url(${img.src})`;
    }
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });
    pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11); // Ajusta las dimensiones al tamaño carta
    pdf.save("certificado.pdf");
  }).catch(err => {
    console.error('Error al capturar el canvas:', err);
  });
};

img.onerror = (err) => {
  console.error('Error al cargar la imagen de fondo:', err);
};
};

// Formatea la feche a "dd 'de' MMMM 'de' yyyy"
const formatFecha = (date) => {
  if (date) {
    fecha.value = format(date, "dd 'de' MMMM 'de' yyyy", { locale: esLocale });
  }
  return '';
};

// Actualiza el certificado para imprimir
function actualizarCertificado() {

  if (!fecha.value) {
    nackbarText.value = "No hay fecha seleccionada";
    snackbar.value = true;
    snackbarColor.value = "red";
    return;
  }

  formatFecha(fecha.value)
  showFecha.value = true;
  nackbarText.value = "Certificado Actualizado";
  snackbar.value = true;
  snackbarColor.value = "green";

}
const obtenerFondoCertificado = async () => {
try {
  const response = await axios.get('http://localhost:3000/api/fondo_certificados');
  fondoCertificado.value = `http://localhost:3000/${response.data.Ruta}`;
  console.log("fondo del certificado", fondoCertificado.value);

  //console.log("askasdkasdjlasdjadlsj",document.documentElement.style.setProperty('--fondo-certificado', `url(${fondoCertificado.value})`))
  document.documentElement.style.setProperty('--fondo-certificado', `url(${fondoCertificado.value})`);

} catch (error) {
  console.error('Error al obtener el fondo del certificado:', error);
}
};

onMounted(  () => {
  obtenerFondoCertificado();
})
</script>

<template>
  <v-container class="align-center" align="center" >
    <v-card class="pa-5" max-width="8.5in">
      <v-row>
        <v-col cols="12">
          <VueDatePicker
            v-model="fecha"
            label="Selecciona una fecha"
            max-width="368"
            :locale="esLocale"
            :teleport="true"
            :enable-time-picker="false"
          ></VueDatePicker>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn @click="actualizarCertificado" color="blue-lighten-4">Actualizar certificado</v-btn>
        </v-col>
      </v-row>
    </v-card>
</v-container>
    <!-- Snackbar al momento de actualizar los datos del certificado -->
    <v-snackbar v-model="snackbar" :color="snackbarColor">
    {{ nackbarText }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>

 <!-- Certificado -->

  <v-container class="d-flex justify-center align-center">
    <v-row justify="center">
      <v-col cols="12" class="d-flex justify-center">
        <v-card 
        id="certificado" 
        class="pa-5 certificado-card" 
        elevation="2">
          <div class="text-center-cab mb-5">
            <h3 class="mt-3">Escuela de Negocios ESAM</h3>
            <p><em>"Por qué el éxito no es producto de la casualidad"</em></p>
          </div>

          <div class="text-center certificado-h2">
            <h2>CERTIFICADO</h2>
          </div>
          <div class="my-1 contenido-certificado">
            <p>
              La suscrita <strong>Lic. Dakmar Varinia Tambo Villazon</strong> en
              calidad de Coordinadora Académica de Titulación y Certificación de
              la Escuela de Negocios - ESAM La Paz en convenio con la
              Universidad Nacional Siglo XX - UNSXX tiene a bien:
            </p>
            <div class="text-center my-5">
              <h2>CERTIFICAR</h2>
            </div>
            <p>
              Que:
              <strong
                >{{ certficadoData.nombre }}
                {{ certficadoData.apellido }}</strong
              >
              con el número de identidad
              <strong>CI. {{ certficadoData.num_doc }}</strong
              >. Actualmente se encuentra en desarrollo académico 
              en el siguiente programa en nuestra institución:
            </p>
            <div class="text-center my-5">
              <h3>{{ certficadoData.programa }}</h3>
            </div>
            <p>
              Es cuanto se certifica en honor a la verdad y para fines
              consiguientes del interesado.
            </p>
            <div class="text-right mt-5">
              <p>La Paz, <span v-if="showFecha">{{ fecha }}</span></p>
            </div>

            <div class="text-center mt-2">
              <img
                src="@/assets/images/certificado/firma-lic-varinia-b.png"
                max-width="120"
              />
              <p><strong>Lic. Dakmar Varinia Tambo Villazon</strong></p>
              <p>Coordinadora Académica de Titulación y Certificación</p>
              <p><strong>"ESAM" LA PAZ</strong></p>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-row justify="center">
    <v-btn color="success" @click="downloadPDF" class="mt-5"
      >Descargar PDF</v-btn
    >
  </v-row>
</template>
  
  <script>
export default {
  name: "Certificado",
};
</script>
  
<style>
:root {
  --fondo-certificado: url("");
}

.certificado-card {
  width: 8.5in; /* Ancho de la hoja carta */
  height: 11in; /* Alto de la hoja carta */
  background-image: var(--fondo-certificado);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
}

.contenido-certificado {
  margin: 0.5in; /* Margen interno entre el borde de la tarjeta y el contenido */
  text-align: justify;
  padding-top: -15%;
  padding-block-end: 15%;
}
@media print {
  .certificado-card {
    width: 8.5in; /* Ancho de la hoja carta */
    height: 11in; /* Alto de la hoja carta */
    background-image: var(--fondo-certificado);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
.certificado-h2 {
 padding-top: 5%;
}

h2,
h3 {
  margin: 0;
}
p {
  margin: .625rem 0;
}
.text-center-cab {
  text-align: center;

}
.text-center {
  text-align: center;
}
</style>
  
  



