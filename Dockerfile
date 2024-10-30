# Этап 1: сборка приложения
FROM node:20-alpine as build

# Установка рабочей директории
WORKDIR /app

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование остального кода приложения
COPY . .

# Сборка приложения
RUN npm run build

# Этап 2: запуск приложения
FROM node:20-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование приложения с предыдущего этапа
COPY --from=build /app/ ./

# Открытие порта
EXPOSE 3000

# Запуск приложения
CMD ["npm", "run", "start"]