<script setup>
import VSCode from '@/components/VSCode.vue';

const livew = `composer require livewire/livewire`;
const importLive = `  @livewireStyles
</head>
<body>
    ...
 
    @livewireScripts
</body>
</html>
`;

const component = `php artisan make:livewire counter`;
const directory = `-> views
    ->livewire
        ->counter.blade.php`;

const counterComponent = ` ->HTTP
    ->Livewire
        ->Counter.php <- Aquí se controla toda la lógica del componente counter
`;
</script>

<template>
    <div class="px-14 py-20">
        <div>
            <h1 class="text-3xl font-bold text-title font-roboto text-center capitalize">Comenzando en Livewire</h1>

            <section class="pt-12">
                <div class="py-5 border-b border-gray-200">
                    <h3 class="text-title font-bold font-roboto text-2xl">Objetivos</h3>
                </div>

                <ul class="list-disc list-inside mt-5 font-roboto font-light text-lg">
                    <li>Entender el modo de trabajo de livewire</li>
                    <li>Componentes dentro de laravel con livewire</li>
                    <li>Implementación de emits</li>
                    <li>Inserción de datos</li>
                </ul>
            </section>
        </div>

        <main class="py-10">
            <div>
                <div class="py-5 border-b border-gray-200">
                    <h3 class="text-title font-bold font-roboto text-2xl capitalize">Archivos necesarios</h3>
                </div>

                <div class="mt-5 font-roboto font-bold">
                    <li>
                        <a href="https://laravel-livewire.com/docs/2.x/quickstart" target="_blank"
                            class="text-purple-600 text-lg">
                            Documentación
                        </a>
                    </li>
                </div>
            </div>
        </main>

        <section class="py-10">
            <div>
                <div class="py-5 border-b border-gray-200">
                    <h3 class="text-title font-bold font-roboto text-2xl capitalize">Como Iniciar</h3>
                </div>

                <div class="space-y-5">
                    <p class="mt-10 font-roboto font-light text-lg">Dentro de nuestra terminal (PowerShell o CMD),
                        ejecutamos el siguiente comando
                    </p>
                    <VSCode :code="livew" />

                    <!-- Advertencia -->
                    <div class="bg-red-100 text-red-600 border-l-8 border-red-700 px-4 py-10">
                        <p class="text-xl font-bold font-roboto">La implementación de esto, es en la pagina
                            principal, es
                            decir, la encargada de renderizar toda
                            la aplicación</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="pt-10">
            <div class="border-b border-gray-300 pb-20">
                <div class="py-5 border-b border-gray-200">
                    <h3 class="text-title font-bold font-roboto text-2xl capitalize">Crea tu primer componente
                    </h3>
                </div>

                <div class="space-y-5">
                    <p class="mt-10 font-roboto font-light text-lg">Empecemos con lo mas sencillo, una vez que todo se
                        haya
                        instalado correctamente, empecemos a crear un nuevo componente, para poder crear un componente
                        nuevo, deberemos ejecutar el siguiente comando
                    </p>
                    <VSCode :code="component" />

                    <p class="mt-10 font-roboto font-light text-lg">Si el componente se creo satisfactoriamente,
                        podremos
                        identificar el nuevo componente dentro de nuestro directorio que se encuentra
                    </p>

                    <VSCode :code="directory" />
                </div>

                <div class="py-5 border-b border-gray-200">
                    <h3 class="text-title font-bold font-roboto text-2xl capitalize">Como trabaja livewire?
                    </h3>
                </div>
                <div class="space-y-5">
                    <p class="mt-10 font-roboto font-light text-lg">Livewire agrega una manera de trabajo mas eficiente
                        a la
                        hora de implementar nuestra lógica, es decir, en vez de implementar toda la lógica en nuestro
                        controlador, podremos implementar la lógica dividiéndola en diferentes componentes, por esa
                        razón,
                        livewire al crear un nuevo componente agrega sus propios controladores.
                    </p>
                    <VSCode :code="counterComponent" />
                </div>
            </div>

            <div class="bg-green-200 text-green-600 border-l-8 border-green-800 px-4 py-10">
                <p class="text-xl font-bold font-roboto">¡
                    En cada línea de código que escriben, están tallando su camino hacia el dominio de la programación.
                    Cada
                    desafío que enfrentan es una oportunidad para crecer, aprender y convertirse en los desarrolladores
                    brillantes
                    que están destinados a ser. ¡No se detengan ante las dificultades, porque cada paso adelante es un
                    triunfo en su
                    camino hacia el éxito!</p>
            </div>
        </section>

        <RouterLink :to="{ name: 'estructura' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 pr-4 mt-10 block text-end capitalize">
            Estructura de controladores en livewire
        </RouterLink>
    </div>
</template>