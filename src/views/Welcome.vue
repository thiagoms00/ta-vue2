<template>
    <div class="main-div">
      <v-container class="d-flex justify-end align-end absoluteClass h-100" fluid>
        <LogoImpacto/>
      </v-container>
      <MessageWelcome/>
    </div>

</template>

<script>

import MessageWelcome from '@/components/MessageWelcome.vue'
// import LogoImpacto from '@/components/LogoImpacto.vue'
// import { mapActions } from 'vuex'

export default{

    name: 'Welcome',
    components: {
      MessageWelcome,
    },
    methods:{
    
    },
    created(){
      // this.verificarToken();
      this.$store.dispatch('verificarToken', { router: this.$router });

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

.absoluteClass{
  position: absolute;
}
</style>