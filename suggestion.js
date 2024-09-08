define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        { // page begins
            header: '相關建議',
            questions: [
                { // question begins
                    type: 'textarea',
                    stem: '請問針對目前國內心理與諮商專業領域中，同志相關議題之訓練與繼續教育，您是否有什麼相關建議或看法？<br><span style="color:gray; font-size:0.8em;">非必填問題，若無請直接點擊下方送出鍵</span>',
                    rows: 3,
                    //minLength: 400
                } // question ends
            ]
        } // page ends

    ]);

    return API.script;
});
