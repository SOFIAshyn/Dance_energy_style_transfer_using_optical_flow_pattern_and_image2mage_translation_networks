var cur_skeleton_name;
var prev_skeleton_name;
var final_list_prev_x;
var final_list_prev_y;
var final_list_cur_x;
var final_list_cur_y;
var num_of_particles = 10000;
var frame_i = 1;
//var frame_i = 31; // TODO: create a command to run this script, where one of the arguments is frame_i
                  // write a script that runs this code for each image frame from the video
                  // save files into a particular directory
                  // at this point of time we are going to have an abstraction dataset
                  // NEXT STEPS: play with magnitude, with color
function preload() {
  jsonFile = loadJSON('assets/p5_1hdHc1hJAWU_005_.json');
}

function setup() {
  // TODO: add canvas size reader to json file
  createCanvas(1920, 1080);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  flowfield = new Array(cols * rows);
  for (let i = 0; i < num_of_particles; i++) {
    particles[i] = new Particle();
  }
  background(51);
  let num_of_frames = Object.values(jsonFile).length;
  //print('num_of_frames = ', num_of_frames);
  cur_skeleton_name = jsonFile[frame_i].cur_skeleton_name;
  prev_skeleton_name = jsonFile[frame_i].prev_skeleton_name;
  final_list_prev_x = jsonFile[frame_i].final_list_prev_x;
  final_list_prev_y = jsonFile[frame_i].final_list_prev_y;
  final_list_cur_x = jsonFile[frame_i].final_list_cur_x;
  final_list_cur_y = jsonFile[frame_i].final_list_cur_y;
  movement_distances = jsonFile[frame_i].distance_of_direction_vectors;
  defineVectors(final_list_prev_x, final_list_prev_y, final_list_cur_x, final_list_cur_y, movement_distances);
}

function draw(final_list_prev_x, final_list_prev_y, final_list_cur_x, final_list_cur_y, movement_distances) {  
  setSkeletonArrays();
  //print('skeleton_angles = ', skeleton_angles);
  drawVectorField();
  drawRedSkeletonVectors();
  // TODO: google how to clean the vectors that were drawn on the previous canvas
  // TODO: google how to save canvas with the vectors that i see in the browser window, but not the default ones
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));
}
