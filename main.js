song = "";

function preload(){
    song = loadSound("music.mp3");
}

rightWristX = 0;
rightWristY = 0;

leftwristX = 0;
leftwristY = 0;

scorerightWrist = 0;
scoreleftWrist = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotPoses);
}

function modelloaded(){
    console.log("posenet is intialized" );
}

function draw(){
    image(video, 0, 0, 600, 500);
    Fill("#FF0000");
    stroke("#FF0000");

    if(scorerightWrist > 0.2){
    circle(rightwristX, rightWristY, 20);

    if(rightWristY >0 && rightWristY <=100 ){
        document.getElementById("speed").innerHTML = "Speed- 0.5" ;
        song.rate(0.5);
    }

   else if(rightWristY >100 && rightWristY <=200 ){
        document.getElementById("speed").innerHTML = "Speed- 1x" ;
        song.rate(1);
    }

    else if(rightWristY >200 && rightWristY <=300 ){
        document.getElementById("speed").innerHTML = "Speed- 1.5x" ;
        song.rate(1.5);
    }

    else if(rightWristY >300 && rightWristY <=400 ){
        document.getElementById("speed").innerHTML = "Speed- 2x" ;
        song.rate(2);
    }

    else if(rightWristY >400 ){
        document.getElementById("speed").innerHTML = "Speed- 2.5x" ;
        song.rate(2.5);
    }
}




    if(scoreleftWrist > 0.2)
    {
    circle(leftwristX, leftwristY, 20);
    leftwristnum = Number(leftwristY);
    remove_decimal = floor(leftwristnum);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume -" + volume;
    song.setVolume(volume);
    }

}



function play(){
    song.play();
    song.setvolume(1);
    song.rate(1);
}

function gotPoses(results){
    if (results.length > 0)
    {
    console.log(results);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;

    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;

    scoreleftWrist = result[0].pose.keypoints[9].score;

    scorerightWrist = result[0].pose.keypoints[10].score;

    

    }

   
}


