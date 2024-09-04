<template>

    <v-container>
        <v-card>
            <v-tabs v-model="tab" bg-color="orange">
                <v-tab value="teste1">
                  <v-icon icon="mdi-numeric-1"></v-icon>
                </v-tab>

                <v-tab value="teste2">
                  <v-icon icon="mdi-numeric-2"></v-icon>
                  
                </v-tab>

                <v-tab value="teste3">
                  <v-icon icon="mdi-numeric-3"></v-icon>
                  
                </v-tab>

                <v-tab value="teste4">
                  <v-icon icon="mdi-numeric-4"></v-icon>
                </v-tab>

                <v-tab value="teste5">
                  <v-icon icon="mdi-numeric-5"></v-icon>
                </v-tab>
              </v-tabs>
        </v-card>

    <v-window v-model="tab">
        <v-window-item value="teste1">
            
            <v-table>
                <thead>
                <tr>
                    <th class="text-left">
                    Questão
                    </th>
                    <th class="text-left">
                    Habilidade
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr class=""
                        v-for="(item, index) in testes_org[0]"
                        :key="item.estrato"
                    >
                        
                        <td v-if="item.acerto==='Sim'" class="cor-acerto">{{ index + 1 }}</td>
                        <td v-else class="cor-erro">{{ index + 1 }}</td>

                        <td v-if="item.acerto==='Sim'" class="cor-acerto">{{ this.getHabilidadeDescricao(item.habilidade) }}</td>
                        <td v-else class="cor-erro">{{ this.getHabilidadeDescricao(item.habilidade) }}</td>

                    </tr>
                </tbody>
         </v-table>

            
        </v-window-item>
        <v-window-item value="teste2">
            <v-table>
                <thead>
                <tr>
                    <th class="text-left">
                    Questão
                    </th>
                    <th class="text-left">
                    Habilidade
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr class=""
                        v-for="(item, index) in testes_org[1]"
                        :key="item.estrato"
                    >
                        
                        <td v-if="item.acerto==='Sim'" class="cor-acerto">{{ index + 1 }}</td>
                        <td v-else class="cor-erro">{{ index + 1 }}</td>

                        <td v-if="item.acerto==='Sim'" class="cor-acerto">{{ this.getHabilidadeDescricao(item.habilidade) }}</td>
                        <td v-else class="cor-erro">{{ this.getHabilidadeDescricao(item.habilidade) }}</td>

                    </tr>
                </tbody>
         </v-table>
        </v-window-item>
        <v-window-item value="teste3">
            <v-table>
                <thead>
                <tr>
                    <th class="text-left">
                    Questão
                    </th>
                    <th class="text-left">
                    Habilidade
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr class=""
                        v-for="(item, index) in testes_org[2]"
                        :key="item.estrato"
                    >
                        
                        <td v-if="item.acerto==='Sim'" class="cor-acerto">{{ index + 1 }}</td>
                        <td v-else class="cor-erro">{{ index + 1 }}</td>

                        <td v-if="item.acerto==='Sim'" class="cor-acerto">{{ this.getHabilidadeDescricao(item.habilidade) }}</td>
                        <td v-else class="cor-erro">{{ this.getHabilidadeDescricao(item.habilidade) }}</td>

                    </tr>
                </tbody>
         </v-table>
        </v-window-item>
        <v-window-item value="teste4">
            <v-table>
                <thead>
                <tr>
                    <th class="text-left">
                    Questão
                    </th>
                    <th class="text-left">
                    Habilidade
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr class=""
                        v-for="(item, index) in testes_org[3]"
                        :key="item.estrato"
                    >
                        
                        <td v-if="item.acerto==='Sim'" class="cor-acerto">{{ index + 1 }}</td>
                        <td v-else class="cor-erro">{{ index + 1 }}</td>

                        <td v-if="item.acerto==='Sim'" class="cor-acerto">{{ this.getHabilidadeDescricao(item.habilidade) }}</td>
                        <td v-else class="cor-erro">{{ this.getHabilidadeDescricao(item.habilidade) }}</td>

                    </tr>
                </tbody>
         </v-table>
        </v-window-item>
        <v-window-item value="teste5">
            <v-table>
                <thead>
                <tr>
                    <th class="text-left">
                    Questão
                    </th>
                    <th class="text-left">
                    Habilidade
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr class=""
                        v-for="(item, index) in testes_org[4]"
                        :key="item.estrato"
                    >
                        
                        <td v-if="item.acerto==='Sim'" class="cor-acerto">{{ index + 1 }}</td>
                        <td v-else class="cor-erro">{{ index + 1 }}</td>

                        <td v-if="item.acerto==='Sim'" class="cor-acerto">{{ this.getHabilidadeDescricao(item.habilidade) }}</td>
                        <td v-else class="cor-erro">{{ this.getHabilidadeDescricao(item.habilidade) }}</td>

                    </tr>
                </tbody>
         </v-table>
        </v-window-item>
    </v-window>

    </v-container>

   
    
</template>
  
  <script>

  export default {
    components: {
      
    },
  
    data() {
      return {
        qtdTestes : 1,
        tab: 'teste1',

        
        testes_org:[],

      };
    },
  
    props: {
      listaTestes : {
        type: Array,
        required: true,
        default: [],
      },
    },
  
    watch: {
      // Observa mudanças em `listaDeAlunos`
      
    },
  
    created() {
        this.qtdTestes = this.listaTestes.length; //Obtendo o total de testes.
        console.log(this.listaTestes)
        this.organizaTestes();
    },
  
    mounted() {
    },
  
    methods: {

        printaTestes(){
            console.log(this.listaTestes)
            console.log(`QTD DE TESTES : ${this.qtdTestes}`)
        },

        organizaTestes(){
           //Obtendo os dados armazenados nas planilhas...
           let i=1;
           
            let aux=5;
            if(this.listaTestes.length<4){
                aux = this.listaTestes.length;
            }

            while(this.testes_org.length<=aux){
                if(this.listaTestes[this.listaTestes.length-i].status==="Finalizado"){
                    let teste_p = this.listaTestes[this.listaTestes.length-i].planilha_teste;
                    this.testes_org.push(teste_p);
                    
                }
                i++;
            } 
            console.log(this.testes_org)
            
            
        },

    getHabilidadeDescricao(habilidadeCode) {
        const habilidades = {
            H01: "Reconhecer letras do alfabeto.",
            H02: "Identificar o número de sílabas de uma palavra.",
            H03: "Reconhecer letras reproduzidas com diferentes fontes e formatos.",
            H04: "Identificar elementos sonoros (sílaba, rima, fonema) em palavras.",
            H05: "Ler palavras com diferentes padrões silábicos.",
            H06: "Reconhecer informações explícitas em textos.",
            H07: "Analisar informações em gráficos, infográficos, tabelas e outros textos que apresentam recursos multissemióticos.",
            H08: "Identificar o assunto ou tema principal de um texto.",
            H09: "Reconhecer a finalidade ou o objetivo de um texto.",
            H10: "Inferir informações em textos de diferentes gêneros.",
            H11: "Estabelecer relações de causa e consequência em textos de diferentes gêneros.",
        };

        return habilidades[habilidadeCode] || "Habilidade desconhecida";
    }
     
    },
  };
    </script>

<style>


.text-left{
    font-size: 1rem;
    font-weight: 600;
}

.cor-acerto{
    background-color: #7df76d;
    color: black;
    font-weight: 500;
}

.cor-erro{
    background-color: #fce78f; 
    color: black;
    font-weight: 500;
}
 
</style>
  