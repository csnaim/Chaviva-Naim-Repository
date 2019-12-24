//get level 1/2/3 from "choose level"
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level');

let mat=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

//****************************************** */
// check that random number is not in col
function checkNotInCol(mat , num , col){ 
            for (let row = 0 ; row < 9 ; row++){
            if ( mat[row][col] == num){
                return false;
            }
            }
        return true;
        } 
//****************************************** */
// check that random number is not in row
function checkNotInRow(mat,num,row){
for (let col = 0 ; col < 9  ;col++ ){
    if ( mat [row] [col] == num){
        return false;
    }
    }
return true; 
}
//****************************************** */
// check that random number is not in cube (start from the top left corner)
function numNotInCube(mat,i,j,num) {
let counterArray = [0,0,0,0,0,0,0,0,0];
for (let row = i ; row < i+3 ; row++){
    for (let col = j ; col <j+3 ; col++){
        counterArray[mat[row][col]-1]++;    
    }
}
if (counterArray[num-1]!=1){

    return true;
}
return false;  
}
//****************************************** */

let counterArray = [1,2,3,4,5,6,7,8,9];
//****************************************** */
//get random number from 1-9
function OneRandomNumber() {
    counterArray = [1,2,3,4,5,6,7,8,9];      
    let j = counterArray.length;
    let i = Math.floor(Math.random()* j -0) + 0;
    let num = counterArray[i];
    counterArray.splice(i , 1);
    return num;  
}
//****************************************** */
// fiill one cell in the mat with a random number (check in row,col,cube) 
function fillInCell(mat,row,col,num)
{
    //check row & col
    if(checkNotInCol(mat,num,col)&&(checkNotInRow(mat,num,row)))
    {  
        //check cube (find the top left corner)
        if (row>-1&&row<3){
            if (col<3){
                if (numNotInCube(mat,0,0,num)){
                    mat[row][col]=num;
                }
            }
             else if(col>2&&col<6){
                if (numNotInCube(mat,0,3,num)){
                    mat[row][col]=num;
                        }
                }
                else if (col>5){
                    if (numNotInCube(mat,0,6,num)){
                        mat[row][col]=num;
                    }
                    }
                }
        if(row>2&&row<6)
        {
            if (col<3){
                    if (numNotInCube(mat,3,0,num)){
                        mat[row][col]=num;
                    }
                }
            
                else if(col>2&&col<6){
                    if (numNotInCube(mat,3,3,num)){
                        mat[row][col]=num;
                            }
                    }
                    else if (col>5){
                        if (numNotInCube(mat,3,6,num)){
                            mat[row][col]=num;
                        }
                        }
        }
        else if(row>5){
             if (col<3){
                    if (numNotInCube(mat,6,0,num)){
                        mat[row][col]=num;
                    }
                }
             else if(col>2&&col<6){
                    if (numNotInCube(mat,6,3,num)){
                        mat[row][col]=num;
                            }
                    }
                    else if (col>5){
                        if (numNotInCube(mat,6,6,num)){
                            mat[row][col]=num;
                        }
                        }
          } 
    }//if checks not in row ,col ,squre
}
//****************************************** */
//fill the mat
function fillInMat(mat){
    let row=0;
    while (row<9){
        let col=0;
        while(col<9){
            let num=OneRandomNumber();
            fillInCell(mat,row,col,num)
            if (mat[row][col]==0){
                    let counter=1;
                    let check=true;
                    while(counter<9&&check)
                    {                    
                        fillInCell(mat,row,col,counter)
                        if(mat[row][col]!=0)
                        {
                            check=false;
                        }
                        counter++;
                    }
                    if(check==true){
                        col=0; 
                    }
                    else{
                        col++;
                    }
                }
                else{
                    col++;
                }   
            }//col loop
            row++;
        }//row loop
    }//func
//****************************************** */
// define how many cells to take out according to level
function checkLevel(num) {
    if (num==1){
        return 20;    }
    else if(num==2){
        return 40;
    }
    else if(num==3){
        return 60;
    }
    else
    { return 20;
    }
}
//****************************************** */
// take out cells from mat according to level
function takeOutCells(mat, num) {
    // num = 20/40/60 according to the level
    // mat = the full mat
    while (num > 0){
    let row = Math.floor(Math.random()* 9 -0) + 0;
    let col = Math.floor(Math.random()* 9 -0) + 0;

    if (mat [row] [col] != ''){
    mat [row] [col] = '';
    num--
    }
}
    return mat;   
}
//****************************************** */
fillInMat(mat);
takeOutCells(mat,checkLevel(level));

//****************************************** */
// get the mat into the board game in html
function fillSudoku(mat) {
    for (let row = 0  ; row <9  ;row ++){
        for (let col = 0 ; col < 9;col ++){
            if(mat[row][col]!=''){
                document.getElementById('d'+row+'.'+col).innerHTML =mat[row][col] ;
            }   
      }
    }
}
//****************************************** */
fillSudoku(mat);

//****************************************** */
// get the input value from the board game into the mat
function GetInputValue(inputV , row , col) {
    mat [row] [col] = parseInt(inputV); 
}


//****************************************** */
// reset button
function againMatBtn() { 
    document.getElementById("form1").reset();      
}

//****************************************** */
// check if the user solved correctly the sudoku

// check every row
function checkRow(mat) {
    for (let row=0 ; row < 9 ; row++){
    for (let col=0 ; col < 9 ; col++){     
            for (let k= col+1 ; k < 9 ; k++){
            if (mat [row] [k] == mat [row] [col] || !(mat[row][col] > 0 && mat[row][col] <= 9)){
            return false;
            }
            }
     } }
    return true;
}
//****************************************** */
// check every col
function checkCol(mat) {
    for (let col=0 ; col < 9 ; col++){
        for (let row=0 ; row < 9 ; row++){     
                for (let k= row+1 ; k < 9 ; k++){
                if (mat [k] [col] == mat [row] [col]){
                return false;
                }
                }
         } }
    return true;
}
//****************************************** *
// check every cube
function checkAllCubes(mat) {
    
    for (let row1 = 0  ; row1 < 7  ;row1 += 3){
        for (let col1 = 0 ; col1 < 7 ; col1 += 3){

            // check one cube
            let counterArray = [0,0,0,0,0,0,0,0,0];
            for (let row = row1 , counter = 0 ; counter < 3 ; row++ , counter++){
                for (let col = col1 , counter1 = 0 ; counter1 < 3 ; col++ , counter1++){
                    counterArray[mat[row][col]-1]++    
                }
            }
            for (let i = 0 ; i<counterArray.length ; i++){
                if (counterArray[i]!=1){
                    return false;
                }
            }      
        }
        }
        return true;
        
    }

// check function
function checkSudoku(mat){
    let checkFlag = true;
    
    if (checkRow(mat) == false){
        checkFlag = false;
    }
    else if (checkCol(mat) == false){
        checkFlag = false;
    }
    else if (checkAllCubes(mat) == false){
        checkFlag = false;
    }

    if (checkFlag == false){
        let link1 = document.getElementById('link').innerHTML = window.location.href= "finish.html";
        return link1;
    }
    else {
        let link2 = document.getElementById('link').innerHTML = window.location.href= "finish_correct.html";
        return link2;
    }

    }



    // enter random numbers from 1-9 into an array
function randomNumber(arr) {
    let counterArray = [1,2,3,4,5,6,7,8,9];
    for (let j = 9 ; j > 0 ; j--){
    let i = Math.floor(Math.random()* j -0) + 0;
    let num = counterArray[i];
    arr.push (num);
    counterArray.splice(i , 1);  
    }
    return arr;
}
randomNumber([]);
