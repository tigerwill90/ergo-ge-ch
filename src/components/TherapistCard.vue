<template>
  <v-card class="therapist-card" elevation-10>
    <div class="therapist-card-title">
      <span>{{office}}, {{domain}}</span>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'TherapistCard',
  props: {
    domain: {
      type: String,
      required: true
    },
    office: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .therapist-card{
    width: 100%;
    height: 200px;
    margin-top: 30px;
    position: relative;
  }

  .therapist-card-title {
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #424242;
    position: absolute;
    min-width: 200px;
    height: 30px;
    color: white;
    bottom: 92%;
    left: 10px
  }

</style>
