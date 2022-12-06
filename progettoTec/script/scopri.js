
        var  animalsInfo;

        function getInfo(){
			
            $.ajax({
                method: 'GET',
                url: 'https://api.api-ninjas.com/v1/animals?name=a',
                headers: { 'X-Api-Key': '6cuPFxMPEbTL/peOvztdzA==QKgsunYVjTstv41x'},
                contentType: 'application/json',
                success: function(result) {
                    console.log(result);
                    animalsInfo=result;
                    disegnaAnimale();
                },
                error: function ajaxError(jqXHR) {
                    console.error('Error: ', jqXHR.responseText);
                }
            });
		}
		getInfo();

        function disegnaAnimale(){

            var random=Math.floor(Math.random() * animalsInfo.length);


            infoJSON=animalsInfo[random];

            console.log(infoJSON.characteristics);
            var stringa=JSON.stringify(infoJSON.characteristics);
            var spl = stringa.split('",');
            console.log(spl);

            var div=document.getElementById("informazioni");
            div.innerHTML='';

            var nome=document.createElement("p");
            nome.innerHTML='"Name" : "'+infoJSON.name+'",';
            div.appendChild(nome);
            /*
            p.innerHTML=" <b> Name : </b> "+infoJSON.name;
            p.innerHTML+="<br/> <b> Color : </b> "+infoJSON.characteristics.color;
            p.innerHTML+="<br/> <b> Common name : </b> "+infoJSON.characteristics.common_name;
            p.innerHTML+="<br/> <b> Diet : </b> "+infoJSON.characteristics.diet;
            p.innerHTML+="<br/> <b> Length : </b>"+infoJSON.length;
            p.innerHTML+="<br/> <b> Lifespan : </b> "+infoJSON.lifespan;
            p.innerHTML+="<br/> <b> Litter Size : </b>"+infoJSON.litter_size;*/

            var j=0;

            for(let i=1;i<spl.length-1;i++){
                
                var p=document.createElement("p");
                p.innerHTML=spl[i]+'",';
               /* console.log(j);
                if(j>=4){
                    p.innerHTML+=spl[i]+'<br/>';
                    j=1;
                }
                else{
                    p.innerHTML+=spl[i];
                    j++;
                }*/

                console.log(spl[i]);
                spl[i].replace('"', "");
                div.appendChild(p);
                
            }

            
            var img=document.getElementById("imgAnimale");
            img.setAttribute("src",infoJSON.image_link);

        }

    function refresh(){
        disegnaAnimale();
    }