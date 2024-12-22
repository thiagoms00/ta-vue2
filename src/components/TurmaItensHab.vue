<template>

  <v-sheet class="rounded-t-lg" :class="{ 'fade-in': animacaoListaAtiva }">

    <v-tabs v-model="tab" bg-color="#1E3892" class=" mx-auto rounded-t-lg tab-toolbar">


      <v-tab value="p1" class="tab-name" @click="selectedTab(1)">H01</v-tab>
      <v-tab value="p2" class="tab-name" @click="selectedTab(2)">H02</v-tab>
      <v-tab value="p3" class="tab-name" @click="selectedTab(3)">H03</v-tab>
      <v-tab value="p4" class="tab-name" @click="selectedTab(4)">H04</v-tab>
      <v-tab value="p5" class="tab-name" @click="selectedTab(5)">H05</v-tab>
      <v-tab value="p6" class="tab-name" @click="selectedTab(1)">H06</v-tab>
      <v-tab value="p7" class="tab-name" @click="selectedTab(2)">H07</v-tab>
      <v-tab value="p8" class="tab-name" @click="selectedTab(3)">H08</v-tab>
      <v-tab value="p9" class="tab-name" @click="selectedTab(4)">H09</v-tab>
      <v-tab value="p10" class="tab-name" @click="selectedTab(5)">H10</v-tab>
      <v-tab value="p11" class="tab-name" @click="selectedTab(5)">H11</v-tab>
      <v-tab value="p12" class="tab-name" @click="selectedTab(6)">Reportados</v-tab>
      <v-tab value="p13" class="tab-name" @click="selectedTab(6)">Pendentes</v-tab>

      <v-spacer></v-spacer>

    </v-tabs>

    <v-skeleton-loader type="table-tbody" v-if="loadingSkeleton">
    </v-skeleton-loader>

    <v-window v-model="tab" v-if="!loadingSkeleton">

      <v-row class="dflex align-center title-row">

        <v-col cols="3" class="d-flex justify-center">
          <v-btn class="title-btn" block :ripple="false" variant="text">{{ colmunTitles[0] }}</v-btn>
        </v-col>

        <v-col cols="3" class="d-flex justify-center">
          <v-btn class="title-btn" block :append-icon="icon[1]" :ripple="false" variant="text">{{ colmunTitles[1]
            }}</v-btn>
        </v-col>

        <v-col cols="3" class="d-flex justify-center pr-9">
          <v-btn class="title-btn" block :append-icon="icon[2]" :ripple="false" variant="text">{{ colmunTitles[2]
            }}</v-btn>
        </v-col>
        <v-col cols="3" class="d-flex justify-center pr-15">
          <v-btn class="title-btn pr-11" block :append-icon="icon[3]" :ripple="false" variant="text">{{ colmunTitles[3]
            }}</v-btn>
        </v-col>



      </v-row>

      <!-- Conteudo de cada TAB -->
      <v-window-item v-for="(item, index) in windowValues" :value="item">
        <v-sheet rounded="lg" class="" :class="{ 'fade-in': animacaoListaAtiva }">
          <v-expansion-panels variant="accordion" class="" v-model="expansionPanelModel[0]">
            <v-expansion-panel v-for="(item, index) in listaItensH[index]" :key="item.id" ref="panels"
              class="rounded-b-lg" style="border-radius: 0px;">
              <v-expansion-panel-title style="height: 5vh;" class="color-painel"
                @click="obtemDadosItem(item.id, item.nestr + 1)">
                <v-row class="d-flex align-center">

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.id }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.nestr + 1 }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    Geral
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    <span v-if="item.status === 'Disponivel'" class="color-disponivel">
                      {{ item.status }}
                    </span>
                    <span v-if="item.status === 'Em revisão'" class="color-revisao">
                      {{ item.status }}
                    </span>
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
                            <td class="td-right">{{ item.nestr + 1 }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Resposta</td>
                            <td class="td-right">{{ this.itemSelected.resposta }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Total de exposições</td>
                            <td class="td-right">{{ item.dadosAlt.qtdA+item.dadosAlt.qtdB+
                               item.dadosAlt.qtdC +item.dadosAlt.qtdD
                              }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Nível de exposição </td>
                            <td class="td-right">{{ calculaNivelExp(item.dadosAlt.qtdA+item.dadosAlt.qtdB+
                               item.dadosAlt.qtdC +item.dadosAlt.qtdD)}}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percentual de Acerto</td>
                            <td class="td-right">{{ 
                              calculaPercAcerto(item) + ' %'
                              }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percentual de escolha: <span class="alt-span">a</span></td>
                            <td class="td-right">{{ calculaPercAlt(item.dadosAlt.qtdA,
                              item.dadosAlt.qtdA + item.dadosAlt.qtdB + item.dadosAlt.qtdC + item.dadosAlt.qtdD
                            ) + ' %' }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percentual de escolha: <span class="alt-span">b</span></td>
                            <td class="td-right">{{ calculaPercAlt(item.dadosAlt.qtdB,
                              item.dadosAlt.qtdA + item.dadosAlt.qtdB + item.dadosAlt.qtdC+item.dadosAlt.qtdD)+ ' %'  }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percentual de escolha: <span class="alt-span">c</span></td>
                            <td class="td-right">{{ calculaPercAlt(item.dadosAlt.qtdC,
                              item.dadosAlt.qtdA + item.dadosAlt.qtdB + item.dadosAlt.qtdC+item.dadosAlt.qtdD) +' %' }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percentual de escolha: <span class="alt-span">d</span></td>
                            <td class="td-right">{{ calculaPercAlt(item.dadosAlt.qtdD,
                              item.dadosAlt.qtdA + item.dadosAlt.qtdB + item.dadosAlt.qtdC+item.dadosAlt.qtdD) + ' %' }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Referência</td>
                            <td class="td-right">{{ this.itemSelected.fonte }}</td>
                          </tr>
                         <!--  <tr>
                            <td class="td-left">Layout</td>
                            <td class="td-right">{{ this.itemSelected.layout }}</td>
                          </tr> -->
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>

                <v-divider :thickness="1"></v-divider>
                <div class="btn-area">
                  <v-btn variant="outlined" class="item-btn" @click="openItemHab(item.nestr + 1, this.itemSelected.id)">
                    Ver item
                  </v-btn>

                <!--   <v-btn variant="outlined" class="item-btn" @click="reportDialog = true">
                    Reportar item
                  </v-btn> -->
                </div>

                <v-divider :thickness="5" color="blue"></v-divider>


              </v-expansion-panel-text>

            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>

      </v-window-item>


      <!-- Janela dos itens reportados -->


      <v-window-item value="p12">
        <v-sheet rounded="lg" class="" :class="{ 'fade-in': animacaoListaAtiva }">
          <v-expansion-panels variant="accordion" class="" v-model="expansionPanelModel[3]">
            <v-expansion-panel v-for="(item, index) in listaItensReportados" :key="item.id" ref="panels"
              class="rounded-b-lg" style="border-radius: 0px;">

              <v-expansion-panel-title style="height: 5vh;" class="color-painel"
                @click="changeItem(index, this.tabNumber)">
                <v-row class="d-flex align-center">

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.idItem }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.percurso }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.emailAdmin }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.dataErro }}
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
                            <td class="td-right">{{ item.idItem }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ item.percurso }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Administrador</td>
                            <td class="td-right">{{ item.emailAdmin }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Erro</td>
                            <td class="td-right">{{ item.msgErro }}</td>
                          </tr>

                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>

                <!-- <v-divider :thickness="4"></v-divider>
                  <div class="btn-area">
                     <v-btn variant="outlined" class="item-btn" @click="openItem(index)">
                      Ver item</v-btn> 
                  </div> -->

                <v-divider :thickness="4"></v-divider>


              </v-expansion-panel-text>

            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>

      </v-window-item>

      <!-- Janela dos itens sugeridos -->
      <v-window-item value="p13">
        <v-sheet rounded="lg" class="" :class="{ 'fade-in': animacaoListaAtiva }">
          <v-expansion-panels variant="accordion" class="" v-model="expansionPanelModel[3]">
            <v-expansion-panel v-for="(item, index) in listaItensSugeridos" :key="item.id" ref="panels"
              class="rounded-b-lg" style="border-radius: 0px;">

              <v-expansion-panel-title style="height: 5vh;" class="color-painel"
                @click="changeItem(index, this.tabNumber)">
                <v-row class="d-flex align-center">

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.idItem }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.percurso }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.emailAdmin }}
                  </v-col>

                  <v-col cols="3" class="d-flex justify-center">
                    {{ item.data }}
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
                            <td class="td-right">{{ item.idItem }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Habilidade</td>
                            <td class="td-right">{{ item.hab }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Percurso</td>
                            <td class="td-right">{{ item.percurso }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Administrador</td>
                            <td class="td-right">{{ item.emailAdmin }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Comando</td>
                            <td class="td-right">{{ item.comando }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Alternativa 1</td>
                            <td class="td-right">{{ item.alt1 }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Alternativa 2</td>
                            <td class="td-right">{{ item.alt2 }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Alternativa 3</td>
                            <td class="td-right">{{ item.alt3 }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Alternativa 4</td>
                            <td class="td-right">{{ item.alt4 }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Resposta</td>
                            <td class="td-right">{{ item.resposta }}</td>
                          </tr>
                          <tr>
                            <td class="td-left">Fonte</td>
                            <td class="td-right">{{ item.fonte }}</td>
                          </tr>


                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                </v-sheet>
                <v-divider :thickness="4"></v-divider>


              </v-expansion-panel-text>

            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>

      </v-window-item>

    </v-window>
    <!-- Dialog de report -->
    <v-dialog v-model="reportDialog" width="auto">
      <v-card min-width="700">

        <v-toolbar color="#1E3892" density="comfortable">
          <v-icon icon="mdi-alert-circle-outline" class="ml-5"></v-icon>
          <v-toolbar-title class="ml-2 toolbar-title">Reportar Item</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <template v-slot:actions class="">
          <div class="d-flex flex-column report-area pa-5">
            <h4 class="ml-2 report-id">{{ this.itemSelected.id }}</h4>
            <v-text-field clearable label="Erro" variant="outlined" class="mt-5" v-model="errorModel"
              :rules="[rules.required]">
            </v-text-field>
            <div class="report-buttons d-flex mt-5">
              <v-btn variant="outlined" class="mx-auto report-button" text="Reportar"
                @click="reportaItem(this.itemSelected)"></v-btn>
              <v-btn variant="outlined" class="mx-auto report-button" text="Voltar"
                @click="reportDialog = false, clearErrorField()"></v-btn>
            </div>
          </div>

        </template>
      </v-card>
    </v-dialog>

    <!-- Dialog de report bem sucedido-->

    <v-dialog v-model="reportSuccess" width="auto">
      <v-card min-width="500">

        <v-toolbar color="#1E3892" density="comfortable">
          <v-icon icon="mdi-alert-circle-outline" class="ml-5"></v-icon>
          <v-toolbar-title class="ml-2 toolbar-title">Reportar Item</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <template v-slot:actions class="">
          <div class="d-flex flex-column report-area pa-5">
            <h4 class="mx-auto report-success-text">O Item foi reportado com sucesso!!</h4>
            <div class="report-buttons d-flex mt-5">
              <v-btn variant="outlined" class="mx-auto report-button" text="Fechar"
                @click="reportSuccess = false, clearErrorField()"></v-btn>
            </div>
          </div>

        </template>
      </v-card>
    </v-dialog>



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
    loadingSkeleton: true,

    animacaoListaAtiva: false,
    icon: ["", "", "", "", "", ""],
    tab: null,
    listaTurma: [],   //Lista com os alunos.
    listaItens0: [],  //Lista de Itens do percurso 1
    listaItens1: [],  //Lista de Itens do percurso 2
    listaItens2: [],  //Lista de Itens do percurso 3
    listaItens3: [],  //Lista de Itens do percurso 4
    listaPercursos : [],


    listaItensH: [],
    listaItensH01: [],
    listaItensH02: [],
    listaItensH03: [],
    listaItensH04: [],
    listaItensH05: [],
    listaItensH06: [],
    listaItensH07: [],
    listaItensH08: [],
    listaItensH09: [],
    listaItensH10: [],
    listaItensH11: [],
    windowValues: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11'],


    listaItensReportados: [], //Lista com os itens reportados

    listaItens: [], //Itens sendo exibidos, começando pelo estrato 1.

    itemSelected: {
      id: '',
      percurso: '',
      resposta: '',
      fonte: '',
      layout: '',
      dadosAlt: {},
    },

    questoesP1: [],
    questoesP2: [],
    questoesP3: [],
    questoesP4: [],
    tabNumber: 1,
    lastIndex: 0,
    expansionPanelModel: [null, null, null, null],
    reportDialog: false,  // Variavel de controle do dialog de report.
    reportSuccess: false, // Variavel de controle do dialog de report bem sucedido.
    errorModel: '', //Model do text-field de erro.
    colmunTitles: ['Código', 'Percurso', 'Aprendizagem', 'Status'], //Títulos que aparecem nas colunas.
    itemExibition: 'habilidades',
    listaItensSugeridos: [],
    percursoInfo : true,
    totalTent : 0,   //conta quantas vezes os itens foram respondidos(todos os percursos)
    rules: {  //Objeto utilizado para verificar se um campo obrigatório foi preenchido.
      required: value => !!value || 'Campo obrigatório',
    },
  }),

  props: {

  },

  watch: {
    // Observa mudanças em `listaDeAlunos`
    /* listaDeAlunos(newVal) {
      this.listaTurma = newVal;
    }, */

  },

  created() {
    this.returnItens();
    this.returnItensReportados();
    this.returnItensHab();
    this.returnItensSugeridos();


    this.questoesP1 = jsonDataQuestoes0.questoes;
    this.questoesP2 = jsonDataQuestoes1.questoes;
    this.questoesP3 = jsonDataQuestoes2.questoes;
    this.questoesP4 = jsonDataQuestoes3.questoes;

    /* Dados que vão ser exibidos no expansive-text */
    this.itemSelected.id = this.questoesP1[0].id;
    this.itemSelected.layout = this.questoesP1[0].layout;
    this.itemSelected.percurso = 1;
    this.itemSelected.resposta = this.questoesP1[0].answer;
    this.itemSelected.fonte = this.questoesP1[0].fonte
    this.itemSelected.dadosAlt = {}


  },

  mounted() {
    this.listaTurma = this.listaDeAlunos;
  },


  emits: ["eventDeleteTest"],

  methods: {

    calculaPercAcerto(item){
      let tentativas = item.dadosAlt.qtdA+item.dadosAlt.qtdB+item.dadosAlt.qtdC+item.dadosAlt.qtdD;
      let acertos = item.dadosAlt.acertosA+item.dadosAlt.acertosB+item.dadosAlt.acertosC+item.dadosAlt.acertosD;
      if(tentativas === 0 || acertos === 0){
        return 0;
      }
      else{
        const percAcerto = (acertos*100)/tentativas;
        return percAcerto.toFixed(2);
      }
    },

    calculaNivelExp(qtdItem){
      let perc = (qtdItem*100)/this.totalTent;
      if(perc >= 70){
        return 'Muito exposto'
      }
      else if(perc<70 && perc>=20){
        return 'Exposto moderadamente'
      }
      else if(perc<20 && perc>=1){
        return 'Pouco exposto'
      }
      else{
        return 'Não aplicado'
      }
    },

    obtemDadosItem(id, percurso) {
      let item;

      switch (percurso) {
        case 1:
          item = this.questoesP1.find(item => item.id === id);
          this.itemSelected.id = item.id;
          this.itemSelected.layout = item.layout;
          this.itemSelected.percurso = item.percurso;
          this.itemSelected.resposta = item.answer;
          this.itemSelected.fonte = item.fonte;
          this.itemSelected.dadosAlt = item.dadosAlt;
          break;
        case 2:
          item = this.questoesP2.find(item => item.id === id);
          this.itemSelected.id = item.id;
          this.itemSelected.layout = item.layout;
          this.itemSelected.percurso = item.percurso;
          this.itemSelected.resposta = item.answer;
          this.itemSelected.fonte = item.fonte;
          this.itemSelected.dadosAlt = item.dadosAlt;

          break;
        case 3:
          item = this.questoesP3.find(item => item.id === id);
          this.itemSelected.id = item.id;
          this.itemSelected.layout = item.layout;
          this.itemSelected.percurso = item.percurso;
          this.itemSelected.resposta = item.answer;
          this.itemSelected.fonte = item.fonte;
          this.itemSelected.dadosAlt = item.dadosAlt;

          break;
        case 4:
          item = this.questoesP4.find(item => item.id === id);
          this.itemSelected.id = item.id;
          this.itemSelected.layout = item.layout;
          this.itemSelected.percurso = item.percurso;
          this.itemSelected.resposta = item.answer;
          this.itemSelected.fonte = item.fonte;
          this.itemSelected.dadosAlt = item.dadosAlt;

          break;
      }
      //console.log(item)
      console.log(item)

    },

    //Função que envia um item reportado para o back-end.
    async reportaItem(item) {
      if (this.errorModel != '') {
        this.reportDialog = false;
        this.reportSuccess = true;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('pt-BR');
        const itemReportado = {
          idItem: item.id,
          idAdmin: localStorage.getItem('idAdmin'),
          tokenAdmin: localStorage.getItem('tokenAdmin'),
          msgErro: this.errorModel,
          percurso: this.tabNumber,
          dataErro: formattedDate,
        }
        console.log(`Item reportado: ${JSON.stringify(itemReportado)}`);
        const data = itemReportado;

        axios({ url: 'https://ta-back.onrender.com/admin/reportItens', data, method: 'POST' })
          .then((response) => {
            console.log(`Status da resposta do servidor: ${response.status} \n`);
            console.log(`Mensagem do servidor: ${response.data.message}`);
            this.returnItensReportados();
            this.returnItens();
          })

          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
      }

    },

    //Função que limpa o text field do erro de item reportado.
    clearErrorField() {
      this.errorModel = '';
    },

    selectedTab(tabNum) {
      this.tabNumber = tabNum;
      this.expansionPanelModel = [null, null, null, null];
      if (tabNum === 6) {
        this.colmunTitles = ['Código', 'Percurso', 'Administrador', 'Data']
      }
      else {
        this.colmunTitles = ['Código', 'Habilidade', 'Aprendizagem', 'Status']
      }

    },

    openItem(index) {

      let dadosItem = {
        index: index,
        percurso: this.tabNumber
      }
      const routeData = this.$router.resolve({
        name: 'Itens',
        query: { data: JSON.stringify(dadosItem) }
      });

      window.open(routeData.href, '_blank');
    },

    //Abre o Item selecionado em uma nova TAB (Precisa do percurso e do ID)
    openItemHab(percursoItem, id) {
      let index = 0;
      switch (percursoItem) {
        case 1:
          index = this.questoesP1.findIndex(item => item.id === id);

          break;
        case 2:
          index = this.questoesP2.findIndex(item => item.id === id);

          break;
        case 3:
          index = this.questoesP3.findIndex(item => item.id === id);

          break;
        case 4:
          index = this.questoesP4.findIndex(item => item.id === id);
          break;
      }

      let dadosItem = {
        index: index,
        percurso: percursoItem
      }
      const routeData = this.$router.resolve({
        name: 'Itens',
        query: { data: JSON.stringify(dadosItem) }
      });

      window.open(routeData.href, '_blank');
    },

    //Muda o item selecionado na tabela.
    changeItem(index, percurso) {
      this.newIndex = index; //para o changeItem do changeTab
      switch (percurso) {
        case 1:
          this.itemSelected.id = this.listaItensH01[index].id;
          this.itemSelected.layout = this.listaItensH01[index].layout;
          this.itemSelected.percurso = this.listaItensH01[index].nestr;
          this.itemSelected.resposta = this.listaItensH01[index].answer;
          this.itemSelected.fonte = this.listaItensH01[index].fonte;
          break;
        case 2:
          this.itemSelected.id = this.listaItensH02[index].id;
          this.itemSelected.layout = this.listaItensH02[index].layout;
          this.itemSelected.percurso = 2;
          this.itemSelected.resposta = this.listaItensH02[index].answer;
          this.itemSelected.fonte = this.listaItensH02[index].fonte;
          break;
        case 3:
          this.itemSelected.id = this.listaItensH03[index].id;
          this.itemSelected.layout = this.listaItensH03[index].layout;
          this.itemSelected.percurso = 3;
          this.itemSelected.resposta = this.listaItensH03[index].answer;
          this.itemSelected.fonte = this.listaItensH03[index].fonte;
          break;
        case 4:
          this.itemSelected.id = this.listaItensH04[index].id;
          this.itemSelected.layout = this.listaItensH04[index].layout;
          this.itemSelected.percurso = 4;
          this.itemSelected.resposta = this.listaItensH04[index].answer;
          this.itemSelected.fonte = this.listaItensH04[index].fonte;
          break;
        case 5:
          this.itemSelected.id = this.listaItensH05[index].id;
          this.itemSelected.layout = this.listaItensH05[index].layout;
          this.itemSelected.percurso = 4;
          this.itemSelected.resposta = this.listaItensH05[index].answer;
          this.itemSelected.fonte = this.listaItensH05[index].fonte;
          break;
        case 6:
          this.itemSelected.id = this.listaItensH06[index].id;
          this.itemSelected.layout = this.listaItensH06[index].layout;
          this.itemSelected.percurso = 4;
          this.itemSelected.resposta = this.listaItensH06[index].answer;
          this.itemSelected.fonte = this.listaItensH06[index].fonte;
          break;
        case 7:
          this.itemSelected.id = this.listaItensH07[index].id;
          this.itemSelected.layout = this.listaItensH07[index].layout;
          this.itemSelected.percurso = 4;
          this.itemSelected.resposta = this.listaItensH07[index].answer;
          this.itemSelected.fonte = this.listaItensH07[index].fonte;
          break;
        case 8:
          this.itemSelected.id = this.listaItensH08[index].id;
          this.itemSelected.layout = this.listaItensH08[index].layout;
          this.itemSelected.percurso = 4;
          this.itemSelected.resposta = this.listaItensH08[index].answer;
          this.itemSelected.fonte = this.listaItensH08[index].fonte;
          break;
        case 9:
          this.itemSelected.id = this.listaItensH09[index].id;
          this.itemSelected.layout = this.listaItensH09[index].layout;
          this.itemSelected.percurso = 4;
          this.itemSelected.resposta = this.listaItensH09[index].answer;
          this.itemSelected.fonte = this.listaItensH09[index].fonte;
          break;
        case 10:
          this.itemSelected.id = this.listaItensH10[index].id;
          this.itemSelected.layout = this.listaItensH10[index].layout;
          this.itemSelected.percurso = 4;
          this.itemSelected.resposta = this.listaItensH10[index].answer;
          this.itemSelected.fonte = this.listaItensH10[index].fonte;
          break;
        case 11:
          this.itemSelected.id = this.listaItensH11[index].id;
          this.itemSelected.layout = this.listaItensH11[index].layout;
          this.itemSelected.percurso = 4;
          this.itemSelected.resposta = this.listaItensH11[index].answer;
          this.itemSelected.fonte = this.listaItensH11[index].fonte;
          break;


        default:
          break;
      }
    },

    //Retorna um objeto com os itens separados por habilidade.
    returnItensHab() {

      const data = {
        idAdmin: localStorage.getItem('idAdmin'),
        tokenAdmin: localStorage.getItem('tokenAdmin'),
      }
      axios({
        url: 'https://ta-back.onrender.com/admin/dadosItensHab',
        data,
        method: 'POST'
      })
        .then((response) => {


          this.listaItensH = [response.data.itens.listaItensH01, response.data.itens.listaItensH02,
          response.data.itens.listaItensH03, response.data.itens.listaItensH04, response.data.itens.listaItensH05,
          response.data.itens.listaItensH06, response.data.itens.listaItensH07, response.data.itens.listaItensH08,
          response.data.itens.listaItensH09, response.data.itens.listaItensH10, response.data.itens.listaItensH11
          ]


          this.listaItensH01 = response.data.itens.listaItensH01;
          this.listaItensH02 = response.data.itens.listaItensH02;
          this.listaItensH03 = response.data.itens.listaItensH03;
          this.listaItensH04 = response.data.itens.listaItensH04;
          this.listaItensH05 = response.data.itens.listaItensH05;
          this.listaItensH06 = response.data.itens.listaItensH06;
          this.listaItensH07 = response.data.itens.listaItensH07;
          this.listaItensH08 = response.data.itens.listaItensH08;
          this.listaItensH09 = response.data.itens.listaItensH09;
          this.listaItensH10 = response.data.itens.listaItensH10;
          this.listaItensH11 = response.data.itens.listaItensH11;


        })

        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });
    },

    //Retorna um objeto com os itens separados por percurso.

    returnItens() {

      axios({
        url: 'https://ta-back.onrender.com/professores/dadosItens',
        method: 'POST'
      })
        .then((response) => {
          this.listaItens = response.data.itens.listaItens1;
          this.listaItens0 = response.data.itens.listaItens0;
          this.listaItens1 = response.data.itens.listaItens1;
          this.listaItens2 = response.data.itens.listaItens2;
          this.listaItens3 = response.data.itens.listaItens3;
          this.listaPercursos = response.data.listaPercursos;
          for(const number in this.listaPercursos){                   //Obtendo o total de tentativas.
            this.totalTent += this.listaPercursos[number].tentativas;
          }

        })

        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });
    },

    returnItensReportados() {
      const data = {
        idAdmin: localStorage.getItem('idAdmin'),
        tokenAdmin: localStorage.getItem('tokenAdmin'),
      }
      axios({
        url: 'https://ta-back.onrender.com/admin/returnReported',
        data,
        method: 'POST'
      })
        .then((response) => {
          this.listaItensReportados = response.data.itens_reportados;

        })

        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });
    },

    returnItensSugeridos() {
      const data = {
        idAdmin: localStorage.getItem('idAdmin'),
        tokenAdmin: localStorage.getItem('tokenAdmin'),
      }
      axios({
        url: 'https://ta-back.onrender.com/admin/returnSuggested',
        data,
        method: 'POST'
      })
        .then((response) => {
          this.listaItensSugeridos = response.data.itens_sugeridos;
          console.log(this.listaItensSugeridos);
          this.loadingSkeleton = !this.loadingSkeleton;

        })

        .catch((error) => {
          console.error(error);
        });
    },

    calculaPercAlt(acertos, qtd) {
      if (Number(qtd) === 0 || isNaN(Number(qtd))) {
     
        return 0; // Retorna 0 ou outro valor padrão
      }

      const resultado = Number(acertos) * 100 / Number(qtd);
      const resultadoFormatado = parseFloat(resultado.toFixed(2));

      console.log(`${acertos} ${qtd}`);
      console.log(`${resultadoFormatado}`);

      return resultadoFormatado;
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
@font-face {
  font-family: 'Urbanist-SB';
  src: url(../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf);
}

.item-btn {
  font-size: 0.9rem;
  margin-left: 1vw;
  font-weight: 600;
  font-family: 'Urbanist-Regular';

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

.btn-area {
  display: flex;
  flex-direction: row;
  height: 7vh;
  align-items: center;
  padding-left: 2vh;
}

.report-card {
  width: 500px;
  height: 25vh;

}

.toolbar-title {
  font-family: 'Urbanist-Regular';
  font-size: 1.3rem;

}

.report-area {
  width: 100%;
}

.report-buttons {
  width: 100%;
}

.report-id {
  font-size: 1.05rem;
}

.report-button {
  width: 10vw;
  height: 4vh;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Urbanist-Regular';
}

.report-success-text {
  font-size: 1.5rem;
  font-family: 'Urbanist-Regular';
}

.tab-name {
  font-family: 'Urbanist-Regular';
  font-size: 0.90rem;
  font-weight: bold;
}

.percurso-select {
  font-family: 'Urbanist-Regular';
  font-size: 3rem !important;
  font-weight: bold;
  color: #FFF;
  text-align: center;
}

.change-exibition {
  font-family: 'Urbanist-Regular';
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.6vh;
  margin-right: 0.4vw;
}

.color-disponivel {
  color: #34a52a !important;
  font-weight: 600;
}

.color-revisao {
  color: #ee4e4e !important;
  font-weight: 600;
}

.alt-span{
  font-weight: bold !important;
  font-size: 1.03rem;
}
</style>