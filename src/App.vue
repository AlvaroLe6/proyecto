  <script setup>
  import Footer from "@/views/Footer.vue";
  import { RouterView } from "vue-router";
  import { useAuthStore } from "./stores/auth";
  import UserProfile from '@/layouts/UserProfile.vue'
  import AdminMenu from "@/components/admin/AdminMenu.vue";
  import { useRouter } from "vue-router";

  const auth = useAuthStore();
  const router = useRouter();  


  </script>
  <template>
    <v-app>
        <v-app-bar app color="#162D4B" class="app-bar" >
          <div class="nav-container">
            <router-link :to="{ name: 'inicio' }"  class="logo-link">
              <img
                src="@/assets/ESCUELA DE NEGOCIOS_HORIZONTAL BLANCO.png"
                alt="Logo"
                height="80"
              />
            </router-link>
            <v-spacer></v-spacer>

            <div class="right-section">          
              <div v-if="auth.isAuth">
            <AdminMenu v-if="auth.isAuth" />
          </div>
              <UserProfile v-if="auth.isAuth" />
              <div v-if="!auth.isAuth">
            <v-btn 
              color="teal-lighten-3"
              prepend-icon="mdi-check-circle"
              variant="outlined"
              :to="{ name: 'seg-tramite' }"
            > 
              Seguimiento trámite
            </v-btn>
          
            <v-btn 

              :to="{ name: 'login' }"
            > 
              Iniciar Sesión 
            </v-btn>
          </div>
            
          </div>
        </div>
        </v-app-bar>
        <v-main style="margin-bottom: 50px">
          <v-container  fluid="true">
            <router-view />
          </v-container>
        </v-main>
      <Footer />
    </v-app>
  </template>
  <script>
  export default {
    data: () => ({
      items: [
        { title: "Cursos", route: "cursos" },
        { title: "Webinar", route: "webinar" },
      ],
    }),
    methods: {
      redirectToView(route) {
        this.$router.push({ name: route });
      },
    },
  };
  </script>
  <style scoped>
  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .logo-link {
    margin-right: 1rem; /* Ajusta esto para el espacio después del logo */
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 1rem; /* Ajusta esto para el espacio entre los elementos */
  }
  .logo-link {
    margin-right: 1rem; /* Ajusta esto para el espacio después del logo */
  }
  </style>