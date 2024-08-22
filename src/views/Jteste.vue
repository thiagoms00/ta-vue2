<template>
  <v-app id="inspire">
    <NavBar />

    <v-main class="bg-blue-grey-lighten-5">
      <v-container>
        <v-row>
          <v-col cols="2">
            <div>
              <v-expansion-panels>
                <v-expansion-panel bg-color="#1E3892" class="rounded-lg">
                  <v-expansion-panel-title
                    class="rounded-lg"
                    v-ripple
                    style="height: 4vh"
                  >
                    <div
                      class="d-flex justify-space-around align-center h-100 w-100"
                    >
                      <v-icon icon="mdi-school-outline"> </v-icon>
                      <div class="text-button">TURMAS</div>
                    </div>
                  </v-expansion-panel-title>

                  <v-divider></v-divider>

                  <v-expansion-panel-text class="rounded-lg">
                    <v-list class="pa-0">
                      <v-list-item
                        v-for="(item, index) in listaNomeTurma"
                        :key="index"
                        density="compact"
                        class="d-flex justify-center text-subtitle-2"
                        @click="selecionaTurma(item.id, index)"
                      >
                        <v-list-item-title v-if="!loadingStatesTurmas[index]">{{
                          item.nome
                        }}</v-list-item-title>
                        <v-progress-circular
                          v-if="loadingStatesTurmas[index]"
                          indeterminate
                          size="24"
                        />
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>

            <v-sheet
              class="custom-switch mt-4 elevation-2 d-flex justify-center align-center"
              rounded="lg"
            >
              <v-tabs
                v-model="tab"
                color="primary"
                direction="vertical"
                style="width: 100%"
              >
                <v-tab
                  prepend-icon="mdi-account"
                  text="Option 1"
                  value="option-1"
                  class="pa-1 d-flex justify-center"
                ></v-tab>
                <v-tab
                  prepend-icon="mdi-lock"
                  text="Mapa"
                  value="option-2"
                  class="pa-1 d-flex justify-center"
                ></v-tab>
                <v-tab
                  prepend-icon="mdi-menu"
                  text="Níveis"
                  value="option-3"
                  class="pa-1 d-flex justify-center"
                ></v-tab>
              </v-tabs>
            </v-sheet>

            <!-- Campo de busca de aluno -->
            <div class="mt-4">
              <v-text-field
                append-inner-icon="mdi-magnify"
                density="compact"
                label="Buscar aluno"
                variant="solo"
                v-model="search"
                class="custom-border"
              >
              </v-text-field>
            </div>
          </v-col>

          <v-col>
            <v-window v-model="tab">
              <!-- Janela de Dados 1 -->
              <v-window-item value="option-1">
                <TurmaDataInfo
                  :listaDeAlunos="listaFiltrada"
                  :isAtivo = "infoAtiva"
                  ref="turmaDataInfo"
                  @eventDeleteTest="excluirTeste"
                />
              </v-window-item>

              <!-- Janela de Dados 2 -->
              <v-window-item value="option-2">
                <TurmaVisualInfo
                  :listaDeAlunos="listaFiltrada"
                  :isAtivo = "infoAtiva"
                  ref="turmaVisualInfo"
                />
              </v-window-item>

              <!-- Janela de Dados 3 -->
              <v-window-item value="option-3"> 
                <TurmaNiveisInfo
                  :listaDeAlunos="listaFiltrada"
                  :isAtivo = "infoAtiva"
                  ref="turmaVisualInfo"
                />
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
// import Chart from '@/components/Chart.vue'
import ChartBar from "@/components/ChartBar.vue";
import DialogExcluirTeste from "@/components/DialogExcluirTeste.vue";
import TurmaDataInfo from "@/components/TurmaDataInfo.vue";
import NavBar from "@/components/NavBar.vue";
import * as XLSX from "xlsx";
import TurmaVisualInfo from "@/components/TurmaVisualInfo.vue";
import TurmaNiveisInfo from "@/components/TurmaNiveisInfo.vue";

export default {
  name: "Turma",
  components: {
    // Chart,
    ChartBar,
    NavBar,
    DialogExcluirTeste,
    TurmaDataInfo,
    TurmaVisualInfo,
    TurmaNiveisInfo
},

  data: () => ({
    listaTurma: [],
    ultimosTestes: [],
    testesVazios: [],
    carregandoTurmas: true,
    chipValue: "",
    toggle: undefined,
    toggleTurma: undefined,
    animacaoListaAtiva: false,
    textFilter: undefined,
    icon: ["", "", "", "", "", ""],
    lastClicked: -1,
    sortOrder: true,
    listaNomeTurma: [],
    loadingStatesTurmas: [],
    animateCarregandoTurmas: false,
    tab: "dados",
    chartData: [300, 50, 100, 200, 150, 250],
    textoPlanilha: false, //Flag pro hover do botão da planilha.
    search: "",
    tab: "option-1",
    infoAtiva : false,
    anoTurma : 1,
  }),

  created() {
    this.$store.dispatch("verificarTokenProfs", { router: this.$router });
    this.listaNomeTurma = this.returnTurmas();
  },
  methods: {
    excluirTeste(data) {
      const indexAluno = data.indexAluno;
      const indexTeste = data.indexTeste;

      this.listaTurma[indexAluno].listaDeTestes.splice(indexTeste, 1);

      axios({
        url: "https://ta-back.onrender.com/professores/excluirTesteAluno",
        data,
        method: "POST",
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });
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

    formatTime(seconds) {
      const roundedSeconds = Math.round(seconds);
      const minutes = Math.floor(roundedSeconds / 60);
      const remainingSeconds = roundedSeconds % 60;
      return minutes > 0
        ? `${minutes}m ${remainingSeconds}s`
        : `${remainingSeconds}s`;
    },

    returnTurmas() {
      const data = {
        tokenProf: localStorage.getItem("tokenProf"),
      };

      axios({
        url: "https://ta-back.onrender.com/professores/returnTurmas",
        data,
        method: "POST",
      })
        .then((response) => {
          this.listaNomeTurma = response.data.listaTurmas;
        })
        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });
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

    getIcon(chipValue) {
      if (chipValue === "Não Iniciado") {
        return "mdi-cancel"; // Default
      } else if (chipValue === "Iniciado") {
        return "mdi-minus-circle"; // Verde
      } else if (chipValue === "Finalizado") {
        return "mdi-checkbox-marked-circle"; // Vermelho (ou qualquer outra cor padrão)
      }
    },

    getDefaultData(chipValue) {
      if (chipValue === "Não Iniciado") {
        return "mdi-cancel"; // Default
      } else if (chipValue === "Iniciado") {
        return "mdi-minus-circle"; // Verde
      } else if (chipValue === "Finalizado") {
        return "mdi-checkbox-marked-circle"; // Vermelho (ou qualquer outra cor padrão)
      }
    },

    verificaHabilidades(objeto, teste_t) {
      const listaHabilidades = Array(11).fill(0);

      for (let i = 0; i < objeto.listaQuest.length; i++) {
        const elemento = objeto.listaQuest[i];
        if (elemento.acertou === teste_t) {
          const habilidade = elemento.id.split("_")[1]; // Obtém o número da habilidade após o "H"
          const numeroHabilidade = parseInt(habilidade.slice(1)); // Extrai o número da habilidade
          if (
            !isNaN(numeroHabilidade) &&
            numeroHabilidade >= 1 &&
            numeroHabilidade <= 12
          ) {
            listaHabilidades[numeroHabilidade]++; // Incrementa a contagem da habilidade correspondente
          }
        }
      }
      console.log(listaHabilidades);
      return listaHabilidades;
    },

    selecionaTurma(turmaValue, index) {
      this.loadingStatesTurmas[index] = true;
      const data = {
        token: localStorage.getItem("tokenProf"),
        idTurma: turmaValue,
        idProfessor: localStorage.getItem("idProf"),
      };

      axios({
        url: "https://ta-back.onrender.com/professores/dadosTurma",
        data,
        method: "POST",
      })
        .then((response) => {
          this.listaTurma = response.data.turma;
          this.anoTurma = response.data.anoTurma;

          //criando lista com os ultimos elementos.
          for (let i = 0; i < this.listaTurma.length; i++) {
            if (
              this.listaTurma[i].listaDeTestes[
                this.listaTurma[i].listaDeTestes.length - 1
              ]
            ) {
              this.ultimosTestes.push(
                this.listaTurma[i].listaDeTestes[
                  this.listaTurma[i].listaDeTestes.length - 1
                ]
              );
            } else {
              this.testesVazios.push();
            }
          }
          this.sortOrder = true;
        })
        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        })
        .finally(() => {
          this.carregandoTurmas = false;
          this.ativarAnimacaoLista();
          console.log(this.listaTurma);
          this.loadingStatesTurmas[index] = false;
          this.infoAtiva = true;
        });
    },

    ativarAnimacaoLista() {
      this.animacaoListaAtiva = true;
      // Após um certo tempo, desativar a animação
      setTimeout(() => {
        this.animacaoListaAtiva = false;
      }, 500); // Tempo correspondente à duração da animação em milissegundos
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

    geraXlsx(planilha, nome) {
      console.log(planilha);
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
          "Tipo",
          "Resultado",
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
          item.tipo,
          item.resultado,
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
  },
  // FIM DO METHODSSSSSSS

  computed: {
    ordemTurma() {
      console.log(this.sortOrder);
      if (this.sortOrder) {
        this.sortOrder = !this.sortOrder;
      } else {
        this.sortOrder = !this.sortOrder;
        this.listaTurma.reverse();
      }

      return this.listaTurma;
    },

    listaFiltrada() {
      let result = Array.isArray(this.listaTurma) ? this.listaTurma : [];

      // Filtro de busca por nome
      if (this.search) {
        result = result.filter((item) =>
          item.user["nome"].toLowerCase().includes(this.search.toLowerCase())
        );
      }

      return result;
    },
  },
};
</script>

<style>
.custom-switch .v-input--density-default {
  --v-input-control-height: 43 px;
}

.custom-switch .v-switch__thumb {
  height: 20px; /* Ajusta a altura do thumb */
  width: 20px; /* Ajusta a largura do thumb */
}

.custom-switch .v-input__details {
  min-height: 0;
  padding-top: 0;
}

.custom-border .v-input__control {
  border-radius: 8px;
  border: 2px solid #dcdcdc;
}

.optionButton {
  width: 5px !important;
  min-width: 35px !important;
}

.custom-panel-text {
  padding: 0;
  margin: 0;
}

.v-expansion-panel-text__wrapper {
  padding: 0 !important;
}

.fade-in {
  -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.color-painel.v-expansion-panel-title--active {
  border-top: 2px solid orange;
  box-shadow: inset 0 0 -5 -5 10px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 165, 0, 0.4);
  /* Laranja com 40% de Opacidade */
}

.border-bottom-orange {
  border-bottom: 2px solid orange;
}
</style>