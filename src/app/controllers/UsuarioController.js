import UsuarioRepository from '../repositories/UsuarioRepository.js';

class UsuarioController {

    async showAll(req, res) {
        const row = await UsuarioRepository.findAll();
        res.json(row);
    }
    
    async show(req, res) {
        const id = req.params.id;
        const row = await UsuarioRepository.findById(id);
        res.json(row);
    }

    async store(req, res) {
        const usuario = req.body;
        const row = await UsuarioRepository.create(usuario);
        res.json(row);
    }

    async update(req, res) {
        const usuario = req.body;
        const id = req.params.id;
        const row = await UsuarioRepository.update(usuario, id);
        res.json(row);
    }

    async delete(req, res) {
        const id = req.params.id;
        const row = await UsuarioRepository.delete(id);
        res.json(row);
    }

}

export default new UsuarioController()