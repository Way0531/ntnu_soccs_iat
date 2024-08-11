define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false, //Change to true if you don't want to show the submit button.
        header: 'Questionnaire',
        decline: false,
        declineText: isTouch ? 'Decline' : 'Decline to Answer', 
        autoFocus:true, 
        progressBar:  'Page <%= pagesMeta.number %> out of 3'
    });

    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'false',
        required : true, 		
        errorMsg: {
            required: isTouch 
                ? '此題項為必填' 
                : '此題項為必填'
        },
        autoSubmit:'true',
        numericValues:'true',
        help: '<%= pagesMeta.number < 3 %>',
        helpText: 'Tip: For quick response, click to select your answer, and then click again to submit.'
    });

    API.addQuestionsSet('basicSelect',{
        inherit :'basicQ',
        type: 'selectOne'
    });
	
    API.addQuestionsSet('basicDropdown',{
        inherit :'basicQ',
        type : 'dropdown',
        autoSubmit:false
    });
	
    API.addQuestionsSet('therm',{
        inherit: 'basicSelect',
        answers: [
            {text:'10 - Extremely warm', value:10},
            {text:'9 - Very warm', value:9},
            {text:'8 - Moderately warm', value:8},
            {text:'7 - Somewhat warm', value:7},
            {text:'6 - Slightly warm', value:6},
            {text:'5 - Neither warm nor cold', value:5},
            {text:'4 - Slightly cold', value:4},
            {text:'3 - Somewhat cold', value:3},
            {text:'2 - Moderately cold', value:2},
            {text:'1 - Very cold', value:1},
            {text:'0 - Extremely cold', value:0}
        ]
    });

	
    /**
	*Specific questions
	*/	
    API.addQuestionsSet('attributes7',{
        inherit : 'basicSelect',
        name: 'attributes7',
        stem: 'Which statement best describes you?',
        answers: [
            {text:'I strongly prefer <%= global.whiteLabels %> to <%= global.blackLabels %>.',value:7},
            {text:'I moderately prefer <%= global.whiteLabels %> to <%= global.blackLabels %>.',value:6},
            {text:'I slightly prefer <%= global.whiteLabels %> to <%= global.blackLabels %>.',value:5},
            {text:'I like <%= global.whiteLabels %> and <%= global.blackLabels %> equally.',value:4},
            {text:'I slightly prefer <%= global.blackLabels %> to <%= global.whiteLabels %>.',value:3},
            {text:'I moderately prefer <%= global.blackLabels %> to <%= global.whiteLabels %>.',value:2},
            {text:'I strongly prefer <%= global.blackLabels %> to <%= global.whiteLabels %>.',value:1}
        ]
    });
	
    API.addQuestionsSet('thermBlack',{
        inherit : 'therm',
        name: 'Tblack_0to10',
        stem: 'How warm or cold do you feel towards <b><%= global.blackLabels %></b>?'
    });

    API.addQuestionsSet('thermWhite',{
        inherit : 'therm',
        name: 'Twhite_0to10',
        stem: 'How warm or cold do you feel towards <b><%= global.whiteLabels %></b>?'
    });

    API.addSequence([
	     { // page begins
            header: 'Grid questions simple',
            questions: [
                {
                    type: 'grid',
                    stem: ‘請勾選最符合自己的形容’,
                    columns: [‘非常不符合’ , ‘符合’ , ‘有點不符合’ , ‘普通’ , ‘有點符合’ , ’符合’ , ’非常符合’],
                    rows: [
‘1. 我已經具備足夠的臨床訓練與督導，可以提供同志個案諮商服務。’, 
‘2. 同志個案的生活型態是不自然或不道德的。’,
‘3. 我透過諮詢、督導與繼續教育來檢視自己在同志諮商技巧上的效能與能力。’ ,
‘4. 我曾有過諮商男同志個案的經驗。’ , 
‘5. 與異性戀個案相比，同志個案比較容易遭受到他們不喜歡的諮商處遇。’,
‘6. 就我目前的專業發展，我覺得自己有能力、技巧與資格與同志個案進行諮商。’,
‘7. 我曾有過諮商女同志或男同志伴侶的經驗。’,
‘8. 我曾有過諮商女同志個案的經驗。’,
‘9. 我知道有些研究指出，同志個案比起異性戀個案，更容易被診斷為心理異常。’,
’10. 顯而易見的是，兩個男人或是兩個女人之間的親密關係，不如一男一女間的親密關係來的穩定或是更具承諾。’,
’11. 我認為同志個案應該努力地對於自身的性傾向保持低調。’,
’12. 我曾參與過同志議題（諮商、心理學、心理衛生領域）的在職訓練、研討會或工作坊。’,
’13. 異性戀主義者與帶有偏見的觀念已滲透在心理衛生專業中。’,
’14. 在諮商情境中，我覺得我有能力評估同志的心理健康需求。’,
’15. 我認為同志伴侶不需要特別的權利（同居伴侶全或婚姻權），因為這樣會破壞正常及傳統的家庭價值。’,
’16. 影響男同志或女同志的心理、社會議題是不一樣的。’,
’17. 如果我的個案能將異性戀生活是為理想的生活型態，那是最好不過的。’,
’18. 我曾有過諮商雙性戀個案的經驗。’,
’19. 我知道體制中有哪些障礙可能會阻礙同志使用心理衛生服務。’,
’20. 我知道諮商師經常會把自己對於性的價值觀強加到同志個案身上。’,
’21. 我認為我的個案應該在某些程度上服從傳統的性價值觀。’,
’22. 如果我的個案是同志，我目前沒有具備足夠的技巧與訓練來進行個案報告或諮詢。’,
’23. 我認為同志個案與一位認同傳統價值觀與規範的異性戀諮商師進行諮商，能使其受益最多。’,
’24. 生為異性戀者在這個社會中佔有一定優勢。’,
’25. 我覺得若要與同志個案進行有效能的諮商，諮商師與個案具有不同的性傾向，會是一開始的障礙。’,
’26. 在同志議題的個案演練上，我曾扮演個案或諮商師。’,
’27. 我認為同性戀是一種精神障礙或一種罪，且可透過諮商或靈性協助獲得療癒。’,
’28. 我認為在有兒童的場合，同志個案必須對自身的性傾向保持低調。’,
’29. 談到同志，我認同以下的說法：「厭惡或譴責那罪，但愛那些罪人。」’
]
                }
            ]}
        {
            mixer : 'random', 
            data : [
                {
                    mixer : 'random', 
                    wrapper:true, 
                    data : [
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'thermBlack'}
                        },
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'thermWhite'}							
                        }
                    ]
                },
                {
                    inherit:'basicPage', 
                    questions: {inherit:'attributes7'}
                }
            ]
        }
    ]);

    return API.script;
});
