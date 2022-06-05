// Задание 4

/* Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
После получения данных вывести ниже картинку на экран.*/

const button = document.querySelector(".j-send-request");
const input1 = document.querySelector(".j-input1");
const input2 = document.querySelector(".j-input2");
const resultNode = document.querySelector(".j-result");

function getDataFromInputs () {
  let imageWidth = verifyInput(input1.value);
  let imageHeight = verifyInput(input2.value);
  if (!imageWidth || !imageHeight) {
    return;
  };

  fetch(`https://picsum.photos/${imageWidth}/${imageHeight}`)
    .then(response => {
      let image = `
      <img class="downloaded-image" src="${response.url}" alt="">
      `;
      resultNode.innerHTML = image;
    })
    .catch(error => console.log(error.message));
};

function verifyInput(data) {
  if (isNaN(data) || data < 100 || data > 300) {
    resultNode.innerHTML = "Одно из чисел вне диапазона от 100 до 300";
    return false;
  };
  return data;
};

button.addEventListener("click", () => getDataFromInputs());
