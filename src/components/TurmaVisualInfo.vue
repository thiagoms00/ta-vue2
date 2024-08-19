<template>
  <v-row>
    <v-col cols="12">
      <!-- Mensagem de Seleção de Turma -->

      <v-sheet
        class="rounded-t-lg elevation-2 pa-2 d-flex align-center"
        color="#1E3892"
        height="48"
      >
        <v-icon icon="mdi-ballot"> </v-icon>
        <div class="text-button ml-2">Resultado dos alunos</div>
      </v-sheet>

      <v-sheet v-if="!mostrarDiv">
        <v-table>
          <thead>
            <tr>
              <th class="pa-0" style="width: 20%">
                <div class="text-center text-overline">Nome</div>
              </th>

              <th class="pa-0" style="width: 80%">
                <v-row style="height: 100%">
                  <v-col
                    v-for="i in 3"
                    :key="i"
                    cols="4"
                    class="d-flex pa-0 d-flex align-center"
                    style="height: 100%"
                  >
                    <v-divider vertical></v-divider>

                    <div class="text-center text-overline ml-2">
                      Estrato {{ i }}
                    </div>
                  </v-col>
                </v-row>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in listaTurma" :key="item.name">
              <td class="pa-0" style="width: 20%">
                <div class="text-center">
                  {{ item.user["nome"] }}
                </div>
              </td>

              <td style="width: 80%" class="pa-0">
                <v-row style="height: 100%">
                  <v-col
                    v-for="i in 3"
                    :key="i"
                    cols="4"
                    class="d-flex pa-0 d-flex align-center"
                  >
                    <v-divider vertical></v-divider>
                    <div class="d-flex flex-column w-100">
                      <!-- Primeira linha de 6 chips -->
                      <v-row class="ma-0 d-flex justify-start">
                        <v-chip
                          v-for="(itemListQuest, index) in getChipsForEstrato(
                            i,
                            item.listaDeTestes?.[item.listaDeTestes.length - 1]
                              ?.listaQuest
                          ).slice(0, 6)"
                          :key="index"
                          :color="getColor(itemListQuest.acertou)"
                          size="x-small"
                          label
                          class="ml-1"
                        >
                          <span>{{
                            extractDigitsFromId(itemListQuest.id)
                          }}</span>
                        </v-chip>
                      </v-row>

                      <div class="mt-1"></div>

                      <!-- Segunda linha de 6 chips -->
                      <v-row class="ma-0 d-flex justify-start">
                        <v-chip
                          v-for="(itemListQuest, index) in getChipsForEstrato(
                            i,
                            item.listaDeTestes?.[item.listaDeTestes.length - 1]
                              ?.listaQuest
                          ).slice(6, 12)"
                          :key="index"
                          class="ml-1"
                          :color="getColor(itemListQuest.acertou)"
                          size="x-small"
                          label
                        >
                          <span>{{
                            extractDigitsFromId(itemListQuest.id)
                          }}</span>
                        </v-chip>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>

      <!-- DIV de seleção de turma -->
      <div>
        <v-sheet
          v-if="mostrarDiv"
          class="d-flex justify-center align-center rounded-b-lg"
          height="250"
          color="grey-lighten-5"
          border="md"
        >
          <p
            class="text-overline"
            style="
              color: #cfd8dc;
              font-size: 3rem !important;
              text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
            "
          >
            Selecione uma turma
          </p>
        </v-sheet>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      mostrarDiv: true,
      listaAlunos: [
        {
          nome: "Aluno 1",
          respostas: [true, false, true, true, false],
        },
        {
          nome: "Aluno 2",
          respostas: [false, true, false, true, true],
        },
        // Adicione mais alunos conforme necessário
      ],
      listaTurma: [],
    };
  },

  props: {
    listaDeAlunos: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  watch: {
    // Observa mudanças em `listaDeAlunos`
    listaDeAlunos(newVal) {
      this.listaTurma = newVal;
    },
  },

  mounted() {
    this.listaTurma = this.listaDeAlunos;
  },

  methods: {
    mudarTela() {
      this.mostrarDiv = false;
      console.log("2");
    },

    getColor(acertou) {
      return acertou ? "blue" : "red lighten-4";
    },

    getChipsForEstrato(estratoIndex, listaQuest) {
      if (!Array.isArray(listaQuest)) return [];
      return listaQuest.filter((item) => item.estrato == estratoIndex);
    },

    extractDigitsFromId(itemId) {
      const match = itemId.match(/_(H\d{2})_/);
      return match ? match[1] : "";
    },
  },
};
</script>
