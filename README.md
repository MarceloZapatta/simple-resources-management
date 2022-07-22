# Simple Crud Managment

---

### Requirements:

- PHP 8
- MySQL
- Node 14

---

### How to run:

##### Usage with Laravel Sail:

- composer install
- ./vendor/bin/sail up
- ./vendor/bin/sail artisan migrate
- ./vendor/bin/sail yarn or ./vendor/bin/sail npm install
- ./vendor/bin/sail yarn dev or ./vendor/bin/sail npm run dev
- ./vendor/bin/sail artisan storage:link

##### Usage without Laravel Sail:

- copy .env.example to .env and configure variables
- composer install
- php artisan key:generate
- php artisan migrate
- php artisan serve
- yarn or npm install
- yarn dev or npm run dev
- php artisan storage:link

#### Optional - Populate with data

- ./vendor/bin/sail artisan db:seed or php artisan db:seed

### How to test

##### Backend
- Configure default testing database if you're not using Laravel Sail
- ./vendor/bin/sail artisan test 
or 
- php artisan test

##### Frontend
- ./vendor/bin/sail yarn test
or
- ./vendor/bin/sail npm run test

---


Features:

/ - Visitor home

/admin - Admin resources page

---

Using:

- Vue 3
- Laravel 9
- Laravel Sail
- Vitest
- Laravel tests