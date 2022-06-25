let cities = [];
let List = (document.querySelector('#playto').textContent).split(' ');
let totalCities = parseInt(List[1]);
let decision = parseInt(List[0]);
let popSize = 350;
let populations = [];
let fitness = [];

let recordDistance = Infinity;
let bestEver;
let currentBest;

let statusP;
function setup() {
    createCanvas(1500, 800);
    let order = [];

    if(decision == 1)
    {
        for(let i = 0; i < totalCities; i++)
        {
            let v = createVector(random(width - 60), random((height)/2));
            v.x += 30;
            v.y += 30;
            cities[i] = v;
            order[i] = i;
        }  
    }
    else
    {
        let ID = 2;
        for(let i = 0; i < totalCities; i++)
        {
            let v = createVector(parseInt(List[ID]), parseInt(List[ID+1]));
            v.x += 30;
            v.y += 30;
            cities[i] = v;
            order[i] = i;
            ID += 2;
        }  
    }

    for(let i = 0; i < popSize; i++) {
        populations[i] = shuffle(order);
    }
    console.log(populations);

  

    statusP = createP('').style('font-size', '32pt');
    /*
    let d = calcDistance(cities, order);
    recordDistance = d;
    bestEver = order.slice();
    */

}

function draw() {
    background(0);

    //GA
    calcFitness();
    normalizeFitness();
    nextGeneration();

   

    stroke(255);
    strokeWeight(4);
    noFill();
    beginShape();
    for(let i = 0; i < bestEver.length; i++) {
        let n = bestEver[i];
        vertex(cities[n].x, cities[n].y);
        ellipse(cities[n].x, cities[n].y, 16, 16);
    }
    vertex(cities[bestEver[0]].x, cities[bestEver[0]].y);
    endShape();

    
    translate(0, height/2);
    stroke(255);
    strokeWeight(1);
    noFill();
    for(let i = 0; i < currentBest.length; i++) {
        let n = currentBest[i];
        vertex(cities[n].x, cities[n].y);
        ellipse(cities[n].x, cities[n].y, 8, 8);
    }
    endShape();
    
}

/*
function shuffle(a, num) {
    for(let n = 0; n < num; n++) {
        let indexA = floor(random(a.length));
        let indexB = floor(random(a.length));
        swap(a, indexA, indexB);
    }
}
*/

function swap(arr, i, j)
{
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function calcDistance(points, order)
{
    let sum = 0;
    for(let i = 0; i < order.length; i++)
    {
        let cityA = points[order[i]];
        let cityB = points[order[(i+1)%order.length]];
        sum += dist(cityA.x, cityA.y, cityB.x, cityB.y);
    }

    return sum;
}
