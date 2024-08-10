define(['questAPI'], function(Quest){
	var API = new Quest();

	// ### Questions
	API.addQuestionsSet('basicSelect',
	{
		type: 'selectOne',
		autoSubmit:false,
		numericValues:true,
		required:false,
		style:'multiButtons',
		answers : [
			'1 - Extremely negative',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9 - Extremely positive'
		]
	});

	API.addQuestionsSet('people',
	[
		{
			inherit : 'basicSelect',
			name : 'one',
			stem : '1'
		},
		{
			inherit : 'basicSelect',
			name : 'two',
			stem : '2'
		},
		{
			inherit : 'basicSelect',
			name : 'three',
			stem : '3'
		},
		{
			inherit : 'basicSelect',
			name : 'four',
			stem : '4'
		}
	]);

	// ### Pages
	// Shows all four questions, but the order is random.
	API.addPagesSet('basicPage',
	{
		//progressBar: '<%= pagesMeta.number %> out of 4',
		header: 'How positive or negative are your feelings toward the people listed below?',
		headerStyle : {'font-size':'1em'},
		questions : {
			//mixer : 'repeat',
			//times : 4,
			data : [
				//{inherit:{set:'people', type:'exRandom'}}
				{inherit:'one'},
				{inherit:'two'},
				{inherit:'three'}
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

	/**
	Return the script to piquest's god, or something of that sort.
	**/
	return API.script;
});
