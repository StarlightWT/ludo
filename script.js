var draggableElements = document.getElementsByClassName("piece");

for (var i = 0; i < draggableElements.length; i++) {
  makeDraggable(draggableElements[i]);
}

function makeDraggable(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let dragHandle = elmnt.getElementsByClassName("drag-handle")[0];

  if (dragHandle !== undefined) {
    // if present, the header is where you move the DIV from:
    dragHandle.onmousedown = dragMouseDown;
    dragHandle.ontouchstart = dragMouseDown; //added touch event
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown; //added touch event
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    //Get touch or click position
    //https://stackoverflow.com/a/41993300/5078983
    if (
      e.type == "touchstart" ||
      e.type == "touchmove" ||
      e.type == "touchend" ||
      e.type == "touchcancel"
    ) {
      let evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
      let touch = evt.touches[0] || evt.changedTouches[0];
      x = touch.pageX;
      y = touch.pageY;
    } else if (
      e.type == "mousedown" ||
      e.type == "mouseup" ||
      e.type == "mousemove" ||
      e.type == "mouseover" ||
      e.type == "mouseout" ||
      e.type == "mouseenter" ||
      e.type == "mouseleave"
    ) {
      x = e.clientX;
      y = e.clientY;
    }

    console.log("drag start x: " + x + " y:" + y);

    // get the mouse cursor position at startup:
    pos3 = x;
    pos4 = y;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    //Get touch or click position
    //https://stackoverflow.com/a/41993300/5078983
    if (
      e.type == "touchstart" ||
      e.type == "touchmove" ||
      e.type == "touchend" ||
      e.type == "touchcancel"
    ) {
      let evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
      let touch = evt.touches[0] || evt.changedTouches[0];
      x = touch.pageX;
      y = touch.pageY;
    } else if (
      e.type == "mousedown" ||
      e.type == "mouseup" ||
      e.type == "mousemove" ||
      e.type == "mouseover" ||
      e.type == "mouseout" ||
      e.type == "mouseenter" ||
      e.type == "mouseleave"
    ) {
      x = e.clientX;
      y = e.clientY;
    }

    // calculate the new cursor position:
    pos1 = pos3 - x;
    pos2 = pos4 - y;
    pos3 = x;
    pos4 = y;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    console.log("drag end x: " + pos3 + " y:" + pos4);
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.ontouchcancel = null; //added touch event
    document.ontouchend = null; //added touch event
    document.onmousemove = null;
    document.ontouchmove = null; //added touch event
  }
}
