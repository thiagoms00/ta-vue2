<template>


  <v-sheet class="rounded-t-lg" :class="{ 'fade-in': animacaoListaAtiva }">
    <v-tabs v-model="tab" bg-color="#1E3892" class="rounded-t-lg">
      <v-tab value="p1" class="tab-name" @click="selectedTab(1)">Percurso 1</v-tab>
      <v-tab value="p2" class="tab-name" @click="selectedTab(2)">Percurso 2</v-tab>
      <v-tab value="p3" class="tab-name" @click="selectedTab(3)">Percurso 3</v-tab>
      <v-tab value="p4" class="tab-name" @click="selectedTab(4)">Percurso 4</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-row class="dflex align-center title-row">

        <v-col cols="3" class="d-flex justify-center">
          <v-btn class="title-btn" block :ripple="false" variant="text">Código</v-btn>
        </v-col>

        <v-col cols="3" class="d-flex justify-center">
          <v-btn class="title-btn" block :append-icon="icon[1]" :ripple="false" variant="text">Habilidade</v-btn>
        </v-col>

        <v-col cols="3" class="d-flex justify-center pr-13">
          <v-btn class="title-btn" block :append-icon="icon[2]" :ripple="false" variant="text">Acertos</v-btn>
        </v-col>
        <v-col cols="3" class="d-flex justify-center pr-15">
          <v-btn class="title-btn" block :append-icon="icon[3]" :ripple="false" variant="text">Tempo(segundos)</v-btn>
        </v-col>



      </v-row>
      <v-window-item value="p1">
        <v-sheet rounded="lg" class="" :class="{ 'fade-in': animacaoListaAtiva }">
          <v-expansion-panels variant="accordion" class="" v-model="expansionPanelModel[0]">
            <v-expansion-panel v-for="(item, index) in listaItens0" :key="item.id" ref="panels" class="rounded-b-lg"
              style="border-radius: 0px;" >
              <v-expansion-panel-title style="height: 5vh;" class="color-painel"
                @click="changeItem(index, this.tabNumber)">
                <v-row class="d-flex align-center">

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.id }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.habilidade }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.acertos }} %
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ formatTime(item.tempo) }}
                  </v-col>
                </v-row>

              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-sheet>
                  <v-row>
                    <v-col>
                      <v-table class="mt-2">
                        <tbody>
                          <tr>
                            <td class="td-left">ID</td>
                            <td class="td-right">{{ this.itemSelected.id }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ this.tabNumber}}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Resposta</td>
                            <td class="td-right">{{ this.itemSelected.resposta }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Fonte</td>
                            <td class="td-right">{{ this.itemSelected.fonte }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Layout</td>
                            <td class="td-right">{{ this.itemSelected.layout }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>

                <v-divider :thickness="4"></v-divider>
                <div class="btn-area">
                  <v-btn variant="outlined" class="item-btn" @click="openItem(index)">
                  Ver item</v-btn>
                </div>

                 <v-divider :thickness="4"></v-divider>
                

              </v-expansion-panel-text>

            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>

      </v-window-item>

      <v-window-item value="p2">
        <v-sheet rounded="lg" class="" :class="{ 'fade-in': animacaoListaAtiva }">
          <v-expansion-panels variant="accordion" class="" v-model="expansionPanelModel[1]">
            <v-expansion-panel v-for="(item,index) in listaItens1" :key="item.id" ref="panels" class="rounded-b-lg"
              style="border-radius: 0px;" >
            
              <v-expansion-panel-title style="height: 5vh;" class="color-painel"
              @click="changeItem(index, this.tabNumber)">
                <v-row class="d-flex align-center">

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.id }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.habilidade }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.acertos }} %
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ formatTime(item.tempo) }}
                  </v-col>
                </v-row>

              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-sheet>
                  <v-row>
                    <v-col>
                      <v-table class="mt-2">
                        <tbody>
                          <tr>
                            <td class="td-left">ID</td>
                            <td class="td-right">{{ this.itemSelected.id }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ this.tabNumber}}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Resposta</td>
                            <td class="td-right">{{ this.itemSelected.resposta }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Fonte</td>
                            <td class="td-right">{{ this.itemSelected.fonte }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Layout</td>
                            <td class="td-right">{{ this.itemSelected.layout }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>

                <v-divider :thickness="4"></v-divider>
                <div class="btn-area">
                  <v-btn variant="outlined" class="item-btn" @click="openItem(index)">
                  Ver item</v-btn>
                </div>

                 <v-divider :thickness="4"></v-divider>
                

              </v-expansion-panel-text>

             
            </v-expansion-panel>



          </v-expansion-panels>

        </v-sheet>

      </v-window-item>

      <v-window-item value="p3">
        <v-sheet rounded="lg" class="" :class="{ 'fade-in': animacaoListaAtiva }">
          <v-expansion-panels variant="accordion" class="" v-model="expansionPanelModel[2]">
            <v-expansion-panel v-for="(item,index) in listaItens2" :key="item.id" ref="panels" class="rounded-b-lg"
              style="border-radius: 0px;">

              <v-expansion-panel-title style="height: 5vh;" class="color-painel"
              @click="changeItem(index, this.tabNumber)">
                <v-row class="d-flex align-center">

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.id }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.habilidade }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.acertos }} %
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ formatTime(item.tempo) }}
                  </v-col>
                </v-row>

              </v-expansion-panel-title>


              <v-expansion-panel-text>
                <v-sheet>
                  <v-row>
                    <v-col>
                      <v-table class="mt-2">
                        <tbody>
                          <tr>
                            <td class="td-left">ID</td>
                            <td class="td-right">{{ this.itemSelected.id }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ this.tabNumber}}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Resposta</td>
                            <td class="td-right">{{ this.itemSelected.resposta }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Fonte</td>
                            <td class="td-right">{{ this.itemSelected.fonte }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Layout</td>
                            <td class="td-right">{{ this.itemSelected.layout }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>

                <v-divider :thickness="4"></v-divider>
                <div class="btn-area">
                  <v-btn variant="outlined" class="item-btn" @click="openItem(index)">
                  Ver item</v-btn>
                </div>

                 <v-divider :thickness="4"></v-divider>
                

              </v-expansion-panel-text>

            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>

      </v-window-item>

      <v-window-item value="p4">
        <v-sheet rounded="lg" class="" :class="{ 'fade-in': animacaoListaAtiva }">
          <v-expansion-panels variant="accordion" class="" v-model="expansionPanelModel[3]">
            <v-expansion-panel v-for="(item,index) in listaItens3" :key="item.id" ref="panels" class="rounded-b-lg"
              style="border-radius: 0px;">

              <v-expansion-panel-title style="height: 5vh;" class="color-painel"
              @click="changeItem(index, this.tabNumber)">
                <v-row class="d-flex align-center">

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.id }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.habilidade }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.acertos }} %
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ formatTime(item.tempo) }}
                  </v-col>
                </v-row>

              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-sheet>
                  <v-row>
                    <v-col>
                      <v-table class="mt-2">
                        <tbody>
                          <tr>
                            <td class="td-left">ID</td>
                            <td class="td-right">{{ this.itemSelected.id }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ this.tabNumber}}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Resposta</td>
                            <td class="td-right">{{ this.itemSelected.resposta }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Fonte</td>
                            <td class="td-right">{{ this.itemSelected.fonte }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Layout</td>
                            <td class="td-right">{{ this.itemSelected.layout }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>

                <v-divider :thickness="4"></v-divider>
                <div class="btn-area">
                  <v-btn variant="outlined" class="item-btn" @click="openItem(index)">
                  Ver item</v-btn>
                </div>

                 <v-divider :thickness="4"></v-divider>
                

              </v-expansion-panel-text>

            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>

      </v-window-item>
    </v-window>



  </v-sheet>
</template>

<script>
import DialogExcluirTeste from "@/components/DialogExcluirTeste.vue";
import ChartBar from "@/components/ChartBar.vue";
import TurmaProgInfo from "./TurmaProgInfo.vue";
import axios from 'axios';

//Informações sobre os itens.
import jsonDataQuestoes0 from '../assets/questao/questoes_extrato0.json';
import jsonDataQuestoes1 from '../assets/questao/questoes_extrato1.json';              //Primeiro estrato a ser utilizado.
import jsonDataQuestoes2 from '../assets/questao/questoes_extrato2.json';
import jsonDataQuestoes3 from '../assets/questao/questoes_extrato3.json';

export default {
  name: "TurmaItensInfo",

  components: {
    DialogExcluirTeste,
    ChartBar,
    TurmaProgInfo,
  },

  data: () => ({
    animacaoListaAtiva: false,
    icon: ["", "", "", "", "", ""],
    tab: null,
    listaTurma: [],
    listaItens0: [],
    listaItens1: [],
    listaItens2: [],
    listaItens3: [],

    listaItens: [], //Itens sendo exibidos, começando pelo estrato 1.

    itemSelected: {
      id: '',
      percurso: '',
      resposta: '',
      fonte: '',
      layout: '',
    },

    questoesP1: [],
    questoesP2: [],
    questoesP3: [],
    questoesP4: [],
    tabNumber: 1,
    lastIndex : 0,
    expansionPanelModel: [null, null, null, null],


  }),

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

  created() {
    this.returnItens();

    this.questoesP1 = jsonDataQuestoes0.questoes;
    this.questoesP2 = jsonDataQuestoes1.questoes;
    this.questoesP3 = jsonDataQuestoes2.questoes;
    this.questoesP4 = jsonDataQuestoes3.questoes;

    /* Dados que vão ser exibidos no expansive-text */
    this.itemSelected.id = this.questoesP1[0].id;
    this.itemSelected.layout = this.questoesP1[0].layout;
    this.itemSelected.percurso = 1;
    this.itemSelected.resposta = this.questoesP1[0].answer;
    this.itemSelected.fonte = this.questoesP1[0].fonte;

    console.log(this.itemSelected)
    console.log('x')


  },

  mounted() {
    this.listaTurma = this.listaDeAlunos;
  },


  emits: ["eventDeleteTest"],

  methods: {

    selectedTab(tabNum) {
      this.tabNumber = tabNum;
      this.expansionPanelModel = [null, null, null, null];

    },

    openItem(index){
      let dadosItem = {
        index : index,
        percurso: this.tabNumber
      }
      const routeData = this.$router.resolve({
        name: 'Itens',  
        query: { data: JSON.stringify(dadosItem) }
      });

      window.open(routeData.href, '_blank');
    },

    changeItem(index, percurso) {
      this.newIndex = index; //para o changeItem do changeTab
      switch (percurso) {
        case 1:
          this.itemSelected.id = this.questoesP1[index].id;
          this.itemSelected.layout = this.questoesP1[index].layout;
          this.itemSelected.percurso = 1;
          this.itemSelected.resposta = this.questoesP1[index].answer;
          this.itemSelected.fonte = this.questoesP1[index].fonte;
          break;
        case 2:
          console.log(index)
          this.itemSelected.id = this.questoesP2[index].id;
          this.itemSelected.layout = this.questoesP2[index].layout;
          this.itemSelected.percurso = 2;
          this.itemSelected.resposta = this.questoesP2[index].answer;
          this.itemSelected.fonte = this.questoesP2[index].fonte; 

          break;
        case 3:
          this.itemSelected.id = this.questoesP3[index].id;
          this.itemSelected.layout = this.questoesP3[index].layout;
          this.itemSelected.percurso = 3;
          this.itemSelected.resposta = this.questoesP3[index].answer;
          this.itemSelected.fonte = this.questoesP3[index].fonte;
          break;
        case 4:
          this.itemSelected.id = this.questoesP4[index].id;
          this.itemSelected.layout = this.questoesP4[index].layout;
          this.itemSelected.percurso = 4;
          this.itemSelected.resposta = this.questoesP4[index].answer;
          this.itemSelected.fonte = this.questoesP4[index].fonte;
          break;
        default:
          break;
      }
    },

    

    returnItens() {

      axios({ url: 'https://ta-back.onrender.com/professores/dadosItens', method: 'POST' })
        .then((response) => {
          this.listaItens = response.data.itens.listaItens1
          this.listaItens0 = response.data.itens.listaItens0
          this.listaItens1 = response.data.itens.listaItens1
          this.listaItens2 = response.data.itens.listaItens2
          this.listaItens3 = response.data.itens.listaItens3
          /* Indo do percurso 1 ao 4 */
          console.log(this.listaItens0)
          console.log(this.listaItens1)
          console.log(this.listaItens2)
          console.log(this.listaItens3)



        })

        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });
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


  },
};
</script>

<style scoped>


.item-btn{
  font-size: 0.9rem;
  margin-left: 1vw;
  font-weight: 600;
}

.title-btn {
  font-size: 0.9rem;
  font-weight: 600;
  height: 5vh;
}

.td-left {
  font-weight: bold;
  font-size: 0.95rem;
}

.td-right {
  font-weight: 400;
  font-size: 0.95rem;

}

.btn-area{
  display: flex;
  flex-direction: row;
  height: 7vh;
  align-items: center;
  padding-left: 2vh;
}

</style>