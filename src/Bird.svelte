<script lang="ts">
  import type { Bird } from "./game";
  export let bird: Bird;
</script>

<style>
  #bird { 
    border: solid black 1px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  }
</style>

<section
    style="width: {bird.size}px; height: {bird.size}px; top: {bird.top}px; left: {bird.left}px;"
    id="bird"
    >
    <img alt="subquery-logo" src="images/subquery-logo.png" width="40px" height="40px" /></section>
