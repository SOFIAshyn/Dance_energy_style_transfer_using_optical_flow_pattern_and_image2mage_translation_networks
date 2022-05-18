function preload() {
  jsonFile = loadJSON('assets/1hdHc1hJAWU_005_.json');
}

function setup() {
  //count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');

  //print(table.getColumn('name'));
  //["Goat", "Leopard", "Zebra"]

  //cycle through the table
  for (let r = 0; r < table.getRowCount(); r++) {
    let prev_frame_name = table.getString(r, 0);
    let cur_frame_name = table.getString(r, 1);
    let final_list_prev_x = table.getString(r, 2);
    let final_list_prev_y = table.getString(r, 3);
    let final_list_cur_x = table.getString(r, 4);
    let final_list_cur_y = table.getString(r, 5);
    let movement_distances = table.getString(r, 6);
    
    final_list_prev_x = JSON.parse(final_list_prev_x);
    final_list_prev_y = JSON.parse(final_list_prev_y);
    final_list_cur_x = JSON.parse(final_list_cur_x);
    final_list_cur_y = JSON.parse(final_list_cur_y);
    
    //prev_keypoints_to = prev_keypoints_to.replace('[', '').replace(']', '').split(', ');
    print(typeof(final_list_prev_x));
    print(final_list_prev_x);
  }
  //createCanvas(1920, 1080);
  //createCanvas(1920, 1080);
  //stroke(51);
  //cols = floor(width / scl);
  //rows = floor(height / scl);
  ////print('cols = ', cols, 'rows = ', rows);
  //// in dictionary we store: {(col_window, row_window): angle}
  
  //defineVectors();
  noLoop();
}

function draw() {
  background(255)
  
  loadPixels();
  angleMode(RADIANS);
  
  //setSkeletonArrays();
  //drawVectorField();
  //drawRedSkeletonVectors();
}
