define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        {
            questions : {
                type: 'selectOne',
                style:'multiButtons',
                errorMsg: {
                    required: 'Please select an answer, or click \'decline to answer\''
                },
                
                name:'item1',
                stem : 'On the whole, I am satisfied with myself.',
                answers : ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
                
                name:'item2',
                stem : 'On the whole, I am satisfied with myself.',
                answers : ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree']
            }
        }
    ]);
    return API.script;
});
