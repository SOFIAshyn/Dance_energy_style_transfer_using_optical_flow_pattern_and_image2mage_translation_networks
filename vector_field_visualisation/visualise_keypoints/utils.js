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

function getVectorPixel(val) {
  const res = floor(val/scl);
  print('res = ', res);
  return res;
}
