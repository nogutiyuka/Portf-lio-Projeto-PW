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

function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "images/menu-icon";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "images/menu-icon";
    }
}

async function fetchGitHubRepos(){
    try{
        const response = await fetch('https://api.github.com/users/nogutiyuka/repos');
        const data = await response.json();
        const repositorioContainer = document.getElementById('repositorio-container');

        data.forEach(repo => {
            const repoCard = document.createElement('div');
            projects.className = 'projects';

            const repoName = document.createElement('h2');
            repoName.textContent = repo.name;
            projects.appendChild(repoName);

            const repoDescription = document.createElement('p');
            repoDescription.textContent = repo.repoDescription || 'Sem descrição';
            projects.appendChild(repoDescription);

            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.target = '_blank';
            repoLink.textContent = 'Ver no GitHub';
            projects.appendChild(repoLink);

            repositorioContainer.appendChild(repoCard);
        });
    } catch(error) {
        console.error('Erro ao buscar repositórios no GitHub', error);
    }
}