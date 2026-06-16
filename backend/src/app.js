import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";

dotenv.config();


const NAME=process.env.SERVER_NAME;
const VERSION=process.env.SERVER_VERSION;
const DESCRIPTION=process.env.SERVER_DESCRIPTION;
const PORT=process.env.SERVER_PORT;



const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    name: NAME,
    version: VERSION,
    description: DESCRIPTION,
    port: PORT
  });
});

app.post("api/parqueo/calcular", (req, res) => {
    const { placa, tipo, horas, minutos}= req.body; // se desarma el obejto en 4 variables, todos los datos son obligarios
    if (!placa ||placa.trim() === "") {
        res.status(400).json({error: "La placa es obligatoria"});
    }
    if (!tipo || (tipo!=="carro" && tipo!=="moto")){
        res.status(400).json({error: "El tipo de vehiculo es obligatorio"});
        
    }
    if (Number.isNaN(horas) || horas < 0){
        res.status(400).json({error: "Las horas son obligatorias"});
    }
    if (Number.isNaN(minutos) || minutos < 0 || minutos > 59){
        res.status(400).json({error: "Los minutos son obligatorios"});
    }
    const tarifa= tipo === "carro"? 1200 : 500; 

    let h=Number(horas);
    let m=Number(minutos);

    if (m> 5)h++; 
    const total= h*tarifa;
     
    res.json({
        placa: placa, 
        tipo: tipo,
        horas: h,
        tarifa: tarifa,
        tiempoUso: horas +":" + minutos ,
        horasCobradas: h,
        total

});
});



app.listen(4000, () => {
  console.log(`${NAME} Corriendo en el puerto ${PORT}`);
});

