<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
  >
    <article class="events-content-article">
      <span class="app-section-title title-1">Gestion des évènements</span>
      <div class="events-content-section">
        <section class="events-form-section">
          <v-form
            ref="form"
            v-model="valid"
          >
            <p>
              En tant qu'administrateur de la plateforme ASE, vous avez la possibilité d'ajouter de nouveaux évènements.
              Les évènements à venir sont affichés sur la page d'accueille et publiquement visible.
            </p>
            <div class="event-box">
              <v-icon>event</v-icon>
              <v-text-field
                v-model="tempEvent.title"
                label="Titre*"
                type="text"
                required
                :rules="eventTitleRules"
              />
              <v-text-field
                v-model="tempEvent.subtitle"
                type="text"
                label="Sous-titre"
                :rules="eventSubtitleRule"
              />
            </div>
            <v-checkbox
              v-model="addUrls"
              color="blue"
              label="Ajouter des liens"
            />
            <template v-if="addUrls">
              <div
                v-for="(_, k) in tempEvent.urls"
                :key="k"
                class="event-box"
              >
                <v-icon>link</v-icon>
                <v-btn
                  v-if="tempEvent.urls.length > 1"
                  icon
                  @click="tempEvent.urls.splice(k, 1)"
                >
                  <v-icon>
                    delete
                  </v-icon>
                </v-btn>
                <div
                  class="d-flex flex-column"
                >
                  <v-text-field
                    v-model="tempEvent.urls[k].name"
                    type="text"
                    label="Nom du lien"
                    required
                    :rules="eventUrlNameRules"
                  />
                  <v-text-field
                    v-model="tempEvent.urls[k].url"
                    type="url"
                    label="Lien"
                    required
                    :rules="eventUrlRules"
                  />
                </div>
              </div>
              <div class="d-flex add-link">
                <span class="flex-grow-1">Ajouter un nouveau lien</span>
                <v-btn
                  icon
                  @click="tempEvent.urls.push({name: '', url: ''})"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </div>
            </template>
            <div>
              <v-checkbox
                v-model="addDate"
                color="blue"
                label="Ajouter une date"
              />
              <v-date-picker
                v-if="addDate"
                v-model="picker"
                multiple
                :landscape="$store.getters.windowSize.x >= 1010"
                locale="fr-ch"
                full-width
                style="margin: 20px 0 20px 0"
              />
              <v-textarea
                v-model="tempEvent.description"
                label="Description de l'évènement*"
                type="text"
                :counter="350"
                :rules="eventDescriptionRules"
                auto-grow
                required
              />
            </div>
            <p>
              Afin d'améliorer l'expérience utilisateur, chaque évènement doit être accompagné d'une image repérsentative.
              <b>Seul les formats d'images suivant sont supporté : png, jpg, jpeg et svg</b>.
            </p>
            <div class="list-file caption">
              <template v-if="image">
                <b>Image sélectionnée :</b>
                <span>{{ imageName }} [{{ imageSize/1000 }} kB {{ imageType }}]</span>
              </template>
              <b
                v-else
                style="color: red"
              >Auncune image sélectionnée</b>
              <b v-if="!isSupportedFileType">Format non supporté...</b>
              <b v-if="!isValidImageName">Aucun espace ou caractères spéciaux autorisés</b>
              <b v-if="!isValidImageSize">L'image fait plus de 2mo</b>
            </div>
            <file-upload
              ref="upload"
              post-action="/post.method"
              put-action="/put.method"
              @input-filter="inputFilter"
            >
              <v-btn>
                Téléverser
                <v-icon
                  right
                  dark
                >
                  cloud_upload
                </v-icon>
              </v-btn>
            </file-upload>
            <div>
              <v-btn
                color="warning"
                class="text-none ma-1"
                @click="reset()"
              >
                Annuler
              </v-btn>
              <v-btn
                v-if="!updateMode"
                color="primary"
                class="text-none ma-1"
                :disabled="disabled"
                @click="create()"
              >
                Créer l'évènement
              </v-btn>
              <v-btn
                v-else
                color="primary"
                class="text-none ma-1"
                :disabled="disabled"
                @click="update()"
              >
                Modifier l'évènement
              </v-btn>
            </div>
          </v-form>
        </section>
        <section class="events-list-section">
          <v-card
            v-if="events.length > 0"
            max-width="500px"
            width="100%"
          >
            <v-list two-line>
              <template
                v-for="(event, i) in events"
              >
                <v-list-item
                  :key="`${event.title}-${i}`"
                  @click="prepareUpdate(event)"
                >
                  <v-list-item-avatar>
                    <v-icon v-if="datesAreOutdated(event.dates)">
                      check
                    </v-icon>
                    <v-icon v-else>
                      event
                    </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ event.title }}</v-list-item-title>
                    <v-list-item-subtitle
                      v-if="event.dates.length === 1"
                    >
                      {{ format(event.dates[0]) }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle
                      v-if="event.dates.length > 1"
                    >
                      {{ format(event.dates[0]) }} ({{ event.dates.length - 1 }} dates supplémentaires)
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                      icon
                      ripple
                      @click="openDialog(event, i)"
                    >
                      <v-icon color="grey lighten-1">
                        delete
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider
                  v-if="i < events.length - 1"
                  :key="i"
                />
              </template>
            </v-list>
          </v-card>
        </section>
      </div>
    </article>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">
          Supprimer l'évènement {{ eventToDelete.title }} ?
        </v-card-title>
        <v-card-text>
          <template v-if="datesAreOutdated(eventToDelete.dates)">
            Cet évènement à déjà eu lieu.
          </template>
          <template v-else-if="eventToDelete.dates.length === 0">
            Cet évènement n'a pas de date.
          </template>
          <b v-else>
            Attention, cet évènement n'a pas encore eu lieu.
          </b>
          Cette opération est irréversible.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="text-none ma-1"
            color="primary"
            text
            @click="closeDialog()"
          >
            Annuler
          </v-btn>
          <v-btn
            class="text-none ma-1"
            color="warning"
            text
            @click="remove()"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </FlexContainer>
</template>

<script>
import FlexContainer from '../FlexContainer'
export default {
  name: 'EventsManagement',
  components: {
    FlexContainer
  },
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      picker: [],
      image: null,
      formData: null,
      imageName: '',
      imageSize: 0,
      imageType: '',
      addDate: false,
      addUrls: false,
      disabled: false,
      eventToDelete: {
        title: '',
        subtitle: null,
        dates: [],
        urls: [],
        description: '',
        img_alt: '',
        img_name: ''
      },
      rowIdToDelete: -1,
      valid: false,
      tempEvent: {
        title: '',
        subtitle: null,
        dates: [],
        urls: [{ name: '', url: '' }],
        description: '',
        img_alt: '',
        img_name: ''
      },
      eventTitleRules: [
        v => !!v || 'Le titre de l\'évènement est requis',
        v => v.toString().length >= 3 || 'Minimum 3 caractères',
        v => /^[A-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\-'(),& ]+$/.test(v) || 'Le titre de l\'évènement ne doit contenir aucun caractères spéciaux, excepté "-\'(),&"',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => v.toString().length <= 50 || 'Maximum 50 caractères'
      ],
      eventSubtitleRule: [
        v => (!v || v.toString().length >= 3) || 'Minimum 3 caractères',
        v => (!v || /^[A-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\-:'(),& ]+$/.test(v) || 'Le sous-titre de l\'évènement ne doit contenir aucun caractères spéciaux, excepté "-:\'(),&"'),
        v => (!v || !/\s+$/.test(v)) || 'Espace en fin de champ interdit.',
        v => (!v || v.toString().length <= 50) || 'Maximum 50 caractères'
      ],
      eventUrlNameRules: [
        v => !!v || 'Le nom du lien est requis',
        v => v.toString().length >= 3 || 'Minimum 3 caractères',
        v => /^[A-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\-'(),& ]+$/.test(v) || 'Le nom de lien ne doit contenir aucun caractères spéciaux, excepté "-\'(),&"',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => v.toString().length <= 100 || 'Maximum 100 caractères'
      ],
      eventUrlRules: [
        v => !!v || 'Le lien ne peut pas être vide.',
        v => (!v || v.toString().length >= 5) || 'Minimum 5 caractères.',
        v => (!v || !/\s+$/.test(v)) || 'Espace en fin de champ interdit.',
        v => (!v || /(^|[\s.:;?\-\]<(])(https?:\/\/[-\w;/?:@&=+$|_.!~*|'()[\]%#,☺]+[\w/#](\(\))?)(?=$|[\s',|().:;?\-[\]>)])/.test(v)) || 'L\'url pour ce lien n\'est pas valide. Ex: www.google.ch ou https://google.ch',
        v => (!v || v.toString().length <= 250) || 'Maximum 250 caractères.'
      ],
      eventDescriptionRules: [
        v => !!v || 'La description de l\'évènement est requis',
        v => v.toString().length >= 3 || 'Minimum 3 caractères',
        v => v.toString().length <= 350 || 'Maximum 50 caractères'
      ],
      isSupportedFileType: true,
      isValidImageName: true,
      isValidImageSize: true,
      updateMode: false
    }
  },
  methods: {
    format(s) {
      const date = new Date(s)
      let mm = date.getMonth() + 1
      if (mm.toString().length === 1) {
        mm = '0' + mm.toString()
      }
      let dd = date.getDate()
      if (dd.toString().length === 1) {
        dd = '0' + dd.toString()
      }
      return dd + '.' + mm + '.' + date.getFullYear()
    },
    datesAreOutdated(dates) {
      return dates.every(date => {
        const d = new Date(date)
        const now = Date.now()
        return date && d < now
      })
    },
    remove() {
      this.$http.delete(`${process.env.VUE_APP_API_URL}/events/${this.eventToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
        }
      })
        .then(() => {
          this.closeDialog()
          this.$emit('remove-event', this.rowIdToDelete)
          this.$store.commit('notification', { status: 200, message: `L'évènement ${this.eventToDelete.title} a bien été supprimé` })
        })
        .catch(err => {
          this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
        })
    },
    openDialog(event, id) {
      this.dialog = true
      this.eventToDelete = event
      this.rowIdToDelete = id
    },
    closeDialog() {
      this.dialog = false
      this.reset()
    },
    update() {
      if (this.$refs.form.validate() && this.image && this.isSupportedFileType && this.isValidImageName && this.isValidImageSize) {
        this.disabled = true
        if (this.addDate) {
          this.tempEvent.dates = this.picker
        }
        if (!this.addUrls) {
          this.tempEvent.urls = null
        }
        Object.keys(this.tempEvent).forEach(key => {
          if (!this.tempEvent[key]) {
            this.tempEvent[key] = null
          }
        })

        this.$http({
          method: 'PUT',
          url: `${process.env.VUE_APP_API_URL}/events/${this.tempEvent.id}`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
          },
          data: this.tempEvent
        })
          .then(response => {
            const event = response.data.data
            this.$emit('update-event', event)
            this.$store.commit('notification', { status: response.status, message: 'Évènement modifié' })

            if (typeof this.image !== 'boolean') {
              this.$http({
                method: 'POST',
                url: `${process.env.VUE_APP_API_URL}/events/${event.id}/images`,
                headers: {
                  Authorization: `Bearer ${this.$store.getters.authorization.access_token}`,
                  'Content-Type': 'multipart/form-data'
                },
                data: this.formData
              })
                .then(() => {
                  this.disabled = false
                  this.reset()
                })
                .catch(err => {
                  this.disabled = false
                  this.reset()
                  this.$store.commit('notification', { status: 400, message: err.response.data.data.user_message })
                })
            } else {
              this.reset()
              this.disabled = false
            }
          })
          .catch(err => {
            this.disabled = false
            this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
          })
      } else {
        this.$store.commit('notification', { status: 400, message: 'Toutes les données doivent être valide pour créer un évènement' })
      }
    },
    prepareUpdate(event) {
      this.reset()
      this.updateMode = true
      this.tempEvent = JSON.parse(JSON.stringify(event))
      if (this.tempEvent.dates.length > 0) {
        this.addDate = true
        this.tempEvent.dates.forEach(date => this.picker.push(date.substr(0, 10)))
      }
      if (this.tempEvent.urls.length > 0) {
        this.addUrls = true
      } else {
        this.tempEvent.urls.push({ name: '', url: '' })
      }

      this.$http.get(`${process.env.VUE_APP_API_URL}/events/${event.id}/images`)
        .then(response => {
          this.image = true
          this.imageSize = response.data.length
          this.imageType = response.headers['content-type']
          this.imageName = this.tempEvent.img_alt
        })
        .catch(err => {
          this.$store.commit('notification', { status: 400, message: err.response.data.data.user_message })
        })
    },
    create() {
      if (this.$refs.form.validate() && this.image && this.isSupportedFileType && this.isValidImageName && this.isValidImageSize) {
        this.disabled = true
        if (this.addDate) {
          this.tempEvent.dates = this.picker
        }
        if (!this.addUrls) {
          this.tempEvent.urls = null
        }
        Object.keys(this.tempEvent).forEach(key => {
          if (!this.tempEvent[key]) {
            this.tempEvent[key] = null
          }
        })
        this.$http({
          method: 'POST',
          url: `${process.env.VUE_APP_API_URL}/events`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
          },
          data: this.tempEvent
        })
          .then(response => {
            const event = response.data.data
            this.$emit('create-event', event)
            this.$store.commit('notification', { status: response.status, message: 'Évènement ajouté' })

            this.$http({
              method: 'POST',
              url: `${process.env.VUE_APP_API_URL}/events/${event.id}/images`,
              headers: {
                Authorization: `Bearer ${this.$store.getters.authorization.access_token}`,
                'Content-Type': 'multipart/form-data'
              },
              data: this.formData
            })
              .then(() => {
                this.disabled = false
                this.reset()
              })
              .catch(err => {
                this.disabled = false
                this.reset()
                this.$store.commit('notification', { status: 400, message: err.response.data.data.user_message })
              })
          })
          .catch(err => {
            this.disabled = false
            this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
          })
      } else {
        this.$store.commit('notification', { status: 400, message: 'Toutes les données doivent être valide pour créer un évènement' })
      }
    },
    goTo(to) {
      this.$store.commit('selector', {
        hash: '#' + to,
        routeName: this.$router.currentRoute.name
      })
    },
    reset() {
      this.$refs.form.resetValidation()
      this.imageName = ''
      this.imageSize = 0
      this.imageType = ''
      this.image = null
      this.formData = null
      this.isSupportedFileType = true
      this.isValidImageName = true
      this.isValidImageSize = true
      this.addDate = false
      this.picker = []
      this.tempEvent = {
        title: '',
        subtitle: null,
        dates: [],
        urls: [{ name: '', url: '' }],
        description: '',
        img_alt: '',
        img_name: ''
      }
      this.updateMode = false
      this.goTo('events')
    },
    inputFilter: function (newFile) {
      if (!/\.(jpeg|jpg|png|svg)$/i.test(newFile.name)) {
        this.isSupportedFileType = false
        this.image = null
        this.formData = null
        return
      }

      if (!/^[A-z0-9_-]+\.(jpeg|jpg|png|svg)$/i.test(newFile.name)) {
        this.isValidImageName = false
        this.image = null
        this.formData = null
        return
      }

      if (newFile.size >= 2000000) {
        this.isValidImageSize = false
        this.image = null
        this.formData = null
        return
      }

      this.imageName = newFile.name
      this.imageSize = newFile.size
      this.imageType = newFile.type
      this.image = newFile.file
      this.isSupportedFileType = true
      this.isValidImageName = true
      this.isValidImageSize = true
      this.tempEvent.img_name = this.imageName
      this.tempEvent.img_alt = this.imageName
      this.formData = new FormData()
      this.formData.append('image', this.image)
    }
  }
}
</script>

<style scoped>
  .event-box {
    background: #bbdefb;
    border-radius: 5px;
    margin: 10px 0 10px 0;
    padding: 10px 10px 10px 10px;
  }
  .add-link {
    background: #cfd8dc;
    align-items: center;
    padding: 0 0 0 10px;
  }

  .events-content-article {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .events-content-section {
    display: flex;
    width: 100%;
  }

  .events-form-section {
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-right: 25px;
  }

  .events-list-section {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: flex-start;
  }

  .list-file {
    display: flex;
    flex-direction: column;
    margin: 10px 0 10px 0;
    padding: 5px 5px 5px 5px;
    height: 70px;
    background: #e0e0e0;
  }

  @media screen and (max-width: 1280px) {
    .events-content-section {
      display: flex;
      flex-direction: column-reverse;
      width: 100%;
    }

    .events-list-section {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: flex-start;
      margin-bottom: 15px;
    }
  }
</style>
