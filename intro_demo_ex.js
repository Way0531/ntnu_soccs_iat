<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* 通用样式 */
        .custom-list {
            padding-left: 10px;
        }
        .custom-list ul {
            padding-left: 10px;
        }
        .panel-heading h1 {
            font-size: 2em;
        }
        .panel-body {
            font-size: 1.1em;
            line-height: 1.8;
        }
        .proceed button {
            width: auto;
            padding: 10px 20px;
        }

        /* 手机版样式 */
        @media (max-width: 768px) {
            .custom-list {
                padding-left: 5px;
            }
            .custom-list ul {
                padding-left: 5px;
            }
            .panel-heading h1 {
                font-size: 1.5em;
            }
            .panel-body {
                font-size: 0.9em;
                line-height: 1.6;
            }
            .proceed button {
                width: 100%;
                padding: 10px;
            }
        }

        /* 分页隐藏显示 */
        .page {
            display: none;
        }

        .page.active {
            display: block;
        }

        .nav-buttons {
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <!-- 第一页内容 -->
    <div id="page1" class="page active">
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
                    本研究旨在了解國內諮商心理師對於性傾向之內隱態度與諮商勝任能力的現況及關係。
                    <br/><br/>
                    <b>填答說明：</b><br/>
                    <ol class="custom-list">
                        <li>參與條件：
                            <ul>
                                <li>具備中華民國諮商心理師證照</li>
                                <li>就讀或畢業於國內相關研究所且已完成全職諮商實習</li>
                            </ul>
                        </li>
                        <li>填答時間約為15-20分鐘。</li>
                        <li>本研究全程皆為匿名填答，僅用於學術用途。</li>
                        <li>您可以隨時退出研究。</li>
                    </ol>
                </ol>
            </p>
        </div>
    </div>

    <!-- 第二页内容 -->
    <div id="page2" class="page">
        <div class="panel-body">
            <!-- 这里放置基本信息问卷 -->
            <form id="survey">
                <label for="first_time">1. 這是否是您第一次參與本測驗？</label>
                <select id="first_time" name="first_time">
                    <option value="是">是</option>
                    <option value="否">否</option>
                </select>
                <br/>
                <label for="gender">2. 您的生理性別是？</label>
                <select id="gender" name="gender">
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                    <option value="其他">其他</option>
                </select>
                <!-- 继续添加问卷问题 -->
            </form>
        </div>
    </div>

    <!-- 第三页内容 -->
    <div id="page3" class="page">
        <div class="panel-body">
            <p>此处是更多关于性倾向咨询胜任能力的自评问题。</p>
            <form id="competenceForm">
                <label for="com_01">1. 我接受過足夠的臨床訓練與督導，以服務男同性戀、女同性戀與雙性戀身份的個案。</label>
                <select id="com_01" name="com_01">
                    <option value="1">1 - 完全不認同</option>
                    <option value="7">7 - 完全認同</option>
                </select>
                <!-- 添加更多问题 -->
            </form>
        </div>
    </div>

    <!-- 分页导航按钮 -->
    <div class="nav-buttons">
        <button id="prevBtn" onclick="prevPage()">上一頁</button>
        <button id="nextBtn" onclick="nextPage()">下一頁</button>
    </div>

    <script>
        let currentPage = 1;
        const totalPages = 3;

        function showPage(page) {
            for (let i = 1; i <= totalPages; i++) {
                document.getElementById('page' + i).classList.remove('active');
            }
            document.getElementById('page' + page).classList.add('active');
        }

        function nextPage() {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        }

        // 初始化时显示第一页
        showPage(currentPage);
    </script>

</body>
</html>

