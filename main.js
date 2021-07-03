song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function preload()
{
    song= loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = mL5.poseNet(video,modelLoaded);
    pose.on('pose',gotPoses);
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreRightwrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = "+ scoreRightWrist + "scoreleftWrist =" + scoreleftWrist);

        leftWrist= results[0].pose.leftWristX;
        leftWrist=results[0].pose.leftWristY;
        console.log("leftWristX="+ leftWristX+"leftWristY="+leftWristY);

        
        rightWrist= results[0].pose.rightWristX;
        rightWrist=results[0].pose.rightWristY;
        console.log("rightWristX="+ rightWristX+"rightWristY="+rightWristY);
   }
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");
     
    if(scoreleftWrist>0.2)
    {
    circle(leftWristX , leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    leftWristY_divide_1000= remove_decimals/1000;
    volume = leftWristY_divide_1000*2;
    document.getElementById("volume").innerHTML="Volume = "+ volume;
    song.setVolume(volume);
}
if(scoreRightWrist>0.2)
{
    circle(rightWristX,rightWristY,20)

    if(rightWristY>0 && rightWristY<=100)
    {
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200)
    {
        document.getElementById("speed").innerHTML="Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300)
    {
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400)
    {
        document.getElementById("speed").innerHTML="Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<=500)
    {
        document.getElementById("speed").innerHTML="Speed = 2x";
        song.rate(2);
    }
}

 }
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized !');
}

