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
                        {{ item.tempoMedio.toFixed(2).replace('.', ',') }} s
                      </v-col>

                      <v-col cols="2" class="d-flex justify-center">
                        {{ item.nTestes }}
                      </v-col>

                      <!-- <v-col cols="3" class="d-flex justify-center">
                        <v-chip :color="getColor(item.status)" :prepend-icon="getIcon(item.status)">
                          {{ item.status }}
                        </v-chip>
                      </v-col> -->
                    </v-row>

                  </v-expansion-panel-title>


                  <v-expansion-panel-text>

                    <v-container>

                      <v-card>

                        <v-tabs v-model="tab" bg-color="orange">

                          <v-tab value="dados">
                            <v-icon icon="mdi-phone"></v-icon>
                            Dados
                          </v-tab>

                          <v-tab value="testes">
                            <v-icon icon="mdi-heart"></v-icon>
                            Testes
                          </v-tab>

                        </v-tabs>

                        <v-tabs-window v-model="tab">

                          <v-tabs-window-item value="dados">
                            <v-card>
                              <v-card-text>{{ item.user['nome'] }}</v-card-text>
                            </v-card>
                          </v-tabs-window-item>

                          <v-tabs-window-item value="testes">
                            <v-card>
                              <v-card-text>{{ item.listaDeTestes }}</v-card-text>
                            </v-card>
                          </v-tabs-window-item>

                        </v-tabs-window>

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
import Chart from '@/components/Chart.vue'

export default {
  name: 'Turma',
  components: {
    Chart
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



  }),

  created() {

    this.$store.dispatch('verificarTokenProfs', { router: this.$router });
    this.listaNomeTurma = this.returnTurmas();

  },
  methods: {

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

    getChartDatas(lista) {

      for (let i = 0; i < lista.length; i++) {
        const objeto = lista[i];

        const dadosHabilidades = this.verificaHabilidades(objeto, true);
        const dadosHabilidadesErradas = this.verificaHabilidades(objeto, false);


        const labels = Array.from({ length: 12 }, (_, i) => `H${(i).toString().padStart(2, '0')}`);
        const novoChartData = {
          labels: labels,
          datasets: [{
            label: 'Habilidades',
            data: dadosHabilidades,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(50, 205, 50, 0.2)',
              'rgba(255, 0, 255, 0.2)',
              'rgba(0, 191, 255, 0.2)',
              'rgba(255, 140, 0, 0.2)',
              'rgba(75, 0, 130, 0.2)'

            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(50, 205, 50, 1)',
              'rgba(255, 0, 255, 1)',
              'rgba(0, 191, 255, 1)',
              'rgba(255, 140, 0, 1)',
              'rgba(75, 0, 130, 1)'

            ],
            borderWidth: 1
          }]
        };

        const novoChartDataErradas = {
          labels: labels,
          datasets: [{
            label: 'Habilidades',
            data: dadosHabilidadesErradas,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(50, 205, 50, 0.2)',
              'rgba(255, 0, 255, 0.2)',
              'rgba(0, 191, 255, 0.2)',
              'rgba(255, 140, 0, 0.2)',
              'rgba(75, 0, 130, 0.2)'

            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(50, 205, 50, 1)',
              'rgba(255, 0, 255, 1)',
              'rgba(0, 191, 255, 1)',
              'rgba(255, 140, 0, 1)',
              'rgba(75, 0, 130, 1)'

            ],
            borderWidth: 1
          }]
        };


        objeto.chartData = novoChartData;
        objeto.chartDataErradas = novoChartDataErradas;
      }

      // console.log(lista)

      return lista;

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
        this.listaTurma = this.listaTurma.slice().sort((a, b) => b.numero_questoes_feitas - a.numero_questoes_feitas);

      }
      // Adicione condições semelhantes para outros tipos de filtragem, se necessário

      if (order) {
        return this.listaTurma;
      }
      else {
        return this.listaTurma.reverse();
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
.custom-panel-text {
  padding: 0;
  /* Remove a margem interna */
  margin: 0;
  /* Remove a margem externa */
}

.v-expansion-panel-text__wrapper {
  padding: 0 !important;
  /* Defina o padding como 0 */
}

.fade-in {
  -webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2024-4-28 15:43:0
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in
 * ----------------------------------------
 */
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
  background-color: #CFD8DC;
  /* Substitua "blue" pela cor desejada para o texto expandido */
}
</style>