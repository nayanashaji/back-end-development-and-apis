const { __esModule } = require("@babel/generator");

function getUpperCase(line){
    return line.toUpperCase();
}

function getLowerCase(line){
    return line.toLowerCase();
}

function getSentenceCase(line){
    let last_end=getLowerCase(line.slice(1,line.length))
    let first_letter=getUpperCase(line[0])
    return first_letter+last_end
}

function getProperCase(line){
    let new_line=getUpperCase(line[0])
    for(let i=1;i<line.length;i++){
        if(line[i]==' '){
            new_line+=' '+getUpperCase(line[++i])
        }
        else{
            new_line+=getLowerCase(line[i])
        }
    }
    return new_line
}

module.exports={
    getUpperCase,
    getLowerCase,
    getSentenceCase,
    getProperCase
}