<template>
    <div class="py-5 text-center">
        <svg class="icon-stroke icon-xl mx-auto mt-5 mb-0">
            <use xlink:href="#icon-bag" />
        </svg>
        <div class="pt-3 pb-1 text-large text-light">
            申し訳ございません。
        </div>
        <div class="pt-3 pb-1 text-large text-light lh-2">
            お客様が選択していた製品が
            <br />
            ご購入中に完売となってしまいました。
        </div>
        <div class="pt-3 pb-1 text-large text-light">
            製品の補充まで、
            <br />
            今しばらくお待ちくださいませ。
        </div>
        <span class="previous--question--button">
            <router-link
                tag="button"
                class="btn-circle m-auto"
                :to="{name: 'top'}"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-back" />
                </svg>
            </router-link>
        </span>
    </div>
</template>
