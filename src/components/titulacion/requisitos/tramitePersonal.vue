<script setup>
import { ref } from 'vue';

// Variable para controlar la visibilidad del diálogo
const dialog = ref(false);
</script>
<template>
  <div class="center">
    <img
      src="@/assets/images/titulacion/tramite-personal.jpeg"
      alt="Logo"
      @click="dialog = true"
      class="clickable-image"
    />
  </div>

  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="text-h5">TRÁMITE PERSONAL</v-card-title>
      <v-card-text class="d-flex justify-center">
        <img
          src="@/assets/images/titulacion/tramite-personal.jpeg"
          alt="Logo Completo"
          class="full-image"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
        <v-btn 
          color="blue darken-1" 
          text 
          :href="`@/assets/images/titulacion/tramite-personal.jpeg`" 
          download
        >
          Descargar
          <v-icon right>mdi-download</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

img {
  max-width: 100%;
  height: auto;
}

.clickable-image {
  cursor: pointer;
}

.full-image {
  max-width: 100%;
  height: auto;
}
</style>
