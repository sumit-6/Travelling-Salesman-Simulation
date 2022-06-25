function calcFitness() {
    let currentRecord = Infinity;
    for(let i = 0; i < populations.length; i++) {
        let d = calcDistance(cities, populations[i]);
        if(d < recordDistance) {
            recordDistance = d;
            bestEver = populations[i];
        }
        if(d < currentRecord) {
            currentRecord = d;
            currentBest = populations[i];
        }
        fitness[i] = 1 / (d + 1);
    }
}

function normalizeFitness() {
    let sum = 0;
    for(let i = 0; i < populations.length; i++) {
        sum += fitness[i];
    }

    for(let i = 0; i < populations.length; i++) {
        fitness[i] = fitness[i] / sum;
    }
}

function nextGeneration() {
    let newPopulation = [];
    for(let i = 0; i < populations.length; i++) {
        let orderA = pickOne(populations, fitness);
        let orderB = pickOne(populations, fitness);
        let order = crossOver(orderA, orderB);
        mutate(order, 0.01);
        newPopulation[i] = order;
    }
    populations = newPopulation;
}

function pickOne(list, probabilities) {
    let index = 0;
    let r = random(1);

    while(r > 0) {
        r = r - probabilities[index];
        index++;
    }
    index--;
    return list[index].slice();
}

function mutate(order, mutationRate) {
    for(let i = 0; i < totalCities; i++) {
        if(random(1) < mutationRate) {
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % totalCities;
           
            swap(order, indexA, indexB);
            
        }
    }
}

function crossOver(orderA, orderB) {
    let start = floor(random(orderA.length));
    let end = floor(random(start+1, orderA.length));
    let newOrder = orderA.slice(start, end);

    let left = totalCities - newOrder.length;
    for(let i = 0; i < orderB.length; i++) {
        let city = orderB[i];
        if(!newOrder.includes(city)) {
            newOrder.push(city);
        }
    }
    return newOrder;
}