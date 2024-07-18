<script setup>
import VSCode from '@/components/VSCode.vue';
const get = `=> Ruta tipo Get
Route::get('/dashboard/show-list-books', [LibroController::class, 'showLibros'])->name('dashboard.show');`;

const post = `=> Ruta tipo Post
Route::post('/dashboard/create-book', [LibroController::class, 'createLibro'])->name('dashboard.create');`;

const put = `Route::put('/dashboard/update-book/{id}', [LibroController::class, 'updateLibro'])
    ->name('dashboard.update');`;

</script>

<template>
    <main class="px-14 py-20">
        <h1 class="text-3xl font-bold text-title font-roboto capitalize">endpoints</h1>

        <p class="font-light font-roboto text-lg mt-10">Los endpoints o acciones se encargan de responder
            solicitudes HTTP especificas. Para cada tipo de acción existe un endpoint especial.</p>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Get</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Como el nombre indica, obtiene un recurso o un conjunto de
                recursos en la base de datos. Es decir, a traves de una solicitud HTTP, obtendrá los datos de la base de
                datos. Esta solicitud es la mas común en usarse. Un claro ejemplo es al renderizar los datos
                de un libro, para esto sera necesario enviar una solicitud HTTP de tipo GET.
            </p>

            <VSCode :code="get" />
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Post</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">El método post permite la inserción de datos a la base de
                datos por medio de un formulario, esto enviado a traves de la vista del Front-end. Por ejemplo, para
                crear un nuevo libro es necesario enviar una solicitud HTTP de tipo POST a traves de un formulario.
            </p>

            <VSCode :code="post" />
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Put-Patch</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Caso contrario a Post, los endpoints de tipo Put, Patch y
                Update, se encargan de actualizar los datos de la base de datos. Pero, debemos de centrarnos en la
                buenas practicas, aunque, estos tres métodos hacen lo mismo, cada método tiene una función diferente.
            </p>

            <VSCode :code="post" />

            <nav class="font-light font-roboto text-lg mt-10">
                <li>Put - Se utiliza para remplazar completamente un recurso con los nuevos datos proporcionados, es
                    decir, si tenemos un formulario llamado libro, para poder actualizar este libro a traves de Put,
                    sera necesario cambiar todos los datos del libro, sin embargo, si solo queremos cambiar la fecha
                    del libro, este método seria erróneo.</li>

                <VSCode :code="put" />

                <li>Patch - Se utiliza para hacer modificaciones parciales, es decir, actualizar ciertos campos de
                    nuestro recurso, esto sin afectar a los demás campos que contiene nuestra base de datos</li>

                <VSCode :code="put" />
            </nav>

            <p class="font-light font-roboto text-lg mt-10"><span class="font-bold text-purple-600">¿Entonces, cual
                    debería de usar?.</span> Si necesitamos actualizar
                un solo campo seria una buena practica usar Put pero, si es necesario actualizar el objeto por completo
                deberíamos de utilizar Patch</p>
        </section>

        <RouterLink :to="{ name: 'livewire' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 mt-10 block text-end capitalize">
            livewire
        </RouterLink>
    </main>
</template>