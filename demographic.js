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
			'正在全職實習中',
			'已完成全職實習，尚未考取諮商心理師執照',
			'諮商心理師（執業未滿1年）',
			'諮商心理師（執業1-5年）',
			'諮商心理師（執業6-10年）',
			'諮商心理師（10年以上）',]
		},
		{
			inherit : 'basicSelect',
			name : 'gender',
			stem : '性別',
			answers : [
			'男性',
			'女性',
			'其他',]
		},
		{
			inherit : 'basicSelect',
			name : 'sexuality',
			stem : '性傾向',
			answers : [
			'異性戀',
			'同性戀',
			'雙性戀',
			'其他',]
		},
		
	]);

	// ### Pages
	// Shows all four questions, but the order is random.
	API.addPagesSet('basicPage',
	{
		header: '基本資訊',
		headerStyle : {'font-size':'1em'},
		questions : {
			data : [
				{inherit:{set:'people', type:'first'}},
				{inherit:{set:'people', type:'second'}},
				{inherit:{set:'people', type:'third'}}
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

