let dataJson;

function createHTML() {

    const container = document.getElementById('container');
    container.setAttribute('class', 'container');

    const cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'card-container');
    cardContainer.id = 'cardContainer';

    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'button-container');

    const addButton = document.createElement('button');
    addButton.setAttribute('class', 'add-button');
    addButton.textContent = "ADD";
    addButton.addEventListener("click", () => {
        if (dataJson.table.length < 5) {
            let maxId = 0;
            for (let i = 0; i < dataJson.table.length; i++) {
                if (dataJson.table[i].id > maxId) {
                    maxId = dataJson.table[i].id;
                }
            }
            let id = maxId + 1;
            let sco = 0;
            let newObject = {
                "id": id,
                "score": sco
            };

            dataJson.table.push(newObject);
            createScoreCard(newObject, dataJson.table.length);
        }
        if (dataJson.table.length == 5) {
            addButton.setAttribute("disabled", true);
        }
        if (dataJson.table.length > 1) {
            deleteButton.removeAttribute("disabled");
        }

    });

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.textContent = "DELETE";
    deleteButton.addEventListener("click", () => {
        if (dataJson.table.length > 1) {
            let elementToDelete = document.getElementById(dataJson.table[dataJson.table.length - 1].id);
            elementToDelete.remove();
            dataJson.table.pop(dataJson.table);
        }
        if (dataJson.table.length == 1) {
            deleteButton.setAttribute("disabled", true);
        }
        if (dataJson.table.length < 5) {
            addButton.removeAttribute("disabled");
        }
    });

    container.appendChild(cardContainer);
    container.appendChild(buttonContainer);
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(deleteButton);
}
createHTML();

function createScoreCard(jsonScoreElement, position) {
    const cardContainer = document.getElementById('cardContainer');

    const card = document.createElement('div');
    card.setAttribute('class', 'card tooltip-card');
    card.id = jsonScoreElement.id;
    card.addEventListener("mouseenter", () => {
        tooltipText.style.visibility = 'visible';
    });
    card.addEventListener("mouseleave", () => {
        tooltipText.style.visibility = 'hidden';
    });

    const plusButton = document.createElement('button');
    plusButton.setAttribute('class', 'plus-button');
    plusButton.id = 'plusButton' + jsonScoreElement.id;
    plusButton.textContent = "+";
    let scoreValue = jsonScoreElement.score;
    let operation = position * 10;
    plusButton.addEventListener("click", () => {
        if (scoreValue < operation) {
            scoreValue++;
            const increase = document.getElementById("score" + jsonScoreElement.id);
            increase.textContent = scoreValue;
            jsonScoreElement.score = scoreValue;
        }
        if (scoreValue != operation) {
            tooltipText.style.visibility = 'hidden';
        } else {
            tooltipText.style.visibility = 'visible';
        }
    });

    const tooltipText = document.createElement('span');
    tooltipText.setAttribute('class', 'tooltip-text');
    tooltipText.textContent = 'The max score is ' + operation;

    const score = document.createElement('p');
    score.setAttribute('class', 'score');
    score.id = 'score' + jsonScoreElement.id;
    score.textContent = jsonScoreElement.score;

    const minusButton = document.createElement('button');
    minusButton.setAttribute('class', 'minus-button');
    minusButton.id = 'minusButton' + jsonScoreElement.id;;
    minusButton.textContent = "-";
    minusButton.addEventListener("click", () => {
        if (jsonScoreElement.score > 0) {
            scoreValue--;
            const decrease = document.getElementById("score" + jsonScoreElement.id);
            decrease.textContent = scoreValue;
            jsonScoreElement.score = scoreValue;
        }
        tooltipText.style.visibility = 'hidden';
    });

    cardContainer.appendChild(card);
    card.appendChild(tooltipText);
    card.appendChild(plusButton);
    card.appendChild(score);
    card.appendChild(minusButton);
}

function showCard() {
    fetch('./JSONDATA.json')
        .then(response => response.json())
        .then(data => {

            dataJson = data;
            let contador = 1;
            data.table.forEach(element => {
                createScoreCard(element, contador);
                contador++;
            });
        });
}
showCard();
