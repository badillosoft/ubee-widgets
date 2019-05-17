function handle(element) {
    return {
        fire(event, data) {
            element.dispatchEvent(new CustomEvent(event, {
                detail: data
            }));
            return this;
        },
        subscribe(event, callback) {
            element.addEventListener(event, e => {
                e = e instanceof CustomEvent ? e.detail : e;
                callback(e);
            });
            return this;
        },
    };
}

function domTest(element) {
    const elementHandler = handle(element);
    if (!element.dataset.domTest) {
        element.dataset.domTest = new Date().toISOString();
        elementHandler.subscribe("@test", test => {
            for (let [event, data] of Object.entries(test || {})) {
                elementHandler.fire(`@${event}`, data);
            }
        });
    }
}

function domContainer(container, model=(() => document.createElement("input"))) {
    const containerHandler = handle(container);
    if (!container.dataset.domContainer) {
        container.dataset.domContainer = new Date().toISOString();
        containerHandler.subscribe("@create", configs => {
            clearElement(container);
            for (let config of (configs || [])) {
                containerHandler.fire("@container:add", config);
            }
        });
        containerHandler.subscribe("@container:add", config => {
            let element = model();
            element.dataset.containerIndex = container.children.length;
            let elementHandler = handle(element);
            elementHandler.fire("@create", config);
            container.appendChild(element);
        });
    }
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function randomColor(alfa = 0.5, red = [0, 255], green = [0, 255], blue = [0, 255]) {
    const r = Math.floor(Math.random() * (red[1] - red[0]) + red[0]);
    const g = Math.floor(Math.random() * (green[1] - green[0]) + green[0]);
    const b = Math.floor(Math.random() * (blue[1] - blue[0]) + blue[0]);
    const a = 0.5;
    return [`rgba(${r}, ${g}, ${b}, ${a})`, Math.floor(Math.random() * 100)];
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

async function wait(predicate, timeout=100) {
    await new Promise(resolve => {
        const id = setInterval(() => {
            if (predicate()) {
                clearInterval(id);
                resolve();
            }
        }, timeout);
    });
}