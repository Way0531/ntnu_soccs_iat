define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        { // page begins
            header: '對於同志教育的相關建議',
            questions: [
                { // question begins
                    type: 'textarea',
                    stem: '請問針對目前國內心理與諮商專業領域中，同志相關議題之訓練與繼續教育，您是否有什麼相關建議與看法？（非必填問題）',
                    rows: 3,
                    //minLength: 400
                } // question ends
            ]
        } // page ends

    ]);

    return API.script;
});
