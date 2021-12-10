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
  // console.log(getComputedStyle(itemClicado).backgroundColor)
}