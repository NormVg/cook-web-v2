<script setup>
const props = defineProps({
  color: {
    default: "white",
    type: String,
  },
  callback:{
    default:()=>{alert("my  btn pressed")},
    type:Function
  }
});

const mycolor = computed(() => {
  if (props.color === "white") {
    return "#A8A7AC";
  } else if (props.color === "pink") {
    return "#E56EB2";
  } else if (props.color === "red") {
    return "#D86159";
  } else if (props.color === "yellow") {
    return "#D6BC7F";
  } else if (props.color === "green") {
    return "#00FF87";
  } else if (props.color === "blue") {
    return "#B28BEB";
  }
});



</script>

<template>
  <div id="btn-box" @click="props.callback()">
    <div id="btn-bg" :style="{ backgroundColor: mycolor }">
      <div id="btn-main" :style="{ color: mycolor, borderColor: mycolor }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
#btn-box {
  height: max-content;
  width: max-content;
  cursor: pointer;
}

#btn-main {
  width: max-content;
  height: max-content;
  padding: 10px;
  z-index: 5;
  border-width: 3px;
  border-style: solid;
  background-color: var(--bg);
  transform: translate(-7px, -7px);
  transition: all ease-in-out 200ms;
  user-select: none;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.9);
}

#btn-bg {
  width: max-content;
  height: max-content;
  box-shadow: 4px 4px 10px rgba(255, 255, 255, 0.2);

}

#btn-box :hover #btn-main {
  transform: translate(-4px, -4px);
}

#btn-box :active #btn-main {
  transform: translate(0px, 0px);
}
</style>
