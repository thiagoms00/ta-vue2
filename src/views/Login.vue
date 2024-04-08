<template>
  <div class="main-div">
    <v-container class="d-flex justify-end align-end absoluteClass h-100" fluid>
      <LogoImpacto/>
    </v-container>
    <LoginForm />
  </div>

</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import LogoImpacto from '@/components/LogoImpacto.vue'

export default {
  name: 'Login',
  components: {
    LoginForm,
    LogoImpacto
  }, 

  mounted(){
    this.verificaLogin();
  },

  methods:{
    verificaLogin(){
      console.log(localStorage.getItem('token'));
    }

  }
}


</script>

<!-- <style scoped>
.bg {
  background: url('../assets/imgs/homeBackground.jpg');
  background-size: cover;
  height: 100vh;
  background-position: center;
}
</style> -->

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