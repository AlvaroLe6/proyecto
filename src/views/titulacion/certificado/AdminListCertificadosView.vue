<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import AdminListCertficadosD from '@/components/titulacion/certificado/AdminListCertficadosD.vue'
import AdminListCertficadosC from '@/components/titulacion/certificado/AdminListCertficadosC.vue'


const route = useRoute()
const activeTab = ref(route.params.tab)

// tabs
const tabs = [

  {
    title: 'Certificados Desarrollo',
    icon: 'mdi-book',
    tab: 'certificadoDesarrollo',
  },
  {
    title: 'Certificados Conclusión',
    icon: 'mdi-certificate',
    tab: 'certificadoConclusion',
  },
]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
      :touch="false"
    >
      <!-- Account -->
      <VWindowItem value="certificadoConclusion">
        <AdminListCertficadosC/>
      </VWindowItem>
      <!-- Security -->
      <VWindowItem value="certificadoDesarrollo">
        <AdminListCertficadosD />
      </VWindowItem>

    </VWindow>
  </div>
</template>
