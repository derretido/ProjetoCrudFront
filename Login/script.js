//CARREGANDO A API
const API = "https://projetocrud-production.up.railway.app/api";

function validacaoLogin(){
    var cargo = document.getElementById("icargo").value;
    var login = document.getElementById("ilogin").value;
    var senha = document.getElementById("isenha").value;
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (cargo === "" || login === "" || senha === ""){
    alert("Por favor, preencha todos os campos.");
    return false;
    }else if (!regex.test(login)){
        alert("O login deve ser um e-mail válido.");
        return false;
    }else if (senha.length < 8){
        alert("A senha deve ter pelo menos 8 caracteres.");
        return false;
    }
    return true;
}


function PegandoDadosLogin(){
    return{
        CARGO: document.getElementById("icargo").value,
        EMAIL: document.getElementById("ilogin").value,
        SENHA: document.getElementById("isenha").value
    }
}


async function Login(){
    var dados = PegandoDadosLogin();
    try{
        const resposta = await fetch (`${API}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        const resultado = await resposta.json();
        console.log(resultado);
    } catch (erro) {
        console.error("Erro ao fazer login:", erro);
    }
}
const btnLogin = document.getElementById("btn_login");
if (btnLogin){
    btnLogin.addEventListener("click", Login);
}