<template>
    <div class="dashboard-container">
        <el-row :gutter="40" class="card-panel__col">
            <el-col :span="6" class="card-panel__col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-people">
                        <svg-icon name="job" class="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">职位数</div>
                        <count-up class="card-panel-num" :end-val="38829"></count-up>
                    </div>
                </div>
            </el-col>

            <el-col :span="6" class="card-panel__col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-message">
                        <svg-icon name="city" class="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">城市数</div>
                        <count-up class="card-panel-num" :end-val="86"></count-up>
                    </div>
                </div>
            </el-col>

            <el-col :span="6" class="card-panel__col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-money">
                        <svg-icon name="company" class="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">公司数</div>
                        <count-up class="card-panel-num" :end-val="7635"></count-up>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" class="card-panel__col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-shopping">
                        <svg-icon name="job-type" class="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">职位类型</div>
                        <count-up class="card-panel-num" :end-val="943"></count-up>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import CountUp from 'vue-countup-v3'
</script>

<style lang="scss" scoped>
.dashboard-container {
    padding: 24px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
        position: absolute;
        top: 0px;
        border: 0;
        right: 0;
        z-index: 99;
    }

    .box-center {
        margin: 0 auto;
        display: table;
    }

    .user-profile {
        .box-center {
            padding-top: 10px;
        }

        .user-role {
            padding-top: 10px;
            font-weight: 400;
            font-size: 14px;
        }

        .box-social {
            padding-top: 30px;

            .el-table {
                border-top: 1px solid #dfe6ec;
            }
        }

        .user-follow {
            padding-top: 20px;
        }
    }

    .card-panel__col {
        margin-bottom: 12px;
    }

    .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.05);

        &:hover {
            .card-panel-icon-wrapper {
                color: #fff;
            }

            .icon-user {
                background: #e77541;
            }

            .icon-people {
                background: #9b40c9;
            }

            .icon-message {
                background: #36a3f7;
            }

            .icon-money {
                background: #f4516c;
            }

            .icon-shopping {
                background: #34bfa3;
            }
        }

        .icon-people {
            color: #9b40c9;

            .svg-icon {
                width: 4em !important;
                height: 4em !important;
            }
        }

        .icon-message {
            color: #36a3f7;

            .svg-icon {
                width: 4em !important;
                height: 4em !important;
            }
        }

        .icon-money {
            color: #f4516c;

            .svg-icon {
                width: 4em !important;
                height: 4em !important;
            }
        }

        .icon-shopping {
            color: #34bfa3;

            .svg-icon {
                width: 4em !important;
                height: 4em !important;
            }
        }

        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }

        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 26px 20px 0;

            .card-panel-text {
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                margin-bottom: 12px;
            }

            .card-panel-num {
                font-size: 20px;
            }
        }
    }

    .chart-container {
        background: #ffffff;
    }
}
.card-panel-icon {
    width: 3.5em;
    height: 3.5em;
    vertical-align: -0.15em;
    overflow: hidden;
    fill: currentColor;
}
</style>
