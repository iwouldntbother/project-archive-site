<template>
  <ClientOnly>
    <div class="site-container" @touchstart="handleTouchStart">
      <!-- <div>{{ sortedData }}</div> -->
      <div class="about">
        <pre>
 _                     _     _       _   _           _   _  
(_)                   | |   | |     | | | |         | | | |              
 ___      _____  _   _| | __| |_ __ | |_| |__   ___ | |_| |__   ___ _ __ 
| \ \ /\ / / _ \| | | | |/ _` | '_ \| __| '_ \ / _ \| __| '_ \ / _ \ '__|
| |\ V  V / (_) | |_| | | (_| | | | | |_| |_) | (_) | |_| | | |  __/ |   
|_| \_/\_/ \___/ \__,_|_|\__,_|_| |_|\__|_.__/ \___/ \__|_| |_|\___|_|   
William Westwood // iwouldntbother // wwstwd</pre
        >
        <p>
          This is a collection of small projects and experiments I have worked
          on.<br />
          Hover over a project to view more details.
        </p>
        <div class="search">
          <Icon name="material-symbols:search" size="1.5rem" />
          <input type="text" placeholder="Search..." v-model="searchValue" />
        </div>
      </div>
      <div
        class="cabinet"
        :style="{
          height: (sortedData.length - 1) * 3 + 25.75 + 'rem',
        }"
      >
        <div
          class="back"
          :style="{ height: sortedData.length * 2.1 + 'rem' }"
        ></div>
        <template v-for="(project, index) in sortedData">
          <template v-if="isDivider(project)">
            <div class="file divider" :style="{ top: index * 2 + 'rem' }">
              <div class="file-title divider-title">{{ project.letter }}</div>
              <div class="file-body divider-body"></div>
            </div>
          </template>
          <template v-else>
            <div
              class="file"
              :style="{
                top: index * 2 + 'rem',
                'margin-top':
                  searchValue.length > 0
                    ? project.title.includes(searchValue)
                      ? '0rem'
                      : '15rem'
                    : '15rem',
              }"
            >
              <div
                class="file-title"
                @click="
                  {
                    searchValue = '';
                  }
                "
              >
                {{ project.title }}
              </div>
              <div class="file-body">
                <div class="icons">
                  <Icon
                    v-if="project.url.live"
                    name="material-symbols:public"
                  />
                  <Icon
                    v-if="project.url.code"
                    name="material-symbols:code-rounded"
                  />
                </div>
                <p class="project-desc">{{ project.description }}</p>
                <p v-if="project.url.live">
                  <Icon name="material-symbols:public" />
                  Live:
                  <a :href="'https://' + project.url.live" target="_blank">{{
                    project.url.live
                  }}</a>
                </p>
                <p v-if="project.url.code">
                  <Icon name="material-symbols:code-rounded" />
                  Code:
                  <a :href="'https://' + project.url.code" target="_blank">{{
                    project.url.code
                  }}</a>
                </p>
              </div>
            </div>
          </template>
        </template>
        <div class="front" :style="{ top: sortedData.length * 2 + 'rem' }">
          <div class="label">Archive</div>
          <div class="handle"></div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import type { Project, Longest, Divider } from '~/types/project.d.ts';

const searchValue: Ref<string> = ref('');

const sortedData: Ref<(Project | Divider)[]> = ref([]);

const props = defineProps<{
  status: string;
  longest: Longest;
  archiveData: Project[] | null;
}>();

function sortProjects(projects: Project[]): Project[] {
  return projects.sort((a, b) => a.title.localeCompare(b.title));
}

function addDividers(projects: Project[]): (Project | Divider)[] {
  const sortedProjects = sortProjects(projects);
  const result: (Project | Divider)[] = [];
  let currentLetter = '';

  for (const project of sortedProjects) {
    const firstLetter = project.title[0].toUpperCase();

    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      result.push({ letter: currentLetter, divider: true });
    }

    result.push(project);
  }

  return result;
}

sortedData.value = addDividers(props.archiveData || []);

function isDivider(item: Project | Divider): item is Divider {
  return (item as Divider).divider === true;
}

function isProject(item: Project | Divider): item is Project {
  return (item as Project).title !== undefined;
}

const openFile: Ref<HTMLElement | null> = ref(null);

function handleTouchStart(event: TouchEvent) {
  const target = event.target as HTMLElement;
  const file = target.closest('.file') as HTMLElement;

  console.log(target.classList.contains('file-title'), file, openFile.value);

  if (target.classList.contains('file-title')) {
    if (file) {
      if (openFile.value === file) {
        openFile.value = null;
        file.style.marginTop = '15rem';
      } else if (openFile.value) {
        openFile.value.style.marginTop = '15rem';
        openFile.value = file;
        file.style.marginTop = '0rem';
      } else {
        openFile.value = file;
        file.style.marginTop = '0rem';
      }
    }
  } else if (openFile.value && (file == null || !file.contains(target))) {
    if (openFile.value) {
      openFile.value.style.marginTop = '15rem';
      openFile.value = null;
    }
  }
}
</script>

<style scoped>
.site-container {
  background-color: #ccd5ae;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100vw;
  min-height: 100vh;
}

.search {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.search input {
  width: 20rem;
  height: 2rem;
  border: solid rgb(225, 0, 0);
  border-width: 0 0 0.2rem 0;
  padding: 0;
  font-size: 1rem;
  color: rgb(225, 0, 0);
  background: none;
  margin-left: 0.25rem;
}

.cabinet {
  position: relative;
  min-height: 10vh;
  height: fit-content;
  width: 50vw;
}

.file {
  width: 50vw;
  position: absolute;
  cursor: pointer;
  transition: margin 0.25s ease-out;
  margin-top: 15rem;
}

.file:has(.file-title:hover, .file-body:hover) {
  margin-top: 0rem !important;
}

.file-title {
  font-size: 1.4rem;
  font-weight: bold;
  background-color: antiquewhite;
  width: fit-content;
  padding: 0 2rem;
  border-radius: 1.5rem 1.5rem 0 0;
  color: black;
  box-sizing: border-box;
  border: solid brown 0.25rem;
  margin-bottom: -0.25rem;
  margin-left: 5.25rem;
  position: relative;
}

.file-title::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 0.5rem;
  background: antiquewhite;
  bottom: -0.5rem;
  left: 0;
}

.divider-title::after {
  background: #6b705c;
}

.divider .file-title {
  margin-left: 0;
}

.divider {
  pointer-events: none;
}

.file-body {
  font-size: 1rem;
  background-color: antiquewhite;
  height: 20vh;
  border: solid brown 0.25rem;
  z-index: -1;
  border-radius: 1rem 1rem 0 0;
  padding: 2rem 1rem 0 1rem;
}

.icons {
  position: absolute;
  right: 0.75rem;
  top: 2.75rem;
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
}

.divider-body {
  border-radius: 0 1rem 0 0;
}

.front {
  position: absolute;
  width: calc(50vw + 2rem);
  height: 25vh;
  background-color: silver;
  border: solid darkgray;
  border-width: 0.5rem 0 0 0;
  margin-left: -1rem;
  z-index: 10;
  margin-top: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.label {
  padding: 0.75rem 1.5rem;
  border: solid gray 0.5rem;
  background-color: antiquewhite;
  margin-top: -2rem;
}

.handle {
  width: 20vw;
  height: 3rem;
  border: solid #6b6b6b;
  border-width: 1rem;
  border-top-width: 0;
  border-radius: 0 0 3rem 3rem;
}

.back {
  background-color: darkgray;
  width: calc(50vw + 2rem);
  position: absolute;
  top: 14rem;
  left: -1rem;
}

.divider-title {
  background-color: #6b705c;
  color: wheat;
}

.divider-body {
  background-color: #6b705c;
}

@media screen and (max-width: 700px) {
  .site-container {
    width: 100vw;
  }

  .cabinet {
    width: 80vw;
  }

  .file {
    width: 80vw;
  }

  .front {
    width: calc(80vw + 2rem);
  }

  .back {
    width: calc(80vw + 2rem);
  }
}
</style>
