// Задание 5

/* Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).*/

const button = document.querySelector(".j-send-request");
const input1 = document.querySelector(".j-input1");
const input2 = document.querySelector(".j-input2");
const resultNode = document.querySelector(".j-result");

prevImages = localStorage.getItem("prevImages");
if (prevImages) {
  resultNode.innerHTML = prevImages;
};

function getDataFromInputs () {
  let page = verifyInput(input1.value, "Номер страницы");
  let limit = verifyInput(input2.value, "Лимит");
  
  if (!page || !limit) {
    if (!page && !limit) {
      resultNode.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    };
    return;
  };

  fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then(response => response.json())
    .then(json => {
      let cardsHttp = "";
            json.forEach(element => {
        cardsHttp += `
        <img class="card-image" src="${element.download_url}" alt="">
        `
      });

      localStorage.setItem("prevImages", cardsHttp);
      resultNode.innerHTML = cardsHttp;
    })
    .catch(error => console.log(error.message));
  };

function verifyInput(data, name) {
  if (isNaN(data) || data < 1 || data > 10) {
    resultNode.innerHTML = `${name} вне диапазона от 0 до 10`;
    return false;
  };
  return data;
};

button.addEventListener("click", () => getDataFromInputs());
