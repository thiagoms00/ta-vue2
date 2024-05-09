<template>
  <v-app id="inspire">
    <v-app-bar flat color="#1E3892">
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-avatar class="me-4 " color="blue-lighten-4" size="32"></v-avatar>

        <v-btn v-for="link in links" :key="link" :text="link" variant="text"></v-btn>

        <v-spacer></v-spacer>

      </v-container>
    </v-app-bar>

    <v-main class="bg-blue-grey-lighten-5">
      <v-container>
        <v-row>

          <v-col cols="2">

            <v-sheet class=" pa-2" rounded="lg">

              <div class="d-flex justify-space-evenly py-2">
                <v-icon icon="mdi-school-outline"> </v-icon>
                <p> Turmas </p>
              </div>

              <v-divider></v-divider>

              <v-btn-toggle class="d-flex flex-column w-100 h-100" color="blue-lighten-4" rounded="0"
                v-model="toggleTurma">

                <v-btn class="pa-4" value="t1" @click="selecionaTurma('LP1')">
                  Turma 1
                </v-btn>

                <v-btn class="pa-4" value="t2" @click="selecionaTurma('LP2')">
                  Turma 2
                </v-btn>

                <v-btn class="pa-4" value="t3" @click="selecionaTurma('LP3')">
                  Turma 3
                </v-btn>

                <v-btn class="pa-4" value="t4" @click="selecionaTurma('LP4')">
                  Turma 4
                </v-btn>

                <v-btn class="pa-4" value="t5" @click="selecionaTurma('PILOTO')">
                  Turma - Piloto
                </v-btn>

              </v-btn-toggle>

            </v-sheet>

            <div class="py-4">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-title rounded="lg" v-ripple>



                    <div class="d-flex justify-space-around align-center h-100 w-100">
                      <v-icon icon="mdi-filter-variant" size="large"></v-icon>
                      <p> FILTROS </p>
                    </div>



                  </v-expansion-panel-title>
                  <v-divider></v-divider>

                  <v-expansion-panel-text class="custom-panel-text">
                    <v-list class="pa-0">
                      <v-list-item density="compact" class="d-flex justify-center text-subtitle-2"
                        v-for="(item, index) in items_filtro" :key="index" :value="item.title"
                        @click="selecionarItem(item.value)" color="primary">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>



          </v-col>

          <v-col>
            <v-sheet rounded="lg">

              <v-expansion-panels :readonly="true" rounded="lg">
                <v-expansion-panel>
                  <v-expansion-panel-title style="height: 4vh;" disable-icon>
                    <template v-slot:actions>
                      <!-- Só pra retirar o ícone. -->
                    </template>

                    <v-row class="dflex align-center">
                      <v-col> Matrícula </v-col>
                      <v-col> Nome </v-col>
                      <v-col> Extrato </v-col>
                      <v-col> Porcentagem </v-col>
                      <v-col> Nº de Questões </v-col>
                      <v-col> Status </v-col>
                    </v-row>

                  </v-expansion-panel-title>

                </v-expansion-panel>
              </v-expansion-panels>
            </v-sheet>

            <v-sheet rounded="lg" class="mt-2" :class="{ 'fade-in': animacaoListaAtiva }">



              <v-expansion-panels variant="accordion" class="mt-4">
                <v-expansion-panel v-for="(item) in listaTurmaOrdenada" :key="item.nome"
                  :readonly="item.status !== 'Finalizado'" ref="panels">


                  <v-expansion-panel-title style="height: 5vh;">
                    <v-row class="dflex align-center">
                      <v-col>
                        {{ item.user['mat'] }}
                      </v-col>
                      <v-col>
                        {{ item.user['nome'] }}
                      </v-col>
                      <v-col>
                        {{ (item.status === 'Não Iniciado' || item.status === 'Iniciado') ? '-' : item.extratoFinal }}
                      </v-col>
                      <v-col>
                        {{ (item.status === 'Não Iniciado' || item.status === 'Iniciado') ? '-' :
          item.porcentagem_questoes.toFixed(2) + '%' }}
                      </v-col>
                      <v-col>
                        {{ (item.status === 'Não Iniciado' || item.status === 'Iniciado') ? '-' :
          item.numero_questoes_feitas }}
                      </v-col>
                      <v-col>
                        <v-chip :color="getColor(item.status)" :prepend-icon="getIcon(item.status)">
                          {{ item.status }}
                        </v-chip>
                      </v-col>
                    </v-row>

                  </v-expansion-panel-title>
                  

                  <v-expansion-panel-text>
                    <v-divider></v-divider>
                    <v-row justify="space-around" no-gutters>
                      <v-col cols="4 pa-2 d-flex w-100 flex-column justify-center">
                        <p class="text-h5 text-center mb-4" >
                          Questões Corretas
                        </p>
                        <Chart :chartId="'correctChart'" :chartData="item.chartData" />
                      </v-col>

                      <v-col cols="4">
                        <p class="text-h5" >
                          Questões Incorretas
                        </p>
                        <Chart :chartId="'incorrectChart'" :chartData="item.chartDataErradas" />
                      </v-col>
                    </v-row>

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
    items_filtro: [
      { title: 'EXTRATO', value: 'extrato' },
      { title: 'STATUS', value: 'status' },
      { title: 'PORCENTAGEM', value: 'porcentagem' },
      { title: 'N QUESTÕES', value: 'nquestoes' },
      { title: 'NOME', value: 'nome' },
    ],
    animacaoListaAtiva: false


  }),

  created() {

    this.$store.dispatch('verificarToken', { router: this.$router });

    // this.returnDadosTurma().then((dados) => {
    //     // console.log(dados)

    //     // Quando a promessa for resolvida, atribua os dados à listaTurma
    //     this.listaTurma = dados.turma;
    //     this.listaTurma = this.getChartDatas(this.listaTurma);
    //   })
    //   .catch((error) => {
    //     // Em caso de erro, trate-o de acordo com a sua necessidade
    //     console.error("Erro ao buscar dados da turma:", error);
    //   }).finally(() => {
    //     // Define carregandoTurmas como false quando a promessa for resolvida ou rejeitada
    //     this.carregandoTurmas = false;
    //   });

  },
  methods: {
    returnDadosTurma() {
      return new Promise((resolve, reject) => {
        const token = {
          token: "abcde"
        };

        axios({ url: 'https://ta-back.onrender.com/dadosTurma', data: token, method: 'POST' })
          .then((response) => {
            // Verifica se a resposta foi bem sucedida
            if (response && response.data) {
              // Resolva a promessa com os dados da resposta
              resolve(response.data);
            } else {
              // Se a resposta estiver vazia ou não for bem sucedida, rejeite a promessa com uma mensagem de erro
              reject("Erro: resposta vazia ou não bem sucedida");
            }
          })
          .catch((error) => {
            // Em caso de erro na solicitação, rejeite a promessa com o erro
            reject(error);
          });
      });
    },

    returnDadosTurmaNumber(turmaValue) {
      return new Promise((resolve, reject) => {
        const token = {
          token: "abcde",
          turma: turmaValue
        };

        axios({ url: 'https://ta-back.onrender.com/dadosTurma', data: token, method: 'POST' })
          .then((response) => {
            // Verifica se a resposta foi bem sucedida
            if (response && response.data) {
              // Resolva a promessa com os dados da resposta
              resolve(response.data);
            } else {
              // Se a resposta estiver vazia ou não for bem sucedida, rejeite a promessa com uma mensagem de erro
              reject("Erro: resposta vazia ou não bem sucedida");
            }
          })
          .catch((error) => {
            // Em caso de erro na solicitação, rejeite a promessa com o erro
            reject(error);
          });
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

    selecionarItem(index) {
      this.toggle = index; // Atualiza a variável com o índice do item clicado
      console.log(this.toggle)
    },

    testaValores(item) {
      // console.log(item);
      this.verificaHabilidades(item.listaQuest, true)
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

      this.returnDadosTurmaNumber(turmaValue)
        .then((dados) => {
          console.log(dados)

          // Quando a promessa for resolvida, atribua os dados à listaTurma
          this.listaTurma = dados;
          console.log(this.listaTurma)
          this.listaTurma = this.getChartDatas(this.listaTurma);
        })
        .catch((error) => {
          // Em caso de erro, trate-o de acordo com a sua necessidade
          console.error("Erro ao buscar dados da turma:", error);
        }).finally(() => {
          // Define carregandoTurmas como false quando a promessa for resolvida ou rejeitada
          this.carregandoTurmas = false;
          console.log("Primeiro print")
          this.ativarAnimacaoLista();
        });

    },

    ativarAnimacaoLista() {
      console.log("Animação de lista");
      this.animacaoListaAtiva = true;
      // Após um certo tempo, desativar a animação
      setTimeout(() => {
        this.animacaoListaAtiva = false;
      }, 500); // Tempo correspondente à duração da animação em milissegundos
    }

  },
  // FIM DO METHODSSSSSSS
  computed: {
    listaTurmaOrdenada() {
      if (this.toggle === "nome") {
        return this.listaTurma.slice().sort((a, b) => (a.user['nome'] > b.user['nome']) ? 1 : -1);
      }
      else if (this.toggle === "extrato") {
        const extratoOrder = { '3': 0, '2': 1, '1': 2, '': 3 };
        return this.listaTurma.slice().sort((a, b) => extratoOrder[a.extratoFinal] - extratoOrder[b.extratoFinal]);
      }
      else if (this.toggle === "status") {
        const statusOrder = { 'Finalizado': 0, 'Iniciado': 1, 'Não Iniciado': 2 };
        return this.listaTurma.slice().sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
      }
      else if (this.toggle === "porcentagem") {
        return this.listaTurma.slice().sort((a, b) => b.porcentagem_questoes - a.porcentagem_questoes);
      }
      else if (this.toggle === "nquestões") {
        return this.listaTurma.slice().sort((a, b) => b.numero_questoes_feitas - a.numero_questoes_feitas);
      }
      // Adicione condições semelhantes para outros tipos de filtragem, se necessário
      return this.listaTurma;
    },

    filtrarTurma() {
      if (this.toggleTurma === "t1") {
        // return this.listaTurma.slice().sort((a, b) => (a.user['nome'] > b.user['nome']) ? 1 : -1);
        console.log("T1")
      }
      else if (this.toggleTurma === "t2") {
        // const extratoOrder = { '3': 0, '2': 1, '1': 2, '': 3 };
        // return this.listaTurma.slice().sort((a, b) => extratoOrder[a.extratoFinal] - extratoOrder[b.extratoFinal]);
        console.log("T1")
      }
      // Adicione condições semelhantes para outros tipos de filtragem, se necessário
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


</style>