<template>
    <v-container class="fill-height">
      <v-sheet class="
          d-flex align-center justify-center flex-column
          text-center mx-auto px-4
          rounded-lg" elevation="10" rounded-shaped color="grey-lighten-5" width="50vw" height="60vh" border="md">
        
        <v-container class="d-flex flex-column align-center">

          <div class="icon-msg mr-2">
            <v-img
                max-height="73"
                width="73"
                src="../assets/imgs/happy2.svg"
                cover
            ></v-img> 
            <h1 class="msg mt-3">Parabéns! Você concluiu a sua atividade.</h1>
          </div>
          
          <v-divider class="my-4 " width="70%"></v-divider>

          <Megaphone class="mt-1" />

          <p class="finish-msg ml-2 mt-4">Clique no botão abaixo para finalizar o teste!</p>
          <v-btn class ="flex-grow-1 mt-10 finish-btn" height="55" size="large" width="50%" variant="flat" color="#1E3892"  elevation-15 @click="proximaPagina"> Finalizar </v-btn>

          
          
          
        </v-container>
      </v-sheet>
    </v-container>
  
</template>

<script>
import Megaphone from './Megaphone.vue'

  export default{
      name:'messageCongratulations',
      components:{
        Megaphone
        
      },

      data (){

        return {
        }

      },


      methods: {
        proximaPagina() {
          this.$router.push('/login');
        }
  }
      
  }

</script>./Megaphone.vue

<style>
*{
  font-family: Manrope;
}

.icon-msg{
  display: flex;
  flex-direction: row;
}

.msg{
  margin-left: 0.5vw;
  font-size: 2.1rem;
}

.finish-msg{
  font-size: 1.8rem;
}

.finish-btn{
  margin-top: 10px
}

</style>