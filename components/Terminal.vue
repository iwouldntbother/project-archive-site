<script setup lang="ts">
import type { Project, Longest } from '~/types/project.d.ts';

const props = defineProps<{
  status: string;
  longest: Longest;
  archiveData: Project[] | null;
}>();
</script>

<template>
  <div>
    <ClientOnly>
      <div id="top-bar">
        <svg
          version="1.1"
          id="logo-img"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 1024 1024"
        >
          <g>
            <path
              fill="rgb(var(--bg))"
              stroke="none"
              d="M598.5,361.96L326.45,686.59h-95.72l71.55-213.64L125.29,686.59H29.56l105.11-324.63h84.62l-89.72,236.3   l194.23-236.3h86.94l-80.94,236.3l183.6-236.3H598.5z"
            />
          </g>
          <g>
            <path
              fill="rgb(var(--bg))"
              stroke="none"
              d="M994.44,361.96L722.39,686.59h-95.72l71.55-213.64L521.23,686.59H425.5l105.11-324.63h84.62l-89.72,236.3   l194.23-236.3h86.94l-80.94,236.3l183.6-236.3H994.44z"
            />
          </g>
        </svg>
        <pre>
//William Westwood
//iwouldntbother
//wwstwd</pre
        >
      </div>
      <div id="terminal" class="textColour bgColour">
        <pre v-if="$props.status == 'pending'">Loading...</pre>
        <template v-else-if="$props.status == 'success' && $props.archiveData">
          <!-- <pre>{{ '━'.repeat(208) }}</pre> -->
          <pre>Number of Projects: {{ $props.archiveData.length }}</pre>

          <pre class="divider">{{
            '┏' +
            '━'.repeat($props.longest.title + 2) +
            '┳' +
            '━'.repeat($props.longest.description + 2) +
            '┳' +
            ($props.longest.live > 0
              ? '━'.repeat($props.longest.live + 8) + '┳'
              : '') +
            ($props.longest.code > 0
              ? '━'.repeat($props.longest.code + 8) + '┓'
              : '')
          }}</pre>
          <div v-for="(project, index) in $props.archiveData" class="table-row">
            <div class="content">
              <pre>┃ </pre>
              <pre class="table-cell">{{ project.title }}</pre>
              <pre> ┃ </pre>
              <pre class="table-cell">{{ project.description }}</pre>
              <pre v-if="project.url.live"> ┃ Live: </pre>
              <a
                v-if="project.url.live"
                class="table-cell"
                :href="'https://' + project.url.live"
                target="_blank"
              >
                <pre>{{ project.url.live }}</pre>
              </a>
              <pre v-if="project.url.code"> ┃ Code: </pre>
              <a
                v-if="project.url.code"
                class="table-cell"
                :href="'https://' + project.url.code"
                target="_blank"
              >
                <pre>{{ project.url.code }}</pre>
              </a>
              <pre> ┃</pre>
            </div>
            <pre
              v-if="index != $props.archiveData.length - 1"
              class="divider"
              >{{
                '┣' +
                '━'.repeat($props.longest.title + 2) +
                '╋' +
                '━'.repeat($props.longest.description + 2) +
                '╋' +
                ($props.longest.live > 0
                  ? '━'.repeat($props.longest.live + 8) + '┻'
                  : '') +
                ($props.longest.code > 0
                  ? '━'.repeat($props.longest.code + 8) + '┫'
                  : '')
              }}</pre
            >
            <pre v-else class="divider">{{
              '┗' +
              '━'.repeat($props.longest.title + 2) +
              '┻' +
              '━'.repeat($props.longest.description + 2) +
              '┻' +
              ($props.longest.live > 0
                ? '━'.repeat($props.longest.live + 8) + '┻'
                : '') +
              ($props.longest.code > 0
                ? '━'.repeat($props.longest.code + 8) + '┛'
                : '')
            }}</pre>
          </div>
        </template>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
#top-bar {
  width: 100vw;
  height: 4.8rem;
  background-color: rgb(var(--text));
  display: flex;
  flex-direction: row;
  align-items: end;
}

#logo-img {
  height: 4.8rem;
  width: auto;
  margin: 0 2rem;
}

#top-bar pre {
  font-size: 1rem;
  line-height: 1.2rem;
  margin: 0;
  color: rgb(var(--text));
  background-color: rgb(var(--bg));
  padding: 1.2rem 1rem 0 1rem;
}

#terminal a {
  color: rgb(var(--text));
}

#terminal {
  resize: none;
  width: 100vw;
  border: none;
  font-size: 1rem;
  line-height: 1.2rem;
}

.content {
  display: flex;
  flex-direction: row;
}

.content pre {
  margin: 0;
}

.divider {
  margin: 0;
}
</style>

<!--
  \\'
  TODO 0. Make typing effect for the text
  TODO 1. Style like a terminal
  TODO 2. make terminal commands work, eg ls to show all, nano to view the code and ./ to open the live site (if code is unavailable then permission denied, if site isn't available then file isn't executable)
-->
