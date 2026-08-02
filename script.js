//JOueurs
let joueur = {
    nom: "Ottis",
    symbole: "O",
    score: 0
};
let cpu = {
    nom: "CPU",
    symbole: "X",
    score: 0
};

let partieTerminee = false;
let auJoueurDeJouer = true;

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
    let scoreJoueur = document.querySelector('.you-score');
    let scoreCpu = document.querySelector('.cpu-score');

    scoreJoueur.textContent = joueur.score;
    scoreCpu.textContent = cpu.score;
}


function quigagne(joueurATester) {
    for(let i=0; i< combinaisonGagnates.length; i++){
        let a=combinaisonGagnates[i][0];
        let b=combinaisonGagnates[i][1];
        let c=combinaisonGagnates[i][2];

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

function joueurCase(id){
    let caseCliquee = document.getElementById(id);
    let Touraffiche = document.getElementById("TourAffiche");
    Touraffiche.textContent= "O";
    if(partieTerminee || !auJoueurDeJouer || caseCliquee.classList.contains("coche")){
        return;
    }
    remplirCase(caseCliquee, joueur.symbole);
    if(quigagne(joueur)) {
        finDePartie(joueur);
        return;
    }
    if(nombreCasesRemplies() === 9){
        matchNul();
        return;
    }
    auJoueurDeJouer = false;
    joueurCpu();
}

function joueurCpu(){
    let Touraffiche = document.getElementById("TourAffiche");
    Touraffiche.textContent= "X";
    let casesLibres = [];
    for(let i=0; i<cases.length; i++){
        if(!cases[i].classList.contains("coche")){
            casesLibres.push(cases[i]);
        }
    }

    let choix = Math.floor(Math.random()*casesLibres.length);

    let caseChoisie = casesLibres[choix];

    remplirCase(caseChoisie, cpu.symbole);
    if(quigagne(cpu)) {
        finDePartie(cpu);
        return;
    }
    if(nombreCasesRemplies() === 9){
        matchNul();
        return;
    }
    auJoueurDeJouer = true;
}
for(let i=0; i<cases.length; i++){
    cases[i].addEventListener("click", function(){
        joueurCase(cases[i].id);
    });
}

const boutonX = document.querySelector('.x-btn');
const boutonO = document.querySelector('.o-btn');
boutonX.addEventListener("click", function(){
    joueur.symbole ="X";
    cpu.symbole ="O"
});
boutonO.addEventListener("click", function(){
    joueur.symbole ="O";
    cpu.symbole ="X"
});

function nouvellePartie1(){
    for(let i= 0; i<cases.length; i++){
        cases[i].textContent="";
        cases[i].classList.remove("coche");
        cases[i].style.color ="";
    }
    partieTerminee = false;
    auJoueurDeJouer = true;
}

const nouvellePartieBtn = document.getElementById("NouvellePartie");

nouvellePartieBtn.addEventListener("click", function(){
    nouvellePartie1();
});
