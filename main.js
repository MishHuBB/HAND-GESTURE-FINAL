prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VaP-1d52R/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Thumbs Up"){
             document.getElementById("update_emoji").innerHTML = "&#128077;";
            document.getElementById("quote").innerHTML = "Good Job!";
        }
        if(results[0].label == "Peace Sign"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "We come in peace!";
        }
        if(results[0].label == "Ok Sign"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "Oh, Okay.";
        }
        if(results[0].label == "Pointing Left"){
            document.getElementById("update_emoji").innerHTML = "&#128072;";
            document.getElementById("quote").innerHTML = "Turn Left.";
        }
        
	  if(results[1].label == "Thumbs Up"){
             document.getElementById("update_emoji2").innerHTML = "&#128077;";
            document.getElementById("quote").innerHTML = "Good Job!";
        }
        if(results[1].label == "Peace Sign"){
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "We come in peace!";
        }
        if(results[1].label == "Ok Sign"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "Oh, Okay.";
        }
        if(results[1].label == "Pointing Left"){
            document.getElementById("update_emoji2").innerHTML = "&#128072;";
            document.getElementById("quote").innerHTML = "Turn Left.";
        }
        

    }
}
