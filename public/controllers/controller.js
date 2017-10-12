//controller
function firstController($scope,$http){
    $scope.facebook={
        username:'',
        email:'',
        gender:''
    }
    $scope.message='';
    var c=document.getElementById('country')
   
    var s=document.getElementById('state')
    var ci=document.getElementById('city')
    
    $scope.countries = {

        'India':
         {
            'Maharashtra': [ 'Mumbai','Pune', 'Nagpur', 'Aurangabad','Thane'],
            'Madhya Pradesh': ['Gwalior','Indore', 'Bhopal', 'Jabalpur'],
            'Rajasthan': ['Jaipur', 'Ajmer', 'Jodhpur']
          },
        
                    'USA': {
                      'Alabama': ['Montgomery', 'Birmingham'],
                      'California': ['Sacramento', 'Fremont'],
                      'Illinois': ['Springfield', 'Chicago']
                    },
  
                    'Australia': {
                      'New South Wales': ['Sydney'],
                      'Victoria': ['Melbourne']
                    }
       };
       $scope.saveAddress=function(){
           if($scope.userId){
            if($scope.textAddress&&$scope.countrySrc&&$scope.stateSrc &&$scope.city){
                
              var country= c.options[c.selectedIndex].value;
              var state= s.options[s.selectedIndex].value; 
              var city= ci.options[ci.selectedIndex].value;
              var address={
                      userId:$scope.userId,
                      fullAddress:$scope.textAddress,
                      country:country,
                      state:state,
                      city:city
              }
                 $scope.message='';
                             
              $http.post('/', address).success(function(Response){
                  console.log(Response);    
              });
              //
              //$scope.getAddress();
             }else{
                 $scope.message='Fill all the fields of address first, then press save button'
             }   
           }else{
               $scope.message='First Login with FB, then save your address.'
           }
           
       } 
       $scope.getAddress=function(){
        if($scope.userId){
             const id = $scope.userId;
            //user is login and he can see the address if available
            $http.get('/' +id).success(function(response){
                console.log(response);
                $scope.fullAddress=response.fullAddress;
                $scope.country=response.country;
                $scope.state=response.state;
            //    $scope.cityIndex=response.city;
              //  $scope.city=$scope.countries.$scope.country.$scope.state[$scope.cityIndex]
            });
        }else{
            //user is not login
            $scope.message='You are not login. Please first login then get your address.'
        }
       }
       $scope.getCountry = function() {
         $scope.strCountry = $scope.countrySrc;
       };
        $scope.getState = function() {
           $scope.strState = $scope.stateSrc;
       };
    
       $scope.reloadPage=function(){
           location.reload()
       }



    $scope.loginWithFB=function(){
       console.log('you have logged in with FB')
       $scope.message='';

        FB.login(function(response){
            if(response.authResponse){
                FB.api('/me', 'GET',{fields:'email, first_name, name, id, picture, gender'}, function(response){
                    $scope.$apply(function(){
                        $scope.facebook.username=response.name;
                        $scope.facebook.email=response.email;
                        $scope.fb_image=response.picture.data.url;
                        $scope.facebook.gender=response.gender;
                        console.log(response.first_name);
                        console.log(response.id)
                        $scope.userId=response.id;
                    })
                })
            }else{
                // error not authorized

            }
        }, {
                scope:'email, user_likes',
                return_scopes:true
            }
        )
       
    }

}

