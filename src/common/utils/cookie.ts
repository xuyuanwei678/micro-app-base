/*
 * @Author: BlackJoken
 * @Date: 2022-04-06 11:19:16
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-04-06 11:57:02
 */
//封装获取cookie
function getCookie(name: String) {
    console.log(name)
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
        return (arr[2]);
    }
    else
        return null;
}




//封装设置cookie
function setCookie(c_name: String, value: any, expiredays: any) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};


//封装删除cookie 
function delCookie(name: string) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

export {
    getCookie,
    setCookie,
    delCookie,
}