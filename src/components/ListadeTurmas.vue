<template>
  <div class="d-flex flex-column w-100">
    <div>
      <v-row class="pa-8">
        <v-col v-for="(turma, index) in turmas" :key="index" cols="12" sm="6">
          <v-sheet
            elevation="3"
            rounded="lg"
            class="pa-4 d-flex align-center borda-diagonal degrade clickable-item"
            @click="selecionaTurma(turma._id)"
            style="cursor: pointer"
          >
            <v-avatar size="50" color="white" class="mr-4">
              <v-icon size="large" color="primary">mdi-account-group</v-icon>
            </v-avatar>
            <div class="mx-2">
              <div>
                Nome: <span class="font-weight-bold">{{ turma.nome }}</span>
              </div>
              <div>
                Número de alunos:
                <span class="font-weight-bold">{{ turma.numero_alunos }}</span>
              </div>
            </div>
            <div class="ml-5">
              <div>
                Professores:
              </div>
              <div>
                <span v-for="(professor, profIndex) in turma.listaDeProfs"
                    :key="profIndex"
                    class="font-weight-bold">
                    {{ professor }}
                </span>
              </div>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListadeTurmas",

  data: () => ({
    turmaAtual: []
  }),

  props: {
    turmas: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selecionaTurma(turmaValue) {

      const data = {
        idTurma: turmaValue.id, 
      };

      let urlAdd = "https://ta-back.onrender.com/admin/dadosTurma";

      axios({
        url: urlAdd,
        data,
        method: "POST",
      })
        .then((response) => {
          console.log(response)
          // this.turmaAtual = response.data.turma;
          // this.anoTurma = response.data.anoTurma;
          // this.estratoInicial = response.data.estratoInicial;
          // this.habilidadesTurmaAtual = response.data.habTurma;
          // //criando lista com os ultimos elementos.
          // for (let i = 0; i < this.listaTurma.length; i++) {
          //   if (
          //     this.listaTurma[i].listaDeTestes[
          //       this.listaTurma[i].listaDeTestes.length - 1
          //     ]
          //   ) {
          //     this.ultimosTestes.push(
          //       this.listaTurma[i].listaDeTestes[
          //         this.listaTurma[i].listaDeTestes.length - 1
          //       ]
          //     );
          //   } else {
          //     this.testesVazios.push();
          //   }
          // }
          // this.sortOrder = true;
        })
        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        })
        .finally(() => {

        });
    },
  },
};
</script>
