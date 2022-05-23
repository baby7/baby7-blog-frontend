// 获取系统和版本信息
export function getSystem() {
    // 首先判断win11
    navigator.userAgentData.getHighEntropyValues(["platformVersion"])
        .then(ua => {
            if (navigator.userAgentData.platform === "Windows") {
                const majorPlatformVersion = parseInt(ua.platformVersion.split('.')[0]);
                if (majorPlatformVersion >= 13) {
                    return "Windows 11";
                }
                else if (majorPlatformVersion > 0) {
                    return "Windows 10";
                }
            }
            return getOtherSystem()
        });
}

export function getOtherSystem() {
    let sUserAgent = navigator.userAgent;
    let isWin = (navigator.platform === "Win32") || (navigator.platform === "Windows");
    let isMac = (navigator.platform === "Mac68K") || (navigator.platform === "MacPPC") || (navigator.platform === "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    let isUnix = (navigator.platform === "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    let isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    let bIsAndroid = sUserAgent.toLowerCase().match(/android/i) === "android";
    if (isLinux) {
        if(bIsAndroid) return "Android";
        else return "Linux";
    }
    if (isWin) {
        let isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Windows 2000";
        let isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1
        sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "Windows XP";
        let isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Windows 2003";
        let isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "Windows Vista";
        let isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Windows 7";
        let isWin8 = sUserAgent.indexOf("windows nt6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
        if (isWin8) return "Windows 8";
        let isWin10 = sUserAgent.indexOf("Windows NT 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) return "Windows 10";
    }
    if (sUserAgent.indexOf("android") > -1) return "Android"
    if (sUserAgent.indexOf("iphone") > -1) return "iPhone"
    if (sUserAgent.indexOf("ipad") > -1) return "iPad"
    if (sUserAgent.indexOf("windows phone") > -1) return "Windows Phone"
    if (sUserAgent.indexOf("symbianos") > -1) return "SymbianOS"
    // 判断不了的直接放user-agent
    return sUserAgent;
}

// 获取浏览器信息
export function getBrowser() {
    var agent = navigator.userAgent.toLowerCase() ;
    var regStr_ie = /msie [\d.]+;/gi ;
    var regStr_ff = /firefox\/[\d.]+/gi
    var regStr_chrome = /chrome\/[\d.]+/gi ;
    var regStr_saf = /safari\/[\d.]+/gi ;
    //IE
    if(agent.indexOf("msie") > 0) {
        return ""+agent.match(regStr_ie);
    }
    //firefox
    if(agent.indexOf("firefox") > 0){
        return ""+agent.match(regStr_ff) ;
    }
    //Chrome
    if(agent.indexOf("chrome") > 0) {
        return ""+agent.match(regStr_chrome);
    }
    //Safari
    if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
        return ""+agent.match(regStr_saf);
    }
}

// 获取搜索引擎和关键词
export function getSE() {
    var eg = [];
    eg.push(['baidu', 'wd']);
    eg.push(['google', 'q']);
    eg.push(['soso', 'w']);
    eg.push(['yodao', 'q']);
    eg.push(['bing', 'q']);
    eg.push(['yahoo', 'q']);
    eg.push(['sogou', 'query']);
    eg.push(['gougou', 'search']);
    eg.push(['360', 'q']);
    var dq = getDomainQuery(document.referrer);
    var keyword=null;
    var str=null;
    for(var el in eg){
        var s = eg[el];
        var DandQ=String(s).split(","); //字符分割
        if (dq[0].indexOf(DandQ[0])>0){
            str = dq[1].match(DandQ[1]+'\\=.*\\&');
            keyword = str.toString().split("=")[1].split("&")[0];
            keyword = decodeURIComponent(keyword);
            return [dq[0], keyword];
        }
    }
    return document.referrer;
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
