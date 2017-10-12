
//console.log('hello from app.js');
// login with Fb
  window.fbAsyncInit = function() {
        FB.init({
            appId            : 'fb app id',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.10',
            status           : true
        });

        FB.getLoginStatus(function(response) {
            if(response.status === 'connected'){
                //we are connected
            }else if(response.status === 'not_authorized'){
                //not auth
            }else{
                //we are not logged in to facebook
            }


        });
       
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
