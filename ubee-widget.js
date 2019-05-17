function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

async function installScript(cdn, target = null) {
    if (!cdn) {
        console.warn(`Invald script cdn ${cdn}`);
        return;
    }
    const id = window.btoa(cdn);
    window.scripts = window.scripts || {};
    if (window.scripts[id]) {
        return;
    }
    target = target || document.body;
    await new Promise(resolve => {
        const script = document.createElement("script");
        script.src = cdn;
        script.addEventListener("load", () => {
            window.scripts[id] = script;
            resolve();
        });

        target.appendChild(script);
    });
}

async function installStyles(cdn, target = null) {
    if (!cdn) {
        console.warn(`Invald style cdn ${cdn}`);
        return;
    }
    const id = window.btoa(cdn);
    window.styles = window.styles || {};
    if (window.styles[id]) {
        return;
    }
    target = target || document.head;
    await new Promise(resolve => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cdn;
        link.addEventListener("load", () => {
            window.styles[id] = link;
            resolve();
        });

        target.appendChild(link);
    });
}

function inlineHTML(html) {
    const div = document.createElement("div");
    
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);
    
    div.appendChild(fragment);

    return div.firstChild;
}

function widget(html) {
    const element = inlineHTML(html);

    

    return element;
}