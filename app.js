const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Você não deveria estar aqui");
})

app.post('/incricaowebdev', (req, res) => {
    const corpoRequisicao = req.body;
    const htmlObject = new JSDOM(corpoRequisicao);
    let conteudo = htmlObject.window.document.querySelector("#estilo");
    if(conteudo) {
        conteudo = conteudo.textContent;
    } else {
        conteudo = "Ruim";
    }
    res.send(`${conteudo}, ${typeof(corpoRequisicao)}`);
});

app.post('/inscricao', (req, res) => {    

    //Retorna o conteúdo de texto presente numa tag com determinada ID do DOM
    const returnItemByID = (htmlId, objectHtml) => {
        let selectorOfId = objectHtml.window.document.querySelector(htmlId);
        if(!selectorOfId) return "-";
        return selectorOfId.textContent;
    };

    //Transforma o texto de uma req.body em string
    /*const transformReqBodyIntoString = (bodyRequest) => {
        let textString = '';
        for (let i = 0; bodyRequest[i] != "*"; i++) {
            if(bodyRequest[i] != "\"" && bodyRequest[i] !== "\n" && bodyRequest[i] !== "\r") textString = textString + bodyRequest[i];
            if(bodyRequest[i] == "\"") textString = textString + "##";
        }
        return textString;
    }*/

    const transformReqBodyIntoString = (bodyRequest) => {
        let textString = bodyRequest;
        textString = textString.replace(/\\/g, '');
        textString = textString.replace(/\n/g, '');
        textString = textString.replace(/\r/g, '');
        textString = textString.replace(/"/g, '##');
        return textString;
    }

    //Lista todas as IDs de uma req.body
    const listAllIds = (textoRequest) => {
        let allDivIds = [];
        let initialPos = 0;
        let finalPos = 0;
        while(initialPos != -1 && finalPos != -1) {

            initialPos = textoRequest.indexOf("id=#", finalPos);
            finalPos = textoRequest.indexOf("##", initialPos + 4);
            allDivIds[allDivIds.length] = textoRequest.substring(initialPos + 4, finalPos)
            initialPos = textoRequest.indexOf("id=#", finalPos);

        }
        return allDivIds;

    }

    //Converte o nome de uma string para camelcase
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
    const returnJSONFromHtml = (allIdsList, htmlObject) => {

        const formatedHtml = {};   
        for(let i = 0; i  < allIdsList.length; i++) {
            formatedHtml[parseIdNameToCamelCase(allIdsList[i].substring(1, allIdsList[i].length))] = returnItemByID(allIdsList[i], htmlObject);
        }    
        return formatedHtml;
    };

    const htmlJsdomObject = new JSDOM(req.body);    
    const textoReq = transformReqBodyIntoString(req.body);
    const listIds = listAllIds(textoReq);
    const reqResult = returnJSONFromHtml(listIds, htmlJsdomObject);
    res.send(reqResult);

});

app.listen(80, () => {
});