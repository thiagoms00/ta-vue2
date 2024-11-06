<template>
  <div class="d-flex flex-column w-100">
    <p
      class="text-overline mt-16 d-flex justify-center"
      style="
        color: #cfd8dc;
        font-size: 3rem !important;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
      "
    >
      Selecione uma escola
    </p>

    <div class="mt-16">
      <v-row class="pa-8">
        <v-col
          v-for="(escola, index) in escolas"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-sheet
            elevation="3"
            rounded="lg"
            class="pa-4 d-flex flex-column align-center borda-diagonal degrade"
          >
            <v-avatar size="64" class="mb-2">
              <v-icon large>mdi-school</v-icon>
            </v-avatar>
            <div class="text-center">{{ escola.nome }}</div>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

export default {
  name: "Escolas",
  components: {

  },

  data: () => ({
    tab: "option-1",
    habilidadesTurmaAtual: {},
    escolas: [
      { nome: "Escola A" },
      { nome: "Escola B" },
      { nome: "Escola C" },
      { nome: "Escola D" },
    ],
  }),

  created() {},

  methods: {},
  // FIM DO METHODSSSSSSS

  computed: {},
};
</script>
