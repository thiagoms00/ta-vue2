<template>

  <v-container class="main-div fill-height py-0" fluid>
    <v-row class="fill-height d-flex justify-center align-center">
      <!-- Primeira coluna -->
      <v-col cols="2" sm="2" md="2"> </v-col>

      <!-- Coluna de conteudo -->
      <v-col cols="8" sm="8" md="8">
        <v-sheet class="rounded-lg elevation-2 pa-2 d-flex flex-column justify-center">

          <div class="d-flex justify-center py-4">
            <img
              src="../assets/imgs/prancheto_abertura.png"
              alt="Mascote"
              width="180"
              style="aspect-ratio: 1; object-fit: contain;"
            />
          </div>
          
          <div class="text-md-h6 text-sm-body-1 text-xs-body-2 d-flex justify-center my-2 font-weight-bold"> 
            Você finalizou as questões! Parabêns e até a próxima! 
          </div>
          
          <v-divider class="my-4 mx-auto" width="70%"></v-divider> 

          <Megaphone class="icon-mega3" @click="playAudio()" />

          <div class="text-h6 d-flex justify-center my-2 x-4"> 
            Clique no botão abaixo para finalizar o teste!
          </div>

          <div class="d-flex justify-center">
            <v-btn
              class="my-4"
              size="large"
              width="40%"
              color="#1E3892"
              @click="proximaPagina()"
            >
              Finalizar
            </v-btn>
          </div>

        </v-sheet>
      </v-col>

      <v-col cols="2" sm="2" md="2" class="fill-height d-flex justify-end align-end">
  <img
    src="../assets/imgs/Logo-Impacto-removebg.png"
    alt="Mascote"
    style="aspect-ratio: 2/1; object-fit: contain; max-width: 180px;"
  />
</v-col>

    </v-row>
  </v-container>

</template>

<script>
//import { verificaLogin } from "@/utils/helpers";
import Megaphone from "@/components/Megaphone.vue";

export default {
  name: "Congratulations",

  components: {

    Megaphone,
  },

  data() {
    return {
      highlighted: false,
      megafoneDisable: false,
      audioAux: "",
    };
  },

  created() {
    //verificaLogin(this.$router, this.$route);
  },

  mounted() {
   /*  this.playAudio = this.playAudio.bind(this);
    this.playAudio(); */
  },

  methods: {
    proximaPagina() {
      localStorage.removeItem("anoAtual");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("idTeste");
      localStorage.removeItem("idTurma");
      localStorage.removeItem("estratoInicial");

      this.$router.push("/login");
    },

    highlightComponent() {
      this.highlighted = true;
      setTimeout(() => {
        this.highlighted = false;
      }, 2000); // Tempo em milissegundos antes de voltar ao normal
    },

    playAudio() {
      if (this.megafoneDisable == false) {
        this.audioAux = new Audio(audio);
        this.audioAux.play();
        this.megafoneDisable = true;
        setTimeout(this.resetMegafone, 8000);
      }
    },

    resetMegafone() {
      //Utilizar esta função sempre que trocar de item.
      this.megafoneDisable = false;
    },
  },
};
</script>

<style scoped>
.main-div {
  background: url("../assets/imgs/homeBackground.jpg");
  background-size: cover;
}

.absoluteClass {
  position: absolute;
}

* {
  font-family: Manrope;
}

.icon-msg {
  display: flex;
  flex-direction: row;
}

.msg {
  margin-left: 0.2vw;
  font-size: 2.1rem;
}

.finish-msg {
  font-size: 1.8rem;
}

.finish-btn {
  margin-top: 10px;
}

@media (max-width: 1550px) {
  .msg {
    font-size: 1.4rem;
    margin-left: 0;
  }

  .icon-msg {
    max-height: 10vh;
    width: 40vw;
  }

  .finish-msg {
    font-size: 1.5rem;
  }

  .icon-mega3 {
    margin-top: 0;
  }

  .img-mascote {
    width: 100px !important;
  }

  .finish-btn {
    height: 6.5vh !important;
    font-size: 13px !important;
  }
}
</style>
