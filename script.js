// Botão que adiciona à lista
let botaoAdcionar = document.getElementById("criar-tarefa");
botaoAdcionar.addEventListener("click", adicionaTarefa);

// Função que guarda um input, cria uma "li" e anexa na lista de tarefas
function adicionaTarefa() {
  let input = document.getElementById("texto-tarefa");
  let novaTarefa = document.createElement("li");
  let listaTarefas = document.getElementById("lista-tarefas");
  novaTarefa.innerText = input.value;
  novaTarefa.addEventListener("click", selecionaTarefa);      // já adiciona a função pra mudar cor
  novaTarefa.addEventListener("dblclick", riscaItem);  // add função pra riscar item
  listaTarefas.appendChild(novaTarefa);
  input.value = "";
}

// Seleciona item da lista (muda cor do fundo)
function selecionaTarefa(evento) {
  let itemClicado = evento.target;
  let itensLista = document.getElementsByTagName("li");
  for (item of itensLista) {
    item.style.backgroundColor = "";          // aqui nesse FOR o programa apaga o style dos itens primeiro
    item.classList.remove("selecionado");
  }
  itemClicado.style.backgroundColor = "rgb(128,128,128)";
  itemClicado.classList.add("selecionado");
  return itemClicado;
}

// Riscando itens
function riscaItem(evento) {
  let itemClicado = evento.target;
  if (itemClicado.classList.contains("completed")) {
    itemClicado.classList.remove("completed");
  }else {
    itemClicado.classList.add("completed");
  }
}

// Apagando todos os itens
let botaoApagaTudo = document.getElementById("apaga-tudo");
botaoApagaTudo.addEventListener("click", apagaLista);

function apagaLista() {
  let listaTarefas = document.getElementById("lista-tarefas");
  let tamanhoLista = listaTarefas.children.length;
  for (let i = 0; i < tamanhoLista; i += 1){
    listaTarefas.firstChild.remove();
  }
}

// Botão que apaga elementos riscados (completed)

let botaoApagaRiscados = document.getElementById("remover-finalizados");
botaoApagaRiscados.addEventListener("click", apagaRiscados);

function apagaRiscados() {
  let tarefas = document.getElementsByTagName("li");
  for (i = 0; i < tarefas.length; i += 1) {
    if (tarefas[i].classList.contains("completed")) {
      tarefas[i].remove();
      i -= 1                // isso é pro loop voltar um elemento, pois quando um é removido o próximo ocupa a posição dele
    }
  }
}

// Botão para mover elemento (CIMA)

let botaoMoveParaCima = document.getElementById("mover-cima");
botaoMoveParaCima.addEventListener("click", moveCima);

function moveCima() {
  let listaTarefas = document.getElementById("lista-tarefas");
  let tarefas = document.getElementById("lista-tarefas").children;
  for (let i = 1; i < tarefas.length; i += 1) {         // i = 1 porque na posição 0 o elemento não se mexe
    if (tarefas[i].classList.contains("selecionado")) {
      listaTarefas.insertBefore(tarefas[i], listaTarefas.childNodes[i - 1]);
      }
    }
  }
  
  // Botão para mover elemento (BAIXO)
  
  let botaoMoveParaBaixo = document.getElementById("mover-baixo");
  botaoMoveParaBaixo.addEventListener("click", moveBaixo);

  function moveBaixo() {
    let listaTarefas = document.getElementById("lista-tarefas");
    let tarefas = document.getElementById("lista-tarefas").children;
    for (let i = tarefas.length - 2; i > -1; i -= 1) {    // i = tarefas.length - 2 porque isso corresponde ao último elemento do array - 1 
      if (tarefas[i].classList.contains("selecionado")) {
        listaTarefas.insertBefore(listaTarefas.childNodes[i + 1], tarefas[i]);
        console.log("oi")
        }
    }

  }

