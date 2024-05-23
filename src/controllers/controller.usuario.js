
const listarUsuario = (req, res) => {
    res.send('select2');
}

const inserirUsuario = (req, res) => {
    res.send('insert');
}

const editarUsuario = (req, res) => { 
    res.send('edit');
}

const deletarUsuario = (req, res) => {
    res.send('delete');
}

export default { listarUsuario, inserirUsuario, editarUsuario, deletarUsuario };