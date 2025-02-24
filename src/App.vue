<template>
  <v-app>
    <Sidebar />
    <TopBar />

    <v-main class="main-container">
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

.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex-grow: 1;
  padding: 16px;
  overflow: auto;
  background-color: #eaecef;
}
</style>
