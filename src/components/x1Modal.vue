<template>
  <div class="
    background
    fixed top-0 right-0 bottom-0 left-0
    flex items-center justify-center
  ">
    <div class="modal p3">
      <slot/>
    </div>
  </div>
</template>

<style>
.background {
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}
.modal {
  background-color: var(--black);
  max-width: var(--modal-max-width, 600px);
  max-height: var(--modal-max-height, 600px);
}
</style>
