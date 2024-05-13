<template>
    <v-img class="logo-imp"
        src="../assets/imgs/Logo-Impacto-removebg.png"
        contain
        :max-width="300"
        aspect-ratio="16/9"
    ></v-img> 
</template>

<script>
    export default{
        name:'LogoImpacto'
    }
</script>

<style>

.logo-imp{
    max-width: 10vw;
    height: auto;
}

@media(max-width: 1550px){
    .logo-imp{
        max-width: 21vw;
        height: auto;
    }      
} 


</style>