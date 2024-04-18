<template>
    <div class="text-center">
      <v-dialog v-model="dialogOpen" width="auto" content-class="bottom-left-dialog" >
        
        <v-card max-width="500" class="ml-16">
          <v-card-title class="d-flex align-center" style="background-color: #1E3892; color: white;">
            <v-icon icon="mdi-alert-circle-outline"></v-icon>
               Vamos lá
          </v-card-title>
          <v-card-text class="pop-msg">
            Em caso de dúvida, que tal ouvir a questão novamente?<br>
            Depois, escolha uma alternativa e clique em continuar.<br>
          </v-card-text>
          <template v-slot:actions>
            <v-btn class="ms-auto" text="Fechar" @click="fecharDialog"></v-btn>
          </template>
        </v-card>

        <v-img :aspect-ratio="1" src="../assets/imgs/prancheto-popup.png"
            width="200" class="img-mascote"></v-img>


      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialogOpen: false,
        intervalId: null,
        position: 'bottom'
      };
    },
    mounted() {
      // Inicia o temporizador para abrir o diálogo a cada 1 minuto
      this.intervalId = setInterval(() => {
        this.dialogOpen = true;
      }, 60000); // 1 minuto em milissegundos
    },
    methods: {
      fecharDialog() {
        // Reseta o temporizador quando o diálogo é fechado
        clearInterval(this.intervalId);
        this.dialogOpen = false;
        // Reinicia o temporizador para abrir o diálogo novamente após 1 minuto
        this.intervalId = setInterval(() => {
          this.dialogOpen = true;
        }, 60000); // 1 minuto em milissegundos
      }, 

      resetTimer(){
        console.log("Tá resetando")
        clearInterval(this.intervalId);
      }
    }
  };
  </script>
  
  <style>

  .pop-msg{
    font-weight: 600 !important;
  }

  .bottom-left-dialog {
    top: 0;
    right: 0;
}

  </style>