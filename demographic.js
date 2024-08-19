define(['questAPI'], function(Quest){
	var API = new Quest();

	// ### Questions
	API.addQuestionsSet('basicSelect',
	{
		autoSubmit:false,
		numericValues:false,
		required:true, //強制回答問題
		style:'multiButtons',
		errorMsg: {required: "此題項為必填"}
	});

	API.addQuestionsSet('people',
	[
		{
			type: 'selectOne',
			width: 40,
			inherit : 'basicSelect',
			name : 'gender',
			stem : '請問您的生理性別是？',
			answers : [
			'男性',
			'女性',
			'其他']
		},
		{
			type: 'selectOne',
			inherit : 'basicSelect',
			name : 'sexuality',
			stem : '請問您自身的性傾向認同是？',
			answers : [
			'異性戀',
			'同性戀',
			'雙性戀',
			'其他']
		},
		{
			type: 'textnumber',
			inherit : 'basicSelect',
			name : 'age',
			stem : '請問您的年齡是？',
			min:18,
			max:100,
			/*answers : [
			'21-30歲',
			'31-40歲',
			'41-50歲',
			'51-60歲',
			'61歲以上']*/
			errorMsg: {required: "請以半形阿拉伯數字輸入"}
		},
		{
			type: 'selectOne',
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
		{
			type: 'selectOne',
			inherit : 'basicSelect',
			name : 'job',
			stem : '請問您目前的身份是？',
			answers : [
			'正在進行全職實習',
			'已完成全職實習，尚未考取諮商心理師執照',
			'諮商心理師']
		},
		{
			type: 'selectOne',
			inherit : 'basicSelect',
			name : 'job_place',
			stem : '請問您目前的執業登記/全職實習場域是？',
			answers : [
			'國小',
			'國中/高中',
			'大專院校',
			'社區機構',
			'醫院']
		},
		{
			type: 'textnumber',
			inherit : 'basicSelect',
			name : 'job_age',
			stem : '請問您的執業年資為？（包含全職實習，未滿1年者請輸入1年）',
			min:1,
			max:80,
			/*answers : [
			'未滿1年',
			'1-5年',
			'6-10年',
			'11-15年',
			'16-20年',
			'21年以上']*/
			errorMsg: {required: "請以半形阿拉伯數字輸入"}
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
			times : 7,
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
