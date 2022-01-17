<template>
    <div class="hero--img hero--img__6">
        <div data-testid="hero--text" class="hero--text svg-text slide-d px-3">
            <div class="hero3-box">
                <img src="@app/assets/images/Subscriptions/SVG/hero-text2.svg" alt="10万人の肌データからベストスキンケアを導くimyme" class="hero-txt3Icon">
            </div>
        </div>
    </div>
</template>
<style>
    @media only screen and (max-width:1024px) {
        .hero3-box {
            background-color: rgba(236, 164, 182, .6);
            padding: 5% 5% 0 5%;
            width: 65%;
            margin-top: 5%;
        }

        .hero-txt3Icon {
            width: 100%;
            margin:0 auto;
        }      
    }
    @media only screen and (min-width:1025px) {
        .hero3-box {
            background-color: rgba(236, 164, 182, .6);
            padding: 5%;
            width: 30%;
        }
        .hero-txt3Icon {
            width: 100%;
        }
    }
</style>
