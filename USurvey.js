function USurveyOption() {
    const option = document.createElement("div");

    option.className = "survey-option";

    const optionHandler = handle(option);

    optionHandler.subscribe("@create", config => {
        config = Object.assign({
            type: "text",
            label: "Answer",
            hint: "Write here your answer",
            group: "default",
        }, config || {});

        option.dataset.config = JSON.stringify(config);

        clearElement(option);

        if (config.type === "text") {
            const label = document.createElement("span");
            label.innerText = config.label;
            option.appendChild(label);
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = config.hint;
            option.appendChild(input);
        } else if (config.type === "radio") {
            const label = document.createElement("span");
            label.innerText = config.label;
            option.appendChild(label);
            const input = document.createElement("input");
            input.type = "radio";
            input.name = config.group;
            option.appendChild(input);
        } else if (config.type === "checkbox") {
            const label = document.createElement("span");
            label.innerText = config.label;
            option.appendChild(label);
            const input = document.createElement("input");
            input.type = "checkbox";
            option.appendChild(input);
        }
    });
    
    domTest(option);

    return option;
}

function USurveyOptionContainer() {
    const container = document.createElement("div");

    container.className = "survey-option-container";

    domContainer(container, USurveyOption);

    domTest(container);

    return container;
}

function USurveyQuestion() {
    const question = document.createElement("div");

    question.className = "survey-question";

    const questionHandler = handle(question);

    questionHandler.subscribe("@create", config => {
        config = Object.assign({
            title: "This is a Question",
            options: []
        }, config || {});

        clearElement(question);

        const title = document.createElement("h2");
        title.innerText = config.title;
        question.appendChild(title);

        const optionContainer = USurveyOptionContainer();
        const optionContainerHandler = handle(optionContainer);
        optionContainerHandler.fire("@create", config.options);
        question.appendChild(optionContainer);
    });

    domTest(question);

    return question;
}

function USurveyQuestionContainer() {
    const container = document.createElement("div");

    container.className = "survey-question-container";

    domContainer(container, USurveyQuestion);

    domTest(container);

    return container;
}

function USurvey() {
    const survey = document.createElement("div");

    survey.className = "survey";

    const surveyHandler = handle(survey);

    surveyHandler.subscribe("@create", config => {
        config = Object.assign({
            title: "This is a Survey",
            questions: []
        }, config || {});

        clearElement(survey);

        const title = document.createElement("h1");
        title.innerText = config.title;
        survey.appendChild(title);

        const questionContainer = USurveyQuestionContainer();
        const questionContainerHandler = handle(questionContainer);
        questionContainerHandler.fire("@create", config.questions);
        survey.appendChild(questionContainer);
    });

    domTest(survey);

    return survey;
}