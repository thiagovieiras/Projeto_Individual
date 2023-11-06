import express from 'express';
import UsuarioController from './src/app/controllers/UsuarioController.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const app = express();

// indicar para o express ler body com json
app.use(express.json());

// retornar o objeto por id
function buscarSelecaoPorId(id) {
    return cadastro_usuarios.filter( selecao => selecao.id == id)
}

// pegar a posicao ou index do elemento no array por id
function buscarIndexSelecao(id) {
    return cadastro_usuarios.findIndex ( selecao => selecao.id == id)
}

// app.use(express.static(path.join(__dirname, "public")))

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// dirname(fileURLToPath(import.meta.url));

// criar rota padrão ou raiz
// '/' serve para indicar que a porta é a raiz
app.get('/', function(req, res) {
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
});

app.get('/selecoes', UsuarioController.showAll);
app.get('/selecoes/:id', UsuarioController.show);
app.post('/selecoes', UsuarioController.store);
app.put('/selecoes/:id', UsuarioController.update);
app.delete('/selecoes/:id', UsuarioController.delete);

export default app

// Curso de Node JS Professor Edson Maia
