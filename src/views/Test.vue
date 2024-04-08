<template>

<v-container class="fill-height">
     
    <TimePopup/>

</v-container>
    
</template>


<script>

import TimePopup from '@/components/TimePopup.vue'
import AlgTeste from '@/components/AlgTeste.vue'

export default{
    name : 'Test',
    components:{
        TimePopup,
        AlgTeste
    }   


}
</script>

<style>

</style>