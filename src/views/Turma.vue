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
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item v-for="n in 5" :key="n" :title="`Turma ${n}`" link></v-list-item>
              </v-list>
            </v-sheet>

            <v-sheet rounded="lg" class="mt-5">
              <v-list rounded="lg">
                <v-list-item variant="elevated"> Filtro </v-list-item>
                <v-list-item> % de Acerto </v-list-item>
                <v-list-item> Extrato </v-list-item>
                <v-list-item> Status </v-list-item>
                <v-list-item> Nº de Questões </v-list-item>

              </v-list>
            </v-sheet>

          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">

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



              <v-expansion-panels variant="accordion" class="mt-4">
                <v-expansion-panel v-for="(item) in listaTurma" :key="item.nome"
                  :readonly="item.status !== 'Finalizado'">


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
          item.porcentagem_questoes + '%' }}
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
                        <v-text-field> OI </v-text-field>
                      </v-col>

                      <v-col cols="3">
                        <v-text-field> OI </v-text-field>
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

export default {
  name: 'Turma',

  data: () => ({

    listaTurma: [],
    carregandoTurmas: true,
    chipValue: ''

  }),

  created() {
    this.returnDadosTurma()
      .then((dados) => {
        console.log(dados)

        // Quando a promessa for resolvida, atribua os dados à listaTurma
        this.listaTurma = dados.turma;
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
  }
}
</script>

<style>
thead tr {
  background-color: #ffffff;
  /* Cor de fundo branca para a linha de títulos */
}

.even-row {
  background-color: #CFE2F3;
  /* Cor para as linhas pares */
}

.odd-row {
  background-color: #F0F8FF;
  /* Cor para as linhas ímpares */
}
</style>