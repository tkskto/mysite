<template>
    <UModal
        title="Introduction"
        class="max-w-xl"
        :close="{
            color: 'primary',
            variant: 'outline',
            class: 'rounded-full',
        }"
        :ui="{
            width: 'max-w-2xl',
            body: 'w-full',
        }"
    >
        <UButton icon="i-lucide-info" size="lg" color="neutral" variant="subtle" />

        <template #body>
            <section class="intro-section">
                <h3 class="hdg3">What？</h3>
                <p class="section-txt">「MicroAnimations」はボタンのインタラクションや、ローディングなど、Webサイトの部分的に使われる小さなアニメーションを集めたギャラリーです。</p>
            </section>
            <section class="intro-section">
                <h3 class="hdg3">Why？</h3>
                <p class="section-txt">.psdでは、動きを表現するのが難しいです。</p>
                <p class="section-txt">たとえばボタンの見た目は、通常時とhoverしたときの見た目をレイヤーを分けて用意されていることが多いですが、どのように変化するかは、エンジニアにお任せなことが多いと思います。</p>
                <p class="section-txt">でも、もしかしたらデザイナーさんの意図する動きがあるかもしれません。そういうときに、このページを見て、こんな感じで動いて欲しい！こっちもいいね！みたいなコミュニケーションが発生すればいいなと思っています。</p>
            </section>
            <section class="intro-section">
                <h3 class="hdg3">How？</h3>
                <section class="inner-section">
                    <h4 class="hdg4">注意点</h4>
                    <p class="section-txt">掲載されているアニメーションは表現を追及するため、コードやマークアップが最適化されていない場合もあります。出来れば動きを参考にする程度に留めて下さい。</p>
                    <p class="section-txt">アニメーションはただの雰囲気作りで追加してしまうと、ユーザを無駄に待たせてしまったり、煩わしさを与える危険性もあります。下記に注意点をまとめておきますので本当に必要かどうかをまずは検討してください。</p>
                </section>
            </section>
        </template>
    </UModal>
</template>

<style scoped>
.intro-section {
    padding: 10px 20px;
}

.hdg3 {
    margin-bottom: 10px;
}

.section-txt {
    margin-left: 10px;
}

.inner-section {
    padding: 5px 10px;
    margin-bottom: 10px;
}

.hdg4 {
    margin-bottom: 5px;
}
</style>
