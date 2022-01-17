<template>
    <div class="hero--img hero--img__3">
        <span data-testid="hero--text" class="hero--text slide-c">
            <img src="@app/assets/images/Subscriptions/SVG/icon_black.svg" alt="10万人の肌データからベストスキンケアを導くimyme" class="hero1Icon">
            <img src="@app/assets/images/Subscriptions/SVG/icon_blackSP.svg" alt="10万人の肌データからベストスキンケアを導くimyme" class="hero1IconSP">
        </span>
    </div>
</template>
<style>
    .hero1Icon{
        display: none;
    }
    .hero1IconSP {
         display: block;
    }
    .hero1IconSP{
        width: 90%;
        margin-top: 20%;
    }
    @media only screen and (min-width: 48em) {
        .hero1IconSP {
        display: none;
        }
        .hero1Icon{
            display: block;
        }
        .hero1Icon{
            width: 90%;
            margin-top: 30%;
        }
    }
</style>
