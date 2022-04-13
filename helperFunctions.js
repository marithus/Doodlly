function HelperFunctions() {
  //Jquery click events. Notice that there is no this. at the
  //start we don't need to do that here because the event will
  //be added to the button and doesn't 'belong' to the object

  //event handler for the clear button event. Clears the screen
  select('#clearButton').mouseClicked(function () {
    clear();
    //call loadPixels to update the drawing state
    //this is needed for the mirror tool
    loadPixels();

    //clear all layers
    canvas.graphicLayers = [];
    currentLayerIndex = 0;
    select('#currentLayerSpan').elt.innerHTML = currentLayerIndex + 1;
  });

  //event handler for the save image button. saves the canvas to the
  //local file system.
  select('#saveImageButton').mouseClicked(function () {
    //save the layer
    const layer = get();
    //create a white background for the layer
    image(bg, 0, 0);
    image(layer, 0, 0);
    //save the canvas with its background
    save(canvas, 'myPicture', 'jpg');
    //clear the background and show the layer
    clear();
    image(layer, 0, 0);
  });

  ///////////////////////////////////////////////
  //LAYER TOOL 
  ///////////////////////////////////////////////

  //reset the tool box
  function Reset() {
    var items = selectAll('.sideBarItem');
    for (var i = 0; i < items.length; i++) {
      items[i].style('border', '0');
    }
    toolbox.selectTool('freehand');

    //reset to starting
    previousMouseX = -1;
    previousMouseY = -1;

  }
  select('#newGraphicLayer').mouseClicked(function () {
    //reset the toolbox
    Reset();

    // save the last layer
    let layer = get();
    //ensure the new layer is created at the end of the array
    if (
      canvas.graphicLayers.length === 0 ||
      currentLayerIndex === canvas.graphicLayers.length - 1
    ) {
      canvas.graphicLayers.push(layer);
      currentLayerIndex++;
    } else {
      canvas.graphicLayers[currentLayerIndex] = layer;
      currentLayerIndex = canvas.graphicLayers.length;
    }
    clear();
    select('#currentLayerSpan').elt.innerHTML = currentLayerIndex + 1;
  });

  select('#combineLayers').mouseClicked(function () {
    // reset the toolbox
    Reset();


    if (canvas.graphicLayers.length == 0) {
      alert("No Layer To Combine");
      return;
    } else {
      // save the last layer
      let layer = get();
      canvas.graphicLayers.push(layer);
      clear();

      // combine all the layers
      canvas.graphicLayers.forEach((layer) => {
        image(layer, 0, 0);
      });

      canvas.graphicLayers = [];
      currentLayerIndex = 0;
      select('#currentLayerSpan').elt.innerHTML = currentLayerIndex + 1;
    }
  });

  select('#goPreviousLayer').mouseClicked(function goPreviousLayer() {
    if (currentLayerIndex === 0) {
      alert('Cannot go previous!');
      return;
    }

    const layerIndexToGo = currentLayerIndex - 1;

    // reset the toolbox
    Reset();

    // save the last layer
    let layer = get();
    canvas.graphicLayers[currentLayerIndex] = layer;
    clear();

    // load the layer at index
    layer = canvas.graphicLayers[layerIndexToGo];
    image(layer, 0, 0);
    currentLayerIndex = layerIndexToGo;

    select('#currentLayerSpan').elt.innerHTML = currentLayerIndex + 1;
  });

  select('#goNextLayer').mouseClicked(function goNextLayer() {
    if (currentLayerIndex >= canvas.graphicLayers.length - 1) {
      alert('Cannot go next!');
      return;
    }

    const layerIndexToGo = currentLayerIndex + 1;

    // select freehand to reset
    Reset();

    // save the last layer
    let layer = get();
    canvas.graphicLayers[currentLayerIndex] = layer;
    clear();

    // load the layer at index
    layer = canvas.graphicLayers[layerIndexToGo];
    image(layer, 0, 0);
    currentLayerIndex = layerIndexToGo;

    select('#currentLayerSpan').elt.innerHTML = currentLayerIndex + 1;
  });
}