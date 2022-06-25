let cities = [];
let List = (document.querySelector('#playto').textContent).split(' ');
let totalCities = parseInt(List[1]);
let decision = parseInt(List[0]);
//let totalCities = 7;
let recordDistance;
let bestEver = [];
let order = [];
function setup()
{
    createCanvas(1520, 700);
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

    let d = calcDistance(cities, order);
    recordDistance = d;
    bestEver = order.slice();
}

function draw()
{
    background(0);
    stroke(255, 0, 255);
    strokeWeight(2.5);
    
    let Noderadius = 8;
    noFill();
    for(let i = 0; i < cities.length; i++)
    {
        ellipse(cities[i].x, cities[i].y, 2*Noderadius, 2*Noderadius);
    }

    let d = calcDistance(cities, order);
    if(d < recordDistance)
    {
        recordDistance = d;
        bestEver = order.slice();
    }
    
    noFill();
    for(let i = 0; i < bestEver.length; i++)
    {
        let n = bestEver[(i)];
        let m = bestEver[(i+1)%(bestEver.length)];
        let n1 = order[(i)];
        let m1 = order[(i+1)%(order.length)];
        let x0 = cities[n].x;
        let y0 = cities[n].y;
        let x1 = cities[m].x;
        let y1 = cities[m].y;

        let x00 = cities[n1].x;
        let y00 = cities[n1].y;
        let x10 = cities[m1].x;
        let y10 = cities[m1].y;

        let D = Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0));
        let x2 = (((D-Noderadius)*x0) + (Noderadius*x1))/D;
        let y2 = (((D-Noderadius)*y0) + (Noderadius*y1))/D;

        let x3 = (((D-Noderadius)*x1) + (Noderadius*x0))/D;
        let y3 = (((D-Noderadius)*y1) + (Noderadius*y0))/D;

        let D0 = Math.sqrt((x10-x00)*(x10-x00) + (y10-y00)*(y10-y00));
        let x20 = (((D0-Noderadius)*x00) + (Noderadius*x10))/D0;
        let y20 = (((D0-Noderadius)*y00) + (Noderadius*y10))/D0;

        let x30 = (((D0-Noderadius)*x10) + (Noderadius*x00))/D0;
        let y30 = (((D0-Noderadius)*y10) + (Noderadius*y00))/D0;

        let angle = Math.atan((y1-y0)/(x1-x0));

        let X0, Y0, X1, Y1;
        let signX = 1;
        let R = Math.sqrt(((x0 - x3)*(x0 - x3)) + ((y3-y0)*(y3-y0)));
        let arrowLength = 3*Noderadius;
        let degree = 25;
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

        stroke(255, 255, 255);
        strokeWeight(1);
        line(x20, y20, x30, y30);

        stroke(255, 0, 255);
        strokeWeight(2.5);
        line(x2, y2, x3, y3);
        line(x3, y3, X0, Y0);
        line(x3, y3, X1, Y1);
    }

    textSize(Noderadius * 2.5);
    stroke(255, 255, 255);
    strokeWeight(1);
    let s = `Current Path for ${order.length} nodes: `;
    for(let i = 0; i < order.length + 1; i++)
    {
        s += order[(i%order.length)];
        if(i < order.length)
        {
            text(i, cities[i].x - Noderadius, cities[i].y + 3.25*Noderadius);
            s += ' -> ';
        }
    }
    fill(255);
    text(s, 20, height - 100);


    textSize(20);
    stroke(255, 255, 255);
    strokeWeight(1);
    s = `Optimal Path for ${order.length} nodes: `;
    for(let i = 0; i < bestEver.length + 1; i++)
    {
        s += bestEver[(i%bestEver.length)];
        if(i < bestEver.length)
        {
            s += ' -> ';
        }
    }
    fill(255);
    text(s, 20, height - 75);
    nextOrder();
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
function nextOrder()
{
    //STEP - 1
    let largestI = -1;
    for(let i = 0; i < order.length - 1; i++){
        if(order[i] < order[i+1])
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
    for(let j = 0; j < order.length; j++)
    {
        if(order[j] > order[largestI])
        {
            largestJ = j;
        }
    }
    //STEP - 3
    swap(order, largestI, largestJ);
    //STEP - 4
    let endArray = order.splice(largestI+1);
    endArray.reverse();
    order = order.concat(endArray);
}
