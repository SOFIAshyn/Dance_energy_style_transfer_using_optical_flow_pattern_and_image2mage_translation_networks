function preload() {
  jsonFile = loadJSON('assets/p5_1hdHc1hJAWU_005_.json');
}

function setup() {
  var cur_skeleton_name;
  var prev_skeleton_name;
  var final_list_prev_x;
  var final_list_prev_y;
  var final_list_cur_x;
  var final_list_cur_y;
  //final_list_prev_x, final_list_prev_y, final_list_cur_x, final_list_cur_y, movement_distances
  
  createCanvas(1920, 1080);
  cols = floor(width / scl);
  rows = floor(height / scl);
  //let num_of_frames = Object.values(jsonFile).length;
  let num_of_frames = 3;
  for (let i = 0; i < num_of_frames; i++) {
    
    cur_skeleton_name = jsonFile[i].cur_skeleton_name;
    prev_skeleton_name = jsonFile[i].prev_skeleton_name;
    final_list_prev_x = jsonFile[i].final_list_prev_x;
    final_list_prev_y = jsonFile[i].final_list_prev_y;
    final_list_cur_x = jsonFile[i].final_list_cur_x;
    final_list_cur_y = jsonFile[i].final_list_cur_y;
    movement_distances = jsonFile[i].distance_of_direction_vectors;
    defineVectors(final_list_prev_x, final_list_prev_y, final_list_cur_x, final_list_cur_y, movement_distances);
    setTimeout(redraw(), 0);
    let cur_skeleton_name_path = 'assets/results/'.concat(cur_skeleton_name);
    saveCanvas(cur_skeleton_name_path, 'png');
    print('saved ', cur_skeleton_name_path, '.png');
  }
  noLoop();
}

function draw(final_list_prev_x, final_list_prev_y, final_list_cur_x, final_list_cur_y, movement_distances) {
  background(255, 255, 255);
  loadPixels();
  angleMode(RADIANS);
  stroke(51);
  
  setSkeletonArrays();
  drawVectorField();
  drawRedSkeletonVectors();
  skeleton_angles = {};
  skeleton_keypoints_numbers = {};
  // TODO: google how to clean the vectors that were drawn on the previous canvas
  // TODO: google how to save canvas with the vectors that i see in the browser window, but not the default ones
}

function mousePressed() {
   redraw();
 }
