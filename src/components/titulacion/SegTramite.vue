<script setup>
import { collection } from "firebase/firestore";
import { useCollection } from "vuefire";
import { ref, computed } from "vue";
import { db } from "@/config/firebase";
import axios from "axios";

const etapasProcesoExTCollection = useCollection(
  collection(db, "etapasProcesoExT")
);
const showDetails = ref(false); // Variable para mostrar/ocultar ver más detalles
const showResults = ref(false); // Variable para mostrar/ocultar resultados busqueda
const activeStep = ref(1);
const numDoc = ref("");
const num_documento = ref("");
const nombrePersona = ref("");
const apellidoPersona = ref("");
const codigo_emp = ref("");
const programa = ref("");
const sede = ref("");
const inicio_tramite = ref("");
const estado = ref("");
const etapa_tramite = ref("");

// Variables para el snackbar al momento de buscar a una persona
const snackbar = ref(false);
const nackbarText = ref("");
const snackbarColor = ref("");

// Método para buscar la persona por número de documento
const buscarPersona = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/buscar-estudiante/${numDoc.value}`
    );
    if (response.data) {
      num_documento.value = response.data.num_doc;
      nombrePersona.value = response.data.nombre;
      apellidoPersona.value = response.data.apellidoPersona;
      codigo_emp.value = response.data.codigo_empaste;
      programa.value = response.data.programa;
      sede.value = response.data.sede;
      inicio_tramite.value = response.data.inicio_tramite;
      estado.value = response.data.estado;
      etapa_tramite.value = response.data.etapa_tramite;
      activeStep.value = parseInt(etapa_tramite.value);
      console.log("etapa del tramite", activeStep.value);

      // Mostrar los resultados después de busqueda
      showResults.value = true;
      // Mostrar snackbar cuando el estudiante es encontrado
      nackbarText.value = "Datos encontrados";
      snackbar.value = true;
      snackbarColor.value = "green";

    } else {
      nombrePersona.value = "Persona no encontrada";
      showResults.value = false;

      // Mostrar snackbar con mensaje de estudiante no encontrado
      nackbarText.value = "Persona no encontrada";
      snackbar.value = true;
      snackbarColor.value = "red";
      
      
    }
  } catch (error) {
    console.error("Error al buscar persona:", error);
    nombrePersona.value = "Error en la búsqueda";
    showResults.value = false;

  // Mostrar snackbar con mensaje de error
    nackbarText.value = "Error en la búsqueda";
    snackbar.value = true;
    snackbarColor.value = "red";
  }
};

const fechaFin = ref(new Date().toISOString().substr(0, 10));
const textoCancelar = "Cancelar";
const textoSeleccionar = "Seleccionar";

const itemsEtapa1 = ref([
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
]);
const itemsEtapa2 = ref([
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
]);
const itemsEtapa3 = ref([
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
]);

const itemsEtapa4 = ref([
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
]);
const itemsEtapa5 = ref([
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
]);
const itemsEtapa6 = ref([
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
]);
const currentItems = computed(() => {
  switch (activeStep.value) {
    case 1:
      return itemsEtapa1.value;
    case 2:
      return itemsEtapa2.value;
    case 3:
      return itemsEtapa3.value;
    case 4:
      return itemsEtapa4.value;
    case 5:
      return itemsEtapa5.value;
    case 6:
      return itemsEtapa6.value;
    default:
      return [];
  }
});

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};
</script>
    <script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      persona: null,
      headers: [
        { title: "Unidad", value: "unidad" },
        { title: "Actividad", value: "actividad" },
        { title: "tiempo (Semanas)", value: "tiempo" },
      ],

      progress: 25,
    };
  },
  methods: {
    ...mapActions(["fetchPersonas"]),
  },
  computed: {
    ...mapState(["personas"]),
  },
  created() {
    this.fetchPersonas();
  },
};
</script>

<template>
  <v-card max-width="1200" flat class="mx-auto my-10" elevation="3">
    <v-card-title class="text-h4" tag="h3"> Tramites </v-card-title>
    <v-card-subtitle class="text-h5 py-5">
      Seguimineto de titulación
    </v-card-subtitle>
    <v-row>
      <v-col cols="12">
        <v-card>
          <VDivider />
          <v-card-title>
            <!-- Formulario -->
            <VForm class="mt-6">
              <v-row>
                <!-- Documento de identidad -->
                <v-col cols="12" md="4">
                  <v-text>C.I. N°</v-text>
                  <v-text-field
                    class="text-field-search"
                    v-model="numDoc"
                    label="C.I. N° - Documento de identidad"
                    variant="outlined"
                    persistent-hint
                    margin="dense"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <!-- Fecha nacimiento -->
                <v-col cols="12" md="4">
                  <v-text>Fecha de nacimiento</v-text>
                  <VueDatePicker
                    class="flex-grow-1"
                    v-model="fechaFin"
                    locale="es"
                    :teleport="true"
                    :enable-time-picker="false"
                    placeholder="Fecha de fin"
                    :year-range="[1960, 2060]"
                    :cancel-text="textoCancelar"
                    :select-text="textoSeleccionar"
                  >
                  </VueDatePicker>
                </v-col>

                <!-- Boton de buscar -->
                <v-col cols="12" md="4" class="d-flex align-center">
                  <VBtn color="secondary" @click="buscarPersona">Buscar </VBtn>
                </v-col>
              </v-row>
            </VForm>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <!-- Carta maneja resultados de la búsqueda -->
  <v-card
    v-if="showResults"
    max-width="1200"
    flat
    class="mx-auto my-10"
    elevation="3"
  >
    <v-card-title class="text-h4 font-weight-bold" tag="h3"> </v-card-title>

    <v-card-subtitle class="text-h5 py-5">
      Resultados de la búsqueda
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
                <v-col md="4" cols="12" class="col-etiqueta">
                  <v-row>
                    <v-text class="text-etiqueta">Codigo de empaste</v-text>

                    <v-text-field
                      class="field-etiqueta"
                      v-model="codigo_emp"
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
                      v-model="nombrePersona"
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
                      v-model="num_documento"
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
                      v-model="programa"
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
                      v-model="sede"
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
                      v-model="inicio_tramite"
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
                      v-model="estado"
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
                      v-model="etapa_tramite"
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
                      <v-stepper v-model="activeStep">
                        <v-stepper-header>
                          <v-stepper-step
                            v-for="index in 6"
                            :key="index"
                            :complete="activeStep > index"
                            :step="index"
                            :class="{ 'step-selected': activeStep === index }"
                          >
                            Etapa {{ index }}
                          </v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                          <v-stepper-content :step="activeStep">
                            <v-card flat>
                              <v-list lines="one">
                                <v-list-item
                                  v-for="item in currentItems"
                                  :key="item.id"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>
                                      <v-icon color="green">mdi-check</v-icon>
                                      {{ item.title }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                      {{ item.subtitle }}
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-stepper-content>
                        </v-stepper-items>
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
  <v-card max-width="1200" flat class="mx-auto my-10" elevation="3">
    <v-row max-width="1200">
      <v-col>
        <v-card>
          <v-data-table-virtual
            :headers="headers"
            :items="etapasProcesoExTCollection"
            :sort-by="[{ key: 'idRegCaja', order: 'asc' }]"
            class="height: auto"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-toolbar-title class="text-center">
                  Proceso externo de titulación
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>

            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reiniciar </v-btn>
            </template>
          </v-data-table-virtual>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
    <!-- Snackbar al moemnto de buscar a una persona por número de documento -->
    <v-snackbar v-model="snackbar" :color="snackbarColor">
    {{ nackbarText }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style>
.text-field-search {
  height: 56px;
  width: 100%;
}
.v-field__input {
  min-height: 0 !important; /* Sobrescribe el min-height */
  padding-bottom: 0 !important;
  display: flex;
  align-items: center;
  height: 40px; /* Ajusta la altura*/
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

.card-detalle {
  padding: 2%;
}
.div-detalle {
  padding-top: 2%;
}
.v-toolbar-title {
  font-weight: bold;
}

.v-toolbar-title {
  font-weight: bold;
}
.step-selected {
  background-color: #4caf50; /* Cambia a tu color preferido */
  color: white;
}

</style>