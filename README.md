# shri-2020-node-js-homework

Домашнее задание к лекции Node.js

## Production режим

### Для запуска серверной части проекта в production режиме (c поддержкой SSR)

- Добавить в файл `.env` параметр API_TOKEN - хэш ключа авторизации к серверному API
- Запустить сервер коммандой `npm run start`
- Перейти по адресу `http://127.0.0.1:3030/`

### Для сборки клиенсткой части проекта в production режиме с поддержкой SSR

- Запустить сборку коммандой `npm run build:client`

## Development режим

### Для запуска серверной части проекта в development режиме

Без поддержки SSR, с nodemon (перезапуск сервера на изменение файлов) и ведением логов в консоль

### Для запуска серверной части проекта в development режиме

- Добавить в файл `.env` параметр API_TOKEN - хэш ключа авторизации к серверному API
- Запустить сервер коммандой `npm run start:server`
- Перейти по адресу `http://127.0.0.1:3030/`

### Для запуска клиенсткой части проекта в development режиме

- Запустить webpack-dev-server коммандой `npm run start:client`
- Перейти по адресу `http://127.0.0.1:3030/`

## Тестирование

- Установить [selenium-standalone](https://github.com/vvo/selenium-standalone#install--run)
- Запустить selenium сервер `npm run test:server`
- Запустить e2e тесты `npm run test:e2e`
