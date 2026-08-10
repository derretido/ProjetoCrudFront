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
        option.textContent = `${medico.medicoId} - ${medico.nome}`;
        select.appendChild(option);
    });
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
        iD_PAC_TAB_CONVENIO: document.getElementById("Convenio").value
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
    try {
        const resposta = await fetch(`${API}/Especialidade`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        if (!resposta.ok)
            throw new Error("Erro ao cadastrar especialidade.");
        const mensagem = document.getElementById("Mensagem_Especialidade");
        mensagem.innerText = "Especialidade cadastrada com sucesso!";
        mensagem.style.color = "green";
    } catch (erro) {
        console.error(erro);
        const mensagem = document.getElementById("Mensagem_Especialidade");
        mensagem.innerText = "Erro ao cadastrar especialidade.";
        mensagem.style.color = "red";
    }
}
const btnCadastrarEspecialidade = document.getElementById("btn_cadastrar_especialidade");
if (btnCadastrarEspecialidade) {
    btnCadastrarEspecialidade.addEventListener("click", cadastrarEspecialidade);
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
        MED_AGENDA_HORA_INICIAL: document.getElementById("Horario_inicial").value,
        MED_AGENDA_HORA_FINAL: document.getElementById("Horario_final").value,
        MED_AGENDA_QTDE_MAXIMA: document.getElementById("Qtde_maxima").value,
        MED_AGENDA_TEMPO_CONSULTA: tempoConsultaFormatado,
    };
}
async function cadastrarAgendaMedica() {
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
const btn_cadastrarDiasDisponiveis = document.getElementById("btn_cadastrarDiasDisponiveis");
if (btn_cadastrarDiasDisponiveis) {
    btn_cadastrarDiasDisponiveis.addEventListener("click", cadastrarAgendaMedica);
}


//Agenda medica - Carregando Periodos
async function AgendaPeriodo(){
    const select = document.getElementById("Periodo");
    if(!select) return;
    const resposta = await fetch(`${API}/AgendaPeriodo`);
    const periodos = await resposta.json();
    periodos.forEach(periodo => {
        const option = document.createElement("option");
        option.value = periodo.ID_MED_TAB_AGENDA_PERIODO;
        option.textContent = periodo.MED_TAB_AGENDA_PERIODO_DESCRICAO;
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
        ID_MED_CRM: parseInt(document.getElementById("CRM").value),
        ID_PAC_RG_CIN: document.getElementById("RG/CIN").value,
        ID_MED_TAB_AGENDA_PERIODO: periodoValue,
        ID_MED_AGENDAMENTO_STATUS: parseInt(document.getElementById("StatusAgenda").value),
        MED_AGENDAMENTO_HORARIO: document.getElementById("Horario").value,
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
    linha.children[5].innerHTML = `
        <select class="edit-status">
            <option value="">Status</option>
            <option value="1">Confirmado</option>
            <option value="2">Não Compareceu</option>
            <option value="3">Pendente</option>
        </select>
    `;
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
    const novoStatus = linha.querySelector(".edit-status").value;

    if (!novaData || !novoHorario || !novoStatus) {
        alert("Preencha a data, o horário e o status antes de salvar.");
        return;
    }

    const dados = {
        MED_AGENDAMENTO_DATA: novaData,
        MED_AGENDAMENTO_HORARIO: `${novoHorario}:00`,
        ID_MED_AGENDAMENTO_STATUS: parseInt(novoStatus)
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
                <button class="btn-editar" data-id="${md.ID_MEDICO}">Editar</button>
                <button class="btn-excluir" data-id="${md.ID_MEDICO}">Excluir</button>
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




carregarEspecialidadesNoSelect();
carregarStatusNoSelect();
carregarMedicos();
carregarConvenios();
carregarStatusConvenio();
AgendaPeriodo();
carregarAgendamentos();
carregarMedicosDisponiveis();