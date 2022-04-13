function eraserTool() {
    //set an icon and a name for the object
    this.icon = "assets/eraser.jpg";
    this.name = "eraser";

    this.draw = function () {
        //display the last save pixels
        updatePixels();

        //Varibles used to identify the value chosen on the slider
        var eraserSize = eraserSizeSlider.value();
        var opacity = opacitySlider.value();

        //An indicator to help users identify the size of the eraser
        stroke(1);
        noFill();
        ellipse(mouseX, mouseY, eraserSize, eraserSize);

        //when mouse is pressed, start erasing the area chosen
        if (mouseIsPressed) {
            //display the last save pixels to prevent the indicator from pasting
            updatePixels();

            //Pasting white empty circles over mouse position as a form of "erasing"
            noStroke();
            fill(255, 255, 255, opacity);
            ellipse(mouseX, mouseY, eraserSize, eraserSize);

            // to load the sketch as it is erased 
            loadPixels();
        }
    }

    this.unselectTool = function () {
        //to update the pixels when you unselect your tool
        updatePixels();

        //clear options
        select(".options").html("");

        //reset to starting
        previousMouseX = -1;
        previousMouseY = -1;
    }


    this.populateOptions = function () {
        select(".options").html(
            "<div id='sizeOfEraser'><b>Size of Eraser</b></div> <div id='opacityControl'><b>Eraser Strength</b></div>");
        //Create sliders for eraser size
        eraserSizeSlider = createSlider(20, 100, 20);
        eraserSizeSlider.parent("#sizeOfEraser");

        //Create sliders for eraser strength
        opacitySlider = createSlider(20, 255, 255);
        opacitySlider.parent("#opacityControl");

    }
}