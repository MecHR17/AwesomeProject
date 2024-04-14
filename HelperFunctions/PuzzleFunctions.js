const NumsFromBoard = (board,cols,rows) => {
    const SideNum = [];
    const TopNum = [];
    for(var i = 0; i < rows; i++){
        var cur = 0;
        var tmp = [];
        for(var k = i*cols; k < i*cols+cols; k++){
          if(board[k]){
            cur++;
          }
          else{
            if(cur != 0){
              tmp.push(cur);
              cur = 0;
            }
          }
        }
        if(cur != 0){
          tmp.push(cur);
        }
        SideNum.push(tmp);
    }
    for(var i=0; i<cols; i++){
        var cur = 0;
        var tmp2 = [];
        for(var k = i; k<=rows*cols-(cols-i);k+=cols){
          if(board[k]){
            cur++;
          }
          else{
            if(cur != 0){
              tmp2.push(cur);
              cur = 0;
            }
          }
        }
        if(cur != 0){
          tmp2.push(cur);
        }
    
        TopNum.push(tmp2);
    }
    return [SideNum,TopNum];
}

export default NumsFromBoard;