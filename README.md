# shri-2020-node-js-homework

Домашнее задание к лекции Node.js

# Проект

  * Запуск проекта: `npm run run`
  * Запуск проекта в режиме разработки: `npm run start`

# Функционал CI

  Для создания сборки необходимо отправить POST запрос на `127.0.0.1:3030/api/settings` с параметрами:

  ```json
    {
      "repoName": "bini1988/what-to-watch",
      "buildCommand": "npm run build",
      "mainBranch": "master",
      "period": 20,
    }
  ```

  GET запрос на `127.0.0.1:3030/api/builds?offset=0&limit=1` должен вернуть параметры созданной и выпоненной сбоки.

  Для создания сборки для произвольного коммита необходимо отправить POST запрос на `127.0.0.1:3030/api/builds/2b004fa69b94f1bf9801fd7195ce839ddcfaf4b3` после POST запроса на `127.0.0.1:3030/api/settings`.
