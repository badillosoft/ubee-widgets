const socket_io = require("socket.io-client");

const socket = socket_io("http://192.169.200.243:5000");

function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const a = 0.5;
    return [`rgba(${r}, ${g}, ${b}, ${a})`, Math.floor(Math.random() * 100)];
}

socket.on("connect", () => {
    setInterval(() => {
        const pairs = [];

        for (let i = 0; i < Math.floor(2 + Math.random() * 10); i++) {
            pairs.push(randomColor());
        }

        socket.emit("look", {
            appId: "ubee-pie",
            index: "chart-pie",
            data: {
                datasets: [
                    {
                        data: pairs.map(p => p[1]),
                        backgroundColor: pairs.map(p => p[0])
                    },
                ],

                labels: pairs.map(p => p[0])
            },
        });
    }, 5000);
});