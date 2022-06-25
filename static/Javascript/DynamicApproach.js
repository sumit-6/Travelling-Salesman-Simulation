let graph = [];
let infinity = 1000000000;
let cities = [];
let List = (document.querySelector('#playto').textContent).split(' ');
let totalCities = parseInt(List[1]);
let decision = parseInt(List[0]);
let recordDistance;
let bestEver = [];
let order = [];
let memo = [];
let solution;
let r = 3;
let PI = 2*Math.acos(0.0);

function setup(){
    createCanvas(1520, 700);
    r = 3;
    if(decision == 1)
    {
        for(let i = 0; i < totalCities; i++)
        {
            let v = createVector(random(width - 60), random((2*height)/3));
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
    for(let i = 0; i < totalCities; i++)
    {
        let arr = [];
        graph.push(arr);
        for(let j = 0; j < totalCities; j++)
        {
            let cityA = cities[i];
            let cityB = cities[j];
            let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
            graph[i][j] = d;
        }
    }
    //fill(255);
}

function draw(){
    background(0);
    frameRate(0.6);
    let N = graph.length;
    let len = 1 << N;
    
    for(let i = 0; i < N; i++)
    {
        let arr = [];
        for(let j = 0; j < len; j++){
            arr.push(infinity);
        }
        memo.push(arr);
    }

    createMemo(0, N);
    process(0, N, r);
    let minCost = findMinCost(0, r);
    let tour = findOptimalTour(0, r);
    console.log(minCost, tour);
    r = (r + 1);
    if(r == N+1) noLoop();
}
/*let switcher = 1;
function mousePressed() {
    if(switcher % 2 == 0)
        noLoop();
    else
        loop();
    switcher++;
}*/
  
function createMemo(S, N){
    for(let i = 0; i < N; i++) {
        if(i != S) {
            memo[i][(1 << S) | (1 << i)] = graph[S][i];
        }
    }
}

function S1(x0, y0, x, y, r)
{
    let s = ((x - x0) * (x - x0)) + ((y - y0) * (y - y0)) - (r * r);
    if (s < 0)
    {
        return true;
    }
    return false;
}

function process(S, N, r){
    let v = combinations(r, N);
    for(let subset of v)
    {
        if(notIn(S, subset)) continue;
        for(let next = 0; next < N; next++){
            if(next == S || notIn(next, subset)) continue;
            let state = subset ^ (1 << next);
            let minDist = infinity;
            for(let e = 0; e < N; e++){
                if(e == S || e == next || notIn(e, subset)) continue;
                let newDistance = memo[e][state] + graph[e][next];
                if(newDistance < minDist) minDist = newDistance;
            }
            memo[next][subset] = minDist;
        }
    }
    //fill(255);
    let Noderadius = 8;
    noFill();
    stroke(255, 0, 255);
    strokeWeight(2);
    for(let i = 0; i < N; i++)
    {
        ellipse(cities[i].x, cities[i].y, 2*Noderadius, 2*Noderadius);
    }
    let partialSolution = findOptimalTour(0, r);
    console.log(partialSolution);
    
    //noFill();
    //beginShape();
    for(let i = 0; i < partialSolution.length - 1; i++)
    {
        let n = partialSolution[(i)];
        let m = partialSolution[i+1];
        let x0 = cities[n].x;
        let y0 = cities[n].y;
        let x1 = cities[m].x;
        let y1 = cities[m].y;
        let D = Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0));
        let x2 = (((D-Noderadius)*x0) + (Noderadius*x1))/D;
        let y2 = (((D-Noderadius)*y0) + (Noderadius*y1))/D;

        let x3 = (((D-Noderadius)*x1) + (Noderadius*x0))/D;
        let y3 = (((D-Noderadius)*y1) + (Noderadius*y0))/D;
        let angle = Math.atan((y1-y0)/(x1-x0));

        let X0, Y0, X1, Y1;
        let signX = 1;
        let R = Math.sqrt(((x0 - x3)*(x0 - x3)) + ((y3-y0)*(y3-y0)));
        let arrowLength = 3*Noderadius;
        let degree = 20;
        for(let i = 0; i < 2; i++)
        {
            signX = 1 - signX;
            if (signX == 0)
            {
                X0 = x3 + (arrowLength) * (Math.cos(angle + (degree * PI) / 180));
                X1 = x3 + (arrowLength) * Math.cos(angle - (degree * PI) / 180);
                Y0 = y3 + (arrowLength) * (Math.sin(angle + (degree * PI) / 180));
                Y1 = y3 + (arrowLength) * Math.sin(angle - (degree * PI) / 180);
            }
            else
            {
                X0 = x3 - (arrowLength) * (Math.cos(angle + (degree * PI) / 180));
                X1 = x3 - (arrowLength) * Math.cos(angle - (degree * PI) / 180);
                Y0 = y3 - (arrowLength) * (Math.sin(angle + (degree * PI) / 180));
                Y1 = y3 - (arrowLength) * Math.sin(angle - (degree * PI) / 180);
            }
            if (S1(x0, y0, X0, Y0, R) && S1(x0, y0, X1, Y1, R))
            {
                break;
            }
        }
        line(x2, y2, x3, y3);
        line(x3, y3, X0, Y0);
        line(x3, y3, X1, Y1);
    }
    //endShape(); 

    

    
    textSize(Noderadius*2.5);
    stroke(255, 255, 255);
    strokeWeight(1);
    let s = `Optimal Path for ${r} nodes: `;
    for(let i = 0; i < partialSolution.length; i++)
    {
        s += partialSolution[i];
        //fill(255);
        if(i != partialSolution.length - 1)
        {
            text(i, cities[i].x - Noderadius, cities[i].y + 3.25*Noderadius);
            s += ' -> ';
        }
    }
    fill(255);
    text(s , 20, height - 100);
}

function notIn(i, subset)
{
    return (((1 << i) & subset) == 0);
}

function combinations(r, N){
    let subsets = [];
    function f(Set, At, r, N)
    {
        if(r == 0) subsets.push(Set);
        else{
            for(let i = At; i < N; i++){
                Set = Set | (1 << i);
                f(Set, i+1, r-1, N);
                Set = Set & ~(1 << i);
            }
        }
    }
    
    f(0, 0, r, N);
    return subsets;
}

function findMinCost(S, N){
    let END_STATE = (1 << N) - 1;
    let minTourCost = infinity;
    for(let e = 0; e < N; e++){
        if(e == S) continue;
        let tourCost = memo[e][END_STATE] + graph[e][S];
        if(tourCost < minTourCost) minTourCost = tourCost;
    }
    return minTourCost;
}

function findOptimalTour(S, N){
    let lastIndex = S;
    let state = (1 << N) - 1;
    let tour = [];
    for(let i = N-1; i >= 1; i--){
        let index = -1;
        for(let j = 0; j < N; j++){
            if(j == S || notIn(j, state)) continue;
            if(index == -1) index= j;
            let prevDist = memo[index][state] + graph[index][lastIndex];
            let newDist = memo[j][state] + graph[j][lastIndex];
            if(newDist < prevDist) index = j;
        }
        tour[i] = index;
        state = state ^ (1 << index);
        lastIndex = index;
    }
    tour[0] = tour[N] = S;
    return tour;
}
