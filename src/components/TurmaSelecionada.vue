<template>
  <div class="mt-4">

  </div>
  <div>
    <TurmaNiveisInfo
      v-if="tab_turma === 'option-1'"
      :listaDeAlunos="listaFiltrada()"
      ref="turmaVisualInfo"
    />

    <TurmaMapInfo
      v-if="tab_turma === 'option-2'"
      :listaDeAlunos="listaFiltrada()"
      ref="turmaMapInfo"
    />

    <TurmaDataInfo
      v-if="tab_turma === 'option-3'"
      :listaDeAlunos="listaFiltrada()"
      ref="turmaDataInfo"
      @eventDeleteTest="excluirTeste"
    />

    <TurmaGraphInfo
    v-if="tab_turma === 'option-4'"
      :listaDeAlunos="listaFiltrada()"
      :habilidadesTurma="dadosTurma.habTurma"
    />
  </div>
</template>

<script>
import axios from "axios";
import TurmaNiveisInfo from "./TurmaNiveisInfo.vue";
import TurmaMapInfo from "./TurmaMapInfo.vue";
import TurmaDataInfo from "./TurmaDataInfo.vue";
import TurmaGraphInfo from "./TurmaGraphInfo.vue";

export default {
  name: "TurmaSelecionada",

  data: () => ({}),

  components: {
    TurmaNiveisInfo,
    TurmaMapInfo,
    TurmaDataInfo,
    TurmaGraphInfo,
  },

  props: {
    dadosTurma: {
      type: Object,
      required: true,
    },
    tab_turma: {
      type: String,
      required: true,
    },
    search: {
      type: String,
    },
  },
  methods: {
    excluirTeste(data) {
      const indexAluno = data.indexAluno;
      const indexTeste = data.indexTeste;

      this.dadosTurma.turma[indexAluno].listaDeTestes.splice(indexTeste, 1);

      axios({
        url: "https://ta-back.onrender.com/professores/excluirTesteAluno",
        data,
        method: "POST",
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    listaFiltrada() {
      let result = Array.isArray(this.dadosTurma.turma)
        ? this.dadosTurma.turma
        : [];

      // Filtro de busca por nome
      if (this.search) {
        result = result.filter((item) =>
          item.user["nome"].toLowerCase().includes(this.search.toLowerCase())
        );
      }

      return result;
    },
  },
};
</script>


