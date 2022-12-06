
    function eliminaAccount(){


        var settings = {
                "url": "http://localhost:3000/utenti/"+document.cookie,
                "method": "DELETE",
                "timeout": 0,
                "headers": {
                "Content-Type": "application/json"
                }
            };

            $.ajax(settings).done(function (response) {
            console.log(response);
            document.cookie="null";
            window.alert("Account eliminato");
            window.location.href="Home.html";
        });
   

    }