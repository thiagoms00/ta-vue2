<template>
    <v-container class="fill-height">
      <v-sheet class="
          d-flex align-center justify-center flex-column
          text-center mx-auto px-4
          rounded-lg" elevation="10" rounded-shaped color="grey-lighten-5" width="60vw" height="60vh" border="md">
        
        <v-container class="d-flex flex-column align-center mainContainer">

          <div class="d-flex align-center">
            <v-img :aspect-ratio="1" src="../assets/imgs/prancheto_abertura.png"
            width="180" class="img-mascote"></v-img>
            <h1 class="msg mt-3">Você finalizou as questões!
Parabéns e até a próxima!</h1>
          </div>
          
          <v-divider class="my-4 " width="70%"></v-divider>

          <Megaphone class="icon-mega3" />

          <p class="finish-msg ml-2 mt-4">Clique no botão abaixo para finalizar o teste!</p>
          <v-btn class ="flex-grow-1 mt-4 finish-btn" height="50" size="large" width="50%" variant="flat" color="#1E3892"  elevation-15 @click="proximaPagina"> Finalizar </v-btn>

          
          
          
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
  margin-left: 0.2vw;
  font-size: 2.1rem;
}

.finish-msg{
  font-size: 1.8rem;
}

.finish-btn{
  margin-top: 10px
}

@media(max-width: 1550px){
    .msg{
        font-size: 1.4rem;
        margin-left: 0;
    } 
    
    .icon-msg{
      max-height: 10vh;
      width: 40vw;
    }

    .mainContainer{
    }

    .finish-msg{
      font-size: 1.5rem;
    }

    .icon-mega3{
      margin-top: 0;
    }

    .img-mascote{
       width: 100px !important;
    }

    .finish-btn{
      height: 6.5vh !important;
      font-size: 13px !important;
    }
} 

</style>