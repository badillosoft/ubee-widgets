function PieChart2() {
    const canvas = document.createElement("canvas");

    const canvasHandler = handle(canvas);

    const ctx = canvas.getContext("2d");

    let chart = null;

    // config {}
    // - title "Hello world"
    // - labels ["A", "B", "C"]
    // - colors ["red", "blue", "green"]
    // - data [1, 2, 3]
    canvasHandler.subscribe("@config", config => {
        config = {
            type: 'pie',
            data: {
                datasets: [
                    {
                        data: config.data || [],
                        backgroundColor: config.colors || [],
                    },
                ],

                labels: config.labels || [],
            },
            options: {
                title: {
                    display: true,
                    text: config.title || "Chart Pie",
                }
            }
        };

        if (!chart) {
            chart = new Chart(ctx, config);
        }

        for (let [key, value] of Object.entries(config)) {
            chart[key] = value;
        }
        chart.update();
    });

    (async () => {
        await installStyles("https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.css");
        await installScript("https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.js");

        canvasHandler.fire("@config", {
            title: "Hello world",
            labels: ["A", "B", "C"],
            colors: ["red", "blue", "green"],
            data: [1, 2, 3]
        });

        canvasHandler.fire("@ready");
    })();

    return canvas;
}