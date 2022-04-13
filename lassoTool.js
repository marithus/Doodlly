function lassoTool() {
  //set an icon and a name for the object
  this.icon = 'assets/lasso.jpg';
  this.name = 'lasso';

  //array used to store the vertices
  var currentShape = [];

  //To help switch between mode
  var editMode = false;
  var closeMode = false;
  var fillMode = false;

  this.draw = function () {
    //to display last saved pixels
    updatePixels();
    //if mouse is inside the canvas and pressed
    if (mouseOnCanvas(canvas) && mouseIsPressed) {
      //if users are not in edit mode
      if (!editMode) {
        //add the coordinates of each mouse pressed on the canvas into the currentShape array to be used as vertices
        currentShape.push({
          x: mouseX,
          y: mouseY,
        });
        //if users are in edit mode
      } else {
        //let users adjust the position of the vertex if the mouse hover over it
        for (let i = 0; i < currentShape.length; i++) {
          if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15) {
            currentShape[i].x = mouseX;
            currentShape[i].y = mouseY;
          };
        };
      };
    };
    //If fill mode is false, the shape is transparent
    //If fill mode is true, the shape will fill the chosen colour by the picker
    if (!fillMode) {
      noFill();
    } else {
      fill(ColourPalette.color());
    };
    //draw the shape using the vertices created inside the array
    beginShape();
    for (var i = 0; i < currentShape.length; i++) {
      vertex(currentShape[i].x, currentShape[i].y);
      //if users are in edit mode draw a red circle over the vertex to show points that can be adjusted by users
      if (editMode) {
        fill('red');
        ellipse(currentShape[i].x, currentShape[i].y, 10);
        noFill();
      }
    }
    //if user want to close the shape, they can toggle it
    if (closeMode) {
      endShape(CLOSE);
    } else {
      endShape();
    }
  };

  //Check whenever the mouse is on the canvas
  function mouseOnCanvas(canvas) {
    if (mouseX > canvas.elt.offsetLeft - 70 &&
      mouseX < (canvas.elt.offsetLeft + canvas.width) &&
      mouseY > canvas.elt.offsetTop - 111 &&
      mouseY < (canvas.elt.offsetTop + canvas.height) - 111) {
      return true;
    };
    return false;
  };

  this.unselectTool = function () {
    //reset the tool into its default state 
    //Not draw the shape yet until user press finish shape to confirm their actions 
    updatePixels();
    editMode = false;
    closeMode = false;
    fillMode = false;

    //clear options
    select('.options').html('');
  };

  this.populateOptions = function () {
    //create buttons for users to use so they can change the state they are in
    select('.options').html(
      "<button id='editButton'>Edit Shape</button> <button id='closeButton'>Close Shape</button> <button id='fillButton'>Fill Shape</button> <br></br> <button id='finishButton'>Finish Shape</button> "
    );
    //when finish button is clicked, draw the final shape and reset the tool 
    select('#finishButton').mouseClicked(function () {
      editMode = false;
      select('#editButton').html('Edit Shape');
      select('#closeButton').html('Close Shape');
      select('#fillButton').html('Fill Shape');
      draw();
      loadPixels();
      currentShape = [];
      closeMode = false;
      fillMode = false;
    });

    //Interaction with button to turn on or off editmode.
    select('#editButton').mouseClicked(function () {
      if (editMode) {
        editMode = false;
        select('#editButton').html('Edit Shape');
      } else {
        editMode = true;
        select('#editButton').html('Add Vertices');
      }
    });

    //Interaction with button to turn close or open the shape
    select('#closeButton').mouseClicked(function () {
      if (closeMode) {
        closeMode = false;
        select('#closeButton').html('Close Shape');
      } else {
        closeMode = true;
        select('#closeButton').html('Disconnet');
      }
    });
    //Interaction with button to turn on or off for filling shape.
    select('#fillButton').mouseClicked(function () {
      if (fillMode) {
        fillMode = false;
        select('#fillButton').html('Fill Shape');
      } else {
        if (!editMode) {
          fillMode = true;
          select('#fillButton').html('Clear Shape');
        } else {
          alert("Press Add Verices then Fill Shape");
          return;
        }
      }
    });
  };
}