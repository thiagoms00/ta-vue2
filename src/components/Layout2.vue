<template>

    <div class="conteudo">
        <div class="pergunta">
            <div class="icon-mega" @click="playAudio(1)">
                    <span class="tooltipText">Escutar</span>
            </div>
        
            <img src="" alt="" class="question-img" id="" :style="{content: questionImg1}" v-if="questionStatement==''">
            <div class="questionText-div" id="questionDiv" v-else>
                <span class="text-title" v-if="questionTextTitle!=''">{{questionTextTitle}}<br></span>
                 <h2 class="question-statement" id="questionStatement" :style="{marginTop: stMargin,}"> {{questionStatement}}</h2>
            </div>
        </div>

        <div class="resposta">
            <h2 class="question-text">{{questionText}}</h2>

                <form action="" class="question-form" id="questionForm">
                   
                    <div class="alternative" @click="">
                        <input type="radio" id="alt1" name="question-choice" value="1" class="option">
                        <label for="alt1" class="radio-text" id="radioLabel1">{{questionAlt1}}</label><br>
                    </div>
            
                    <div class="alternative" @click="">

                        <input type="radio" id="alt2" name="question-choice" value="2" class="option">
                        <label for="alt2" class="radio-text" id="radioLabel2">{{questionAlt2}}</label><br>
                        
                    </div>

                    <div class="alternative" @click="">
                        <input type="radio" id="alt3" name="question-choice" value="3" class="option">
                        <label for="alt3" class="radio-text" id="radioLabel3">{{questionAlt3}}</label>
                    </div>

                        <!-- <br> -->  
                    
                    <div class="alternative" @click="">
                        <input type="radio" id="alt4" name="question-choice" value="4" class="option">
                        <label for="alt4" class="radio-text" id="radioLabel4">{{questionAlt4}}</label>
                    </div>
                        
                    <br>  

                </form>
            
            <ContButton/>

        </div>  
    </div>
   
</template>

<script>

import ContButton from './ContButton.vue';

import jsonData from '../assets/questao/questoes.json';


export default {
    name : 'Layout2',
    components : {
        ContButton,
        
    },

    data(){
        return {

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

            stMargin: '',
            audioVis: '',
        }
    },

    created (){  //Sempre é chamado quando a pagina é carregada
        var qtd = jsonData.questoes.length;
        
        //Randomiza uma questão quando a pagina é criada.
        // Ele sorteia um número entre 0 e o número de objetos no JSON
        this.questionNumber =  Math.floor(Math.random() * 10);  
        this.questionNumber = 8; 
 
        this.questionId = jsonData.questoes[this.questionNumber].id
        this.questionText = jsonData.questoes[this.questionNumber].text; 
        this.questionTextTitle = jsonData.questoes[this.questionNumber].textTitle;  
        this.questionStatement = jsonData.questoes[this.questionNumber].qText;    
        this.questionAudio1 = jsonData.questoes[this.questionNumber].audio1;
        this.questionAudio2 = jsonData.questoes[this.questionNumber].audio2;
        this.questionType = jsonData.questoes[this.questionNumber].type;
        this.questionImg1 = jsonData.questoes[this.questionNumber].img1;
        this.questionImg2 = jsonData.questoes[this.questionNumber].img2;
        this.questionAlt1 = jsonData.questoes[this.questionNumber].alt1;
        this.questionAlt2 = jsonData.questoes[this.questionNumber].alt2;
        this.questionAlt3 = jsonData.questoes[this.questionNumber].alt3;
        this.questionAlt4 = jsonData.questoes[this.questionNumber].alt4;
        this.questionAnswer = jsonData.questoes[this.questionNumber].answer;

        if(this.questionTextTitle==''){
            this.stMargin = '0';
          }
          else{
            this.stMargin = '2vh';
          }

    },

    mounted(){  //Chamado após os componentes carregarem

        this.changeByID();
    },

    methods:{
      
      
     //Seleciona a resposta do aluno.
     checkAnswer(){

          const radioButtons = document.querySelectorAll('input[name="question-choice"]');  //seleciona todos os radio buttons.
          for (const radioButton of radioButtons) {
              if (radioButton.checked) {                    //Vê qual radio button foi selecionado.
                  let selectedButton = radioButton.value;
                  switch(parseInt(selectedButton)){         //converte o "SelectedButton" para um inteiro.
                      case 1:
                          console.log(this.questionAlt1)
                          if(this.questionAlt1 == this.questionAnswer){
                              console.log('Você acertou a questão!');
                          }
                      break;
                      case 2:
                          console.log(this.questionAlt2)
                          if(this.questionAlt2 == this.questionAnswer){
                              console.log('Você acertou a questão!');
                          }
                      break;
                      case 3:
                          console.log(this.questionAlt3);
                          if(this.questionAlt3 == this.questionAnswer){
                              console.log('Você acertou a questão!');
                          }
                          
                      break;
                      case 4:
                          console.log(this.questionAlt4)
                          if(this.questionAlt4 == this.questionAnswer){
                              console.log('Você acertou a questão!');
                          }
                      break;
                  }
                  break;
              }
          }
     },

     playAudio(audioNum){  

          if(audioNum==1){
              let audio = new Audio('./assets/audios/extrato2/LP_H06_00_008_F1.mp3') ;
              console.log('teste');
              audio.play();
          }
          else if(audioNum==2){
              let audio = new Audio(this.questionAudio2) ;
              audio.play();
          }
        
     },

     //Muda detalhes com base no ID do item
     changeByID(){
      

          let aux, aux2,aux3,aux4;
          
        

          switch(this.questionId){
              case 'LP_H03_00_014_F':
                  aux = document.getElementById("questionStatement");
                  aux.style.fontSize = '120px';
                  aux.style.letterSpacing = '15px';
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

              case 'LP_H07_03_003_D':
                  aux = document.getElementById("questionForm"); 
                  aux.style.marginTop = '4vh';

                  aux = document.getElementById("questionStatement");
                  aux.style.fontSize = '27px';


              break;

              case 'LP_H07_02_002_M':
                  aux = document.getElementById("questionForm"); 
                  aux.style.marginTop = '4vh';
              break;

              case 'LP_H07_01_018_M':
                  aux = document.getElementById("questionForm"); 
                  aux.style.marginTop = '4vh';

              break;

              case 'LP_H07_03_008_M':
                  aux = document.getElementById("questionForm"); 
                  aux.style.marginTop = '4vh';
              break;

              case 'LP_H07_02_022_M':
                  aux = document.getElementById("questionForm"); 
                  aux.style.marginTop = '4vh';
              break;
              case 'LP_H07_02_001_D':
                  aux = document.getElementById("questionForm"); 
                  aux.style.marginTop = '4vh';
              break;
              case 'LP_H10_02_009_D':
                  aux = document.getElementById("questionForm"); 
                  aux.style.marginTop = '4vh';
              break;

              case 'LP_H07_01_010_M':
                  aux = document.getElementById("questionForm"); 
                  aux.style.marginTop = '4vh';
              break;

              case 'LP_H01_00_013_M':
                
                  aux = document.getElementById("radioLabel1");
                  aux.style.letterSpacing = '12px';

                  aux = document.getElementById("radioLabel2");
                  aux.style.letterSpacing = '12px';

                  aux = document.getElementById("radioLabel3");
                  aux.style.letterSpacing = '12px';

                  aux = document.getElementById("radioLabel4");
                  aux.style.letterSpacing = '12px';
              break;

              case 'LP_H01_00_002_F':
                  
                 /*  aux = document.getElementById("radioLabel1");
                  aux.style.letterSpacing = '10px';

                  aux = document.getElementById("radioLabel2");
                  aux.style.letterSpacing = '10px';

                  aux = document.getElementById("radioLabel3");
                  aux.style.letterSpacing = '10px';

                  aux = document.getElementById("radioLabel4");
                  aux.style.letterSpacing = '10px'; */
              break;

              case 'LP_H07_03_007_M':
                  aux = document.getElementById("questionForm"); 
                  aux.style.marginTop = '4vh';
              break;

              
          }


     },

     //Mostra o input (circulo) das alternativas, quando forem clicadas.
     showInput(alt){
          let aux;
          aux = document.getElementById("alt1");
          aux.style.visibility = 'hidden';
          aux = document.getElementById("alt2");
          aux.style.visibility = 'hidden';
          aux = document.getElementById("alt3");
          aux.style.visibility = 'hidden';
          aux = document.getElementById("alt4");
          aux.style.visibility = 'hidden';

          switch(alt){
              case 1:
                  aux = document.getElementById("alt1");
                  aux.style.visibility = 'visible';
              break;
              case 2:
                  aux = document.getElementById("alt2");
                  aux.style.visibility = 'visible';
              break;
              case 3:
                  aux = document.getElementById("alt3");
                  aux.style.visibility = 'visible';
              break;
              case 4:
                  aux = document.getElementById("alt4");
                  aux.style.visibility = 'visible';
              break;
          }

     }

     
  },

}
</script>

<style>

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
    background-color: #f0f0f0;
    -webkit-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    -moz-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
    box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);

}

.pergunta{
    display: flex;
    flex-direction: column;
    width: 96vw;
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
    visibility:visible;
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
    width: 95%;
    padding: 1.2vw 1.2vw 1.2vw 1.2vw;
    align-self: center;
    align-items: center;
    justify-content: center;
    background: #ffffff;

}
 
.text-title{
    font-weight: bold;
    font-size: 28px;


}

.question-statement{
    width: 100%;
    font-size: 28px;
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
    width: 45%;
    display: flex;
    flex-direction: column;
}

.question-text{
    margin-top: 20.5vh;
    padding-left: 1.5vw;
    font-size: 23px;
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
    border: 0.15rem solid #f0f0f0;
    border-radius: 5px;
    -webkit-transition: border-color 0.5s ease;
    -moz-transition: border-color 0.5s ease;
    -o-transition: border-color 0.5s ease;
    -ms-transition: border-color 0.5s ease;
    transition: border-color 0.3s ease;       
    cursor: pointer;
    width: 30vw;
    
}

.alternative:hover{
    border-color: #6CA6C1;
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
    font-size: 23px;
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



</style>