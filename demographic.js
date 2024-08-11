define(['questAPI'], function(Quest){
	var API = new Quest();

	// ### Questions
	// 不再使用继承，直接定义每个问题的设置
	API.addQuestionsSet('people', [
		{
			type: 'selectOne',
			name: 'Obama',
			stem: 'Barack Obama',
			autoSubmit: false,
			numericValues: true,
			required: false,
			style: 'multiButtons',
			answers: [
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
		},
		{
			type: 'selectOne',
			name: 'Beyonce',
			stem: 'Beyonce Knowles',
			autoSubmit: false,
			numericValues: true,
			required: false,
			style: 'multiButtons',
			answers: [
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
		},
		{
			type: 'selectOne',
			name: 'Colbert',
			stem: 'Stephen Colbert',
			autoSubmit: false,
			numericValues: true,
			required: false,
			style: 'multiButtons',
			answers: [
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
		},
		{
			type: 'selectOne',
			name: 'Letterman',
			stem: 'David Letterman',
			autoSubmit: false,
			numericValues: true,
			required: false,
			style: 'multiButtons',
			answers: [
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
		}
	]);

	// ### Pages
	// 将所有问题按顺序显示在一个页面上
	API.addPagesSet('basicPage', {
		progressBar: '<%= pagesMeta.number %> out of 1',
		header: 'How positive or negative are your feelings toward the people listed below?',
		headerStyle: {'font-size':'1em'},
		questions: [
			{inherit: {set: 'people', name: 'Obama'}},
			{inherit: {set: 'people', name: 'Beyonce'}},
			{inherit: {set: 'people', name: 'Colbert'}},
			{inherit: {set: 'people', name: 'Letterman'}}
		],
		v1style: 2,
		decline: false,
		numbered: false
	});

	// ### Sequence
	// 显示页面的顺序
	API.addSequence([
		{inherit: 'basicPage'}
	]);

	// 返回脚本
	return API.script;
});
