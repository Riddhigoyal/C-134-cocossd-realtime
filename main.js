cats_dog="";
object_detect=[];
status="";
function preload(){
 
}

function setup(){
    canvas=createCanvas(400,350);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,350);
    video.hide();
    objectDetector= ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log ("cocossd is Initialized");
    status=true;
   
}

function gotResult(error,result){
    if(error){
        console.log (error);
    }
    else{
        console.log (result);

        object_detect= result;
    }
}

function draw(){
    image(video,0,0,400,350);
    
    if(status != ""){
        objectDetector.detect(video,gotResult);
        r= random(255);
        g= random(255);
        b= random(255);
        for(i=0 ; i<object_detect.length ; i++){
            document.getElementById("status").innerHTML="Status: Object detected";
            document.getElementById("objects").innerHTML="Number of objects detected are "+ object_detect.length;
            percent=floor(object_detect[i].confidence*100);
            fill(r,g,b);
            text(object_detect[i].label+" "+percent+"%",object_detect[i].x+15,object_detect[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object_detect[i].x,object_detect[i].y,object_detect[i].width,object_detect[i].height);
        }
    }
}