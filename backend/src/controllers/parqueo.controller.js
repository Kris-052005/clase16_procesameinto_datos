export function calcularCobro (req, res) {
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

}