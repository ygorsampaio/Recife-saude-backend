// server.js
//
// Backend simples feito com Express.
// Guarda, em um arquivo dados.json, a relação entre a localização do
// usuário e a unidade de saúde que ele consultou no app.
//
// Rotas:
//   POST /checkins  -> salva um novo registro
//   GET  /checkins  -> lista todos os registros salvos

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const ARQUIVO = "./dados.json";

// Lê o "banco de dados" (arquivo json). Se ainda não existir, retorna lista vazia.
function lerCheckins() {
  if (!fs.existsSync(ARQUIVO)) {
    return [];
  }
  const conteudo = fs.readFileSync(ARQUIVO, "utf-8");
  return JSON.parse(conteudo);
}

// Salva a lista inteira de volta no arquivo
function salvarCheckins(lista) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(lista, null, 2));
}

// Rota de teste, só para saber se o servidor está no ar
app.get("/", (req, res) => {
  res.send("Backend do app Recife Saúde está rodando!");
});

// POST /checkins -> cria um novo check-in
app.post("/checkins", (req, res) => {
  const {
    unidadeNome,
    bairro,
    unidadeLatitude,
    unidadeLongitude,
    userLatitude,
    userLongitude,
  } = req.body;

  // validação simples dos campos obrigatórios
  if (!unidadeNome || userLatitude == null || userLongitude == null) {
    return res.status(400).json({ erro: "Faltam dados obrigatórios" });
  }

  const checkins = lerCheckins();

  const novoCheckin = {
    id: Date.now(), // usar a data/hora como id é simples e já garante que é único
    unidadeNome,
    bairro: bairro || "",
    unidadeLatitude,
    unidadeLongitude,
    userLatitude,
    userLongitude,
    data: new Date().toISOString(),
  };

  checkins.push(novoCheckin);
  salvarCheckins(checkins);

  res.status(201).json(novoCheckin);
});

// GET /checkins -> lista todos os check-ins, mais recente primeiro
app.get("/checkins", (req, res) => {
  const checkins = lerCheckins();
  res.json(checkins.reverse());
});

const PORTA = 3000;
app.listen(PORTA, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
