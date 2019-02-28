const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded({ extended: false }));

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

        formatedHtml.nome = returnItemByID("#nome");
        formatedHtml.email = returnItemByID("#email");
        formatedHtml.whatsapp = returnItemByID("#whatsapp");
                
        return formatedHtml;
    };

    res.send(returnJSONFromHtml());

});

app.listen(3000, () => {
});