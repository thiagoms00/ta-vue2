<template>
  <v-container class="content-container pa-0 ma-0 fluid">
    <v-row class="title-row pa-0 ma-0">
      <h1 class="section-title">Dados Gerais</h1>
    </v-row>
    <v-sheet class="">
      <v-expansion-panels :readonly="true">
        <v-expansion-panel class="" bg-color="" style="border-radius: 0px">
          <v-expansion-panel-title style="height: 4vh" disable-icon>
            <template v-slot:actions>
              <!-- Só pra retirar o ícone. -->
            </template>

            <v-row class="dflex align-center">
              <v-col cols="2" class="d-flex justify-center">
                <v-btn block :ripple="false" variant="text">Nome</v-btn>
              </v-col>
              <v-col cols="2" class="d-flex justify-center ">
                <v-btn class="pl-7" block :ripple="false" variant="text"
                  >Percurso Final</v-btn
                >
              </v-col>
              <v-col cols="2" class="d-flex justify-center">
                <v-btn class="pl-7" :ripple="false" variant="text">Nº de questões</v-btn>
              </v-col>
              <v-col cols="2" class="d-flex justify-center">
                <v-btn block class="pr-5" :ripple="false" variant="text">Porcentagem</v-btn>
              </v-col>
              <v-col cols="2" class="d-flex justify-center">
                <v-btn block class="pr-10" :ripple="false" variant="text">Tempo</v-btn>
              </v-col>
              <v-col cols="2" class="d-flex justify-center">
                <v-btn block class="pr-12" :ripple="false" variant="text">Status</v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-title>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>

    <v-sheet>
      <v-expansion-panels variant="accordion" class="elevation-">
        <v-expansion-panel
          v-for="(item, indexAluno) in listaTurma"
          :key="item.nome"
          :readonly="item.nTestes === 0"
          ref="panels"
          class=""
          style="border-radius: 0px"
        >
          <v-expansion-panel-title style="height: 5vh" class="color-painel">
            <v-row class="d-flex align-center">
              <v-col cols="2" class="d-flex">
                <p
                  class="p-nome"
                  style="
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                  "
                >
                  {{ item.user["nome"] }}
                </p>
              </v-col>

              <v-col cols="2" class="d-flex justify-center">
                <p
                  style="
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                  "
                  class="percurso-text py-2"
                >
                  {{
                    item.listaDeTestes.length > 0 &&
                    item.listaDeTestes[item.listaDeTestes.length - 1].status ===
                      "Finalizado"
                      ? this.alteraResultado(
                          item.listaDeTestes[item.listaDeTestes.length - 1]
                            .resultado_final
                        )
                      : "-"
                  }}
                </p>
              </v-col>

              <v-col cols="2" class="d-flex justify-center">
                {{
                  item.listaDeTestes.length > 0 &&
                  item.listaDeTestes[item.listaDeTestes.length - 1].status ===
                    "Finalizado"
                    ? item.listaDeTestes[item.listaDeTestes.length - 1]
                        .numero_questoes_feitas
                    : "-"
                }}
              </v-col>

              <v-col cols="2" class="d-flex justify-center">
                {{
                  item.listaDeTestes.length > 0 &&
                  item.listaDeTestes[item.listaDeTestes.length - 1].status ===
                    "Finalizado"
                    ? (
                        item.listaDeTestes[item.listaDeTestes.length - 1]
                          .porcentagem_questoes || 0
                      ).toFixed(2) + "%"
                    : "-"
                }}
              </v-col>

              <v-col cols="2" class="d-flex justify-center">
                {{
                  item.listaDeTestes.length > 0 &&
                  item.listaDeTestes[item.listaDeTestes.length - 1].status ===
                    "Finalizado"
                    ? formatTime(
                        item.listaDeTestes[item.listaDeTestes.length - 1]
                          .tempoDoTeste
                      )
                    : "-"
                }}
              </v-col>

              <v-col cols="2" class="d-flex justify-center">
                <v-chip
                  size="small"
                  :color="
                    getColor(
                      item.listaDeTestes?.[item.listaDeTestes.length - 1]
                        ?.status ?? ''
                    )
                  "
                >
                  <v-icon
                    :icon="
                      getIcon(
                        item.listaDeTestes?.[item.listaDeTestes.length - 1]
                          ?.status ?? 'Não Iniciado'
                      )
                    "
                    start
                  >
                  </v-icon>
                  {{
                    item.listaDeTestes?.[item.listaDeTestes.length - 1]
                      ?.status ?? "Não Iniciado"
                  }}
                </v-chip>
              </v-col>
            </v-row>
          </v-expansion-panel-title>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      turmaLoader: false,
      listaTurma: [],
    };
  },

  created() {},

  watch: {
    turmaAtiva(newValue) {
      if (newValue) {
        console.log("turmaAtiva is now available:", newValue);
        this.turmaLoader = true;
        this.listaTurma = this.turmaAtiva.turma;
        console.log(this.listaTurma);
      }
    },
  },

  computed: {
    ...mapState("turma", ["turmaAtiva"]),
  },

  methods: {
    getChipColor(porcentagem, tentativas) {
      if (porcentagem === 100) {
        return "green darken-3"; // Verde escuro para 100%
      } else if (tentativas === 0) {
        return "blue lighten-3";
      } else if (porcentagem >= 75 && porcentagem < 100) {
        return "green lighten-3"; // Verde claro para 75% - 99%
      } else if (porcentagem >= 50 && porcentagem < 75) {
        return "orange lighten-3"; // Cor neutra para 50% - 74%
      } else if (porcentagem >= 25 && porcentagem < 50) {
        return "orange darken-3"; // Laranja claro para 25% - 49%
      } else {
        return "red lighten-1"; // Vermelho escuro para 0% - 24%
      }
    },

    toggleIcon(index, value) {
      // Reset all icons
      this.icon = this.icon.map((icon, i) =>
        i === index
          ? this.lastClicked === index
            ? "mdi-menu-down"
            : "mdi-menu-up"
          : ""
      );

      // Update last clicked index
      this.lastClicked = this.lastClicked === index ? -1 : index;
      this.toggle = value;
      this.listaTurma = this.listaTurmaOrdenada(this.sortOrder);
      this.sortOrder = !this.sortOrder;
    },

    getIcon(chipValue) {
      if (chipValue === "Não Iniciado") {
        return "mdi-cancel"; // Default
      } else if (chipValue === "Iniciado") {
        return "mdi-minus-circle"; // Verde
      } else if (chipValue === "Finalizado") {
        return "mdi-checkbox-marked-circle"; // Vermelho (ou qualquer outra cor padrão)
      }
    },

    getColor(chipValue) {
      // Lógica para determinar a cor com base no valor de chipValue
      if (chipValue === "Não Iniciado") {
        return ""; // Default
      } else if (chipValue === "Iniciado") {
        return "orange"; // Verde
      } else if (chipValue === "Finalizado") {
        return "green"; // Vermelho (ou qualquer outra cor padrão)
      }
    },

    formatTime(seconds) {
      const roundedSeconds = Math.round(seconds);
      const minutes = Math.floor(roundedSeconds / 60);
      const remainingSeconds = roundedSeconds % 60;
      return minutes > 0
        ? `${minutes}m ${remainingSeconds}s`
        : `${remainingSeconds}s`;
    },

    getTableValue(teste, key, isPercentage = false, isTime = false) {
      if (teste.status !== "Finalizado") {
        return "-";
      }
      let value = teste[key];
      if (isPercentage) {
        return (value || 0).toFixed(2).replace(".", ",");
      }
      if (isTime) {
        return this.formatTime(value);
      }
      return value !== undefined ? value : "-";
    },

    geraXlsx(planilha, nome) {
      let data = [
        [
          "TESTE",
          "Estrato",
          "Habilidade",
          "Item",
          "Gabarito",
          "Resposta",
          "Acerto",
          "Tempo Gasto(s)",
          /* "Tipo",
          "Resultado", */
        ],
      ];
      planilha.forEach((item) => {
        data.push([
          item.questaoNum,
          item.estrato,
          item.habilidade,
          item.id_item,
          item.gabarito.toLowerCase(),
          item.resposta,
          item.acerto,
          item.tempo_gasto,
          /*   item.tipo,
          item.resultado, */
        ]);
      });
      // Criar uma nova planilha
      let ws = XLSX.utils.aoa_to_sheet(data);

      // Criar um novo workbook
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Planilha");

      // Gerar arquivo Excel e fazer o download
      for (let col = 0; col < data[0].length; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        if (ws[cellAddress]) {
          ws[cellAddress].s = {
            font: {
              bold: true,
              sz: 14,
              color: { rgb: "000000" }, // cor preta
            },
            alignment: {
              vertical: "center",
              horizontal: "center",
            },
          };
        }
      }
      XLSX.writeFile(wb, `${nome}_planilha.xlsx`);
    },

    excluirTeste(item, teste, indexAluno, indexTeste) {
      const data = {
        token: item.token,
        id: item._id,
        idTeste: teste._id,
        indexAluno: indexAluno,
        indexTeste: indexTeste,
      };

      this.$emit("eventDeleteTest", data);
    },

    listaTurmaOrdenada(order) {
      if (this.toggle === "nome") {
        this.listaTurma = this.listaTurma
          .slice()
          .sort((a, b) => a.user["nome"].localeCompare(b.user["nome"]));
      } else if (this.toggle === "extrato") {
        const alunosComExtrato = this.listaTurma.filter((aluno) => {
          return (
            aluno.listaDeTestes.length > 0 &&
            typeof aluno.listaDeTestes[aluno.listaDeTestes.length - 1]
              .extratoFinal === "number"
          );
        });

        alunosComExtrato.sort((a, b) => {
          const extratoA =
            a.listaDeTestes[a.listaDeTestes.length - 1].extratoFinal;
          const extratoB =
            b.listaDeTestes[b.listaDeTestes.length - 1].extratoFinal;
          return extratoA - extratoB;
        });

        const alunosSemExtrato = this.listaTurma.filter((aluno) => {
          return (
            aluno.listaDeTestes.length === 0 ||
            typeof aluno.listaDeTestes[aluno.listaDeTestes.length - 1]
              .extratoFinal !== "number"
          );
        });

        const listaOrdenada = [...alunosSemExtrato, ...alunosComExtrato];

        this.listaTurma = listaOrdenada;
      } else if (this.toggle === "nQuestoes") {
        const alunosQuestoes = this.listaTurma.filter((aluno) => {
          return (
            aluno.listaDeTestes.length > 0 &&
            typeof aluno.listaDeTestes[aluno.listaDeTestes.length - 1]
              .numero_questoes_feitas === "number"
          );
        });

        alunosQuestoes.sort((a, b) => {
          const extratoA =
            a.listaDeTestes[a.listaDeTestes.length - 1].numero_questoes_feitas;
          const extratoB =
            b.listaDeTestes[b.listaDeTestes.length - 1].numero_questoes_feitas;
          return extratoA - extratoB;
        });

        const alunosSemQuestoes = this.listaTurma.filter((aluno) => {
          return (
            aluno.listaDeTestes.length === 0 ||
            typeof aluno.listaDeTestes[aluno.listaDeTestes.length - 1]
              .numero_questoes_feitas !== "number"
          );
        });

        const listaOrdenada = [...alunosSemQuestoes, ...alunosQuestoes];

        this.listaTurma = listaOrdenada;
      } else if (this.toggle === "percentTeste") {
        const alunosPorcentagem = this.listaTurma.filter((aluno) => {
          const temPorcentagem =
            aluno.listaDeTestes.length > 0 &&
            typeof aluno.listaDeTestes[aluno.listaDeTestes.length - 1]
              .porcentagem_questoes === "number";
          return temPorcentagem;
        });

        alunosPorcentagem.sort((a, b) => {
          const extratoA =
            a.listaDeTestes[a.listaDeTestes.length - 1].porcentagem_questoes;
          const extratoB =
            b.listaDeTestes[b.listaDeTestes.length - 1].porcentagem_questoes;
          return extratoA - extratoB;
        });

        const alunosSemPorcentagem = this.listaTurma.filter((aluno) => {
          const semPorcentagem =
            aluno.listaDeTestes.length === 0 ||
            typeof aluno.listaDeTestes[aluno.listaDeTestes.length - 1]
              .porcentagem_questoes !== "number";
          return semPorcentagem;
        });

        const listaOrdenada = [...alunosSemPorcentagem, ...alunosPorcentagem];
        this.listaTurma = listaOrdenada;
      } else if (this.toggle === "tempo") {
        const alunosTempo = this.listaTurma.filter((aluno) => {
          const temPorcentagem =
            aluno.listaDeTestes.length > 0 &&
            typeof aluno.listaDeTestes[aluno.listaDeTestes.length - 1]
              .tempoDoTeste === "number";
          return temPorcentagem;
        });

        alunosTempo.sort((a, b) => {
          const extratoA =
            a.listaDeTestes[a.listaDeTestes.length - 1].tempoDoTeste;
          const extratoB =
            b.listaDeTestes[b.listaDeTestes.length - 1].tempoDoTeste;
          return extratoA - extratoB;
        });

        const alunosSemTempo = this.listaTurma.filter((aluno) => {
          const semPorcentagem =
            aluno.listaDeTestes.length === 0 ||
            typeof aluno.listaDeTestes[aluno.listaDeTestes.length - 1]
              .tempoDoTeste !== "number";
          return semPorcentagem;
        });

        const listaOrdenada = [...alunosSemTempo, ...alunosTempo];
        this.listaTurma = listaOrdenada;
      } else if (this.toggle === "status") {
        const getStatus = (aluno) => {
          if (aluno.listaDeTestes.length > 0) {
            return (
              aluno.listaDeTestes[aluno.listaDeTestes.length - 1].status ||
              "Não Iniciado"
            );
          }
          return "Sem Status"; // Retorna 'Sem Status' se o aluno não tiver testes
        };

        // Função de comparação personalizada para ordenar os status
        const statusOrder = {
          Finalizado: 0,
          Iniciado: 1,
          "Não Iniciado": 2,
          "Sem Status": 3,
        };

        // Recriar a lista de alunos ordenada com base no status
        const listaOrdenada = this.listaTurma.slice().sort((a, b) => {
          const statusA = getStatus(a);
          const statusB = getStatus(b);
          return statusOrder[statusA] - statusOrder[statusB];
        });

        // Atribuir a lista ordenada de volta a this.listaTurma
        this.listaTurma = listaOrdenada;
      }

      if (order) {
        return this.listaTurma;
      } else {
        return this.listaTurma.reverse();
      }
    },

    alteraResultado(str) {
      if (str.endsWith(" - Reprovado")) {
        return str.replace(" - Reprovado", ": Inicial");
      } else if (str.endsWith(" - Indefinido")) {
        return str.replace(" - Indefinido", ": Em desenvolvimento");
      } else if (str.endsWith(" - Aprovado")) {
        return str.replace(" - Aprovado", ": Consolidado");
      } else {
        console.log(str);
        return str; // Return the original string if no match is found
      }
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Poppins-Regular";
  src: url(../assets/fonts/Poppins/Poppins-Regular.ttf);
}

@font-face {
  font-family: "Urbanist-Variable";
  src: url(../assets/fonts/Urbanist/Urbanist-VariableFont_wght.ttf);
}

@font-face {
  font-family: "Raleway-Variable";
  src: url(../assets/fonts/Raleway/Raleway-VariableFont_wght.ttf);
}

.content-container {
  width: 100%;
}

.title-row {
  padding-left: 3vw !important;
  height: 7vh;
  align-items: center;
}

.section-title {
  font-family: "Poppins-Regular";
  font-size: 2rem;
}

.color-painel{
    padding-left: 2vw;
}
</style>
