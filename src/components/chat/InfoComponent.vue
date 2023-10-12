<template>
    <div class="browsing_info">

        <h3>Information</h3>

        <div v-if="info.url" class="info">
            <span style="word-break: break-all;">{{ info.url }}</span>
            <span style="word-break: break-all;">Browser - {{ info.browser }}</span>
            <span style="word-break: break-all;">OS - {{ info.operating_system }}</span>
            <span style="word-break: break-all;">IP - {{ info.ip_address }}</span>
            <span style="word-break: break-all;">Country - {{ info.country == 'uknown' ? 'On SubNet' : info.country }}</span>
        </div>

    </div>
</template>

<style>

.browsing_info .info span {
    display: block;
    font-size: 12px;
}

</style>

<script>

export default {
    props: {
        info: Object
    }
}

</script>