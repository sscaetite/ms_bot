
/*module.exports = (nomeId) => {
    
    if(nomeId) nomeId = nomeId.toString();
    else nomeId = "";

    for(let i = 0; i < nomeId.length; i++) {
        if(nomeId[i] == "-") {
            nomeId = nomeId.substr(1,i) + nomeId.charAt(i+1).toUpperCase() + nomeId.substr(i+2);
            i = i - 1;
        }
    };

    return nomeId;
};*/