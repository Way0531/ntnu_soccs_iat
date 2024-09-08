define(['questAPI'], function(Quest){
    var API = new Quest();

    // ### Pages Set
    // 第一頁：顯示HTML表單
    API.addPagesSet('introPage',
    {
        noSubmit: true,
        v1style: 2,
        numbered: false,
        decline: false,
        questions: [
            {
                type: 'html',
                name: 'intro_html',
                html: `
                <div class="panel panel-info" style="margin-top:1em">
                    <div class="panel-heading">
                        <h1 class="panel-title">
                            心理師性傾向內隱態度與性傾向諮商勝任能力相關研究
                        </h1>
                    </div>
                </div>

                <div class="panel-body">
                    <p class='lead'>
                        <ol>
                            您好：<br/><br/>
                感謝您抽空參與本研究！<br/>
                我是國立臺灣師範大學教育心理與輔導學系碩士班的研究生林威宇，目前在喬虹助理教授的指導下，進行個人碩士論文研究。<br/>
                本研究旨在了解在國內諮商心理師對於性傾向之內隱態度與與性傾向諮商勝任能力之現況，以及兩者間的關係。<br/>
                正式開始填答前，請務必詳閱以下填答說明。<br/><br/>

                <b>填答說明：</b><br/>
                <ol class="custom-list">
                    <b><li>參與條件（符合以下<font color="#1c69ed"><u>任一條件</u></font>即為本研究之研究對象）：
                        <ul>
                            <li><font color="#1c69ed">具備中華民國諮商心理師證照</font>者。</li>
                            <li>就讀或畢業於國內諮商輔導相關研究所，且<font color="#1c69ed">已完成全職諮商實習</font>，尚未考取諮商心理師證照者。</li>
                            <li>就讀於國內諮商輔導相關研究所，且<font color="#1c69ed">正在進行全職諮商實習</font>者。</li>
                        </ul>
                    </li>
                    <li>填答時間約為<font color="#1c69ed">15-20分鐘</font>，並<font color="#1c69ed">建議使用電腦填答</font>，由於當中包含自陳式量表與內隱聯結測驗部分，需要較高之專注力，故請確保填答過程不會受到過多外在環境因素干擾。</li>
                    <li>本研究全程皆為為匿名填答，所獲得之資訊僅用於學術使用，內容將全數保密，並在研究完成後全數銷毀。</li>
                    <li>您是完全自願參與本研究的，在填答過程中若有任何不適，您有權隨時關閉視窗並退出本研究。</li></b>
                </ol>
                <br/>
                為感謝您的參與，待本研究完成後將從所有完整填答的參與者中，抽出20名贈送100元超商禮卷作為回饋，欲參與回饋抽獎者請務必在最後跳轉之頁面留下您的e-mail，以避免您的權益受損。<br/><br/>
                如有任何問題，請不吝來信聯絡<br/>
                指導教授：喬虹 助理教授<br/>
                研究生：林威宇<br/>
                e-mail：61001030e@gapps.ntnu.edu.tw<br/>
                        </ol>
                    </p>
                    <div class="text-center proceed" style="margin: 30px auto 10px;">
                        <button pi-message-done type="button" class="btn btn-primary">
                            同意並開始填答
                        </button>
                    </div>
                </div>
                `
            }
        ]
    });

    // ### Questions Set
    API.addQuestionsSet('basicSelect', {
        autoSubmit: false,
        numericValues: false,
        required: true,
        style: 'multiButtons',
        errorMsg: { required: "此題項為必填" }
    });

    API.addQuestionsSet('people', [
        // 問題集的具體內容，與你提供的相同
        {
			type: 'selectOne',
			inherit : 'basicSelect',
			name : 'first_time',
			stem : '1. 這是否是您第一次參與本測驗？',
			answers : [
			'是',
			'否']
		},
		{
			type: 'selectOne',
			inherit : 'basicSelect',
			name : 'gender',
			stem : '2. 您的生理性別是？',
			answers : [
			'男性',
			'女性',
			'其他']
		},
		{
			type: 'selectOne',
			inherit : 'basicSelect',
			name : 'sexuality',
			stem : '3. 您的性傾向是？',
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
			stem : '4. 您的年齡是？<br><span style="color:gray; font-size:0.8em;">以填表當天足歲計算</span>',
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
			stem : '5. 您的宗教信仰是？',
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
			stem : '6. 您目前的現職是？',
			answers : [
			'諮商心理師',
			'已完成全職實習，尚未考取諮商心理師執照',
			'正在進行全職實習',
			]
		},
		{
			type: 'selectOne',
			inherit : 'basicSelect',
			name : 'job_place',
			stem : '7. 您主要的服務場域是？<br><span style="color:gray; font-size:0.8em;">若為尚未考取諮商心理師執照者，請填寫全職實習場域</span>',
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
			stem : '8. 您的服務年資為？（含全職實習）<br><span style="color:gray; font-size:0.8em;">例如：已完成全職實習而尚未考取諮商心理師執照者請填「1年」，已完成全職實習、考取諮商心理師並已執業1年者請填「2年」</span>',
			answers : [
			'1年（或未滿1年）','2年','3年','4年','5年','6年','7年','8年','9年','10年',
			'11年','12年','13年','14年','15年','16年','17年','18年','19年','20年',
			'21年','22年','23年','24年','25年','26年','27年','28年','29年','30年',
			'31年','32年','33年','34年','35年','36年','37年','38年','39年','40年',
			'41年','42年','43年','44年','45年','46年','47年','48年','49年','50年以上']
		},
		{
			type: 'dropdown',
			numericValues: true,
			inherit : 'basicSelect',
			name : 'lgb_friends',
			stem : '9. 您大約有幾位同志朋友？<br><span style="color:gray; font-size:0.8em;">在此題項之「同志」意指LGB身份者（女同性戀、男同性戀、雙性戀）</span>',
			answers : [
			'0','1','2','3','4','5','6','7','8','9','10位以上','不知道']
		},
		{
			type: 'dropdown',
			numericValues: true,
			inherit : 'basicSelect',
			name : 'lgb_friends',
			stem : '10. 您大約與幾位同志個案進行過諮商服務？<br><span style="color:gray; font-size:0.8em;">在此題項之「同志」意指LGB身份者（女同性戀、男同性戀、雙性戀）</span>',
			answers : [
			'0','1','2','3','4','5','6','7','8','9','10位以上','不知道']
		},
		{
			type: 'selectOne',
			inherit : 'basicSelect',
			name : 'training',
			stem : '11. 您是否曾於碩士班在學或是執業期間，參與過同志議題相關之課程或專業訓練？',
			answers : [
			'是','否']
		},
		{
			type: 'selectOne',
			numericValues: true,
			inherit : 'basicSelect',
			name : 'self_assessment',
			stem : '12. 您認為自身目前提供同志諮商之專業勝任能力為何？',
			answers : [
			'1 - 非常不足','2','3','4','5','6','7 - 非常足夠']
		},
    ]);

    // ### 第二頁：顯示問題集
    API.addPagesSet('questionsPage', {
        header: '基本資訊',
        headerStyle: { 'font-size': '1em' },
        questions: {
            mixer: 'repeat',
            times: 12,
            data: [{ inherit: { set: 'people', type: 'sequential' } }]
        },
        v1style: 2,
        decline: false,
        numbered: false
    });

    // ### Sequence
    API.addSequence([
        { inherit: 'introPage' },    // 第一頁：顯示 HTML 表單
        { inherit: 'questionsPage' } // 第二頁：顯示問題集
    ]);

    // 回傳 API 腳本
    return API.script;
});
