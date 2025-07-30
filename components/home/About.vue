<script setup>
import { motion as m } from 'motion-v';




</script>

<template>
  <div id="about-box">
    <div id="about-head">Cook - The All-in-One CLI for Lazy Devs</div>

    <m.div id="about-sub"
    :initial="{filter:'blur(10px)',y:20,opacity:0}"
    :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
    :transition="{delay:.15}"
    :in-view-options="{amount:1,once:true}"
    >
      **Cook** is a powerful, extensible CLI tool designed to streamline and
      automate everyday development tasks. Whether you're setting up a new
      project, managing boilerplate code, running repetitive commands, or
      tunneling a local server — Cook brings it all together in one elegant
      toolkit. Built for developers who prefer building over boilerplate, it
      helps you move faster with less setup and more shipping.
    </m.div>

    <div id="about-item-box">
      <div class="ab-item i1">
        <div class="abi-head">What Cook Offers (v1)</div>

        <div class="abi-sub">
          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"
          >
            <strong>CLI Superpowers:</strong> The heart of Cook—run templates, custom commands, and dev shortcuts in seconds.
          </m.p>

          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"
          >
            <strong>Templates Kits:</strong> Spin up full project structures in one command. Reuse, remix, repeat.
          </m.p>

          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"
          >
            <strong>Smart Utils:</strong> Built-in tools like license generator, line counter, and hot reload | just type and go.
          </m.p>

          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"

          >
            <strong>Cook Platform (Public):</strong> Discover and share templates, snippets, and more with the community.
          </m.p>


          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"

          >
            <strong>Personal Dashboard:</strong> Manage your templates, snippets, AI prompts, and dev tools—all in one place.
          </m.p>
        </div>
      </div>

      <div class="ab-item i2">
        <div class="abi-head">Architecture Overview</div>

        <div class="abi-sub">
          <m.p

          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"
          >
            <span><strong>1. CLI Tool</strong></span
            ><br />
          Your all-in-one dev sidekick — run tasks, launch tunnels, manage templates, and automate anything from your terminal.
          </m.p>

          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"
          >
            <span><strong>2. Personal Dashboard</strong></span
            ><br />
            A clean, web-based home to manage your snippets, secrets, and projects — no terminal needed.
          </m.p>

          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"
          >
            <span><strong>3. Public Platform</strong></span
            ><br />
            Share and sync your templates, snippets, and APIs with the world. Like GitHub, but for workflows.
          </m.p>

          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"

          >
            <span><strong>4. Public API's & MCP server (Coming Soon)</strong></span
            ><br />
            Smart endpoints + automation hub. Powered by AI to bring context-aware actions, auto-suggestions, and more.
          </m.p>
        </div>
      </div>

      <div class="ab-item i3">
        <div class="abi-head">Who is it for?</div>

        <div class="abi-sub">
          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"
          >• ⚡ Indie hackers juggling multiple side projects.</m.p>

          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"
          >• 🧠 Teams tired of reinventing workflows every sprint.</m.p>

          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"
          >
            • 🌍 Open-source devs who crave clean, consistent project scaffolding.
          </m.p>

          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"
          >
            • 🛠️ Anyone sick of copy-pasting boilerplate just to get started.
          </m.p>

          <m.p
          :initial="{filter:'blur(10px)',y:20,opacity:0}"
          :while-in-view="{filter:'blur(0px)',y:0,opacity:1 }"
          :transition="{delay:.15}"
          :in-view-options="{amount:1,once:true}"
          >
            • 🚀 Builders who just want to ship faster without the setup drama.
          </m.p>
        </div>
      </div>
    </div>

    <div id="about-foot"


    >
      <div id="af-head">Early Access</div>

      <m.div id="af-sub"
          :initial="{filter:'blur(10px)',opacity:0,x:-10}"
    :while-in-view="{filter:'blur(0px)',opacity:1,x:0 }"
    :transition="{delay:.15}"
    :in-view-options="{amount:1,once:true}"

      >
        We're currently building the v1 version and accepting users to our
        <span @click="scrollToElement('#waitlist-box')">waitlist</span>.
        Join up early to shape the future of Cook and get access tp internal
        builds, feedback loops, and plugin dev guides.
      </m.div>
    </div>
  </div>
</template>

<style scoped>
#about-box {
  /* border: 1px solid salmon; */
  /* height: 400px; */
  background-color: #0d0d0d;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px 0px;
  gap: 20px;

}

#about-item-box{
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2);
  grid-template-rows: repeat(2 );
  grid-column-gap: 10px;
  grid-row-gap: 10px;

}

#about-sub {
  width: 70%;
  font-family: var(--term-font);
  /* line-height: 20px; */
  font-size: 16px;
}

#about-head {
  font-size: 30px;
  color: var(--green);
}

#about-item {
  width: 80%;
  /* border: 1px solid salmon; */
}

#about-foot {
  width: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#af-head {
  font-size: 23px;
  color: var(--green);
}

#af-sub {
  width: 70%;
  font-family: var(--term-font);
  margin-top: 10px
}

#af-sub span {
  color: whitesmoke;
  font-weight: 700;
  cursor: pointer;
}

.abi-head {
  font-size: 28px;
  font-weight: 600;
  color: var(--green);
  margin-top: 32px;
  margin-bottom: 16px;
  font-family: var(--term-font);
  padding-left: 12px;
}

.abi-sub {
  color: #dddddd;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 32px;
  padding-left: 8px;
}

.abi-sub p {
  margin: 8px 0;
  background: var(--bg);

  padding: 10px 14px;
  border-radius: 8px;
  transition: background 0.3s ease;
  font-family: var(--term-font);

}

.abi-sub p:hover {
  background: rgba(0, 255, 157, 0.07);
}

.abi-sub span {
  color: var(--green);
  font-weight: bold;
  display: inline-block;
  margin-bottom: 4px;
}

.ab-item {

  padding: 10px;
  height: max-content;
  border-radius: 12px;

  /* border: 1px solid var(--border); */
}


.i1{
grid-area: 1 / 1 / 2 / 2;
}


.i2{
grid-area: 2 / 1 / 3 / 2;
}


.i3{
 grid-area: 1 / 2 / 3 / 3;
}




@media (max-width: 640px) {
/* *{
  border: 1px solid salmon;
} */

#about-item-box{
  width: 90%;
  display: flex;
  flex-direction: column;
}

#about-head{
  font-size: 22px;
  text-align: center;
}
#about-sub{
  width: 90%;
  font-size: 14px;
  /* text-align: center; */
}

#about-foot{
  width: 95%;
}

#af-sub{
  width: 95%;

}

}
</style>
