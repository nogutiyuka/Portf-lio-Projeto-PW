document.addEventListener("DOMContentLoaded", ()=>{
    verificarTema();
});

function verificarTema(){
    const temaArmazenado = localStorage.getItem("tema");
    if(temaArmazenado){
        document.body.setAttribute("data-tema", temaArmazenado);
    }
}

function alterarTema(){
    const tema = document.body.getAttribute("data-tema");
    const novoTema = tema == "dark" ? "light" : "dark";
    document.body.setAttribute("data-tema", tema=="dark"?"light":"dark");
    localStorage.setItem("tema", novoTema);
}