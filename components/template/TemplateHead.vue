<template>
  <main>
        <div id="mb-head">
        {{ props.name }}
        <!-- <Star size="18px" /> -->
      </div>

      <div id="mb-uuid">
        <div>{{ props.id }}</div>
        <span @click="() => copyText(props.id)">
          <Copy color="#FFFFFF" size="18px" />
        </span>
      </div>

      <div id="mb-status">
        <span id="mbs-version">{{ props.version }}</span>
        •
        <span id="mbs-public" v-if="props.public">public</span>
        <span id="mbs-private" v-if="!props.public">private</span>
        •
        <span id="mbs-time">Published {{ monthsAgo(props.date) }}</span>
      </div>
</main>
      <div class="line"></div>

</template>

<script setup>
import { Copy } from 'lucide-vue-next';

const props = defineProps({
 name:{
  default:"none"
 },
 id:{
  default:"none"
 },
 version:{
  default:"none"
 },
 public:{
  default:"none"
 },
 date:{
  default:"none"
 },

})

function copyText(text) {
  navigator.clipboard.writeText(text);
}


function monthsAgo(dateString) {
  const inputDate = new Date(dateString);
  const now = new Date();

  const yearsDiff = now.getFullYear() - inputDate.getFullYear();
  const monthsDiff = now.getMonth() - inputDate.getMonth();

  let totalMonths = yearsDiff * 12 + monthsDiff;

  // If the day in the current month is less than the input date's day, subtract one month
  if (now.getDate() < inputDate.getDate()) {
    totalMonths -= 1;
  }

  if (totalMonths <= 0) {
    // Calculate days difference
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysDiff = Math.floor((now - inputDate) / msPerDay);
    return daysDiff <= 0
      ? "today"
      : `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
  }

  return `${totalMonths} month${totalMonths > 1 ? "s" : ""} ago`;
}


</script>

<style scoped>

main{
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  gap: 10px;
}

#mb-head {
  font-size: 43px;
  margin-left: 25px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
}

#mb-uuid div {
  color: whitesmoke;
}

#mb-uuid span:active {
  scale: 0.9;
}

#mb-uuid {
  margin-left: 25px;

  font-size: 23px;
  border: 1px solid var(--border);
  background-color: var(--bg);
  border-radius: 7px;
  padding: 5px 10px;
  width: max-content;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

#mb-status {
  margin-left: 25px;
}

#mbs-public {
  color: var(--green);
}

#mbs-private {
  color: var(--pink);
}


.line {
  border-bottom: 1px solid var(--border);
  margin-top: 20px;
}
</style>
