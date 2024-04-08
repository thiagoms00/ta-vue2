<template>
    <div class="question-bar">
        <div class="fonte-icon" v-if="fonte!=''">
            <span class="tooltip-fonte">Fonte: {{fonte}}</span>
        </div>
    </div>
</template>

<script>

export default {
    name : 'FlexBar',
    props : {
        fonte : String,
    },

    data(){
        return {
            
        }
    }
}


</script>

<style>
    .question-bar{
        display: flex;
        align-items: center;
        margin-top: 10px;
        width: 96vw;
        height: 4vh;
        /* Adiciona uma borda sólida de 2 pixels de cor preta */
        border: 1px solid rgba(57, 57, 57, 0.681);
        /* border-radius: 5px; */
        
        /* Adiciona uma sombra */
        -webkit-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
        -moz-box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
        box-shadow: 1px 8px 12px -5px rgba(30,56,146,0.73);
        
        /* Define a largura e a altura da div */
        position: relative;
        
        /* Outros estilos opcionais */

        background-color: #1E3892; /* Define a cor de fundo */
        font-size: 10px;
    }

    
.fonte-icon{
    position: relative;
    display: inline-block;
    background: url(../assets/icons/info-Blue.svg);
    width: 1.6vw;
    height: 1.6vw;
    background-size: cover;

    margin-left: 94vw;  
    border: 1px solid rgba(76, 75, 75, 0.612);
    border-radius: 5px;
    cursor: pointer;
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.079) 0 7px 13px -3px, #5451511d 0 -1px 0 inset;
    transform: translateY(-1px);
    background-color: white;

 }
 

 
 .fonte-icon:hover {
     box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.079) 0 7px 13px -3px, #5451511d 0 -1px 0 inset;
     transform: translateY(-2px);
     transition: transform 0.2s;
 }  
 
 .fonte-icon .tooltip-fonte {
     font-family: Manrope;
     visibility: hidden;
     width: 40vw;
     right: 1.8vw;
     padding: 4px 10px;
     font-size: 15px;
     background-color: rgba(61, 61, 61, 0.961);
     color: #ffffff;
     text-align: center;
     border-radius: 3px;
     box-shadow: rgba(45, 35, 66, 0.8) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#ffffff 0 0 0 inset;
     opacity: 0;
     transition: opacity 0.5s;
     position: absolute;
     z-index: 1;
    }
   
.fonte-icon:hover .tooltip-fonte {
    visibility: visible;
    opacity: 1;
}

</style>