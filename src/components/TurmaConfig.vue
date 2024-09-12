<template>
  <v-row>
    <v-col cols="12">
   

      <!-- SHEET de titulo -->
      <v-sheet
        class="rounded-t-lg elevation-2 pa-2 d-flex align-center justify-space-between"
        color="#1E3892"
        height="48"
      >
        <div class="d-flex align-center">
          <v-icon icon="mdi-cog"> </v-icon>
          <div class="text-button ml-2">Configuraçoes da Turma</div>
        </div>
        <div class="text-button mr-2">{{ this.nomeTurma }}</div>
      </v-sheet>

      <!-- Sheet de conteúdo -->
      <v-sheet class="rounded-b-lg custom-font">
        <v-row class="ma-0">
          <v-col class="ma-0" cols="8">
            <div>
              <p class="text-h5">Permitir Teste</p>
              <p class="text-subtitle-2">
                Possibilita a turma dê início ao teste adaptativo selecionado.
              </p>
            </div>
          </v-col>

          <v-col class="ma-0" cols="4">
            <!-- Switchs de disciplinas -->
            <div class="noInputDatails">
              <v-switch
                class="custom-switch-discipline"
                v-model="disciplinaSelected"
                :value="'Lingua Portuguesa'"
                label="Lingua Portuguesa"
                @change="onSwitchChange"
                color="primary"
              ></v-switch>

              <v-switch
                class="custom-switch-discipline"
                v-model="disciplinaSelected"
                :value="'Matemática'"
                label="Matemática"
                @change="onSwitchChange"
                color="primary"
              ></v-switch>

              <v-switch
                class="custom-switch-discipline"
                v-model="disciplinaSelected"
                :value="'Ciencias'"
                label="Ciências"
                @change="onSwitchChange"
                color="primary"
              ></v-switch>

              <v-switch
                class="custom-switch-discipline"
                v-model="disciplinaSelected"
                :value="'História'"
                label="História"
                @change="onSwitchChange"
                color="primary"
              ></v-switch>

              <v-switch
                class="custom-switch-discipline"
                v-model="disciplinaSelected"
                :value="'Geografia'"
                label="Geografia"
                @change="onSwitchChange"
                color="primary"
              ></v-switch>
            </div>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col class="ma-0" cols="12">
            <v-divider
              class="border-opacity-50"
              color="blue-darken-4"
              thickness="2"
            ></v-divider>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col class="ma-0" cols="8">
            <p class="text-h5">Estrato Inicial</p>
            <p class="text-subtitle-2">
              Escolha o primeiro estrato à ser avaliado no teste adaptativo.
            </p>
          </v-col>

          <v-col class="ma-0 d-flex align-center justify-start" cols="4">
            <v-btn
              class="mr-3 elevation-5"
              icon="mdi-numeric-1"
              :color="corBtn[0]"
              @click="mudaCorEstrato(1)"
            ></v-btn>

            <v-btn
              class="mr-3 elevation-5"
              icon="mdi-numeric-2"
              :color="corBtn[1]"
              @click="mudaCorEstrato(2)"
            ></v-btn>

            <v-btn
              class="mr-3 elevation-5"
              icon="mdi-numeric-3"
              :color="corBtn[2]"
              @click="mudaCorEstrato(3)"
            ></v-btn>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col class="ma-0" cols="12">
            <v-divider
              class="border-opacity-50"
              color="blue-darken-4"
              thickness="2"
            ></v-divider>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col class="ma-0 d-flex align-center justify-center" cols="12">
            <v-btn
              color="#1E3892"
              prepend-icon="mdi-check-bold"
              text="SALVAR"
              @click="openDialogMudancaTurma()"
            ></v-btn>

            <v-dialog v-model="dialogConfigSave" max-width="450">

              <v-card
                prepend-icon="mdi-update"
                text="Você realmente deseja confirmar as configurações de turma ?"
                title="Confirmar alterações"
              >
                <template v-slot:actions>
                  <v-spacer></v-spacer>

                  <v-btn variant="tonal" color="red" @click="dialogConfigSave = false"> Não </v-btn>

                  <v-btn variant="tonal" color="blue" @click="mudancaDadosTurma()"> Sim </v-btn>
                </template>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import ChartNivel from "@/components/ChartNivel.vue";
import axios from "axios";

export default {
  components: {
    ChartNivel,
  },

  data() {
    return {
      corBtn: ["info", "white", "white"],
      novoEstrato: 1,
      configVer: false,

      disciplinaSelected: null,
      dialogConfigSave: false,
    };
  },

  props: {
    listaDeAlunos: {
      type: Array,
      required: true,
      default: () => [],
    },
    estratoInicial: {
      type: Number,
      required: true,
      default: 1,
    },
    turmaSelecionada: {
      type: String,
      required: true,
      default: "",
    },
    nomeTurma: {
      type: String,
      required: true,
      default: "",
    },
  },

  created() {
    this.mudaCorEstrato(this.estratoInicial);
  },

  methods: {

    openDialogMudancaTurma() {
      this.dialogConfigSave = true;
    },

    onSwitchChange(value) {
      // Aqui você pode adicionar lógica extra, se necessário
      console.log("Disciplina selecionada:", this.disciplinaSelected);
    },

    mudaCorEstrato(val) {
      if (val === 1) {
        this.corBtn[0] = "info";
        this.corBtn[1] = "white";
        this.corBtn[2] = "white";
        this.novoEstrato = 1;
      } else if (val === 2) {
        this.corBtn[0] = "white";
        this.corBtn[1] = "info";
        this.corBtn[2] = "white";
        this.novoEstrato = 2;
      } else if (val === 3) {
        this.corBtn[0] = "white";
        this.corBtn[1] = "white";
        this.corBtn[2] = "info";
        this.novoEstrato = 2;
      } else {
        this.corBtn[0] = "info";
        this.corBtn[1] = "white";
        this.corBtn[2] = "white";
      }
    },

    mudancaDadosTurma() {
      const data = {
        id_turma: this.turmaSelecionada,
        novo_estrato: this.novoEstrato,
        disciplina : this.disciplinaSelected
      };

      axios({
        url: "https://ta-back.onrender.com/professores/alteraEstratoTurma",
        data,
        method: "POST",
      })
        .then((response) => {
          if (response.data.turma_alterada) {
            this.mostraAltPopup();
          }
        })
        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });
    },

    mostraAltPopup() {
      console.log("Estrato alterado");
    },
  },
};
</script>

<style>
.custom-switch-discipline {
  height: 40px; /* ajuste o tamanho conforme necessário */
}
.noInputDatails .v-input__details {
  margin: 0;
  padding: 0;
  min-height: 0 !important;
}
.custom-font {
  font-family: "Manrope", sans-serif;
}

/* Sobrescreve a fonte da classe text-h5 para Manrope */
.custom-font .text-h5 {
  font-family: "Manrope", sans-serif;
}

.main-sheet {
  border: 0.1rem solid rgba(58, 58, 58, 0.18);
  padding: 3vh 3vw;
  border-radius: 5px;
  height: 50vh;
}

.config-title {
  font-size: 2.1rem;
  color: black;
}

.option-texts {
  width: 90% !important;
}

.change-est {
  border: 0.1rem solid rgba(102, 102, 103, 0.691);
  padding: 1vh 1vw;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  height: 10vh !important;
}

.change-text {
  color: black;
  font-size: 1.4rem;
}


.change-est-p {
  color: rgb(0, 0, 0);
  font-size: 1rem;
}

.change-button {
  background-color: rgb(199, 199, 255);
}

.switch-start .v-input__control {
  margin-top: 1vh;
}

.salvar-btn {
  width: 12vw !important;
}

.alt-text {
  font-size: 1.4rem !important;
  margin-top: 0vh !important;
  font-weight: 600;
}

.close-btn {
  font-size: 1rem !important;
  font-weight: 600;
}

@media (max-width: 1600px) {
  .config-title {
    font-size: 1.5rem;
  }

  .option-texts {
    width: 90% !important;
  }

  .change-est {
    border: 0.05rem solid rgba(102, 102, 103, 0.691);
    padding: 1vh 1vw;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    height: 10vh !important;
  }

  .change-text {
    color: black;
    font-size: 1.1rem;
  }

  .change-est-p {
    color: rgb(0, 0, 0);
    font-size: 0.85rem;
  }

  .change-button {
    width: 2.5vw !important;
    height: 2.5vw !important;
  }

  .switch-start .v-input__control {
    margin-top: 0vh;
  }

  .save-div {
    margin-top: 1vh !important;
  }

  .salvar-btn {
    width: 13vw !important;
    height: 6vh !important;
    font-size: 0.9rem !important;
  }
}

@media (max-width: 1300px) {
  .config-title {
    font-size: 1.3rem;
  }

  .option-texts {
    width: 90% !important;
  }

  .change-text {
    color: black;
    font-size: 1rem;
  }

  .change-est-p {
    color: rgb(0, 0, 0);
    font-size: 0.75rem;
  }
  .buttons {
    padding-bottom: 0.5vh !important;
  }

  .change-button {
    width: 2.7vw !important;
    height: 2.7vw !important;
  }

  .switch-start .v-input__control {
    margin-top: 0vh;
  }

  .save-div {
    margin-top: 1vh !important;
  }

  .salvar-btn {
    width: 13vw !important;
    height: 6vh !important;
    font-size: 0.9rem !important;
  }
}
</style>
