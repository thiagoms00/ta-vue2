import axios from "axios";

export function verificaLogin(router, route) {
  const dataToken = localStorage.getItem("token");
  const userType = localStorage.getItem("type");

  // Verifica se tem algum token no navegador
  if (!dataToken || !userType || dataToken.trim() === "" || userType.trim() === "") {
    console.log(
      'O localStorage está vazio ou o item "token" ou "type" não está definido.'
    );
    router.push("/loginlogin");
    return;
  }

  const data = { token: dataToken, type: userType };

  axios
    .post("https://ta-back.onrender.com/generalMethods/verificaToken", data)
    .then((response) => {
      if (response.status === 200) {
        // Caso o TOKEN for de um ALUNO
        if (response.data.type === "aluno") {
          localStorage.clear();

          const token = response.data.token;
          const id = response.data.id;
          const anoAtual = response.data.anoAtual;
          const idTurma = response.data.idTurma;
          const estratoInicial = response.data.estratoInicial;
          const type = response.data.type;

          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          localStorage.setItem("anoAtual", anoAtual);
          localStorage.setItem("idTurma", idTurma);
          localStorage.setItem("estratoInicial", estratoInicial);
          localStorage.setItem("type", type);

          if (route.path === "/loginlogin") {
            router.push("/welcome");
          }
        
          // Caso o TOKEN for de um ALUNO
        } else if (response.data.type === "prof") {
          localStorage.clear();

          const tokenProf = response.data.tokenProf;
          const idProf = response.data.idProf;
          const admin = response.data.admin;
          const type = response.data.type;

          localStorage.setItem("token", tokenProf);
          localStorage.setItem("idProf", idProf);
          localStorage.setItem("type", type);
          localStorage.setItem("admin", admin);

          if (route.path === "/loginlogin") {
            router.push("/turma");
          }
        }
      }
    })
    .catch((error) => {
      console.error(
        "Erro na verificação do token:",
        error.response?.status || error.message
      );
      localStorage.clear();

      if (route.path === "/welcome" || route.path === "/turma") {
        router.push("/loginlogin");
      }
    });
}
