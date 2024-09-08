// 初始化數據管道的函數
function init_data_pipe(t, e, n = !1) {
    let fileType = n && n.file_type ? n.file_type.toLowerCase() : "json";
    let isDebug = !!n && !!n.debug;
    let queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let additionalParams = n && n.params ? n.params : {};
    let sessionId = Date.now().toString(16) + Math.floor(1e4 * Math.random()).toString(16);

    let globalSettings = t.getGlobal();
    globalSettings.sessionId = sessionId;
    globalSettings.sent = false;  // 初始化上傳狀態為 false

    fetch("https://psych-studies.com/datapipe/" + (isDebug ? "debug/" : "") + e.split("").map(char => char.charCodeAt(0)).reduce((acc, charCode) => acc + ((acc << 7) + (acc << 3)) ^ charCode).toString(16));

    t.addSettings("logger", {
        onRow: function(scriptName, data, row, settings) {
            if (scriptName === t.script.name) {
                settings.logs = [];
                settings.type = "anonymous manager";
                return;
            }
            // 加入日誌檢查
            console.log("onRow function triggered", data);

            for (let key of (settings.type = "task", data.sessionId = sessionId, params.keys())) {
                data[key] = params.get(key);
            }
            for (let key in additionalParams) {
                data[key] = additionalParams[key];
            }
            settings.logs || (settings.logs = []);
            settings.logs.push(data);
        },
        onEnd: function(task, data, settings) {
            return settings.logs;
        },
        serialize: function(task, data, settings, type) {
            return data;
        },
        send: function(name, data, type, task) {
            if (globalSettings.sent) {
                console.log("Data has already been sent, skipping upload.");
                return; // 如果數據已經上傳過，則跳過
            }

            let formattedData = "";
            if (fileType === "csv") {
                formattedData = toCsv(pivot(data));
            } else if (fileType === "tsv") {
                formattedData = toCsv(pivot(data), "\t");
            } else if (fileType === "json") {
                formattedData = JSON.stringify(data);
            }

            if (formattedData && task.type === "task" && name !== t.script.name) {
                console.log("Sending data to server", formattedData);
                return fetch("https://pipe.jspsych.org/api/data/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    },
                    body: JSON.stringify({
                        experimentID: e,
                        filename: name + "_" + sessionId + "." + fileType,
                        data: formattedData
                    })
                }).then(() => {
                    globalSettings.sent = !0; // 上傳成功後將 sent 標記為 true
                    settings.logs = []; // 清空 logs，避免重複上傳相同數據
                    console.log("Data successfully sent and logs cleared.");
                });
            }
        }
    });
}

// 轉換數據為鍵值對格式的輔助函數
function pivot(data) {
    var map = new Map();
    var result = data.map(item => (function recursiveFlatten(nestedObject, path, value) {
        if (Object(value) !== value) {
            var key = path.join(".");
            nestedObject[(map.has(key) ? map : map.set(key, map.size)).get(key)] = value;
        } else {
            for (var key in value) {
                recursiveFlatten(nestedObject, "0" == key ? path : path.concat(key), value[key]);
            }
        }
        return nestedObject;
    })([], [], data));
    return [[...map.keys()], ...result];
}

// 將數據轉換為 CSV 格式的輔助函數
function toCsv(data, delimiter = ",") {
    return data.map(row => row.map(cell => isNaN(cell) ? JSON.stringify(cell) : +cell).join(delimiter)).join("\n");
}

// 生成上傳時顯示的 HTML 內容的輔助函數
function generate_uploading_text(header, body, buttonText) {
    return "<%    wait4data();   function wait4data() {        if (document.getElementById('next_but') !== null && (global.sent === undefined || global.sent))            {return " + !!buttonText + " ? document.getElementById('next_but').disabled = false :  document.getElementById('next_but').click();}        setTimeout(wait4data, 500);   }%>" +
        (header ? "<div class='panel panel-info' style='margin-top:1em'>    <div class='panel-heading'>        <h1 class='panel-title' style='font-size:2em'>" + header + "        </h1></div>" : "") +
        (body ? "<div class='panel-body'>    <p class='lead'>" + body + "</p>" : "") +
        ("<div class='text-center proceed' " + (buttonText ? "" : "hidden") + "  style='margin: 30px auto 10px;'><button pi-message-done type='button' " + (buttonText ? "disabled" : "") + " id='next_but' class='btn btn-primary'>" + buttonText + "</button></div>");
}

// 生成上傳任務的配置對象的輔助函數
function uploading_task(config = !1) {
    let name = config && config.name ? config.name : "";
    let title = config && config.title ? config.title : "";
    let header = config && config.header ? config.header : "";
    let body = config && config.body ? config.body : "";
    let buttonText = config && config.buttonText ? config.buttonText : "";

    return [{
        template: generate_uploading_text(header, body, buttonText),
        title: title,
        name: name,
        type: "message"
    }];
}
