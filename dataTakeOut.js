import data from "./skills_and_projects.json" with { type: "json" };

const PLList = document.getElementById("programmingLanguages");
const PL = data.programming_languages;
const LE = document.getElementById("languageExplanation");
const DEList = document.getElementById("developmentEnvironments");
const DE = data.development_environments;
const EE = document.getElementById("environmentExplanation");
let currentCategory = null;

const projectsList = document.getElementById("projects");
const projects = data.projects;
const envData = [
    ...data.programming_languages.map(lang => lang.name),
    ...data.development_environments.map(env => env.name)
]

const EBList = document.getElementById("environmentButtons");
const ND = document.getElementById("narrowDown");

const modal = document.getElementById("narrowDownModal");
const openBtn = document.getElementById("openNarrowDownModal");
const closeBtn = document.querySelector(".close-button");

let header = document.querySelector("header");
let inner = document.getElementById("inner");
let headerHeight = header ? header.offsetHeight : 0;

const adjustPadding = () => {
    header = document.querySelector("header");
    inner = document.getElementById("inner");

    if (header && inner) {
        headerHeight = header.offsetHeight;
        inner.style.paddingTop = `${headerHeight}px`;
    }
}

const categoryClicked = (e, input, output) => {
    if (currentCategory === e.target.textContent) {
        output.innerHTML = "";
        currentCategory = null;
        return;
    }
    currentCategory = e.target.textContent;
    const project = input.filter(project => project.name === currentCategory)[0];
    const img = document.createElement("img");
    img.src = project.img;
    img.alt = "画像が読み込めません";
    const name = document.createElement("h5");
    name.textContent = project.name;
    const explanation = document.createElement("p");
    explanation.innerHTML = project.explanation;
    const closeButton = document.createElement("button");
    closeButton.textContent = "閉じる";
    closeButton.classList.add("button");
    closeButton.onclick = () => {
        output.innerHTML = "";
    }

    output.innerHTML = "";
    //output.appendChild(img);
    output.appendChild(name);
    output.appendChild(explanation);
    output.appendChild(closeButton);
}

const showProjects = (subjects) => {
    projectsList.innerHTML = "";
    projects.forEach(project => {
        if (subjects) if (!subjects.every(subject => project.environment.includes(subject))) return;
        const container = document.createElement("div");
        const img = document.createElement("img");
        img.src = project.img;
        img.alt = "画像が読み込めません";
        const url = document.createElement("a");
        url.href = project.url;
        url.target = "_blank";
        url.appendChild(img);
        const name = document.createElement("h5");
        name.textContent = project.name;
        const time = document.createElement("p");
        time.textContent = "作成時期: " + project.time;
        const environment = document.createElement("div");
        environment.classList.add("categories");
        project.environment.forEach(env => {
            const container = document.createElement("div");
            container.classList.add("category");
            container.textContent = env;
            environment.appendChild(container);
        });
        const explanationContainer = document.createElement("div");
        if (project.toggle){
            explanationContainer.classList.add("toggle-block");
            const explanationButton = document.createElement("button");
            explanationButton.classList.add("toggle-button");
            explanationButton.textContent = "▼詳しく";
            const explanation = document.createElement("p");
            explanation.classList.add("toggle-content");
            explanation.classList.add("hidden");
            explanation.innerHTML = project.explanation;
            
            explanationContainer.appendChild(explanationButton);
            explanationContainer.appendChild(explanation);
        }else{
            const explanation = document.createElement("p");
            explanation.innerHTML = project.explanation;
            explanationContainer.appendChild(explanation);
        }

        container.appendChild(url);
        container.appendChild(name);
        container.appendChild(time);
        container.appendChild(environment);
        container.appendChild(explanationContainer);
        projectsList.appendChild(container);
    })
    if (!projectsList.hasChildNodes()) {
        const container = document.createElement("p");
        container.textContent = "該当するプロジェクトはありません";
        projectsList.appendChild(container);
    }
}

ND.onclick = () => {
    const selectedEnv = Array.from(EBList.children).filter(button => button.classList.contains("selected")).map(button => button.textContent);
    if (selectedEnv.length === 0) {
        showProjects();
    } else {
        showProjects(selectedEnv);
    }
    modal.style.display = "none";
}

openBtn.onclick = () => {
    modal.style.display = "block";
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

PL.forEach(language => {
    const container = document.createElement("button");
    container.classList.add("category");
    container.textContent = language.name;
    container.onclick = (e) => categoryClicked(e, PL, LE);
    PLList.appendChild(container);
})

DE.forEach(env => {
    const container = document.createElement("button");
    container.classList.add("category");
    container.textContent = env.name;
    container.onclick = (e) => categoryClicked(e, DE, EE);
    DEList.appendChild(container);
})

envData.forEach(env => {
    const container = document.createElement("button");
    container.classList.add("category");
    container.textContent = env;
    container.onclick = () => {container.classList.toggle("selected");};
    EBList.appendChild(container);
});

showProjects();

document.querySelectorAll(".toggle-block").forEach(block => {
    const button = block.querySelector(".toggle-button");
    const content = block.querySelector(".toggle-content");

    button.addEventListener("click", () => {
        const isHidden = content.classList.toggle("hidden");
        button.textContent = isHidden ? "▼詳しく" : "▲閉じる";
    });
});

document.querySelectorAll(".scroll-link").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const targetId = this.dataset.target;
        const targetEl = document.getElementById(targetId);

        if (targetEl && header) {
            const y = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        }
    });
});

window.addEventListener("DOMContentLoaded", adjustPadding);
window.addEventListener("resize", adjustPadding);