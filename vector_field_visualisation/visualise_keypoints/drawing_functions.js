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

//function drawArrow(base, v, myColor) {
//  push();
//  stroke(myColor);
//  strokeWeight(1);
//  fill(myColor);
//  translate(base.x, base.y);
//  line(0, 0, vec.x, vec.y);
//  rotate(v.heading());
//  let arrowSize = 3;
//  translate(v.mag() - arrowSize, 0);
//  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
//  pop();
//}
