let listaBackup = [];

const lista = document.getElementById('lista-tarefas');

if (localStorage.tarefa !== undefined) {
  if (localStorage.tarefa.length > 0) {
    listaBackup = JSON.parse(localStorage.tarefa);
    for (let i = 0; i < listaBackup.length; i += 1) {
      const tarefa = document.createElement('li');
      tarefa.innerText = listaBackup[i].texto;
      if (listaBackup[i].classe === 'completed') {
        tarefa.classList.add(listaBackup[i].classe);
      }
      tarefa.addEventListener('click', selecionaTarefa);
      tarefa.addEventListener('dblclick', riscaItem);
      lista.appendChild(tarefa);
    }
  }
}

// Botão que adiciona à lista
const botaoAdcionar = document.getElementById('criar-tarefa');
botaoAdcionar.addEventListener('click', adicionaTarefa);

// Função que guarda um input, cria uma "li" e anexa na lista de tarefas
function adicionaTarefa() {
  const input = document.getElementById('texto-tarefa');
  const novaTarefa = document.createElement('li');
  const listaTarefas = document.getElementById('lista-tarefas');
  novaTarefa.innerText = input.value;
  novaTarefa.addEventListener('click', selecionaTarefa); // já adiciona a função pra mudar cor
  novaTarefa.addEventListener('dblclick', riscaItem); // add função pra riscar item
  listaTarefas.appendChild(novaTarefa);
  input.value = '';
}

// Seleciona item da lista (muda cor do fundo)
function selecionaTarefa(evento) {
  const itemClicado = evento.target;
  const itensLista = document.getElementsByTagName('li');
  for (item of itensLista) {
    item.style.backgroundColor = ''; // aqui nesse FOR o programa apaga o style dos itens primeiro
    item.classList.remove('selecionado');
  }
  itemClicado.classList.add('selecionado');
  return itemClicado; // ?
}

// Riscando itens
function riscaItem(evento) {
  const itemClicado = evento.target;
  if (itemClicado.classList.contains('completed')) {
    itemClicado.classList.remove('completed');
  } else {
    itemClicado.classList.add('completed');
  }
}

// Apagando todos os itens
const botaoApagaTudo = document.getElementById('apaga-tudo');
botaoApagaTudo.addEventListener('click', apagaLista);

function apagaLista() {
  const listaTarefas = document.getElementById('lista-tarefas');
  const tamanhoLista = listaTarefas.children.length;
  for (let i = 0; i < tamanhoLista; i += 1) {
    listaTarefas.firstChild.remove();
  }
}

// Botão que apaga elementos riscados (completed)

const botaoApagaRiscados = document.getElementById('remover-finalizados');
botaoApagaRiscados.addEventListener('click', apagaRiscados);

function apagaRiscados() {
  const tarefas = document.getElementsByTagName('li');
  for (let i = 0; i < tarefas.length; i += 1) {
    if (tarefas[i].classList.contains('completed')) {
      tarefas[i].remove();
      i -= 1; // isso é pro loop voltar um elemento, pois quando um é removido o próximo ocupa a posição dele
    }
  }
}

// Botão para mover elemento (CIMA)

const botaoMoveParaCima = document.getElementById('mover-cima');
botaoMoveParaCima.addEventListener('click', moveCima);

function moveCima() {
  const listaTarefas = document.getElementById('lista-tarefas');
  const tarefas = document.getElementById('lista-tarefas').children;
  for (let i = 1; i < tarefas.length; i += 1) { // i = 1 porque na posição 0 o elemento não se mexe
    if (tarefas[i].classList.contains('selecionado')) {
      listaTarefas.insertBefore(tarefas[i], listaTarefas.children[i - 1]);
    }
  }
}

// Botão para mover elemento (BAIXO)

const botaoMoveParaBaixo = document.getElementById('mover-baixo');
botaoMoveParaBaixo.addEventListener('click', moveBaixo);

function moveBaixo() {
  const listaTarefas = document.getElementById('lista-tarefas');
  const tarefas = document.getElementById('lista-tarefas').children;
  for (let i = tarefas.length - 2; i > -1; i -= 1) { // i = tarefas.length - 2 porque isso corresponde ao último elemento do array - 1
    if (tarefas[i].classList.contains('selecionado')) {
      listaTarefas.insertBefore(listaTarefas.children[i + 1], tarefas[i]);
    }
  }
}

// Botão para apagar tarefa selecionada

const botaoApagaSelecionado = document.getElementById('remover-selecionado');
botaoApagaSelecionado.addEventListener('click', apagaSelecionado);

function apagaSelecionado() {
  const selecao = document.getElementById('selecionado'); // ?
  const tarefas = document.getElementById('lista-tarefas').children;
  for (tarefa of tarefas) {
    if (tarefa.classList.contains('selecionado')) {
      tarefa.remove();
    }
  }
}

// Botão para salvar lista

const botaoSalvar = document.getElementById('salvar-tarefas');
botaoSalvar.addEventListener('click', salvaLista);

function salvaLista() {
  listaBackup = [];
  let objetoTarefa = {};
  const tarefas = document.getElementById('lista-tarefas').children;
  for (let i = 0; i < tarefas.length; i += 1) {
    if (tarefas[i].classList.contains('selecionado')) {
      tarefas[i].classList.remove('selecionado'); // "selecionado" é removido para poder adicionar a classe da posicao zero logo abaixo
    }
    if (tarefas[i].classList.contains('completed')) {
      objetoTarefa.classe = tarefas[i].classList[0];
    }
    objetoTarefa.texto = tarefas[i].innerText;
    listaBackup.push(objetoTarefa);
    objetoTarefa = {};
  }
  localStorage.setItem('tarefa', JSON.stringify(listaBackup));
}
