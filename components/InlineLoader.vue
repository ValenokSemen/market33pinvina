<template>
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="jjoFVh"
    :class="{ loading: loading }"
  >
    <g
      fill="none"
      stroke-width="1.5"
      stroke-linecap="round"
      class="faEWLr"
      style="stroke: var(--icon-color)"
    >
      <circle stroke-opacity=".2" cx="8" cy="8" r="6"></circle>
      <circle cx="8" cy="8" r="6" class="VFMrX"></circle>
    </g>
  </svg>
</template>

<script>
export default {
  props: ["loading"],
};
</script>
