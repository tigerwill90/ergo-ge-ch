<template>
  <FlexContainer>
    <v-timeline v-if="!$vuetify.breakpoint.xs" :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item v-for="(item, i) in items" :key="i" :color="item.color" large class="align-timeline">
        <span slot="opposite">
          <v-img :src="item.img" aspect-ratio="3" content></v-img>
        </span>
        <v-card class="elevation-2">
          <v-card-title class="title">{{item.title}}</v-card-title>
          <v-card-text>{{item.description}}</v-card-text>
          <div class="desc-link-content" v-if="item.download">
            <a :href="item.download" target="_blank">{{item.downloadName}}</a>
            <v-btn icon :href="item.download + '?disposition=download'">
              <v-icon color="green">cloud_download</v-icon>
            </v-btn>
          </div>
          <v-card-text v-if="item.ref" class="card-sub-ref">{{item.ref}}</v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <div v-else class="section-container">
      <div class="section" v-for="(item, i) in items" :key="i">
        <div class="section-title">
          <span class="title text-xs-center">{{item.title}}</span>
        </div>
        <div :class="{'section-content': !item.download}">
          {{item.description}}
        </div>
        <div v-if="item.download">
          <a :href="item.download" target="_blank">{{item.downloadName}}</a>
          <v-btn icon :href="item.download + '?disposition=download'">
            <v-icon color="green">cloud_download</v-icon>
          </v-btn>
        </div>
        <v-img :src="item.img" aspect-ratio="3" content :class="{'section-img': i < items.length - 1}"></v-img>
      </div>
    </div>
  </FlexContainer>
</template>

<script>
export default {
  name: 'Description',
  data () {
    return {
      items:
      [
        {
          title: 'Qu\'est-ce que l\'ergothérapie\xa0?',
          ref: 'Selon la définition de l\'ASE, mai 2011',
          color: 'blue lighten-2',
          download: process.env.VUE_APP_PDF_PROCEDURE_URL,
          downloadName: 'Démarche de l\'ergothérapie (pdf)',
          description: `
                L'ergothérapie est une profession centrée sur le développement et le maintien de la capacité d'agir des personnes.
                Elle contribue à l'amélioration de la santé et de la qualité de la vie.
                Elle facilite la participation des individus à la société en leur permettant de prendre part aux activités qui s'y déroulent.`,
          img: 'https://picsum.photos/510/300?random'
        },
        {
          title: 'Une autre réponse\xa0?',
          ref: 'Définition DACHS" de l\'ergothérapie, version du 06.02.2007',
          color: 'red lighten-2',
          description: `
                L'ergothérapie - du grec "ergein" (agir, être actif) - part du principe que " être actif" est un besoin fondamental de l'être humain et qu'une activité mise en oeuve de manière ciblée
                a un effet thérapeutique et bénéfique pour la santé. Pour cette raison, l'ergothérapie soutient et accompagne les personnes, quel que soit leur âge, qui sont restreintes dans leur
                capacité d'action ou menacées par une limitation et/ ou désirent étendre leur capacité d'action. L'objectif de l'ergothérapie est de soutenir les personnes dans leur environnement
                lors de la réalisation d'activités significatives pour elles dans les domaines des soins personnels, de la productivité et des loisirs. L'ergothérapie utilise des activités spécifiques,
                l'adaptation à l'environnement et le conseil de manière ciblée et orientée vers les ressources. Ceci permet au client d'améliorer sa capacité d'action dans le quotidien, sa participation
                sociale, sa sensation de qualité de vie et sa satisfaction.`,
          img: 'https://picsum.photos/510/300?random'
        },
        {
          title: 'A qui s\'adresse l\'ergothérapie\xa0?',
          color: 'green lighten-2',
          description: `L'ergothérapie s'adresse aux personnes de tout âge, aux prises avec des difficultés à agir de manière autonome dans les activités de la vie quotidienne,
          que ce soit pour leurs soins personnels, les activités sociales, professionnelles, de formation ou de loisirs. Les interventions d'ergothérapie peuvent consister en des traitements lors
          de phases aigues, mais également être des traitements de longue durée. Les interventions en lien avec des actions de prévention et de promotion de la santé sont aussi possibles.`,
          img: 'https://picsum.photos/510/300?random'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .card-sub-ref {
    color: blue;
  }

  .align-timeline {
    align-items: center;
  }

  .desc-link-content {
    display: flex;
    align-items: center;
    padding-left: 16px;
  }

  .section-container {
    display: flex;
    flex-direction: column;
  }

  .section {
    display: flex;
    flex-direction: column;
  }

  .section-title {
    padding-bottom: 20px;
  }

  .section-content {
    padding-bottom: 20px;
  }

  .section-img {
    margin-bottom: 30px;
  }
</style>
