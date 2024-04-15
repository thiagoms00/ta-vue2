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

            <v-sheet class=" h-50" rounded="lg">

              <div class="d-flex justify-space-evenly py-2">
                <v-icon icon="mdi-school-outline"> </v-icon>
                <p> Turmas </p>
              </div>
              <v-divider></v-divider>

              <v-btn-toggle class="d-flex flex-column w-100 h-100" color="blue-lighten-4" rounded="0">

                <v-btn class="pa-4">
                  Turma 1
                </v-btn>

                <v-btn class="pa-4">
                  Turma 2
                </v-btn>

              </v-btn-toggle>

            </v-sheet>

            <v-sheet class="mt-4 h-75" rounded="lg">

              <div class="d-flex justify-space-evenly py-2">
                <v-icon icon="mdi-filter-variant"> </v-icon>
                <p> Filtros </p>
              </div>
              <v-divider></v-divider>

              <v-btn-toggle class="d-flex flex-column w-100 h-100" color="blue-lighten-4" rounded="0" v-model="toggle">

                <v-btn class="pa-4" value="Extrato" @click="handleFilterValue()">
                  Extrato
                </v-btn>

                <v-btn class="pa-4" value="Status" @click="handleFilterValue()">
                  Status
                </v-btn>

                <v-btn class="pa-3" value="Porcentagem" @click="handleFilterValue()">
                  Porcentagem de <br> questão
                </v-btn>

                <v-btn class="pa-4" value="N Questões" @click="handleFilterValue()">
                  Nº de questões
                </v-btn>

                <v-btn class="pa-4" value="Nome" @click="handleFilterValue()">
                  Nome
                </v-btn>

              </v-btn-toggle>

            </v-sheet>

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

            <v-sheet rounded="lg" class="mt-6">



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
                    <v-row justify="space-around" no-gutters>
                      <v-col cols="3">
                        <v-btn @click="testaValores(item)"> TESTE </v-btn>
                      </v-col>

                      <v-col cols="3">
                        <Chart :chartData="item.chartData" />
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
    toggle: undefined


  }),

  created() {
    this.returnDadosTurma()
      .then((dados) => {
        // console.log(dados)

        // Quando a promessa for resolvida, atribua os dados à listaTurma
        this.listaTurma = dados.turma;
        this.listaTurma = this.getChartDatas(this.listaTurma);
      })
      .catch((error) => {
        // Em caso de erro, trate-o de acordo com a sua necessidade
        console.error("Erro ao buscar dados da turma:", error);
      }).finally(() => {
        // Define carregandoTurmas como false quando a promessa for resolvida ou rejeitada
        this.carregandoTurmas = false;
      });
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

    handleFilterValue() {
      console.log(this.toggle);
    },

    calculaHabilidades() {
      const habilidades = {};

      this.listaturma.listaQuest.forEach(questao => {
        if (questao.acertou) {
          const nivel = questao.id.split('_')[1]; // Obter o nível da habilidade (por exemplo, "H06")
          const numeroNivel = parseInt(nivel.slice(1, 3)); // Extrair o número do nível (por exemplo, 6)

          if (numeroNivel >= 0 && numeroNivel <= 11) {
            const habilidade = `H${numeroNivel.toString().padStart(2, '0')}`; // Formatar habilidade (por exemplo, "H06" para "H06")
            habilidades[habilidade] = (habilidades[habilidade] || 0) + 1;
          }
        }
      });
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

    getChartData(item) {
      const listaHabilidades = this.verificaHabilidades(item.listaQuest, true);
      const labels = Array.from({ length: 12 }, (_, i) => `H${(i).toString().padStart(2, '0')}`);

      const chartData = {
        labels: labels,
        datasets: [{
          label: 'Habilidades',
          data: listaHabilidades,
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

      return chartData;



    },

    getChartDatas(lista) {  
      
      

      for (let i = 0; i < lista.length; i++) {
        const objeto = lista[i];
        const dadosHabilidades = this.verificaHabilidades(objeto, true);

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

        
        objeto.chartData = novoChartData;
      }

      // console.log(lista)
      
      return lista;

    }

  },
  // FIM DO METHODSSSSSSS
  computed: {
    listaTurmaOrdenada() {
      if (this.toggle === "Nome") {
        return this.listaTurma.slice().sort((a, b) => (a.user['nome'] > b.user['nome']) ? 1 : -1);
      }
      else if (this.toggle === "Extrato") {
        const extratoOrder = { '3': 0, '2': 1, '1': 2, '': 3 };
        return this.listaTurma.slice().sort((a, b) => extratoOrder[a.extratoFinal] - extratoOrder[b.extratoFinal]);
      }
      else if (this.toggle === "Status") {
        const statusOrder = { 'Finalizado': 0, 'Iniciado': 1, 'Não Iniciado': 2 };
        return this.listaTurma.slice().sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
      }
      else if (this.toggle === "Porcentagem") {
        return this.listaTurma.slice().sort((a, b) => b.porcentagem_questoes - a.porcentagem_questoes);
      }
      else if (this.toggle === "N Questões") {
        return this.listaTurma.slice().sort((a, b) => b.numero_questoes_feitas - a.numero_questoes_feitas);
      }
      // Adicione condições semelhantes para outros tipos de filtragem, se necessário
      return this.listaTurma;
    },
  },



}
</script>

<style></style>