<template>
  <!-- SHEET DE TITULO -->
  <v-sheet
    class="rounded-t-lg elevation-2 pa-2 d-flex align-center justify-space-between"
    color="#1E3892"
    height="48"
  >
    <div class="d-flex align-center">
      <v-icon icon="mdi-ballot"> </v-icon>
      <div class="text-button ml-2">Selecione uma escola</div>
    </div>

    <v-icon
      v-if="level !== 'escola'"
      @click="voltar"
      style="cursor: pointer; margin-left: 10px"
      color="white"
    >
      mdi-arrow-left
    </v-icon>
  </v-sheet>

  <!-- CONTEÙDO -->
  <ListadeEscolas
    v-if="level === 'escola'"
    :escolas="escolas"
    @changeLevel="updateLevel"
  />

  <ListadeTurmas
    v-if="level === 'turmas'"
    :turmas="turmas"
    @changeLevel="updateTurma"
  />

  <TurmaSelecionada
    v-if="level === 'turmaselecionado'"
    :dadosTurma="dadosTurma"
    :tab_turma="tab_turma"
    :search="search"
  />
</template>

<script>
import axios from "axios";
import ListadeEscolas from "./ListadeEscolas.vue";
import ListadeTurmas from "./ListadeTurmas.vue";
import TurmaSelecionada from "./TurmaSelecionada.vue";

export default {
  name: "Escolas",
  components: {
    ListadeEscolas,
    ListadeTurmas,
    TurmaSelecionada,
  },
  emits: ["levelAplicationValue"],

  data: () => ({
    level: "escola",
    turmas: [],
    dadosTurma: {},
    tab: "option-1",
    habilidadesTurmaAtual: {},
    escolas: [ ],
  }),

  props: {
    tab_turma: {
      type: String,
      required: true,
    },
    search: {
      type: String,
    },
  },

  created() {
    this.getEscolas();
  },

  methods: {
    getEscolas(){
      let url = "https://ta-back.onrender.com/admin/getEscolas"
      
      axios({
        url: url,
        method: "POST",
      })
        .then((response) => {
          console.log(response)
          this.escolas = response.data;
        })
    },

    updateTurma(newLevel, dadosTurma) {
      this.level = newLevel;
      this.dadosTurma = dadosTurma;
    },

    updateLevel(newLevel, turmas) {
      this.level = newLevel;
      if (turmas) {
        this.turmas = turmas; // Armazena as turmas recebidas
      }
    },

    voltar() {
      if (this.level === "turmas") {
        this.level = "escola";
        this.turmasData = [];
      } else if (this.level === "turmaselecionado") {
        this.level = "turmas";
      }
    },
  },

  // FIM DO METHODSSSSSSS

  computed: {},

  watch: {
    level(newVal) {
      this.$emit("levelAplicationValue", newVal);
    },
  },
};
</script>

<style>
.borda-diagonal {
  border-radius: 16px 0 16px 0 !important;
  /* Bordas diagonais arredondadas */
}

.degrade {
  background: linear-gradient(to bottom right, #97c1e4, #bbdefb) !important;
}

.clickable-item {
  transition: transform 0.2s, box-shadow 0.3s;
}

.clickable-item:hover {
  transform: scale(1.05); /* Leve aumento no tamanho do item */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra para dar sensação de elevação */
}
</style>
