function USurvey(code) {
    const survey = document.createElement("div");

    survey.addEventListener("@datasource", ({ detail: datasource }) => {

    });
    
    (async () => {
        await installScript("http://192.169.200.243:7000/v1/ubee-watch.js?appId=ubee-survey");
        look("survey", datasource => {
            survey.dispatchEvent(new CustomEvent("@datasource", {
                detail: datasource
            }));
        });
        await window.ubee.until("@watch:resume");
        watch("survey", code);
    })();

    return survey;
}