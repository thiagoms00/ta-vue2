<template>
  <div class="text-center teste">
    <v-dialog v-model="dialogOpen" content-class="bottom-left-dialog main-dialog">

      <v-card width="40%" class="ml-16 main-card" max-width="500">
        <v-card-title class="d-flex align-center" style="background-color: #1E3892; color: white;">
          <v-icon icon="mdi-alert-circle-outline"></v-icon>
          <p class="ml-4 main-title"> Vamos lá</p>
        </v-card-title>
        <v-card-text class="pop-msg">
          <p class="main-text">
            Em caso de dúvida, que tal ouvir a questão novamente?<br>
            Depois, escolha uma alternativa e clique em continuar.<br>
          </p>
          </v-card-text>
        <template v-slot:actions>
          <v-btn class="ms-auto action-text" text="Fechar" @click="fecharDialog"></v-btn>
        </template>
      </v-card>

      <v-img :aspect-ratio="1" src="../assets/imgs/prancheto-popup.png" width="200" class="img-mascote"></v-img>


    </v-dialog>
  </div>
</template>

<script>
import audio from '@/assets/audios/outros_audios/audio_popupTeste.mp3'

export default {
  data(){
    return {
      dialogOpen: false,
      intervalId: null,
    };
  },
  props: {
    extratoCounter: Number
  },
  mounted() {
    // Inicia o temporizador para abrir o diálogo a cada 1 minuto
    this.intervalId = setInterval(() => {
      this.dialogOpen = true;
      this.audioAux = new Audio(audio);
      this.audioAux.play();
    }, 90000 + (this.extratoCounter * 30000)); // 1 minuto em milissegundos
  },

  methods: {
    fecharDialog() {
      
      // Reseta o temporizador quando o diálogo é fechado
      clearInterval(this.intervalId);
      this.dialogOpen = false;
      // Reinicia o temporizador para abrir o diálogo novamente após 1 minuto
      this.intervalId = setInterval(() => {
        this.dialogOpen = true;
      }, 90000 + (this.extratoCounter * 30000)); // 1 minuto em milissegundos
    },

    resetTimer() {
      clearInterval(this.intervalId);
    }
  }

};
</script>

<style>
.pop-msg {
  font-weight: 600 !important;
}

.bottom-left-dialog {
  bottom: 0;
  left: 0;
}

@media(max-width: 768px) {

  .main-card{
    width: 80% !important;
  }

  .img-mascote{
    width: 23.5vw !important;
    height: auto !important;
  }

  .pop-msg{
    font-weight: bold !important;
    font-size: 1.0rem !important;
  }

  .action-text{
    font-weight: bold  !important;
    font-size: 0.9rem !important
  }

}

@media(max-width: 1024px) {

.main-card{
  width: 50% !important;
}

.img-mascote{
  width: 15vw !important;
  height: auto !important;
}

.main-title{
  font-weight: bold !important;
  font-size: 1.15rem !important;
}

.pop-msg{
  font-weight: bold !important;
  font-size: 0.95rem !important;
}

.action-text{
  font-weight: bold  !important;
  font-size: 0.8rem !important;
}

}

</style>