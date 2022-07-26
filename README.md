# blog
laravel, react blog


<h1>Installation</h1>

<ul>
<li>cd to blog-frontend</li>
<li>write the command "npm install"</li>
<li>cd blog-backend</li>
<li>write the command "npm install"</li>
<li>write the command "composer install"</li>
<li>rename .env.example to .env</li>
<li>in the .env file set DB_DATABASE=blog_db</li>
<li>in the .env file paste the following code without brackets, This code enables google sign in
(GOOGLE_CLIENT_ID=516851175559-1v2bgnb6lqve20hu08jmaku0tg9ng33v.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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)
</li>
<li>run php artisan serve</li>
<li>visit http://127.0.0.1:8000/ and click on the generate app key button</li>
<li>instead of running "php artisan migrate"
<ul>
<li>open xampp</li>
<li>create a db called "blog_db"</li>
<li>import the databse i've added in this repository (this db has sample posts & categories which will be shown in the frontend)</li>
</ul>
</li>
<li>make sure laravel,react & xampp running/li>
<li>visit http://localhost:3000/</li>
</ul>
