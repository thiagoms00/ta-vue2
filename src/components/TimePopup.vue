<template>
<v-sheet class="aux-sheet
          d-flex align-center flex-column
          text-center mx-auto px-4
          rounded-lg" elevation="10" rounded-shaped color="grey-lighten-5" width="20vw" height="23vh" border="md">
        
        <v-container class="d-flex flex-column align-center pa-0">
            <div class="msg-icon">
                <img src="../assets/imgs/attention.svg" alt="" class="img1">
                <h1 class="msg">Atenção</h1>
               
            </div>
            <h2 class="sub-msg">Lembre-se de escolher uma alternativa e clicar em Continuar</h2>
            <v-btn class ="flex-grow-1 mt-4 finish-btn" height="4.5vh" size="large" width="11vw" variant="flat" color="#1E3892"  elevation-15 @click="proximaPagina"> Fechar </v-btn>
        </v-container>

</v-sheet>

</template>

<script>

export default{
    name: 'TimePopup',
    components:{

    }

    

   

}

</script>

<style>
*{
    font-family: Manrope;
}

@font-face{
    font-family: Manrope;
    src: url(../assets/fonts/Manrope/Manrope-Regular.ttf);
}

@font-face{
    font-family: Manrope-Light;
    src: url(../assets/fonts/Manrope/Manrope-Light.ttf);
}


.img1{
    width: 2.2vw;
    height: auto;
    margin-left: 4.9vw;
}

.msg-icon{  
    border-bottom: 0.1rem solid rgb(143, 143, 143);
    width: 20vw;
    background-color : #1E3892;
    overflow: hidden;
    padding: 0.7vh;
    display: flex;
    flex-direction : row;
    -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.msg{
   color : #fff;
   font-weight: 600;
   font-size :1.7rem;
   margin-left: 0.2vw;
   margin-top: 0.3vh;
   -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

.sub-msg{
    font-size :1.4rem;
    margin-top: 1.3vh;
    font-weight: 600;
    font-family: Manrope-Light;
    -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
    
}



</style>