<template>
  <v-app>
    <Sidebar />
    <TopBar />
    <v-main class="main-container">
      <div class="content">
        <router-view></router-view>
        <PlaceholderDados></PlaceholderDados>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import TopBar from "@/components/TopBar.vue";
import PlaceholderDados from "./components/PlaceholderDados.vue";

export default {
  components: {
    Sidebar,
    TopBar,
    PlaceholderDados,
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

.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex-grow: 1;
  padding: 1.5vh;
  padding-right: 0;
  overflow: auto;
  
}
</style>
