FROM php:8.2-fpm-alpine

RUN apk add --no-cache bash git curl unzip libzip-dev oniguruma-dev nodejs npm \
    && docker-php-ext-install pdo_mysql mbstring zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --ignore-platform-reqs --no-interaction --prefer-dist
RUN chown -R www-data:www-data storage bootstrap/cache
RUN npm install

EXPOSE 9000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=9000"]
