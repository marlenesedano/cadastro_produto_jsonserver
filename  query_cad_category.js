function getObject(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function createLine(categoria) {
  let line = document.createElement("tr");
  line.setAttribute("id", "categoria_" + categoria.id);

  let tdId = document.createElement("td");
  let tdNome = document.createElement("td");
  let tdExcluir = document.createElement("td");
  let btnExcluir = document.createElement("button");

  tdId.innerHTML = categoria.id;
  tdNome.innerHTML = categoria.nome;

  btnExcluir.innerHTML = "Excluir";
  tdExcluir.appendChild(btnExcluir);

  btnExcluir.addEventListener("click", () => {
    deleteObject(categoria.id);
    document.querySelector(`#categoria_${categoria.id}`).remove();
  });

  line.appendChild(tdId);
  line.appendChild(tdNome);
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
  category = getObject("http://localhost:3000/categoria");
  category = JSON.parse(category);
  let table = document.getElementById("table");

  category.forEach((element) => {
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

function deleteObject(categoria_id) {
  url = "http://localhost:3000/categoria/" + categoria_id;
  // console.log(url);
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
  url = "http://localhost:3000/categoria";

  const nome = document.querySelector(".name").value;

  body = {
    nome: nome,
  };

  getPost(url, body);
}

document.getElementById("send").addEventListener("click", () => {
  registerObject();
  window.location.reload();
});
