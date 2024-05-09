<script setup>
import { useForm, useField } from "vee-validate";
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useRouter } from "vue-router";
import {validationProcesoSchema} from "@/validation/EtapaProcesoExTSchema.js";
import { ref } from "vue";




const fechaFin = ref(new Date().toISOString().substr(0, 10));
const db = useFirestore();
const router = useRouter();
const textoCancelar = "Cancelar";
const textoSeleccionar = "Seleccionar";

const { handleSubmit } = useForm({
  validationSchema: validationProcesoSchema
});

const unidad = useField("unidad");
const actividad = useField("actividad");
const tiempo = useField("tiempo");

const submit = handleSubmit(async (values) => {
  const {  ...etapasProcesoExT } = values;

  let originalId = "COD-PET-";
  let contador = 1;

  const queryID = await getDocs(collection(db, "etapasProcesoExT"));
  queryID.forEach((doc) => {
    const id = doc.id;
    const partes = id.split("-");
    const secuencia = partes[partes.length - 1]; // Obtiene el último elemento del array
    if (secuencia && !isNaN(secuencia)) {
      const numSecuencia = parseInt(secuencia);
      if (numSecuencia >= contador) {
        contador = numSecuencia + 1;
      }
    }
  });

  const generateNewId = () => {
    return `${originalId}${contador}`;
  };
  let generatedId = generateNewId();
  try {
    const docRef = await setDoc(
      doc(collection(db, "etapasProcesoExT"), generatedId),
      {
        ...etapasProcesoExT,
        idEtapasProcesoExT: generatedId,
        fecha: fechaFin.value,
      }
    );
    console.log("Documento guardado correctamente.");

    // Redirige al usuario a la lista de registros
    router.push({ name: "admin-list-contabilidad" });
  } catch (error) {
    console.error("Error al guardar el documento en Firestore:", error);
  }
});
</script>
    

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Nuevo registro
    </v-card-title>

    <v-card-subtitle class="text-h5 py-5">
      Agrega un nuevo registro llenando el siguiente formulario
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
                <!-- Unidad -->
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="unidad.value.value"
                    label="Unidad"
                    variant="outlined"
                    persistent-hint
                    :error-messages="unidad.errorMessage.value"

                  ></v-text-field>
                </v-col>
                <!-- Actividad  -->
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="actividad.value.value"
                    label="Actividad"
                    variant="outlined"
                    persistent-hint
                    :error-messages="actividad.errorMessage.value"
                  ></v-text-field>
                </v-col>

                <!-- Tiempo  -->
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="tiempo.value.value"
                    label="Tiempo"
                    variant="outlined"
                    persistent-hint
                    :error-messages="tiempo.errorMessage.value"

                  ></v-text-field>
                </v-col>

                <!-- Acciones del Formulario -->
                <v-col cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn @click="submit">Guardar</VBtn>

                  <VBtn
                    color="secondary"
                    variant="outlined"
                    type="reset"
                    @click.prevent=""
                  >
                    Borrar
                  </VBtn>
                </v-col>
              </v-row>
            </VForm>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>


