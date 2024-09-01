<template>
  <v-sheet
    class="rounded-t-lg elevation-2 pa-2 d-flex align-center"
    color="#1E3892"
    height="48"
  >
    <v-icon icon="mdi-ballot"> </v-icon>
    <div class="text-button ml-2">
        Escolha uma turma para ser comparada
        {{ iDTurmaAtual }}
    </div>
  </v-sheet>

  <v-sheet class="rounded-b-lg">
    <v-row class="justify-space-evenly ma-0">
      <v-col v-for="(item, index) in turmasFiltradas" :key="index" cols="12" md="2">
        <v-card
          class="mx-auto d-flex align-center justify-center"
          width="150"
          height="90"
          variant="elevated"
          elevation="4"
          color="blue-lighten-2"
          @click="selecionarTurmaParaComparar(item)"
        >
          <p class="text-center">
            <v-icon icon="mdi-animation"></v-icon>
            {{ item.nome }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>

  <v-sheet
    class="rounded-t-lg elevation-2 pa-2 d-flex align-center mt-10"
    color="#1E3892"
    height="48"
  >
    <v-icon icon="mdi-ballot"> </v-icon>
    <div class="text-button ml-2">Comparativo de habilidades entre Turma</div>
  </v-sheet>
  <v-sheet>
    <ComparaHabilidades />
  </v-sheet>
</template>

<script>
import ComparaHabilidades from "@/components/ComparaHabilidades.vue";

export default {
  data: () => ({
    iDTurmaAtual: null,
  }),

  props: {
    iDsTurma: {
      type: Array,
      required: true,
      default: () => [],
    },
    listaDeAlunos: {
      type: Array,
      required: true,
      default: () => [],
    },
    isAtivo: {
      type: Boolean,
      required: true,
      default: true,
    },
    turmaAtual: {
      type: String,
      required: true,
      default: "",
    },
  },
  components: {
    ComparaHabilidades,
  },

  methods: {
    selecionarTurmaParaComparar(itemTurma) {},
  },

  computed: {
    turmasFiltradas() {
      return this.iDsTurma.filter(item => item.id !== this.turmaAtual);
    }
  },

  watch: {
    turmaAtual(newValue) {
      this.iDTurmaAtual = newValue
    },
  },
};
</script>
