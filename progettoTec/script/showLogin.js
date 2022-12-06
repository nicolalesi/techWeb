console.log(document.cookie);
var test=document.cookie;
console.log(test);
if(document.cookie){

    if(document.cookie=="null"){
        document.getElementById("login").style.display="block";
        document.getElementById("areaPersonale").style.display="none";
    }
    else {
        document.getElementById("login").style.display="none";
        document.getElementById("areaPersonale").style.display="block";
    }
}
else{
    document.getElementById("login").style.display="block";
    document.getElementById("areaPersonale").style.display="none";
}