
    const BASE_URL = "http://localhost:3000/";
    const commentsList = document.getElementById("comments-list");

    console.log("load comments module");

    function loadCommentsSection() {
        fetch(BASE_URL+"comments/")
            .then(function (response) {
                response.json().then(function (comments) {
                    appendComments(comments);
                });
            });
    };

    function appendComments(comments){
        let commentsList = document.getElementById("comments-list");

        while (commentsList.childNodes.length > 2) {
            commentsList.removeChild(commentsList.lastChild);
        }    
    
        for(let i = 0; i < comments.length; i++){
            let parsedComment = parseComment(comments[i], comments[i].id);
            commentsList.appendChild(parsedComment);
        }
    } 
    
    let parseComment = (comment, id) =>{
        let commentHtml = document.getElementById("comment-template").cloneNode(true);
        let user = commentHtml.childNodes[1];
        user.innerText = comment.user;
        let commentText = commentHtml.childNodes[3];
        commentText.innerText = comment.comment;
        let date = commentHtml.childNodes[7];
        date.innerText = comment.date;
        let button = commentHtml.childNodes[5];
        button.setAttribute('id', id);
        commentHtml.style.display="block";
        return commentHtml;
    };

    let parseDate = (dateInt) =>{
        return new Date(dateInt);
    };

    //TODO: sort comments by date desc

    const createNewComment = () => {
        let currentUser = document.getElementById("input").value;
        let currentComment = document.getElementById("comment").value;
        let currentDate = formatDate(new Date());

        let userComment = {user: currentUser, comment:currentComment, date: currentDate};

        var r = new XMLHttpRequest();
        r.open("POST", BASE_URL+"comments/", true);
        r.setRequestHeader("Content-Type", "application/json");
        r.onreadystatechange = function () {
          if (r.readyState != 4 || r.status != 200) return;  
        };
        r.send(JSON.stringify(userComment));

        loadCommentsSection();
        resetForm();
        return false;
    };

    function deleteComment (id){
        console.log('death to the comment');
        fetch(BASE_URL+"comments/"+id, {
            method: 'DELETE',
        }).then(function () {
            loadCommentsSection();
        });
    }

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    };

    function resetForm(){
        document.getElementById("input").value = '';
        document.getElementById("comment").value = '';
    }

    //TODO: thinks of edit GUI -> PUT saves data; GET - refresh data