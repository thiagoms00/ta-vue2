<template>
  <div class="text-center">
    <v-dialog v-model="dialogOpen" content-class="bottom-left-dialog">

      <v-card width="40%" class="ml-16" max-width="500">
        <v-card-title class="d-flex align-center" style="background-color: #1E3892; color: white;">
          <v-icon icon="mdi-alert-circle-outline"></v-icon>
          <p class="ml-4"> Vamos lá</p>
        </v-card-title>
        <v-card-text class="pop-msg">
          <p>
            Em caso de dúvida, que tal ouvir a questão novamente?<br>
            Depois, escolha uma alternativa e clique em continuar.<br>
          </p>
          </v-card-text>
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Fechar" @click="fecharDialog"></v-btn>
        </template>
      </v-card>

      <v-img :aspect-ratio="1" src="../assets/imgs/prancheto-popup.png" width="200" class="img-mascote"></v-img>


    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
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
      console.log("Tá resetando")
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
</style>