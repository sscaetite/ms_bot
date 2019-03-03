const parseIdNameToCamelCase = (nomeId) => {
    
    nomeId = nomeId.toString();
    for(let i = 0; i < nomeId.lenght; i++) {
        if(nomeId[i] == "-") {
            nomeId = nomeId.substr(0,i) + nomeId.charAt(i+1).toUpperCase() + nomeId.substr(i+2);
            i = i - 1;
        }
        console.log(nomeId);
    };

    
}