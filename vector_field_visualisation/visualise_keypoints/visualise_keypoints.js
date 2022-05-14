var inc = 0.1;
var scl = 20;
var cols, rows;

const skeleton_points = 17;
// ONE POINT
//var final_list_prev_x =  {0: 456.6783883};
//var final_list_prev_y =  {0: 756.6783883};
//var final_list_cur_x =  {0: 453.73431396484375};
//var final_list_cur_y =  {0: 564.3138427734375};
//var movement_distances = {0: 167.29270072563656};
// TEST 1 PICTURE: 
var final_list_prev_x =  {0: 441.2099609375, 1: 452.9404602050781, 2: 441.2099609375, 3: 488.1319580078125, 4: 447.0751953125, 5: 517.4581909179688, 6: 447.0751953125, 7: 593.7064208984375, 8: 429.4794616699219, 9: 664.0894165039062, 10: 388.4226989746094, 11: 511.59295654296875, 12: 464.67095947265625, 13: 482.2666931152344, 14: 388.4226989746094, 15: 499.8624572753906, 16: 318.0397033691406} ;
var final_list_prev_y =  {0: 568.099365234375, 1: 556.368896484375, 2: 562.234130859375, 3: 562.234130859375, 4: 562.234130859375, 5: 620.8865966796875, 6: 632.6171264648438, 7: 656.078125, 8: 714.7305908203125, 9: 673.6738891601562, 10: 773.3831176757812, 11: 773.3831176757812, 12: 779.2483520507812, 13: 908.2838745117188, 14: 896.5533447265625, 15: 1037.3193359375, 16: 990.3973388671875} ;
var final_list_cur_x =  {0: 453.73431396484375, 1: 464.7712707519531, 2: 453.73431396484375, 3: 497.882080078125, 4: 464.7712707519531, 5: 530.992919921875, 6: 448.2158508300781, 7: 608.2515258789062, 8: 404.0680847167969, 9: 685.5100708007812, 10: 348.8833923339844, 11: 508.9190368652344, 12: 464.7712707519531, 13: 525.4744262695312, 14: 431.6604309082031, 15: 564.103759765625, 16: 381.99420166015625} ;
var final_list_cur_y =  {0: 564.3138427734375, 1: 553.2769165039062, 2: 553.2769165039062, 3: 564.3138427734375, 4: 564.3138427734375, 5: 625.0170288085938, 6: 630.5355224609375, 7: 647.0909423828125, 8: 702.275634765625, 9: 674.6832885742188, 10: 740.9049072265625, 11: 768.497314453125, 12: 779.5342407226562, 13: 900.9406127929688, 14: 895.422119140625, 15: 1033.3839111328125, 16: 1016.8284912109375} ;
var movement_distances = {5: 167.29270072563656, 7: 153.25336140411312, 9: 58.02013233763715, 6: 168.41515397402392, 8: 145.88219756334922, 10: 68.9278837151021, 11: 160.18588470690094, 13: 108.79674548839292, 15: 83.608900856018, 12: 161.09948787228927, 14: 121.84093053769915, 16: 193.09551979590128, 3: 163.3316982974249, 1: 159.55322691217668, 0: 160.38184329459975, 2: 160.62894248322752, 4: 171.0049021977164};
// TEST ALL UP
//var final_list_prev_x =  {0: 1008.6870727539062, 1: 1021.2073364257812, 2: 996.1668090820312, 3: 1039.98779296875, 4: 977.3864135742188, 5: 1065.0283203125, 6: 958.6060180664062, 7: 1096.328857421875, 8: 927.3053588867188, 9: 1102.589111328125, 10: 964.8661499023438, 11: 1046.247802734375, 12: 983.6465454101562, 13: 1002.4269409179688, 14: 1014.9472045898438, 15: 977.3864135742188, 16: 1039.98779296875} ;
//var final_list_prev_y =  {0: 295.52239990234375, 1: 289.26226806640625, 2: 289.26226806640625, 3: 301.78253173828125, 4: 308.04266357421875, 5: 401.94464111328125, 6: 395.68450927734375, 7: 495.84661865234375, 8: 508.36688232421875, 9: 589.7485961914062, 10: 596.0087280273438, 11: 583.4884643554688, 12: 577.2283325195312, 13: 733.7316284179688, 14: 733.7316284179688, 15: 877.7146606445312, 16: 883.9747924804688} ;
//var final_list_cur_x =  {0: 1008.6870727539062, 1: 1021.2073364257812, 2: 996.1668090820312, 3: 1039.98779296875, 4: 977.3864135742188, 5: 1065.0283203125, 6: 958.6060180664062, 7: 1096.328857421875, 8: 927.3053588867188, 9: 1102.589111328125, 10: 964.8661499023438, 11: 1046.247802734375, 12: 983.6465454101562, 13: 1002.4269409179688, 14: 1014.9472045898438, 15: 977.3864135742188, 16: 1039.98779296875} ;
//var final_list_cur_y =  {0: 395.52239990234375, 1: 389.26226806640625, 2: 389.26226806640625, 3: 401.78253173828125, 4: 408.04266357421875, 5: 501.94464111328125, 6: 495.68450927734375, 7: 595.8466186523438, 8: 608.3668823242188, 9: 689.7485961914062, 10: 696.0087280273438, 11: 683.4884643554688, 12: 677.2283325195312, 13: 833.7316284179688, 14: 833.7316284179688, 15: 977.7146606445312, 16: 983.9747924804688} ;
//var movement_distances =  {5: 10.0, 7: 10.0, 9: 10.0, 6: 10.0, 8: 10.0, 10: 10.0, 11: 10.0, 13: 10.0, 15: 10.0, 12: 10.0, 14: 10.0, 16: 10.0, 3: 10.0, 1: 10.0, 0: 10.0, 2: 10.0, 4: 10.0} ;
// TEST ALL DOWN
//var final_list_prev_x =  {0: 1008.6870727539062, 1: 1021.2073364257812, 2: 996.1668090820312, 3: 1039.98779296875, 4: 977.3864135742188, 5: 1065.0283203125, 6: 958.6060180664062, 7: 1096.328857421875, 8: 927.3053588867188, 9: 1102.589111328125, 10: 964.8661499023438, 11: 1046.247802734375, 12: 983.6465454101562, 13: 1002.4269409179688, 14: 1014.9472045898438, 15: 977.3864135742188, 16: 1039.98779296875} ;
//var final_list_prev_y =  {0: 295.52239990234375, 1: 289.26226806640625, 2: 289.26226806640625, 3: 301.78253173828125, 4: 308.04266357421875, 5: 401.94464111328125, 6: 395.68450927734375, 7: 495.84661865234375, 8: 508.36688232421875, 9: 589.7485961914062, 10: 596.0087280273438, 11: 583.4884643554688, 12: 577.2283325195312, 13: 733.7316284179688, 14: 733.7316284179688, 15: 877.7146606445312, 16: 883.9747924804688} ;
//var final_list_cur_x =  {0: 1008.6870727539062, 1: 1021.2073364257812, 2: 996.1668090820312, 3: 1039.98779296875, 4: 977.3864135742188, 5: 1065.0283203125, 6: 958.6060180664062, 7: 1096.328857421875, 8: 927.3053588867188, 9: 1102.589111328125, 10: 964.8661499023438, 11: 1046.247802734375, 12: 983.6465454101562, 13: 1002.4269409179688, 14: 1014.9472045898438, 15: 977.3864135742188, 16: 1039.98779296875} ;
//var final_list_cur_y =  {0: 195.52239990234375, 1: 189.26226806640625, 2: 189.26226806640625, 3: 201.78253173828125, 4: 208.04266357421875, 5: 301.94464111328125, 6: 295.68450927734375, 7: 395.84661865234375, 8: 408.36688232421875, 9: 489.74859619140625, 10: 496.00872802734375, 11: 483.48846435546875, 12: 477.22833251953125, 13: 633.7316284179688, 14: 633.7316284179688, 15: 777.7146606445312, 16: 783.9747924804688} ;
//var movement_distances =  {5: 100.0, 7: 100.0, 9: 100.0, 6: 100.0, 8: 100.0, 10: 100.0, 11: 100.0, 13: 100.0, 15: 100.0, 12: 100.0, 14: 100.0, 16: 100.0, 3: 100.0, 1: 100.0, 0: 100.0, 2: 100.0, 4: 100.0} ;
// TEST ALL RIGHT
//var final_list_prev_x =  {0: 1008.6870727539062, 1: 1021.2073364257812, 2: 996.1668090820312, 3: 1039.98779296875, 4: 977.3864135742188, 5: 1065.0283203125, 6: 958.6060180664062, 7: 1096.328857421875, 8: 927.3053588867188, 9: 1102.589111328125, 10: 964.8661499023438, 11: 1046.247802734375, 12: 983.6465454101562, 13: 1002.4269409179688, 14: 1014.9472045898438, 15: 977.3864135742188, 16: 1039.98779296875} ;
//var final_list_prev_y =  {0: 295.52239990234375, 1: 289.26226806640625, 2: 289.26226806640625, 3: 301.78253173828125, 4: 308.04266357421875, 5: 401.94464111328125, 6: 395.68450927734375, 7: 495.84661865234375, 8: 508.36688232421875, 9: 589.7485961914062, 10: 596.0087280273438, 11: 583.4884643554688, 12: 577.2283325195312, 13: 733.7316284179688, 14: 733.7316284179688, 15: 877.7146606445312, 16: 883.9747924804688} ;
//var final_list_cur_x =  {0: 1108.6870727539062, 1: 1121.2073364257812, 2: 1096.1668090820312, 3: 1139.98779296875, 4: 1077.3864135742188, 5: 1165.0283203125, 6: 1058.6060180664062, 7: 1196.328857421875, 8: 1027.3053588867188, 9: 1202.589111328125, 10: 1064.8661499023438, 11: 1146.247802734375, 12: 1083.6465454101562, 13: 1102.4269409179688, 14: 1114.9472045898438, 15: 1077.3864135742188, 16: 1139.98779296875} ;
//var final_list_cur_y =  {0: 295.52239990234375, 1: 289.26226806640625, 2: 289.26226806640625, 3: 301.78253173828125, 4: 308.04266357421875, 5: 401.94464111328125, 6: 395.68450927734375, 7: 495.84661865234375, 8: 508.36688232421875, 9: 589.7485961914062, 10: 596.0087280273438, 11: 583.4884643554688, 12: 577.2283325195312, 13: 733.7316284179688, 14: 733.7316284179688, 15: 877.7146606445312, 16: 883.9747924804688} ;
//var movement_distances =  {5: 100.0, 7: 100.0, 9: 100.0, 6: 100.0, 8: 100.0, 10: 100.0, 11: 100.0, 13: 100.0, 15: 100.0, 12: 100.0, 14: 100.0, 16: 100.0, 3: 100.0, 1: 100.0, 0: 100.0, 2: 100.0, 4: 100.0} ;
// TEST ALL LEFT
//var final_list_prev_x =  {0: 1008.6870727539062, 1: 1021.2073364257812, 2: 996.1668090820312, 3: 1039.98779296875, 4: 977.3864135742188, 5: 1065.0283203125, 6: 958.6060180664062, 7: 1096.328857421875, 8: 927.3053588867188, 9: 1102.589111328125, 10: 964.8661499023438, 11: 1046.247802734375, 12: 983.6465454101562, 13: 1002.4269409179688, 14: 1014.9472045898438, 15: 977.3864135742188, 16: 1039.98779296875} ;
//var final_list_prev_y =  {0: 295.52239990234375, 1: 289.26226806640625, 2: 289.26226806640625, 3: 301.78253173828125, 4: 308.04266357421875, 5: 401.94464111328125, 6: 395.68450927734375, 7: 495.84661865234375, 8: 508.36688232421875, 9: 589.7485961914062, 10: 596.0087280273438, 11: 583.4884643554688, 12: 577.2283325195312, 13: 733.7316284179688, 14: 733.7316284179688, 15: 877.7146606445312, 16: 883.9747924804688} ;
//var final_list_cur_x =  {0: 908.6870727539062, 1: 921.2073364257812, 2: 896.1668090820312, 3: 939.98779296875, 4: 877.3864135742188, 5: 965.0283203125, 6: 858.6060180664062, 7: 996.328857421875, 8: 827.3053588867188, 9: 1002.589111328125, 10: 864.8661499023438, 11: 946.247802734375, 12: 883.6465454101562, 13: 902.4269409179688, 14: 914.9472045898438, 15: 877.3864135742188, 16: 939.98779296875} ;
//var final_list_cur_y =  {0: 295.52239990234375, 1: 289.26226806640625, 2: 289.26226806640625, 3: 301.78253173828125, 4: 308.04266357421875, 5: 401.94464111328125, 6: 395.68450927734375, 7: 495.84661865234375, 8: 508.36688232421875, 9: 589.7485961914062, 10: 596.0087280273438, 11: 583.4884643554688, 12: 577.2283325195312, 13: 733.7316284179688, 14: 733.7316284179688, 15: 877.7146606445312, 16: 883.9747924804688} ;
//var movement_distances =  {5: 100.0, 7: 100.0, 9: 100.0, 6: 100.0, 8: 100.0, 10: 100.0, 11: 100.0, 13: 100.0, 15: 100.0, 12: 100.0, 14: 100.0, 16: 100.0, 3: 100.0, 1: 100.0, 0: 100.0, 2: 100.0, 4: 100.0} ;

// in dictionary we store: {(col_window, row_window): angle}
var skeleton_angles = {};
var skeleton_keypoints_numbers = {};


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

function drawVectorField() {
  var yoff = 0;
  for (let y=0; y < rows; y++) {
    var angle;
    var xoff = 0;
    for (let x=0; x < cols; x++) {
      let anglesAndDistances = setEachScaledPixelAngle_calculateAlltheDistancesToEachSkeletonKeyPoint(x, y);
      let angles = anglesAndDistances.angles;
      let distances = anglesAndDistances.distances;
      print('angles = ', angles);
      print('distances = ', distances);
      
      var angles_list = [];
      for (let i=0; i<angles.length; i++) {
        let dist_val_for_angles_list = calculateCoefForEachVectorsAngle(angles[i], distances[i], calculateSum(distances));
        let movement_distances_values = Object.keys(movement_distances).map(function(key){ return movement_distances[key]; });
        let ampl_val_for_angles_list = calculateCoefForEachVectorsAngle(angles[i], movement_distances_values[i], calculateSum(movement_distances_values));
        
        angles_list[i] = calculateAnglesList(dist_val_for_angles_list, ampl_val_for_angles_list, flagWithAmplitude=false); // only distance as a weight
        angles_list[i] = calculateAnglesList(dist_val_for_angles_list, ampl_val_for_angles_list, flagWithAmplitude=true); // distance & amplitude as a weight
      }
      print('angles_list = ', angles_list);
      angle = calculateSum(angles_list);
      print('angle = ', angle);
      xoff += inc;
      let v = p5.Vector.fromAngle(angle);
      drawVectors(v, x, y, scl, 'black');
    }
    yoff += inc;
  }
}

function setEachScaledPixelAngle_calculateAlltheDistancesToEachSkeletonKeyPoint(x, y) {
  let angles = [];
  let distances = [];
  for (let key in skeleton_angles) {
    let key_x = parseInt(key.split(",")[0]);
    let key_y = parseInt(key.split(",")[1]);
    let dist = getDistance(key_x, key_y, x, y);
    let skeleton_index = skeleton_keypoints_numbers[key];
    angles[skeleton_index] = skeleton_angles[key];
    if (dist == 0) {
      distances[skeleton_index] = 0;
    } else {
      distances[skeleton_index] = 1/(dist);
    }
  }
  return {'angles': angles, 'distances': distances};
}

function calculateSum(listToSumUp) {
  return listToSumUp.reduce((partialSum, a) => partialSum + a, 0);
}

function calculateAnglesList(dist_val_for_angles_list,  ampl_val_for_angles_list, flagWithAmplitude) {
  if (flagWithAmplitude == false) {
    return dist_val_for_angles_list;
  }
  let dist_coef = 0.99;
  let amplitude_coef = 0.01;
  return dist_val_for_angles_list*dist_coef + ampl_val_for_angles_list*amplitude_coef;
}

function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.sqrt(x * x + y * y);
}

function drawVectors(v, x, y, scl, myColor) {
  stroke(myColor);
  push();
  translate(x * scl, y * scl);
  rotate(v.heading());
  line(0, 0, scl, 0);
  let arrowSize = 1;
  translate(0, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function drawRedSkeletonVectors() {
  for (let y=0; y < rows; y++) {
    let angle;
    let xoff = 0;
    for (let x=0; x < cols; x++) {
      for(let key in skeleton_angles) {
        if (key == String([x, y])) {
          angle = skeleton_angles[key];
          let v = p5.Vector.fromAngle(angle);
          drawVectors(v, x, y, scl, 'red');
        }
      }
    }
  }
}

function calculateCoefForEachVectorsAngle(angleOfKeyPoint, invDistanceOfKeyPoint, dist_sum) {
  // arguments: angles[i], distances[i], dist_sum
  // dist handle NaN
  let dist_val_for_angles_list = angleOfKeyPoint * (invDistanceOfKeyPoint/dist_sum);
  if (isNaN(dist_val_for_angles_list)) {
    dist_val_for_angles_list = 0;
  }
  return dist_val_for_angles_list;
}

function defineVectors() {
  print('we are in function: defineVectors');
  //print('skeleton_points = ', skeleton_points);
  for (let i=0; i<skeleton_points; i++) {
    // i - an number of skeleton point
    let row_prev = getVectorPixel(final_list_prev_x[i]);
    let col_prev = getVectorPixel(final_list_prev_y[i]);
    
    let row_cur = getVectorPixel(final_list_cur_x[i]);
    let col_cur = getVectorPixel(final_list_cur_y[i]);
    
    angle = defineAngle(col_prev, col_cur, row_prev, row_cur);
    
    skeleton_angles[String([row_prev, col_prev])] = angle;
    skeleton_keypoints_numbers[String([row_prev, col_prev])] = i;
  }
  str = JSON.stringify(skeleton_angles, null, 4); // (Optional) beautiful indented output.
  print(str);
}

function defineAngle(col_prev, col_cur, row_prev, row_cur) {
  print('col_prev = ', col_prev, 'col_cur = ', col_cur, 'row_prev = ', row_prev, 'row_cur = ', row_cur);
  let v0 = createVector(col_prev, row_prev);
  let v1 = createVector(col_cur, row_cur);
  
  if (col_prev > col_cur) { // down on y axis
    if (row_prev < row_cur) { // right on x axis
      angle = PI/4;
    }
    if (row_prev == row_cur) {
      angle = PI/2;
    }
    if (row_prev > row_cur) { // left on x axis
      angle = 3*PI/4;
    }
  }
  if (col_prev == col_cur) { // on one line
    if (row_prev < row_cur) { // right 
      angle = 0;
    }
    if (row_prev == row_cur) {
      angle = 0; // nothing
    }
    if (row_prev > row_cur) { // left
      angle = PI;
    }
  }
  if (col_prev < col_cur) { // up on y axis
    if (row_prev < row_cur) { // right on x axis
      angle = 7*PI/4;
    }
    if (row_prev == row_cur) { 
      angle = 3*PI/2;
    }
    if (row_prev > row_cur) { // left
      angle = 5*PI/4;
    }
  }
  
  print('the result angle is = ', angle);
  return angle;
}

function drawArrow(base, v, myColor) {
  push();
  stroke(myColor);
  strokeWeight(1);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(v.heading());
  let arrowSize = 3;
  translate(v.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function getVectorPixel(val) {
  const res = floor(val/scl);
  print('res = ', res);
  return res;
}
