<template>
    <h1 class="teste">
        teste
    </h1>
</template>

<script>


/* Leitura dos arquivos JSON, contendo o identificador e probabilidades de escolher uma alternativa. */
import jsonData0 from '../assets/extratos/extrato0.json';
import jsonData1 from '../assets/extratos/extrato1.json';
import jsonData2 from '../assets/extratos/extrato2.json';
import jsonData3 from '../assets/extratos/extrato3.json';

export default {
    name : 'AlgTeste',
    components:{

    },
    data(){
        return {
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
            nestr: 1,
            
        }
    },
    
    created(){

        this.startTest();
       
       // =====================================================
       // Programa Principal


    /*   let PS = 0.5       // probabilidade "a priori" de dominar conteúdo
      let pouts = 0.95   // condição geral de aprovação
      let poutn = 0.05   // condição geral de reprovação
      let poutn1 = 0.15  // condição relaxada de reprovação para primeira execução estrato 1
      let jquest = 0     // índice questão inicial (maioria dos casos)
 */
      let resultado0 = 0
      let resultado1 = 0
      let resultado1b = 0
      let resultado2 = 0
      let resultado3 = 0

      //let nestr = 1;

      let arr = this.teste_extrato(this.nestr,this.pouts,this.poutn1,this.PS,this.jquest);
      
    

        
    },

    methods : {


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
        this.ordem = [ordem_0, ordem_1, ordem_2, ordem_3];

        },


        //Randomiza elementos em um array.
        shuffleArray(array){
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        },

        //Escolhe uma alternativa(não vai ser usado na versão final do programa).
        // Retorna um Numero entre 0 e 3.
        aplica(){
            let aux = Math.random();
            let pac = 0.5;  // Probabilidade de escolher "a".
            let per_b = 0.17;  // Probabilidade de escolher "b".
            let per_cd = 0.165;  // Probabilidade de escolher "c" ou "d".

            let iresp;

            if (aux < pac) {
                iresp = 0;  // (a)
            } else if (aux < pac + per_b) {
                iresp = 1;  // (b)
            } else if (aux < pac + per_b + per_cd) {
                iresp = 2;  // (c)
            } else {
                iresp = 3;  // (d)
            }
            return iresp;
        },

        //realiza o teste no extrato
        teste_extrato(nestr,pouts,poutn,PS,jquest){ 
            /*  
                ENTRADAS:
                nestr  -> numero do estrato a ser testado
                pouts  -> limiar mínimo de probabilidade para aprovação no estrato
                poutn  -> liminar mínimo de probabilidade para não envio para estrato inferior
                PS     -> probabilidade a priori de domínio do conteúdo do estrato
                jquest -> índice da primeira questão ainda não utilizada do estrato

                SAÍDAS:
                Questoes   -> sequência de questões apresentadas na bateria de questões
                Respostas  -> sequência de respostas para as questões apresentadas
                PSR        -> probabilidade de domínio do conteúdo, dada a sequência de respostas
                resultado  -> -1: reprovação; 0: indefinido; 1: aprovação
                ind_questao -> 
            */


            let Questoes = Array(this.nq[nestr] - jquest).fill(0);// lista que armazenará os identificadores das questões apresentadas
            let Respostas = Array(this.nq[nestr] - jquest).fill(0); // lista que armazenará as respostas do estudante às questões
            let termina = false;                            // flag de término da bateria de questões referente ao estrato
            let ind_questao = jquest;                       // índice relativo da questão (aponta agora para primeira questão a ser utilizada)
            let resultado = 0;                              // vai conter: -1 -> reprovação; 0 -> indefinido; 1 -> aprovação
            let seq_prob_dom = new Array(this.nq[nestr]);        // vai conter as probabilidades ter marcado o item dado que domina conteúdo
            let seq_prob_ndom = new Array(this.nq[nestr]);       // vai conter as probabilidades ter marcado o item dado que não domina conteúdo
            seq_prob_dom.fill(1);
            seq_prob_ndom.fill(1);

           

            let jiter = 0;                                // número de questões já apresentadas durante esta bateria de questões referente ao estrato
            
            
            while(!termina){
                // Aplica uma questão:
                //let iabs = ordem[nestr][ind_questao]-1;
                let iabs = this.ordem[nestr][ind_questao]; 
                let questao = this.questao_id[nestr][iabs];
                Questoes[jiter] = questao;
                let iresp = this.aplica(questao);
                ind_questao += 1;
                Respostas[jiter]  = iresp;


                // ==============================================
                // Atualiza probabilidades, dada a resposta:
                seq_prob_dom[jiter] = this.probabilidades_domina[nestr][iresp][iabs];  // armazena P(resposta|domina) para a atual resposta
                seq_prob_ndom[jiter] = this.probabilidades_naodom[nestr][iresp][iabs]; // armazena P(resposta|naodomina) para a atual resposta
                
                let prs = this.multiplica_array(seq_prob_dom);                      //probabiliade da sequência de respostas, dado que domine o conteudo
                let prn = this.multiplica_array(seq_prob_ndom);                     //probabiliade da sequência de respostas, dado que não domine o conteudo
                
                this.PSR = prs*PS/(PS*prs+(1-PS)*prn);  // probabilidade de dominio do conteúdo, dada a sequência de respostas
               
        
                console.log("probabilidade dominio conteudo = ", +this.PSR);
                jiter += 1
                // Tomada de decisão:
                if (this.PSR > pouts) { // aprovação no estrato
                    resultado = 1;
                    termina = true;
                } else if (this.PSR < poutn) { // reprovação no estrato
                    resultado = -1;
                    termina = true;
                } else if (jiter >= this.nq[nestr] - jquest) { // termina indefinido
                    termina = true;
                }

            }
            
            ind_questao = ind_questao + jiter  // aponta a próxima questão do estrato que ainda não foi apresentada
            console.log("resultado = ",+ resultado);
            console.log(seq_prob_dom);
            console.log(seq_prob_ndom) ;
            let arr = [this.PSR,resultado,Questoes,Respostas,ind_questao];
            return arr;

        },

        multiply_array(arr){
            return arr.reduce((acumulador, valorAtual) => acumulador * valorAtual, 1);
        },

        multiplica_array(arr){
            let result = 1;
            for(let i=0;i<arr.length;i++){
                //console.log(arr[i]);
                result = arr[i]*result;
                
            }
            return result;
        }

       


    }

    
    
}




</script>

    

<style>



</style>