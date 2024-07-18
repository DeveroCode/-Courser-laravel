<script setup>
import VSCode from '@/components/VSCode.vue'

const install = `npm i chart.js`;
const createComponente = `php artisan make:livewire ShowSharts`;

const mount = `public $inventoryData = []; -> Eata varible tendra el total de los libros
public function mount()
    {
        $this->inventoryData = Libro::count(); -> Cuenta el total de libros
    }
`;

const canvas = `<div class="bg-white p-6 rounded-lg shadow-lg mt-10">
    <div class="flex justify-between items-center mb-4">
        <div>
            <h2 class="text-2xl font-semibold">Estadísticas de Inventario</h2>
            <p class="text-gray-500">Total de libros en el inventario.</p>
        </div>
    </div>
    <canvas id="inventoryChart"></canvas>
</div>`;

const loadingElement = `document.addEventListener('livewire:load', () => {});`;
const env = `const inventoryData = @json($inventoryData); -> Convierte a JSON los datos del backend
const ctx = document.getElementById('inventoryChart').getContext('2d');`;
const newChart = `new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total de Libros'],
                datasets: [{
                    label: 'Inventario Total',
                    data: [inventoryData],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    barThickness: 20
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });`;
const fullCode = `<script>
    document.addEventListener('livewire:load', () => {
        const inventoryData = @json($inventoryData);
        
        const ctx = document.getElementById('inventoryChart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total de Libros'],
                datasets: [{
                    label: 'Inventario Total',
                    data: [inventoryData],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    barThickness: 20
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });`;
// const loadingElement = ``;
</script>

<template>
    <main class="px-10 py-20">
        <div class="bg-red-200 border-l-8 border-red-800 py-10 px-14">
            <p class="font-roboto text-lg text-red-900 font-bold">Advertencia!
            </p>
            <span class="font-roboto text-lg text-red-700">Por favor de no utilizar ChatGPT, para esta etapa del curso
                sus conocimientos son lo suficientemente avanzados para lograrlo por si solo.</span>
        </div>
        <section class="pt-12">
            <h1 class="text-3xl font-bold text-title font-roboto capitalize">Creando gráficas con chart.js</h1>
            <p class="font-light font-roboto text-lg mt-5">La visualización de datos es parte crucial de muchas
                aplicaciones web modernas, ya que permiten a los usuarios comprender mejor la información a través de
                sus graficos y diagramas. Para esto, <span class="font-bold">Chart.js</span> es una de las bibliotecas
                de JavaScript más populares para crear y manipular graficos. Ahora, Como integramos Chart.js a Laravel?
            </p>
        </section>


        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h2 class="text-title font-bold font-roboto text-2xl">Implementación</h2>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                podemos utilizar directamente el CDN que nos proporciona la biblioteca de chart.js o instalarla
                directamente en nuestra aplicación. (Esto es lo mas recomendable)
            </p>

            <VSCode :code="install" />

            <p class="font-light font-roboto text-lg mt-10">
                Si todo ha salido a la perfección, podemos continuar con la siguiente sección
            </p>

        </section>
        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Creación del componente</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Para renderizar nuestras gráficas, optaremos por divirlo en un componente aparte, para esto, es
                necesario que cada componente que vaya a renderizar datos sea llamado distinto, es decir, <span
                    class="font-bold">Aqui
                    creare el componenete ShowSharts.php</span> y ustedes crearan sus propios componentes.
            </p>

            <VSCode :code="createComponente" />

            <p class="font-light font-roboto text-lg mt-10">
                Dentro de este componente configuraremos nuestras variables necesarias para renderizar las gráficas.
            </p>

        </section>
        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h4 class="text-title font-bold font-roboto text-2xl">Asignando variables</h4>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Siguiendo con el ejemplo, la gráfica que hemos creado la renderizaremos en la vista Index del dashboard
                de nuestro Bibliotecario, por lo tanto, la información que requiero que se renderice seria el total de
                libros existentes por día, para esto, nos apoyaremos por la variable $inventoryData.
            </p>

            <p class="font-light font-roboto text-lg mt-10">
                Ahora, para renderizar los datos de manera global, es decir, que esten dentro del state actual,
                ocuparemos la función mount que que nos proporciona laravel por defecto
            </p>

            <VSCode :code="mount" />
        </section>

        <div class="bg-red-200 border-l-8 border-red-800 py-10 px-14">
            <p class="font-roboto text-lg text-red-900 font-bold">Advertencia!
            </p>
            <span class="font-roboto text-lg text-red-700">Sera necesario crear mas varibales de acuerdo a sus
                necesidades.Como ejemplo, solo optaremos por una sola variable</span>
        </div>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h4 class="text-title font-bold font-roboto text-2xl">Renderizando la gráfica</h4>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Dentro de la vista de nuestro componente, crearemos un canvas básico y con el estilo que prefieran,
                también pueden copiar el siguiente código para renderizar la gráfica, no hay problema.
            </p>

            <VSCode :code="canvas" />

            <p class="font-light font-roboto text-lg mt-10">
                Una vez teniendo nuestro canvas, sera necesario aplicar JavaScript y Manejo del DOM, <span
                    class="font-bold">en caso de no saber que es el DOM, es preferible tomar un curso de
                    JavaScript</span>
            </p>
            <p class="font-light font-roboto text-lg mt-10">
                Continuemos, utilizando la etiqueta script en nuestra vista, agregaremos un evento para renderizar la
                gráfica una vez que nuestro componente de laravel este listo, es decir, que todos los datos necesarios
                esten cargados.
            </p>

            <VSCode :code="loadingElement" />

            <p class="font-light font-roboto text-lg mt-10">
                Cargado todo y listo para mostrarse, utilizaremos un callback para llamar a nuestras funciones a
                renderizar. Antes de esto, crearemos dos variables, una llamada <span class="font-bold">inventoryData y
                    ctx</span>. inventoryData tendra el total de los libros que viene de nuestro componente, es decir,
                obtendra los datos en un formato JSON y los almacenara en la varibale inventoryData que esta en nuestra
                vista. En cambio, la variable ctx, nos ayudará a renderizar la gráfica.
            </p>

            <VSCode :code="env" />
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h5 class="text-title font-bold font-roboto text-2xl">Creando nuestro Chart</h5>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Ahora, dentro de la misma función, crearemos un nuevo chart, para esto es mejor leer la documentación
                que
                proporciona Chart.js para una configuración mas detallada.
            </p>

            <VSCode :code="newChart" />
            <p class="font-light font-roboto text-lg mt-10">
                Si todo esta configurado correctamente, el codigó deberá verse de la siguiente manera
            </p>

            <VSCode :code="fullCode" />

            <VSCode :code="env" />

            <p class="font-light font-roboto text-lg mt-10">
                Es momento de llamar a nuestro componente en la vista Index, una vez llamado a nuestro compoenente la
                gráfica deberia mostrarse correctamente
            </p>
        </section>

    </main>
</template>