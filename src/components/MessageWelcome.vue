<template>
    <v-container class="fill-height">
      <v-sheet class="
          d-flex align-center justify-center flex-column
          text-center mx-auto px-4
          rounded-lg" elevation="10" rounded-shaped color="grey-lighten-5" width="70vw" height="60vh" border="md">
        
        <v-container class="d-flex flex-column align-center">
          <h1> Olá, seja bem-vindo (a).</h1>
          
          <v-divider class="my-4 " width="70%"></v-divider>
          <Megaphone @click="playAudio()"/>

          <p class="font-weight-light"> Você irá responder algumas questões de Língua Portuguesa.</p>
          <p> No início de cada questão, você vai ouvir a orientação do que deve ser feito. Se quiser ouvir novamente, clique no megafone.</p>
          <p> Depois, indique, em cada questão, a alternativa que você considera correta.</p>
          <p> Para continuar, basta clicar em Continuar.</p>
          <p> Vamos lá! </p>
          <p> Para iniciar, clique no botão abaixo </p>
          <v-btn class ="flex-grow-1 mt-4" height="55" size="large" width="50%" variant="flat" color="#1E3892" elevation-15 @click="proximaPagina" :loading="loading" > {{buttonText}} </v-btn>
          
        </v-container>
      </v-sheet>
    </v-container>

    
  
</template>

<script>
import Megaphone from './Megaphone.vue'
import audiowelcome from '@/assets/audios/outros_audios/audio_bemvindo.mp3'


  export default{
      name:'messageWelcome',
      components:{
        Megaphone,
        
      },

      data (){
        return {
          audioAux: '',
          megafoneDisable : false,
          loading: false,
          buttonText: 'Continuar'
        }
      },  

      mounted (){
        this.playAudio();
      },

      methods: {
        proximaPagina() {
          this.audioAux.pause();
          this.$router.push('/testStart');
          this.loading = true;
        },
        resetMegafone(){            //Utilizar esta função sempre que trocar de item.
          this.megafoneDisable = false;
        },
        playAudio(){
          if(this.megafoneDisable==false){
                this.audioAux = new Audio(audiowelcome);
                this.audioAux.play();
                this.megafoneDisable = true;
                setTimeout(this.resetMegafone,13000);
            }
        },
  }
      
  }

</script>./Megaphone.vue