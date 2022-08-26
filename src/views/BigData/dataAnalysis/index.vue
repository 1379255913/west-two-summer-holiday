<template>
    <div>
        <page-main>
            <div class="box">
                <china-map></china-map>
            </div>

        </page-main>
    </div>
</template>

<script setup>
import ChinaMap from './ChinaMap.vue'
</script>

<style scoped>
.box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
