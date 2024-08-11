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
        decline: 'true',
        required : true, 		
        errorMsg: {
            required: isTouch 
                ? 'Please select an answer, or click \'Decline\'' 
                : 'Please select an answer, or click \'Decline to Answer\''
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
            {text:'1 - 非常不符合', value:1},
            {text:'2 - 不符合', value:2},
            {text:'3 - 有點不符合', value:3},
            {text:'4 - 普通', value:4},
            {text:'5 - 有點符合', value:5},
            {text:'6 - 符合', value:6},
            {text:'7 - 非常符合', value:7}
        ]
    });

	
	
    API.addQuestionsSet('comptence',
	{inherit : 'therm',
        name: 'com_1',
        stem: '1. 我已經具備足夠的臨床訓練與督導，可以提供同志個案諮商服務。'},
	{inherit : 'therm',
        name: 'com_2',
        stem: '2. 同志個案的生活型態是不自然或不道德的。'},
	{inherit : 'therm',
        name: 'com_3',
        stem: '3. 我透過諮詢、督導與繼續教育來檢視自己在同志諮商技巧上的效能與能力。'},
	{inherit : 'therm',
        name: 'com_4',
        stem: '4. 我曾有過諮商男同志個案的經驗。'},
	{inherit : 'therm',
        name: 'com_5',
        stem: '5. 與異性戀個案相比，同志個案比較容易遭受到他們不喜歡的諮商處遇。'})
    );

	API.addPagesSet('basicPage',
	{
		//progressBar: '<%= pagesMeta.number %> out of 4',
		header: '性傾向諮商能力量表',
		headerStyle : {'font-size':'1em'},
		questions : {
			mixer : 'repeat',
			times : 5,
			data : [
				{inherit:{set:'comptence', type:'sequential'}}
			]
		},
		v1style:2,
		decline:false,
		numbered: false
	});

	// ### Sequence
	API.addSequence(
	[
		{inherit : 'basicPage'}
	]);

	

    return API.script;
});
