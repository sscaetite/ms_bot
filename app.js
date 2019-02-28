const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded({ extended: false }));

const sinalDeMasVindas = new JSDOM('<h2>Você não deveria estar aqui!</h2><br><h3>Volte para o site da <a href="http://habits.usp.br">Habits</a></h3>');

app.get('/', (req, res) => {
    res.send(sinalDeMasVindas);
})

app.get('/inscricao/desafio-de-impacto/2019_2', (req, res) => {
        
    const htmlObject = new JSDOM(req.body);

    //Retorna o conteúdo de texto presente numa tag com determinada ID do DOM
    const returnItemByID = (htmlId) => {
        return htmlObject.window.document.querySelector(htmlId).textContent;
    };

    /*const listarIDs = () => {

        // return htmlObject.window.document.querySelectorAll('*[id]').textContent;
        //return htmlObject.window.document.querySelectorAll('div');
        //return htmlObject.window.document.querySelector('div');
    }

    const listaID = listarIDs();*/

    //Converte um documento HTML em um objeto JSON
    const returnJSONFromHtml = () => {     

        const formatedHtml = {};

        formatedHtml.nomePrimeiroParticipante = returnItemByID("#nome-primeiro-participante");
        formatedHtml.emailPrimeiroParticipante = returnItemByID("#email-primeiro-participante");
        formatedHtml.telefonePrimeiroParticipante = returnItemByID("#telefone-primeiro-participante");
        formatedHtml.redesPrimeiroParticipante = returnItemByID("#redes-primeiro-participante");
        formatedHtml.tipoPrimeiroParticipante = returnItemByID("#tipo-primeiro-participante");
        formatedHtml.estudoPrimeiroParticipante = returnItemByID("#estudo-primeiro-participante");
        formatedHtml.escolaPrimeiroParticipante = returnItemByID("#escola-primeiro-participante");
        formatedHtml.cursoPrimeiroParticipante = returnItemByID("#curso-primeiro-participante");

        formatedHtml.cursoPrimeiroParticipante = returnItemByID("#tipo-inscricao")

        formatedHtml.nomeSegundoParticipante = returnItemByID("#nome-segundo-participante");
        formatedHtml.emailSegundoParticipante = returnItemByID("#email-segundo-participante");
        formatedHtml.telefoneSegundoParticipante = returnItemByID("#telefone-segundo-participante");
        formatedHtml.redesSegundoParticipante = returnItemByID("#redes-segundo-participante");
        formatedHtml.tipoSegundoParticipante = returnItemByID("#tipo-segundo-participante");
        formatedHtml.estudoSegundoParticipante = returnItemByID("#estudo-segundo-participante");
        formatedHtml.escolaSegundoParticipante = returnItemByID("#escola-segundo-participante");
        formatedHtml.cursoSegundoParticipante = returnItemByID("#curso-segundo-participante");

        formatedHtml.nomeTerceiroParticipante = returnItemByID("#nome-terceiro-participante");
        formatedHtml.emailTerceiroParticipante = returnItemByID("#email-terceiro-participante");
        formatedHtml.telefoneTerceiroParticipante = returnItemByID("#telefone-terceiro-participante");
        formatedHtml.redesTerceiroParticipante = returnItemByID("#redes-terceiro-participante");
        formatedHtml.tipoTerceiroParticipante = returnItemByID("#tipo-terceiro-participante");
        formatedHtml.estudoTerceiroParticipante = returnItemByID("#estudo-terceiro-participante");
        formatedHtml.escolaTerceiroParticipante = returnItemByID("#escola-terceiro-participante");
        formatedHtml.cursoTerceiroParticipante = returnItemByID("#curso-terceiro-participante");

        formatedHtml.nomeQuartoParticipante = returnItemByID("#nome-quarto-participante");
        formatedHtml.emailQuartoParticipante = returnItemByID("#email-quarto-participante");
        formatedHtml.telefoneQuartoParticipante = returnItemByID("#telefone-quarto-participante");
        formatedHtml.redesQuartoParticipante = returnItemByID("#redes-quarto-participante");
        formatedHtml.tipoQuartoParticipante = returnItemByID("#tipo-quarto-participante");
        formatedHtml.estudoQuartoParticipante = returnItemByID("#estudo-quarto-participante");
        formatedHtml.escolaQuartoParticipante = returnItemByID("#escola-quarto-participante");
        formatedHtml.cursoQuartoParticipante = returnItemByID("#curso-quarto-participante");

        formatedHtml.nomeQuintoParticipante = returnItemByID("#nome-quinto-participante");
        formatedHtml.emailQuintoParticipante = returnItemByID("#email-quinto-participante");
        formatedHtml.telefoneQuintoParticipante = returnItemByID("#telefone-quinto-participante");
        formatedHtml.redesQuintoParticipante = returnItemByID("#redes-quinto-participante");
        formatedHtml.tipoQuintoParticipante = returnItemByID("#tipo-quinto-participante");
        formatedHtml.estudoQuintoParticipante = returnItemByID("#estudo-quinto-participante");
        formatedHtml.escolaQuintoParticipante = returnItemByID("#escola-quinto-participante");
        formatedHtml.cursoQuintoParticipante = returnItemByID("#curso-quinto-participante");

        formatedHtml.nomeEquipe = returnItemByID("#nome-equipe");
        formatedHtml.motivacaoEquipe = returnItemByID("#motivacao-equipe");

        formatedHtml.comoFicouSabendo = returnItemByID("#como-ficou-sabendo");
        formatedHtml.recomendacaoAmigo = returnItemByID("#recomendacao-amigo");
        formatedHtml.recomendacaoFacebook = returnItemByID("#recomendacao-facebook");
        formatedHtml.recomendacaoEvento = returnItemByID("#recomendacao-evento");
                
        return formatedHtml;
    };

    res.send(returnJSONFromHtml());

});

app.listen(80, () => {
    console.log("Tá funfando")
});