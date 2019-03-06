const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded({ extended: false }));


//Retorna o conteúdo de texto presente numa tag com determinada ID do DOM
const returnItemByID = (htmlId, objectHtml) => {
    const selector = objectHtml.window.document.querySelector(htmlId);
    if(!selector) return "-";
    return selector.textContent;
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

app.get('/', (req, res) => {
    res.send("Você não deveria estar aqui");
})

app.post('/inscricao', (req, res) => {    

    const htmlJsdomObject = new JSDOM(req.body);
    
    const textoReq = transformReqBodyIntoString(req.body);

    //const listIds = listAllIds(textoReq)
    const listIds = [ '#nome-programa',
  '#nome-primeiro-participante',
  '#cpf-primeiro-participante',
  '#email-primeiro-participante',
  '#telefone-primeiro-participante',
  '#redes-primeiro-participante',
  '#tipo-primeiro-participante',
  '#estudo-primeiro-participante',
  '#escola-primeiro-participante',
  '#curso-primeiro-participante',
  '#tipo-inscricao',
  '#nome-segundo-participante',
  '#cpf-segundo-participante',
  '#email-segundo-participante',
  '#telefone-segundo-participante',
  '#redes-segundo-participante',
  '#tipo-segundo-participante',
  '#estudo-segundo-participante',
  '#escola-segundo-participante',
  '#curso-segundo-participante',
  '#nome-terceiro-participante',
  '#cpf-terceiro-participante',
  '#email-terceiro-participante',
  '#telefone-terceiro-participante',
  '#redes-terceiro-participante',
  '#tipo-terceiro-participante',
  '#estudo-terceiro-participante',
  '#escola-terceiro-participante',
  '#curso-teceiro-participante',
  '#nome-quarto-participante',
  '#cpf-quarto-participante',
  '#email-quarto-participante',
  '#telefone-quarto-participante',
  '#redes-quarto-participante',
  '#tipo-quarto-participante',
  '#estudo-quarto-participante',
  '#escola-quarto-participante',
  '#curso-quarto-participante',
  '#nome-quinto-participante',
  '#cpf-quinto-participante',
  '#email-quinto-participante',
  '#telefone-quinto-participante',
  '#redes-quinto-participante',
  '#tipo-quinto-participante',
  '#estudo-quinto-participante',
  '#escola-quinto-participante',
  '#curso-quinto-participante',
  '#nome-equipe',
  '#motivacao-equipe',
  '#como-ficou-sabendo',
  '#recomendacao-amigo',
  '#recomendacao-facebook',
  '#recomendacao-evento' ]

    res.send(returnJSONFromHtml(listIds, htmlJsdomObject));

    console.log(listIds)

});

app.listen(80, () => {
    console.log("Tá funfando")
});
