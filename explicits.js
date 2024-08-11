define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;

    // ### Questions
    API.addQuestionsSet('basicSelect', {
        type: 'selectOne',
        autoSubmit: false,
        numericValues: false,
        required: true, // 強制回答問題
        style: 'buttons',
        answers: [
            {stem: '非常不符合', value: 1},
            {stem: '不符合', value: 2},
            {stem: '有點不符合', value: 3},
            {stem: '普通', value: 4},
            {stem: '有點符合', value: 5},
            {stem: '符合', value: 6},
            {stem: '非常符合', value: 7}
        ],
        errorMsg: {required: "此題項為必填"}
    });

    API.addQuestionsSet('competence', [
        {inherit: 'basicSelect', name: 'com_1', stem: '1. 我已經具備足夠的臨床訓練與督導，可以提供同志個案諮商服務。'},
        {inherit: 'basicSelect', name: 'com_2', stem: '2. 同志個案的生活型態是不自然或不道德的。'},
        {inherit: 'basicSelect', name: 'com_3', stem: '3. 我透過諮詢、督導與繼續教育來檢視自己在同志諮商技巧上的效能與能力。'},
        {inherit: 'basicSelect', name: 'com_4', stem: '4. 我曾有過諮商男同志個案的經驗。'},
        {inherit: 'basicSelect', name: 'com_5', stem: '5. 與異性戀個案相比，同志個案比較容易遭受到他們不喜歡的諮商處遇。'},
        {inherit: 'basicSelect', name: 'com_6', stem: '6. 就我目前的專業發展，我覺得自己有能力、技巧與資格與同志個案進行諮商。'},
        {inherit: 'basicSelect', name: 'com_7', stem: '7. 我曾有過諮商女同志或男同志伴侶的經驗。'},
        {inherit: 'basicSelect', name: 'com_8', stem: '8. 我曾有過諮商女同志個案的經驗。'},
        {inherit: 'basicSelect', name: 'com_9', stem: '9. 我知道有些研究指出，同志個案比起異性戀個案，更容易被診斷為心理異常。'},
        {inherit: 'basicSelect', name: 'com_10', stem: '10. 顯而易見的是，兩個男人或是兩個女人之間的親密關係，不如一男一女間的親密關係來的穩定或是更具承諾。'},
        {inherit: 'basicSelect', name: 'com_11', stem: '11. 我認為同志個案應該努力地對於自身的性傾向保持低調。'},
        {inherit: 'basicSelect', name: 'com_12', stem: '12. 我曾參與過同志議題（諮商、心理學、心理衛生領域）的在職訓練、研討會或工作坊。'},
        {inherit: 'basicSelect', name: 'com_13', stem: '13. 異性戀主義者與帶有偏見的觀念已滲透在心理衛生專業中。'},
        {inherit: 'basicSelect', name: 'com_14', stem: '14. 在諮商情境中，我覺得我有能力評估同志的心理健康需求。'},
        {inherit: 'basicSelect', name: 'com_15', stem: '15. 我認為同志伴侶不需要特別的權利（同居伴侶全或婚姻權），因為這樣會破壞正常及傳統的家庭價值。'},
        {inherit: 'basicSelect', name: 'com_16', stem: '16. 影響男同志或女同志的心理、社會議題是不一樣的。'},
        {inherit: 'basicSelect', name: 'com_17', stem: '17. 如果我的個案能將異性戀生活是為理想的生活型態，那是最好不過的。'},
        {inherit: 'basicSelect', name: 'com_18', stem: '18. 我曾有過諮商雙性戀個案的經驗。'},
        {inherit: 'basicSelect', name: 'com_19', stem: '19. 我知道體制中有哪些障礙可能會阻礙同志使用心理衛生服務。'},
        {inherit: 'basicSelect', name: 'com_20', stem: '20. 我知道諮商師經常會把自己對於性的價值觀強加到同志個案身上。'},
        {inherit: 'basicSelect', name: 'com_21', stem: '21. 我認為我的個案應該在某些程度上服從傳統的性價值觀。'},
        {inherit: 'basicSelect', name: 'com_22', stem: '22. 如果我的個案是同志，我目前沒有具備足夠的技巧與訓練來進行個案報告或諮詢。'},
        {inherit: 'basicSelect', name: 'com_23', stem: '23. 我認為同志個案與一位認同傳統價值觀與規範的異性戀諮商師進行諮商，能使其受益最多。'},
        {inherit: 'basicSelect', name: 'com_24', stem: '24. 生為異性戀者在這個社會中佔有一定優勢。'},
        {inherit: 'basicSelect', name: 'com_25', stem: '25. 我覺得若要與同志個案進行有效能的諮商，諮商師與個案具有不同的性傾向，會是一開始的障礙。'},
        {inherit: 'basicSelect', name: 'com_26', stem: '26. 在同志議題的個案演練上，我曾扮演個案或諮商師。'},
        {inherit: 'basicSelect', name: 'com_27', stem: '27. 我認為同性戀是一種精神障礙或一種罪，且可透過諮商或靈性協助獲得療癒。'},
        {inherit: 'basicSelect', name: 'com_28', stem: '28. 我認為在有兒童的場合，同志個案必須對自身的性傾向保持低調。'},
        {inherit: 'basicSelect', name: 'com_29', stem: '29. 談到同志，我認同以下的說法：「厭惡或譴責那罪，但愛那些罪人。」'}
    ]);

    // ### Pages
    // Shows all questions, but the order is random.
    API.addPagesSet('basicPage', {
        header: '基本資訊',
        headerStyle: {'font-size': '1em'},
        questions: {
            mixer: 'repeat',
            times: 29,
            data: [
                {inherit: {set: 'competence', type: 'sequential'}}
            ]
        },
        v1style: 2,
        decline: false,
        numbered: false
    });

    // ### Sequence
    API.addSequence([
        {inherit: 'basicPage'}
    ]);

    /**
    Return the script to piquest's god, or something of that sort.
    **/
    return API.script;
});
