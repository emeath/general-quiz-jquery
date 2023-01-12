// initial question
let question = 1;

setInterval(() => {
    // countdown
    let currentSecond = $("#timer span").html();
    currentSecond -= 1;
    
    if (currentSecond == 0) {
        currentSecond = 30;
        sendAnswer();
    }

    $("#timer span").html(currentSecond);

    if (currentSecond <= 10) {
        $("#timer span").css("color", "red");
    } else {
        $("#timer span").css("color", "black");
    }
}, 1000);

const storeUserOption = (currentQuestion) => {
    const optionA  = $("#option-a").is(":checked");
    const optionB  = $("#option-b").is(":checked");
    const optionC  = $("#option-c").is(":checked");
    const optionD  = $("#option-d").is(":checked");
    let userOption = "";

    if (optionA) {
        userOption = "a";
    } else if (optionB) {
        userOption = "b";
    } else if (optionC) {
        userOption = "c";
    } else {
        userOption = "d";
    }

    localStorage.setItem(currentQuestion, userOption);
}

function requestQuestions() {
    
    //clear previous answer

    const options = ['a', 'b', 'c', 'd'];
    options.forEach( item => {
        document.getElementById("option-" + item).checked = false;
    });

    $.ajax({
        type:"get",
        url:"exam.php?q=" + question,
        dataType: "json",
        success: function(response) {
            console.log(response);
            $("#question span").html(question);
            $("#question p").html(response.question);
            $("#description-a").html(response.a);
            $("#description-b").html(response.b);
            $("#description-c").html(response.c);
            $("#description-d").html(response.d);
        },
        error: function(){
            console.log("...");
        }
    })
}



function sendAnswer() {
    storeUserOption(question);
        question++;
        
        if (question <= 3)
            requestQuestions(question);

        const userAns = {
            1: localStorage.getItem("1"),
            2: localStorage.getItem("2"),
            3: localStorage.getItem("3")
        };

        if (question == (3 + 1)) {
            $.ajax({
                type:"post",
                url:"exam.php",
                data: userAns,
                success: function(response){
                    console.log(JSON.parse(response));

                    const result = JSON.parse(response);

                    $("#multiple-choices").css("visibility", "hidden");
                    $("#send").css("visibility", "hidden");
                    $("#question").css("visibility", "hidden");
                    $("#timer").css("visibility", "hidden");

                    $("#score").css("visibility", "visible");

                    const percentage = Math.ceil((result.result / 3.0) * 100);

                    $("#points").html(result.result);
                    $("#percentage").html(percentage);

                    $("#score button").click(() => {location.reload();});

                }

            });
        }

}

$(document).ready(function () {

    // clear localStorage
    localStorage.removeItem("1");
    localStorage.removeItem("2");
    localStorage.removeItem("3");
    
    requestQuestions();    

    $("#send").click(() => { sendAnswer() });
    
});


