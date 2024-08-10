<template>
    <div >

      <v-btn variant="text" class="optionButton" @click="dialog = true">
        <v-tooltip activator="parent" location="top">Excluir Teste</v-tooltip>
        <v-icon size="large" icon="mdi-delete-forever" color="red"></v-icon>
      </v-btn>
  
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card style="overflow: hidden;"
          max-width="400"
          prepend-icon="mdi-delete-forever"
          text="Você realmente deseja excluir os dados referentes a este teste ?"
          title="Exclusão de teste"
        >
        <template v-slot:actions>
            <v-row class="ma-1">
                <v-col cols="6">
                <v-btn
                    variant="elevated"
                    block
                    text="Não"
                    color="blue-lighten-5"
                    @click="dialog = false"
                ></v-btn>
                </v-col>

                <v-col cols="6">
                <v-btn
                    variant="elevated"
                    block
                    text="Sim"
                    color="red-darken-1"
                    @click="eventExcluirTeste()"
                ></v-btn>
                </v-col>
            </v-row>
        </template>


        </v-card>
      </v-dialog>
    </div>
  </template>

<script>
export default {
    name: 'DialogExcluirTesteVue',
    data () {
      return {
        dialog: false,
      }
    },
    methods:{
        eventExcluirTeste(){
            this.dialog = false
            this.$emit('trigger-metododeexclusão');
        }
    }
}
</script>