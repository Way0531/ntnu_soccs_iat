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
			stem : '1'
		},
		{
			inherit : 'basicSelect',
			name : 'Beyonce',
			stem : '2'
		},
		{
			inherit : 'basicSelect',
			name : 'Colbert',
			stem : '3'
		},
		{
			inherit : 'basicSelect',
			name : 'Letterman',
			stem : '4'
		},
		{
			inherit : 'basicSelect',
			name : 'five',
			stem : '5'
		},
		{
			inherit : 'basicSelect',
			name : 'six',
			stem : '6'
		}
	]);

	// ### Pages
	// Shows all four questions, but the order is random.
	API.addPagesSet('basicPage',
	{
		//progressBar: '<%= pagesMeta.number %> out of 4',
		header: '基本資訊',
		headerStyle : {'font-size':'1em'},
		questions : {
			mixer : 'repeat',
			times : 6,
			data : [
				{inherit:{set:'people', type:'each'}}
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
