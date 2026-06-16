import express from "express";
const app = express(); 
app.get("/", (req, res) => {
    res.send("<h1>Funcionando</h1>");
});
app.listen(4000, () => {
    console.log("Servidor corriendo");
});