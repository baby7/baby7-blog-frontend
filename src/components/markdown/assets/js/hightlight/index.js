//hljs体积过大，多数为解决代码高亮显示的问题,所以只引入部分语言，如果需要可自行加载

import hljs from './highlight'

import javascript from './languages/javascript'
import java from './languages/java';
import json from './languages/json';
import bash from './languages/bash';
import css from './languages/css';
import cpp from './languages/cpp';
import dockerfile from './languages/dockerfile';
import less from './languages/less';
import lua from './languages/lua';
import markdown from './languages/markdown';
import matlab from './languages/matlab';
import python from './languages/python';
import scala from './languages/scala';
import scss from './languages/scss';
import shell from './languages/shell';
import sql from './languages/sql';
import xml from './languages/xml';
import yaml from './languages/yaml';
import autohotkey from './languages/autohotkey';
import auto from './languages/autoit';

const languages = {
    javascript,
    java,
    json,
    bash,
    css,
    cpp,
    dockerfile,
    less,
    lua,
    markdown,
    matlab,
    python,
    scala,
    scss,
    shell,
    sql,
    xml,
    yaml,
    autohotkey,
    auto
}
Object.keys(languages).forEach(key => {
    hljs.registerLanguage(key, languages[key])
})

export default hljs;
