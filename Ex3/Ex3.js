// Задание 3

/* Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.*/

const button = document.querySelector(".j-send-request");
const input = document.querySelector(".j-input");
const resultNode = document.querySelector(".j-result");

function useRequest(callback) {
  let xhr = new XMLHttpRequest;
  const limit = input.value;

  if (limit > 10) {
    resultNode.innerHTML = "Число вне диапазона от 1 до 10";
    return;
  }

  xhr.open("get", `https://picsum.photos/v2/list?limit=${limit}`);

  xhr.send();

  xhr.onload = () => {
    console.log("Статус ответа: " + xhr.status);
    const imagesData = JSON.parse(xhr.response);
    if (callback) {
      callback(imagesData)
    };
  };
};

function getUrl() {
  const limit = input.value;

  if (limit > 10) {
    alert("Число вне диапазона от 1 до 10");
    return ("")
  } else {
    return (`https://picsum.photos/v2/list?limit=${limit}`);
  };
};

function displayCards(cardsArray) {
  let cardsHttp = '';

  cardsArray.forEach(element => {
    cardsHttp += `
    <img class="card-image" src="${element.download_url}" alt="">
    `
  });
  resultNode.innerHTML = cardsHttp;
};

button.addEventListener("click", () => useRequest(displayCards));


