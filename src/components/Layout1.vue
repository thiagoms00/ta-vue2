<template>

    <div class="mainDiv">
        <PopupTeste ref="PopupTeste" :extratoCounter="nestr" />
        <PopupIntervalo ref="PopupIntervalo" @playAudio="playAudio(1)" @stopAudio="stopAudio()"/>
        <FlexBar :fonte="fonte" />
        <div class="conteudo" v-if="layoutCheck == 'm1'">
            <div class="pergunta">
                <div class="icon-mega" @click="playAudio(1)">
                    <span class="tooltipText">Escutar</span>
                </div>

                <img src="" alt="" class="question-img" id="imgM1" :style="{ content: questionImg1 }"
                    v-if="questionStatement == ''">
                <div class="questionText-div" id="questionDiv" v-else>
                    <span class="text-title" v-if="questionTextTitle != ''">{{ questionTextTitle }}<br></span>
                    <h2 class="sub-title" id="subTitle">{{ questionSubtitle }}</h2>
                    <h2 class="question-statement" id="questionStatement" :style="{ marginTop: stMargin, }">
                        {{ questionStatement }}</h2>
                </div>
            </div>

            <div class="resposta">
                <h2 class="question-text">{{ questionText }}</h2>

                <form action="" class="question-form" id="questionForm">

                    <div class="alternative" @click="clickAlternative(1)">
                        <input type="radio" id="alt1" name="question-choice" value="1" class="option option-m1">
                        <label for="alt1" class="radio-text radio-textM1" id="radioLabel1">{{ questionAlt1 }}</label><br>
                    </div>

                    <div class="alternative" @click="clickAlternative(2)">

                        <input type="radio" id="alt2" name="question-choice" value="2" class="option option-m1">
                        <label for="alt2" class="radio-text radio-textM1" id="radioLabel2">{{ questionAlt2 }}</label><br>

                    </div>

                    <div class="alternative" @click="clickAlternative(3)">
                        <input type="radio" id="alt3" name="question-choice" value="3" class="option option-m1">
                        <label for="alt3" class="radio-text radio-textM1" id="radioLabel3">{{ questionAlt3 }}</label>
                    </div>

                    <!-- <br> -->

                    <div class="alternative" @click="clickAlternative(4)">
                        <input type="radio" id="alt4" name="question-choice" value="4" class="option option-m1">
                        <label for="alt4" class="radio-text radio-textM1" id="radioLabel4">{{ questionAlt4 }}</label>
                    </div>

                    <br>

                </form>

                <ContButton class="button-m1" id="buttonM1" @click="checkAnswer" />

            </div>
        </div>

        <!-- Layout 2(Imagem com largura grande) -->
        <div class="conteudo conteudo-m2" v-else-if="layoutCheck == 'm2'">


            <div class="pergunta pergunta-m2">
                <div class="icon-mega" @click="playAudio(1)">
                    <span class="tooltipText">Escutar</span>
                </div>

                <!-- <img src="{{}}" alt="imagem da questao" class=""> -->
                <img src="" alt="" class="question-img questionImg-m2" :style="{ content: questionImg1 }">
            </div>

            <div class="resposta">

                <h2 class="question-text questionText-m2">{{ questionText }}</h2>
                <form action="" class="question-form form-m2">

                    <div class="alternative alternative-m2" @click="clickAlternative(1)">
                        <input type="radio" id="alt1" name="question-choice" value="1" class="option option-m2">
                        <label for="alt1" class="radio-text radioM2" id="radioLabel1">{{ questionAlt1 }}</label><br>
                    </div>

                    <div class="alternative alternative-m2" @click="clickAlternative(2)">

                        <input type="radio" id="alt2" name="question-choice" value="2" class="option option-m2">
                        <label for="alt2" class="radio-text radioM2" id="radioLabel2">{{ questionAlt2 }}</label><br>

                    </div>

                    <div class="alternative alternative-m2" @click="clickAlternative(3)">
                        <input type="radio" id="alt3" name="question-choice" value="3" class="option option-m2">
                        <label for="alt3" class="radio-text radioM2" id="radioLabel3">{{ questionAlt3 }}</label>
                    </div>

                    <!-- <br> -->

                    <div class="alternative alternative-m2" @click="clickAlternative(4)">
                        <input type="radio" id="alt4" name="question-choice" value="4" class="option option-m2">
                        <label for="alt4" class="radio-text radioM2" id="radioLabel4">{{ questionAlt4 }}</label>
                    </div>

                    <br>

                </form>

                <button class="question-button button-m2" @click="checkAnswer">Continuar</button>

            </div>

        </div>

        <!-- Layout 3(Imagem com altura grande) -->
        <div class="conteudo" v-else-if="layoutCheck == 'm3'">
            <div class="pergunta pergunta-m3">
                <div class="icon-mega" @click="playAudio(1)">
                    <span class="tooltipText">Escutar</span>
                </div>

                <img src="" alt="" class="question-img img-m3" id="imgM3" :style="{ content: questionImg1 }"
                    v-if="questionStatement == ''">
                <div class="questionText-div" id="questionDiv" v-else>
                    <span class="text-title" v-if="questionTextTitle != ''">{{ questionTextTitle }}<br></span>
                    <h2 class="question-statement" id="questionStatement" :style="{ marginTop: stMargin, }">
                        {{ questionStatement }}</h2>
                </div>
            </div>

            <div class="resposta">
                <h2 class="question-text">{{ questionText }}</h2>

                <form action="" class="question-form" id="questionForm">

                    <div class="alternative" @click="clickAlternative(1)">
                        <input type="radio" id="alt1" name="question-choice" value="1" class="option option-m3">
                        <label for="alt1" class="radio-text" id="radioLabel1">{{ questionAlt1 }}</label><br>
                    </div>

                    <div class="alternative" @click="clickAlternative(2)">

                        <input type="radio" id="alt2" name="question-choice" value="2" class="option option-m3">
                        <label for="alt2" class="radio-text" id="radioLabel2">{{ questionAlt2 }}</label><br>

                    </div>

                    <div class="alternative" @click="clickAlternative(3)">
                        <input type="radio" id="alt3" name="question-choice" value="3" class="option option-m3">
                        <label for="alt3" class="radio-text" id="radioLabel3">{{ questionAlt3 }}</label>
                    </div>

                    <!-- <br> -->

                    <div class="alternative" @click="clickAlternative(4)">
                        <input type="radio" id="alt4" name="question-choice" value="4" class="option option-m3">
                        <label for="alt4" class="radio-text" id="radioLabel4">{{ questionAlt4 }}</label>
                    </div>

                    <br>

                </form>

                <ContButton id="buttonM3" class="button-m3" @click="checkAnswer()" />

            </div>
        </div>

        <!-- Layout 4, questões com imagens na alternativas -->
        <div class="conteudo conteudo-m4" v-else-if="layoutCheck == 'm4'">

            <div class="icon-questionImg">
                <div class="icon-mega" @click="playAudio(1)">
                    <span class="tooltipText">Escutar</span>
                </div>
                <img src="" alt="" class="question-img img-m4" id="img-m4" :style="{ content: questionImg1 }">
            </div>


            <div class="questions-div" id="questionsDiv">
                <div class="alternative alternative-m4" id="altM4-1" @click="clickAlternative(1)">
                    <input type="radio" id="alt1" name="question-choice" value="1" class="option option-m4">
                    <label for="alt1" class="radio-text label-m4" id="radioLabel1"></label>
                    <img src="" alt="" class="alt-img" id="labelImg1" :style="{ content: alt1Img }">
                </div>
                <div class="alternative alternative-m4" id="altM4-2" @click="clickAlternative(2)">
                    <input type="radio" id="alt2" name="question-choice" value="2" class="option option-m4">
                    <label for="alt2" class="radio-text label-m4" id="radioLabel2"></label>
                    <img src="" alt="" class="alt-img" id="labelImg2" :style="{ content: alt2Img }">
                </div>

                <div class="alternative alternative-m4" id="altM4-3" @click="clickAlternative(3)">
                    <input type="radio" id="alt3" name="question-choice" value="3" class="option option-m4">
                    <label for="alt3" class="radio-text label-m4" id="radioLabel3"></label>
                    <img src="" alt="" class="alt-img" id="labelImg3" :style="{ content: alt3Img }">
                </div>

                <div class="alternative alternative-m4" id="altM4-4" @click="clickAlternative(4)">
                    <input type="radio" id="alt4" name="question-choice" value="4" class="option option-m4">
                    <label for="alt4" class="radio-text label-m4" id="radioLabel4"></label>
                    <img src="" alt="" class="alt-img" id="labelImg4" :style="{ content: alt4Img }">
                </div>
            </div>

            <ContButton class="button-m4" id="buttonM4" @click="checkAnswer()" />


        </div>

        <!-- Layout de questõs pequenas (sem imagem/texto) -->
        <div class="conteudo conteudo-m2" v-else="layoutCheck=='m5'">

            <div class="pergunta pergunta-m4">
                <div class="icon-mega" @click="playAudio(1)">
                    <span class="tooltipText">Escutar</span>
                </div>

                <form action="" class="question-form form-alt form-m5">

                    <div class="alternative" @click="clickAlternative(1)">
                        <input type="radio" id="alt1" name="question-choice" value="1" class="option option-m5">
                        <label for="alt1" class="radio-text radio-textM5" id="radioLabel1">{{ questionAlt1 }}</label><br>
                    </div>

                    <div class="alternative" @click="clickAlternative(2)">

                        <input type="radio" id="alt2" name="question-choice" value="2" class="option option-m5">
                        <label for="alt2" class="radio-text radio-textM5" id="radioLabel2">{{ questionAlt2 }}</label><br>

                    </div>

                    <div class="alternative" @click="clickAlternative(3)">
                        <input type="radio" id="alt3" name="question-choice" value="3" class="option option-m5">
                        <label for="alt3" class="radio-text radio-textM5" id="radioLabel3">{{ questionAlt3 }}</label>
                    </div>

                    <!-- <br> -->

                    <div class="alternative" @click="clickAlternative(4)">
                        <input type="radio" id="alt4" name="question-choice" value="4" class="option option-m5">
                        <label for="alt4" class="radio-text radio-textM5" id="radioLabel4">{{ questionAlt4 }}</label>
                    </div>

                    <br>

                    <br>

                </form>

            </div>

            <ContButton class="question-button button-m5" @click="checkAnswer" />



        </div>
    </div>





</template>

<script>

import ContButton from './ContButton.vue';
import axios from 'axios';

//Informações sobre os itens.
import jsonDataQuestoes0 from '../assets/questao/questoes_extrato0.json';
import jsonDataQuestoes1 from '../assets/questao/questoes_extrato1.json';              //Primeiro estrato a ser utilizado.
import jsonDataQuestoes2 from '../assets/questao/questoes_extrato2.json';
import jsonDataQuestoes3 from '../assets/questao/questoes_extrato3.json';
import jsonDataQuestoes2Nt from '../assets/questao/extrato2_nt';

//Dados das "planilhas."
import jsonData0 from '../assets/extratos/extrato0.json';
import jsonData1 from '../assets/extratos/extrato1.json';
import jsonData2 from '../assets/extratos/extrato2.json';
import jsonData3 from '../assets/extratos/extrato3.json';
import jsonData2Nt from '../assets/extratos/extrato2nt.json'

import FlexBar from '@/components/FlexBar.vue';
import PopupTeste from './PopupTeste.vue'
import PopupIntervalo from './PopupIntervalo.vue';



export default {
    name: 'Layout1',
    components: {
        ContButton,       //Botão azul presente em todos itens.
        FlexBar,          //Barra azul superior, contem o botão com a fonte. 
        PopupTeste,
        PopupIntervalo
    },

    data() {
        return {

            /* Parte visual */
            imgSrc: '../assets/imgs/Logo-Impacto-removebg.png',
            layoutCheck: '',
            questionNumber: 0,
            questionId: '',
            questionStatement: '',    //Enunciado escrito(Texto no lugar da imagem)
            questionTextTitle: '',
            questionText: '',     //Enunciado da questão
            questionAudio1: '',   //Audio 1
            questionAudio2: '',   //Audio 2
            questionType: '',     //tipo(Matéria da questão)
            questionImg1: '',     //Imagem 1 da questão
            questionImg2: '',    //Imagem 2 da questão
            questionAlt1: '',     //Alternativa1
            questionAlt2: '',     //Alternativa2
            questionAlt3: '',      //Alternativa3
            questionAlt4: '',     //Alternativa4
            questionAnswer: '',   //Alternativa4 resposta da pergunta
            alt1Img: '',          //Caso tenha uma imagem na alternativa
            alt2Img: '',
            alt3Img: '',
            alt4Img: '',
            fonte: '',

            questionSubtitle: '', //Caso a questão tenha um sub-titulo

            stMargin: '',
            audioVis: '',

            anoAluno: 1,         //Ano do aluno que está realizando o teste.
            qtdResp : 0,

            /* Dados do Teste adaptativo */
            questao_id: '',
            probabilidades_domina: [],
            probabilidades_naodom: [],
            ordem: [],
            nq: [],
            PSR: 0,
            PS: 0.5,
            pouts: 0.95,
            poutn: 0.05,
            poutn1: 0.15,
            jquest: 0,
            nestr: 1,                           //Numero do extrato que vai ser testado, define o valor a ser acessado na matriz das probabilidades.
            jiter: 0,

            /* Dados do teste adaptativo que vão ser resetados sempre que um extrato novo for chamado */
            Questoes: [],
            Respostas: [],
            termina: false,                    //Determina quando o teste principal acaba.
            coletaDados: false,                //Determina quando a coleta de dados começa.
            coletaDadosInd: 0,
            questionFlag: false,               //Determina quando o sistema para de enviar questões.
            ind_questao: 0,
            resultado: 0,
            seq_prob_dom: [],
            seq_prob_ndom: [],
            jsonData: [],
            megafoneDisable: false,
            alertPopup: false,
            alertTimeoutId: '',
            audioAux: '',
            firstQuestion: true,               //Flag que vai ser usada para determinar se o usuario respondeu pelo menos uma questão. 
            extrato1Flag: false,               //Vai ser usado para determinar se o usuario já foi reprovado no extrato1.
            changeTestAudio: false,

            m1Key: 0,                            //Chave do layout1.
            m2Key: 0,                            //Chave do layout2.
            m3Key: 0,                            //Chave do layout3.
            m4Key: 0,                            //Chave do layout4.
            m5Key: 0,                            //Chave do layout5.

            dadosTeste: {                      /* Objeto que armazena as informações do teste. */
                tokenAluno: '',                //Token referente ao aluno.
                qtdQuestoes: 0,                //Quantidade de questões no teste.
                qtdAcertos: 0,                 //Quantidade de acertos no teste.
                questoesRespondidas: [],       //Array com os itens que foram respondidos.
                resultado: 0,                  //Resultado final do teste(numero do extrato).
                ordemQuestoes: [],             //Ordem das questões enviadas ao aluno.
                extratoAtual: 1,               
                indiceAtual : 0,      
                testeStart : false,  
                dadosPSR: 0.5,
                probabilidadeDom : [],
                probabilidadeNdom: [],
                seqProbDom : [],
                seqProbNdom : [],
                nq: [],
                questao_id: [],
                jiter: [],
                extrato1Flag: false,
                termina: false,
                firstQuestion: true,
            },

            dadosTeste2 : {             //Objeto com os dados da parte 2 do teste.
                tokenAluno : '',
                numQ : 0,           
                numQCor: 0,
                numQErr: 0,
                qtdHab: 0,
                hab : [],
                itensResp : [],
                tempoTeste2 : null,
            },
            qTestProb : [],            //Array com as probabilidades das questões da coleta de dados.
            indProb: 0,                //Indice usado para percorrer o array de probabilidades.
            tempoItem : null,
            tempoItem2 : null,

            dialog: false,
            horaInicio: undefined,
            horaFim: undefined,
            tempoInicioQuestao: undefined,
            tempoFimQuestao: undefined,

        }
    },

    created() {  //Sempre é chamado quando a pagina é carregada

        this.horaInicio = new Date();
        this.tempoInicioQuestao = new Date();
        this.tempoItem = new Date();
        this.anoAluno = localStorage.getItem('anoAtual');
        
        

        let cookieAux = JSON.parse(localStorage.getItem('testeStart'));
        if(cookieAux==null){
            //Cookie não foi encontrado.
        }
        else{
            this.dadosTeste = JSON.parse(localStorage.getItem('testeStart'));       
        }
        
        this.dadosTeste.tokenAluno = localStorage.getItem('token');     


        /* Verificando se existe um teste atual em andamento.
           Caso não exista um teste em andamento, um teste novo é iniciado e a função "startTest é chamada".
           Caso exista um teste, a função "resumeTest é chamada".
        */

        if(this.dadosTeste.testeStart && this.dadosTeste.firstQuestion==false){             //Flag usada para determinar se existe um teste em andamento.
            console.log("Teste em andamento");
            console.log(this.dadosTeste);
            this.resumeTest();
        }
        else{
            console.log("Iniciando um novo teste");
            this.testeStatus(1);
            this.startTest();
        }
           
    

        /* Propriedades do item à ser respondido. */
      
        this.questionNumber = this.ordem[this.nestr][this.ind_questao];
        this.questionId = this.jsonData.questoes[this.questionNumber].id;
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

        if (this.questionTextTitle == '') {
            this.stMargin = '0';
        }
        else {
            this.stMargin = '2vh';
        }

        /* Define o layout do teste por enquanto 4 layouts foram criados.
            m1: Para questões com um texto no enunciado
            m2: Para questões com uma Imagem grande no enunciado
            m3: Para questões com uma Imagem menor no enunciado
            m4: Para questões com Imagens nas alternativas
            m5: Para questões com sem enunciado(apenas audio e as alternativas)
        */
        switch (this.jsonData.questoes[this.questionNumber].layout) {
            case 'm1':
                this.layoutCheck = 'm1';
                break;
            case 'm2':
                this.layoutCheck = 'm2';
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

    mounted() {                          //Chamado após os componentes carregarem.
        this.playAudio(1);
        this.changeByID();
    },

    methods: {

        resetStyle() {         //Chamado sempre que um item novo é exibido na tela.
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

        async checkAnswer() {                     //É chamado sempre que um usuario clicar no botão "Continuar"
            
            this.resetTimer();
            this.changeByID();

            const radioButtons = document.querySelectorAll('input[name="question-choice"]');  //seleciona todos os radio buttons.
            for (const radioButton of radioButtons) {
                if (radioButton.checked) {                                                     //Vê qual radio button foi selecionado.
                    let selectedButton = radioButton.value;
                    if(!this.coletaDados){
                        this.aplicaQuestao(radioButton.value - 1);
                    }
                    else{
                        let alt = (parseInt(selectedButton));
                        this.coletaDadosInd++;
                        this.AtualizaDadosTeste(alt);

                        if(this.coletaDadosInd>=this.jsonData.questoes.length){     //termina a coleta de dados.
                            let auxDate = new Date();
                            this.dadosTeste2.tempoTeste2 = (auxDate - this.dadosTeste2.tempoTeste2)/1000;    //Obtem tempo total do teste
                            this.questionFlag = true;
                            this.dadosTeste2.tokenAluno = localStorage.getItem('token');
                            this.testeStatus(0);

                            
                            console.log(this.dadosTeste2);
                            this.sendDataTest2(this.dadosTeste2)

                            this.$router.push('/congratulations');
                        }
                        else{
                            await this.changeQuestion();        //Altera questão exibida para o usuario.
                            this.changeByID();
                        }
                       
                        
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

        playAudio() {
            if (this.megafoneDisable == false) {
                this.audioAux = new Audio(this.questionAudio1);
                this.megafoneDisable = true;
                this.audioAux.play();
                setTimeout(this.resetMegafone, 5500);           //Impede que o megafone seja tocado por 5,5 segundos.
            }
        },

        stopAudio() {
            console.log("PAUSANDO AUDIO")
            if (this.audioAux) {
                this.audioAux.pause();
                this.audioAux.currentTime = 0;  // Opcional: Reinicia o áudio para o início.
            }
        },



        changeByID() {                                          //Muda detalhes com base no ID do item


            let aux, aux2;


            switch (this.questionId) {

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
                case 'LP_H05_11_006':
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
                    aux.style.display = 'none';

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
        clickAlternative(alt) {
            let aux;
            switch (alt) {
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

        startTest() {
            /* Iniciando o Algoritmo, armazenando o tamanho total de cada array que contem os dados dos extratos.*/

            const nq0 = jsonData0.extrato.length;
            const nq1 = jsonData1.extrato.length;
            const nq2 = jsonData2.extrato.length;
            const nq3 = jsonData3.extrato.length;

           
            this.nq = [nq0, nq1, nq2, nq3]; //Array contendo os tamanhos relativos aos extratos.
            this.dadosTeste.nq = this.nq;

            let questao_id_0 = [];
            let questao_id_1 = [];
            let questao_id_2 = [];
            let questao_id_3 = [];


            /* Armazenando os identificadores de cada extrato. */
            for (let i = 0; i < jsonData0.extrato.length; i++) {
                questao_id_0[i] = jsonData0.extrato[i].id;
            }
            for (let i = 0; i < jsonData1.extrato.length; i++) {
                questao_id_1[i] = jsonData1.extrato[i].id;
            }
            for (let i = 0; i < jsonData2.extrato.length; i++) {
                questao_id_2[i] = jsonData2.extrato[i].id;
            }
            for (let i = 0; i < jsonData3.extrato.length; i++) {
                questao_id_3[i] = jsonData3.extrato[i].id;
            }
          


            this.questao_id = [questao_id_0, questao_id_1, questao_id_2, questao_id_3]; //Array final com arrays dos identificadores.
            this.dadosTeste.questao_id = this.questao_id;
            

            /* Armazenando as probabilidades de escolher uma questão, essa parte ficou confusa no algoritmo em python. */

            /* Cria um Array contendo arrays com as probabilidades de escolher uma alternativa, dado que domine a questão. */
            let probabilidades_domina_0 = [[], [], [], []];
            let probabilidades_domina_1 = [[], [], [], []];
            let probabilidades_domina_2 = [[], [], [], []];
            let probabilidades_domina_3 = [[], [], [], []];


            /* Cria um Array contendo arrays com as probabilidades de escolher uma alternativa, dado que não domine a questão. */
            let probabilidades_naodom_0 = [[], [], [], []];
            let probabilidades_naodom_1 = [[], [], [], []];
            let probabilidades_naodom_2 = [[], [], [], []];
            let probabilidades_naodom_3 = [[], [], [], []];


     
            for (let i = 0; i < jsonData0.extrato.length; i++) {
                probabilidades_domina_0[0].push(jsonData0.extrato[i].ad);
                probabilidades_domina_0[1].push(jsonData0.extrato[i].bd);
                probabilidades_domina_0[2].push(jsonData0.extrato[i].cd);
                probabilidades_domina_0[3].push(jsonData0.extrato[i].dd);

                probabilidades_naodom_0[0].push(jsonData0.extrato[i].as);
                probabilidades_naodom_0[1].push(jsonData0.extrato[i].bs);
                probabilidades_naodom_0[2].push(jsonData0.extrato[i].cs);
                probabilidades_naodom_0[3].push(jsonData0.extrato[i].ds);

            }

            //Extrato 1
            for (let i = 0; i < jsonData1.extrato.length; i++) {
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

            for (let i = 0; i < jsonData2.extrato.length; i++) {
                probabilidades_domina_2[0].push(jsonData2.extrato[i].ad);
                probabilidades_domina_2[1].push(jsonData2.extrato[i].bd);
                probabilidades_domina_2[2].push(jsonData2.extrato[i].cd);
                probabilidades_domina_2[3].push(jsonData2.extrato[i].dd);

                probabilidades_naodom_2[0].push(jsonData2.extrato[i].as);
                probabilidades_naodom_2[1].push(jsonData2.extrato[i].bs);
                probabilidades_naodom_2[2].push(jsonData2.extrato[i].cs);
                probabilidades_naodom_2[3].push(jsonData2.extrato[i].ds);

            }

            //Extrato 3
            for (let i = 0; i < jsonData3.extrato.length; i++) {
                probabilidades_domina_3[0].push(jsonData3.extrato[i].ad);
                probabilidades_domina_3[1].push(jsonData3.extrato[i].bd);
                probabilidades_domina_3[2].push(jsonData3.extrato[i].cd);
                probabilidades_domina_3[3].push(jsonData3.extrato[i].dd);

                probabilidades_naodom_3[0].push(jsonData3.extrato[i].as);
                probabilidades_naodom_3[1].push(jsonData3.extrato[i].bs);
                probabilidades_naodom_3[2].push(jsonData3.extrato[i].cs);
                probabilidades_naodom_3[3].push(jsonData3.extrato[i].ds);
            }

        

            this.probabilidades_domina = [probabilidades_domina_0, probabilidades_domina_1, probabilidades_domina_2, probabilidades_domina_3
                
            ];
            this.probabilidades_naodom = [probabilidades_naodom_0, probabilidades_naodom_1, probabilidades_naodom_2, probabilidades_naodom_3
               
            ];

            this.dadosTeste.probabilidadeDom = this.probabilidades_domina;
            this.dadosTeste.probabilidadeNdom = this.probabilidades_naodom;

            /* Randomizando a ordem das questões. */
            let ordem_0 = [];
            let ordem_1 = [];
            let ordem_2 = [];
            let ordem_3 = [];




            for (let i = 0; i < jsonData0.extrato.length; i++) {
                ordem_0[i] = [i];
            }
            for (let i = 0; i < jsonData1.extrato.length; i++) {
                ordem_1[i] = [i];
            }
            for (let i = 0; i < jsonData2.extrato.length; i++) {
                ordem_2[i] = [i];
            }
            for (let i = 0; i < jsonData3.extrato.length; i++) {
                ordem_3[i] = [i];
            }


            ordem_0 = this.randomizaOrdem(0);
            ordem_1 = this.randomizaOrdem(1);
            ordem_2 = this.randomizaOrdem(2);
            ordem_3 = this.randomizaOrdem(3);



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
            this.dadosTeste.ordemQuestoes = this.ordem;         //Para o cookie do aluno.


            this.resetaExtrato(this.nestr, this.jquest);
            localStorage.setItem('testeStart', JSON.stringify(this.dadosTeste));

        },
        
        resumeTest(){                                          
            this.ordem = this.dadosTeste.ordemQuestoes;
            this.nq = this.dadosTeste.nq;
            this.questao_id = this.dadosTeste.questao_id;
            //this.resetaExtrato(this.dadosTeste.extratoAtual,this.dadosTeste.indiceAtual);

            this.probabilidades_domina = this.dadosTeste.probabilidadeDom;
            this.probabilidades_naodom = this.dadosTeste.probabilidadeNdom;
            this.seq_prob_dom = this.dadosTeste.seqProbDom;
            this.seq_prob_ndom = this.dadosTeste.seqProbNdom;

            this.extrato1Flag = this.dadosTeste.extrato1Flag;
            this.termina = this.dadosTeste.termina;
            this.firstQuestion = this.dadosTeste.firstQuestion;

            this.PSR = this.dadosTeste.dadosPSR;
            this.PS = 0.5;
            this.pouts = 0.95;
            this.poutn = 0.05;

            this.nestr = this.dadosTeste.extratoAtual;
            this.ind_questao = this.dadosTeste.indiceAtual;

            console.log('Numero do extrato: ' + this.nestr);
            console.log('Indice da questão: ' + this.ind_questao)

            //Editar esta parte com base no ano do aluno????

            switch (this.dadosTeste.extratoAtual){
                case 0:
                    this.jsonData = jsonDataQuestoes0;
                break;
                case 1:
                    this.jsonData = jsonDataQuestoes1;
                break;
                case 2:
                    this.jsonData = jsonDataQuestoes2;
                break;
                case 3:
                    this.jsonData = jsonDataQuestoes3;
                break;
            
            }

         
            //this.termina = false;                                  // flag de término da bateria de questões referente ao extrato
            
            //this.jquest = this.dadosTeste.indiceAtual;
            this.resultado = 0;                                      // vai conter: -1 -> reprovação; 0 -> indefinido; 1 -> aprovação
            this.jiter = this.dadosTeste.jiter;

        },

        //Randomiza elementos em um vetor.
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        


            return array;
        },

        /* Randomiza a ordem das questões levando em conta a quantidade de habilidades presentes no estrato */
        randomizaOrdem(estrato){   
            
            let questoes,nova_ordem,auxQuestoes;
            switch(estrato){
                case 0:
                    auxQuestoes = jsonDataQuestoes0;
                    questoes = auxQuestoes.questoes;
                break;
                case 1:
                    auxQuestoes = jsonDataQuestoes1;
                    questoes = auxQuestoes.questoes;
                break;
                case 2:
                    auxQuestoes = jsonDataQuestoes2;
                    questoes = auxQuestoes.questoes;
                break;
                case 3:
                    auxQuestoes = jsonDataQuestoes3;
                    questoes = auxQuestoes.questoes;
                break;
                default:
                    auxQuestoes = jsonDataQuestoes1;
                    questoes = auxQuestoes.questoes;
                break;
            }
            nova_ordem = this.semiRandomize(questoes);
            return nova_ordem;

        },

        semiRandomize(array) { //Randomiza parcialmente, leva em conta as habilidades de cada item.

            // Armazene os índices originais dos objetos
            const indexedArray = array.map((item, index) => ({ ...item, originalIndex: index }));

            // Randomize a ordem dos objetos
            const shuffledArray = indexedArray.sort(() => Math.random() - 0.5);

            // Agrupe os objetos por habilidade
            const groupedBySkill = {};
            shuffledArray.forEach(item => {
                const skill = item.id.match(/H(\d{2})/)[1];
                if (!groupedBySkill[skill]) {
                    groupedBySkill[skill] = [];
                }
                groupedBySkill[skill].push(item);
            });

            // Obtenha todas as habilidades únicas presentes
            const skills = Object.keys(groupedBySkill);

            // Combine os objetos de forma que todas habilidades apareçam antes de qualquer repetição
            const resultArray = [];
            let index = 0;
            while (resultArray.length < array.length) {
                skills.forEach(skill => {
                    if (groupedBySkill[skill][index]) {
                        resultArray.push(groupedBySkill[skill][index]);
                    }
                });
                index++;
            }

            // Crie um array novo com os índices dos novos itens randomizados
            const resultIndices = resultArray.map(item => item.originalIndex);
            return resultIndices;
        },

        multiplica_array(arr) {
            let result = 1;
            for (let i = 0; i < arr.length; i++) {
                //console.log(arr[i]);
                result = arr[i] * result;

            }
            return result;
        },

        resetaExtrato(nestr, jquest) {                          //Faz a mudança de extrato.
            localStorage.setItem('testeStart', JSON.stringify(this.dadosTeste));
            this.PSR = 0.5; 
            this.PS = 0.5;
            this.pouts = 0.95;
            this.poutn = 0.05;
            this.jquest = 0;
            this.qtdResp = 0;
            console.log(this.anoAluno);
            /* 
                Define as questões que o aluno vai responder com base no ano escolar e no numero de estrato(solicitado):
                nestr = 0 : Estrato anterior ao inicial (n-1).
                nestr = 1 : Estrato inicial (n).
                nestr = 2 : Estrato inicial (n+1).
                nestr = 3 : Estrato inicial (n+2).

            */
            switch (nestr){
                case 0:
                    if(this.anoAluno == 1 || this.anoAluno == 2 || this.anoAluno == 3){
                        this.jsonData = jsonDataQuestoes0;
                    }
                    else if(this.anoAluno == 4 || this.anoAluno == 5){
                        this.jsonData = jsonDataQuestoes1;
                    }
                break;
                case 1:
                    if(this.anoAluno == 1 || this.anoAluno == 2 || this.anoAluno == 3){
                        this.jsonData = jsonDataQuestoes1;
                    }
                    else if(this.anoAluno == 4 || this.anoAluno == 5){
                        this.jsonData = jsonDataQuestoes2;
                    }
                break;
                case 2:
                    if(this.anoAluno == 1 || this.anoAluno == 2 || this.anoAluno == 3){
                        this.jsonData = jsonDataQuestoes2;
                    }
                    else if(this.anoAluno == 4 || this.anoAluno == 5){
                        this.jsonData = jsonDataQuestoes3;
                    }
                break;
                case 3:
                    if(this.anoAluno == 1 || this.anoAluno == 2 || this.anoAluno == 3){
                        this.jsonData = jsonDataQuestoes3;
                    }
                break;
            }
        


            this.Questoes = Array(this.nq[nestr] - jquest).fill(0);  // lista que armazenará os identificadores das questões apresentadas
            this.Respostas = Array(this.nq[nestr] - jquest).fill(0); // lista que armazenará as respostas do estudante às questões
            //this.termina = false;                                  // flag de término da bateria de questões referente ao extrato
            this.ind_questao = jquest;                               // índice relativo da questão (aponta agora para primeira questão a ser utilizada)
            this.resultado = 0;                                      // vai conter: -1 -> reprovação; 0 -> indefinido; 1 -> aprovação
            this.seq_prob_dom = new Array(this.nq[nestr]);           // vai conter as probabilidades ter marcado o item dado que domina conteúdo
            this.seq_prob_ndom = new Array(this.nq[nestr]);          // vai conter as probabilidades ter marcado o item dado que não domina conteúdo
            this.seq_prob_dom.fill(1);
            this.seq_prob_ndom.fill(1);
            this.jiter = 0;

        },

        async aplicaQuestao(value){                              //Função chamada sempre que o usuario clicar no "continuar"
            console.clear();

         

            this.qtdResp++;
            this.firstQuestion = false;
            this.dadosTeste.firstQuestion = false;
            // "Aplica" uma questão, verificando se o aluno acertou ou não.
            this.dadosTeste.qtdQuestoes++;
            
            let auxQuestao = {
                id: '',
                estrato : this.nestr,
                tempoQuestao : 0,
                acertou: false,
            
            }
            
            //this.dadosTeste.questoesRespondidas.push(this.jsonData.questoes[this.questionNumber].id);
            auxQuestao.id = this.jsonData.questoes[this.questionNumber].id;
            let iabs = this.ordem[this.nestr][this.ind_questao];
            let questao = this.questao_id[this.nestr][iabs];
            this.Questoes[this.jiter] = questao;
            let iresp = value;
            this.ind_questao += 1;
            this.dadosTeste.indiceAtual = this.ind_questao;                               //Para o Cookie do aluno.

            this.Respostas[this.jiter] = iresp;

            //console.log(this.jsonData.questoes[this.questionNumber].id);



            // ==============================================
            // Atualiza probabilidades, dada a resposta:
            this.seq_prob_dom[this.jiter] = this.probabilidades_domina[this.nestr][iresp][iabs];  // armazena P(resposta|domina) para a atual resposta
            this.seq_prob_ndom[this.jiter] = this.probabilidades_naodom[this.nestr][iresp][iabs]; // armazena P(resposta|naodomina) para a atual resposta
            this.dadosTeste.seqProbDom =  this.seq_prob_dom;
            this.dadosTeste.seqProbNdom = this.seq_prob_ndom;
            if (this.probabilidades_domina[this.nestr][iresp][iabs] == 0.85) {                    //Verifica se o aluno acertou ou não a questão.
                this.dadosTeste.qtdAcertos++;
                auxQuestao.acertou = true;
                console.log("Alternativa correta");
            }

            this.tempoFimQuestao = new Date();

            

            auxQuestao.tempoQuestao = ((this.tempoFimQuestao - this.tempoInicioQuestao) / 1000)

            this.dadosTeste.questoesRespondidas.push(auxQuestao);    

            //Adiciona no array de questoes respondidas.
            //console.log(this.seq_prob_dom);
            //console.log(this.seq_prob_ndom);

            let prs = this.multiplica_array(this.seq_prob_dom);                      //probabiliade da sequência de respostas, dado que domine o conteudo
            let prn = this.multiplica_array(this.seq_prob_ndom);                     //probabiliade da sequência de respostas, dado que não domine o conteudo

            this.PSR = prs * this.PS / (this.PS * prs + (1 - this.PS) * prn);        //probabilidade de dominio do conteúdo, dada a sequência de respostas
            console.log("probabilidade dominio conteudo = ", +this.PSR);
            this.dadosTeste.dadosPSR = this.PSR;                                    //Usado caso o teste seja retomado.
            this.jiter += 1;
            this.dadosTeste.jiter = this.jiter;
            //this.setCookie('testeStart', this.dadosTeste, 1);
            localStorage.setItem('testeStart', JSON.stringify(this.dadosTeste));

            // Tomada de decisão:

            /* 
                Com base no extrato atual, define o proximo extrato a ser utilizado:
                Extrato 0: Reprovado no extrato 0 ou avança para o extrato 1.
                Extrato 1: Reprovado no extrato 1 e retrocede para o 0 ou avança para o extrato 2.
                Extrato 2: Reprovado no extrato 2 ou avança para o extrato 3.
                Extrato 3: Reprovado ou aprovado no extrato 3.
    
            */
           
            console.log(this.qtdResp);
            switch (this.nestr) {

                case 0:                                     //EXTRATO 0
                    if (this.PSR > this.pouts && this.qtdResp >= 10) {            // aprovação no extrato 0
                        this.resultado = 1;
                        console.log("Fim do extrato 0: Avançando para o Extrato 1");
                        this.nestr = 1;

                        this.dadosTeste.extratoAtual = this.nestr;  //Usado caso o teste seja retomado.
                        this.dadosTeste.indiceAtual = 0;            //Usado caso o teste seja retomado.
                        this.dadosTeste.dadosPSR = 0.5;
                        this.dadosTeste.seqProbDom.fill(1);
                        this.dadosTeste.seqProbNdom.fill(1);
                        this.dadosTeste.jiter = 0;
                    

                        this.resetaExtrato(this.nestr, 0);

                    } else if (this.PSR < this.poutn && this.qtdResp >= 10) {     // reprovação no extrato 0
                        this.resultado = -1;
                        console.log("Fim do extrato 0: Reprovado no extrato 0");
                        this.dadosTeste.resultado = 0;
                        console.log(this.dadosTeste);

                        if (this.termina === false) {                    //Flag utilizada para determinar o envio dos dados do teste
                            //Enviar dados pro backend
                            this.popupIntervalo();
                            //console.log("Fim do teste principal, iniciando coleta de dados.");
                            this.changeTestAudio = true;
                            this.resetaOrdem();
                            this.dadosTeste.extrato1Flag=false;
                            this.dadosTeste.termina=true;
                            this.extrato1Flag = false;
                            this.sendDataTest(this.dadosTeste);

                            this.questionFlag = true;
                            this.testeStatus(0);
                            this.$router.push('/congratulations');
                        }
                        else {                                          //Fim da coleta de dados
                           
                        }


                    } else if (this.jiter >= this.nq[this.nestr] - this.jquest) { // termina indefinido
                        console.log("Fim do extrato 0");

                        if (this.termina == false) {
                            this.popupIntervalo();
                            this.dadosTeste.resultado = -1;
                            this.sendDataTest(this.dadosTeste);
                            this.questionFlag = true;
                            this.testeStatus(0);
                            this.$router.push('/congratulations');

                        }

                    }
                    break;


                case 1:                                     //EXTRATO 1
                    if (this.PSR > this.pouts && this.qtdResp >= 10) {            // aprovação no extrato 1
                        this.resultado = 1;
                        console.log("Fim do extrato 1: Avançando para o Extrato 2");
                        this.nestr = 2;
                        this.dadosTeste.extratoAtual = this.nestr;
                        this.dadosTeste.indiceAtual = 0;            //Usado caso o teste seja retomado.
                        this.dadosTeste.dadosPSR = 0.5;
                        this.dadosTeste.seqProbDom.fill(1);
                        this.dadosTeste.seqProbNdom.fill(1);
                        this.dadosTeste.jiter = 0;


                        this.resetaExtrato(this.nestr, 0);
                         //Usado caso o teste seja retomado.

                    } else if (this.PSR < this.poutn && this.qtdResp >= 10) {     // reprovação no extrato 1
                        this.resultado = -1;
                        this.nestr = 0;

                        if (this.extrato1Flag === false) {      //Aluno foi reprovado pela primeira vez no extrato 1
                            console.log("Fim do extrato 1: Retrocedendo ao extrato 0");
                            this.extrato1Flag = true;
                            this.dadosTeste.extrato1Flag = true;
                            this.dadosTeste.extratoAtual = this.nestr;
                            this.dadosTeste.indiceAtual = 0;            //Usado caso o teste seja retomado.
                            this.dadosTeste.dadosPSR = 0.5;
                            this.dadosTeste.seqProbDom.fill(1);
                            this.dadosTeste.seqProbNdom.fill(1);
                            this.dadosTeste.jiter = 0;
                            this.resetaExtrato(this.nestr, 0);
                              //Usado caso o teste seja retomado.

                        }
                        else if (this.extrato1Flag === true) { //Aluno foi reprovado pela segunda vez no extrato 1
                            if (this.termina === false) {
                                //Enviar dados pro backend
                                this.popupIntervalo();
                                this.dadosTeste.resultado = 1;
                                this.sendDataTest(this.dadosTeste);
                                this.questionFlag = true;
                                this.testeStatus(0);
                                this.$router.push('/congratulations');
                            }
                        }

                    } else if (this.jiter >= this.nq[this.nestr] - this.jquest) { // termina indefinido
                        console.log("Fim do extrato 1");

                        if (this.termina == false) {
                            this.popupIntervalo();
                            this.dadosTeste.resultado = -1;
                            this.sendDataTest(this.dadosTeste);
                            this.questionFlag = true;
                            this.testeStatus(0);
                            this.$router.push('/congratulations');
                            this.resetaExtrato(this.nestr, 0);
                        }
                       
                    }
                    break;


                case 2:                                     //EXTRATO 2
                    if (this.PSR > this.pouts && this.qtdResp >= 10) {            // aprovação no extrato 2
                        this.resultado = 1;
                        console.log("Fim do extrato 2: Avançando para o Extrato 3");
                        this.nestr = 3;
                        this.dadosTeste.extratoAtual = this.nestr;
                        this.dadosTeste.indiceAtual = 0;            //Usado caso o teste seja retomado.
                        this.dadosTeste.dadosPSR = 0.5;
                        this.dadosTeste.seqProbDom.fill(1);
                        this.dadosTeste.seqProbNdom.fill(1);
                        this.dadosTeste.jiter = 0;
                        this.resetaExtrato(this.nestr, 0);

                    } else if (this.PSR < this.poutn && this.qtdResp >= 10) {     // reprovação no extrato 2.
                        this.resultado = -1;
                        console.log("Fim do extrato 2: Reprovado no extrato 2");
                        this.dadosTeste.resultado = 2;
                        console.log(this.dadosTeste);


                        if (this.termina === false) {
                            this.popupIntervalo();
                            this.sendDataTest(this.dadosTeste);
                            this.coletaDados = true;

                            this.startDataTest(2);          //inicia a coleta de dados.
                            this.dadosTeste2.tempoTeste2 = new Date();

                        }
                        else {                              //Coleta de dados finalizada.
                            this.questionFlag = true;
                            this.testeStatus(0);
                            this.$router.push('/congratulations');
                        }

                    } else if (this.jiter >= this.nq[this.nestr] - this.jquest) { // termina indefinido.

                        console.log("Fim do extrato 2");
                        if (this.termina == false) {
                            this.popupIntervalo();
                            this.dadosTeste.resultado = -1;
                            this.sendDataTest(this.dadosTeste);
                            this.questionFlag = true;
                            this.testeStatus(0);
                            this.$router.push('/congratulations');
                        }
                    }
                    break;


                case 3:                                     //EXTRATO 3
                    if (this.PSR > this.pouts && this.qtdResp >= 10) {            //Aprovação no extrato 3
                        this.resultado = 1;
                        console.log("Fim do extrato 3: Aprovado no extrato 3");
                        console.log(this.dadosTeste);
                        if (this.termina === false) {
                            this.popupIntervalo();
                            //Enviar dados pro backend
                            this.dadosTeste.resultado = 4;
                            this.sendDataTest(this.dadosTeste);
                            this.questionFlag = true;
                            this.testeStatus(0);
                            this.$router.push('/congratulations');
                            
                        }
                    } else if (this.PSR < this.poutn && this.qtdResp >= 10) {     // reprovação no extrato 3
                        this.resultado = -1;
                        console.log("Fim do extrato 3: Reprovado no extrato 3");
                        console.log(this.dadosTeste);
                        this.dadosTeste.resultado = 3;

                        if (this.termina === false) {
                            this.popupIntervalo();
                            //Enviar dados pro backend
                            this.sendDataTest(this.dadosTeste);
                            this.questionFlag = true;
                            this.testeStatus(0);
                            this.$router.push('/congratulations');
                        }
                    } else if (this.jiter >= this.nq[this.nestr] - this.jquest) { // termina indefinido
                        console.log("Fim do extrato 3");

                        if (this.termina == false) {
                            this.popupIntervalo();
                            this.dadosTeste.resultado = -1;
                            this.sendDataTest(this.dadosTeste);
                            this.questionFlag = true;
                            this.testeStatus(0);
                            this.$router.push('/congratulations');
                        }
                    }
                    break;
                default:
                    break;
            }

            if (this.questionFlag == false) {
                await this.changeQuestion();//Altera questão exibida para o usuario.
                this.changeByID();
            }



        },

        async changeQuestion() {
            this.audioAux.pause();
            this.megafoneDisable = false;                            //Garante que o megafone seja tocado quando a página é trocada.
            this.alertPopup = false;
            clearTimeout(this.alertTimeoutId);

            if(!this.coletaDados){
                this.questionNumber = this.ordem[this.nestr][this.ind_questao];
            }
            else{
                this.questionNumber = this.coletaDadosInd;
            }
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
            if(!this.changeTestAudio){                                                   //Não vai tocar o audio automaticamento quando mudar para a coleta de dados.
                this.playAudio(1);
            }
            else{
                this.changeTestAudio=false;
            }

            this.tempoInicioQuestao = new Date();
            



            console.log("Código : " + this.questionId);
            console.log("Indice : " + this.ind_questao);
            console.log("Layout : " + this.jsonData.questoes[this.questionNumber].layout);


            if (this.questionTextTitle == '') {
                this.stMargin = '0';
            }
            else {
                this.stMargin = '2vh';
            }

            switch (this.jsonData.questoes[this.questionNumber].layout) {
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

        resetaOrdem() {         //Vai randomizar novamente a ordem das questões dos extratos.
            let ordem_0 = [];
            let ordem_1 = [];
            let ordem_2 = [];
            let ordem_3 = [];

            for (let i = 0; i < jsonData0.extrato.length; i++) {
                ordem_0[i] = [i];
            }
            for (let i = 0; i < jsonData1.extrato.length; i++) {
                ordem_1[i] = [i];
            }
            for (let i = 0; i < jsonData2.extrato.length; i++) {
                ordem_2[i] = [i];
            }
            for (let i = 0; i < jsonData3.extrato.length; i++) {
                ordem_3[i] = [i];
            }
           

            ordem_0 = this.randomizaOrdem(0);
            ordem_1 = this.randomizaOrdem(1);
            ordem_2 = this.randomizaOrdem(2);
            ordem_3 = this.randomizaOrdem(3);

            //ordem_0 = [0,1,2,3,4,5,6,7,8,9];                 //Para testar sequencialmente, comentar depois.
            //ordem_1 = [0,1,2,3,4,5,6,7,8,9,10,11];           //Para testar sequencialmente, comentar depois.  

            this.ordem = [ordem_0, ordem_1, ordem_2, ordem_3];
            this.dadosTeste.ordemQuestoes = this.ordem;        //Para o cookie do aluno.
        },

        sendDataTest(dataTest) {
            
            dataTest.id = localStorage.getItem('id')
            dataTest.idTeste = localStorage.getItem('idTeste')

            return new Promise((resolve, reject) => {
                axios({ url: 'https://ta-back.onrender.com/alunos/dataTest', data: dataTest, method: 'POST' })
                    .then((response) => {
                        console.log(response)
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        sendDataTest2(dataTest) {
            
            dataTest.id = localStorage.getItem('id')
            dataTest.idTeste = localStorage.getItem('idTeste')

            return new Promise((resolve, reject) => {
                axios({ url: 'https://ta-back.onrender.com/alunos/dataTest2', data: dataTest, method: 'POST' })
                    .then((response) => {
                        console.log(response)
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },



        resetMegafone() {            //Utilizar esta função sempre que trocar de item.
            this.megafoneDisable = false;
        },

        testeStatus(status) {                             //Troca o status do teste.
           if(status==0){
                this.dadosTeste.testeStart = false;       //Finaliza teste.
                //console.log("deletando o cookie");
                // Assume you want to delete an item with key 'myItem'
                localStorage.removeItem('testeStart');

                //this.setCookie('testeStart', this.dadosTeste, 1);
           }
           if(status==1){
                this.dadosTeste.testeStart = true;                  //Inicia teste.
                //this.setCookie('testeStart', this.dadosTeste, 1);    //Cria um objeto teste com uma duração de 1 dia.
                localStorage.setItem('testeStart', JSON.stringify(this.dadosTeste));

           }
        },  

        /* Função que inicia a "coleta de dados" */
        startDataTest(nestrTest){       
            this.tempoItem2 = new Date();

            switch(nestrTest){
                case 0:
                break;
                case 2:
                    this.qTestProb = jsonData2Nt.extrato;  //Array com probabilidades.
                    //this.shuffleArray(questoesTeste)  
                    this.jsonData = jsonDataQuestoes2Nt;    //Parte visual.
                    
                //teste
                break; 
            }

            
        },

        setCookie(nomeCookie, objeto, expiracaoDias) {    

            console.log('Atualizando cookie...');      
            console.log(objeto);               
            const data = JSON.stringify(objeto);
            const dataExpiracao = new Date();
            dataExpiracao.setDate(dataExpiracao.getDate() + expiracaoDias);

            const cookieValue = `${nomeCookie}=${data}; expires=${dataExpiracao.toUTCString()}; path=/`;
            document.cookie = cookieValue;
        },

        getCookie(nomeCookie) {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [cookieName, cookieValue] = cookie.split('=');
                if (cookieName.trim() === nomeCookie) {
                    return JSON.parse(decodeURIComponent(cookieValue));
                }
            }
            return 0; // Retorna esta string se o cookie não for encontrado
        },

        deleteCookie(name) {
            document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },

        resetTimer() {
            // Emitir um evento para notificar o componente filho sobre o reset do temporizador
            this.$refs.PopupTeste.fecharDialog();
        },

        popupIntervalo(){
            this.megafoneDisable = true;
            this.$refs.PopupIntervalo.openDialog();
            this.stopAudio();
        },

        //Função que reseta o objeto "dadosTeste" para sua versão inicial, usado no início da coleta de dados.
        AtualizaDadosTeste(alt){    
            let doNothing;

            let tempoAux = new Date();
            this.tempoItem2 = (tempoAux - this.tempoItem2)/1000;


            let auxString = this.jsonData.questoes[this.indProb].id;
            let parts = auxString.split('_');
            let result = parts[1];



            let itemResp = {                            //Dados específicos do item.
                id: auxString,                          
                acertou : false,                        
                hab : result,                          
                tempo: this.tempoItem2,
            }
            
            this.dadosTeste2.numQ++;   

            switch(alt){        //verificando se a questão está correta.

                /* 
                    Dados atualizados:
                    Numero de questões corretas ou incorretas.
                    Se o aluno acertou ou não o item.
                    Quantidade de habilidades presentes no teste(?).
                    Habilidades presentes no teste(?).
                */

                case 1:
                this.qTestProb[this.indProb].ad === 0.85 ? this.dadosTeste2.numQCor++: this.dadosTeste2.numQErr++;
                this.qTestProb[this.indProb].ad === 0.85 ? itemResp.acertou=true: itemResp.acertou=false;
                this.qTestProb[this.indProb].ad === 0.85 ? this.dadosTeste2.qtdHab++: this.dadosTeste2.qtdHab=this.dadosTeste2.qtdHab;
                //this.qTestProb[this.indProb].ad === 0.85 ? this.dadosTeste2.hab.push(result): doNothing=0;
                break;
                case 2:
                this.qTestProb[this.indProb].bd === 0.85 ? this.dadosTeste2.numQCor++ : this.dadosTeste2.numQErr++;
                this.qTestProb[this.indProb].bd === 0.85 ? itemResp.acertou=true: itemResp.acertou=false;
                this.qTestProb[this.indProb].bd === 0.85 ? this.dadosTeste2.qtdHab++: this.dadosTeste2.qtdHab=this.dadosTeste2.qtdHab;
                //this.qTestProb[this.indProb].bd === 0.85 ? this.dadosTeste2.hab.push(result): doNothing=0;
                break;
                case 3:
                this.qTestProb[this.indProb].cd === 0.85 ? this.dadosTeste2.numQCor++ : this.dadosTeste2.numQErr++;
                this.qTestProb[this.indProb].cd === 0.85 ? itemResp.acertou=true: itemResp.acertou=false;
                this.qTestProb[this.indProb].cd === 0.85 ? this.dadosTeste2.qtdHab++: this.dadosTeste2.qtdHab=this.dadosTeste2.qtdHab;
                //this.qTestProb[this.indProb].cd === 0.85 ? this.dadosTeste2.hab.push(result): doNothing=0;
                break;
                case 4:
                this.qTestProb[this.indProb].dd === 0.85 ? this.dadosTeste2.numQCor++ : this.dadosTeste2.numQErr++;
                this.qTestProb[this.indProb].dd === 0.85 ? itemResp.acertou=true: itemResp.acertou=false;
                this.qTestProb[this.indProb].dd === 0.85 ? this.dadosTeste2.qtdHab++: this.dadosTeste2.qtdHab=this.dadosTeste2.qtdHab;
                //this.qTestProb[this.indProb].dd === 0.85 ? this.dadosTeste2.hab.push(result): doNothing=0;
                break;
            } 


            this.dadosTeste2.itensResp.push(itemResp);  //Adiciona o objeto com os dados do item na lista do teste2.
            this.indProb++;                             //Incrementa o indice do vetor de probabilidades.
            this.tempoItem2 = new Date();                //Inicia a contagem de tempo do próximo item.
        },


    },

}
</script>

<style>
.mainDiv {
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

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Manrope', sans-serif;

}

.conteudo {
    display: flex;
    flex-direction: row;
    width: 96vw;
    height: 92vh;
    border: 1px solid rgba(57, 57, 57, 0.681);
    background-color: #f9f7f7;
    -webkit-box-shadow: 1px 8px 12px -5px rgba(30, 56, 146, 0.73);
    -moz-box-shadow: 1px 8px 12px -5px rgba(30, 56, 146, 0.73);
    box-shadow: 1px 8px 12px -5px rgba(30, 56, 146, 0.73);

}

.pergunta {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 92vh;
    border-right: 1px solid rgba(57, 57, 57, 0.681);


}

/* Icone do megafone+tooltip */

.icon-mega {
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
.mega2 {
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
    box-shadow: rgba(45, 35, 66, 0.8) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #ffffff 0 0 0 inset;
    opacity: 0;
    transition: opacity 0.5s;
    position: absolute;
    z-index: 1;
}

.icon-mega:hover .tooltipText {
    visibility: visible;
    opacity: 1;
}


.questionText-div {
    display: flex;
    flex-direction: column;
    margin-top: 3vh;
    border: 1px solid rgb(63, 63, 63);
    -webkit-box-shadow: 1px 8px 12px -5px rgba(30, 56, 146, 0.73);
    -moz-box-shadow: 1px 8px 12px -5px rgba(30, 56, 146, 0.73);
    box-shadow: 1px 8px 12px -5px rgba(30, 56, 146, 0.73);
    border-radius: 7px;
    transform: translateY(-1px);
    width: 95%;
    padding: 1.2vw 1.2vw 1.2vw 1.2vw;
    align-self: center;
    align-items: center;
    justify-content: center;
    background: #ffffff;

}

.text-title {
    font-weight: bold;
    font-size: 1.75rem;


}

.question-statement {
    width: 100%;
    font-size: 1.75rem;
    font-family: Manrope-Light;
    text-align: justify;
    white-space: pre-line;

}


.question-img {
    margin-top: 6vh;
    margin-left: 3vw;
    height: auto;
    width: auto;
    align-self: center;

}

.resposta {
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: column;
}

.question-text {
    margin-top: 20.5vh;
    padding-left: 1.5vw;
    font-size: 1.6rem;
    font-family: Manrope;
    width: 95%;
    height: 6vh;

}


.question-form {
    padding-left: 1.5vw;
    width: 100%;
    height: 30vh;
    margin-top: 1vh;
}

.alternative {
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

.alternative:hover {
    border-color: #1E3892;
}


/* input circular(Radio input) */
.option {
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


.radio-text {
    font-size: 1.6rem;
    margin-left: 13px;
    color: rgba(0, 0, 0, 0.889);
    font-family: Manrope-light;
    font-weight: 600;
    cursor: pointer;


}

.radio-text:hover {
    color: rgb(0, 0, 0);
    font-weight: bold;
    transition: color 0.2s;
}

/* Layout 2 */

.main-m2 {
    height: 100vh;
}

.conteudo-m2 {
    flex-direction: column;
    height: 92vh;
}

.pergunta-m2 {
    display: flex;
    flex-direction: row;
    border-right: none;
    width: 100%;
}

.questionImg-m2 {
    width: 55vw;
    height: 41vh;
    margin-top: 5vh;
    margin-left: 13vw;
    -webkit-box-shadow: 1px 8px 12px -5px rgba(30, 56, 146, 0.73);
    -moz-box-shadow: 1px 8px 12px -5px rgba(30, 56, 146, 0.73);
    box-shadow: 1px 8px 12px -5px rgba(30, 56, 146, 0.73);

}

.questionText-m2 {
    padding-right: 60px;
    font-family: Manrope;
    font-weight: 600;
    margin-top: 2.8vh;
    margin-left: 16.8vw;
    width: 85vw;
}

.form-m2 {
    margin-left: 16.8vw;
    height: 25vh;
    margin-top: 0;
}

.button-m2 {
    align-self: center;
    margin-left: 120vh;
    margin-top: 2.5vh;
}

/* Layout 3 */

.pergunta-m3 {
    flex-direction: row;
    gap: 1.5vw;
}

.img-m3 {
    margin-left: 0.8vw;
    align-self: center;
    width: 42vw;
    height: auto;
}




/* Layout 4 (Questões sem texto/imagens) */

.form-alt {
    margin-top: 17vh;
    margin-left: 7vw
}

.option-alt {
    width: 24px;
    height: 24px;

}

.radio-text-alt {
    font-size: 30px;
}

.pergunta-m4 {
    border-right: none;
    width: 100%;
    height: 75vh;
}


.label-m4 {
    display: none;
}

.button-m5 {
    margin-top: 0px;
    width: 22vw;
    height: 8vh;
    font-size: 1.55rem;
}

/* Layout 5 (Imagens nas alternativas) */



.conteudo-m4 {
    flex-direction: column;
    align-items: center;
}


.img-m4 {
    width: 26vw;
    height: auto;
    border: 1px solid black;
    margin-left: 28vw;
}

.questions-div {
    margin-top: 16vh;
    display: grid;
    grid-template-columns: 40% 40%;
    row-gap: 4vh;
    width: 80vw;
    align-items: center;
    justify-content: center;
    margin-left: 4vw;
}

.alternative-m4 {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 0.12rem solid rgb(5, 5, 5);
    background-color: #ffffff;
    width: 26vw;
}


.alt-img {
    width: 20vw;
}

.button-m4 {
    width: 20vw;
    margin-top: 22vh;
}

.icon-questionImg {
    display: flex;
    flex-direction: row;
    align-self: flex-start;
}

.option-m4 {
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

.sub-title {
    font-family: Manrope-Light;
}

.time-popup {
    position: absolute;
    top: 33%;
    left: 39%;
    z-index: 2;
}

@media (max-width: 1550px) {
    .icon-mega {
        width: 70px;
        height: 70px;
    }

    .icon-mega .tooltipText {
        font-size: 1rem;
        width: 7vw;
        margin-left: -3.5vw;
    }

    .radio-text {
        font-size: 1.2rem;
    }


    .question-form {
        margin-top: 3vh;
    }

    /* Layout 1 */

    .text-title {
        font-size: 1.2rem;
    }

    .question-statement {
        font-size: 1.2rem;
    }

    .question-text {
        font-size: 1.1rem;
    }

    .radio-text {
        font-size: 1.1rem;
    }

    .button-m1 {
        width: 18vw;
        height: 8vh;
        font-size: 1.2rem;
        margin-top: 18vh;
    }

    /* Layout 2 */

    .form-m2 {
        margin-left: 16.8vw;
        height: 25vh;
        margin-top: 0;
    }


    .button-m2 {
        width: 17vw;
        height: 7vh;
        font-size: 1.1rem;
        margin-left: 60vw;
    }


    .questionText-m2 {
        font-size: 0.9rem;
    }

    .radioM2 {
        font-size: 0.9rem;
    }

    .option-m2 {
        width: 16px;
    }

    /* Layout 3 */

    .button-m3 {
        font-size: 1.15rem;
        width: 18vw;
        height: 8vh;
        margin-top: 17vh;
    }

    .img-m3 {
        margin-left: 1.8vw;
        align-self: center;
        width: 34vw;
        height: auto;
    }



    /* Layout 4 */

    .button-m4 {
        margin-top: 16vh;
        height: 8vh;
        font-size: 1.2rem;
    }



    /* Layout 5 */

    .button-m5 {
        margin-top: 3vh;
        width: 21vw;
        height: 7vh;
        font-size: 1.15rem;
    }

    .form-m5 {
        margin-top: 15vh;
    }


}


/* Tablet(Modo com a largura maior) */

@media (max-width: 1024px) {
    .icon-mega {
        width: 70px;
        height: 70px;
    }

    .icon-mega .tooltipText {
        font-size: 1rem;
        width: 7vw;
        margin-left: -3.5vw;
    }

    .radio-text {
        font-size: 1.2rem;
    }


    .question-form {
        margin-top: 3vh;
    }

    /* Layout 1 */

    .text-title {
        font-size: 1.2rem;
    }

    .question-statement {
        font-size: 1.2rem;
    }

    .question-text {
        font-size: 1.06rem;

    }

    .radio-text {
        font-size: 1.05rem;
    }

    .option-m1{
        width: 1.7vw;
    }

    .button-m1 {
        width: 23vw;
        height: 6.2vh;
        font-size: 1.1rem;
        margin-top: 18vh;
    }

    /* Layout 2 */

    .form-m2 {
        margin-left: 16.8vw;
        height: 25vh;
        margin-top: 0;
    }

    .alternative-m2{
        width: 45vw;
    }


    .button-m2 {
        width: 24vw;
        height: 6.2vh;
        font-size: 1.1rem;
        margin-left: 60vw;
    }


    .questionText-m2 {
        font-size: 1.1rem;
    }

    .radioM2 {
        font-size: 0.9rem;
    }

    .option-m2 {
        width: 17px;
    }

    /* Layout 3 */

    .button-m3 {
        font-size: 1.1rem;
        width: 23vw;
        height:6vh;
        margin-top: 17vh;
    }

    .img-m3 {
        align-self: center;
        width: 40vw;
        height: auto;
        margin-bottom: 10vh;
    }

    .option-m3{
        width: 1.7vw;
    }

    .question-text {
        font-size: 1.06rem;

    }

    .radio-text {
        font-size: 1.05rem;
    }



    /* Layout 4 */

    .button-m4 {
        margin-top: 29vh;
        height: 6.4vh;
        width: 26vw;
        font-size: 1.2rem;
    }



    /* Layout 5 */

    .button-m5 {
        margin-top: 3vh;
        width: 23vw;
        height: 6vh;
        font-size: 1.1rem;
    }

    .form-m5 {
        margin-top: 15vh;
    }


}

/* Tablet(Modo com a altura maior) */

@media (max-width: 768px) {
    .icon-mega {
        width: 80px;
        height: 80px;
    }

    .icon-mega .tooltipText {
        font-size: 1rem;
        width: 7vw;
        margin-left: -3.5vw;
    }

    .radio-text {
        font-size: 1.2rem;
    }


    .question-form {
        margin-top: 3vh;
    }

    /* Layout 1 */

    .text-title {
        font-size: 1.2rem;
    }

    .question-statement {
        font-size: 1.2rem;
    }

    .question-text {
        font-size: 1.06rem;

    }


    .option-m1{
        width: 2.5vw;
    }

    .button-m1 {    
        width: 33vw;
        height: 5.5vh;
        font-size: 1.3rem;
        margin-top: 18vh;
    }

    /* Layout 2 */

    .form-m2 {
        margin-left: 16.8vw;
        height: 25vh;
        margin-top: 0;
    }

    .alternative-m2{
        width: 65vw;
    }

    .button-m2 {
        width: 35vw;
        height: 6vh;
        font-size: 1.3rem;
        margin-left: 60vw;
    }

    .questionText-m2 {
        font-size: 1.2rem;
    }

    .radioM2 {
        font-size: 0.9rem;
    }

    .option-m2 {
        width: 2.8vw;
    }

    /* Layout 3 */

    .button-m3 {
        width: 33vw;
        height: 5.5vh;
        font-size: 1.3rem;
        margin-top: 18vh;
    }

    .img-m3 {
        width: 40vw;
        height: auto;
        margin-bottom: 10vh;
    }

    .option-m3{
        width: 2.7vw;
    }

    .question-text {
        font-size: 1.06rem;

    }

    .radio-text {
        font-size: 1.05rem;
    }



    /* Layout 4 */

    .button-m4 {
        margin-top: 29vh;
        height: 6.4vh;
        width: 26vw;
        font-size: 1.2rem;
    }



    /* Layout 5 */

    .option-m5{
        width: 2.6vw;
    }

    .radio-textM5{
        font-size: 1.35rem;
    }

    .button-m5 {
        margin-top: 3vh;
        width: 37vw;
        height: 6.5vh;
        font-size: 1.5rem;
    }

    .form-m5 {
        margin-top: 15vh;
        margin-left: 8vw;
    }


}

</style>