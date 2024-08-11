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
