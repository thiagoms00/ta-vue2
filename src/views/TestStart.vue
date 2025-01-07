<template>

    <div class="main-div">
        <Layout1/>
    </div>
</template>

<script>

import Layout1 from '@/components/Layout1.vue';


export default {
    name: 'TestStart',
    components:{
        Layout1,
        
        
    },

    data (){
        return {
            layoutCheck : '',

        }
    },

    created (){
        // this.$store.dispatch('verificarToken', { router: this.$router });
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