
// check if the user can get in
function checkLogin() {
    
    let userName = document.getElementById('name').value;
    let password = document.getElementById('password').value;
    if (userName != 'abcd'){
        document.getElementById('wrong_name').innerHTML = 'Wrong User Name!';
    }
    if(password != '1234'){
        document.getElementById('wrong_password').innerHTML = 'Wrong password!';
    }

    if (userName == 'abcd' && password == '1234'){
        let link = document.getElementById('link').innerHTML = window.location.href= "chooseLevel.html";
        return link;
    }
       
 }



