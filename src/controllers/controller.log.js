
const listarLog = (req, res) => {
    res.send('select');
}

const inserirLog = (req, res) => {
    res.send('insert');
}

//const editarLog = (req, res) => { 
 //   res.send('edit');//
//}

//const deletarLog = (req, res) => {
 //   res.send('delete');
//}

export default { listarLog, inserirLog };