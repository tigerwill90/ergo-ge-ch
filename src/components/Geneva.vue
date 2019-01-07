<template>
  <FlexContainer justify-content="center">
    <div v-if="!$vuetify.breakpoint.smAndDown" class="section">
      <div class="container-img">
        <img src="../assets/img/geneva.svg" class="image" alt="geneva" />
      </div>
      <p class="headline paragraph">
        <strong style="color: teal;">La section genevoise de l’ASE</strong> est composée de tous les ergothérapeutes membres de l’ASE qui sont domiciliés à Genève ou qui en font la demande par écrit au secrétariat central de l’Association
      </p>
    </div>
    <div v-else class="section column">
      <p class="text-xs-center headline">
        <strong style="color: teal;">La section genevoise de l’ASE</strong> est composée de tous les ergothérapeutes membres de l’ASE qui sont domiciliés à Genève ou qui en font la demande par écrit au secrétariat central de l’Association
      </p>
      <div class="container-img">
        <img src="../assets/img/geneva.svg" class="image" alt="geneva">
      </div>
    </div>
  </FlexContainer>
</template>

<script>
export default {
  name: 'Geneva'
}
</script>

<style scoped>
  .container-img {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .image {
    height: 200px;
    min-height: 200px;
    width: auto;
  }

  .section {
    display: flex;
    align-items: center;
    max-width: 70%;
  }

  .section.column {
    flex-direction: column;
    max-width: 80%;
  }

  .paragraph {
    padding-left: 20px;
  }

</style>
