define(['managerAPI',
	//'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js'
	'data_upload.js'
       ], function(Manager){


	//You can use the commented-out code to get parameters from the URL.
	//const queryString = window.location.search;
    //const urlParams = new URLSearchParams(queryString);
    //const pt = urlParams.get('pt');

	var API    = new Manager();
	//const subid = Date.now().toString(16)+Math.floor(Math.random()*10000).toString(16);
	init_data_pipe(API, 'dd7NaZnD7IoL',  {file_type:'csv'});	


    API.setName('mgr');
    API.addSettings('skip',true);

    //Randomly select which of two sets of category labels to use.
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
        raceiat:{},
        //YBYB: change when copying back to the correct folder
        baseURL: './images/',
        raceSet:raceSet,
        blackLabels:blackLabels,
        whiteLabels:whiteLabels,
        //Select randomly what attribute words to see. 
        //Based on Axt, Feng, & Bar-Anan (2021).
        posWords : API.shuffle([
            '喜悅', '愛', '和平', '美妙',
            '愉快', '光榮', '歡笑', '快樂'
        ]), 
        negWords : API.shuffle([
            '苦惱', '糟糕', '恐怖', '骯髒', 
            '邪惡', '可怕', '失敗', '傷害'
        ]),
	
    });

    API.addTasksSet({
        instructions: [{
            type: 'message',
            buttonText: '繼續'
        }],

        intro: [{
            inherit: 'instructions',
            name: 'intro',
            templateUrl: 'intro.jst',
            title: '心理師性傾向內隱態度與性傾向諮商勝任能力相關研究',
            header: '歡迎'
        }],

        raceiat_instructions: [{
            inherit: 'instructions',
            name: 'raceiat_instructions',
            templateUrl: 'raceiat_instructions.jst',
            //title: 'IAT Instructions',
            header: '內隱聯結測驗'
        }],

        explicits: [{
            type: 'quest',
            name: 'explicits',
            scriptUrl: 'explicits.js'
        }],

	demographic: [{    
		type: 'quest',
		name: 'demographic',
		scriptUrl: 'demographic.js'
	}],

        raceiat: [{
            type: 'time',
            name: 'raceiat',
            scriptUrl: 'raceiat.js'
        }],

	suggestion: [{    
		type: 'quest',
		name: 'suggestion',
		scriptUrl: 'suggestion.js'
	}],    

        lastpage: [{
            type: 'message',
            name: 'lastpage',
            templateUrl: 'lastpage.jst',
            //title: 'End',
            //Uncomment the following if you want to end the study here.
            //last:true, 
            header: '測驗結束，謝謝您的參與！'
        }], 
        
        //Use if you want to redirect the participants elsewhere at the end of the study
        redirect:
        [{ 
			//最後導向的網站（問卷）
            type:'redirect', name:'redirecting', url: 'https://forms.gle/RiaNeukUwxnqu6yJ9' 
        }],
		
		//This task waits until the data are sent to the server.
        uploading: uploading_task({header: '請稍等', body:'測驗資料上傳中，請先不要關閉頁面，謝謝！'})
    });

    API.addSequence([
        { type: 'isTouch', 
	 text: '請問您正在使用智慧型手機/平板進行測驗嗎？',
	 yesText: '是',
	 noText: '否'}, //Use Minno's internal touch detection mechanism. 

        // apply touch only styles
        {
            mixer:'branch',
            conditions: {compare:'global.$isTouch', to: true},
            data: [
                {
                    type: 'injectStyle',
                    css: [
                        //'* {color:red}',
                        '[piq-page] {background-color: #fff; border: 1px solid transparent; border-radius: 4px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); margin-bottom: 20px; border-color: #bce8f1;}',
                        '[piq-page] > ol {margin: 15px;}',
                        '[piq-page] > .btn-group {margin: 0px 15px 15px 15px;}',
                        '.container {padding:5px;}',
                        '[pi-quest]::before, [pi-quest]::after {content: " ";display: table;}',
                        '[pi-quest]::after {clear: both;}',
                        '[pi-quest] h3 { border-bottom: 1px solid transparent; border-top-left-radius: 3px; border-top-right-radius: 3px; padding: 10px 15px; color: inherit; font-size: 2em; margin-bottom: 20px; margin-top: 0;background-color: #d9edf7;border-color: #bce8f1;color: #31708f;}',
                        '[pi-quest] .form-group > label {font-size:1.2em; font-weight:normal;}',

                        '[pi-quest] .btn-toolbar {margin:15px;float:none !important; text-align:center;position:relative;}',
                        '[pi-quest] [ng-click="decline($event)"] {position:absolute;right:0;bottom:0}',
                        '[pi-quest] [ng-click="submit()"] {width:30%;line-height: 1.3333333;border-radius: 6px;}',
                        // larger screens
                        '@media (min-width: 480px) {',
                        ' [pi-quest] [ng-click="submit()"] {width:30%;padding: 10px 16px;font-size: 1.6em;}',
                        '}',
                        // phones and smaller screens
                        '@media (max-width: 480px) {',
                        ' [pi-quest] [ng-click="submit()"] {padding: 8px 13px;font-size: 1.2em;}',
                        ' [pi-quest] [ng-click="decline($event)"] {font-size: 0.9em;padding:3px 6px;}',
                        '}'
                    ]
                }
            ]
        },
        
        
        {inherit: 'intro'},
	{inherit: 'demographic'},    
        {
            mixer:'random',
            data:[
                {inherit: 'explicits'},

                // force the instructions to preceed the iat
                {
                    mixer: 'wrapper',
                    data: [
                        {inherit: 'raceiat_instructions'},
                        {inherit: 'raceiat'}
                    ]
                }
            ]
        },
	{inherit: 'suggestion'}, 
	{inherit: 'uploading'},
	{type: 'post', path: ['$isTouch', 'raceSet', 'blackLabels', 'whiteLabels'] }, //上傳資料
        {inherit: 'lastpage'},
        {inherit: 'redirect'}
    ]);

    return API.script;
});
