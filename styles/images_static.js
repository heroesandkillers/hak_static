var s = "";
var imgUrl = org + "img/";
var pre = "{background-image:url(" + imgUrl;
var fin = ")}";

function css(nombre, url) {
    s += nombre + pre + url + fin;
}

css("footer", "interfaz/muroH.jpg");

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = s;
document.getElementsByTagName('head')[0].appendChild(style);
