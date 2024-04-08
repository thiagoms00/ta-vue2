<template>
    <div class="main-div">
        <v-container class="d-flex justify-end align-end absoluteClass h-100" fluid>
            <LogoImpacto />
        </v-container>
        <MessageCongratulations/>

    </div>
</template>

<script>
import LogoImpacto from '@/components/LogoImpacto.vue'
import MessageCongratulations from '@/components/MessageCongratulations.vue'

export default {
    name: 'Congratulations',
    components:{
        LogoImpacto,
        MessageCongratulations
    }
}
</script>

<style>
.main-div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    background: url('../assets/imgs/homeBackground.jpg');
    background-size: cover;
}

.absoluteClass {
    position: absolute;
}
</style>