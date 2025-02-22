<template>
  <v-app>
    <!-- Sidebar fixa -->
    <Sidebar />

    <v-main class="main-container">
      <!-- Barra superior fixa -->
      <TopBar />

      <!-- Conteúdo principal -->
      <div class="content">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  components: {
    Sidebar,
    TopBar,
  },
};
</script>

<style>
@font-face {
  font-family: Manrope;
  src: url(assets/fonts/Manrope/Manrope-Regular.ttf);
}

@font-face {
  font-family: Manrope-light;
  src: url(assets/fonts/Manrope/Manrope-Light.ttf);
}

body {
  font-family: Manrope, sans-serif;
}

/* Ajuste de layout */
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* Define a área de conteúdo abaixo da TopBar */
.content {
  flex-grow: 1;
  padding: 16px;
  overflow: auto;
}
</style>
