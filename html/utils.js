const createDiv = (template, removeAtt = []) => {
    let attribs = template.attributes
    let div = document.createElement('div')
    for(let i=0; i<attribs.length; i++){
        if (!removeAtt.includes(attribs[i].name))
            div.setAttribute(attribs[i].name, attribs[i].value)
    }
    return div;
}

const loadIter = (template) => {
    let inner = template.innerHTML.trim()
    let iter = template.getAttribute("iter");
    let div = createDiv(template, ["iter"]);
    let src = ""
    for (let i=0; i<iter; i++){
        src += inner + '\n'
    }
    div.innerHTML = src;
    template.replaceWith(div)
    updateDom();
}

const loadFor = (template) => {
    const forLoop = (src) => {
        /*
        eval(`for (${src}){
            src+=inner+\n;
        }`)*/
    }
    let inner = template.innerHTML.trim()
    let iter = template.getAttribute("for");
    let div = createDiv(template, ["for"]);
    let src = ""
    forLoop(iter);
    div.innerHTML = src;
    template.replaceWith(div)
    updateDom();
}

const loadAllFor = async () => {
    let compsIter = document.querySelectorAll("template[iter]");
    for (let comp of compsIter){
        await forEach(comp)
    }
    let compsFor = document.querySelectorAll("template[for]");
    for (let comp of compsFor){
        await forEach(comp)
    }
}

const loadComponent = async (template) => {
    let url = template.getAttribute('component');
    let comp = document.createElement('div');
    url = `${window.location.origin}/${url}`;
    let src = await fetch(url).then(res => res.text());
    src = src.trim();
    comp.innerHTML = src;
    template.replaceWith(comp);
    updateDom();
}

const loadAllComponents =  async () => {
    let comps = document.querySelectorAll("template[component]");
    for (let comp of comps){
        await loadComponent(comp)
    }
}

const updateDom = async ()=>{
    await loadAllFor();
    await loadAllComponents();
}

window.addEventListener('load', async ()=>{
    await updateDom();
})