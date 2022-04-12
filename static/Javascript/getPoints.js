const resources = document.getElementById("resources");
let data = document.getElementById("data");
data = data.textContent;
data = data.split(" ");
let numberOfResources = parseInt(data[0]);
let ID = 0;

function addField(object, int, statement)
{
    const field = document.createElement("div");
    field.setAttribute("class", "field");
    field.setAttribute("style", "display:inline-block; width:35rem; margin:1rem");
    const label = document.createElement("label");
    label.setAttribute("for", `${int}`);
    label.setAttribute("class", "label is-inline is-medium");
    label.innerHTML = statement;
    const div = document.createElement("div");
    div.setAttribute("class", "control");
    const input = document.createElement("input");
    //input.setAttribute("style", "display:inline-block;");
    input.setAttribute("class", "input is-info");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter a number");
    input.setAttribute("name", `${int}`);
    field.appendChild(label);
    div.appendChild(input);
    field.appendChild(div);
    object.appendChild(field);
}

for(let i = 0; i < numberOfResources; i++)
{
    let statement = `City ${i+1}: x `;
    addField(resources, ID, statement);
    ID++;
    statement = `City ${i+1}: y `;
    addField(resources, ID, statement);
    ID++;
}