<template>

    <div class="main-div">
        <TesteItens/>
    </div>
</template>

<script>

import TesteItens from '@/components/TesteItens.vue';


export default {
    name: 'TestStart',
    components:{
        TesteItens,
        
        
    },

    data (){
        return {
            layoutCheck : '',

        }
    },

    created (){
    },
}
</script>

<style>
    .main-div{
       display: flex;
       flex-direction: column;
       width: 100%;
       height: 100%;
       align-items: center;
       background: url(../assets/imgs/homeBackground.jpg);
    }
</style>