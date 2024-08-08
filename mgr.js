define(['managerAPI',
        'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js',
        'https://cdn.jsdelivr.net/gh/minnojs/scorer/scorer.min.js'], 
    function(Manager){
    
    var API = new Manager();
    
    // 初始化 DataPipe
    init_data_pipe(API, '2L7SRGjCWjgQ', {file_type:'csv'});    

    API.setName('mgr');
    API.addSettings('skip',true);

    // 隨機選擇使用哪一組標籤
    let raceSet = API.shuffle(['a','b'])[0];
    let blackLabels = [];
    let whiteLabels = [];

    if (raceSet == 'a') {
        blackLabels.push('同性戀');
        whiteLabels.push('異性戀');
    } else {
        blackLabels.push('同性戀者');
        whiteLabels.push('異性戀者');
    }

    API.addGlobal({
        raceiat: {},
        baseURL: './images/',
        raceSet: raceSet,
        blackLabels: blackLabels,
        whiteLabels: whiteLabels,
        posWords: API.shuffle([
            '喜悅', '愛', '和平', '美妙',
            '愉快', '光榮', '歡笑', '快樂'
        ]), 
        negWords: API.shuffle([
            '苦惱', '糟糕', '恐怖', '骯髒', 
            '邪惡', '可怕', '失敗', '傷害'
        ])
    });

    API.addTasksSet({
        instructions: [{
            type: 'message',
            buttonText: 'Continue'
        }],
        intro: [{
            inherit: 'instructions',
            name: 'intro',
            templateUrl: 'intro.jst',
            title: 'Intro',
            header: 'Welcome'
        }],
        raceiat_instructions: [{
            inherit: 'instructions',
            name: 'raceiat_instructions',
            templateUrl: 'raceiat_instructions.jst',
            title: 'IAT Instructions',
            header: 'Implicit Association Test'
        }],
        explicits: [{
            type: 'quest',
            name: 'explicits',
            scriptUrl: 'explicits.js'
        }],
        raceiat: [{
            type: 'time',
            name: 'raceiat',
            scriptUrl: 'raceiat.js'
        }],
        lastpage: [{
            type: 'message',
            name: 'lastpage',
            templateUrl: 'lastpage.jst',
            title: 'End',
            header: 'You have completed the study'
        }],
        redirect: [{ 
            type:'redirect', name:'redirecting', url: 'https://www.google.com/search'
        }],
        uploading: uploading_task({header: 'just a moment', body:'Please wait, sending data... '})
    });

    API.addSequence([
        { type: 'isTouch' }, 
        
        { type: 'post', path: ['$isTouch', 'raceSet', 'blackLabels', 'whiteLabels'] },

        {
            mixer: 'wrapper',
            data: [
                {inherit: 'intro'},
                {inherit: 'explicits'},
                {
                    mixer: 'wrapper',
                    data: [
                        {inherit: 'raceiat_instructions'},
                        {inherit: 'raceiat'}
                    ]
                },
                {
                    type: 'post',
                    name: 'compute_dscore',
                    script: function(){
                        var scorer = new Scorer();

                        scorer.addSettings('compute', {
                            AnalyzedVar: 'latency',
                            ErrorVar: 'score',
                            condVar: 'condition',
                            cond1VarValues: ['cond1'], // 替換為您的實際值
                            cond2VarValues: ['cond2'], // 替換為您的實際值
                            parcelVar: 'parcel',
                            parcelValue: ['first', 'second'],
                            fastRT: 300,
                            maxFastTrialsRate: 10,
                            minRT: 400,
                            maxRT: 10000,
                            maxErrorParcelRate: 0.2,
                            errorLatency: {
                                use: 'penalty',
                                penalty: 600,
                                useForSTD: true
                            }
                        });

                        var DScoreObj = scorer.computeD();

                        API.save({
                            score: DScoreObj.Dscore,
                            feedback: DScoreObj.FBMsg,
                            otherData: '您需要的其他數據'
                        });
                    }
                },
                {inherit: 'uploading'},
                {inherit: 'lastpage'},
                {inherit: 'redirect'}
            ]
        }
    ]);

    return API.script;
});
