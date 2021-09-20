music = "";
music1 = "";
score_left=0;
score_right=0;

function preload() {
    music  = loadSound("music.mp3");
    music1= loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.position(430, 190);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet('pose', video);
    poseNet.on(video, gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 450);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    if(score_right>0.2){
        circle(rightwristX,rightWristY,20);
        music1.stop();
        if(song1_status==false){
            music.play();
            document.getElementById("song_name").innerHTML="Playing Harry Potter theme song";
        }
    }
    if(score_left>0.2){
        circle(rightwristX,rightWristY,20);
        music.stop();
        if(song2_status==false){
            music1.play();
            document.getElementById("song_name").innerHTML="Playing Peter Pan song";
        }
    }
}
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function modelLoaded() {
    console.log('model is initialized');
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        score_left=results[0].pose.keypoints[9].score;
        score_right=resu;ts[0].pose.keypoints[10].score;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('leftWristX=' + leftWristX + 'leftWristY=' + leftWristY);
        console.log('rightWristX=' + rightWristX + 'rightWristY=' + rightWristY);
    }

}
function song(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
song1_status="";
song2_status="";
