let vals = [0, 1, 2, 3, 4, 5, 6, 7];

function setup(){
    createCanvas(400, 300);
}

function draw(){
    background(0);
    console.log(vals);
    //STEP - 1
    let largestI = -1;
    for(let i = 0; i < vals.length - 1; i++){
        if(vals[i] < vals[i+1])
        {
            largestI = i;
        }
    }
    if(largestI == -1) 
    {
        noLoop();
        console.log('finished');
    }
    //STEP - 2
    let largestJ = -1;
    for(let j = 0; j < vals.length; j++)
    {
        if(vals[j] > vals[largestI])
        {
            largestJ = j;
        }
    }
    //STEP - 3
    swap(vals, largestI, largestJ);
    //STEP - 4
    let endArray = vals.splice(largestI+1);
    endArray.reverse();

    textSize(64);
    let s = '';
    for(let i = 0; i < vals.length; i++)
    {
        s += vals[i];
    }
    fill(255);
    text(s, 20, height/2);
}

function swap(arr, i, j)
{
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}