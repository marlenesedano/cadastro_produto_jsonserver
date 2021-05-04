function getObject(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function getPost(url, body) {
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(body)); // transformou em objeto

  request.onload = function () {
    console.log(this.responseText);
  };

  return request;
}

function registerObject(url) {
  event.preventDefault();
  url = "http://localhost:3000/produtos";

  const nome = document.querySelector(".name").value;
  const marca = document.querySelector(".brand").value;
  const preco = document.querySelector(".price").value;
  const categoria = document.querySelector(".category").value;

  body = {
    nome: nome,
    marca: marca,
    preco: preco,
    categoria: categoria,
  };

  getPost(url, body);
}

document.getElementById("send").addEventListener("click", () => {
  registerObject();
  location.reload();
});
// ---------Select com Categoria ----------

function getObjectCategoria(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function printCategoria() {
  let categories = getObjectCategoria("http://localhost:3000/categoria");
  categories = JSON.parse(categories);
  let select = document.getElementById("category");

  categories.forEach((category, index) => {
    let option = document.createElement("option");
    option.text = category.nome;
    select.add(option, select[index]);
  });
}

printCategoria();

function getPostCategoria(url, body) {
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(body)); // transformou em objeto

  request.onload = function () {
    console.log(this.responseText);
  };

  return request;
}

document.getElementById("send").addEventListener("click", () => {
  registerObject();
});
