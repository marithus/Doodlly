//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var canvas = null;
var bg = null;
var currentLayerIndex = 0;

var eraserSizeSlider;

function setup() {
  //create a canvas to fill the content div from index.html
  canvasContainer = select('#content');
  canvas = createCanvas(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  canvas.parent('content');
  canvas.graphicLayers = [];

  //create helper functions and the colour palette
  helpers = new HelperFunctions();

  //Create a colorpicker from p5.js to use globally
  //new colour pallette
  ColourPalette = createColorPicker('black');
  //Colour picker position
  ColourPalette.position(5, height + 100);

  //create a toolbox for storing the tools
  toolbox = new Toolbox();

  //add the tools to the toolbox.
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(new SprayCanTool());
  toolbox.addTool(new mirrorDrawTool());
  toolbox.addTool(new eraserTool());
  toolbox.addTool(new cutTool());
  toolbox.addTool(new lassoTool());

  //add background to the layers
  bg = createGraphics(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  bg.background(255);
  pixelDensity(1);
}

function draw() {
  //set the stroke colour to the selected colour from the picker
  stroke(ColourPalette.color())

  //call the draw function from the selected tool.
  //hasOwnProperty is a javascript function that tests
  //if an object contains a particular method or property
  //if there isn't a draw method the app will alert the user
  if (toolbox.selectedTool.hasOwnProperty('draw')) {
    toolbox.selectedTool.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}

function mousePressed() {
  if (toolbox.selectedTool.hasOwnProperty('mousePressed')) {
    toolbox.selectedTool.mousePressed();
  }
}

function mouseDragged() {
  if (toolbox.selectedTool.hasOwnProperty('mouseDragged')) {
    toolbox.selectedTool.mouseDragged();
  }
}

function mouseReleased() {
  if (toolbox.selectedTool.hasOwnProperty('mouseReleased')) {
    toolbox.selectedTool.mouseReleased();
  }
}