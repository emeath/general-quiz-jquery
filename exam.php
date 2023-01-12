<?php

$questions[] = [
    "question" => "What is internet?",
    "a" => "A magical place where everybody goes when are bored",
    "b" => "A giant network of computers and other devices",
    "c" => "A dangerous place where people should go",
    "d" => "N/A"];

$questions[] = [
    "question" => "Which pokemon is yellow, has eletricity powers and has red points on his face?",
    "a" => "Pikachu", 
    "b" => "Bubassaur",
    "c" => "Charmander",
    "d" => "N/A"];

$questions[] = [
    "question" => "What is the answer to everything?",
    "a" => "I don't know...",
    "b" => "There's no such thing",
    "c" => "42",
    "d" => "N/A"];

$rightAnswers = array(
    1 => "b",
    2 => "a",
    3 => "c"
);

//var_dump($_POST);
//var_dump($_REQUEST);

//echo json_encode($questions[intval($_REQUEST["q"])-1]);


if (!is_null($_REQUEST["q"])) {
    echo json_encode($questions[intval($_REQUEST["q"])-1]);
} else {
    
    $userAnswers = [ 
        1 => $_POST["1"],
        2 => $_POST["2"],
        3 => $_POST["3"],
     ];

    $userScore = computeAnswers($userAnswers);

    $score = [ "result" => $userScore ];
    echo json_encode($score);
}



function computeAnswers($userAnswers){
    $score = 0;

    global $rightAnswers;

    foreach ($userAnswers as $key => $value) {
        if($value == $rightAnswers[$key])
            $score++;

    }
    return $score;
}


?>