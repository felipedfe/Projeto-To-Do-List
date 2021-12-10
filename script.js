// Botão que adiciona à lista
let botaoAdcionar = document.getElementById("criar-tarefa");
botaoAdcionar.addEventListener("click", adicionaTarefa);

// Função que guarda um input, cria uma "li" e anexa na lista de tarefas
function adicionaTarefa() {
  let input = document.getElementById("texto-tarefa");
  let novaTarefa = document.createElement("li");
  let listaTarefas = document.getElementById("lista-tarefas");
  novaTarefa.innerText = input.value;
  listaTarefas.appendChild(novaTarefa);
  input.value = "";
}

