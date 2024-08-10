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
	});

	API.addQuestionsSet('people',
	[
		{
			inherit : 'basicSelect',
			name : 'job',
			stem : '職業',
      answers : [
			'1 - 正在全職實習中',
			'2 - 已完成全職實習，尚未考取諮商心理師執照',
			'3 - 諮商心理師（執業未滿1年）',
			'4 - 諮商心理師（執業1-5年）',
			'5 - 諮商心理師（執業6-10年）',
			'6 - 諮商心理師（10年以上）',
		]
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
	// Shows all four questions, but the order is random.
	API.addPagesSet('basicPage',
	{
		progressBar: '<%= pagesMeta.number %> out of 4',
		header: 'How positive or negative are your feelings toward the people listed below?',
		headerStyle : {'font-size':'1em'},
		questions : {
			mixer : 'repeat',
			times : 4,
			data : [
				{inherit:{set:'people', type:'exRandom'}}
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

