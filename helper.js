this.Questoes = Array(this.nq[nestr] - jquest).fill(0);// lista que armazenará os identificadores das questões apresentadas
this.Respostas = Array(this.nq[nestr] - jquest).fill(0); // lista que armazenará as respostas do estudante às questões
this.termina = false;                            // flag de término da bateria de questões referente ao estrato
this.ind_questao = jquest;                       // índice relativo da questão (aponta agora para primeira questão a ser utilizada)
this.resultado = 0;                              // vai conter: -1 -> reprovação; 0 -> indefinido; 1 -> aprovação
this.seq_prob_dom = new Array(this.nq[nestr]);        // vai conter as probabilidades ter marcado o item dado que domina conteúdo
this.seq_prob_ndom = new Array(this.nq[nestr]);       // vai conter as probabilidades ter marcado o item dado que não domina conteúdo