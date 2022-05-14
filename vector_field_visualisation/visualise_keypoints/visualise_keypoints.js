function setup() {
  //createCanvas(1920, 1080);
  createCanvas(1920, 1080);
  stroke(51);
  cols = floor(width / scl);
  rows = floor(height / scl);
  print('cols = ', cols, 'rows = ', rows);
  defineVectors();
  noLoop();
}

function draw() {
  background(255);
  
  
  loadPixels();
  angleMode(RADIANS);
  drawRedSkeletonVectors();
  drawVectorField();
}
