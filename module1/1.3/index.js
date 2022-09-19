let compteurClick = 0;

window.addEventListener("click", onClickAddClick);


function onClickAddClick() {
    compteurClick++;
    wrapper.innerHTML = compteurClick;
    messageByClicks();
}

const wrapper = document.querySelector("#compteur");
wrapper.innerHTML = compteurClick;

let message = "";
function messageByClicks() {
    if(compteurClick>=5 && compteurClick < 9){
        message = "Bravo, bel échauffement !";
    } else if (compteurClick>=10){
        message = "Vous êtes passé maître en l'art du clic !";
    }
    messageP.innerHTML = message;
}
const messageP = document.querySelector("#message");
