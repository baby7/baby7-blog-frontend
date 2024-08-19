<template>
    <div class="transfer-statement">
        <p>
            <span>转载请注明出处：</span>
            <a :href="url" style="text-decoration: underline;">
                <span style="color: #3F86E8">{{ url }}</span>
            </a>
        </p>
    </div>
</template>

<script>
export default {
    name: "TransferStatement",
    data() {
        return {
            url: "/"
        }
    },
    mounted() {
        this.url = window.location.href
    }
}
</script>

<style scoped>
    .transfer-statement {
      margin-left: 10px;
      margin-bottom: 10px;
    }
</style>
