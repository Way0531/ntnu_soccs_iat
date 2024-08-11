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
			stem : '請問您的身份是？',
			answers : [
			'正在進行全職實習',
			'已完成全職實習，尚未考取諮商心理師執照',
			'諮商心理師']
		},
		{
			inherit : 'basicSelect',
			name : 'gender',
			stem : '請問您的性別是？',
			answers : [
			'男性',
			'女性',
			'其他']
		},
		{
			inherit : 'basicSelect',
			name : 'sexuality',
			stem : '請問您的性傾向是？',
			answers : [
			'異性戀',
			'同性戀',
			'雙性戀',
			'其他']
		},
		{
			inherit : 'basicSelect',
			name : 'age',
			stem : '請問您的年齡是？',
			answers : [
			'21-30歲',
			'31-40歲',
			'41-50歲',
			'51-60歲',
			'61歲以上']
		},
		{
			inherit : 'basicSelect',
			name : 'religion',
			stem : '請問您是否有宗教信仰？',
			answers : [
			'無信仰',
			'基督教',
			'天主教',
			'佛教',
			'道教',
			'伊斯蘭教',
			'其他宗教']
		},
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
			times : 4,
			data : [
				{inherit:{set:'people', type:'sequential'}}
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
