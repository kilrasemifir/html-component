const loadComponent = async (template) => {
    let url = template.getAttribute('component');
    let comp = document.createElement('div');
    url = window.location.href+url;
    let src = await fetch(url).then(res => res.text());
    src = src.trim();
    comp.innerHTML = src;
    template.replaceWith(comp);
    loadAllComponents();
}

const loadAllComponents = () => {
    let comps = document.querySelectorAll("template[component]");
    comps.forEach(loadComponent)
}

window.addEventListener('load', ()=>{
    loadAllComponents();
})