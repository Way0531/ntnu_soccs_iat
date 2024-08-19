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
			inherit : 'basicSelect',
			name : 'first_time',
			stem : '請問這是否是您第一次參與本測驗？',
			answers : [
			'是',
			'否']
		},
		{
			type: 'selectOne',
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
			type:'dropdown', 
			inherit : 'basicSelect',
			name : 'age',
			stem : '請問您的年齡是？(以填表當天足歲計算）',
			answers : [
			'21','22','23','24','25','26','27','28','29','30',
			'31','32','33','34','35','36','37','38','39','40',
			'41','42','43','44','45','46','47','48','49','50',
			'51','52','53','54','55','56','57','58','59','60',
			'61','62','63','64','65','66','67','68','69','70',
			'71','72','73','74','75','76','77','78','79','80',
			'81','82','83','84','85','86','87','88','89','90',
			'91','92','93','94','95','96','97','98','99','100']
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
			stem : '請問您目前或最近一個執業登記/全職實習場域是？',
			answers : [
			'國小',
			'國中/高中',
			'大專院校',
			'社區機構',
			'醫院']
		},
		{
			type: 'dropdown',
			numericValues: true,
			inherit : 'basicSelect',
			name : 'job_age',
			stem : '請問您的執業年資為？（包含全職實習）',
			answers : [
			'1年（或未滿1年）','2年','3年','4年','5年','6年','7年','8年','9年','10年',
			'11年','12年','13年','14年','15年','16年','17年','18年','19年','20年',
			'21年','22年','23年','24年','25年','26年','27年','28年','29年','30年',
			'31年','32年','33年','34年','35年','36年','37年','38年','39年','40年',
			'41年','42年','43年','44年','45年','46年','47年','48年','49年','50年以上']
		},
		{
			type: 'selectOne',
			inherit : 'basicSelect',
			name : 'training',
			stem : '你問您是否曾於碩士班在學或是執業期間，參與過同志議題相關之課程或專業訓練？',
			answers : [
			'是','否']
		},
		{
			type: 'selectOne',
			numericValues: true,
			inherit : 'basicSelect',
			name : 'self_assessment',
			stem : '請問您認為自身目前提供同志諮商之專業勝任能力為何？',
			answers : [
			'1 - 非常不足','2 - 不足','3 - 有點不足','4 - 普通','5 - 有點足夠','6 - 足夠','7 - 非常足夠']
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
			times : 10,
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
