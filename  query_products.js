function getObject(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function createLine(produtos) {
  let line = document.createElement("tr");
  line.setAttribute("id", "produto_" + produtos.id);

  let tdId = document.createElement("td");
  let tdNome = document.createElement("td");
  let tdMarca = document.createElement("td");
  let tdExcluir = document.createElement("td");
  let btnExcluir = document.createElement("button");

  tdId.innerHTML = produtos.id;
  tdNome.innerHTML = produtos.nome;
  tdMarca.innerHTML = produtos.marca;

  btnExcluir.innerHTML = "Excluir";
  tdExcluir.appendChild(btnExcluir);

  btnExcluir.addEventListener("click", () => {
    deleteObject(produtos.id);
    document.querySelector(`#produto_${produtos.id}`).remove();
  });

  line.appendChild(tdId);
  line.appendChild(tdNome);
  line.appendChild(tdMarca);
  line.appendChild(tdExcluir);

  return line;
}

function search() {
  let input;
  let filter;
  let table;
  let tr;
  let td;
  let i;
  let txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function print() {
  product = getObject("http://localhost:3000/produtos");
  product = JSON.parse(product);
  let table = document.getElementById("table");

  product.forEach((element) => {
    let line = createLine(element);
    table.appendChild(line);
  });
}

print();

function getDelete(url) {
  let request = new XMLHttpRequest();
  request.open("DELETE", url, true);
  request.setRequestHeader("Content-type", "application/json");
  try {
    request.send(); // transformou em objeto
  } catch (error) {
    console.log();
    throw error;
  }

  request.onload = function () {
    console.log(this.responseText);
  };

  return request;
}

function deleteObject(produto_id) {
  url = "http://localhost:3000/produtos/" + produto_id;
  getDelete(url);
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
