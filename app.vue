<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: rgb(var(--bg));
  color: rgb(var(--text));
  transition: background-color 0.5s, color 0.5s;
  font-family: monospace;
}

html {
  font-size: 12px;
}

@media screen and (max-width: 700px) {
  html {
    font-size: 8px;
  }
}

/* body::-webkit-scrollbar {
  display: none;
}

body {
  -ms-overflow-style: none;
  scrollbar-width: none;
} */

:root {
  --text: 255, 0, 0;
  --bg: 33, 37, 41;
}

.textColour {
  color: rgb(var(--text));
  transition: color 0.5s;
}

.bgColour {
  background-color: rgb(var(--bg));
  transition: background-color 0.5s;
}

.textColourInvert {
  color: rgb(var(--bg));
  transition: color 0.5s;
}

.bgColourInvert {
  background-color: rgb(var(--text));
  transition: background-color 0.5s;
}
</style>

<!-- <script setup lang="ts">
console.log(
  " _                     _     _       _   _           _   _  \n(_)                   | |   | |     | | | |         | | | |              \n ___      _____  _   _| | __| |_ __ | |_| |__   ___ | |_| |__   ___ _ __ \n| \\ \\ /\\ / / _ \\| | | | |/ _` | '_ \\| __| '_ \\ / _ \\| __| '_ \\ / _ \\ '__|\n| |\\ V  V / (_) | |_| | | (_| | | | | |_| |_) | (_) | |_| | | |  __/ |   \n|_| \\_/\\_/ \\___/ \\__,_|_|\\__,_|_| |_|\\__|_.__/ \\___/ \\__|_| |_|\\___|_|   \nWilliam Westwood // iwouldntbother // wwstwd"
);
</script> -->
