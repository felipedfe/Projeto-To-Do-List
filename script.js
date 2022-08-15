const listaTarefas = document.getElementById('lista-tarefas');
const input = document.getElementById('texto-tarefa');

// BOTÕES
const botaoAdicionar = document.getElementById('criar-tarefa');
const botaoApagaTudo = document.getElementById('apaga-tudo');
const botaoApagaRiscados = document.getElementById('remover-finalizados');
const botaoMoveParaCima = document.getElementById('mover-cima');
const botaoMoveParaBaixo = document.getElementById('mover-baixo');
const botaoApagaSelecionado = document.getElementById('remover-selecionado');
const botaoSalvar = document.getElementById('salvar-tarefas');

// FUNÇÕES
function salvaLista() {
  const tarefas = document.getElementById('lista-tarefas').innerHTML;
  localStorage.setItem('tarefas', tarefas);
}

function riscaItem(evento) {
  const itemClicado = evento.target;
  if (itemClicado.classList.contains('completed')) {
    itemClicado.classList.remove('completed');
  } else {
    itemClicado.classList.add('completed');
  }
}

function apagaRiscados() {
  const tarefas = document.getElementsByTagName('li');
  for (let i = 0; i < tarefas.length; i += 1) {
    if (tarefas[i].classList.contains('completed')) {
      tarefas[i].remove();
      i -= 1; // isso é pro loop voltar um elemento, pois quando um é removido o próximo ocupa a posição dele
    }
  }
}

function apagaLista() {
  const tamanhoLista = listaTarefas.children.length;
  for (let i = 0; i < tamanhoLista; i += 1) {
    listaTarefas.firstChild.remove();
  }
}

function apagaSelecionado() {
  const tarefas = listaTarefas.children;
  for (tarefa of tarefas) {
    if (tarefa.classList.contains('selecionado')) {
      tarefa.remove();
    }
  }
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

// Função que guarda um input, cria uma "li" e anexa na lista de tarefas
function adicionaTarefa() {
  const novaTarefa = document.createElement('li');
  novaTarefa.innerText = input.value;
  novaTarefa.addEventListener('click', selecionaTarefa); // já adiciona a função pra mudar cor
  novaTarefa.addEventListener('dblclick', riscaItem); // add função pra riscar item
  listaTarefas.appendChild(novaTarefa);
  input.value = '';
}

function moveCima() {
  const tarefas = listaTarefas.children;
  for (let i = 1; i < tarefas.length; i += 1) { // i = 1 porque na posição 0 o elemento não se mexe
    if (tarefas[i].classList.contains('selecionado')) {
      listaTarefas.insertBefore(tarefas[i], listaTarefas.children[i - 1]);
    }
  }
}

function moveBaixo() {
  const tarefas = listaTarefas.children;
  for (let i = tarefas.length - 2; i > -1; i -= 1) { // i = tarefas.length - 2 porque isso corresponde ao último elemento do array - 1
    if (tarefas[i].classList.contains('selecionado')) {
      listaTarefas.insertBefore(listaTarefas.children[i + 1], tarefas[i]);
    }
  }
}

// EVENT LISTENERS
botaoAdicionar.addEventListener('click', adicionaTarefa);
botaoApagaTudo.addEventListener('click', apagaLista);
botaoApagaRiscados.addEventListener('click', apagaRiscados);
botaoMoveParaCima.addEventListener('click', moveCima);
botaoMoveParaBaixo.addEventListener('click', moveBaixo);
botaoApagaSelecionado.addEventListener('click', apagaSelecionado);
botaoSalvar.addEventListener('click', salvaLista);

// INÍCIO
listaTarefas.innerHTML = (localStorage.getItem('tarefas'));

const tarefas = document.getElementsByTagName('li');

// Adiciona os Events depois de carregar o Local Storage
for (let i = 0; i < tarefas.length; i += 1) {
  tarefas[i].addEventListener('click', selecionaTarefa);
  tarefas[i].addEventListener('dblclick', riscaItem);
}
