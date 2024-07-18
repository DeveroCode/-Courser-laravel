<script setup>
import VSCode from '@/components/VSCode.vue';

const exportAlumnos = `php artisan make:export AlumnosExport --model=Alumno`;

const exampleExport = `<?php

namespace App\Exports;

use App\Models\Alumno;
use Maatwebsite\Excel\Concerns\FromCollection;

class AlumnosExport implements FromCollection
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Alumno::all();
    }

    public function headings(): array
    {
        // Encabezados de la tabla
    }
}
`;

const headings = ` public function headings(): array
    {
        return [
            'Nombre',
            'Apellido Paterno',
            'Apellido Materno',
            'Email',
            'Telefono',
            'Direccion',
            'Fecha de Nacimiento',
            'Anio de Ingreso',
            'Carrera',
        ];
    }`;

const exportFn = `public function export(){
    return Excel::download(new AlumnosExport, 'alumnos.xlsx')
;}`;

const calling = `<div class=" col-span-12 md:col-span-6">
            <div class="flex flex-col bg-white shadow-sm rounded p-4 h-auto">
                <div class="image w-full h-auto">
                    <img src="{{ asset('imgs/icons/donwload-db.svg') }}" alt="Dibujo de una base de datos">
                    <h2 class="mt-5 text-lg text-center font-bold">Descargue una copia de su base de datos
                    </h2>
                    <p class="text-sm text-center text-wrap">Guarde una copia de su actual base de
                        datos<span class="font-bold"> en caso de haberla perdido</span></p>
                </div>
                <div class="w-full h-16 mt-5">
                    <button wire:click="export"
                        class="w-full flex items-center justify-center px-4 bg-indigo-700 py-2 bg-blue text-white rounded-lg cursor-pointer">
                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="ml-2 text-base leading-normal uppercase font-bold">descargar!</span>
                        <input type='file' class="hidden" />
                    </button>
                </div>
            </div>
        </div>`;
</script>

<template>
    <main class="px-14 py-20">
        <section class="py-5">
            <h1 class="text-3xl font-bold text-title font-roboto capitalize">Exportación de datos - Excel</h1>
            <p class="font-light font-roboto text-lg mt-10">
                Exportar datos a formatos como Excel es una funcionalidad muy común y útil en muchas aplicaciones.
                Laravel, nos permite exportar datos de una base de datos a un archivo Excel de na manera sencilla y sin
                complicacion gracias a la combinacion de la biblioteca <span
                    class="font-bold">Maatwebsite/Laravel-Excel</span>.
                Esta bibliotea proporciona una API sencilla y potente para generar y manipular archivos en excel
                directamente desde tu aplicación Laravel.
            </p>
        </section>

        <div class="py-12 border-l-8 border-red-800 bg-red-200 px-5">
            <p class="text-lg font-light font-roboto text-red-600">
                <span class="font-bold text-xl">Advertencia!</span>.
                En esta seccion de la documentación, no se tocara el tema de los estilos de la hoja de calculo de excel.
            </p>
        </div>



        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Exportación - Creando el export</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Dentro de la documentación de laravel, se mencionan varios
                metos existente para exportar e importar datos, unos de ellos es <span class="font-bold">Export y
                    Import</span>
                estos dos metodos nos facilitaran la exportación de nuestros datos asi como, importar datos nuevos en
                dado caso de ser necesario. Para profundizar en estos metodos se recomienda leer la documentación de
                laravel
            </p>
            <p class="font-light font-roboto text-lg mt-10">
                Para crear nuestro export, utilizaremos la directiva es necesario crear un nuevo metodo llamado
                AlumnosExport, este se vinculara con el modelo de alumnos.
            </p>

            <VSCode :code="exportAlumnos" />

            <div class="py-12 border-l-8 border-green-800 bg-green-200 px-5">
                <p class="text-lg font-light font-roboto text-green-600">
                    <span class="font-bold text-xl">Dato!</span>.
                    Para vincular una funcion con un modelos es necesario utilizar --model=Modelo-Utilizar, esto
                    proporcionara una relacion entre el modelo y la tabla de nuestra base de datos perfecta.
                </p>
            </div>
        </section>


        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Exportación - Configurando Export</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Una vez que se ah creado nuestro metodo export,
                verificaremos
                que se haya creado satisfactoriamente. para esto, tu metodo export debera verse igual a este, aunque,
                puede que varie entre las versiones de Laravel.
            </p>
            <VSCode :code="exampleExport" />
            <p class="font-light font-roboto text-lg mt-10 py-5">
                Una vez verificado el estado de nuestro export, es momento de configurarlo, para esto, crearemos la
                function headings
            </p>
            <VSCode :code="headings" />
            <div class="py-12 border-l-8 border-red-800 bg-red-200 px-5">
                <p class="text-lg font-light font-roboto text-red-600">
                    <span class="font-bold text-xl">Advertencia!</span>.
                    Si laravel te ah creado esta función junto con los encabezados, puedes saltarte esta parte
                </p>
            </div>
            <p class="font-light font-roboto text-lg mt-10">Cada uno de los encabezados pueden ser modificados si es
                necesario, recuerde que cada encabezado debera tener concordancia con el encabezado de nuestra tabla de
                base de datos.
            </p>
        </section>


        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Exportación - Llamando a nuestra función</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Para llamar a nuestra función, utilizaremos el controlador
                de livewire existente llamado InsertarDb, dentro de este controlador crearemos nuestra funcion llamada
                export, claramente se pude realizar con una URL perzonalizada, pero, estariamos complicandonos más la
                vida.
            </p>

            <VSCode :code="exportFn" />

            <div class="py-12 border-l-8 border-red-800 bg-red-200 px-5">
                <p class="text-lg font-light font-roboto text-red-600">
                    <span class="font-bold text-xl">Advertencia!</span>.
                    Ustedes deberan importar esta funcion en su componente de livewire, donde sea necesario llamar a la
                    función.
                </p>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Es momento de importar esta funcion o llamar a esta función
                en nuestra vista, para esto nosotros utilizaremos un wire:click y llamaremos a nuestra función.Si todo
                salio correctamente, tendremos una archivo llamado Alumnos.xlsx que podremos descargar.
            </p>

            <VSCode :code="calling" />
        </section>
    </main>
</template>