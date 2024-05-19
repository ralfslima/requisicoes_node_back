// Importar módulo express
const express = require('express');

// CORS
var cors = require('cors')

// App
const app = express();

// Habilitar CORS
app.use(cors());

// Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Vetor JSON
let vetor = [
    {"codigo":1, "nome":"Ralf", "idade":34},
    {"codigo":2, "nome":"Isabella", "idade":21},
    {"codigo":3, "nome":"Carla", "idade":37}
];

// Rota para listar os dados do vetor
app.get('/', function(req, res){
    return res.json(vetor);
});

// Rota para cadastrar dados no vetor
app.post('/', function(req, res){

    // Quando cadastrar, enviar um objeto: {"nome":"Lucas", "idade":19}

    // Obter o código da última pessoa no vetor
    let codigo = vetor[vetor.length-1].codigo;

    // Incrementar código
    codigo++;

    // Criar objeto pessoa
    let pessoa = {
        "codigo":codigo,
        "nome":req.body.nome,
        "idade":req.body.idade
    }

    // Cadastrar no vetor
    vetor.push(pessoa);

    // Retorno
    return res.json(pessoa);

});

// Servidor
app.listen(8080);