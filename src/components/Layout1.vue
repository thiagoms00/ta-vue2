<template>

    <div class="mainDiv">
        <TimePopup class="time-popup" v-if="alertPopup" @click="displayPopup(0)"></TimePopup>
        <FlexBar :fonte="fonte"/>
        <div class="conteudo" v-if="layoutCheck=='m1'">
        <div class="pergunta">
            <div class="icon-mega" @click="playAudio(1)">
                    <span class="tooltipText">Escutar</span>
            </div>
        
            <img src="" alt="" class="question-img" id="imgM1" :style="{content: questionImg1}" v-if="questionStatement==''">
            <div class="questionText-div" id="questionDiv" v-else>
                <span class="text-title" v-if="questionTextTitle!=''">{{questionTextTitle}}<br></span>
                <h2 class="sub-title" id="subTitle">{{questionSubtitle}}</h2>
                <h2 class="question-statement" id="questionStatement" :style="{marginTop: stMargin,}"> {{questionStatement}}</h2>
            </div>
        </div>

        <div class="resposta">
            <h2 class="question-text">{{questionText}}</h2>

                <form action="" class="question-form" id="questionForm">
                   
                    <div class="alternative" @click="clickAlternative(1)">
                        <input type="radio" id="alt1" name="question-choice" value="1" class="option">
                        <label for="alt1" class="radio-text" id="radioLabel1">{{questionAlt1}}</label><br>
                    </div>
            
                    <div class="alternative" @click="clickAlternative(2)">

                        <input type="radio" id="alt2" name="question-choice" value="2" class="option">
                        <label for="alt2" class="radio-text" id="radioLabel2">{{questionAlt2}}</label><br>
                        
                    </div>

                    <div class="alternative" @click="clickAlternative(3)">
                        <input type="radio" id="alt3" name="question-choice" value="3" class="option">
                        <label for="alt3" class="radio-text" id="radioLabel3">{{questionAlt3}}</label>
                    </div>

                        <!-- <br> -->  
                    
                    <div class="alternative" @click="clickAlternative(4)">
                        <input type="radio" id="alt4" name="question-choice" value="4" class="option">
                        <label for="alt4" class="radio-text" id="radioLabel4">{{questionAlt4}}</label>
                    </div>
                        
                    <br>  

                </form>
            
            <ContButton class="button-m1" id="buttonM1" @click="checkAnswer"/>

        </div>  
    </div>

    <!-- Layout 2(Imagem com largura grande) -->
    <div class="conteudo conteudo-m2"  v-else-if="layoutCheck=='m2'">
    

        <div class="pergunta pergunta-m2">
                <div class="icon-mega" @click="playAudio(1)">
                        <span class="tooltipText">Escutar</span>
                </div>
        
                    <!-- <img src="{{}}" alt="imagem da questao" class=""> -->
                    <img src="" alt="" class="question-img questionImg-m2" :style="{content: questionImg1}">
            </div>

            <div class="resposta">


                <h2 class="question-text questionText-m2">{{questionText}}</h2>
                <form action="" class="question-form form-m2" >

                    <div class="alternative" @click="clickAlternative(1)">
                        <input type="radio" id="alt1" name="question-choice" value="1" class="option option-m2">
                        <label for="alt1" class="radio-text radioM2" id="radioLabel1">{{questionAlt1}}</label><br>
                    </div>
            
                    <div class="alternative" @click="clickAlternative(2)">

                        <input type="radio" id="alt2" name="question-choice" value="2" class="option option-m2">
                        <label for="alt2" class="radio-text radioM2" id="radioLabel2">{{questionAlt2}}</label><br>
                        
                    </div>

                    <div class="alternative" @click="clickAlternative(3)">
                        <input type="radio" id="alt3" name="question-choice" value="3" class="option option-m2">
                        <label for="alt3" class="radio-text radioM2" id="radioLabel3">{{questionAlt3}}</label>
                    </div>

                        <!-- <br> -->  
                    
                    <div class="alternative" @click="clickAlternative(4)">
                        <input type="radio" id="alt4" name="question-choice" value="4" class="option option-m2">
                        <label for="alt4" class="radio-text radioM2" id="radioLabel4">{{questionAlt4}}</label>
                    </div>
                        
                    <br>  
                   
                </form>

                <button class="question-button button-m2" @click="checkAnswer">Continuar</button>
                
            </div>

    </div>

    <!-- Layout 3(Imagem com altura grande) -->
    <div class="conteudo" v-else-if="layoutCheck=='m3'" >
        <div class="pergunta pergunta-m3">
            <div class="icon-mega" @click="playAudio(1)">
                    <span class="tooltipText">Escutar</span>
            </div>
        
            <img src="" alt="" class="question-img img-m3" id="imgM3" :style="{content: questionImg1}" v-if="questionStatement==''">
            <div class="questionText-div" id="questionDiv" v-else>
                <span class="text-title" v-if="questionTextTitle!=''">{{questionTextTitle}}<br></span>
                 <h2 class="question-statement" id="questionStatement" :style="{marginTop: stMargin,}"> {{questionStatement}}</h2>
            </div>
        </div>

        <div class="resposta">
            <h2 class="question-text">{{questionText}}</h2>

                <form action="" class="question-form" id="questionForm">
                   
                    <div class="alternative" @click="clickAlternative(1)">
                        <input type="radio" id="alt1" name="question-choice" value="1" class="option">
                        <label for="alt1" class="radio-text" id="radioLabel1">{{questionAlt1}}</label><br>
                    </div>
            
                    <div class="alternative" @click="clickAlternative(2)">

                        <input type="radio" id="alt2" name="question-choice" value="2" class="option">
                        <label for="alt2" class="radio-text" id="radioLabel2">{{questionAlt2}}</label><br>
                        
                    </div>

                    <div class="alternative" @click="clickAlternative(3)">
                        <input type="radio" id="alt3" name="question-choice" value="3" class="option">
                        <label for="alt3" class="radio-text" id="radioLabel3">{{questionAlt3}}</label>
                    </div>

                        <!-- <br> -->  
                    
                    <div class="alternative" @click="clickAlternative(4)">
                        <input type="radio" id="alt4" name="question-choice" value="4" class="option">
                        <label for="alt4" class="radio-text" id="radioLabel4">{{questionAlt4}}</label>
                    </div>
                        
                    <br>  

                </form>
            
            <ContButton id="buttonM3" class="button-m3" @click="checkAnswer()"/>

        </div>  
    </div>

    <!-- Layout 4, questões com imagens na alternativas -->
    <div class="conteudo conteudo-m4" v-else-if="layoutCheck=='m4'" >

        <div class="icon-questionImg">
            <div class="icon-mega" @click="playAudio(1)">
                    <span class="tooltipText">Escutar</span>
            </div>
            <img src="" alt="" class="question-img img-m4" id="img-m4" :style="{content: questionImg1}">
        </div>
        

        <div class="questions-div" id="questionsDiv">
                <div class="alternative alternative-m4" id="altM4-1" @click="clickAlternative(1)">
                    <input type="radio" id="alt1" name="question-choice" value="1" class="option option-m4">
                    <label for="alt1" class="radio-text label-m4" id="radioLabel1"></label>
                    <img src="" alt="" class="alt-img" id="labelImg1" :style="{content: alt1Img}">
                </div>
                <div class="alternative alternative-m4" id="altM4-2" @click="clickAlternative(2)">
                    <input type="radio" id="alt2" name="question-choice" value="2" class="option option-m4">
                    <label for="alt2" class="radio-text label-m4" id="radioLabel2"></label>
                    <img src="" alt="" class="alt-img" id="labelImg2" :style="{content: alt2Img}">
                </div>

                <div class="alternative alternative-m4" id="altM4-3" @click="clickAlternative(3)">
                    <input type="radio"  id="alt3" name="question-choice" value="3" class="option option-m4">
                    <label for="alt3" class="radio-text label-m4" id="radioLabel3"></label>
                    <img src="" alt="" class="alt-img" id="labelImg3" :style="{content: alt3Img}">
                </div>

                <div class="alternative alternative-m4" id="altM4-4" @click="clickAlternative(4)">
                    <input type="radio" id="alt4" name="question-choice" value="4" class="option option-m4">
                    <label for="alt4" class="radio-text label-m4" id="radioLabel4"></label>
                    <img src="" alt="" class="alt-img" id="labelImg4" :style="{content: alt4Img}">
                </div>
        </div>

        <ContButton class="button-m4" id="buttonM4" @click="checkAnswer()"/>


    </div>

    <!-- Layout de questõs pequenas (sem imagem/texto) -->
    <div class="conteudo conteudo-m2" v-else="layoutCheck=='m5'" >

            <div class="pergunta pergunta-m4">
                <div class="icon-mega" @click="playAudio(1)">
                    <span class="tooltipText">Escutar</span>
                </div>

                <form action="" class="question-form form-alt form-m5" >
                    
                    <div class="alternative" @click="clickAlternative(1)">
                            <input type="radio" id="alt1" name="question-choice" value="1" class="option">
                            <label for="alt1" class="radio-text" id="radioLabel1">{{questionAlt1}}</label><br>
                        </div>
                
                        <div class="alternative" @click="clickAlternative(2)">

                            <input type="radio" id="alt2" name="question-choice" value="2" class="option">
                            <label for="alt2" class="radio-text" id="radioLabel2">{{questionAlt2}}</label><br>
                            
                        </div>

                        <div class="alternative" @click="clickAlternative(3)">
                            <input type="radio" id="alt3" name="question-choice" value="3" class="option">
                            <label for="alt3" class="radio-text" id="radioLabel3">{{questionAlt3}}</label>
                        </div>

                            <!-- <br> -->  
                        
                        <div class="alternative" @click="clickAlternative(4)">
                            <input type="radio" id="alt4" name="question-choice" value="4" class="option">
                            <label for="alt4" class="radio-text" id="radioLabel4">{{questionAlt4}}</label>
                        </div>
                            
                        <br>  

                    <br>  

                </form>

        </div>

        <ContButton class="question-button button-m5" @click="checkAnswer"/>

        

    </div>
    </div>


    

   
</template>

<script>

import ContButton from './ContButton.vue';
import TimePopup from './TimePopup.vue';
import axios from 'axios';



import { VWindow } from 'vuetify/lib/components/index.mjs';

import jsonDataQuestoes0 from '../assets/questao/questoes_extrato0.json';
import jsonDataQuestoes1 from '../assets/questao/questoes_extrato1.json';              //Primeiro a ser utilizado.
import jsonDataQuestoes2 from '../assets/questao/questoes_extrato2.json';
import jsonDataQuestoes3 from '../assets/questao/questoes_extrato3.json';

//Dados das "planilhas"
import jsonData0 from '../assets/extratos/extrato0.json';
import jsonData1 from '../assets/extratos/extrato1.json';
import jsonData2 from '../assets/extratos/extrato2.json';
import jsonData3 from '../assets/extratos/extrato3.json';


import FlexBar from '@/components/FlexBar.vue';


export default {
    name : 'Layout1',
    components : {
        ContButton,       //Botão azul presente em todos itens.
        FlexBar,          //Barra azul superior, contem o botão com a fonte.
        TimePopup,        //Pop-up que aparece após certo tempo sem trocar de item.

    },

    data(){
        return {

            /* Parte visual */
            imgSrc: '../assets/imgs/Logo-Impacto-removebg.png',
            layoutCheck :'',     
            questionNumber : 0,     
            questionId: '',
            questionStatement: '',    //Enunciado escrito(Texto no lugar da imagem)
            questionTextTitle: '',
            questionText: '',     //Enunciado da questão
            questionAudio1: '',   //Audio 1
            questionAudio2: '',   //Audio 2
            questionType: '',     //tipo(Matéria da questão)
            questionImg1: '',     //Imagem 1 da questão
            questionImg2 : '',    //Imagem 2 da questão
            questionAlt1: '',     //Alternativa1
            questionAlt2: '',     //Alternativa2
            questionAlt3:'',      //Alternativa3
            questionAlt4: '',     //Alternativa4
            questionAnswer: '',   //Alternativa4 resposta da pergunta
            alt1Img: '',          //Caso tenha uma imagem na alternativa
            alt2Img: '',
            alt3Img: '',
            alt4Img: '',
            fonte: '',

            questionSubtitle : '', //Caso a questão tenha um sub-titulo

            stMargin: '',
            audioVis: '',

            /* Dados do Teste adaptativo */
            questao_id: '',
            probabilidades_domina: [],
            probabilidades_naodom: [],
            ordem: [],
            nq: [],
            PSR: 0,
            PS: 0.5,
            pouts : 0.95,
            poutn : 0.05,
            poutn1: 0.15,
            jquest: 0,
            nestr: 1,                           //Numero do extrato que vai ser testado, define o valor a ser acessado na matriz das probabilidades.
            jiter: 0,

            /* Dados do teste adaptativo que vão ser resetados sempre que um extrato novo for chamado */
            Questoes: [],
            Respostas: [],
            termina: false,                     //Determina quando o teste principal acaba.
            coletaDados : false,                //Determina quando a coleta de dados começa.
            questionFlag : false,               //Determina quando o sistema para de enviar questões.
            ind_questao: 0,
            resultado: 0,
            seq_prob_dom: [],
            seq_prob_ndom: [],
            jsonData: [],
            megafoneDisable : false,
            alertPopup : false,
            alertTimeoutId : '',
            audioAux : '',

            m1Key:0,                            //Chave do layout1.
            m2Key:0,                            //Chave do layout2.
            m3Key:0,                            //Chave do layout3.
            m4Key:0,                            //Chave do layout4.
            m5Key:0,                            //Chave do layout5.
            
            dadosTeste : {                      /* Objeto que armazena as informações do teste. */
                tokenAluno: '',                 //Token referente ao aluno.
                qtdQuestoes : 0,                //Quantidade de questões no teste.
                qtdAcertos : 0,                 //Quantidade de acertos no teste.
                questoesRespondidas : [],       //Array com os itens que foram respondidos.
                resultado : 0                   //Resultado final do teste(numero do extrato).
            }

        }
    },

    computed(){
        
    },

    created (){  //Sempre é chamado quando a pagina é carregada
        this.jsonData = jsonDataQuestoes1;  //define o extrato 
        //Randomiza uma questão quando a pagina é criada.
        // Ele sorteia um número entre 0 e o número de objetos no JSON
        this.dadosTeste.tokenAluno = localStorage.getItem('token');

        this.startTest();
        this.questionNumber = this.ordem[this.nestr][this.ind_questao];
        
        this.questionId = this.jsonData.questoes[this.questionNumber].id
        this.questionText = this.jsonData.questoes[this.questionNumber].text; 
        this.questionTextTitle = this.jsonData.questoes[this.questionNumber].textTitle;  
        this.questionStatement = this.jsonData.questoes[this.questionNumber].qText;    
        this.questionAudio1 = this.jsonData.questoes[this.questionNumber].audio1;
        this.questionAudio2 = this.jsonData.questoes[this.questionNumber].audio2;
        this.questionType = this.jsonData.questoes[this.questionNumber].type;
        this.questionImg1 = this.jsonData.questoes[this.questionNumber].img1;
        this.questionImg2 = this.jsonData.questoes[this.questionNumber].img2;
        this.questionAlt1 = this.jsonData.questoes[this.questionNumber].alt1;
        this.questionAlt2 = this.jsonData.questoes[this.questionNumber].alt2;
        this.questionAlt3 = this.jsonData.questoes[this.questionNumber].alt3;
        this.questionAlt4 = this.jsonData.questoes[this.questionNumber].alt4;
        this.questionAnswer = this.jsonData.questoes[this.questionNumber].answer;
        this.fonte = this.jsonData.questoes[this.questionNumber].fonte;

        if(this.questionTextTitle==''){
            this.stMargin = '0';
        }
        else{
            this.stMargin = '2vh';
        }

        switch(this.jsonData.questoes[this.questionNumber].layout){
              case 'm1':
                this.layoutCheck = 'm1';
               /*  if(this.questionId=='LP_H03_00_014_F'){
                    this.changeByID('LP_H03_00_014_F');
                } */
              break;
              case 'm2':
                this.layoutCheck = 'm2';
                //document.getElementById("layout1").style.height = "92vh";  //Muda o tamanho da main-div
              break;
              case 'm3':
                this.layoutCheck = 'm3';
              break;
              case 'm4':
                this.layoutCheck = 'm4';
                this.alt1Img = this.jsonData.questoes[this.questionNumber].alt1Img;
                this.alt2Img = this.jsonData.questoes[this.questionNumber].alt2Img;
                this.alt3Img = this.jsonData.questoes[this.questionNumber].alt3Img;
                this.alt4Img = this.jsonData.questoes[this.questionNumber].alt4Img;

              break;
              case 'm5':
                this.layoutCheck = 'm5';
              break;
              
              default:
                
              break
              

          }

    },

    mounted(){                          //Chamado após os componentes carregarem.
        this.playAudio(1);
        this.alertTimeoutId = setTimeout(() => {              //Exibe o popup após 30 segundos sem clicar no continuar.
            this.displayPopup(1); 
        }, 45000)
        this.changeByID();
    },

    methods:{
      
     resetStyle(){         //Chamado sempre que um item novo é exibido na tela.
        let aux;
        aux = document.getElementById("questionStatement");
        aux.style.fontSize = '';
        aux.style.letterSpacing = '';
        aux.style.textAlign = '';
        aux.style.fontFamily = '';
        aux.style.fontWeight = '';

        aux = document.getElementById("radioLabel1");
        aux.style.letterSpacing = 'normal';

        aux = document.getElementById("radioLabel2");
        aux.style.letterSpacing = 'normal';

        aux = document.getElementById("radioLabel3");
        aux.style.letterSpacing = 'normal';

        aux = document.getElementById("radioLabel4");
        aux.style.letterSpacing = 'normal';


     },
      
     checkAnswer(){                     //É chamado sempre que um usuario clicar no botão "Continuar"
        this.alertPopup = false;
         
        this.changeByID();

        const radioButtons = document.querySelectorAll('input[name="question-choice"]');  //seleciona todos os radio buttons.
        for (const radioButton of radioButtons) {
            if (radioButton.checked){                                                     //Vê qual radio button foi selecionado.
                let selectedButton = radioButton.value;
                this.aplicaQuestao(radioButton.value-1);
                switch(parseInt(selectedButton)){                                         //converte o "SelectedButton" para um inteiro.
                    case 1:
                        //console.log(this.questionAlt1)
                        if(this.questionAlt1 == this.questionAnswer){
                            // console.log('Você acertou a questão!');
                        }
                    break;
                    case 2:
                        //console.log(this.questionAlt2)
                        if(this.questionAlt2 == this.questionAnswer){
                            // console.log('Você acertou a questão!');
                        }
                    break;
                    case 3:
                        // console.log(this.questionAlt3);
                        if(this.questionAlt3 == this.questionAnswer){
                            // console.log('Você acertou a questão!');
                        }
                        
                    break;
                    case 4:
                        //console.log(this.questionAlt4)
                        if(this.questionAlt4 == this.questionAnswer){
                            //console.log('Você acertou a questão!');
                        }
                    break;
                }
                
            }

      

        }
        
        let elements = document.getElementsByTagName("input");
        for (let i = 0; i < elements.length; i++) {
                if (elements[i].type == "radio") {
                    elements[i].checked = false;
                }
        }

     },

     playAudio(audioNum){  
        if(this.megafoneDisable==false){
            this.audioAux = new Audio(this.questionAudio1);
            this.megafoneDisable=true;
            this.audioAux.play();
            setTimeout(this.resetMegafone, 5500);           //Impede que o megafone seja tocado por 5,5 segundos.
        }
       
    
       /*  if(audioNum==1){
            let audio = new Audio(this.questionAudio1);
            audio.play();
        } */
         
        
     },

     stopAudio(){
        let audio = new Audio(this.questionAudio1);
        audio.pause();
      },


     
     changeByID(){                                          //Muda detalhes com base no ID do item
      

          let aux, aux2,aux3,aux4;
          
    
          switch(this.questionId){

            case 'LP_H07_03_017':
                aux = document.getElementById("buttonM1");
                aux.style.marginTop = '17vh';
            
            break;
          
            
            case 'LP_H07_02_020':
                aux = document.getElementById("imgM3");
                aux.style.width = '43vw';
                aux.style.marginLeft = '4vw';
            break;
           
            case 'LP_H10_01_003':
                aux = document.getElementById("questionDiv");
                aux.style.width = 'auto';
            break;
            case 'LP_H07_02_019':
                aux = document.getElementById("imgM3");
                aux.style.width = '35vw';
                aux.style.marginLeft = '4vw';
            break;
            case 'LP_H07_03_013':
                aux = document.getElementById("imgM3");
                aux.style.width = '38vw';
                aux.style.marginLeft = '2vw';
                aux2 = document.getElementById("questionForm");
                aux2.style.marginTop = '5vh';
            break;
            case 'LP_H03_00_014':
                aux = document.getElementById("questionStatement");
                aux.style.fontSize = '100px';
                aux.style.letterSpacing = '10px';
                aux.style.textAlign = 'center';
                aux.style.fontFamily = 'Manrope-Light';
                aux.style.fontWeight = '300';

                aux2 = document.getElementById("questionDiv");
                aux2.style.display = 'flex';
                aux2.style.flexDirection = 'row'
                aux2.style.height = 'auto';
                aux2.style.width = '24vw';
                aux2.style.alignItems = 'center';
                aux2.style.justifyContent = 'center';
                aux2.style.marginTop = '15vh'

                aux = document.getElementById("radioLabel1");
                aux.style.letterSpacing = '10px';

                aux = document.getElementById("radioLabel2");
                aux.style.letterSpacing = '10px';

                aux = document.getElementById("radioLabel3");
                aux.style.letterSpacing = '10px';

                aux = document.getElementById("radioLabel4");
                aux.style.letterSpacing = '10px';
            break;

            case 'LP_H07_03_003':
                aux = document.getElementById("questionForm"); 
                aux.style.marginTop = '4vh';
                aux = document.getElementById("questionStatement");
                aux.style.fontSize = '1.0rem';
            break;

            case 'LP_H07_03_008':
            case 'LP_H07_02_014':
            case 'LP_H07_02_022':
            case 'LP_H07_02_001':
            case 'LP_H10_02_009':
            case 'LP_H07_02_002':
            case 'LP_H07_01_018':
            case 'LP_H07_03_007':
            case 'LP_H07_03_014':
                aux = document.getElementById("questionForm"); 
                aux.style.marginTop = '4vh';
            break;

            case 'LP_H07_01_010':
                aux = document.getElementById("questionForm"); 
                aux.style.marginTop = '4vh';
                aux = document.getElementById("imgM3");
                aux.style.width = '33vw';
                aux.style.marginLeft = '4vw';
            break;

         
            case 'LP_H01_00_013':
            case 'LP_H01_00_002':
            aux = document.getElementById("radioLabel1");
            aux.style.letterSpacing = '12px';
            aux = document.getElementById("radioLabel2");
            aux.style.letterSpacing = '12px';
            aux = document.getElementById("radioLabel3");
            aux.style.letterSpacing = '12px';
            aux = document.getElementById("radioLabel4");
            aux.style.letterSpacing = '12px';
            break; 
           
          
            case 'LP_H07_01_009':
            aux = document.getElementById("questionDiv");
            aux.style.width = '77%'
            break;

            case 'LP_H04_02_013':
            case 'LP_H01_00_010':
            case 'LP_H02_01_009':  

            aux = document.getElementById("img-m4");
            aux.style.display ='none';

            aux = document.getElementById("questionsDiv");
            aux.style.marginTop = '8vh';
            aux.style.display = 'flex';
            aux.style.flexDirection = 'row';
            aux.style.gap = '2vw';

            aux = document.getElementById("altM4-1");
            aux.style.width = '20vw'
            aux = document.getElementById("altM4-2");
            aux.style.width = '20vw'
            aux = document.getElementById("altM4-3");
            aux.style.width = '20vw'
            aux = document.getElementById("altM4-4");
            aux.style.width = '20vw'
            
            aux = document.getElementById("labelImg1");
            aux.style.width = '15vw';
            aux.style.height = 'auto';
            aux.style.marginLeft = '6px'
            aux = document.getElementById("labelImg2");
            aux.style.width = '15vw';
            aux.style.height = 'auto';
            aux = document.getElementById("labelImg3");
            aux.style.width = '15vw';
            aux.style.height = 'auto';
            aux = document.getElementById("labelImg4");
            aux.style.width = '15vw';
            aux.style.height = 'auto';
            
            break;

            case 'LP_H10_03_003':
            aux = document.getElementById("questionForm"); 
            aux.style.marginTop = '4vh';
            break;

            case 'LP_H09_02_010':
            aux = document.getElementById("imgM3");
            aux.style.width = '37vw';
            break;

            case 'LP_H07_03_016':
            aux = document.getElementById("imgM3");
            aux.style.width = '33vw';
            aux = document.getElementById("questionForm"); 
            aux.style.marginTop = '4vh';
            break;
            case 'LP_H07_03_015':
            aux = document.getElementById("questionForm"); 
            aux.style.marginTop = '4vh';
            break;
            case 'LP_H08_02_004':
            aux = document.getElementById("questionForm"); 
            aux.style.marginTop = '4vh';
            this.questionSubtitle = this.jsonData.questoes[this.questionNumber].subTitle;
            aux = document.getElementById("subTitle"); 
            aux.style.display = 'inline';
            aux.style.textAlign = 'end';
            aux.style.marginLeft = '40vw'
            break;
            case 'LP_H07_01_019':
            aux = document.getElementById("questionForm"); 
            aux.style.marginTop = '4vh';
            aux2 = document.getElementById("imgM3");
            aux2.style.width = '41vw';
            aux2.style.marginLeft = '3vw';

            break;
            case 'LP_H09_01_003':
            aux = document.getElementById("imgM3");
            aux.style.width = '25vw';
            break;
            case 'LP_H07_02_013':
            aux = document.getElementById("imgM3");
            aux.style.width = '40vw';     
            break;
            case 'LP_H08_02_002':   
            aux = document.getElementById("imgM3");
            aux.style.width = '22vw';
            aux.style.marginLeft = '9vw';
            break;
            case 'LP_H09_02_003':
            aux = document.getElementById("imgM3");
            aux.style.marginLeft = '2vw';
            aux.style.width = '36vw';     
            break;
           
            case 'LP_H07_02_012':
            aux = document.getElementById("imgM3");
            aux.style.width = '47vw';
            break;

            case 'LP_H06_00_005':
            aux = document.getElementById("img-m4");
            aux.style.width = '18vw';
            aux.style.marginLeft = '31vw';

            aux = document.getElementById("questionsDiv");
            aux.style.marginTop = '8vh';
            aux.style.display = 'flex';
            aux.style.flexDirection = 'row';
            aux.style.gap = '2vw';

            aux = document.getElementById("altM4-1");
            aux.style.width = '20vw'
            aux = document.getElementById("altM4-2");
            aux.style.width = '20vw'
            aux = document.getElementById("altM4-3");
            aux.style.width = '20vw'
            aux = document.getElementById("altM4-4");
            aux.style.width = '20vw'
            
            aux = document.getElementById("labelImg1");
            aux.style.width = '16vw';
            aux.style.marginLeft = '1vw';
            aux.style.height = 'auto';
            aux = document.getElementById("labelImg2");
            aux.style.width = '16vw';
            aux.style.marginLeft = '1vw';
            aux.style.height = 'auto';
            aux = document.getElementById("labelImg3");
            aux.style.width = '16vw';
            aux.style.marginLeft = '1vw';
            aux.style.height = 'auto';
            aux = document.getElementById("labelImg4");
            aux.style.width = '16vw';
            aux.style.marginLeft = '1vw';
            aux.style.height = 'auto';
            aux = document.getElementById("buttonM4");
            aux.style.marginTop = '8vh';

            break;

            case 'LP_H02_02_003':
            aux = document.getElementById("img-m4");
            aux.style.width = '19vw';
            aux.style.marginLeft = '32vw';

            aux = document.getElementById("questionsDiv");
            aux.style.marginTop = '8vh';
            aux.style.display = 'flex';
            aux.style.flexDirection = 'row';
            aux.style.gap = '2vw';

            aux = document.getElementById("altM4-1");
            aux.style.width = '18vw'
            aux = document.getElementById("altM4-2");
            aux.style.width = '18vw'
            aux = document.getElementById("altM4-3");
            aux.style.width = '18vw'
            aux = document.getElementById("altM4-4");
            aux.style.width = '18vw'
            
            aux = document.getElementById("radioLabel1");
            aux.style.width = '14vw';
            aux.style.marginLeft = '1vw';
            aux.style.height = 'auto';
            aux = document.getElementById("radioLabel2");
            aux.style.width = '14vw';
            aux.style.marginLeft = '1vw';
            aux.style.height = 'auto';
            aux = document.getElementById("radioLabel3");
            aux.style.width = '14vw';
            aux.style.marginLeft = '1vw';
            aux.style.height = 'auto';
            aux = document.getElementById("radioLabel4");
            aux.style.width = '14vw';
            aux.style.marginLeft = '1vw';
            aux.style.height = 'auto';
            aux = document.getElementById("buttonM4");
            aux.style.marginTop = '8vh';
            
            break;

            case 'LP_H03_00_013':
            aux = document.getElementById("imgM3");
            aux.style.width = '45vw';
            aux.style.marginTop = '3vh';
            break;

            case 'LP_H2_01_005':
            case 'LP_H05_00_006':
            aux = document.getElementById("imgM3");
            aux.style.width = '33vw';
            aux.style.marginLeft = '7vw';
            break;
            case 'LP_H02_01_012':
            aux = document.getElementById("imgM3");
            aux.style.width = '33vw';
            aux.style.marginLeft = '7vw';
            break;
            case 'LP_H09_02_009':
            aux = document.getElementById("imgM3");
            aux.style.width = '29vw';
            aux.style.marginLeft = '7vw';

            break;
        
              

              
          }


     },

     //Mostra o input (circulo) das alternativas, quando forem clicadas.
    clickAlternative(alt){
        let aux;
        switch(alt){
            case 1:
                aux = document.getElementById("radioLabel1");
                aux.checked = true;
                aux.click();
            break;
            case 2:
                aux = document.getElementById("radioLabel2");
                aux.checked = true;
                aux.click();
            break;
            case 3:
                aux = document.getElementById("radioLabel3");
                aux.checked = true;
                aux.click();
            break;
            case 4:
                aux = document.getElementById("radioLabel4");
                aux.checked = true;
                aux.click();
            break;
        }

    },

    /* Métodos utilizados no teste Adaptativo */

    /* 
        startTest: Preenche os dados iniciais utilizados no teste adaptativo, são eles:
       'nq' : Vetor que vai conter o Numero de questões presente nos extratos.
       'questao_id': Matriz que vai conter o ID de cada questão.
       'probabilidades_dom e naodom' : Matriz com as probabilidades escolher ou não uma alternativa, com base no domínio do conteudo.
       'ordem': Matriz com a ordem de questões, separadas por extrato,a questão na posição [0] do extrato 1, é a primeira questão apresentada.
    */

    startTest(){
        /* Iniciando o Algoritmo, armazenando o tamanho total de cada array que contem os dados dos extratos.*/
       
        const nq0 = jsonData0.extrato.length
        const nq1 = jsonData1.extrato.length
        const nq2 = jsonData2.extrato.length
        const nq3 = jsonData3.extrato.length
        this.nq = [nq0,nq1,nq2,nq3];             //Array contendo os tamanhos relativos aos extratos.
        
        let questao_id_0 = [];
        let questao_id_1 = [];
        let questao_id_2 = [];
        let questao_id_3 = [];

        /* Armazenando os identificadores de cada extrato. */
        for(let i=0;i<jsonData0.extrato.length;i++){
            questao_id_0[i] = jsonData0.extrato[i].id;
        }
        for(let i=0;i<jsonData1.extrato.length;i++){
            questao_id_1[i] = jsonData1.extrato[i].id;
        }
        for(let i=0;i<jsonData2.extrato.length;i++){
            questao_id_2[i] = jsonData2.extrato[i].id;
        }
        for(let i=0;i<jsonData3.extrato.length;i++){
            questao_id_3[i] = jsonData3.extrato[i].id;
        }


        this.questao_id = [questao_id_0,questao_id_1,questao_id_2,questao_id_3]; //Array final com arrays dos identificadores.

        /* Armazenando as probabilidades de escolher uma questão, essa parte ficou confusa no algoritmo em python. */
    
        /* Cria um Array contendo arrays com as probabilidades de escolher uma alternativa, dado que domine a questão. */
        let probabilidades_domina_0 = [[],[],[],[],[]];
        let probabilidades_domina_1 = [[],[],[],[],[]];
        let probabilidades_domina_2 = [[],[],[],[],[]];
        let probabilidades_domina_3 = [[],[],[],[],[]];

        /* Cria um Array contendo arrays com as probabilidades de escolher uma alternativa, dado que não domine a questão. */
        let probabilidades_naodom_0 = [[],[],[],[],[]];
        let probabilidades_naodom_1 = [[],[],[],[],[]];
        let probabilidades_naodom_2 = [[],[],[],[],[]];
        let probabilidades_naodom_3 = [[],[],[],[],[]];


        //Extrato 0
        for(let i=0; i<jsonData0.extrato.length; i++){
            probabilidades_domina_0[0].push(jsonData0.extrato[i].ad);
            probabilidades_domina_0[1].push(jsonData0.extrato[i].bd);
            probabilidades_domina_0[2].push(jsonData0.extrato[i].cd);
            probabilidades_domina_0[3].push(jsonData0.extrato[i].dd);
            probabilidades_domina_0[4].push(jsonData0.extrato[i].ed);

            probabilidades_naodom_0[0].push(jsonData0.extrato[i].as);
            probabilidades_naodom_0[1].push(jsonData0.extrato[i].bs);
            probabilidades_naodom_0[2].push(jsonData0.extrato[i].cs);
            probabilidades_naodom_0[3].push(jsonData0.extrato[i].ds);
            probabilidades_naodom_0[4].push(jsonData0.extrato[i].es);

        }

        //Extrato 1
        for(let i=0;i<jsonData1.extrato.length;i++){
            probabilidades_domina_1[0].push(jsonData1.extrato[i].ad);
            probabilidades_domina_1[1].push(jsonData1.extrato[i].bd);
            probabilidades_domina_1[2].push(jsonData1.extrato[i].cd);
            probabilidades_domina_1[3].push(jsonData1.extrato[i].dd);

            probabilidades_naodom_1[0].push(jsonData1.extrato[i].as);
            probabilidades_naodom_1[1].push(jsonData1.extrato[i].bs);
            probabilidades_naodom_1[2].push(jsonData1.extrato[i].cs);
            probabilidades_naodom_1[3].push(jsonData1.extrato[i].ds);

        }
        //Extrato 2

        for(let i=0;i<jsonData2.extrato.length;i++){
            probabilidades_domina_2[0].push(jsonData2.extrato[i].ad);
            probabilidades_domina_2[1].push(jsonData2.extrato[i].bd);
            probabilidades_domina_2[2].push(jsonData2.extrato[i].cd);
            probabilidades_domina_2[3].push(jsonData2.extrato[i].dd);
            probabilidades_domina_2[4].push(jsonData2.extrato[i].ed);

            probabilidades_naodom_2[0].push(jsonData2.extrato[i].as);
            probabilidades_naodom_2[1].push(jsonData2.extrato[i].bs);
            probabilidades_naodom_2[2].push(jsonData2.extrato[i].cs);
            probabilidades_naodom_2[3].push(jsonData2.extrato[i].ds);
            probabilidades_naodom_2[4].push(jsonData2.extrato[i].es);

        }

        //Extrato 3
        for(let i=0;i<jsonData3.extrato.length;i++){
            probabilidades_domina_3[0].push(jsonData3.extrato[i].ad);
            probabilidades_domina_3[1].push(jsonData3.extrato[i].bd);
            probabilidades_domina_3[2].push(jsonData3.extrato[i].cd);
            probabilidades_domina_3[3].push(jsonData3.extrato[i].dd);
            probabilidades_domina_3[4].push(jsonData3.extrato[i].ed);

            probabilidades_naodom_3[0].push(jsonData3.extrato[i].as);
            probabilidades_naodom_3[1].push(jsonData3.extrato[i].bs);
            probabilidades_naodom_3[2].push(jsonData3.extrato[i].cs);
            probabilidades_naodom_3[3].push(jsonData3.extrato[i].ds);
            probabilidades_naodom_3[4].push(jsonData3.extrato[i].es);
        }


        this.probabilidades_domina = [probabilidades_domina_0, probabilidades_domina_1, probabilidades_domina_2, probabilidades_domina_3];
        this.probabilidades_naodom = [probabilidades_naodom_0, probabilidades_naodom_1, probabilidades_naodom_2, probabilidades_naodom_3];
    

        /* Randomizando a ordem das questões. */
        let ordem_0 = [];
        let ordem_1 = [];
        let ordem_2 = [];
        let ordem_3 = [];

        for(let i=0;i<jsonData0.extrato.length; i++){
            ordem_0[i] = [i];
        }
        for(let i=0;i<jsonData1.extrato.length; i++){
            ordem_1[i] = [i];
        }
        for(let i=0;i<jsonData2.extrato.length; i++){
            ordem_2[i] = [i];
        }
        for(let i=0;i<jsonData3.extrato.length; i++){
            ordem_3[i] = [i];
        }

        ordem_0 = this.shuffleArray(ordem_0);
        ordem_1 = this.shuffleArray(ordem_1);
        ordem_2 = this.shuffleArray(ordem_2);
        ordem_3 = this.shuffleArray(ordem_3);

        //ordem_0 = [0,1,2,3,4,5,6,7,8,9,10];                //Para testar sequencialmente, comentar depois.
       // ordem_1 = [0,1,2,3,4,5,6,7,8,9,10,11,12];           //Para testar sequencialmente, comentar depois.  
        /* ordem_2 = [];
        ordem_3 = [];
        for (let i = 0; i < 45; i++) {
            ordem_2.push(i);
        }
        for (let i = 0; i < 27; i++) {
            ordem_3.push(i);
        }  
  */
        this.ordem = [ordem_0, ordem_1, ordem_2, ordem_3];

        this.resetaExtrato(this.nestr,this.jquest);

    },

    //Randomiza elementos em um vetor.
    shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },

    multiplica_array(arr){
            let result = 1;
            for(let i=0;i<arr.length;i++){
                //console.log(arr[i]);
                result = arr[i]*result;
                
            }
            return result;
    },

    resetaExtrato(nestr,jquest){                          //Faz a mudança de extrato.

        this.PSR = 0.5;
        this.PS = 0.5;
        this.pouts = 0.95;
        this.poutn = 0.05;
        this.jquest = 0;




        switch(nestr){
            case 0:
                this.resetaOrdem();
                this.jsonData = jsonDataQuestoes0;
            break;
            case 1:
                this.resetaOrdem();
                this.jsonData = jsonDataQuestoes1;
            break;
            case 2:
                this.jsonData = jsonDataQuestoes2;
            break;
            case 3:
                this.jsonData = jsonDataQuestoes3;

            break;
        }
    
        this.Questoes = Array(this.nq[nestr] - jquest).fill(0);// lista que armazenará os identificadores das questões apresentadas
        this.Respostas = Array(this.nq[nestr] - jquest).fill(0); // lista que armazenará as respostas do estudante às questões
        //this.termina = false;                            // flag de término da bateria de questões referente ao estrato
        this.ind_questao = jquest;                       // índice relativo da questão (aponta agora para primeira questão a ser utilizada)
        this.resultado = 0;                              // vai conter: -1 -> reprovação; 0 -> indefinido; 1 -> aprovação
        this.seq_prob_dom = new Array(this.nq[nestr]);        // vai conter as probabilidades ter marcado o item dado que domina conteúdo
        this.seq_prob_ndom = new Array(this.nq[nestr]);       // vai conter as probabilidades ter marcado o item dado que não domina conteúdo
        this.seq_prob_dom.fill(1);
        this.seq_prob_ndom.fill(1);
        this.jiter = 0;

    },

    async aplicaQuestao(value){                              //Função chamada sempre que o usuario clicar no "continuar"
        console.clear();
        

        // "Aplica" uma questão, verificando se o aluno acertou ou não.
        this.dadosTeste.qtdQuestoes++;
        let auxQuestao = {
            id: '',
            acertou : false
        }
        //this.dadosTeste.questoesRespondidas.push(this.jsonData.questoes[this.questionNumber].id);
        auxQuestao.id = this.jsonData.questoes[this.questionNumber].id;
        let iabs = this.ordem[this.nestr][this.ind_questao]; 
        let questao = this.questao_id[this.nestr][iabs];
        this.Questoes[this.jiter] = questao;
        let iresp = value;
        this.ind_questao += 1;
        this.Respostas[this.jiter] = iresp;
        
        //console.log(this.jsonData.questoes[this.questionNumber].id);

       

        // ==============================================
        // Atualiza probabilidades, dada a resposta:
        this.seq_prob_dom[this.jiter] = this.probabilidades_domina[this.nestr][iresp][iabs];  // armazena P(resposta|domina) para a atual resposta
        this.seq_prob_ndom[this.jiter] = this.probabilidades_naodom[this.nestr][iresp][iabs]; // armazena P(resposta|naodomina) para a atual resposta
        if(this.probabilidades_domina[this.nestr][iresp][iabs] == 0.85){                      //Verifica se o aluno acertou ou não a questão.
            this.dadosTeste.qtdAcertos++;
            auxQuestao.acertou = true;
            console.log("Alternativa correta");
        }
        this.dadosTeste.questoesRespondidas.push(auxQuestao);                                        //Adiciona no array de questoes respondidas.
        //console.log(this.seq_prob_dom);
        //console.log(this.seq_prob_ndom);

        let prs = this.multiplica_array(this.seq_prob_dom);                      //probabiliade da sequência de respostas, dado que domine o conteudo
        let prn = this.multiplica_array(this.seq_prob_ndom);                     //probabiliade da sequência de respostas, dado que não domine o conteudo
      
        this.PSR = prs*this.PS/(this.PS*prs+(1-this.PS)*prn);                    //probabilidade de dominio do conteúdo, dada a sequência de respostas
        console.log("probabilidade dominio conteudo = ", +this.PSR);
        this.jiter += 1
        // Tomada de decisão:

        /* 
            Com base no extrato atual, define o proximo extrato a ser utilizado:
            Extrato 0: Reprovado no extrato 0 ou avança para o extrato 1.
            Extrato 1: Reprovado no extrato 1 e retrocede para o 0 ou avança para o extrato 2.
            Extrato 2: Reprovado no extrato 2 ou avança para o extrato 3.
            Extrato 3: Reprovado ou aprovado no extrato 3.

        */
        switch(this.nestr){
            case 0:                                     //EXTRATO 0
                if (this.PSR > this.pouts) {            // aprovação no estrato 0
                    this.resultado = 1;
                    console.log("Fim do extrato 0: Avançando para o Extrato 1");
                    this.nestr = 1;
                    this.resetaExtrato(this.nestr,0);
                } else if (this.PSR < this.poutn) {     // reprovação no estrato 0
                    this.resultado = -1;
                    console.log("Fim do extrato 0: Reprovado no extrato 0"); 
                    this.dadosTeste.resultado = 0; 
                    console.log(this.dadosTeste);
                    
                    if(this.termina===false){                    //Flag utilizada para determinar o envio dos dados do teste
                        //Enviar dados pro backend
                        console.log("Fim do teste principal, iniciando coleta de dados.");
                        this.sendDataTest(this.dadosTeste);
                        this.coletaDados = true;                //Inicio da coleta de dados
                        this.termina=true;
                        this.nestr = 1;
                        this.resetaExtrato(this.nestr,0);       //Retomando ao extrato 1
                    }
                    else {                                      //Fim da coleta de dados
                        //Enviar dados ao backend
                        this.questionFlag = true;
                        this.$router.push('/congratulations');
                    }   
                    

                } else if (this.jiter >= this.nq[this.nestr] - this.jquest) { // termina indefinido
                    console.log("Fim do extrato");
                }
            break;  
            case 1:                                     //EXTRATO 1
                if (this.PSR > this.pouts) {            // aprovação no estrato 1
                    this.resultado = 1;
                    console.log("Fim do extrato 1: Avançando para o Extrato 2");
                    this.nestr = 2;
                    this.resetaExtrato(this.nestr,0);
                } else if (this.PSR < this.poutn) {     // reprovação no estrato 1
                    this.resultado = -1;
                    this.nestr = 0;
                    console.log("Fim do extrato 1: Retrocedendo ao extrato 0");  
                    this.resetaExtrato(this.nestr,0);
                } else if (this.jiter >= this.nq[this.nestr] - this.jquest) { // termina indefinido
                    console.log("Fim do extrato");
                }
            break;
            case 2:                                     //EXTRATO 2
                if (this.PSR > this.pouts) {            // aprovação no estrato 2
                    this.resultado = 1;
                    console.log("Fim do extrato 2: Avançando para o Extrato 3");
                    this.nestr = 3;
                    this.resetaExtrato(this.nestr,0);
                } else if (this.PSR < this.poutn) {     // reprovação no estrato 2
                    this.resultado = -1;
                    console.log("Fim do extrato 2: Reprovado no extrato 2");  
                    this.dadosTeste.resultado = 1; 
                    console.log(this.dadosTeste);


                    if(this.termina===false){
                        //Enviar dados pro backend
                        this.sendDataTest(this.dadosTeste);
                        console.log("Fim do teste principal, iniciando coleta de dados.");
                        this.coletaDados = true;
                        this.termina=true;
                        this.nestr = 1;
                        this.resetaExtrato(this.nestr,0);       
                        
                    }
                    else{
                        //Enviar dados ao backend
                        this.questionFlag = true;
                        this.$router.push('/congratulations');
                    }
                } else if (this.jiter >= this.nq[this.nestr] - this.jquest) { // termina indefinido
                    console.log("Fim do extrato");
                }
            break;
            case 3:                                     //EXTRATO 3
                if (this.PSR > this.pouts) {            //Aprovação no estrato 3
                    this.resultado = 1;
                    console.log("Fim do extrato 3: Aprovado no extrato 3");
                    this.dadosTeste.resultado = 3; 
                    console.log(this.dadosTeste);
                    if(this.termina===false){
                        //Enviar dados pro backend
                        this.sendDataTest(this.dadosTeste);
                        console.log("Fim do teste principal, iniciando coleta de dados.");
                        this.coletaDados = true;
                        this.termina=true;
                        this.nestr = 1;
                        this.resetaExtrato(this.nestr,0);      
                    }
                    else{
                        //Enviar dados ao backend
                        this.questionFlag = true;
                        this.$router.push('/congratulations');
                    }
                } else if (this.PSR < this.poutn) {     // reprovação no estrato 3
                    this.resultado = -1;
                    console.log("Fim do extrato 3: Reprovado no extrato 3");
                    this.dadosTeste.resultado = 2; 
                    console.log(this.dadosTeste);

                    if(this.termina===false){
                        //Enviar dados pro backend
                        this.sendDataTest(this.dadosTeste);
                        console.log("Fim do teste principal, iniciando coleta de dados.");
                        this.coletaDados = true;
                        this.termina=true;
                        this.nestr = 1;
                        this.resetaExtrato(this.nestr,0);       
                    }  
                    else{
                        this.questionFlag = true;
                        this.$router.push('/congratulations');
                    }
                } else if (this.jiter >= this.nq[this.nestr] - this.jquest) { // termina indefinido
                    console.log("Fim do extrato");
                    
                }
            break;
            default:
            break;
        }


        /*
        if (this.PSR > this.pouts) {            // aprovação no estrato
            this.resultado = 1;
            console.log("Fim do extrato");
        } else if (this.PSR < this.poutn) {     // reprovação no estrato
            this.resultado = -1;
            console.log("Fim do extrato");  
        } else if (this.jiter >= this.nq[this.nestr] - this.jquest) { // termina indefinido
            console.log("Fim do extrato");
        }
        */

        if(this.questionFlag==false){
            await this.changeQuestion();//Altera questão exibida para o usuario.
            this.changeByID();
        }
        else{

        }
       

    },

    async changeQuestion(){
       /*  if(this.jsonData.questoes[this.questionNumber].id == 'LP_H03_00_014'){
            console.log('questão encontrada');
            this.resetStyle();
            
        } */
        //this.forceRerender();                                  //Rendereiza novamente o componente.
        this.audioAux.pause();  
        this.megafoneDisable=false;                            //Garante que o megafone seja tocado quando a página é trocada.
        this.alertPopup = false;
        clearTimeout(this.alertTimeoutId);
        this.alertTimeoutId = setTimeout(() => {              //Exibe o popup após 45 segundos sem clicar no "Continuar".
            this.displayPopup(1); 
        }, 45000)


        this.questionNumber = this.ordem[this.nestr][this.ind_questao];
        this.questionId = this.jsonData.questoes[this.questionNumber].id
        this.questionText = this.jsonData.questoes[this.questionNumber].text; 
        this.questionTextTitle = this.jsonData.questoes[this.questionNumber].textTitle;  
        this.questionStatement = this.jsonData.questoes[this.questionNumber].qText;    
        this.questionAudio1 = this.jsonData.questoes[this.questionNumber].audio1;
        this.questionAudio2 = this.jsonData.questoes[this.questionNumber].audio2;
        this.questionType = this.jsonData.questoes[this.questionNumber].type;
        this.questionImg1 = this.jsonData.questoes[this.questionNumber].img1;
        this.questionImg2 = this.jsonData.questoes[this.questionNumber].img2;
        this.questionAlt1 = this.jsonData.questoes[this.questionNumber].alt1;
        this.questionAlt2 = this.jsonData.questoes[this.questionNumber].alt2;
        this.questionAlt3 = this.jsonData.questoes[this.questionNumber].alt3;
        this.questionAlt4 = this.jsonData.questoes[this.questionNumber].alt4;
        this.questionAnswer = this.jsonData.questoes[this.questionNumber].answer;
        this.fonte = this.jsonData.questoes[this.questionNumber].fonte;
        this.playAudio(1);

        

        console.log("Código : " +this.questionId);
        console.log("Indice : " +this.ind_questao);
        console.log("Layout : " +this.jsonData.questoes[this.questionNumber].layout);


        if(this.questionTextTitle==''){
            this.stMargin = '0';
        }
        else{
            this.stMargin = '2vh';
        }

        switch(this.jsonData.questoes[this.questionNumber].layout){
              case 'm1':
                this.layoutCheck = 'm1';
               /*  if(this.questionId=='LP_H03_00_014_F'){
                    this.changeByID('LP_H03_00_014_F');
                } */
              break;
              case 'm2':
                this.layoutCheck = 'm2';
                //document.getElementById("layout1").style.height = "92vh";  //Muda o tamanho da main-div
              break;
              case 'm3':
                this.layoutCheck = 'm3';
              break;
              case 'm4':
                this.layoutCheck = 'm4';
                this.alt1Img = this.jsonData.questoes[this.questionNumber].alt1Img;
                this.alt2Img = this.jsonData.questoes[this.questionNumber].alt2Img;
                this.alt3Img = this.jsonData.questoes[this.questionNumber].alt3Img;
                this.alt4Img = this.jsonData.questoes[this.questionNumber].alt4Img;

              break;
              case 'm5':
                this.layoutCheck = 'm5';
              break;
              
              default:
                
              break
              

          }
          
    },

    resetaOrdem(){         //Vai randomizar novamente a ordem das questões dos extratos.
        let ordem_0 = [];
        let ordem_1 = [];
        let ordem_2 = [];
        let ordem_3 = [];

        for(let i=0;i<jsonData0.extrato.length; i++){
            ordem_0[i] = [i];
        }
        for(let i=0;i<jsonData1.extrato.length; i++){
            ordem_1[i] = [i];
        }
        for(let i=0;i<jsonData2.extrato.length; i++){
            ordem_2[i] = [i];
        }
        for(let i=0;i<jsonData3.extrato.length; i++){
            ordem_3[i] = [i];
        }

        ordem_0 = this.shuffleArray(ordem_0);
        ordem_1 = this.shuffleArray(ordem_1);
        ordem_2 = this.shuffleArray(ordem_2);
        ordem_3 = this.shuffleArray(ordem_3);

        //ordem_0 = [0,1,2,3,4,5,6,7,8,9];                //Para testar sequencialmente, comentar depois.
       // ordem_1 = [0,1,2,3,4,5,6,7,8,9,10,11];           //Para testar sequencialmente, comentar depois.  
       
         
        this.ordem = [ordem_0, ordem_1, ordem_2, ordem_3];
    },

    displayPopup(aux){   
        if(aux==1){
            this.alertPopup = true;
        }

        else if(aux==0){
            this.alertPopup = false;
            this.alertTimeoutId = setTimeout(() => {
                 this.displayPopup(1); 
            }, 45000)
        }
    },


    sendDataTest(dataTest){

    
        return new Promise((resolve, reject) => {
            axios({ url: 'https://ta-back.onrender.com/dataTest', data: dataTest, method: 'POST' })
            .then((response) => {
                console.log(response)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    

    resetMegafone(){            //Utilizar esta função sempre que trocar de item.
      this.megafoneDisable = false;
      console.log(this.megafoneDisable);
    },

    forceRerender() {
    console.log('teste');
      switch(this.layoutCheck){
        case 'm1':
            console.log("Componente 1 renderizado")
            this.m1Key += 1;
        break;
        case 'm2':
        console.log("Componente 2 renderizado")

            this.m2Key += 1;
        break;
        case 'm3':
        console.log("Componente 3 renderizado")

            this.m3Key += 1;
        break;
        case 'm4':
            this.m4Key += 1;
        break;
        case 'm5':
            this.m5Key += 1;
        break;
      }
    }


  },

}
</script>

<style>

.mainDiv{
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    align-items: center;
}

@font-face {
    font-family: Manrope;
    src: url(../assets/fonts/Manrope/Manrope-Regular.ttf);
}

@font-face {
    font-family: Manrope-light;
    src: url(../assets/fonts/Manrope/Manrope-Light.ttf);
}
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Manrope', sans-serif;

}

.conteudo{
    display: flex;
    flex-direction: row;
    width: 96vw;
    height: 92vh;
    border: 1px solid rgba(57, 57, 57, 0.681);
    background-color: #f9f7f7;
    -webkit-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    -moz-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);

}

.pergunta{
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 92vh;
    border-right: 1px solid rgba(57, 57, 57, 0.681);

   
}

/* Icone do megafone+tooltip */

.icon-mega{
    position: relative;
    display: inline-block;
    background: url(../assets/icons/megaphone.svg);
    width: 95px;
    height: 95px;
    background-size: cover;
    margin-top: 5vh;
    margin-left: 1.5vw;
    border: 1px solid rgba(76, 75, 75, 0.612);
    border-radius: 5px;
    cursor: pointer;
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.079) 0 7px 13px -3px, #5451511d 0 -1px 0 inset;
    transform: translateY(-1px);

 }
 
 
 /* icone para caso existam dois audios na questão */
 .mega2{
    align-self: center;
    display: none;
 }
 
 .icon-mega:hover {
     box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.079) 0 7px 13px -3px, #5451511d 0 -1px 0 inset;
     transform: translateY(-2px);
     transition: transform 0.2s;
 }  
 
 .icon-mega:active {
     box-shadow: #ffffff72 0 1px 3px inset;
     transform: translateY(1px);
 }
 
 .icon-mega .tooltipText {
     font-family: Manrope;
     visibility: hidden;
     width: 120px;
     font-size: 23px;
     background-color: rgba(61, 61, 61, 0.961);
     color: #ffffff;
     text-align: center;
     padding: 5px 0;
     border-radius: 6px;
     bottom: 100%;
     left: 50%;
     margin-left: -54px;
     box-shadow: rgba(45, 35, 66, 0.8) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#ffffff 0 0 0 inset;
     opacity: 0;
     transition: opacity 0.5s;
     position: absolute;
     z-index: 1;
    }
   
.icon-mega:hover .tooltipText {
    visibility: visible;
    opacity: 1;
}


.questionText-div{
    display: flex;
    flex-direction: column;
    margin-top: 3vh;
    border: 1px solid rgb(63, 63, 63);
    -webkit-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    -moz-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    border-radius: 7px;
    transform: translateY(-1px);
    width:95%;
    padding: 1.2vw 1.2vw 1.2vw 1.2vw;
    align-self: center;
    align-items: center;
    justify-content: center;
    background: #ffffff;

}
 
.text-title{
    font-weight: bold;
    font-size: 1.75rem;


}

.question-statement{
    width: 100%;
    font-size: 1.75rem;
    font-family: Manrope-Light;
    text-align: justify;
    white-space: pre-line;

}


.question-img{
    margin-top: 6vh;
    margin-left: 3vw;
    height: auto;
    width: auto;
    align-self: center;
    
}

.resposta{
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: column;
}

.question-text{
    margin-top: 20.5vh;
    padding-left: 1.5vw;
    font-size: 1.6rem;
    font-family: Manrope;
    width: 95%;
    height: 6vh;

}


.question-form{
    padding-left: 1.5vw;
    width: 100%;
    height: 30vh;
    margin-top: 1vh;
}

.alternative{
    display: flex;
    flex-direction: row;
    padding: 1vh 1vw 1vh 1vw;
    align-items: center;
    border: 0.15rem solid #f9f7f7;
    border-radius: 5px;
    -webkit-transition: border-color 0.5s ease;
    -moz-transition: border-color 0.5s ease;
    -o-transition: border-color 0.5s ease;
    -ms-transition: border-color 0.5s ease;
    transition: border-color 0.3s ease;       
    cursor: pointer;
    width: 33vw;
    
}

.alternative:hover{
    border-color: #1E3892;
}


/* input circular(Radio input) */
.option{ 
    font-size: 50px;
    cursor: pointer;
    content: '';
    background: #f4f4f4;
    border-radius: 100%;
    border: 1px solid darken(#000000, 25%);
    display: inline-block;
    width: 20px;
    height: 20px;
    position: relative;
}


.radio-text{
    font-size: 1.6rem;
    margin-left: 13px;
    color: rgba(0, 0, 0, 0.889);
    font-family: Manrope-light;
    font-weight: 600;
    cursor: pointer;


}

.radio-text:hover{
    color: rgb(0, 0, 0);
    font-weight: bold;
    transition: color 0.2s;
}

/* Layout 2 */

.main-m2{
    height: 100vh;
}

.conteudo-m2{
    flex-direction: column;
    height: 92vh;
}

.pergunta-m2{
    display: flex;
    flex-direction: row;
    border-right: none;
    width: 100%;    
}

.questionImg-m2{
    width: 55vw;
    height: 41vh;
    margin-top: 5vh;
    margin-left: 13vw;
    -webkit-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    -moz-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);

}

.questionText-m2{
    padding-right: 60px;
    font-family: Manrope;
    font-weight: 600;
    margin-top: 2.8vh;
    margin-left: 16.8vw;
    width: 85vw;
}

.form-m2{
    margin-left: 16.8vw;
    height: 25vh;
    margin-top: 0;
}

.button-m2{
    align-self: center;
    margin-left: 120vh;
    margin-top: 2.5vh;
}

/* Layout 3 */

.pergunta-m3{
    flex-direction: row;
    gap:1.5vw;
}

.img-m3{
    margin-left: 0.8vw;
    align-self: center;
    width: 42vw;
    height: auto;
}




/* Layout 4 (Questões sem texto/imagens) */

.form-alt{
    margin-top: 17vh;
    margin-left: 7vw
}
.option-alt{
    width: 24px;
    height: 24px;

}

.radio-text-alt{
    font-size: 30px;
}

.pergunta-m4 {
    border-right: none;
    width: 100%;
    height: 75vh;
}


.label-m4{
    display: none;
}

.button-m5{
    margin-top: 0px;
    width: 22vw;
    height: 8vh;
    font-size: 1.55rem;
}

/* Layout 5 (Imagens nas alternativas) */



.conteudo-m4{
    flex-direction: column;
    align-items: center;
}


.img-m4{
    width: 26vw;
    height: auto;
    border: 1px solid black;
    margin-left: 28vw;
}

.questions-div{
    margin-top: 16vh;
    display: grid;
    grid-template-columns: 40% 40%;
    row-gap: 4vh;
    width: 80vw;
    align-items: center;
    justify-content: center;
    margin-left: 4vw;
}

.alternative-m4{
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 0.12rem solid rgb(5, 5, 5);
    background-color: #ffffff;
    width: 26vw;
}


.alt-img{
    width: 20vw;
}

.button-m4{
    width: 20vw;
    margin-top: 22vh;
}

.icon-questionImg{
    display: flex;
    flex-direction: row;
    align-self: flex-start;
}

.option-m4{
    font-size: 50;
    cursor: pointer;
    content: '';
    background: #f4f4f4;
    border-radius: 100%;
    border: 1px solid darken(#000000, 25%);
    display: inline-block;
    width: 24px;
    height: 24px;
    position: relative;
}

.sub-title{
    font-family: Manrope-Light;
}

.time-popup{
    position: absolute;
    top: 33%;
    left: 39%;
    z-index: 2;
}

@media (max-width: 1550px) {
    .icon-mega{
        width: 70px;
        height: 70px;
    }

    .icon-mega .tooltipText{
        font-size: 1rem;
        width:7vw;
        margin-left:-3.5vw;
    }

    .radio-text{
        font-size: 1.2rem;
    }


    .question-form{
        margin-top: 3vh;
    }

    /* Layout 1 */

    .text-title{
        font-size: 1.2rem;
    }

    .question-statement{
        font-size: 1.2rem;
    }

    .question-text{
        font-size: 1.1rem;
    }

    .radio-text{
        font-size:1.1rem;
    }

    .button-m1{
        width: 18vw;
        height: 8vh;
        font-size: 1.2rem;
        margin-top: 18vh;
    }

    /* Layout 2 */

    .form-m2{
        margin-left: 16.8vw;
        height: 25vh;
        margin-top: 0;
    }


    .button-m2{
        width: 17vw;
        height: 7vh;
        font-size: 1.1rem;
        margin-left: 60vw;
    }


    .questionText-m2{
        font-size: 0.9rem;
    }

    .radioM2{
        font-size: 0.9rem;
    }

    .option-m2{
        width: 16px;
    }

    /* Layout 3 */

    .button-m3{
        font-size: 1.15rem;
        width: 18vw;
        height: 8vh;
        margin-top: 17vh;
    }
    
    .img-m3{
        margin-left: 1.8vw;
        align-self: center;
        width: 34vw;
        height: auto;
    }



    /* Layout 4 */

    .button-m4{
        margin-top: 16vh;
        height:8vh;
        font-size: 1.2rem;
    }

    
   
    /* Layout 5 */

    .button-m5{
        margin-top: 3vh;
        width: 21vw;
        height: 7vh;
        font-size: 1.15rem;
    }

    .form-m5{
        margin-top: 15vh;
    }

   
}






</style>