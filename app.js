const express = require('express');

const app = express();
const port = 3000;

let clientes = [
    {nombre: 'Movistar', id: 'A12345678', direccion: 'MDO DMA 122', localidad: 'montevideo'},
    {nombre: 'Antel', id: 'X1221358', direccion: 'XCV QWE 333', localidad: 'canelones'},
    {nombre: 'UTE', id: 'B63634', direccion: 'OIK MGQ 212', localidad: 'san jose'},
]

app.use(express.json()); //toda la informacion del body la parsea a json
app.use(express.urlencoded({extended: true}));

//peticion con get
app.get('/',(req, res) => {
    res.status(200).send(clientes);
})

app.get('/:id', (req, res) =>{ //Se hace una peticion a la api y se busca por id
    console.log(req.params.id); //con .params se accede a todos los parametros de la ruta o api
    let cliente = clientes.find(elem =>{
            return elem.id === req.params.id;
        })
        if(cliente === undefined){ //si no hay ninguno...
            return res.status(404).json({
                mensaje: 'No se encontro ningun mensaje con ese id'
            });
        }
        res.status(200).json({
            cliente: cliente
        });
        
    })

    //Metodo post para actualizar los datos de la api
    app.post('/', (req, res) => {
        if(req.body === undefined){
            return res.status(400).json({
                mensaje: 'Datos de clientes obligatorios'
            })
        }
        clientes.push(req.body);
        res.status(201).json({
            mensaje: 'El cliente ha sido registrado correctamente'
        });
        console.log(clientes);
    })

    app.put('/:id', (req, res) => {
        if(req.body === undefined){
            return res.status(400).json({
                mensaje: 'Datos de clientes a actualizar son obligatorios'
            })
        }
        if(req.params.id === undefined){
            return res.status(400).json({
                mensaje: 'El id del cliente a actualizar es obligatorios'
            })
        }
        const posicion = clientes.findIndex(elem => {
            return elem.id === req.params.id;
        })
        if(posicion < 0){
            return res.status(400).json({
                mensaje: 'Cliente no encontrado'
            })
        }
        if(req.body.nombre !== undefined){
            clientes[posicion].nombre = req.body;
        }
        if(req.body.direccion !== undefined){
            clientes[posicion].direccion = req.body;
        }
        if(req.body.localidad !== undefined){
            clientes[posicion].localidad = req.body;
        }
        res.status(201).json({
            mensaje: 'El cliente ha sido actualizado correctamente'
        })
        //console.log(clientes);
    })

    app.delete('/:id', (req, res) =>{
        if(req.params.id === undefined){
            return res.status(400).json({
                mensaje: 'El id del cliente a actualizar es obligatorios'
            })
        }
        const posicion = clientes.findIndex(elem => {
            return elem.id === req.params.id;
        })
        if(posicion < 0){
            return res.status(400).json({
                mensaje: 'Cliente no encontrado'
            })
        }
        clientes.splice(posicion, 1);
        res.status(200).json({
            mensaje: 'El cliente ha sido eliminado correctamente'
        })
        //console.log(clientes);
    })

    app.delete('/:cif', (req, res)=>{
        if(req.params.id === undefined){
            return res.status(400).json({
                mensaje: 'El id del cliente a actualizar es obligatorios'
            })
        }

        const posicion = clientes.findIndex(elem => {
            return elem.id === req.params.id;
        })
        if(posicion < 0){
            return res.status(400).json({
                mensaje: 'Cliente no encontrado'
            })
        }

        clientes.splice(posicion, 1);
        res.status(200); //status ok
        mensaje: 'El cliente ha sido eliminado correctamente';

    })
    console.log(clientes);

app.listen(port, () =>{
    console.log(`Servidor escuchando en http://localhost:${port}`);
})

