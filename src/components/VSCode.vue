<script setup>
defineProps({
    code: {
        type: String,
    }
})
</script>

<template>
    <div class="py-5">
        <div class="vscode bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg h-auto mx-auto">
            <div class="vscode-header bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
                <div class="vscode-title">Visual Studio Code</div>
                <div class="vscode-buttons flex gap-2">
                    <div class="vscode-button close w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="vscode-button minimize w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="vscode-button maximize w-3 h-3 rounded-full bg-green-500"></div>
                </div>
            </div>
            <div class="vscode-editor p-4 bg-gray-800 overflow-y-auto rounded-r-lg"
                style="max-height: calc(100% - 2rem); scrollbar-width: thin; scrollbar-color: #805ad5 #1f2937;">
                <pre class="language-php text-gray-300"><code class="code">{{ code }}</code></pre>
            </div>
        </div>
    </div>

</template>