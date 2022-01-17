<template>
    <div class="slide-img">
        <router-link
            :to="{
                name: 'product',
                query: {id: '0c7cb54d-6ca3-419c-a363-c010bacc6425'},
            }"
        >
            <img src="@app/assets/images/top/pc/slide02.jpg" class="pc" />
            <img src="@app/assets/images/top/sp/slide02.jpg" class="sp" />
        </router-link>
    </div>
</template>
