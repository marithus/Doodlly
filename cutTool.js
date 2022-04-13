function cutTool() {
  //set an icon and a name for the object
  this.icon = 'assets/cut.jpg';
  this.name = 'cut';

  //used to store the pixels of the selected rectangle
  var selectedPixels;

  //to smoothly draw we'll draw a line from the previous mouse location
  //to the current mouse location. The following values store
  //the locations from the last frame. They are -1 to start with because
  //we haven't started drawing yet.
  var previousMouseX = -1;
  var previousMouseY = -1;

  //SelectMode start at 1 as the users will enter the cut state once they chose the tool
  var selectMode = 1;
  //This is to store the values of the drawn rectangle by user
  var selectedArea = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  };

  this.draw = function () {
    //When mouse is pressed on screen, the tool will do different actions depends on selectMode
    this.mousePressed = function () {
      //do the cutting and pasting only if the mouse if on the canvas
      if (mouseOnCanvas(canvas)) {
        //Start storing the values of the mouse position into selected area
        if (selectMode == 1 && previousMouseX == -1) {
          previousMouseX = mouseX;
          previousMouseY = mouseY;
          selectedArea.x = mouseX;
          selectedArea.y = mouseY;
          //Pasting mode
        } else if (selectMode == 2) {
          // image will appear in the middle of where the cursor is
          image(
            selectedPixels,
            mouseX - selectedArea.w / 2,
            mouseY - selectedArea.h / 2
          );
          //load last saved sketch
          loadPixels();
        }
      }
    };
    //Dragging mouse will expand the highlight rectangle
    this.mouseDragged = function () {
      //if the mouse is outside the canvas, tool will stop
      if (!mouseOnCanvas(canvas)) {
        return;
      }
      //if in cut mode, draw the highlight rectangle 
      if (selectMode == 1) {
        //display the last saved pixels
        updatePixels();

        //Create a rectangle as user drag
        var w = mouseX - selectedArea.x;
        var h = mouseY - selectedArea.y;
        selectedArea.w = w;
        selectedArea.h = h;
        noStroke();
        fill(0, 0, 255, 50);
        rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
      }
    };

    // Once the mouse is released reset the position
    this.mouseReleased = function () {
      if (selectMode == 1) {
        //if the user has released the mouse we want to set the previousMouse values
        //back to -1.
        previousMouseX = -1;
        previousMouseY = -1;
      }
    };
  };
  //Check whenever the mouse is on the canvas
  function mouseOnCanvas(canvas) {
    if (mouseX > canvas.elt.offsetLeft - 70 &&
      mouseX < (canvas.elt.offsetLeft + canvas.width) - 70 &&
      mouseY > canvas.elt.offsetTop - 111 &&
      mouseY < (canvas.elt.offsetTop + canvas.height) - 111) {
      return true;
    }
    return false;
  }

  this.unselectTool = function () {
    //to update the pixels when you unselect your tool
    updatePixels();
    //clear options
    select('.options').html('');
    // select("#cutpasteButton").html("Cut");

    //reset to starting
    previousMouseX = -1;
    previousMouseY = -1;

    //reset the tool
    selectedArea = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
    selectMode = 1;
    // empty the array to ensure the app doesnt glitch
    if (selectedPixels) {
      selectedPixels.length = 0;
    };
  };

  this.populateOptions = function () {
    //Create a button for user to switch between cutting and pasting mode
    select('.options').html("<button id='cutpasteButton'>Cut</button>");
    select('#cutpasteButton').mouseClicked(function () {
      //If user press the button while in cut mode
      if (selectMode == 1) {
        //switch to pasting mode
        selectMode = 2;
        updatePixels();

        //store the pixels
        selectedPixels = get(
          selectedArea.x,
          selectedArea.y,
          selectedArea.w,
          selectedArea.h
        );

        //draw a white rectangle over the chosen area to make it "disappear"
        fill(255);
        noStroke();
        rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);

        //save the sketch state
        loadPixels();

        //Change the description of the button for users to understand
        select('#cutpasteButton').html('Paste (Click where you want to paste)');

        //if in pasting mode, switch back to cutting mode once button pressed
      } else if (selectMode == 2) {
        selectMode = 1;

        //Change the description of the button for users to understand
        select('#cutpasteButton').html('Cut');

        //Reset starting
        previousMouseX = -1;

        //Save the sketch state
        loadPixels();
      }
    });
  };
}