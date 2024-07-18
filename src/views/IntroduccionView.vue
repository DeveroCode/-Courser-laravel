<script setup>
import VSCode from '@/components/VSCode.vue'

const npm = `npm i
composer install or composer update`;
const git = `git clone https://github.com/DeveroCode/Bibliotech.git`;
const env = `DB_CONNECTION = mysql => Tipo de conexión
DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_DATABASE = biblioteca => Nombre de la DB por defecto
DB_USERNAME = root => Usuario por defecto de MySQL
DB_PASSWORD = tu-password`;

const servers = `npm run dev
php artisan serve`;

</script>

<template>
    <div class="px-14 py-10">
        <div class="py-10">
            <h1 class="text-3xl font-bold text-title font-roboto capitalize">Fundamentos de Laravel</h1>

            <section class="pt-12">
                <div class="py-5 border-b border-gray-200">
                    <h3 class="text-title font-bold font-roboto text-2xl">Objetivos</h3>
                </div>

                <ul class="list-disc list-inside mt-5 font-roboto font-light text-lg">
                    <li>Clonar un proyecto desde cero</li>
                    <li>Comprender el modo de trabajo MVC</li>
                    <li>Creacion correcta de rutas</li>
                    <li>Comprender las peticiones HTTP (Get, Post, Put)</li>
                </ul>
            </section>
        </div>

        <section class="py-10">
            <div>
                <div class="py-5 border-b border-gray-200">
                    <h3 class="text-title font-bold font-roboto text-2xl capitalize">Archivos necesarios</h3>
                </div>

                <div class="mt-5 font-roboto font-bold">
                    <li>
                        <a href="https://github.com/DeveroCode/Bibliotech.git" target="_blank"
                            class="text-purple-600 text-lg">
                            Repositorio
                        </a>
                    </li>
                </div>
            </div>
        </section>

        <section class="py-10">
            <div class="pr-10">
                <div class="py-5 border-b border-gray-200">
                    <h3 class="text-title font-bold font-roboto text-2xl capitalize">Como Iniciar</h3>
                </div>

                <div class="space-y-5">
                    <p class="mt-10 font-roboto font-light text-lg">Clonemos el proyecto desde el github
                    </p>
                    <VSCode :code="git" />
                </div>
                <div class="space-y-5">
                    <p class="mt-10 font-roboto font-light text-lg">Empecemos por actualizar las dependencias del
                        proyecto
                    </p>
                    <VSCode :code="npm" />
                </div>
                <div class="space-y-5">
                    <p class="mt-10 font-roboto font-light text-lg">Actualiza las credenciales de tu .env
                    </p>
                    <VSCode :code="env" />
                </div>
            </div>
        </section>

        <section class="pt-10 pr-10">
            <div class="border-b border-gray-300 pb-20">
                <div class="py-5 border-b border-gray-200">
                    <h3 class="text-title font-bold font-roboto text-2xl capitalize">Corramos servidores
                    </h3>
                </div>

                <div class="space-y-5">
                    <p class="mt-10 font-roboto font-light text-lg">Es necesario mantener ambos servidores corriendo
                        para
                        que el proyecto funcione sin problemas
                    </p>
                    <VSCode :code="servers" />
                </div>
            </div>
        </section>

        <RouterLink :to="{ name: 'MVC-laravel' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 pr-14 mt-10 block text-end capitalize">
            MVC en laravel
        </RouterLink>
    </div>
</template>