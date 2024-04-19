<template>
  <v-container class="fill-height">
    <v-sheet class="
          d-flex align-center justify-center flex-column
          text-center mx-auto px-4
          rounded-lg" elevation="10" rounded-shaped color="grey-lighten-5" width="70vw" height="70vh" border="md">

      <v-container class="d-flex flex-column align-center">
        <div class="d-flex align-center">
          <v-img :aspect-ratio="1" src="../assets/imgs/prancheto_abertura.png" width="180" class="img-mascote"></v-img>
          <h1 class="main-msg"> Olá, seja bem-vindo (a)</h1>
        </div>


        <v-divider class="my-4 " width="70%"></v-divider>
        <Megaphone :class="{ 'wobble-hor-bottom': animaMega }" @click="playAudio()" />

        <p class="welcome-text"> Você vai responder algumas questões de Português.</p>
        <p class="welcome-text"> Ouça a orientação do que deve ser feito no início de cada questão.</p>
        <p class="welcome-text"> Se quiser ouvir novamente, clique no megafone.</p>
        <p class="welcome-text"> Depois, marque a alternativa que considera correta.</p>
        <p class="welcome-text"> Para seguir em frente, clique em continuar.</p>
        <p class="welcome-text"> Vamos lá! </p>
        <v-btn class="flex-grow-1 mt-4 cont-button" :class="{ 'shake-horizontal': animaButton }" height="55" size="large" width="50%" variant="flat" color="#1E3892"
          elevation-15 @click="proximaPagina" :loading="loading"> {{ buttonText }} </v-btn>

      </v-container>
    </v-sheet>
  </v-container>



</template>

<script>
import Megaphone from './Megaphone.vue'
import audiowelcome from '@/assets/audios/outros_audios/audio_bemvindo.mp3'


export default {
  name: 'messageWelcome',
  components: {
    Megaphone,

  },

  data() {
    return {
      audioAux: '',
      megafoneDisable: false,
      loading: false,
      buttonText: 'Continuar',
      animaMega: false,
      animaButton: false
    }
  },

  mounted() {
    this.playAudio();
  },

  methods: {
    proximaPagina() {
      this.audioAux.pause();
      this.$router.push('/testStart');
      this.loading = true;
    },
    resetMegafone() {            //Utilizar esta função sempre que trocar de item.
      this.megafoneDisable = false;
    },
    playAudio() {
      if (this.megafoneDisable == false) {
        this.audioAux = new Audio(audiowelcome);
        this.audioAux.play();
        this.megafoneDisable = true;
        setTimeout(() => {
          this.animaMega = !this.animaMega;
        }, 12000);
        setTimeout(() => {
          this.animaButton = !this.animaButton;
        }, 19500);
        setTimeout(this.resetMegafone, 13000);
      }
    },
  }

}

</script>./Megaphone.vue

<style>
.main-msg {
  margin-right: 20px;
  font-family: 'Manrope';
}

.welcome-text {
  font-family: 'Manrope';
  font-size: 20px;
  font-weight: 600;

}

.shake-horizontal {
  -webkit-animation: shake-horizontal 1s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
  animation: shake-horizontal 1s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
}

 @-webkit-keyframes shake-horizontal {
  0%,
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    -webkit-transform: translateX(-10px);
            transform: translateX(-10px);
  }
  20%,
  40%,
  60% {
    -webkit-transform: translateX(10px);
            transform: translateX(10px);
  }
  80% {
    -webkit-transform: translateX(8px);
            transform: translateX(8px);
  }
  90% {
    -webkit-transform: translateX(-8px);
            transform: translateX(-8px);
  }
}
@keyframes shake-horizontal {
  0%,
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    -webkit-transform: translateX(-10px);
            transform: translateX(-10px);
  }
  20%,
  40%,
  60% {
    -webkit-transform: translateX(10px);
            transform: translateX(10px);
  }
  80% {
    -webkit-transform: translateX(8px);
            transform: translateX(8px);
  }
  90% {
    -webkit-transform: translateX(-8px);
            transform: translateX(-8px);
  }
}


.wobble-hor-bottom {
  -webkit-animation: wobble-hor-bottom 1s both;
  animation: wobble-hor-bottom 1s both;
}

@-webkit-keyframes wobble-hor-bottom {

  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }

  15% {
    -webkit-transform: translateX(-30px) rotate(-6deg);
    transform: translateX(-30px) rotate(-6deg);
  }

  30% {
    -webkit-transform: translateX(15px) rotate(6deg);
    transform: translateX(15px) rotate(6deg);
  }

  45% {
    -webkit-transform: translateX(-15px) rotate(-3.6deg);
    transform: translateX(-15px) rotate(-3.6deg);
  }

  60% {
    -webkit-transform: translateX(9px) rotate(2.4deg);
    transform: translateX(9px) rotate(2.4deg);
  }

  75% {
    -webkit-transform: translateX(-6px) rotate(-1.2deg);
    transform: translateX(-6px) rotate(-1.2deg);
  }
}

@keyframes wobble-hor-bottom {

  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }

  15% {
    -webkit-transform: translateX(-30px) rotate(-6deg);
    transform: translateX(-30px) rotate(-6deg);
  }

  30% {
    -webkit-transform: translateX(15px) rotate(6deg);
    transform: translateX(15px) rotate(6deg);
  }

  45% {
    -webkit-transform: translateX(-15px) rotate(-3.6deg);
    transform: translateX(-15px) rotate(-3.6deg);
  }

  60% {
    -webkit-transform: translateX(9px) rotate(2.4deg);
    transform: translateX(9px) rotate(2.4deg);
  }

  75% {
    -webkit-transform: translateX(-6px) rotate(-1.2deg);
    transform: translateX(-6px) rotate(-1.2deg);
  }
}



@media(max-width: 1550px) {


  .welcome-text {
    font-size: 13px;
  }

  .img-mascote {
    width: 100px !important;

  }

  .cont-button {
    height: 7vh !important;
    font-size: 14px !important;
  }



}
</style>