<template>
  <v-app-bar flat color="#1E3892">
    <v-container fluid class="mx-auto">
      <v-row class="d-flex justify-center">
        <v-col cols="11" class="d-flex align-center justify-center">
          <v-avatar class="me-4" color="blue-lighten-4" size="32"></v-avatar>
          <h1 class="menu-title">Plano A</h1>

          <!-- <v-btn
            v-for="link in links"
            :key="link"
            :text="link"
            variant="text"
          ></v-btn> -->
          
          <v-spacer></v-spacer>

          <v-btn  @click="logout" prepend-icon="mdi-logout-variant">
            SAIR
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
/* const links = ["Dashboard", "Turmas", "Atualizações"];*/
  const links = [""]
</script>

<script>
export default {
  name: "NavBar",
  data (){
    return {
      
    }
  },
  props : {
    admin : {
      type: Boolean,
      required: false,
      default: () => false,
    }
  },
  created () {
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/proflogin");
    },
  },
};
</script>


<style>

.menu-title{
  font-family: 'Urbanist-Regular';
  font-weight: 300;
  font-size: 1.6rem;
  color: rgb(228, 230, 230);
  margin-top: 0.2vh;
}


@font-face {
  font-family: 'Urbanist-Regular';
  src: url(../assets/fonts/Urbanist/static/Urbanist-Regular.ttf);
}


@font-face {
  font-family: 'Raleway-Regular';
  src: url(../assets/fonts/Raleway/static/Raleway-Regular.ttf);
}



</style>