<template>
  <svg class="icon icon-style" aria-hidden="true" :style="{'font-size': size, ...styles}">
    <use :xlink:href="`#icon-${type}`"></use>
  </svg>
</template>
<script>
export default {
  name: 'icon',
  props: {
    type: {
      type: String,
      default: 'shuye1'
    },
    size: {
      type: String,
      default: '14px'
    },
    styles: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>


