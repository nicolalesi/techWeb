function getInfo(){
    var infoJSON;
    let request=new XMLHttpRequest();
    request.open("GET","https://meowfacts.herokuapp.com/");
    request.send();
    
    request.onload=()=>{
        if(request.status==200){
            infoJSON=JSON.parse(request.response);
            console.log(infoJSON);
            scriviInfo(infoJSON);
            disegnaAnimale();
        }else
        {
            console.log("errore");
        }
    }

}

getInfo();

function scriviInfo(infoJSON){
    var p=document.getElementById("informazioni");
    p.innerHTML=infoJSON.data[0];

}

function disegnaAnimale(){

var img=document.getElementById("imgAnimale");
img.setAttribute("src","https://cataas.com/cat");

}

function refresh(){
    window.location.reload();
}

