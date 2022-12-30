document.addEventListener("DOMContentLoaded", function(event) {
//Everything will be for working with contacts
var baseUrl = OC.generateUrl('/apps/sciencemesh');
//$('#test').hide(); 
$.ajax({
    url: baseUrl + '/contacts/users',
    type: 'GET',
    contentType: 'application/json',
}).done(function (response) {

    var headerElement = document.getElementById("message");
    let token = JSON.parse(response);
    if(response === '' || response === false || token['accepted_users'] === undefined) {
        headerElement.innerHTML= 'No Reva Contact';
        //$('#test').show(); 
    } else {
        headerElement.innerHTML= 'Reva Contacts';

    for(tokenData in token) {
        if(token.hasOwnProperty(tokenData)) {
            console.log(tokenData);
            if(tokenData === 'accepted_users') {
                let accepted_users = token.accepted_users
                for(accept in accepted_users) {
                    const displayName = accepted_users[accept].display_name;
                    const username = accepted_users[accept].id.opaque_id;
                    const idp = accepted_users[accept].id.idp;
                    const provider = new URL(idp).host;
                    const result = `
                            <div href="#" class="app-content-list-item profile-item">
                                <div class="app-content-list-item-icon" style="">
                                    <img src="https://cdn-icons-png.flaticon.com/512/16/16363.png">
                                </div>
                                <div class="app-content-list-item-line-one" id="show_result" >
                                    <p class="displayname">${displayName}</p><p class="username-provider">${username}@${provider}</p>
                                </div>  
                            </div>`;                  
                    var element = document.getElementById("test");
                    element.innerHTML = result;
                }
                $('#test').show();
            }else{
                const result = `
                        <div href="#" class="app-content-list-item profile-item" >
                            <div class="app-content-list-item-icon" style="">
                            </div> 
                            <div class="app-content-list-item-line-one" id="show_result" >
                                <p class="username-provider">There're no contacts!</p>
                            </div>  
                        </div>`;                  
                var element = document.getElementById("test");
                element.innerHTML = result;
                $('#test').show();
            }
        } 
    }
    
}
}).fail(function (response, code) {
    console.log(response)
    //alert('The token is invalid')
}); 
});