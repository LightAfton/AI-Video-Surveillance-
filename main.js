objects=[];

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video.hide();
}

video="";

function preload() 
{
    video=createVideo('video.mp4');
}

function draw()
{
    image(video,0,0,480,380);

    if(status!="")
    {
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML="status: objects detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are:" + objects.length;

            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15 , objects[i].x + 15, objects[i].y + 15);

            nofill();
            stroke("#FF0000");
            Rect(objects[i].x,objects[i].width,objects[i].height);    
        }
    }

}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("Status").innerHTML="status:detecting objects";
}

function modelloaded()
{
    console.log("Model Loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}