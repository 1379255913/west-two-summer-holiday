<template>
    <div class="thums-up" @click="thumbsUp">
        <div class="heart" ref="heart">
            <!-- <svg
              ref="heart_icon"
              :style="heartStyle"
              t="1644501913302"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1268"
              width="25"
              height="20"
            >
              <path
                d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z"
                p-id="1269"
              ></path>
            </svg> -->
            <svg
                :style="heartStyle"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
            >
                <path d="M512 760.224L298.944 918.08c-22.08 16.32-53.536 12.16-70.272-9.376a47.904 47.904 0 0 1-8-43.968l82.144-259.936-219.136-163.328a48.096 48.096 0 0 1-9.376-68.544c9.472-12.096 24.192-19.2 39.776-19.2l268.64-0.448 81.408-254.88c8.224-25.792 36.32-40.16 62.784-32.16 15.744 4.8 28.064 16.8 32.96 32.16l81.408 254.88 268.64 0.448c27.712 0.032 50.112 21.952 50.08 48.96 0 15.2-7.296 29.536-19.68 38.784l-219.136 163.328 82.144 259.936c8.16 25.792-6.688 53.184-33.152 61.12a51.2 51.2 0 0 1-45.12-7.776L512 760.224z" p-id="4445"></path>
            </svg>
        </div>

        <div class="thums-up-text"><span></span></div>
    </div>
</template>

<script>
import mojs from "@mojs/core";
import { ref, onMounted, computed,watch } from "vue";
export default {
    props: {
        isLiked: Boolean
    },
    setup(props) {
        const heart = ref(null);
        //数据绑定
        watch(()=>props.isLiked,(newValue,oldValue)=>{
            hearted.value = props.isLiked
        })
        // 是否已点赞
        const hearted = ref(props.isLiked);
        const heartBounce = ref(1);
        const heartStyle = computed(() => {
            return {
                fill: `${hearted.value ? '#ffb700' : ''}`,
                stroke: `${hearted.value ? '#ffb700' : ''}`,
                transform: `scale3d(${heartBounce.value},${heartBounce.value},1)`,
            };
        });

        let burst, aperture, bounce;
        /**
         * burst 扩散
         * aperture 红色光圈（红晕）
         * bounce 心跳
         */
        onMounted(() => {
            burst = new mojs.Burst({
                // 爆炸范围
                radius: { 0: 50 },
                // 动画挂载父元素，默认改在到body上
                parent: heart.value,
                // 动画延时函数
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
                // 动画延时时间
                duration: 1500,
                // 动画等待时间
                delay: 300,
                // 扩散的粒子配置
                children: {
                    duration: 750,
                    // 随机数范围爆炸
                    radius: { 0: "rand(5,25)" },
                    shape: ["circle", "rect", "polygon"],
                    // 粒子可选色
                    fill: [
                        "#1abc9c",
                        "#2ecc71",
                        "#00cec9",
                        "#3498db",
                        "#9b59b6",
                        "#fdcb6e",
                        "#f1c40f",
                        "#e67e22",
                        "#e74c3c",
                        "#e84393",
                    ],
                    degreeShift: "rand(-90, 90)",
                    delay: "stagger(0, 40)",
                },
                // 透明度
                opacity: 0.6,
                // 生成粒子数量
                count: 10,
                onStart() {
                    hearted.value = true;
                },
            });
            aperture = new mojs.Transit({
                parent: heart.value,
                duration: 750,
                type: "circle",
                radius: { 0: 20 },
                fill: "transparent",
                stroke: "#ffb700",
                strokeWidth: { 20: 0 },
                opacity: 0.6,
                isRunless: true,
                easing: mojs.easing.bezier(0, 1, 0.5, 1),
            });
            bounce = new mojs.Tween({
                duration: 1200,
                onUpdate: (progress) => {
                    if (progress > 0.3) {
                        // elastic 弹性的
                        heartBounce.value = mojs.easing.elastic.out(1.43 * progress - 0.43);
                    } else {
                        heartBounce.value = 0;
                    }
                },
            });
        });

        function thumbsUp() {
            if (!hearted.value) {
                new mojs.Timeline().add(burst, aperture, bounce).play();
            } else {
                hearted.value = false;
            }
        }

        return {
            heart,

            hearted,
            heartBounce,
            heartStyle,

            burst,
            aperture,
            bounce,

            thumbsUp,
        };
    },
};
</script>


<style scoped>
.thums-up {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 24px;
}
.thums-up .heart {
    display: inline-flex;
    position: relative;
    height: 20px;
}
.thums-up .heart svg {
    stroke: #9a9daa;
    stroke-width: 60px;
    transition: fill 0.3s, stroke 0.3s;
    fill: transparent;
}
.thums-up:hover .heart svg {
    stroke: #ffb700;
}

.thums-up-text {
    margin-left: 1px;
    font-size: 13px;
    user-select: none;
}
</style>
