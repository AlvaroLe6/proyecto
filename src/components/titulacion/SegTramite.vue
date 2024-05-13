<script setup>
import { useForm, useField } from "vee-validate";
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useRouter } from "vue-router";


import useSegTramite from "@/composables/useSegTramite";

import { ref } from "vue";
import axios from "axios";

const { participanteCollection, buscarParticipantePorCI, error } = useSegTramite();

const fechaFin = ref(new Date().toISOString().substr(0, 10));
const db = useFirestore();
const router = useRouter();
const textoCancelar = "Cancelar";
const textoSeleccionar = "Seleccionar";

console.log("datos",participanteCollection)


const nroCarnet = useField("nroCarnet");
const detalle = useField("detalle");
const tipoPago = useField("tipoPago");
const tipo = ["Recibo", "Factura"];
const imagen = useField("imagen");
const codigoEmpaste = useField("codigoEmpaste")

const participantes = ref(null);  // Asumiendo un único objeto de participante
/*
// Asegúrate de manejar la posibilidad de que la consulta no devuelva resultados
const resultado = await buscarParticipantePorCI(nroCarnet.value);
if (resultado && resultado.length > 0) {
    participantes.value = resultado[0]; // Asumiendo que la respuesta es un array
    console.log("Datos del participante", participantes.value);
} else {
    participantes.value = null;
    console.error('No se encontró un participante con ese número de documento.');
}
*/


</script>
    <script>
export default {

  created:function(){
    this.consultarPersonas();
  },
  data() {
    return {
      ItemsEtapas: [
        "Etapa 1",
        "Etapa 2",
        "Etapa 3",
        "Etapa 4",
        "Etapa 5",
        "Etapa 6",
      ],
      itemsEtapa1: [
        {
          id: 1,
          title: "Aprobar todos los módulos",
          subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        },
        {
          id: 2,
          title: "Estar con sus cuotas al dia",
          subtitle:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        },
        {
          id: 3,
          title: "Presentación de monografia",
          subtitle:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
        },
      ],
      itemsEtapa2: [
        {
          id: 1,
          title: "Item 1",
          subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        },
        {
          id: 2,
          title: "Item 2",
          subtitle:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        },
        {
          id: 3,
          title: "Item 3",
          subtitle:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
        },
      ],
      itemsEtapa3: [
        {
          id: 1,
          title: "Item 1",
          subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        },
        {
          id: 2,
          title: "Item 2",
          subtitle:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        },
        {
          id: 3,
          title: "Item 3",
          subtitle:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
        },
      ],
      itemsEtapa4: [
        {
          id: 1,
          title: "Item 1",
          subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        },
        {
          id: 2,
          title: "Item 2",
          subtitle:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        },
        {
          id: 3,
          title: "Item 3",
          subtitle:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
        },
      ],
      itemsEtapa5: [
        {
          id: 1,
          title: "Item 1",
          subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        },
        {
          id: 2,
          title: "Item 2",
          subtitle:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        },
        {
          id: 3,
          title: "Item 3",
          subtitle:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
        },
      ],
      itemsEtapa6: [
        {
          id: 1,
          title: "Item 1",
          subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        },
        {
          id: 2,
          title: "Item 2",
          subtitle:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        },
        {
          id: 3,
          title: "Item 3",
          subtitle:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
        },
      ],

      showDetails: false,
      progress: 25,
    };
  },
  methods: {
  consultarPersonas(){
    axios.get('http://localhost:3000/api/personas/')
    .then(response=>{
this.personas=response.data;
console.log("alvaro",response)
    });
  /*  fetch('http://localhost:3000/api/personas/')
    .then(respuesta =>respuesta.json())
    .then(datosrespuesta => {
      console.log(datosrespuesta)
    })
    .catch(console.log)
  },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    }*/
  }
}
}
</script>

<template>
  <v-card max-width="1200" flat class="mx-auto my-10" elevation="3">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Tramites
    </v-card-title>

    <v-card-subtitle class="text-h5 py-5">
      Seguimineto de titulación
    </v-card-subtitle>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex"> </v-card-title>
          <VDivider />

          <v-card-title>
            <!-- Formulario -->
            <VForm class="mt-6">
              <v-row>
                <!-- Documento de identidad -->
                <v-col cols="12" md="6">
                  <v-text>C.I. N°</v-text>
                  <v-text-field
                    class="text-field-search"
                    v-model="nroCarnet.value.value"
                    label="Documento de identidad"
                    variant="outlined"
                    persistent-hint
                    margin="dense"
                  ></v-text-field>
                </v-col>

                <!-- Fecha nacimiento -->
                <v-col cols="12" md="6">
                  <v-text>Fecha de nacimiento</v-text>
                  <VueDatePicker
                    class="flex-grow-1"
                    v-model="fechaFin"
                    locale="es"
                    :teleport="true"
                    :enable-time-picker="false"
                    placeholder="Fecha de fin"
                    :year-range="[2021, 2060]"
                    :cancel-text="textoCancelar"
                    :select-text="textoSeleccionar"
                  >
                  </VueDatePicker>
                </v-col>

                <!-- Acciones del Formulario -->
                <v-col cols="12" class="d-flex flex-wrap justify-center gap-4">
                  <VBtn color="secondary" @click="consultarPersonas">Buscar </VBtn>
                </v-col>
              </v-row>
            </VForm>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <v-card max-width="1200" flat class="mx-auto my-10" elevation="3">
    <v-card-title class="text-h4 font-weight-bold" tag="h3"> </v-card-title>

    <v-card-subtitle class="text-h5 py-5">
      Resultados de la búsqueda
    </v-card-subtitle>
    <v-row  >
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex"> </v-card-title>
          <VDivider />

          <v-card-title>
            <!-- Formulario -->
            <VForm class="mt-6">
              <v-row>
                <!-- Documento de identidad -->
                <v-col md="4" cols="12" class="col-etiqueta">
                  <v-row>
                    <v-text class="text-etiqueta">Codigo de empaste</v-text>

                    <v-text-field
                      class="field-etiqueta"
                      v-model="nroCarnet.value.value"
                      variant="outlined"
                      persistent-hint
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
                <!-- Documento de identidad -->
                <v-col class="col-etiqueta" md="5" cols="12">
                  <v-row>
                    <v-text class="text-etiqueta">Nombre completo</v-text>

                    <v-text-field
                      class="field-etiqueta"
                      v-model="nroCarnet.value.value"
                      variant="outlined"
                      persistent-hint
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
                <!-- Documento de identidad -->
                <v-col class="col-etiqueta" md="3" cols="12">
                  <v-row>
                    <v-text class="text-etiqueta">C.I. N°</v-text>

                    <v-text-field
                      class="field-etiqueta"
                      v-model="nroCarnet.value.value"
                      variant="outlined"
                      persistent-hint
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <!-- Programa -->
                <v-col md="4" cols="12" class="col-etiqueta">
                  <v-row>
                    <v-text class="text-etiqueta">Programa</v-text>
                    <v-text-field
                      class="field-etiqueta"
                      v-model="nroCarnet.value.value"
                      variant="outlined"
                      persistent-hint
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
                <!-- Sede -->
                <v-col class="col-etiqueta" md="4" cols="12">
                  <v-row>
                    <v-text class="text-etiqueta">Sede</v-text>
                    <v-text-field
                      class="field-etiqueta"
                      v-model="nroCarnet.value.value"
                      variant="outlined"
                      persistent-hint
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
                <!-- Inicio de trámite -->
                <v-col class="col-etiqueta" md="4" cols="12">
                  <v-row>
                    <v-text class="text-etiqueta">Inicio de trámite</v-text>

                    <v-text-field
                      class="field-etiqueta"
                      v-model="nroCarnet.value.value"
                      variant="outlined"
                      persistent-hint
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <!-- Estado -->
                <v-col md="4" cols="12" class="col-etiqueta">
                  <v-row>
                    <v-text class="text-etiqueta">Estado</v-text>

                    <v-text-field
                      class="field-etiqueta"
                      v-model="nroCarnet.value.value"
                      variant="outlined"
                      persistent-hint
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
                <!-- Etapa del trámite -->
                <v-col class="col-etiqueta" md="4" cols="12">
                  <v-row>
                    <v-text class="text-etiqueta">Etapa del trámite</v-text>

                    <v-text-field
                      class="text-field-results"
                      v-model="nroCarnet.value.value"
                      variant="outlined"
                      persistent-hint
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card class="card-detalle">
                    <v-btn color="green" @click="toggleDetails">{{
                      showDetails ? "Ocultar Detalle" : "Ver Más Detalle"
                    }}</v-btn>

                    <div class="div-detalle" v-if="showDetails">
                      <h2>Proceso externo de titulación</h2>
                      <div class="text-caption">Etapas</div>
                      <v-stepper :items="ItemsEtapas">
                        <template v-slot:item.1>
                          <v-card title="Entrega de monografia" flat>
                            <v-list lines="one">
                              <v-list-item v-for="itemsEtapa1 in itemsEtapa1" :key="itemsEtapa1.id">
                                <v-list-item-content>
                                  <v-list-item-title>
                                    <v-icon 
                                    color="green"
                                    icon="fa-check" >
                                  </v-icon>
                                    
                                    {{
                                    itemsEtapa1.title
                                  }}</v-list-item-title>
                                  <v-list-item-subtitle>
                                    {{
                                    itemsEtapa1.subtitle
                                  }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </template>

                        <template v-slot:item.2>
                          <v-card title="Revisión de monografia" flat>
                            <v-list lines="one">
                              <v-list-item
                                v-for="n in 3"
                                :key="n"
                                :title="'Item ' + n"
                                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
                              ></v-list-item>
                            </v-list>
                          </v-card>
                        </template>

                        <template v-slot:item.3>
                          <v-card title="Presentación de documentacion" flat>
                            <v-list lines="one">
                              <v-list-item
                                v-for="n in 3"
                                :key="n"
                                :title="'Item ' + n"
                                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
                              ></v-list-item>
                            </v-list>
                          </v-card>
                        </template>

                        <template v-slot:item.4>
                          <v-card title="Entrega final" flat>
                            <v-list lines="one">
                              <v-list-item
                                v-for="n in 3"
                                :key="n"
                                :title="'Item ' + n"
                                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
                              ></v-list-item>
                            </v-list>
                          </v-card>
                        </template>

                        <template v-slot:item.5>
                          <v-card title="En tramite" flat>
                            <v-list lines="one">
                              <v-list-item
                                v-for="n in 3"
                                :key="n"
                                :title="'Item ' + n"
                                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
                              ></v-list-item>
                            </v-list>
                          </v-card>
                        </template>

                        <template v-slot:item.6>
                          <v-card title="Titulo listo?" flat>
                            <v-list lines="one">
                              <v-list-item
                                v-for="n in 3"
                                :key="n"
                                :title="'Item ' + n"
                                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
                              ></v-list-item>
                            </v-list>
                          </v-card>
                        </template>
                      </v-stepper>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </VForm>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.text-field-search {
  height: 56px;
  width: 100%;
}
.card {
  border-right: solid;
  border-width: solid;
  color: #cdcdcd;
}
.text-etiqueta {
  padding: 2%;
}
.field-etiqueta {
  padding: 1;
}
.col-etiqueta {
  padding-right: 3%;
}
.text-field-results {
}
.card-detalle {
  padding: 2%;
}
.div-detalle {
  padding-top: 2%;
}
</style>