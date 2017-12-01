
class CookieManager {

    constructor() {
    }

    setCookie(cname, cvalue, expDays) {
        console.log("CALL setCookie to "+ cvalue + "..old:" + this.getCookie(cname))
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 720000000));
        document.cookie = cname + "=" + cvalue + ";" + "expires=" + date.toUTCString() + ";";
        console.log("CALL setCookie to "+ cvalue + "..new:" + this.getCookie(cname))
    }
    
    getCookie(cname) {
        // console.log("CALL getCookie ..")
        let name = cname + "=";
        let decodedCookies = decodeURIComponent(document.cookie);
        let cookieSplit = decodedCookies.split(';');
        for(let i = 0; i < cookieSplit.length; i++) {
            while(cookieSplit[i].charAt(0) == ' ') {
                cookieSplit[i] = cookieSplit[i].substring(1);
            }
            if(cookieSplit[i].indexOf(name) == 0) {
                console.log("getCookie result ->" + cookieSplit[i].substring(name.length, cookieSplit[i].length))
                return cookieSplit[i].substring(name.length, cookieSplit[i].length)
            }
        }
        console.log("getCookie result ->" + cname + " Not found.")
        return ""
    }

    
}

export default CookieManager