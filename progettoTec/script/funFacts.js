
        function getInfo(){
			var infoJSON;
			let request=new XMLHttpRequest();
			request.open("GET","https://random.dog/woof.json");
			request.send();
			
			request.onload=()=>{
				if(request.status==200){
					infoJSON=JSON.parse(request.response);
					console.log(infoJSON);
					disegnaAnimale(infoJSON);
				}else
				{
					console.log("errore");
				}
			}
		}
		getInfo();

        function disegnaAnimale(infoJSON){

            console.log(infoJSON.name);

            var img=document.getElementById("imgAnimale");
            img.setAttribute("src",infoJSON.url);

        }

    function refresh(){
        getInfo();
    }