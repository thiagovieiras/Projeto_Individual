import { consulta } from '../database/conexao.js'

class UsuarioRepository {

    create(usuario) {
        // cadastro_usuarios.push(req.body);
        // res.status(201).send('Usuário cadastrado com sucesso!');
        // const usuario = req.body;
        // const sql = "INSERT INTO cadastro_usuarios SET ?;"
        // conexao.query(sql, usuario, (erro, resultado) => {
        //     if (erro) res.status(404).json({ 'erro': erro});
        //     else res.status(201).json(resultado);
        // })
        const sql = "INSERT INTO cadastro_usuarios SET ?;";
        return consulta(sql, usuario, 'Não foi possível criar');
    }

    findAll() {
        // res.status(200).send(selecoes);
        // const sql = "SELECT * FROM cadastro_usuarios;"
        // conexao.query(sql, (erro, resultado) => {
        //     if (erro) res.status(404).json({ 'erro': erro});
        //     else res.status(200).json(resultado);
        //     console.log(erro, resultado)
        // })
        const sql = "SELECT * FROM cadastro_usuarios;";
        return consulta(sql, 'Não foi possível encontrar');
    }

    findById(id) {
        // let index = req.params.id
        // res.json(buscarSelecaoPorId(req.params.id));
        // const id = req.params.id;
        // const sql = "SELECT * FROM cadastro_usuarios WHERE id=?;"
        // conexao.query(sql, id, (erro, resultado) => {
        //     const linha = resultado[0];
        //     if (erro) res.status(404).json({ 'erro': erro});
        //     else res.status(200).json(linha);
        // })
        const sql = "SELECT * FROM cadastro_usuarios WHERE id=?;";
        return consulta(sql, id, 'Não foi possível encontrar');
    }

    update(usuario, id) {
        // let index = buscarIndexSelecao(req.params.id);
        // cadastro_usuarios[index].nome  = req.body.nome;
        // cadastro_usuarios[index].email = req.body.email;
        // res.json(cadastro_usuarios);
        // const id = req.params.id;
        // const usuario = req.body;
        // const sql = "UPDATE cadastro_usuarios SET ? WHERE id=?;"
        // conexao.query(sql, [usuario, id], (erro, resultado) => {
        //     if (erro) res.status(404).json({ 'erro': erro});
        //     else res.status(200).json(resultado);
        // })
        const sql = "UPDATE cadastro_usuarios SET ? WHERE id=?;";
        return consulta(sql, [usuario, id], 'Não foi possível atualizar');
    }

    delete(id) {
        // let index = buscarIndexSelecao(req.params.id);
        // cadastro_usuarios.splice(index, 1);
        // res.send(`Usuário com id ${req.params.id} excluída com sucesso!`);
        // const id = req.params.id;
        // const sql = "DELETE FROM cadastro_usuarios WHERE id=?;"
        // conexao.query(sql, id, (erro, resultado) => {
        //     if (erro) res.status(404).json({ 'erro': erro});
        //     else res.status(200).json(resultado);
        // })
        const sql = "DELETE FROM cadastro_usuarios WHERE id=?;";
        return consulta(sql, id, 'Não foi possível deletar');
    }
}

export default new UsuarioRepository;
