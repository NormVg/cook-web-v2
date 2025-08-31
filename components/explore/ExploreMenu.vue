<template>
  <div class="dropdown-container">
    <div class="dropdown" @click="toggleDropdown" ref="dropdownRef">
      <div class="dropdown-selected">
        <span>{{ selectedOption }}</span>
        <svg
          class="dropdown-arrow"
          :class="{ rotated: isOpen }"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>

      <div class="dropdown-menu" v-show="isOpen">
        <div
          class="dropdown-item"
          v-for="option in options"
          :key="option.value"
          :class="{ selected: option.value === selectedValue }"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [
      { label: "All", value: "all" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Pending", value: "pending" },
    ],
  },
  defaultValue: {
    type: String,
    default: "all",
  },
});

const emit = defineEmits(["change"]);

const isOpen = ref(false);
const selectedValue = ref(props.defaultValue);
const selectedOption = ref(
  props.options.find((opt) => opt.value === props.defaultValue)?.label || "All"
);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedValue.value = option.value;
  selectedOption.value = option.label;
  isOpen.value = false;
  emit("change", option);
};

const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
  /* width: 200px; */
  width: max-content;
  margin: -7px;
}

.dropdown {
  position: relative;
    background-color: var(--bg);
  /* border: 1px solid #333; */
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
}

.dropdown-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
  min-height: 20px;
}

.dropdown-selected span{
  padding: 0 5px;
}

.dropdown-arrow {
  transition: transform 0.2s ease;
  color: #888;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
    background-color: var(--bg);
  border: 1px solid #333;
  /* border-top: none; */
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 5px;
}

.dropdown-item {
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #2a2a2a;
}

.dropdown-item.selected {
  background-color: #3a3a3a;
  color: #ffffff;
}

.dropdown-item:last-child {
  border-radius: 0 0 6px 6px;
}

/* Custom scrollbar for dropdown menu */
.dropdown-menu::-webkit-scrollbar {
  width: 6px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 3px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>



<!--
<DropDownMenu
  :options="[
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ]"
  default-value="all"
  @change="handleSelectionChange"
/> -->
