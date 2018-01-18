const BASE_URL = "http://localhost:3000/";

const sendingMessage = () => {
    console.log('lalala');
    let currentName = document.getElementById("name").value;
    let currentEmail = document.getElementById("email").value;
    let currentSubject = document.getElementById("subject").value;
    let currentMessage = document.getElementById("message").value;

    let contactMessage = {name: currentName, email: currentEmail, subject: currentSubject, message: currentMessage};

    var r = new XMLHttpRequest();
    r.open("POST", BASE_URL+"messages/", true);
    r.setRequestHeader("Content-Type", "application/json");
    r.onreadystatechange = function () {
      if (r.readyState != 4 || r.status != 200) return;  
    };
    r.send(JSON.stringify(contactMessage));

    let thankYou = document.getElementById('thankYou');
    thankYou.style.visibility = 'visible';
    resetForm();
    return false;
}

function resetForm(){
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("subject").value = '';
    document.getElementById("message").value = '';
}