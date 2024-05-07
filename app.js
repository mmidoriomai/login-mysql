const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2')
require('dotenv').config();

const app = express();
const port = process.env.PORT;

//Configura a conexão com o Banco de Dados
//Não esqueça de criar seu arquivo .env
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

//Conectando ao Banco de Dados
db.connect((error) => {
  if(error){
    console.error('Erro ao conectar ao MySQL:', error)
  }else{
    console.log("Conectado ao MySQL!")
  }
});

app.use(bodyParser.urlencoded({ extended: true }));

// Rota para processar o login 
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT password FROM user WHERE username = ?', [username], (error, results) => {
    if(error){
      res.status(500).send('Erro ao obter usuários')
    } else {
      if(results.length > 0){ // Verifica se há resultados
        const user = results[0]; // Obtém o primeiro resultado
        if(user.password === password){
           res.send(`Login bem-sucedido! Bem-vindo, ${username}.`);
        } else {
          res.status(401).send('Credenciais inválidas. Tente novamente.');
        }
      } else {
        res.status(401).send('Este usuário não existe');
      }
    }
  })
});

//Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
