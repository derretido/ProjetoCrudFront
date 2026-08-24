// URL DA API

const API = "https://projetocrud-production.up.railway.app/api";

// CARREGAR SELECT DE ESPECIALIDADES
async function carregarEspecialidadesNoSelect() {
    const select = document.getElementById("Especialidade");
    if (!select) return; 
    try {
        const resposta = await fetch(`${API}/Especialidade`);
        const especialidades = await resposta.json();
        especialidades.forEach(esp => {
            const option = document.createElement("option");
            option.value = esp.iD_MED_TAB_ESPECIALIDADE;
            option.textContent = esp.meD_TAB_ESPECIALIDADE_DESCRICAO;
            select.appendChild(option);
        });
    } catch (erro) {
        console.error("Erro ao carregar especialidades:", erro);
    }
}

// CARREGAR SELECT DE STATUS (MÉDICO)
async function carregarStatusNoSelect() {
    const select = document.getElementById("Status");
    if (!select) return;
    try {
        const resposta = await fetch(`${API}/MedicoStatus`); 
        const statusList = await resposta.json();
        statusList.forEach(st => {
            const option = document.createElement("option");
            option.value = st.iD_MED_TAB_STATUS;
            option.textContent = st.meD_TAB_STATUS_DESCRICAO;
            select.appendChild(option);
        });
    } catch (erro) {
        console.error("Erro ao carregar status:", erro);
    }
}


// CADASTRO MÉDICO
function obterDadosMedico() {
    return {
        iD_MED_CRM: parseInt(document.getElementById("CRM").value),
        meD_NOME_COMPLETO: document.getElementById("Nome").value,
        meD_SEXO: document.getElementById("Sexo").value,
        meD_CPF: document.getElementById("CPF").value,
        meD_TELEFONE: document.getElementById("Telefone").value,
        meD_ENDERECO: document.getElementById("Endereço").value,
        meD_CEP: document.getElementById("CEP").value,
        meD_NUMERO: document.getElementById("Numero").value,
        meD_BAIRRO: document.getElementById("Bairro").value,
        meD_CIDADE: document.getElementById("Cidade").value,
        meD_UF: document.getElementById("UF").value,
        meD_COMPLEMENTO: document.getElementById("Complemento").value,
        iD_MED_TAB_ESPECIALIDADE: parseInt(document.getElementById("Especialidade").value), // Passa para inteiro assim mostrando para a API que é um número
        iD_MED_TAB_STATUS: parseInt(document.getElementById("Status").value) // mesma coisa aqui.
    };
}

async function cadastrarMedico() {
    const dados = obterDadosMedico();
    console.log(dados);
    try {
        const resposta = await fetch(`${API}/Medico`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        if (!resposta.ok)
            throw new Error("Erro ao cadastrar médico.");
        const mensagem = document.getElementById("Mensagem");
        mensagem.innerText = "Cadastro do médico efetuado com sucesso!";
        mensagem.style.color = "green";
    } catch (erro) {
        console.error(erro);
        const mensagem = document.getElementById("Mensagem");
        mensagem.innerText = "Erro ao cadastrar médico.";
        mensagem.style.color = "red";
    }
}
const btnCadastrarMedico = document.getElementById("btn_cadastrarMedico");
if (btnCadastrarMedico) {
    btnCadastrarMedico.addEventListener("click", cadastrarMedico);
}

//Carregando os médicos
async function carregarMedicos() {
    const select = document.getElementById("CRM");
    if (!select) return;
    const resposta = await fetch(`${API}/Medico`);
    const medicos = await resposta.json();
    medicos.forEach(medico => {
        const option = document.createElement("option");
        option.value = medico.medicoId;
        option.textContent = `${medico.medicoId} - ${medico.nome} - ${medico.especialidade}`;
        select.appendChild(option);
    });
}



//Carregando os pacientes
async function carregarPacientes() {
    const select = document.getElementById("RG/CIN");
    if (!select) return;
    const resposta = await fetch(`${API}/Paciente`);
    const pacientes = await resposta.json();
    pacientes.forEach(paciente => {
        const option = document.createElement("option");
        option.value = paciente.iD_PAC_RG_CIN;
        option.textContent = `${paciente.iD_PAC_RG_CIN}- ${paciente.paC_NOME_COMPLETO}`;
        select.appendChild(option);
    });
}


//Carregando quantidade de consultas
function qtdCosnulta(){
    const select = document.getElementById("Qtde_maxima");
    if (!select) return;
    for (let i = 0; i <= 30; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
}


// CADASTRO PACIENTE
function obterDadosPaciente() {
    return {
        ID_PAC_RG_CIN: document.getElementById("RG/CIN").value,
        PAC_CPF: document.getElementById("CPF").value,
        PAC_NOME_COMPLETO: document.getElementById("Nome").value,
        PAC_SEXO: document.getElementById("Sexo").value,
        PAC_TELEFONE: document.getElementById("Telefone").value,
        PAC_ENDERECO: document.getElementById("Endereço").value,
        PAC_CEP: document.getElementById("CEP").value,
        PAC_CIDADE: document.getElementById("Cidade").value,
        PAC_BAIRRO: document.getElementById("Bairro").value,
        PAC_NUMERO: document.getElementById("Numero").value,
        PAC_COMPLEMENTO: document.getElementById("Complemento").value,
        PAC_UF: document.getElementById("UF").value,
        ID_PAC_TAB_CONVENIO: document.getElementById("Convenio").value
    };
}

async function cadastrarPaciente() {
    const dados = obterDadosPaciente();
    console.log(dados);
    try {
        const resposta = await fetch(`${API}/Paciente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        if (!resposta.ok)
        throw new Error("Erro ao cadastrar paciente.");
        const mensagem = document.getElementById("MensagemPaciente");
        mensagem.innerText = "Cadastro do paciente efetuado com sucesso!";
        mensagem.style.color = "green";
    } catch (erro) {
        console.error(erro);
        const mensagem = document.getElementById("MensagemPaciente");
        mensagem.innerText = "Erro ao cadastrar paciente.";
        mensagem.style.color = "red";
    }
}

const btnCadastrarPaciente = document.getElementById("btn_cadastrar_Paciente");
if (btnCadastrarPaciente) {
    btnCadastrarPaciente.addEventListener("click", cadastrarPaciente);
}

//Carregando os Convenios
async function carregarConvenios() {
    const select = document.getElementById("Convenio");
    if (!select) return; 
    try {
        const resposta = await fetch(`${API}/Convenio`); 
        const convenios = await resposta.json();
        
        convenios.forEach(conv => {
            const option = document.createElement("option");
            option.value = conv.iD_PAC_TAB_CONVENIO;
            option.textContent = conv.paC_TAB_CONVENIO_DESCRICAO;
            select.appendChild(option);
        });
    } catch (erro) {
        console.error("Erro ao carregar convênios:", erro);
    }
}

// CADASTRO ESPECIALIDADE
function obterDadosEspecialidade() {
    return {
        MED_TAB_ESPECIALIDADE_DESCRICAO: document.getElementById("Especialidade").value,
        MED_TAB_ESPECIALIDADE_OCULTA: false
    };

}
async function cadastrarEspecialidade() {
    const dados = obterDadosEspecialidade();
    console.log(dados);
    if (dados.MED_TAB_ESPECIALIDADE_DESCRICAO) {
        const resposta = await fetch(`${API}/Especialidade`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar especialidade.");
        }
        const mensagem = document.getElementById("Mensagem_Especialidade");
        mensagem.innerText = "Especialidade cadastrada com sucesso!";
        mensagem.style.color = "green";
    } else {
        const mensagem = document.getElementById("Mensagem_Especialidade");
        mensagem.innerText = "Escreva a especialidade antes de cadastrar.";
        mensagem.style.color = "red";
    }
}
const btnCadastrarEspecialidade = document.getElementById("btn_cadastrar_especialidade");
if (btnCadastrarEspecialidade) {
    btnCadastrarEspecialidade.addEventListener("click", cadastrarEspecialidade);
}

//Carregando todas as especialidades
async function carregarEspecialidades() {
    const tabela = document.getElementById("tabelaEspecialidades");
    if (!tabela) return;
    const resposta = await fetch(`${API}/Especialidade`);
    const especialidades = await resposta.json();
    console.log(especialidades);
    tabela.innerHTML = "";
    especialidades.forEach(esp => {
        const tr = document.createElement("tr");
        tr.dataset.id = esp.iD_MED_TAB_ESPECIALIDADE;
        tr.innerHTML = `
            <td>${esp.meD_TAB_ESPECIALIDADE_DESCRICAO}</td>
            <td></td>
            <td>
                <button class="btn-excluir-Esp" data-id="${esp.iD_MED_TAB_ESPECIALIDADE}">Excluir</button>
            </td>
        `;
        console.log(tr);
        tabela.appendChild(tr);
    });
} 


//Cadastro de Convênio
function obterDadosConvenio() {
    return {
        PAC_TAB_CONVENIO_DESCRICAO: document.getElementById("Convenio").value,
        PAC_TAB_CONVENIO_OCULTA: false,
        ID_PAC_TAB_CONVENIO_STATUS: document.getElementById("ConvenioStatus").value
    };
}
async function cadastrarConvenio() {
    const dados = obterDadosConvenio();
    console.log(dados);
    try {
        const resposta = await fetch(`${API}/Convenio`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        if (!resposta.ok)
            throw new Error("Erro ao cadastrar convênio.");
        const mensagem = document.getElementById("Mensagem_Convenio");
        mensagem.innerText = "Convênio cadastrado com sucesso!";
        mensagem.style.color = "green";
    } catch (erro) {
        console.error(erro);
        const mensagem = document.getElementById("Mensagem_Convenio");
        mensagem.innerText = "Erro ao cadastrar convênio.";
        mensagem.style.color = "red";
    }
}
const btnCadastrarConvenio = document.getElementById("btn_cadastrar_convenio");
if (btnCadastrarConvenio) {
    btnCadastrarConvenio.addEventListener("click", cadastrarConvenio);
}


//carregando status do convênio
async function carregarStatusConvenio(){
    const select = document.getElementById("ConvenioStatus");
    if(!select) return;
    const resposta = await fetch(`${API}/ConevenioStatus`);
    const status = await resposta.json();

    status.forEach(stat => {
        const option = document.createElement("option");
        option.value = stat.iD_PAC_TAB_CONVENIO_STATUS;
        option.textContent = stat.paC_TAB_CONVENIO_STATUS_DESCRICAO;
        select.appendChild(option);
    });
}


//Agenda medica
function obterDadosAgendaMedica() {
    const periodoEl = document.getElementById("Periodo");
    const periodoValue = parseInt(periodoEl.value);
    if (!periodoEl.value || isNaN(periodoValue)) {
        throw new Error("Selecione um período válido.");
    }
    const minutosConsulta = parseInt(document.getElementById("Tempo_consulta").value);
    const tempoConsultaFormatado = 
        `${String(Math.floor(minutosConsulta / 60)).padStart(2, "0")}:${String(minutosConsulta % 60).padStart(2, "0")}:00`;
    return {
        ID_MED_CRM: parseInt(document.getElementById("CRM").value),
        ID_MED_TAB_AGENDA_PERIODO: periodoValue,
        MED_AGENDA_DIA_SEMANA: document.getElementById("DiaSemana").value,
        MED_AGENDA_HORA_INICIAL: `${document.getElementById("Horario_inicial").value}:00`,
        MED_AGENDA_HORA_FINAL: `${document.getElementById("Horario_final").value}:00`,
        MED_AGENDA_QTDE_MAXIMA: document.getElementById("Qtde_maxima").value,
        MED_AGENDA_TEMPO_CONSULTA: tempoConsultaFormatado,
    };
}


async function cadastrarDiasDisponiveis() {
    const dados = obterDadosAgendaMedica();
    console.log(dados);
    try {
        const resposta = await fetch(`${API}/Agendar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        if (!resposta.ok)
            throw new Error("Erro ao cadastrar os dias disponíveis do médico.");
        const mensagem = document.getElementById("Mensagem_DiasDispo");
        mensagem.innerText = "Dias disponíveis cadastrados com sucesso!";
        mensagem.style.color = "green";
    } catch (erro) {
        console.error(erro);
        const mensagem = document.getElementById("Mensagem_DiasDispo");
        mensagem.innerText = "Erro ao cadastrar os dias disponíveis do médico.";
        mensagem.style.color = "red";
    }
}
const btn_cadastrarDiasDisponiveis = document.getElementById("btn_cadastrarDiasDisponiveis");
if (btn_cadastrarDiasDisponiveis) {
    btn_cadastrarDiasDisponiveis.addEventListener("click", cadastrarDiasDisponiveis);
}

//Agenda medica - Carregando Periodos
async function AgendaPeriodo(){
    const select = document.getElementById("Periodo");
    if(!select) return;
    const resposta = await fetch(`${API}/AgendaPeriodo`);
    const periodos = await resposta.json();
    periodos.forEach(periodo => {
        const option = document.createElement("option");
        option.value = periodo.iD_MED_TAB_AGENDA_PERIODO;
        option.textContent = periodo.meD_TAB_AGENDA_PERIODO_DESCRICAO;
        select.appendChild(option);
    });
}

// Cadastro de Agendamento
function obterDadosAgendamentos() {
    const periodoEl = document.getElementById("Periodo");
    const periodoValue = parseInt(periodoEl.value);

    if (!periodoEl.value || isNaN(periodoValue)) {
        throw new Error("Selecione um período válido.");
    }
    return {
        iD_MED_CRM: parseInt(document.getElementById("CRM").value),
        ID_PAC_RG_CIN: parseInt(document.getElementById("RG/CIN").value),
        ID_MED_TAB_AGENDA_PERIODO: periodoValue,
        ID_MED_AGENDAMENTO_STATUS: parseInt(document.getElementById("StatusAgenda").value),
        MED_AGENDAMENTO_HORARIO: `${document.getElementById("Horario").value}:00`,
        MED_AGENDAMENTO_DATA: document.getElementById("Data").value,
    };
}
async function cadastrarAgendamentos() {
    const dados = obterDadosAgendamentos();
    console.log(dados);
    try {
        const resposta = await fetch(`${API}/Agendamento`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        if (!resposta.ok)
            throw new Error("Erro ao cadastrar agenda médica.");
        const mensagem = document.getElementById("Mensagem_AgendaMedica");
        mensagem.innerText = "Agenda médica cadastrada com sucesso!";
        mensagem.style.color = "green";
    } catch (erro) {
        console.error(erro);
        const mensagem = document.getElementById("Mensagem_AgendaMedica");
        mensagem.innerText = "Erro ao cadastrar agenda médica.";
        mensagem.style.color = "red";
    }
}
const btn_cadastrarAgendamentos = document.getElementById("btn_cadastrarAgendamentos");
if (btn_cadastrarAgendamentos) {
    btn_cadastrarAgendamentos.addEventListener("click", cadastrarAgendamentos);
}

//Consulta dos Agendamentos
async function carregarAgendamentos() {
    const tabela = document.getElementById("tabelaAgendamentos");
    if (!tabela) return;
    const resposta = await fetch(`${API}/Agendamento`);
    const agendamentos = await resposta.json();
    console.log(agendamentos);
    tabela.innerHTML = "";
    agendamentos.forEach(ag => {
        const linha = document.createElement("tr");
        linha.dataset.id = ag.agendamentoId;
        const dataFormatada = new Date(ag.data).toLocaleDateString("pt-BR");
        const horarioFormatado = ag.horario?.substring(0, 5);
        linha.innerHTML = `
            <td>${dataFormatada}</td>
            <td>${horarioFormatado}</td>
            <td>${ag.paciente}</td>
            <td>${ag.medico}</td>
            <td>${ag.especialidade}</td>
            <td></td>
            <td>
                <button class="btn-editar" data-id="${ag.agendamentoId}">Editar</button>
                <button class="btn-excluir" data-id="${ag.agendamentoId}">Excluir</button>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

// Troca as células de Data, Horário e Status da linha por campos editáveis
function editarAgendamento(linha) {
    const dataAtual = linha.children[0].textContent;
    const horarioAtual = linha.children[1].textContent;
    const [dia, mes, ano] = dataAtual.split("/");
    const dataISO = `${ano}-${mes}-${dia}`;

    linha.children[0].innerHTML = `<input type="date" class="edit-data" value="${dataISO}">`;
    linha.children[1].innerHTML = `<input type="time" class="edit-horario" value="${horarioAtual}">`;
    linha.children[6].innerHTML = `
        <button class="btn-salvar">Salvar</button>
        <button class="btn-cancelar">Cancelar</button>
    `;
}

// Envia a Data, o Horário e o Status editados para a API
async function salvarEdicaoAgendamento(linha) {
    const id = linha.dataset.id;
    const novaData = linha.querySelector(".edit-data").value;
    const novoHorario = linha.querySelector(".edit-horario").value;


    if (!novaData || !novoHorario) {
        alert("Preencha a data e o horário antes de salvar.");
        return;
    }

    const dados = {
        MED_AGENDAMENTO_DATA: novaData,
        MED_AGENDAMENTO_HORARIO: `${novoHorario}:00`
    };

    try {
        await atualizar(`${API}/Agendamento/${id}`, dados);
    } catch (erro) {
        console.error("Erro ao editar agendamento:", erro);
        alert("Erro ao editar agendamento.");
    }
    carregarAgendamentos();
}

document.addEventListener("click", async (evento) => {
    const linha = evento.target.closest("tr");
    if (!linha || !linha.closest("#tabelaAgendamentos")) return;

    if (evento.target.classList.contains("btn-editar")) {
        editarAgendamento(linha);
    }

    if (evento.target.classList.contains("btn-cancelar")) {
        carregarAgendamentos();
    }

    if (evento.target.classList.contains("btn-salvar")) {
        await salvarEdicaoAgendamento(linha);
    }

    if (evento.target.classList.contains("btn-excluir")) {
        const id = evento.target.dataset.id;
        const confirmou = confirm("Tem certeza que deseja excluir este agendamento?");
        if (!confirmou) return;
        await excluir(`${API}/Agendamento/${id}`);
        carregarAgendamentos();
    }
});

document.addEventListener("click", async (evento) => {
    if (evento.target.classList.contains("btn-excluir-Esp")) {
        const id = evento.target.dataset.id;
        const confirmou = confirm("Tem certeza que deseja excluir essa especialidade?");
        if (!confirmou) return;
        await excluir(`${API}/Especialidade/${id}`);
        carregarEspecialidades();
    }
});


//Lista de Médicos Disponíveis
async function carregarMedicosDisponiveis() {
    const tabelamed = document.getElementById("tabelaMedicos");
    if (!tabelamed) return;
    const resposta = await fetch(`${API}/Medico`);
    const medicos = await resposta.json();
    console.log(medicos);
    tabelamed.innerHTML = "";
    medicos.forEach(md => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${md.medicoId}</td>
            <td>${md.nome}</td>
            <td>${md.telefone}</td>
            <td>${md.cep}</td>
            <td>${md.especialidade}</td>
            <td>${md.sexo}</td>
            <td>
                <button class="btn-excluir" data-id="${md.medicoId}">Excluir</button>
            </td>
        `;
        tabelamed.appendChild(linha);
    });
document.addEventListener("click", async (evento) => {
    if (evento.target.classList.contains("btn-excluir")) {
        const id = evento.target.dataset.id;
        const confirmou = confirm("Tem certeza que deseja excluir este médico?");
        if (!confirmou) return;
        await excluir(`${API}/Medico/${id}`);
        carregarMedicosDisponiveis(); 
        }
    }); 
}

// ATUALIZAR / EXCLUIR
async function atualizar(url, dados) {
    await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}

async function excluir(url) {
    await fetch(url, {
        method: "DELETE"
    });
}

function diaSemana(){
    const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const select = document.getElementById("DiaSemana");
    if (!select) return;
    dias.forEach(dia => {
        const option = document.createElement("option");
        option.value = dia;
        option.textContent = dia;
        select.appendChild(option);
    });
}


function tempoConsulta(){
    const tempo = ["15 min", "30 min", "45 min", "60 min"];
    const select = document.getElementById("Tempo_consulta");
    if (!select) return;
    tempo.forEach(t => {
        const option = document.createElement("option");
        option.value = t;
        option.textContent = t;
        select.appendChild(option);
    });
}


function statusAgenda(){
    const status = [
        {id: 1, descricao: "Confirmado"},
        {id: 2, descricao: "Não Compareceu"},
        {id: 3, descricao: "Pendente"}
    ];
    const select = document.getElementById("StatusAgenda");
    if (!select) return;
    status.forEach(s => {
        const option = document.createElement("option");
        option.value = s.id;
        option.textContent = s.descricao;
        select.appendChild(option);
    });
}


carregarEspecialidades()
carregarPacientes();
statusAgenda();
tempoConsulta();
diaSemana();
qtdCosnulta();
carregarEspecialidadesNoSelect();
carregarStatusNoSelect();
carregarMedicos();
carregarConvenios();
carregarStatusConvenio();
AgendaPeriodo();
carregarAgendamentos();
carregarMedicosDisponiveis();