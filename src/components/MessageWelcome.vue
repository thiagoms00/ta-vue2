<template>
    <v-container class="fill-height">
      <v-sheet class="
          d-flex align-center justify-center flex-column
          text-center mx-auto px-4
          rounded-lg" elevation="10" rounded-shaped color="grey-lighten-5" width="50vw" height="60vh" border="md">
        
        <v-container class="d-flex flex-column align-center">

          <h1> Olá, seja bem-vindo (a).</h1>
          
          <v-divider class="my-4 " width="70%"></v-divider>

          <p class="font-weight-light">Você irá responder algumas questões de Língua Portuguesa.</p>
          <p>Indique, em cada questão, a alternativa que você considera correta.</p>
          <p>Para iniciar, clique no botão abaixo.</p>
          <Megaphone/>
          <v-btn class ="flex-grow-1 mt-4" height="55" size="large" width="50%" variant="flat" color="#1E3892" elevation-15 @click="proximaPagina"> Começar </v-btn>

        </v-container>
      </v-sheet>
    </v-container>
  
</template>

<script>
import Megaphone from './Megaphone.vue'

  export default{
      name:'messageWelcome',
      components:{
        Megaphone
        
      },
      methods: {
        proximaPagina() {
          this.$router.push('/TestStart');
        }
  }
      
  }

</script>./Megaphone.vue