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
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">

              <v-table>
                <thead>
                  <tr class="">
                    <th class="text-left">
                      Matrícula
                    </th>
                    <th class="text-left">
                      Nome
                    </th>
                    <th class="text-left">
                      Extrato Final
                    </th>
                    <th class="text-left">
                      Porcentagem de Acerto
                    </th>
                    <th class="text-left">
                      Nº de Questões Feitas
                    </th>
                    
                    <th class="text-left">
                      Status de Atividade
                    </th>
                  </tr>
                </thead>

                <tbody>

                  <tr v-for="item in listaTurma" :key="item.nome">

                    <td>{{ item.user['mat'] }}</td>
                    <td>{{ item.user['nome'] }}</td>
                    <td>{{ item.extratoFinal }}</td>
                    
                    <td>{{ item.porcentagem_questoes }} % </td>
                    <td>{{ item.numero_questoes_feitas }}</td>
                    
                    <td>
                      <v-chip :color="getColor(item.status)" :prepend-icon="getIcon(item.status)">
                        {{ item.status }}
                      </v-chip>
                    </td>

                  </tr>

                  <!-- <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader> -->




                </tbody>
              </v-table>

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
    chipValue : ''

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
      } else if(chipValue === 'Finalizado'){
          return 'green'; // Vermelho (ou qualquer outra cor padrão)
      }
    },

    getIcon(chipValue) {
      
      if (chipValue === 'Não Iniciado') {
          return 'mdi-cancel'; // Default
      } else if (chipValue === 'Iniciado') {
          return 'mdi-minus-circle'; // Verde
      } else if(chipValue === 'Finalizado'){
          return 'mdi-checkbox-marked-circle'; // Vermelho (ou qualquer outra cor padrão)
      }
    }
  }
}
</script>