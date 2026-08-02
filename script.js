//JOueurs
let joeur = {
    nom: "Ottis",
    symbole: "O",
    score: 10
};
let cpu = {
    nom: "CPU",
    symbole: "X",
    score: 0
};

let partieTerminee = false;
let auJOueurDeJouer = true;

const cases = document.getElementsByClassName("case");

const combinaisonGagnates = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
;


function remplirCase(caseIndex, symbole) {
    caseIndex.textContent = symbole;
    caseIndex.classList.add("coche");
}
function nombreCasesRemplies(){
    let compteur = 0;
    for(let i = 0; i<cases.length; i++){
        if(cases[i].classList.contains("coche")){
            compteur++;
        }
    }
    return compteur;
}


function afficherScore(){
    let scoreJoueur = document.querySelector('.score-you');
    let scoreCpu = document.querySelector('.score-cpu');

    scoreJoueur.textContent = joeur.score;
    scoreCpu.textContent = cpu.score;
}


function quigagne(joueurATester) {
    for(let i=0; i< combinaisonGagnates.length; i++){
        let a=combinaisonGagnates[i][0];
        let b=combinaisonGagnates[i][1];
        let c=combinaisonGagnates[i][2];
    }

    if(
        cases[a].textContent === joueurATester.symbole &&
        cases[b].textContent === joueurATester.symbole &&
        cases[c].textContent === joueurATester.symbole
    ){
        cases[a].style.color= "green";
        cases[b].style.color= "green";
        cases[c].style.color= "green";
        return true;
    }
    return false;
}

function finDePartie(gagnant) {
    partieTerminee = true;
    gagnant.score++;
    afficherScore();
}

function matchNul() {
    partieTerminee = true;
    afficherScore();
}

function jouerCase(id){
    let caseCliquee = document.getElementById(id);

    if(partieTerminee || !auJoueurDeJouer || caseCliquee.classList.contains("coche")){
        return;
    }
}
remplirCase(caseCliquee, joueur, symbole);
if(quigagne(joueur)) {
    finDePartie(joueur);
    return;
}