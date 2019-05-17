const socket_io = require("socket.io-client");

const socket = socket_io("http://192.169.200.243:5000");

socket.on("connect", () => {
    socket.emit("provider@register", { appId: "ubee-survey" });
});

const surveys = {
    demo: [
        {
            type: "multi-option",
            question: "This is a multi-select question",
            options: [
                {
                    label: "Very good",
                    value: 5
                },
                {
                    label: "Good",
                    value: 4
                },
                {
                    label: "Normal",
                    value: 3
                },
                {
                    label: "Bad",
                    value: 2
                },
                {
                    label: "Very bad",
                    value: 1
                },
            ]
        }
    ]
};

socket.on("watch", (package) => {
    const { deviceId, index, data } = package;

    console.log(deviceId.slice(0, 32), index, data);

    if (index === "survey") {
        datasource.push(randomFrame());
        socket.emit("look", {
            appId: "ubee-survey",
            deviceId,
            index: "survey",
            data: surveys[code],
        });
    }
});