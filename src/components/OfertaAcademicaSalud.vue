<script setup>
import { ref, computed } from 'vue';

// Variable para controlar el índice de la ventana activa
const indexWindow = ref(1);

// Array de cartas
const cards = [
  {
    image: new URL('@/assets/images/portada/11.jpeg', import.meta.url).href,
    title: 'Diplomado',
    description: 'Diplomado en Psicología Clínica Diagnóstico y Psicoterapia',
  },
  {
    image: new URL('@/assets/images/portada/8.jpeg', import.meta.url).href,
    title: 'Diplomado',
    description: 'Diplomado en Nefrología y Tratamientos Renales Avanzados ',
  },
  {
    image: new URL('@/assets/images/portada/1.jpeg', import.meta.url).href,
    title: 'Diplomado',
    description: 'Diplomado en Toxicología y Bacteriología Clínica.',
  },
  {
    image: new URL('@/assets/images/portada/9.jpeg', import.meta.url).href,
    title: 'Diplomado',
    description: 'Diplomado en Farmacia Hospitalaria',
  },
  {
    image: new URL('@/assets/images/portada/3.jpeg', import.meta.url).href,
    title: 'Cruso',
    description: 'REGULACIÓN, CONTROL Y FISCALIZACIÓN DE LA SEGURIDAD SOCIAL A CORTO PLAZO',
  },
  {
    image: new URL('@/assets/images/portada/10.jpg', import.meta.url).href,
    title: 'Maestría',
    description: 'Maestría en Auditoría Medica y de Salud con Mención en Gestión de Calidad',
  },
];

// Función para dividir el array de cartas en grupos de 3
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

// Devuelve las cartas en grupos de 3
const chunkedCards = computed(() => chunkArray(cards, 3));

const next = () => {
  if (indexWindow.value < chunkedCards.value.length) {
    indexWindow.value += 1;
  }
};

const prev = () => {
  if (indexWindow.value > 1) {
    indexWindow.value -= 1;
  }
};
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row justify="center">
      <v-card class="card-principal" rounded="0" theme="white" flat>
        <v-window v-model="indexWindow">
          <v-window-item v-for="(chunk, index) in chunkedCards" :key="`chunk-${index}`" :value="index + 1">
            <v-row class="d-flex justify-center align-center">
              <v-col v-for="card in chunk" :key="card.title+index" cols="12" md="4" class="d-flex justify-center">
                <v-card class="card-portada ma-3" max-width="344">
                  <img :src="card.image" class="card-image bordered" height="280px">
                  <div class="yellow-line"></div>
                  <v-card-title class="card-title">{{ card.title }}</v-card-title>
                  <v-card-text class="card-text" style="color: #162b4b;">
                    {{ card.description }}
                    <div class="div-btn">
                      <v-btn class="btn-ver-curso" variant="outlined">
                        ver curso
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
        <v-card-actions class="justify-space-between">
          <v-btn icon="mdi-chevron-left" variant="plain" @click="prev" style="color: #254e83;"></v-btn>
          <v-item-group v-model="indexWindow" class="text-center" mandatory>
            <v-item v-for="(chunk, index) in chunkedCards" :key="`btn-${index}`" v-slot="{ isSelected, toggle }" :value="index + 1">
              <v-btn :variant="isSelected ? 'outlined' : 'text'" icon="mdi-checkbox-blank" @click="toggle" style="color: #254e83;" :class="{ 'square-shape': isSelected }"></v-btn>
            </v-item>
          </v-item-group>
          <v-btn icon="mdi-chevron-right" variant="plain" @click="next" style="color: #254e83;"></v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>


<style scoped>
.card-principal {
  background-color: #ffffff;
}

.card-portada {
  background: linear-gradient(to right, #162b4b, #254e83);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
}
.card-text {
  padding-top: 10px;
  color: #ffe10b;
}
.div-btn {
  padding-top: 15px;
}
.btn-ver-curso {
  border-color: #254e83;
  color: #254e83;
  font-weight: bold;
  padding: 10px 20px;
  font-size: 16px;
  border-width: 2px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card-title {
  background: transparent;
}
.card-text {
  background: white;
  color: #162b4b;
}
.yellow-line {
  width: 250px;
  height: 6px;
  background-color: #ffe10b;
  margin: 0 auto;
  margin-top: 0px;
}
.card-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.bordered {
  border: 5px solid #254e83;
}
.square-shape {
  border-radius: 0 !important; /* Forma cuadrada */
}
</style>
