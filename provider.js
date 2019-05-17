const socket_io = require("socket.io-client");

const socket = socket_io("http://192.169.200.243:5000");

socket.on("connect", () => {
    socket.emit("provider@register", { appId: "ubee-test" });
});

function randomFrame() {
    const keys = ["A", "B", "C", "D", "E", "F", "G"];
    const frame = {};
    for (let i = 0; i < 3; i++) {
        let key = keys[Math.floor(Math.random() * keys.length)];
        frame[key] = Number((Math.random() * 100).toFixed(4));
    }
    return frame;
}

const datasource = [];

socket.on("watch", (package) => {
    const { deviceId, index, data } = package;

    console.log(deviceId.slice(0, 32), index, data);
    
    if (index === "table/demo:refresh") {
        datasource.push(randomFrame());
        socket.emit("look", {
            appId: "ubee-test",
            deviceId,
            index: "table/demo",
            data: datasource,
        });
    }
});