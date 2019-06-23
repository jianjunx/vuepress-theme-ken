<template>
  <div class="card">
    <h3 class="card-title">{{title}}</h3>
    <div class="card-content">
      <slot></slot>
    </div>
    <div><slot name="foot"></slot></div>
  </div>
</template>
<script>
export default {
  name: 'SideCard',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus">
.card{
  width: 100%;
  background-color: #fff;
  &-title{
    font-size: 14px;
    font-weight: normal;
    line-height: 36px;
    border-bottom: 1px solid $borderColor;
    padding: 0 10px;
  }
  &-content{
    padding: 10px;
  }
}
</style>
