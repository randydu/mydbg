'use strict'


const levels = ['trace','info','warn','err','fatal'];

/**  parse environment variable DEBUG
 * 
 * xxx.trace+ => xxx.trace,xxx.info,xxx.warn,xxx.err,xxx.fatal 
 * xxx.info+ => xxx.info,xxx.warn,xxx.err,xxx.fatal 
 * xxx.warn+ => xxx.warn,xxx.err,xxx.fatal 
 * xxx.err+ => xxx.err,xxx.fatal 
 * xxx.fatal+ => xxx.fatal 
 */
(function (str){
    function get_replace_str(matched, level){
        let xxx_dot = matched.substring(0, matched.length - level.length-1); //including "."
        let i = levels.indexOf(level);
        return levels.slice(i).map(level => `${xxx_dot}${level}`).join();
    }

    if(str != ''){
        let pats = []
        levels.forEach( level => {
            pats.push(new RegExp(`[a-zA-Z0-9\*]*\.${level}\\+`));
        })

        for(let i = 0; i < levels.length; i++){
            let level = levels[i];
            let pat = pats[i];

            let my_str = pat.exec(str);
            while(my_str != null && my_str.length > 0){
                str = str.replace(my_str, get_replace_str(my_str[0], level));
                my_str = pat.exec(str);
            }
        }

        process.env.DEBUG = str;
    }
})(process.env.DEBUG)

module.exports = (name)=>{
    const dbg = require('debug');

    let result = {
        throw_error(msg){
            this.err(msg);
            throw new Error(msg);
        }
    }

    levels.forEach(level => {
        result[level] = dbg(`${name}.${level}`);
    });

    return result;
}