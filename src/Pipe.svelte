<script lang="ts">
    import type { PipePair } from "./game";
    export let pipe: PipePair;


</script>

<style>
  .pipe {
    position: absolute;
    /*background-color: #ff4581;*/
    background-color: #FFF8FE;
    writing-mode: vertical-lr;
    text-orientation: upright;
    overflow: hidden;
    text-align: center;
  }
  .bottom-pipe {
    background-color: black;
  }
  .subquery-info {
    font-size: 16px;
    margin-left: 5px;
  }
</style>


{#if pipe.show }
<section
    style="Left: {pipe.left}px; top: {pipe.topPipe.top}px; width: {pipe.width}px; height: {pipe.topPipe.height}px;"
    class="top-pipe pipe"
    >
    <p class="subquery-info">{pipe.topPipe.text}</p></section>
<section
    style="Left: {pipe.left}px; top: {pipe.bottomPipe.top}px; width: {pipe.width}px; height: {pipe.bottomPipe.height}px;"
    class="bottom-pipe pipe"
    ></section>
{/if}
