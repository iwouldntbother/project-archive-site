<template>
  <div>
    <!-- <Terminal :status="status" :longest="longest" :archiveData="archiveData" /> -->
    <FilingCabinet
      :status="status"
      :longest="longest"
      :archiveData="archiveData"
    />
  </div>
</template>

<script setup lang="ts">
import type { Project, Content, Longest } from '~/types/project.d.ts';

const longest: Ref<Longest> = ref({
  title: 0,
  description: 0,
  live: 0,
  code: 0,
});

const { data: archiveData, status } = await useAsyncData<Project[]>(
  'archive',
  async () => {
    const content = (await queryContent('/').findOne()) as Content;
    return content?.body || [];
  },
  {
    lazy: true,
    transform: (data) => {
      longest.value = data.reduce(
        (acc, project) => {
          return {
            title: Math.max(acc.title, project.title.length),
            description: Math.max(acc.description, project.description.length),
            live: Math.max(acc.live, project.url.live?.length || 0),
            code: Math.max(acc.code, project.url.code?.length || 0),
          };
        },
        { title: 0, description: 0, live: 0, code: 0 }
      );
      //console.log(longest.value);
      return data as Project[];
    },
  }
);

// onMounted(() => {
//   console.log(
//     innerWidth / parseFloat(getComputedStyle(document.documentElement).fontSize)
//   );
// });
</script>
