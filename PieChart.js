function PieChart() {
    const canvas = document.createElement("canvas");

    const canvasHandler = handle(canvas);

    const ctx = canvas.getContext("2d");

    let chart = null;

    canvasHandler.subscribe("@config", config => {
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
            type: 'pie',
            data: {
                datasets: [
                    {
                        data: [50, 50],
                        backgroundColor: ["hotpink", "cornflowerblue"]
                    },
                ],

                labels: [
                    'Hotpink',
                    'Cornflowerblue'
                ]
            },
            options: {
                title: {
                    display: true,
                    text: "Hotpink vs Cornflowerblue"
                }
            }
        });

        canvasHandler.fire("@ready");
    })();

    return canvas;
}