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

function registerObject() {
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
});
