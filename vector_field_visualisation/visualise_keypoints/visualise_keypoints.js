var inc = 0.1;
var scl = 20;
var cols, rows;

const skeleton_points = 17;
//var final_list_cur_x = {0: 676.0780029296875,
// 1: 685.7389526367188,
// 2: 671.2474975585938,
// 3: 690.5694580078125,
// 4: 656.7559814453125,
// 5: 695.3999633789062,
// 6: 632.603515625,
// 7: 738.8743896484375,
// 8: 579.4680786132812,
// 9: 796.84033203125,
// 10: 560.1461181640625,
// 11: 700.23046875,
// 12: 661.5864868164062,
// 13: 690.5694580078125,
// 14: 690.5694580078125,
// 15: 651.9254760742188,
// 16: 714.721923828125}
//var final_list_cur_y = {0: 284.82269287109375,
// 1: 279.9921875,
// 2: 275.1617126464844,
// 3: 275.1617126464844,
// 4: 270.3312072753906,
// 5: 279.9921875,
// 6: 308.97515869140625,
// 7: 226.85675048828125,
// 8: 352.4496154785156,
// 9: 202.7042694091797,
// 10: 410.4155578613281,
// 11: 410.4155578613281,
// 12: 415.2460632324219,
// 13: 516.6864624023438,
// 14: 497.3644714355469,
// 15: 651.9403076171875,
// 16: 589.1438598632812}
//var final_list_prev_x = {0: 672.7261352539062,
// 1: 681.8466186523438,
// 2: 668.1658935546875,
// 3: 695.52734375,
// 4: 654.4852294921875,
// 5: 704.6478271484375,
// 6: 636.2442626953125,
// 7: 750.2501831054688,
// 8: 576.9611206054688,
// 9: 804.9730834960938,
// 10: 567.8406982421875,
// 11: 690.9671020507812,
// 12: 645.36474609375,
// 13: 681.8466186523438,
// 14: 586.0816040039062,
// 15: 654.4852294921875,
// 16: 554.1599731445312}
//var final_list_prev_y = {0: 306.846435546875,
// 1: 297.7259521484375,
// 2: 297.7259521484375,
// 3: 288.6054992675781,
// 4: 279.4850158691406,
// 5: 302.28619384765625,
// 6: 306.846435546875,
// 7: 229.3223876953125,
// 8: 347.8885803222656,
// 9: 238.44287109375,
// 10: 411.73193359375,
// 11: 420.8524169921875,
// 12: 416.29217529296875,
// 13: 534.8583984375,
// 14: 525.7379150390625,
// 15: 648.8643188476562,
// 16: 635.18359375}
// TEST 1 PICTURE: 
//var final_list_prev_x =  {0: 441.2099609375, 1: 452.9404602050781, 2: 441.2099609375, 3: 488.1319580078125, 4: 447.0751953125, 5: 517.4581909179688, 6: 447.0751953125, 7: 593.7064208984375, 8: 429.4794616699219, 9: 664.0894165039062, 10: 388.4226989746094, 11: 511.59295654296875, 12: 464.67095947265625, 13: 482.2666931152344, 14: 388.4226989746094, 15: 499.8624572753906, 16: 318.0397033691406} ;

//var final_list_prev_y =  {0: 568.099365234375, 1: 556.368896484375, 2: 562.234130859375, 3: 562.234130859375, 4: 562.234130859375, 5: 620.8865966796875, 6: 632.6171264648438, 7: 656.078125, 8: 714.7305908203125, 9: 673.6738891601562, 10: 773.3831176757812, 11: 773.3831176757812, 12: 779.2483520507812, 13: 908.2838745117188, 14: 896.5533447265625, 15: 1037.3193359375, 16: 990.3973388671875} ;

//var final_list_cur_x =  {0: 453.73431396484375, 1: 464.7712707519531, 2: 453.73431396484375, 3: 497.882080078125, 4: 464.7712707519531, 5: 530.992919921875, 6: 448.2158508300781, 7: 608.2515258789062, 8: 404.0680847167969, 9: 685.5100708007812, 10: 348.8833923339844, 11: 508.9190368652344, 12: 464.7712707519531, 13: 525.4744262695312, 14: 431.6604309082031, 15: 564.103759765625, 16: 381.99420166015625} ;

//var final_list_cur_y =  {0: 564.3138427734375, 1: 553.2769165039062, 2: 553.2769165039062, 3: 564.3138427734375, 4: 564.3138427734375, 5: 625.0170288085938, 6: 630.5355224609375, 7: 647.0909423828125, 8: 702.275634765625, 9: 674.6832885742188, 10: 740.9049072265625, 11: 768.497314453125, 12: 779.5342407226562, 13: 900.9406127929688, 14: 895.422119140625, 15: 1033.3839111328125, 16: 1016.8284912109375} ;

//var movement_distance = {5: 167.29270072563656, 7: 153.25336140411312, 9: 58.02013233763715, 6: 168.41515397402392, 8: 145.88219756334922, 10: 68.9278837151021, 11: 160.18588470690094, 13: 108.79674548839292, 15: 83.608900856018, 12: 161.09948787228927, 14: 121.84093053769915, 16: 193.09551979590128, 3: 163.3316982974249, 1: 159.55322691217668, 0: 160.38184329459975, 2: 160.62894248322752, 4: 171.0049021977164};
// TEST ALL UP
var final_list_prev_x =  {0: 1008.6870727539062, 1: 1021.2073364257812, 2: 996.1668090820312, 3: 1039.98779296875, 4: 977.3864135742188, 5: 1065.0283203125, 6: 958.6060180664062, 7: 1096.328857421875, 8: 927.3053588867188, 9: 1102.589111328125, 10: 964.8661499023438, 11: 1046.247802734375, 12: 983.6465454101562, 13: 1002.4269409179688, 14: 1014.9472045898438, 15: 977.3864135742188, 16: 1039.98779296875} ;
var final_list_prev_y =  {0: 295.52239990234375, 1: 289.26226806640625, 2: 289.26226806640625, 3: 301.78253173828125, 4: 308.04266357421875, 5: 401.94464111328125, 6: 395.68450927734375, 7: 495.84661865234375, 8: 508.36688232421875, 9: 589.7485961914062, 10: 596.0087280273438, 11: 583.4884643554688, 12: 577.2283325195312, 13: 733.7316284179688, 14: 733.7316284179688, 15: 877.7146606445312, 16: 883.9747924804688} ;
var final_list_cur_x =  {0: 1008.6870727539062, 1: 1021.2073364257812, 2: 996.1668090820312, 3: 1039.98779296875, 4: 977.3864135742188, 5: 1065.0283203125, 6: 958.6060180664062, 7: 1096.328857421875, 8: 927.3053588867188, 9: 1102.589111328125, 10: 964.8661499023438, 11: 1046.247802734375, 12: 983.6465454101562, 13: 1002.4269409179688, 14: 1014.9472045898438, 15: 977.3864135742188, 16: 1039.98779296875} ;
var final_list_cur_y =  {0: 305.52239990234375, 1: 299.26226806640625, 2: 299.26226806640625, 3: 311.78253173828125, 4: 318.04266357421875, 5: 411.94464111328125, 6: 405.68450927734375, 7: 505.84661865234375, 8: 518.3668823242188, 9: 599.7485961914062, 10: 606.0087280273438, 11: 593.4884643554688, 12: 587.2283325195312, 13: 743.7316284179688, 14: 743.7316284179688, 15: 887.7146606445312, 16: 893.9747924804688} ;
var movement_distances =  {5: 10.0, 7: 10.0, 9: 10.0, 6: 10.0, 8: 10.0, 10: 10.0, 11: 10.0, 13: 10.0, 15: 10.0, 12: 10.0, 14: 10.0, 16: 10.0, 3: 10.0, 1: 10.0, 0: 10.0, 2: 10.0, 4: 10.0} ;

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
  
  var yoff = 0;
  loadPixels();
  for (var y=0; y < rows; y++) {
    var angle;
    var xoff = 0;
    for (var x=0; x < cols; x++) {
      var flag = false;
      for(var key in skeleton_angles) {
        if (key == String([x, y])) {
          //stroke(255, 255, 0);
          angle = skeleton_angles[key];
          flag = true;
        }
      }
      if (flag == false) {
        angle = PI/2;
        //for (key in skeleton_angles) {
        //  //stroke(0);
        //  let key_x = parseInt(key.split(",")[0]);
        //  let key_y = parseInt(key.split(",")[1]);
        //  let dist = getDistance(key_x, key_y, x, y);
        //  // amplitude with which the person has moved the hand
        //  let power_value = movement_distance[skeleton_keypoints_numbers[key]];
        //  print('key_x_y = ', key_x, 'key_y = ', key_y, '; power_value = ', power_value);
        //  angle += skeleton_angles[key] * 1/(dist * 0.6) + power_value*0.001;
        //  flag = true; // default
        //}
      }
      xoff += inc;
      var v = p5.Vector.fromAngle(angle);
      drawVectors(v, x, y, scl);
      
    }
    yoff += inc;
  }
}

function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.sqrt(x * x + y * y);
}

function drawVectors(v, x, y, scl) {
  stroke(0);
  push();
  translate(x * scl, y * scl);
  rotate(v.heading());
  line(0, 0, scl, 0);
  let arrowSize = 1;
  translate(scl * (v.mag() - arrowSize), 0);
  triangle(-arrowSize, 0, 0, arrowSize / 2, 0, -arrowSize / 2);
  pop();
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
    
    print('(row_prev, col_prev) = ', row_prev, col_prev, '; angle = ', angle);
    skeleton_angles[String([row_prev, col_prev])] = angle;
    skeleton_keypoints_numbers[String([row_prev, col_prev])] = i;
  }
  str = JSON.stringify(skeleton_angles, null, 4); // (Optional) beautiful indented output.
  print(str);
}

function defineAngle(col_prev, col_cur, row_prev, row_cur) {
  if (col_prev > col_cur && row_prev < row_cur) {
    angle = PI/4;
  } else if (col_prev == col_cur && row_prev < row_cur) {
    angle = PI/2; // angle = PI/2
  } else if (col_prev > col_cur && row_prev < row_cur) {
    angle = 3*PI/4;
  } else if (col_prev < col_cur && row_prev == row_cur) {
    angle = PI-0.001; // 0
  } else if (col_prev == col_cur && row_prev == row_cur) {
    angle = 0; // should be 0; nothing (dot is suppposed to be)
  } else if (col_prev > col_cur && row_prev == row_cur) {
    angle = 0.001; // 
  } else if (col_prev > col_cur && row_prev > row_cur) {
    angle = 7*PI/4;
  } else if (col_prev == col_cur && row_prev > row_cur) {
    angle = 3*PI/2;
  } else if (col_prev < col_cur && row_prev < row_cur) {
    angle = 5*PI/4;
  }
  print('the result angle is = ', angle);
  return angle;
}

function getVectorPixel(val) {
  const res = floor(val/scl);
  print('res = ', res);
  return res;
}
