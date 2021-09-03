var img="";
status="";
object=[];
function preload(){
    img=loadImage("dog_cat.jpg");
}
function setup(){
    canvas=createCanvas(640,400);
    canvas.center();
    image_detector=ml5.objectDetector("cocossd",model_loaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function draw(){
    image(img,0,0,640,400);

    if(status != ""){
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status: Object Detected";

            fill("red");
            percentage=floor(object[i].confidence*100);
            text(object[i].label + " " + percentage + "%", object[i].x+15, object[i].y+15);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}
function model_loaded(){
    console.log("Model Loaded");
    status=true;
    image_detector.detect(img,gotresults);
}
function gotresults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}