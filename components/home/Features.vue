<script setup>
import {
  SquareDashedBottomCode,
  LayoutPanelTop,
  Command,
  Scale,
  Key,
  Layers,
  ListRestart,
  Waypoints,
  BrainCircuit,ListOrdered,ServerCog,Text
} from "lucide-vue-next";
import { motion } from "motion-v";

const iconMap = {
  LayoutPanelTop,
  Command,
  SquareDashedBottomCode,
  Text,
  Scale,
  Key,
  Layers,
  ServerCog,
  ListOrdered,
  ListRestart,
  Waypoints,
  BrainCircuit
};
const data = [
  {
    head: "Templates",
    sub: "Save project setups or starter kits you can reuse anytime. Perfect for speed and consistency.",
    icon: "LayoutPanelTop",
    soon: false
  },
  {
    head: "Custom Commands",
    sub: "Create project-specific or global CLI shortcuts to automate anything — builds, cleanup, deploys, and more.",
    icon: "Command",
    soon: false
  },
  {
    head: "Code Snippet",
    sub: "Save and reuse useful bits of code. Share them or keep them just for you.",
    icon: "SquareDashedBottomCode",
    soon: true
  },
  {
    head: "Prompt Archive",
    sub: "Save LLM prompts, chains, and workflows so you don’t lose great ideas.",
    icon: "Text",
    soon: true
  },
  {
    head: "License Generator",
    sub: "Pick a license and boom — it’s ready to drop into your project.",
    icon: "Scale",
    soon: false
  },
  {
    head: "API Key Manager",
    sub: "Securely store and manage API keys — local or cloud. No more .env mess.",
    icon: "Key",
    soon: true
  },
  {
    head: "Layers",
    sub: "Wrap tools like Git or Docker with smart shortcuts. Works globally. Super convenient.",
    icon: "Layers",
    soon: true
  },
  {
    head: "HTTP CodeGen",
    sub: "Instant lookup or generate common server status codes. No Googling needed.",
    icon: "ServerCog",
    soon: false
  },
  {
    head: "Line Counter",
    sub: "See how much code you've written — useful for stats or bragging rights.",
    icon: "ListOrdered",
    soon: false
  },
  {
    head: "Hot Reload",
    sub: "Trigger server reloads right from the CLI. Fast dev flow, no extra setup.",
    icon: "ListRestart",
    soon: false
  },
  {
    head: "Online Sharing",
    sub: "Share templates, snippets, and tools with the community — or just your team.",
    icon: "Waypoints",
    soon: false
  },
  {
    head: "More Coming Soon",
    sub: "AI-powered tools are coming: smart code gen, automation, suggestions & more.",
    icon: "BrainCircuit",
    soon: true
  }
];




const out_of_list =  [
{
    "head": "MCP Server & Integration",
    "sub": "Connect to MCP (Model Context Protocol) servers for shared workflows, services, and discovery mechanisms. (coming soon)",
    "icon": "ServerCrash",
    "emoji": "🧩",
    "color": "#00FF87",
    "size": 35
  },
   {
    head: "Plugin System",
    sub: "Extend Cook’s functionality with custom plugins for niche workflows. (coming soon)",
    icon: "Blocks",
    emoji: "🔌",
    color: "#00FF87",
    size: 35
  },
]

import FeatureCard from "./FeatureCard.vue";

</script>
<template>
  <div id="feature-section">
    <motion.div id="feature-head"
    :initial="{ opacity: 0, y: 100, scale: 0.8, filter: 'blur(15px)' }"
    :while-in-view="{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }"

    :transition="{ type: 'spring', stiffness: 120, damping: 14 }"
    :in-view-options="{ once: true }"
    >FEATURES</motion.div>

    <div id="feature-box">

      <FeatureCard
        v-for="feature,index in data"
        :key="feature.head"
        :head="feature.head"
        :sub="feature.sub"
        :index="index"
        :soon="feature.soon"
      >
        <component :is="iconMap[feature.icon]" color="#00FF87" size="35" />
      </FeatureCard>




    </div>
  </div>
</template>

<style scoped>
#feature-head {
  font-size: 30px;
  margin-bottom: 100px;
}

#feature-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#feature-box {
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  #feature-section {
    margin-top: 150px;
  }

  #feature-head {
    font-size: 25px;
  }
}
</style>
