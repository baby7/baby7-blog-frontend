// 获取系统和版本信息
export function getSystem(callback, message, browserInfo) {
    // 首先判断win11
    navigator.userAgentData.getHighEntropyValues(["platformVersion"])
        .then(ua => {
            message['system'] = browserInfo.os;                     // 操作系统
            message['systemVersion'] = browserInfo.osVersion;       // 操作系统版本
            message['device'] = browserInfo.device;                 // 设备,电脑还是手机
            message['language'] = browserInfo.language;             // 语言
            message['engine'] = browserInfo.engine;                 // 内核
            message['browser'] = browserInfo.browser;               // 浏览器
            message['browserVersion'] = browserInfo.version;        // 浏览器版本
            message['userAgent'] = navigator.userAgent;             // User-Agent
            let userAgent = navigator.userAgent;
            // 判断ZhihuHybrid是否在userAgent中
            if (userAgent.includes("ZhihuHybrid")) {
                message['browser'] = "Zhihu";
                message['browserVersion'] = "1.0";
            }
            if (navigator.userAgentData.platform === "Windows") {
                const majorPlatformVersion = parseInt(ua.platformVersion.split('.')[0]);
                if (majorPlatformVersion >= 13) {
                    message['system'] = "Windows"
                    message['systemVersion'] = "11"
                }
                callback(message).then()
                return;
            }
            callback(message).then()
        });
}

export function getOtherSystem() {
    let sUserAgent = navigator.userAgent;
    let isWin = (navigator.platform === "Win32") || (navigator.platform === "Windows");
    let isMac = (navigator.platform === "Mac68K") || (navigator.platform === "MacPPC") || (navigator.platform === "Macintosh") || (navigator.platform === "MacIntel");
    if (isMac) return "Mac";
    let isUnix = (navigator.platform === "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    let isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) {
        if (sUserAgent.includes("android")) return "Android";
        else return "Linux";
    }
    if (isWin) {
        const winVersions = [
            { version: "Windows 11", index: "Windows NT 10.0; Win64; x64" },
            { version: "Windows 10", index: "Windows NT 10.0" },
            { version: "Windows 8", index: "windows nt6.2" },
            { version: "Windows 7", index: "Windows NT 6.1" },
            { version: "Windows Vista", index: "Windows NT 6.0" },
            { version: "Windows XP", index: "Windows NT 5.1" },
            { version: "Windows 2003", index: "Windows NT 5.2" },
            { version: "Windows 2000", index: "Windows NT 5.0" },
        ];
        for (const { version, index } of winVersions) {
            if (sUserAgent.includes(index)) {
                return version;
            }
        }
    }
    if (sUserAgent.includes("android")) return "Android";
    if (sUserAgent.includes("iphone")) return "iPhone";
    if (sUserAgent.includes("ipad")) return "iPad";
    if (sUserAgent.includes("windows phone")) return "Windows Phone";
    if (sUserAgent.includes("symbianos")) return "SymbianOS";

    // 判断不了的直接放user-agent
    return sUserAgent;
}


// 获取浏览器信息
export function getBrowser() {
    const agent = navigator.userAgent.toLowerCase();
    // 定义浏览器类型及其对应的正则表达式
    const browsers = [
        { name: 'IE', regex: /msie\s([\d.]+)/i },
        { name: 'Firefox', regex: /firefox\/([\d.]+)/i },
        { name: 'Safari', regex: /version\/([\d.]+).*(safari)/i },
        { name: 'Edge', regex: /edg\/([\d.]+)/i },
        { name: 'Chrome', regex: /chrome\/([\d.]+)/i }
    ];
    // 匹配浏览器类型
    for (const browser of browsers) {
        const match = agent.match(browser.regex);
        if (match) {
            return `${browser.name} ${match[1]}`;
        }
    }
    // 其他浏览器
    return "其他";
}




// 获取搜索引擎和关键词
export function getSE() {
    // var eg = [];
    // eg.push(['baidu', 'wd']);
    // eg.push(['google', 'q']);
    // eg.push(['soso', 'w']);
    // eg.push(['yodao', 'q']);
    // eg.push(['bing', 'q']);
    // eg.push(['yahoo', 'q']);
    // eg.push(['sogou', 'query']);
    // eg.push(['gougou', 'search']);
    // eg.push(['360', 'q']);
    // console.log(document.referrer)
    // var dq = getDomainQuery(document.referrer);
    // var keyword=null;
    // var str=null;
    // for(var el in eg){
    //     var s = eg[el];
    //     var DandQ=String(s).split(","); //字符分割
    //     if (dq[0].indexOf(DandQ[0])>0){
    //         str = dq[1].match(DandQ[1]+'\\=.*\\&');
    //         keyword = str.toString().split("=")[1].split("&")[0];
    //         keyword = decodeURIComponent(keyword);
    //         return [dq[0], keyword];
    //     }
    // }
    return [document.referrer, null];
}

export function getDomainQuery(url) {
    var d = [];
    var st = url.indexOf('//', 1);
    var _domain = url.substring(st + 1, url.length);
    var et = _domain.indexOf('/', 1);
    d.push(_domain.substring(1, et));
    d.push(_domain.substring(et + 1, url.length));
    return d
}
