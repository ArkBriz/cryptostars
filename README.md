# Учебный проект с использованием JavaScript

## Темы и приемы JS, изученные и использованные в данном проекте.

### Архитектура и структура проекта: **Модульная структура**

### Основы языка
> **Переменные**\
> **Массивы и методы массивов:** `forEach`, `map`, `filter`, `find`, `some`\
> **Объекты и деструктуризация**\
> **Условные конструкции:** `if`, тернарный оператор `? :`\
> **Операторы сравнения:** `===`, `!==`\
> **Функции**\
> **Шаблонные строки**\
> **Методы строк и чисел:** `toFixed()`, `parseFloat()`, `toLocaleString()`, `replace()`\
> **Работа с числами и округлением:** `Math.floor()`, деление, умножение

### Работа с сетью (API)
> `fetch()` для `GET` и `POST` запросов\
> Обработка JSON-ответов от сервера\
> Обработка статусов ответа (`response.ok`, `response.status`)\
> Отправка `FormData` через `POST`\
> Структурированная отправка данных в формате `multipart/form-data`

### Работа с DOM
> `querySelector`, `querySelectorAll`\
> `closest`, `classList`, `textContent`, `value`, `style.display`\
> Работа с шаблонами: `documentFragment`, `cloneNode(true)`\
> Ручное управление элементами: `append`, `removeChild`, `innerHTML`

### События и взаимодействие
> Навешивание и удаление обработчиков событий (`addEventListener`, `removeEventListener`)\
> Обработка событий `click`, `input`, `change`, `keydown`, `submit`\
> Закрытие модального окна по ESC, оверлею, кнопке

### Валидация и формы
> Библиотека **Pristine** для валидации форм\
> Кастомные валидаторы и сообщения об ошибке\
> Сброс формы и валидации при закрытии модального окна\
> Проверка пароля, лимитов, баланса, корректности введенных данных

### Работа с картой
> Библиотека **Leaflet**\
> Создание карты и установка координат\
> Добавление маркеров (`L.marker`)\
> Создание балуна (`bindPopup`)\
> Установка кастомных иконок маркеров (`L.icon`)\
> Работа с `L.layerGroup()` — очистка маркеров

### Используемые сторонние библиотеки

| Название      | Назначение                  |
|---------------|-----------------------------|
| **Pristine**  | Валидация форм              |
| **Leaflet**   | Отображение карты и меток   |
