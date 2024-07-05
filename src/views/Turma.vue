<template>
  <v-app id="inspire">
    <v-app-bar flat color="#1E3892">
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-avatar class="me-4 " color="blue-lighten-4" size="32"></v-avatar>

        <v-btn v-for="link in links" :key="link" :text="link" variant="text"></v-btn>

        <v-spacer></v-spacer>

        <v-btn dark @click="logout" prepend-icon="mdi-logout-variant">
          SAIR
        </v-btn>

      </v-container>
    </v-app-bar>

    <v-main class="bg-blue-grey-lighten-5">
      <v-container>
        <v-row>

          <v-col cols="2">

            <div>
              <v-expansion-panels>
                <v-expansion-panel bg-color="#1E3892" class="rounded-lg">
                  <v-expansion-panel-title class="rounded-lg" v-ripple style="height: 4vh;">

                    <div class="d-flex justify-space-around align-center h-100 w-100">
                      <v-icon icon="mdi-school-outline"> </v-icon>
                      <p> TURMAS </p>
                    </div>

                  </v-expansion-panel-title>

                  <v-divider></v-divider>

                  <v-expansion-panel-text class="rounded-lg">
                    <v-list class="pa-0">

                      <v-list-item v-for="(item, index) in listaNomeTurma" :key="index" density="compact"
                        class="d-flex justify-center text-subtitle-2" @click="selecionaTurma(item.id)">
                        <v-list-item-title v-if="!animateCarregandoTurmas">{{ item.nome }}</v-list-item-title>
                        <v-progress-circular v-if="animateCarregandoTurmas" indeterminate size="24" />
                      </v-list-item>

                    </v-list>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>



          </v-col>

          <v-col>
            <v-sheet class="rounded-t-lg">

              <v-expansion-panels :readonly="true">
                <v-expansion-panel class="rounded-t-lg " bg-color="#1E3892" style="border-radius: 0px;">
                  <v-expansion-panel-title style="height: 4vh;" disable-icon>
                    <template v-slot:actions>
                      <!-- Só pra retirar o ícone. -->
                    </template>

                    <v-row class="dflex align-center">

                      <v-col cols="3" class="d-flex justify-center">
                        <v-btn block :append-icon="icon[0]" :ripple="false" variant="text"
                          @click="toggleIcon(0, 'nome')">Nome</v-btn>
                      </v-col>
                      <v-col cols="2" class="d-flex justify-center">
                        <v-btn block :append-icon="icon[1]" :ripple="false" variant="text"
                          @click="toggleIcon(1, 'percentTotal')">%
                          Acertos</v-btn>
                      </v-col>
                      <v-col cols="2" class="d-flex justify-center">
                        <v-btn :append-icon="icon[2]" :ripple="false" variant="text"
                          @click="toggleIcon(2, 'questaoTotal')">QUESTõES
                          totais</v-btn>
                      </v-col>
                      <v-col cols="3" class="d-flex justify-center">
                        <v-btn block :append-icon="icon[3]" :ripple="false" variant="text"
                          @click="toggleIcon(3, 'tempoMedio')">Tempo
                          Médio</v-btn>
                      </v-col>
                      <v-col cols="2" class="d-flex justify-center">
                        <v-btn block :append-icon="icon[4]" :ripple="false" variant="text"
                          @click="toggleIcon(4, 'nTeste')">N de
                          testes</v-btn>
                      </v-col>


                    </v-row>

                  </v-expansion-panel-title>

                </v-expansion-panel>
              </v-expansion-panels>
            </v-sheet>

            <!-- Mensagem de Seleção de Turma -->
            <div>
              <v-sheet v-if="mostrarDiv" class="d-flex justify-center align-center rounded-b-lg" height="250"
                color="grey-lighten-5" border="md">
                <p class="text-overline"
                  style="color: #CFD8DC; font-size: 3rem !important; text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);">
                  Selecione uma
                  turma</p>

              </v-sheet>

            </div>

            <!-- Iteração com os Dados dos Alunos -->
            <v-sheet rounded="lg" class="" :class="{ 'fade-in': animacaoListaAtiva }">

              <v-expansion-panels variant="accordion">
                <v-expansion-panel v-for="(item) in listaTurma" :key="item.nome" :readonly="item.nTestes === 0"
                  ref="panels" class="rounded-b-lg" style="border-radius: 0px;">


                  <v-expansion-panel-title style="height: 5vh;" class="color-painel">
                    <v-row class="d-flex align-center">

                      <v-col cols="3" class="d-flex justify-center">
                        {{ item.user['nome'] }}
                      </v-col>

                      <v-col cols="2" class="d-flex justify-center">
                        {{ item.percentTotal.toFixed(2).replace('.', ',') }} %
                      </v-col>

                      <v-col cols="2" class="d-flex justify-center">
                        {{ item.questoesTotais }}
                      </v-col>

                      <v-col cols="3" class="d-flex justify-center">
                        {{ formatTime(item.tempoMedio) }}
                      </v-col>

                      <v-col cols="2" class="d-flex justify-center">
                        {{ item.listaDeTestes.length }}
                      </v-col>

                    </v-row>

                  </v-expansion-panel-title>


                  <v-expansion-panel-text class="border-bottom-orange">

                    <v-container>

                      <v-card>

                        <v-tabs v-model="tab" bg-color="orange">

                          <v-tab value="dados">
                            <v-icon icon="mdi-account"></v-icon>
                            Dados
                          </v-tab>

                          <v-tab value="testes">
                            <v-icon icon="mdi-animation"></v-icon>
                            Testes
                          </v-tab>

                        </v-tabs>

                        <v-window v-model="tab">

                          <!-- Tela de dados gerais do aluno -->
                          <v-window-item value="dados">
                            <v-container>

                              <div>
                                <span class="font-weight-bold"> {{ item.user['nome'] }} </span>
                                de matrícula
                                <span class="font-weight-bold"> {{ item.user['mat'] }} </span>
                              </div>

                              <v-row>
                                <v-col cols="6">
                                  <ChartBar :data="item.listaDeHab['linguaPortuguesa']" />
                                </v-col>

                                <v-col cols="6" class="border-lg">

                                  <v-list>
                                    <v-list-item v-for="(habilidade, index) in item.listaDeHab['linguaPortuguesa']"
                                      :key="index">
                                      <span class="text-overline"> Habilidade {{ habilidade.habilidade }} - </span>
                                      <span class="text-caption"> {{ habilidade.porcentagemAcertos }} % em relação a
                                        turma. </span>
                                    </v-list-item>
                                  </v-list>

                                </v-col>
                              </v-row>


                            </v-container>


                          </v-window-item>

                          <!-- Tela da lista de testes do aluno -->
                          <v-window-item value="testes">

                            <v-card>

                              <v-table density="compact">

                                <thead>
                                  <tr>
                                    <th>
                                      Disciplina
                                    </th>
                                    <th>
                                      Extrato Final
                                    </th>
                                    <th>
                                      Quest. Feitas
                                    </th>
                                    <th>
                                      % de Acerto
                                    </th>
                                    <th>
                                      N. de Hab.
                                    </th>
                                    <th>
                                      Tempo do Teste
                                    </th>
                                    <th>
                                      Status
                                    </th>
                                    <th>

                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr v-for="teste in item.listaDeTestes" :key="teste._id">
                                    <td>{{ teste.disciplina }}</td>
                                    <td>{{ getTableValue(teste, 'extratoFinal') }}</td>
                                    <td>{{ getTableValue(teste, 'numero_questoes_feitas') }}</td>
                                    <td>{{ getTableValue(teste, 'porcentagem_questoes', true) }}</td>
                                    <td>{{ getTableValue(teste, 'nDeHabilidades') }}</td>
                                    <td>{{ getTableValue(teste, 'tempoDoTeste', false, true) }}</td>
                                    <td>
                                      <v-chip size="small" :color="getColor(teste.status)">
                                        <v-icon :icon="getIcon(teste.status)" start></v-icon>
                                        {{ teste.status }}
                                      </v-chip>
                                    </td>
                                    <td>
                                      <!-- <transition name="fade">
                                        <p v-if="textoPlanilha" class="hover-text">teste</p>
                                      </transition> -->
                                      <div class="d-inline-flex">
                                        <v-btn variant="text" class="optionButton"
                                          @click="csvTeste(teste.listaQuest, item.user['nome'])">

                                          <v-tooltip activator="parent" location="top">Download CSV</v-tooltip>
                                          <v-icon size="large" icon="mdi-google-spreadsheet"></v-icon>

                                        </v-btn>

                                        <v-btn variant="text" class="optionButton">
                                          <v-tooltip activator="parent" location="top">Excluir Teste</v-tooltip>
                                          <v-icon size="large" icon="mdi-delete-forever" color="red"></v-icon>
                                        </v-btn>


                                      </div>


                                    </td>
                                  </tr>
                                </tbody>

                              </v-table>

                            </v-card>


                          </v-window-item>

                        </v-window>



                      </v-card>


                    </v-container>


                  </v-expansion-panel-text>

                </v-expansion-panel>
              </v-expansion-panels>

            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const links = [
  'Dashboard',
  'Mensagem',
  'Atualizações',
]
</script>

<script>
import axios from 'axios';
// import Chart from '@/components/Chart.vue'
import ChartBar from '@/components/ChartBar.vue'

export default {
  name: 'Turma',
  components: {
    // Chart,
    ChartBar
  },

  data: () => ({

    listaTurma: [],
    carregandoTurmas: true,
    chipValue: '',
    toggle: undefined,
    toggleTurma: undefined,
    animacaoListaAtiva: false,
    textFilter: undefined,
    icon: ["", "", "", "", "", ""],
    lastClicked: -1,
    sortOrder: true,
    mostrarDiv: true,
    listaNomeTurma: [],
    animateCarregandoTurmas: false,
    tab: 'dados',
    chartData: [300, 50, 100, 200, 150, 250],
    textoPlanilha: false,                      //Flag pro hover do botão da planilha.



  }),

  created() {

    this.$store.dispatch('verificarTokenProfs', { router: this.$router });
    this.listaNomeTurma = this.returnTurmas();

  },
  methods: {

    getTableValue(teste, key, isPercentage = false, isTime = false) {
      if (teste.status !== 'Finalizado') {
        return '-';
      }
      let value = teste[key];
      if (isPercentage) {
        return (value || 0).toFixed(2).replace('.', ',');
      }
      if (isTime) {
        return this.formatTime(value);
      }
      return value !== undefined ? value : '-';
    },

    formatTime(seconds) {
      const roundedSeconds = Math.round(seconds);
      const minutes = Math.floor(roundedSeconds / 60);
      const remainingSeconds = roundedSeconds % 60;
      return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
    },

    logout() {
      localStorage.clear();
      this.$router.push('/proflogin');
    },

    toggleIcon(index, value) {
      // Reset all icons
      this.icon = this.icon.map((icon, i) => (i === index ? (this.lastClicked === index ? "mdi-menu-down" : "mdi-menu-up") : ""));

      // Update last clicked index
      this.lastClicked = this.lastClicked === index ? -1 : index;
      this.toggle = value;
      this.listaTurma = this.listaTurmaOrdenada(this.sortOrder);
      this.sortOrder = !this.sortOrder;
    },

    returnTurmas() {

      const data = {
        tokenProf: localStorage.getItem('tokenProf')
      };

      axios({ url: 'https://ta-back.onrender.com/professores/returnTurmas', data, method: 'POST' })
        .then((response) => {
          this.listaNomeTurma = response.data.listaTurmas
        })
        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });


    },

    getColor(chipValue) {
      // Lógica para determinar a cor com base no valor de chipValue
      if (chipValue === 'Não Iniciado') {
        return ''; // Default
      } else if (chipValue === 'Iniciado') {
        return 'orange'; // Verde
      } else if (chipValue === 'Finalizado') {
        return 'green'; // Vermelho (ou qualquer outra cor padrão)
      }
    },

    getIcon(chipValue) {

      if (chipValue === 'Não Iniciado') {
        return 'mdi-cancel'; // Default
      } else if (chipValue === 'Iniciado') {
        return 'mdi-minus-circle'; // Verde
      } else if (chipValue === 'Finalizado') {
        return 'mdi-checkbox-marked-circle'; // Vermelho (ou qualquer outra cor padrão)
      }
    },

    getDefaultData(chipValue) {
      if (chipValue === 'Não Iniciado') {
        return 'mdi-cancel'; // Default
      } else if (chipValue === 'Iniciado') {
        return 'mdi-minus-circle'; // Verde
      } else if (chipValue === 'Finalizado') {
        return 'mdi-checkbox-marked-circle'; // Vermelho (ou qualquer outra cor padrão)
      }
    },

    verificaHabilidades(objeto, teste_t) {

      const listaHabilidades = Array(11).fill(0);

      for (let i = 0; i < objeto.listaQuest.length; i++) {
        const elemento = objeto.listaQuest[i];
        if (elemento.acertou === teste_t) {
          const habilidade = elemento.id.split('_')[1]; // Obtém o número da habilidade após o "H"
          const numeroHabilidade = parseInt(habilidade.slice(1)); // Extrai o número da habilidade
          if (!isNaN(numeroHabilidade) && numeroHabilidade >= 1 && numeroHabilidade <= 12) {
            listaHabilidades[numeroHabilidade]++; // Incrementa a contagem da habilidade correspondente
          }
        }
      }
      console.log(listaHabilidades)
      return listaHabilidades;

    },

    selecionaTurma(turmaValue) {

      this.animateCarregandoTurmas = true;
      const data = {
        token: localStorage.getItem('tokenProf'),
        idTurma: turmaValue,
        idProfessor: localStorage.getItem('idProf')
      };

      console.log(data)

      axios({ url: 'https://ta-back.onrender.com/professores/dadosTurma', data, method: 'POST' })
        .then((response) => {
          this.listaTurma = response.data.turma


        })
        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        }).finally(() => {
          // Define carregandoTurmas como false quando a promessa for resolvida ou rejeitada
          this.carregandoTurmas = false;
          this.mostrarDiv = false;
          this.ativarAnimacaoLista();
          console.log(this.listaTurma)
          this.animateCarregandoTurmas = false;
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
        this.listaTurma = this.listaTurma.slice().sort((a, b) => a.user['nome'].localeCompare(b.user['nome']));
      }
      else if (this.toggle === "questaoTotal") {
        this.listaTurma = this.listaTurma.slice().sort((a, b) => a.questoesTotais - b.questoesTotais);
      }
      else if (this.toggle === "tempoMedio") {
        this.listaTurma = this.listaTurma.slice().sort((a, b) => a.tempoMedio - b.tempoMedio);
      }
      else if (this.toggle === "percentTotal") {
        this.listaTurma = this.listaTurma.slice().sort((a, b) => (a.percentTotal || 0) - (b.percentTotal || 0));
      }
      else if (this.toggle === "nTeste") {
        this.listaTurma = this.listaTurma.slice().sort((a, b) => a.listaDeTestes.length - b.listaDeTestes.length);

      }
      // Adicione condições semelhantes para outros tipos de filtragem, se necessário

      if (order) {
        return this.listaTurma;
      }
      else {
        return this.listaTurma.reverse();
      }


    },

    csvTeste(teste, nomeAluno) {        //formata dados do teste.

      let dados = [];
      // Adiciona o nome do aluno
      dados.push([nomeAluno]);

      // Obtém os estratos únicos
      const estratos = [...new Set(teste.map(t => t.estrato))];

      // Itera sobre cada estrato
      estratos.forEach(estrato => {
        // Adiciona a identificação do estrato testado
        dados.push([`Identificação do Estrato Testado: Estrato ${estrato}`]);

        // Adiciona cabeçalhos para a seção de questões
        //dados.push(["Identificador da Questão", "Resposta", "Tempo Gasto"]);

        // Adiciona dados das questões para o estrato atual
        teste.filter(questao => questao.estrato === estrato).forEach((questao, index) => {
          dados.push([
            `Identificador da Questão ${index + 1}`,
            `Resposta à Questão ${index + 1}`,
            `Tempo Gasto na Questão ${index + 1}(s)`
          ]);
          dados.push([
            questao.id,
            questao.alternativa,
            questao.tempoQuestao.toFixed(2)
          ]);
        });

        // Adiciona resultado do estrato
        const resultadoEstrato = (teste.filter(q => q.estrato === estrato).filter(q => q.acertou).length / teste.filter(q => q.estrato === estrato).length) >= 0.6 ? "aprovado" : "reprovado";
        dados.push(["Resultado do Estrato", resultadoEstrato]);

        // Adiciona uma linha em branco para separar seções
        dados.push([]);
      });
      this.downloadCsv(dados)
    },


    convertToCSV(data) {
      return data.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
    },

    downloadCsv(dados) {
      const csvData = this.convertToCSV(dados);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    showText(texto) {     //Mostra texto no momento do hover
      if (texto === 'planilha') {
        this.textoPlanilha = true;
      }
    },

    hideText(texto) {    //Esconde texto no momento do hover
      if (texto === 'planilha') {
        this.textoPlanilha = false;
      }
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
  },
}
</script>

<style>
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
  -webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
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