define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        { // page begins
            header: 'Text questions',
            questions: [
                { // question begins
                    type: 'textarea',
                    stem: 'When you say good morning, what do you mean?',
                    rows: 3,
                    minLength: 400
                } // question ends
            ]
        } // page ends

    ]);

    return API.script;
});
