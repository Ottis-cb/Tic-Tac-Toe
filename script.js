//Joueurs
let joueur = {
    nom: "Player",
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

//Combinaison Gagnantes
const combinaisonGagnantes = [
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

//Remplir cases
function remplirCase(caseIndex, symbole) {
    caseIndex.textContent = symbole;
    caseIndex.classList.add("coche");
    if(symbole==="X"){
        caseIndex.style.color="#2563eb";
    }else{
        caseIndex.style.color="#ef4444";
    }
}

//Nombres de cases Remplis
function nombreCasesRemplies(){
    let compteur = 0;
    for(let i = 0; i<cases.length; i++){
        if(cases[i].classList.contains("coche")){
            compteur++;
        }
    }
    return compteur;
}

//Afficher le score de chaque joueur
function afficherScore(){
    let scoreJoueur = document.querySelector('.you-score');
    let scoreCpu = document.querySelector('.cpu-score');

    scoreJoueur.textContent = joueur.score;
    scoreCpu.textContent = cpu.score;
}


const choixplayer = document.querySelector(".choix");

// Gagner
function quigagne(joueurATester) {
    for(let i=0; i< combinaisonGagnantes.length; i++){
        let a=combinaisonGagnantes[i][0];
        let b=combinaisonGagnantes[i][1];
        let c=combinaisonGagnantes[i][2];

        if(
        cases[a].textContent === joueurATester.symbole &&
        cases[b].textContent === joueurATester.symbole &&
        cases[c].textContent === joueurATester.symbole
    ){
        cases[a].classList.add("winner");
        cases[b].classList.add("winner");
        cases[c].classList.add("winner");
        choixplayer.style.opacity=1;
        choixplayer.style.visibility="visible";
        
        return true;
        }
    }
    return false;
}

//Fin de la Partie
function finDePartie(gagnant) {
    partieTerminee = true;
    gagnant.score++;
    afficherScore();
}

//Match Nul
function matchNul() {
    partieTerminee = true;
    afficherScore();
    choixplayer.innerHTML = "Match Nul!!";
}
    let Touraffiche = document.getElementById("TourAffiche");
//Faire jouer le joueur
function joueurCase(id){
    let caseCliquee = document.getElementById(id);
    Touraffiche.textContent= "C'est le tour du " + cpu.nom;
    
    if(partieTerminee || !auJoueurDeJouer || caseCliquee.classList.contains("coche")){
        return;
    }
    remplirCase(caseCliquee, joueur.symbole);
    if(quigagne(joueur)) {
        finDePartie(joueur);
        choixplayer.innerHTML= ' <h3>Félicitation!</h3> <img class="trophée" src="/trophy-winner-prize-svgrepo-com.svg" alt =""></img><br>'+ joueur.nom + ' gagne';
        return;
    }
    if(nombreCasesRemplies() === 9){
        matchNul();
        return;
    }
    auJoueurDeJouer = false;
    //Pour que le cpu attends 0.6s avant de jouer
    setTimeout(joueurCpu, 600);
}

//Faire jouer le cpu
function joueurCpu(){
    Touraffiche.textContent= "C'est le tour de  " + joueur.nom;

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
        choixplayer.innerHTML='<h3>Perdu!</h3><img class="trophée" src="bad-svgrepo-com.svg" alt =""></img>' + cpu.nom + 'gagne';
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

//Pour afficher des messages après chaque clic du bouton recommencer
const messages = [
    "Montre au CPU qui est le patron!😎",
    "Pret pour la revanche?🤔",
    "Prouve que tu es le champion💪",
    "Une revanche ou une nouvelle défaite?🤭",
    "La victoire t'appelle😎"
]
let i=0;
function afficherMessageRevanche(){
    Touraffiche.textContent= messages[i];
    i++;
    if(i=== messages.length){
        i=0;
    }
}

// Pour recommencer le jeu(Revanche)
function Recommencer(){
    for(let i= 0; i<cases.length; i++){
        cases[i].textContent="";
        cases[i].classList.remove("coche");
        cases[i].classList.remove("winner");
        cases[i].style.color ="";
    }
    choixplayer.style.opacity=0;
    choixplayer.style.visibility="hidden";
    partieTerminee = false;
    auJoueurDeJouer = true;
    afficherMessageRevanche();
}

const recommencerBtn = document.getElementById("Recommencer");

recommencerBtn.addEventListener("click", function(){
    Recommencer();
});

//Pour faire une nouvelle Partie
function NouvellePartie(){
    location.reload();
}

const NouvellePartieBtn = document.getElementById("NouvellePartie");
NouvellePartieBtn.addEventListener("click",function(){
NouvellePartie();
});

//Pour donner le nom au joueur
function nommerJoueur(){
            const nomJ =document.getElementById('nomJoueur').value.trim();
            if(nomJ == ""){
                alert("Entrez votre nom.");
                return;
            }

            joueur.nom = nomJ;
            document.querySelector('.score-you p').textContent = joueur.nom;
            choixplayer.style.opacity = 0;
            choixplayer.style.visibility= "hidden";     
            SymboleJoueur.style.opacity=1;    
        }

        document.getElementById('continuer').addEventListener('click', function(){
            nommerJoueur();
});


//Choisir le symbole de chaque joueur
const SymboleJoueur = document.querySelector('.symboleJoueur');

function choixSymboleX(){
    joueur.symbole= "X";
    cpu.symbole= "O";
    SymboleJoueur.style.opacity=0;
    SymboleJoueur.style.visibility="hidden";
}
function choixSymboleY(){
    joueur.symbole= "O";
    cpu.symbole= "X";
    SymboleJoueur.style.opacity=0;
    SymboleJoueur.style.visibility="hidden";
}
document.querySelector('.x-btn').addEventListener("click", function(){
    choixSymboleX();
});
document.querySelector('.o-btn').addEventListener("click", function(){
    choixSymboleY();
});


//Pour le mode claie et sombre
const mode =document.querySelector(".mode");
mode.addEventListener("click", function(){
    document.body.classList.toggle('dark');
    if(document.body.classList.contains("dark")){
        mode.textContent="🌞";
    }else{
        mode.textContent="🌙";
    }
});

        
        
        

