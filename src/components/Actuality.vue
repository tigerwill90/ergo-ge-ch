<template>
  <FlexContainer
    background-color="#f0f8ff"
    min-height="650px"
    justify-content="center"
    column
    align-items="center"
  >
    <div class="actuality-container">
      <div class="item" v-for="(data, i) in datas" :key="i">
        <v-card class="actuality-card">
          <v-img
            class="white--text"
            height="200px"
            :src="data.imageUrl"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{data.title}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title style="flex: 1;">
            <div>
              <span class="grey--text">{{data.subtitle}}</span>
              <br>
              <span>{{data.text}}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Partager</v-btn>
            <v-btn flat color="orange">En savoir plus</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </FlexContainer>
</template>

<script>
export default {
  name: 'Actuality',
  data() {
    return {
      datas: [
        {
          title: 'Rencontre des ergothérapeutes chef-fe-s ',
          subtitle: 'explicabo sit odio',
          imageUrl: `${process.env.VUE_APP_API_URL}/images/knitting`,
          text:
            'Qui nulla totam. Aut omnis qui voluptatum suscipit laudantium ad. Exercitationem quibusdam enim beatae porro. Fuga omnis iusto deleniti cum facilis rerum quia exercitationem eveniet. Voluptatibus aliquam sit.'
        },
        {
          title: 'Journée de la région Suisse romande',
          imageUrl: `${process.env.VUE_APP_API_URL}/images/crossfit`,
          text: `Ut consequuntur repudiandae voluptatem optio. Molestiae laudantium excepturi. Aliquid sit quam iure et suscipit quas et. Minima sit nobis qui recusandae quidem nemo et et.
 
                Eveniet est non illo sit. Excepturi explicabo sed asperiores omnis sed consectetur consequatur. Nostrum ut dolor voluptas reiciendis corrupti eius suscipit. Ut porro molestiae debitis rerum. Autem excepturi facilis nisi voluptatibus laudantium. Quia reprehenderit maxime et repudiandae ut doloremque ex temporibus.
                
                Consectetur praesentium commodi consequatur rerum magni fugit voluptatem ad. Tempore qui iusto est beatae. Laudantium molestiae dicta eum. Molestias porro aut est unde. Sit odit quas et eligendi amet facilis.`
        },
        {
          title: 'illum-non-officiis',
          imageUrl: `${process.env.VUE_APP_API_URL}/images/fruit`,
          subtitle: 'minima',
          text:
            'Autem corporis sunt cupiditate libero consectetur id explicabo et quis. Repellendus rem tempore nemo nobis nihil neque esse ratione sapiente.'
        },
        {
          title: "Journée mondiale de l'ergothérapie",
          imageUrl: `${process.env.VUE_APP_API_URL}/images/running`,
          subtitle: 'vero-sit-cumque',
          text:
            'Voluptatem veniam saepe sed impedit enim labore cumque molestias ipsam. Vitae velit et sunt dolorem veritatis optio facilis et. Ipsa asperiores voluptas voluptatem. Ut esse quas voluptas id ea libero. Doloremque itaque sunt facilis quo quasi reiciendis suscipit ut. At aspernatur reprehenderit eum dicta qui ut.'
        }
      ]
    }
  }
}
</script>
<style scoped>
.actuality-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  width: 100%;
  grid-gap: 15px 15px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.actuality-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
