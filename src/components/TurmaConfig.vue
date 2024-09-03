<template>
    <v-row>
      <v-col cols="12">
        <v-sheet class="main-sheet d-flex flex-column">
            <div class="d-flex title-icon" :class="{}">
<!--               <v-icon class="mt-4" icon="mdi-cog"></v-icon>
 -->              <h1 class="ml-2 config-title">Configurações da Turma</h1>
            </div>
            <div class="change-est mt-5 d-flex elevation-1">
              <div class="option-texts d-flex flex-column">
                <h1 class="change-text font-weight-black">Alterar estrato inicial</h1>
                <p class="change-est-p font-weight-medium">Escolha o primeiro estrato à ser avaliado no teste adaptativo.</p>
              </div>
              <div class="buttons d-flex ga-2 mt-3">
                <v-btn class="change-button elevation-5" icon="mdi-numeric-1" :color="corBtn[0]" @click="mudaCorEstrato(1)"></v-btn>
                <v-btn class="change-button elevation-5" icon="mdi-numeric-2" :color="corBtn[1]" @click="mudaCorEstrato(2)"></v-btn>
              </div>
            </div>

            <div class="change-est mt-5 d-flex elevation-1">
              <div class="option-texts d-flex flex-column">
                <h1 class="change-text font-weight-black">Permitir testes</h1>
                <p class="change-est-p font-weight-medium">Possibilita que alunos desta turma possam iniciar o teste adaptativo.</p>
              </div>
                <v-switch class="switch-start" color="indigo" label="" inset></v-switch>
            </div>

            <div class="d-flex align-md-center justify-sm-center save-div mt-8">
<!--               <v-btn elevation="8" size="x-large" class="salvar-btn mt-5" color="#1E3892" @click="mudaEstrato()">Salvar</v-btn> -->      
            
          <v-app>
            <v-container>
              <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn elevation="8" size="x-large" class="salvar-btn mt-5" color="#1E3892" @click="mudaEstrato()" v-bind="activatorProps">
                    Salvar</v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card title="">
                    <v-card-text class="alt-text">Configurações alteradas com sucesso!</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="close-btn"
                        text="Fechar"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-container>
          </v-app>

            </div>

          
           
        </v-sheet>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import ChartNivel from "@/components/ChartNivel.vue";
  import axios from 'axios';


  
  export default {
    components: {
      ChartNivel,
    },
  
    data() {
      return {
        listaTurma: [],
        melhoresResultados: [],
        dadosGraph: [],

        corBtn: ['info','white'],
        novoEstrato : 1,
        configVer: false,
      };
    },
  
    props: {
      listaDeAlunos: {
        type: Array,
        required: true,
        default: () => [],
      },
      isAtivo: {
        type: Boolean,
        required: true,
        default: true,
      },
      estratoInicial :{
        type: Number,
        required: true,
        default: 1,
      },
      turmaSelecionada : {
        type: String,
        required: true,
        default: '',
      }
    },
  
    watch: {
      // Observa mudanças em `listaDeAlunos`
      listaDeAlunos(newVal) {
        this.listaTurma = newVal;
      },
    },
  
    created() {
      this.mudaCorEstrato(this.estratoInicial)
    },
  
    mounted() {
      this.listaTurma = this.listaDeAlunos;
    },
  
    methods: {
      /* Altera o estrato inicial da turma, envia no "Data" o object ID da turma e o ano do novo estrato:

          0 - Estrato 1
          1 - Estrato 2 

      */
      mudaCorEstrato(val){
        if(val===1){                 
          this.corBtn[0] = 'info';
          this.corBtn[1] = 'white';
          this.novoEstrato = 1;
        }
        else if(val===2){
          this.corBtn[0] = 'white';
          this.corBtn[1] = 'info';
          this.novoEstrato = 2;
        }
        else{
          this.corBtn[0] = 'info';
          this.corBtn[1] = 'white';
        }
      },

      mudaEstrato(){
        console.log('teste')
        const data = {
          "id_turma" : this.turmaSelecionada,
          "novo_estrato" : this.novoEstrato,
        }

        axios({
        url: "https://ta-back.onrender.com/professores/alteraEstratoTurma",
        data,
        method: "POST",
        })
        .then((response) => {
          if(response.data.turma_alterada){
            this.mostraAltPopup();
          }
        })
        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });

        
      },

      mostraAltPopup(){
        console.log('Estrato alterado')
      },
    },
  };
  </script>

<style>

  .main-sheet{
    border: 0.1rem solid rgba(58, 58, 58, 0.18);
    padding: 3vh 3vw;
    border-radius: 5px;
    height: 50vh;
  }

  .config-title{
    font-size: 2.1rem;
    color: black;
  }

  .option-texts{
    width: 90% !important;
  }

  .change-est{
    border: 0.1rem solid rgba(102, 102, 103, 0.691);  
    padding: 1vh 1vw;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    height: 10vh !important;
  }

  .change-text{
    color: black;
    font-size: 1.4rem;

  }

  .change-est-p{
    color: rgb(0, 0, 0);
    font-size: 1.0rem;
  }

  .change-button{
   background-color: rgb(199, 199, 255);
  }

  .switch-start .v-input__control{
    margin-top: 1vh;
  }



  .salvar-btn{
    width: 12vw !important;
  }

  .alt-text{
    font-size: 1.4rem !important;
    margin-top: 0vh !important;
    font-weight: 600;
  }

  .close-btn{
    font-size: 1.0rem !important;
    font-weight: 600;
  }

@media (max-width: 1600px) {
  

  .config-title{
    font-size: 1.5rem;
  }

  .option-texts{
    width: 90% !important;
  }

  .change-est{
    border: 0.05rem solid rgba(102, 102, 103, 0.691);  
    padding: 1vh 1vw;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    height: 10vh !important;
  }

  .change-text{
    color: black;
    font-size: 1.1rem;

  }

  .change-est-p{
    color: rgb(0, 0, 0);
    font-size: 0.85rem;
  }

  .change-button{
    width: 2.5vw !important;
    height: 2.5vw !important;
  }

  
  
  .switch-start .v-input__control{
    margin-top: 0vh;
  }

  .save-div{ 
    margin-top: 1vh !important;
  }

  .salvar-btn{
    width: 13vw !important;
    height: 6vh !important;
    font-size: 0.9rem !important;
  }

}

@media (max-width: 1300px) {
  

  .config-title{
    font-size: 1.3rem;
  }

  .option-texts{
    width: 90% !important;
  }

  
  .change-text{
    color: black;
    font-size: 1.0rem;

  }

  .change-est-p{
    color: rgb(0, 0, 0);
    font-size: 0.75rem;
  }
  .buttons{
    padding-bottom: 0.5vh !important;
  }

  .change-button{
    width: 2.7vw !important;
    height: 2.7vw !important;
  }

  
  
  .switch-start .v-input__control{
    margin-top: 0vh;
  }

  .save-div{ 
    margin-top: 1vh !important;
  }

  .salvar-btn{
    width: 13vw !important;
    height: 6vh !important;
    font-size: 0.9rem !important;
  }

  

}

</style>
  