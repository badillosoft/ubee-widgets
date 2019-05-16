function UTable() {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // let jtable = null;

    table.appendChild(thead);
    table.appendChild(tbody);

    table.addEventListener("@columns:update", ({ detail: columns }) => {
        if (!columns || !(columns instanceof Array) || columns.length === 0) {
            columns = ["Ubee Table"];
        }
        table.dataset.columns = JSON.stringify(columns);
        clearElement(thead);
        const tr = document.createElement("tr");
        for (let column of columns) {
            let th = document.createElement("th");
            th.innerText = column;
            th.dataset.columnIndex = column;
            tr.appendChild(th);
        }
        thead.appendChild(tr);
    });

    table.addEventListener("@rows:add", ({ detail: row }) => {
        const columns = JSON.parse(table.dataset.columns || "[]");
        const tr = document.createElement("tr");
        const index = tbody.children.length;
        tr.dataset.rowIndex = index;
        for (let column of columns) {
            let td = document.createElement("td");
            td.innerText = row[column] === undefined ? "-" : row[column];
            td.dataset.rowIndex = index;
            td.dataset.columnIndex = column;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });

    table.addEventListener("@datasource", ({ detail: datasource }) => {
        clearElement(tbody);

        if (!datasource || !(datasource instanceof Array) || datasource.length === 0) {
            table.dispatchEvent(new CustomEvent("@columns"));
            table.dispatchEvent(new CustomEvent("@datasource:add", {
                detail: [
                    {
                        "Ubee Table": "No hay datos"
                    }
                ]
            }));
            return;
        }

        table.dispatchEvent(new CustomEvent("@datasource:add", {
            detail: datasource
        }));
    });

    table.addEventListener("@datasource:add", ({ detail: datasource }) => {
        const columns = datasource.reduce((columns, frame) => {
            for (let column in frame) {
                if (columns.indexOf(column) >= 0) {
                    continue;
                }
                columns.push(column);
            }
            return columns;
        }, []);
        table.dispatchEvent(new CustomEvent("@columns:update", {
            detail: columns
        }));
        for (let frame of datasource) {
            table.dispatchEvent(new CustomEvent("@rows:add", {
                detail: frame
            }));
        }
    });

    table.dispatchEvent(new CustomEvent("@datasource"));

    // table.addEventListener("@jquery:datatables", async ({ detail: cdns }) => {
    //     cdns = cdns || {
    //         js: [
    //             // "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js",
    //             "https://code.jquery.com/jquery-3.4.1.min.js",
    //             "https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js",
    //             // "https://cdn.datatables.net/1.10.18/js/dataTables.jqueryui.min.js",
    //         ],
    //         css: [
    //             "https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css",
    //             // "https://cdn.datatables.net/1.10.18/css/dataTables.jqueryui.min.css",
    //         ]
    //     };

    //     for (let cdn of cdns.css) {
    //         await installStyles(cdn);
    //     }

    //     for (let cdn of cdns.js) {
    //         await installScript(cdn);
    //     }

    //     const columns = JSON.parse(table.dataset.columns || "[]");

    //     console.log(table);

    //     jtable = $(table).DataTable({
    //         columns,
    //         data: []
    //     });
    // });

    return table;
}