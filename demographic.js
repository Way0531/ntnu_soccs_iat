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
			name : 'Obama',
			stem : 'Barack Obama'
		},
		{
			inherit : 'basicSelect',
			name : 'Beyonce',
			stem : 'Beyonce Knowles'
		},
		{
			inherit : 'basicSelect',
			name : 'Colbert',
			stem : 'Stephen Colbert'
		},
		{
			inherit : 'basicSelect',
			name : 'Letterman',
			stem : 'David Letterman'
		}
	]);

	// ### Pages
	// Shows all four questions in a fixed order.
	API.addPagesSet('basicPage',
	{
		progressBar: '<%= pagesMeta.number %> out of 4',
		header: 'How positive or negative are your feelings toward the people listed below?',
		headerStyle : {'font-size':'1em'},
		questions : {
			data : [
				{inherit:{set:'people', index:0}}, // Barack Obama
				{inherit:{set:'people', index:1}}, // Beyonce Knowles
				{inherit:{set:'people', index:2}}, // Stephen Colbert
				{inherit:{set:'people', index:3}}  // David Letterman
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
