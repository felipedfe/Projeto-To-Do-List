// Botão que adiciona à lista
let botaoAdcionar = document.getElementById("criar-tarefa");
botaoAdcionar.addEventListener("click", adicionaTarefa);

// Função que guarda um input, cria uma "li" e anexa na lista de tarefas
function adicionaTarefa() {
  let input = document.getElementById("texto-tarefa");
  let novaTarefa = document.createElement("li");
  let listaTarefas = document.getElementById("lista-tarefas");
  novaTarefa.innerText = input.value;
  novaTarefa.addEventListener("click", mudaCor);      // já adiciona a função pra mudar cor
  novaTarefa.addEventListener("dblclick", riscaItem);  // add função pra riscar item
  listaTarefas.appendChild(novaTarefa);
  input.value = "";
}

// Mudando a cor de item da lista
function mudaCor(evento) {
  let itemClicado = evento.target;
  let itensLista = document.getElementsByTagName("li");
  for (item of itensLista) {
    item.style.backgroundColor = "";          // aqui nesse FOR o programa apaga o style dos itens primeiro
  }
  itemClicado.style.backgroundColor = "rgb(128,128,128)";
}

// Riscando itens
function riscaItem(evento) {
  let itemClicado = evento.target;
  if (itemClicado.className === "completed") {
    itemClicado.className = "";
  }else {
    itemClicado.className = "completed";
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
    if (tarefas[i].className === "completed") {
      console.log("oi")
      tarefas[i].remove();
      i -= 1                // isso é pro loop voltar um elemento, pois quando um é removido o próximo ocupa a posição dele
    }
  }
}