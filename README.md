# shri-2020-node-js-homework

Домашнее задание к лекции Node.js

## Проект

### Серверная часть
  * Для работы с `School CI API` необходимо в файле `.env` добавить токен авторизации в переменную `API_TOKEN`
  * Запуск проекта: `npm run run`
  * Запуск проекта в режиме разработки: `npm run start:server`

### Клиентская часть
  * Запуск проекта в режиме разработки: `npm run start:client`
  * Сбока проекта: `npm run build:client`

## Функционал CI

  Для для того, чтобы протестировать сборку CI необходимо отправить POST запрос на `127.0.0.1:3030/api/settings`.
  Пример передаваемых с параметров:

  ```json
    {
      "repoName": "bini1988/what-to-watch",
      "buildCommand": "npm run build",
      "mainBranch": "master",
      "period": 20,
    }
  ```

  Указанный репозиторий сохраняется в директории `tmp`, последний коммит указанной `mainBranch` автоматически отправляется на сборку.

  Вернуть параметры созданной и выполненной сборки можно сделав запрос на `127.0.0.1:3030/api/builds?offset=0&limit=1`

  Для создания сборки для произвольного коммита необходимо отправить POST запрос на `127.0.0.1:3030/api/builds/2b004fa69b94f1bf9801fd7195ce839ddcfaf4b3`. Перед отправкой запроса необходимо создать конфигурацию через POST запрос на `127.0.0.1:3030/api/settings`.
