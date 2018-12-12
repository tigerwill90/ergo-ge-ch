<template>
  <FlexContainer>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item v-for="(item, i) in items" :key="i" :color="item.color" large>
        <span slot="opposite">
          <v-img :src="item.src" aspect-ratio="3" content></v-img>
        </span>
        <v-card class="elevation-2">
          <v-card-title class="title">{{item.title}}</v-card-title>
          <v-card-text>{{item.description}}</v-card-text>
          <div class="desc-link-content" v-if="item.download">
            <a :href="item.download" target="_blank">Démarche de l'ergothérapie</a>
            <v-btn icon :href="item.download + '?disposition=download'">
              <v-icon color="green">cloud_download</v-icon>
            </v-btn>
          </div>
          <v-card-text v-if="item.ref" class="card-sub-ref">{{item.ref}}</v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
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
          title: 'Qu\'est-ce que l\'ergothérapie ?',
          ref: 'Selon la définition de l\'ASE, mai 2011',
          color: 'blue lighten-2',
          download: process.env.VUE_APP_PDF_PROCEDURE_URL,
          description: `
                L'ergothérapie est une profession centrée sur le développement et le maintien de la capacité d'agir des personnes.
                Elle contribue à l'amélioration de la santé et de la qualité de la vie.
                Elle facilite la participation des individus à la société en leur permettant de prendre part aux activités qui s'y déroulent.`,
          src: 'https://picsum.photos/510/300?random'
        },
        {
          title: 'Une autre réponse ?',
          ref: 'Définition DACHS" de l\'ergothérapie, version du 06.02.2007',
          color: 'red lighten-2',
          description: `
                L'ergothérapie - du grec "ergein" (agir, être actif) - part du principe que " être actif" est un besoin fondamental de l'être humain et qu'une activité mise en oeuve de manière ciblée
                a un effet thérapeutique et bénéfique pour la santé. Pour cette raison, l'ergothérapie soutient et accompagne les personnes, quel que soit leur âge, qui sont restreintes dans leur
                capacité d'action ou menacées par une limitation et/ ou désirent étendre leur capacité d'action. L'objectif de l'ergothérapie est de soutenir les personnes dans leur environnement
                lors de la réalisation d'activités significatives pour elles dans les domaines des soins personnels, de la productivité et des loisirs. L'ergothérapie utilise des activités spécifiques,
                l'adaptation à l'environnement et le conseil de manière ciblée et orientée vers les ressources. Ceci permet au client d'améliorer sa capacité d'action dans le quotidien, sa participation
                sociale, sa sensation de qualité de vie et sa satisfaction.`,
          src: 'https://picsum.photos/510/300?random'
        },
        {
          title: 'A qui s\'adresse l\'ergothérapie ?',
          color: 'green lighten-2',
          description: `L'ergothérapie s'adresse aux personnes de tout âge, aux prises avec des difficultés à agir de manière autonome dans les activités de la vie quotidienne,
          que ce soit pour leurs soins personnels, les activités sociales, professionnelles, de formation ou de loisirs. Les interventions d'ergothérapie peuvent consister en des traitements lors
          de phases aigues, mais également être des traitements de longue durée. Les interventions en lien avec des actions de prévention et de promotion de la santé sont aussi possibles.`,
          src: 'https://picsum.photos/510/300?random'
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

  .desc-link-content {
    display: flex;
    align-items: center;
    padding-left: 16px;
  }
</style>
