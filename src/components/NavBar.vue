<template>
  <v-app-bar flat color="#1E3892">
    <v-container fluid class="mx-auto">
      <v-row class="d-flex justify-center">
        <v-col cols="11" class="d-flex align-center justify-center">
          <v-avatar class="me-4" color="blue-lighten-4" size="32"></v-avatar>

          <v-btn
            v-for="link in links"
            :key="link"
            :text="link"
            variant="text"
          ></v-btn>

          <v-spacer></v-spacer>

          <v-btn dark @click="logout" prepend-icon="mdi-logout-variant">
            SAIR
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
const links = ["Dashboard", "Turmas", "Atualizações"];
</script>

<script>
export default {
  name: "NavBar",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/proflogin");
    },
  },
};
</script>
