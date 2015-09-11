var color = $('.selected').css('background-color');
var $canvas = $('canvas');
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
var strokeSize;

//when clicking on "control li"
$('.controls').on( "click", "li" ,function(){
  //deselect sibling elements
  $(this).siblings().removeClass("selected");
  //select clicked element
  $(this).addClass("selected");
  //cache current color
  color = $(this).css("background-color");
});
  
//when new color is clicked, 
$("#revealColorSelect").click(function(){  
  //show color colorSelect
  changeColor();
  $('#colorSelect').toggle();
});
 
//update new color span
function changeColor(){
  var r = $('#red').val();
  var g = $('#green').val();
  var b = $('#blue').val();
  $('#newColor').css('background-color' , "rgb(" + r + "," + g + "," + b + ")");
}
//when color sliders change
$('input[type=range]').change(changeColor);

//when add color is pressed
$("#addNewColor").click(function(){
  //append new color to the controls ul
  var $newColor = $('<li></li>');
  $newColor.css("background-color",$("#newColor").css("background-color"));
  $('.controls ul').append($newColor);
  //select new color
  $newColor.click();
  //hide colorSelect
  $('#colorSelect').hide();
});

//on mouse events on the canvas
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
});

$canvas.mousemove(function(e){
  //draw lines
  if(mouseDown){
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.lineWidth = strokeSize;
    context.stroke();//actually draws the line
    lastEvent = e;
  }
});

$canvas.mouseup(function(){
  mouseDown = false;
});

$canvas.mouseleave(function(){
  $canvas.mouseup();
});

//clear canvas
function clearCanvas(){
  context.clearRect ( 0 , 0 , 800, 400 );
}
$("#clearCanvas").click(function(){
  clearCanvas();
});

//stroke size
$('#stroke').change(function(){
  strokeSize = $('#stroke').val();
});


//save canvas as an img
$('#save').click(function(){
  var canvas = document.getElementById("mycanvas");
  var imgSource    = canvas.toDataURL("image/png");

  var $imgDiv = $('<div class="imgDiv"></div>');
  var $img = $('<img>');
  var $deleteButton = $('<span id="deleteButton">X</span>');
  
  $img.attr('src', imgSource);
  $imgDiv.append($img);
  $imgDiv.append($deleteButton);
  
  $("#gallery").append($imgDiv);
  clearCanvas();
});

//delete canvas from gallery
$("#gallery").on("click" , "span" , function(){
  $(this).parent().remove();
});

// clear gallery
$('#clearCanvas').dblclick(function(){
  $('.imgDiv').remove();

});








