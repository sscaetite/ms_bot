const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const port = 80;

app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Você não deveria estar aqui");
})

//Rota para o Léo hétero entrar
app.get('/leosoares', (req,res) => {
    res.send("Leo, vc é um amor! E gado demais");
})

app.post('/inscricao', (req, res) => {    

    const htmlObject = new JSDOM(req.body);

    //Retorna o conteúdo de texto presente numa tag com determinada ID do DOM
    const returnItemByID = (htmlId) => {
        const selector = htmlObject.window.document.querySelector(htmlId);
        if(!selector) return "-";
        return selector.textContent;
    };

    //Transforma o texto de uma req.body em string
    const transformReqBodyIntoString = () => {
        let textString = '';
        for (let i = 0; req.body[i] != "*"; i++) {
            if(req.body[i] != "\"" && req.body[i] !== "\n" && req.body[i] !== "\r") textString = textString + req.body[i];
            if(req.body[i] == "\"") textString = textString + "##";
        }
        return textString;
    }

    const textoReq = transformReqBodyIntoString();

    const listAllIds = () => {
        let allDivIds = [];
        let initialPos = 0;
        let finalPos = 0;       
        
        while(initialPos != -1 && finalPos != -1) {

            initialPos = textoReq.indexOf("id=#", finalPos);
            finalPos = textoReq.indexOf("##", initialPos + 4);
            allDivIds[allDivIds.length] = textoReq.substring(initialPos + 4, finalPos)
            initialPos = textoReq.indexOf("id=#", finalPos);
            
        }

        return allDivIds;

    }

    const parseIdNameToCamelCase = (nomeId) => {
    
        if(nomeId) nomeId = nomeId.toString();
        else nomeId = "";
    
        for(let i = 0; i < nomeId.length; i++) {
            if(nomeId[i] == "-") {
                nomeId = nomeId.substr(0,i) + nomeId.charAt(i+1).toUpperCase() + nomeId.substr(i+2);
                i = i - 1;
            }
        };
    
        return nomeId;
    };

    //Converte um documento HTML em um objeto JSON
    const returnJSONFromHtml = () => {

        const formatedHtml = {};

        const idsDocument = listAllIds();      

        for(let i = 0; i  < idsDocument.length; i++) {
            formatedHtml[parseIdNameToCamelCase(idsDocument[i].substring(1, idsDocument[i].length))] = returnItemByID(idsDocument[i]);
        }
        
        return formatedHtml;
    };

    res.send(returnJSONFromHtml());

});

app.listen(port, () => {
    console.log("Tá funfando")
});