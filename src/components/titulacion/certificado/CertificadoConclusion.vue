<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-5 certificado-card" elevation="2">
            <div class="text-center mb-5">
             
                <h3 class="mt-3">Escuela de Negocios ESAM</h3>
              <p><em>"Por qué el éxito no es producto de la casualidad"</em></p>
            </div>
            <div class="text-center my-5">
              <h2>CERTIFICADO</h2>
            </div>
            <div class="mb-5">
              <p>
                La suscrita <strong>Lic. Dakmar Varinia Tambo Villazon</strong> en calidad de Coordinadora Académica de Titulación y Certificación de la Escuela de Negocios- ESAM La Paz en convenio con la Universidad Nacional Siglo XX - UNSXX tiene a bien:
              </p>
              <div class="text-center my-5">
                <h2>CERTIFICAR</h2>
              </div>
              <p>
                Que: <strong>TACA ALVAREZ MACARIO</strong> con el número de identidad <strong>CI. 3704180 PT</strong>.
                Concluyó con el plan de estudio en el siguiente programa en nuestra institución:
              </p>
              <div class="text-center my-5">
                <h3>MAESTRÍA EN EDUCACIÓN DIRECCIÓN Y GESTIÓN DE CENTROS EDUCATIVOS PARA MAESTROS</h3>
              </div>
              <p>
                CERTIFICANDO CON 2400 HORAS ACADÉMICAS RECONOCIDAS POR LA UNIVERSIDAD NACIONAL SIGLO XX.<br>
                ESTADO: PROGRAMA DE MAESTRÍA APROBADO Y CULMINADO
              </p>
              <p>
                En este tiempo el mencionado profesional demostró puntualidad y responsabilidad en el desarrollo de los módulos realizados en la MAESTRÍA.
              </p>
              <p>
                Es cuanto se certifica en honor a la verdad y para fines consiguientes del interesado.
              </p>
              <div class="text-right mt-5">
                <p>La Paz, 28 de febrero del 2024</p>
              </div>
              <div class="text-center mt-5">
                <img
            src="@/assets/images/certificado/firma-lic-varinia.png"
            max-width="150"
            class="mb-2"
          />                <p><strong>Lic. Dakmar Varinia Tambo Villazon</strong></p>
                <p>Coordinadora Académica de Titulación y Certificación</p>
                <p><strong>"ESAM" LA PAZ</strong></p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "Certificado",
  };
  </script>
  
  <style scoped>
.certificado-card {
    width: 8.5in; /* Ancho de la hoja carta */
  height: 11in; /* Alto de la hoja carta */
  background-image: url('@/assets/images/certificado/certificado-1.jpg');
  background-size: cover;
  background-position: center;
 /* border: 2px solid #000;*/
}
  h2, h3 {
    margin: 0;
  }
  p {
    margin: 10px 0;
  }
  .text-center {
    text-align: center;
  }
  </style>
  
  



