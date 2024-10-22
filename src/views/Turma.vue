<template>
  <v-app id="inspire">
    <NavBar />

    <v-main class="bg-blue-grey-lighten-5">
      <v-container fluid>
        <v-row class="d-flex justify-center">
          <v-col cols="11">
            <v-row>
              <v-col cols="2" style="min-width: 270px">
                <div class="elevation-2 rounded-lg">
                  <v-expansion-panels>
                    <v-expansion-panel bg-color="#1E3892" class="rounded-lg">
                      <v-expansion-panel-title class="rounded-lg" v-ripple style="height: 4vh" :disabled="loading">
                        <div class="d-flex justify-center align-center h-100 w-100">
                          <v-progress-circular v-if="loading" indeterminate size="24" color="white" />
                          <template v-else>
                            <v-icon icon="mdi-school-outline"></v-icon>
                            <div class="text-button pl-2">TURMAS</div>
                          </template>
                        </div>
                      </v-expansion-panel-title>

                      <v-divider></v-divider>

                      <!-- Expansion Panel com as turmas de um professor -->
                      <v-expansion-panel-text v-if="!loading" class="rounded-lg">
                        <v-list class="pa-0 rounded-b-lg">
                          <v-list-item v-for="(item, index) in listaNomeTurma" :key="index" density="compact"
                            class="d-flex justify-center text-subtitle-2" @click="selecionaTurma(item, index)"
                            :disabled="loadingGlobal || loadingStatesTurmas[index]">
                            <v-list-item-title class="name-turma" v-if="!loadingStatesTurmas[index]">{{ item.nome
                              }}</v-list-item-title>
                            <v-progress-circular v-if="loadingStatesTurmas[index]" indeterminate size="24" />
                          </v-list-item>
                        </v-list>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>

                <v-sheet class="custom-switch mt-4 elevation-2 d-flex justify-center align-center" rounded="lg">
                  <v-tabs v-model="tab" color="primary" direction="vertical" style="width: 100%">
                    <v-tab value="option-1" class="pl-4 d-flex justify-start" prepend-icon="mdi-menu">
                      <span>Níveis de aprendizado</span>
                      <v-tooltip activator="parent" :open-delay="0" :close-delay="0" transition="fade-transition">
                        Níveis individual de cada aluno
                      </v-tooltip>
                    </v-tab>

                    <v-tab prepend-icon="mdi-compass-outline" value="option-2" class="pl-4 d-flex justify-start">
                      <span>Sequência na avaliação</span>
                      <v-tooltip activator="parent" :open-delay="0" :close-delay="0" transition="fade-transition">
                        Trajeto de habilidades do aluno no último teste
                      </v-tooltip>
                    </v-tab>

                    <v-tab prepend-icon="mdi-checkbox-outline" value="option-3" class="pl-4 d-flex justify-start">
                      <span>Dados gerais</span>
                      <v-tooltip activator="parent" :open-delay="0" :close-delay="0" transition="fade-transition">
                        Dados individuais de cada aluno
                      </v-tooltip>
                    </v-tab>

                    <v-divider :thickness="5" color="#4f5263" class="border-opacity-25"></v-divider>

                    <v-tab prepend-icon="mdi-chart-bar" value="option-4" class="pl-4 d-flex justify-start">
                      <span>Panorama da Turma</span>
                      <v-tooltip activator="parent" :open-delay="0" :close-delay="0" transition="fade-transition">
                        Um resumo que enfatiza uma visão geral e integrada da
                        turma
                      </v-tooltip>
                    </v-tab>
                    <!-- <v-tab
                  prepend-icon="mdi-remote-desktop"
                  text="Compara"
                  value="option-5"
                  class="pa-1 d-flex justify-center"
                ></v-tab> -->
                    <!-- <v-tab
                      prepend-icon="mdi-cog"
                      value="option-6"
                      class="pl-4 d-flex justify-start"
                    >
                      <span>Configurações</span>
                      <v-tooltip
                        activator="parent"
                        :open-delay="0"
                        :close-delay="0"
                        transition="fade-transition"
                      >
                        Configurações da turma
                      </v-tooltip>
                    </v-tab> -->
                    <v-tab  v-if="adminVer" prepend-icon="mdi-database-outline" value="option-7" class="pl-4 d-flex justify-start" >
                      <span >Banco de Itens</span>
                      <v-tooltip activator="parent" :open-delay="0" :close-delay="0" transition="fade-transition">
                        Informações sobre os itens do sistema
                      </v-tooltip>
                    </v-tab>
                  </v-tabs>


                </v-sheet>
                <!-- Campo de busca de aluno -->

                <v-text-field append-inner-icon="mdi-magnify" density="compact" label="Buscar aluno" variant="solo"
                  v-model="search" class="custom-border buscar-field mt-4" style="width: 100%">
                </v-text-field>
              </v-col>

              <v-col>
                <!-- MENSAGEM DE SELEÇÂO DE TURMA -->
                <v-sheet v-if="!controlOptions" class="d-flex justify-center align-center rounded-lg" height="250"
                  color="grey-lighten-5" border="md">
                  <p class="text-overline" style="
                      color: #cfd8dc;
                      font-size: 3rem !important;
                      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
                    ">
                    Selecione uma turma
                  </p>
                </v-sheet>

                <v-window v-model="tab" v-if="controlOptions">
                  <!-- Janela de Dados 1 -->
                  <v-window-item value="option-1">
                    <TurmaNiveisInfo :listaDeAlunos="listaFiltrada" :nomeTurma="nomeTurmaSelecionada"
                      ref="turmaVisualInfo" />
                  </v-window-item>

                  <!-- Janela de Dados 2 -->
                  <v-window-item value="option-2">
                    <TurmaMapInfo :listaDeAlunos="listaFiltrada" :anoTurma="anoTurma" :nomeTurma="nomeTurmaSelecionada"
                      ref="turmaMapInfo" />
                  </v-window-item>

                  <!-- Janela de Dados 3 -->

                  <v-window-item value="option-3">
                    <TurmaDataInfo :listaDeAlunos="listaFiltrada" ref="turmaDataInfo" @eventDeleteTest="excluirTeste" />
                  </v-window-item>

                  <!-- Janela de Dados 4 -->
                  <v-window-item value="option-4">
                    <TurmaGraphInfo :listaDeAlunos="listaFiltrada" :habilidadesTurma="habilidadesTurmaAtual"
                      :nomeTurma="nomeTurmaSelecionada" />
                  </v-window-item>

                  <!-- Janela de Dados 4 -->
                  <v-window-item value="option-5">
                    <TurmaCompara :listaDeAlunos="listaFiltrada" :iDsTurma="listaNomeTurma"
                      :turmaAtual="turmaSelecionada" />
                  </v-window-item>

                  <v-window-item value="option-6">
                    <TurmaConfig :estratoInicial="estratoInicial" :turmaSelecionada="turmaSelecionada"
                      :nomeTurma="nomeTurmaSelecionada"></TurmaConfig>
                  </v-window-item>

                  <v-window-item value="option-7">
                    <TurmaItensInfo :listaDeAlunos="listaFiltrada" ref="turmaDataInfo" @eventDeleteTest="excluirTeste">

                    </TurmaItensInfo>
                  </v-window-item>


                </v-window>
              </v-col>
            </v-row>
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
import TurmaMapInfo from "@/components/TurmaMapInfo.vue";
import TurmaNiveisInfo from "@/components/TurmaNiveisInfo.vue";
import TurmaGraphInfo from "@/components/TurmaGraphInfo.vue";
import TurmaConfig from "@/components/TurmaConfig.vue";
import TurmaCompara from "@/components/TurmaCompara.vue";
import TurmaItensInfo from "@/components/TurmaItensInfo.vue";
import { verificaLogin } from "@/utils/helpers";

export default {
  name: "Turma",
  components: {
    // Chart,
    ChartBar,
    NavBar,
    DialogExcluirTeste,
    TurmaDataInfo,
    TurmaMapInfo,
    TurmaNiveisInfo,
    TurmaGraphInfo,
    TurmaConfig,
    TurmaCompara,
    TurmaItensInfo,
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
    textoPlanilha: false, //Flag pro hover do botão da planilha.
    search: "",
    tab: "option-1",
    anoTurma: 1,
    estratoInicial: 1,
    habilidadesTurmaAtual: {},
    turmaSelecionada: "",
    nomeTurmaSelecionada: "",
    controlOptions: false,
    loading: true,
    loadingGlobal: false,
    adminVer : false,
    newVar : false,
  }),

  created() {
    
    verificaLogin(this.$router, this.$route);
    this.listaNomeTurma = this.returnTurmas();
    let flag = false;
    const adminToken = localStorage.getItem('admin');
    this.adminVer = adminToken === 'true';      //garantindo que o resultado seja um boolean true e não uma string.
    

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
      const type = localStorage.getItem("type");
      const data = {
        tokenProf: localStorage.getItem("token"),
      };

      this.loading = true; // Inicia o carregamento

      let url = "";
      if (type === "coord") {
        url = "https://ta-back.onrender.com/coordenadores/retorna_turmas";
      } else if (type === "dir") {
        url = "https://ta-back.onrender.com/diretores/retorna_turmas";
      } else {
        url = "https://ta-back.onrender.com/professores/returnTurmas";
      }

      axios({
        url,
        data,
        method: "POST",
      })
        .then((response) => {
          this.listaNomeTurma = response.data.listaTurmas;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false; // Finaliza o carregamento
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
      return listaHabilidades;
    },

    selecionaTurma(turmaValue, index) {
      if (this.loadingGlobal) {
        return; // Impede que outra busca seja feita
      }
      this.nomeTurmaSelecionada = turmaValue.nome;
      this.loadingStatesTurmas[index] = true;
      this.loadingGlobal = true;
      this.turmaSelecionada = turmaValue.id;
      const data = {
        token: localStorage.getItem("token"),
        idTurma: turmaValue.id,
        idProfessor: localStorage.getItem("idProf"),
      };
      const type = localStorage.getItem("type");
      let urlAdd = "";
      if (type === "coord") {
        urlAdd = "https://ta-back.onrender.com/coordenadores/dadosTurma";
      } else if (type === "dir") {
        urlAdd = "https://ta-back.onrender.com/diretores/dadosTurma";
      } else {
        urlAdd = "https://ta-back.onrender.com/professores/dadosTurma";
      }

      axios({
        url: urlAdd,
        data,
        method: "POST",
      })
        .then((response) => {
          this.listaTurma = response.data.turma;
          this.anoTurma = response.data.anoTurma;
          this.estratoInicial = response.data.estratoInicial;
          this.habilidadesTurmaAtual = response.data.habTurma;
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
          this.loadingGlobal = false;
          this.controlOptions = true;
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
          "Percurso",
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
.name-turma {
  font-size: 1.1rem !important;
}

.custom-switch .v-input--density-default {
  --v-input-control-height: 43 px;
}

.custom-switch .v-switch__thumb {
  height: 20px;
  /* Ajusta a altura do thumb */
  width: 20px;
  /* Ajusta a largura do thumb */
}

.custom-switch .v-input__details {
  min-height: 0;
  padding-top: 0;
}

.custom-border .v-input__control {
  border-radius: 10px;
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

@media (max-width: 1600px) {
  .buscar-field .v-input__control {
    /* width: 12.5vw !important; */
    font-size: 1px;
  }
}

@media (max-width: 1200px) {
  .buscar-field .v-input__control {
    /* width: 13vw !important; */
    font-size: 1px;
  }
}
</style>
