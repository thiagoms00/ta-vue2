<template>
    <v-app id="inspire">
      <v-app-bar flat color="#1E3892">
        <v-container class="mx-auto d-flex align-center justify-center">
          <v-avatar class="me-4 " color="blue-lighten-4" size="32"></v-avatar>
  
          <v-btn v-for="link in links" :key="link" :text="link" variant="text"></v-btn>
          <v-btn @click="mudaDados('itens')">Itens</v-btn>
          <v-btn @click="mudaDados('novosItens')">Novos Itens</v-btn>
          <v-btn @click="mudaDados('habilidades')">Habilidades</v-btn>

          <v-spacer></v-spacer>
  
        </v-container>
      </v-app-bar>
  
      <v-main class="bg-blue-grey-lighten-5">
        <v-container>
          <v-row>
  
            <v-col cols="2">
  
              <div>
                <v-expansion-panels>
                  <v-expansion-panel bg-color="#1E3892" class="rounded-lg">
                    <v-expansion-panel-title class="rounded-lg" v-ripple style="height: 4vh;" v-if="dadosExibidos=='itens'">
                      <div class="d-flex justify-space-around align-center h-100 w-100">
                        <v-icon icon="mdi-school-outline"> </v-icon>
                        <p> ESTRATOS </p>
                      </div>
                    </v-expansion-panel-title>

                    <div class="menu-button" v-else-if="dadosExibidos=='habilidades'">
                      <div class="d-flex align-center h-100 w-100">
                        <v-icon icon="mdi-school-outline" class="icon-habilidade"> </v-icon>
                        <p class="text-habilidade"> HABILIDADES </p>
                      </div>
                    </div>

                    <div class="menu-button" v-else-if="dadosExibidos=='novosItens'">
                      <div class="d-flex align-center h-100 w-100">
                        <v-icon icon="mdi-school-outline" class="icon-nItens"> </v-icon>
                        <p class="text-nItens"> NOVOS ITENS </p>
                      </div>
                    </div>
                    
  
                    <v-divider></v-divider>
  
                    <v-expansion-panel-text class="rounded-lg">

                      <v-list class="pa-0" v-if="dadosExibidos=='itens'">
                        <v-list-item v-for="(item, index) in nomeEstratos" :key="index" density="compact"
                          class="d-flex justify-center text-subtitle-2" @click="mudaEstrato(item.num)">
                          <v-list-item-title v-if="!animateCarregandoTurmas" >{{ item.nome }}</v-list-item-title>
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
                          <v-btn v-if="dadosExibidos=='itens' || dadosExibidos=='novosItens' " block  :ripple="false" variant="text"
                          >Código</v-btn>

                          <v-btn v-else block :append-icon="icon[0]" :ripple="false" variant="text"
                            @click="toggleIcon(0, 'id')">Código</v-btn>
                            
                        </v-col>

                        <v-col cols="2" class="d-flex justify-center" v-if="dadosExibidos=='itens' || dadosExibidos=='novosItens'">
                          <v-btn block :append-icon="icon[1]" :ripple="false" variant="text"
                            @click="toggleIcon(1, 'habilidades')">{{ nome_coluna2 }}</v-btn>
                        </v-col>
                        <v-col cols="4" class="d-flex justify-center" v-if="dadosExibidos=='habilidades'">
                          <v-btn block :append-icon="icon[1]" :ripple="false" variant="text"
                            @click="">{{ nome_coluna2 }}</v-btn>
                        </v-col>

                        <v-col cols="2" class="d-flex justify-center">
                          <v-btn class="acertos-button" block :append-icon="icon[2]" :ripple="false" variant="text"
                            @click="toggleIcon(2, 'acertos')">% Acertos</v-btn>
                        </v-col>
                        <v-col cols="2" class="d-flex justify-center">
                          <v-btn block :append-icon="icon[3]" :ripple="false" variant="text"
                            @click="toggleIcon(3, 'tempo')">Tempo(segundos)</v-btn>
                        </v-col>
                       
                        
  
                      </v-row>
  
                    </v-expansion-panel-title>
  
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-sheet>
  
              <!-- Mensagem de Seleção de Turma -->
              <div>
                <!-- <v-sheet v-if="mostrarDiv" class="d-flex justify-center align-center rounded-b-lg" height="250"
                  color="grey-lighten-5" border="md">
                  <p class="text-overline placeholder-text"
                    style="color: #cfd8dcb1; font-size: 3rem !important; text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);">
                    Selecione um
                    estrato</p>
  
                </v-sheet> -->
  
              </div>
  
              <!-- Iteração com os Dados dos Itens -->
              <v-sheet rounded="lg" class="" :class="{ 'fade-in': animacaoListaAtiva }">

                <v-expansion-panels variant="accordion" class="">
                  <v-expansion-panel v-for="(item) in listaItens" :key="item.id" v-if="dadosExibidos=='itens'"
                    :readonly="item.status !== 'Finalizado'" ref="panels" class="rounded-b-lg"
                    style="border-radius: 0px;">
  
                    <v-expansion-panel-title style="height: 5vh;" class="color-painel">
                      <v-row class="d-flex align-center">
  
                        <v-col cols="3" class="d-flex justify-center">
                          {{ item.id }}
                        </v-col>
  
                        <v-col cols="2" class="d-flex justify-center">
                          {{ item.habilidade}} 
                        </v-col>
  
                        <v-col cols="2" class="d-flex justify-center">
                          {{ item.acertos}} %
                        </v-col>
  
                        <v-col cols="2" class="d-flex justify-center">
                          {{ formatTime(item.tempo) }}
                        </v-col>
                      </v-row>
  
                    </v-expansion-panel-title>

                  </v-expansion-panel>
                </v-expansion-panels> 

                <v-expansion-panels variant="accordion" class="">
                  <v-expansion-panel v-for="(item) in listaHabilidades" :key="item.id" v-if="dadosExibidos=='habilidades'"
                    :readonly="item.status !== 'Finalizado'" ref="panels" class="rounded-b-lg"
                    style="border-radius: 0px;">
  
                    <v-expansion-panel-title style="height: 5vh;" class="color-painel">
                      <v-row class="d-flex align-center">
  
                        <v-col cols="3" class="d-flex justify-center">
                          {{ item.id }}
                        </v-col>
  
                        <v-col cols="4" class="d-flex justify-center">
                          {{ item.descricao}} 
                        </v-col>
  
                        <v-col cols="2" class="d-flex justify-center">
                          {{ item.acertos}} %
                        </v-col>
  
                        <v-col cols="2" class="d-flex justify-center">
<<<<<<< Updated upstream
                          {{ item.tempo.toFixed(2) }}s
=======
                          {{ formatTime(item.tempo) }}
>>>>>>> Stashed changes
                        </v-col>
                      </v-row>
  
                    </v-expansion-panel-title>

                  </v-expansion-panel>
                </v-expansion-panels> 

                <v-expansion-panels variant="accordion" class="">
                  <v-expansion-panel v-for="(item) in listaNovosItens" :key="item.id" v-if="dadosExibidos=='novosItens'"
                    :readonly="item.status !== 'Finalizado'" ref="panels" class="rounded-b-lg"
                    style="border-radius: 0px;">
  
                    <v-expansion-panel-title style="height: 5vh;" class="color-painel">
                      <v-row class="d-flex align-center">
  
                        <v-col cols="3" class="d-flex justify-center">
                          {{ item.id }}
                        </v-col>
  
                        <v-col cols="2" class="d-flex justify-center">
                          {{ item.habilidade}} 
                        </v-col>
  
                        <v-col cols="2" class="d-flex justify-center">
                          {{ item.acertos}} %
                        </v-col>
  
                        <v-col cols="2" class="d-flex justify-center">
                          {{ formatTime(item.tempo) }}dd
                        </v-col>
                      </v-row>
  
                    </v-expansion-panel-title>

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
    //'TURMAS',
   
  ]
  </script>
  
  <script>
  import axios from 'axios';

  
  export default {
    name: 'Admin',
  
    data: () => ({

      dadosExibidos : 'itens',
  
      listaTurma: [],
      listaItens: [], //Itens sendo exibidos, começando pelo estrato 1.
      listaHabilidades : [],
      listaNovosItens : [],

      listaItens0 : [],
      listaItens1 : [],
      listaItens2 : [],
      listaItens3 : [],
      
      nomeEstratos : [],

      nome_coluna1: '',
      nome_coluna2: 'Habilidade',
      nome_coluna3: '',
      nome_coluna4: '',
      

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
  
  
  
    }),
  
    created() {
  
    /*   this.$store.dispatch('verificarTokenProfs', { router: this.$router }); */
      //this.listaNomeTurma = this.returnTurmas();
      this.dadosExibidos = 'itens'
      this.listaItens = this.returnItens();
      
      /* Separando itens com base no estrato */
  
    },
    methods: {

      formatTime(seconds) {
        const roundedSeconds = Math.round(seconds);
        const minutes = Math.floor(roundedSeconds / 60);
        const remainingSeconds = roundedSeconds % 60;
        return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
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

      returnItens(){
      
        axios({ url: 'https://ta-back.onrender.com/professores/dadosItens' , method: 'POST' })
          .then((response) => {
            this.listaItens = response.data.itens.listaItens1
            this.listaItens0 = response.data.itens.listaItens0
            this.listaItens1 = response.data.itens.listaItens1
            this.listaItens2 = response.data.itens.listaItens2
            this.listaItens3 = response.data.itens.listaItens3
            console.log(this.listaItens )

            this.nomeEstratos[0] = {
              "nome" : "Estrato 0",
              "num" : 0,
            }
            this.nomeEstratos[1] = {
              "nome" : "Estrato 1",
              "num" : 1,
            }
            this.nomeEstratos[2] = {
              "nome" : "Estrato 2",
              "num" : 2,
            }
            this.nomeEstratos[3] = {
              "nome" : "Estrato 3",
              "num" : 3,
            }

          })
          
          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
      },

      mudaEstrato(nestr){  
        //Muda o estrato exibido.                  
        if(nestr==0){
          this.listaItens = this.listaItens0;
        }
        else if(nestr==1){
          this.listaItens = this.listaItens1;
        }
        else if(nestr==2){
          this.listaItens = this.listaItens2;
        }
        else if(nestr==3){
          this.listaItens = this.listaItens3;
        }
      },

      filtroBotoes(tipo,atr){      //realiza o filtro na página com base no tipo(habilidades,itens,novositens) e atributo.
        if(tipo=='itens'){            //Itens ou novos itens
          if(atr=='id'){              //Filtro do ID
            this.listaItens.sort((a, b) => a.id - b.id);
          }
          else if(atr=='habilidade'){ //Filtro da habilidade
            this.listaItens.sort((a, b) => a.habilidade - b.habilidade);
          }
        }
      },

      returnHabilidades(){
        axios({ url: 'https://ta-back.onrender.com/professores/dadosHabilidades' , method: 'POST' })
          .then((response) => {
            this.listaHabilidades = response.data.habilidades;
            console.log(this.listaHabilidades)
          })

          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
      },

      returnNovosItens(){
        axios({ url: 'https://ta-back.onrender.com/professores/dadosNovosItens' , method: 'POST' })
          .then((response) => {
            this.listaNovosItens = response.data.novosItens;
            console.log(this.listaNovosItens)
          })

          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
      },

      mudaDados(dados){
        if(dados=='habilidades'){
          this.returnHabilidades();
          this.dadosExibidos = 'habilidades';
          this.nome_coluna2 = 'Descrição';
        }
        else if(dados=='itens'){
          this.dadosExibidos = 'itens';
          this.nome_coluna2 = 'Habilidade';

        }
        else if(dados=='novosItens'){
          this.returnNovosItens(); 
          this.dadosExibidos = 'novosItens';
          this.nome_coluna2 = 'Habilidade';
        }
      
      },


      convertToCSV(data) {
        const header = Object.keys(data[0]).join(",") + "\n";
        const rows = data.map(item => Object.values(item).join(",")).join("\n");
        return header + rows;
      },

      downloadCsv(dados){
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

        if(this.dadosExibidos==='itens'){
        
          if (this.toggle === "acertos") {
            this.listaItens = this.listaItens.slice().sort((a, b) => (a.acertos || 0) - (b.acertos || 0));
          }
          else if (this.toggle === "tempo") {
            this.listaItens = this.listaItens.slice().sort((a, b) => (a.tempo || 0) - (b.tempo || 0));
          }
          else if (this.toggle === "habilidades") {
            this.listaItens = this.listaItens.slice().sort((a, b) => (a.habilidade || 0) - (b.habilidade || 0));
          }
             
          if (order && this.dadosExibidos === 'itens') {
            return this.listaItens;
          }
          else {
            return this.listaItens.reverse();
          }

        }
        else if(this.dadosExibidos === "novosItens"){
          if (this.toggle === "acertos") {
            this.listaNovosItens = this.listaNovosItens.slice().sort((a, b) => (a.acertos || 0) - (b.acertos || 0));
          }
          else if (this.toggle === "tempo") {
            this.listaNovosItens = this.listaNovosItens.slice().sort((a, b) => (a.tempo || 0) - (b.tempo || 0));
          }
          else if (this.toggle === "habilidades") {
            this.listaNovosItens = this.listaNovosItens.slice().sort((a, b) => (a.habilidade || 0) - (b.habilidade || 0));
          }

          if (order && this.dadosExibidos === 'novosItens') {
            return this.listaNovosItens;
          }
          else {
            return this.listaNovosItens.reverse();
          }
        }

        else if(this.dadosExibidos === "habilidades"){
          if (this.toggle === "id") {
            this.listaHabilidades = this.listaHabilidades.slice().sort((a, b) => (a.id || 0) - (b.id || 0));
          }

          if (order && this.dadosExibidos === 'habilidades') {
            return this.listaHabilidades;
          }
          else {
            return this.listaHabilidades.reverse();
          }
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

  @font-face {
    font-family: Manrope;
    src: url(../assets/fonts/Manrope/Manrope-Regular.ttf);
  }

  .menu-button{
    height: 5vh !important;
  }

  .icon-habilidade, .icon-nItens {
    margin-left: 3vw;
  }

  .text-habilidade, .text-nItens{
    margin-left: 1.4vw;
  }

  .acertos-button{
    display: flex !important;
    flex-direction: row !important;
    margin-right: 1.3vw !important;
    
  }


  .placeholder-text{
    font-family: sans-serif;
    font-weight: 600;
  }


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