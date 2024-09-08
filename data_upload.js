// 初始化數據處理管道
function init_data_pipe(t, e, n = false) {
    let a = n && n.file_type ? n.file_type.toLowerCase() : "json";
    let i = !!n && !!n.debug;
    let o = window.location.search;
    let s = new URLSearchParams(o);
    let r = n && n.params ? n.params : {};

    let l = Date.now().toString(16) + Math.floor(1e4 * Math.random()).toString(16);

    var d = t.getGlobal();
    d.sessionId = l;

    // 儲存所有階段數據的容器
    d.allData = [];

    // 初始化數據管道
    fetch("https://psych-studies.com/datapipe/" + (i ? "debug/" : "") + e.split("").map(t => t.charCodeAt(0)).reduce((t, e) => t + ((t << 7) + (t << 3)) ^ e).toString(16));

    t.addSettings("logger", {
        onRow: function(e, n, a, i) {
            if (e === t.script.name) {
                i.logs = [];
                i.type = "anonymous manager";
                return;
            }
            for (let o of (i.type = "task", n.sessionId = l, s.keys())) {
                n[o] = s.get(o);
            }
            for (let d in r) {
                n[d] = r[d];
            }
            i.logs = i.logs || [];
            i.logs.push(n);
        },
        onEnd: function(t, e, n) {
            console.log("Current stage logs:", n.logs); // 檢查每個階段的數據
            if (n.logs) {
                d.allData.push(n.logs);
            } else {
                console.warn("No logs found for this stage.");
            }
            return n.logs;
        },
        serialize: function(t, e, n, a) {
            return e;
        },
        send: function(n, i, o, s) {
            let r = "";
            let flattenedData = Array.isArray(d.allData) ? d.allData.flat() : d.allData; // 確保是多維陣列才進行展平
            if (a === "csv") {
                r = toCsv(pivot(flattenedData));
            } else if (a === "tsv") {
                r = toCsv(pivot(flattenedData), "\t");
            } else if (a === "json") {
                r = JSON.stringify(flattenedData);
            }

            if (!r || r.length === 0) {
                console.error("No data to upload"); // 確認有數據要上傳
                return;
            }

            console.log("Data to be uploaded:", r); // 檢查上傳的數據

            d.sent = false;
            fetch("https://pipe.jspsych.org/api/data/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify({
                    experimentID: e,
                    filename: "all_data_" + l + "." + a,
                    data: r
                })
            }).then(response => {
                if (response.ok) {
                    console.log("Data uploaded successfully");
                    d.sent = true;
                } else {
                    console.error("Upload failed with status:", response.status);
                }
            }).catch((error) => {
                console.error("Network error during upload:", error);
            });
        }
    });
}

// 生成上傳中的提示文本
function generate_uploading_text(t, e, n) {
    return "<%    wait4data();   function wait4data() {        if (document.getElementById('next_but') !== null && (global.sent === undefined || global.sent))            {return " + !!n + " ? document.getElementById('next_but').disabled = false :  document.getElementById('next_but').click();}        setTimeout(wait4data, 500);   }%>" +
        (t ? "<div class='panel panel-info' style='margin-top:1em'> <div class='panel-heading'> <h1 class='panel-title' style='font-size:2em'>" + t + " </h1></div>" : "") +
        (e ? "<div class='panel-body'> <p class='lead'>" + e + "</p>" : "") +
        ("<div class='text-center proceed' " + (n ? "" : "hidden") + " style='margin: 30px auto 10px;'><button pi-message-done type='button' " + (n ? "disabled" : "") + " id='next_but' class='btn btn-primary'>" + n + "</button></div>");
}

// 生成上傳任務的提示
function uploading_task(t = false) {
    let e = t && t.name ? t.name : "";
    let n = t && t.title ? t.title : "";
    let a = t && t.header ? t.header : "";
    let i = t && t.body ? t.body : "";
    let o = t && t.buttonText ? t.buttonText : "";
    return [{
        template: generate_uploading_text(a, i, o),
        title: n,
        name: e,
        type: "message" // 確保這裡的 type 是正確的
    }];
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
