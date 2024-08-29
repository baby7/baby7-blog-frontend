export function judgeSpider() {
    const spiderUserAgentList= [
        'HeadlessChrome', 'Sogou web spider', 'BingPreview', 'baidu', 'Baiduspider', 'twitterbot', 'facebookexternalhit',
        'rogerbot', 'linkedinbot', 'embedly', 'quora link preview', 'showyoubot', 'outbrain', 'pinterest',
        'slackbot', 'vkShare', 'W3C_Validator', 'bingbot', 'Sosospider', 'Sogou Pic Spider', 'Googlebot',
        '360Spider', 'qihoobot', 'Googlebot-Mobile', 'Googlebot-Image', 'Mediapartners-Google', 'Adsbot-Google',
        'Feedfetcher-Google', 'Yahoo! Slurp', 'Yahoo! Slurp China', 'YoudaoBot', 'Sogou spider', 'Sogou web spider',
        'MSNBot', 'ia_archiver', 'Tomato Bot', 'Sogou web spider', 'soso', 'sogou', 'yahoo', 'sohu-search',
        'yodao', 'robozilla', 'msnbot', 'MJ12bot', 'NHN', 'Twiceler', 'FeedDemon', 'JikeSpider', 'Indy Library',
        'Alexa Toolbar', 'AskTbFXTV', 'AhrefsBot', 'CrawlDaddy', 'CoolpadWebkit', 'Java', 'Feedly',
        'UniversalFeedParser', 'ApacheBench', 'Microsoft URL Control', 'Swiftbot', 'ZmEu', 'oBot', 'jaunty',
        'Python-urllib', 'lightDeckReports Bot', 'YYSpider', 'DigExt', 'YisouSpider', 'HttpClient', 'MJ12bot',
        'heritrix', 'EasouSpider', 'LinkpadBot', 'Googlebot', 'Ezooms']
    let ua = navigator.userAgent;
    for (let i = 0; i < spiderUserAgentList.length; i++) {
        if (ua.indexOf(spiderUserAgentList[i]) > -1) {
            return true;
        }
    }
    return false;
}
