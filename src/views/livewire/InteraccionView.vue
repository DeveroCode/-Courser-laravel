<script setup>
import VSCode from '@/components/VSCode.vue';

const click = `<div>
    <input type="text" placeholder="No. Control" name="word" wire:model="no_institucional">
    <div>
        <input type="submit"
            class="inline-flex items-center w-full px-5 py-2 mb-3 mr-1 text-sm font-bold text-white 
            no-underline align-middle bg-indigo-600 border border-transparent border-solid rounded-md 
            cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-indigo-700 hover:border-indigo-700 
            hover:text-white focus-within:bg-indigo-700 focus-within:border-blindigoue-700 text-center"
            value="Buscar" @wire:click="search">
    </div>
</div>`

const component = `class SearchUser extends Component
{
    public $no_institucional;

    public function search()
    {
        $this->emit('searchWord', $this->no_institucional);
    }

    public function render()
    {
        $alumno = Alumno::all();
        return view('livewire.search-user', [
            'alumno' => $alumno,
        ]);
    }
}`

const form = `<form class="md:w-1/2" wire:submit.prevent='crearLibro'>
</form>`;
</script>

<template>
    <div class="py-10 px-14">
        <main>
            <h1 class="text-3xl font-bold text-title font-roboto capitalize">Interaccion entre componentes</h1>

            <section class="pt-12">
                <p class="font-light font-roboto text-lg mt-10">Livewire permite agregar interactividad al frontend de
                    una aplicación de manera sencilla. Puede utilizar directivas Livewire en tus vistas para enlazar
                    acciones del usuario al método del componente.</p>
            </section>
        </main>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Click</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Como su nombre lo especifica, se utiliza para escuchar el
                evento click en un elemento HTML como un botón o enlace, y ejecuta el método asociado en el componente.
                Esto permite que el componente responda a las acciones del usuario</p>

            <VSCode :code="click" />

            <p class="font-light font-roboto text-lg mt-10">Una vez realizada la acción nuestra vista interactuara con
                la funcion search que se encuentra dentro de nuestro componente.</p>

            <VSCode :code="component" />
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Model</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">la directiva model, se utiliza para vincular datos de
                entrada que provienen desde nuestro front-end, tomemos de ejemplo la vista de buscar usuario</p>

            <VSCode :code="click" />

            <p class="font-light font-roboto text-lg mt-10">Verificamos que nuestro componente esta esperando a que
                coloquemos un valor dentro de nuestro modelo con nombre no_institucional, entonces, una vez que nosotros
                llenemos este dato estaremos listos para realizar la búsqueda, recordando que toda la lógica estará en
                el componente SearchUser.php</p>

            <VSCode :code="component" />

            <div class="bg-red-200 text-red-800 border-l-8 border-red-800 px-7 py-4">
                <p class="text-2xl font-roboto">Advertencia!</p>
                <span class="font-roboto font-light text-xl">A esto se le conoce como interactividad entre
                    componentes</span>
            </div>
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Submit</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Si hemos trabajado con formularios en HTML, entendemos que
                un submit es un evento de envío de formulario. Al igual que en HTML, livewire agrega un wire de tipo
                submit, esto es util para escuchar la validación de formularios, enviar datos al servidor, todo sin
                recargar la pagina desde el inicio</p>

            <VSCode :code="form" />
        </section>


        <RouterLink :to="{ name: 'create' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 mt-10 block text-end capitalize">
            crud en livewire
        </RouterLink>
    </div>
</template>