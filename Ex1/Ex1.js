// Задание 1

/* Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

 XML:

<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
JS-объект:

{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
} */


let objectXML = `
<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>
`;
let parser = new DOMParser

let objectDOM = parser.parseFromString(objectXML, "text/xml");

let studentNodes = objectDOM.querySelectorAll("student");
let nameNodes = objectDOM.querySelectorAll("name");
let firstNodes = objectDOM.querySelectorAll("first");
let secondNodes = objectDOM.querySelectorAll("second");
let ageNodes = objectDOM.querySelectorAll("age");
let profNodes = objectDOM.querySelectorAll("prof");

let langAttrs = [];

nameNodes.forEach((item, index) => {
  langAttrs[index] = item.getAttribute("lang");
});

let objectJS = {
  list: []
};

studentNodes.forEach((item, index) => {
  objectJS.list[index] = {};
  objectJS.list[index].name = firstNodes[index].textContent + " " + secondNodes[index].textContent;
  objectJS.list[index].age = ageNodes[index].textContent;
  objectJS.list[index].prof = profNodes[index].textContent;
  objectJS.list[index].lang = langAttrs[index];
});

console.log(objectJS)