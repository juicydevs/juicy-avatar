<template>
  <span
    class="juicy-avatar"
    @click="openModal"
    :style="{ 'background-image': 'url('+getPreviewImageUrl()+')' }"
  >
    <span class="juicy-avatar-mask"></span>
    <span>
      <span class="juicy-avatar-change show-icon"></span>
    </span>
    <div
      class="juicy-personal-info juicy-d-link"
      v-if="isShowAddPhotoLabel"
      :style="styles && styles.addPhotoStyle ? styles.addPhotoStyle : {}"
    >
      {{ labels.addPhoto }}
    </div>
  </span>
</template>

<script>
export default {
  props: [
    'avatar',
    'addPhotoLabel',
    'showAddPhotoLabel',
    'styles'
  ],
  data () {
    return {
      isUserBlankAvatar: true,
      isShowAddPhotoLabel: true,
      blankImageUrl: '/src/assets/images/blank-avatar.png',
      labels: {
        addPhoto: 'Add Photo'
      }
    }
  },
  methods: {
    openModal() {
      this.$emit('juicy-avatar-modal-show', true)
    },
    prepareImagesBeforeRender() {
      this.isUserBlankAvatar = !this.avatar
    },
    getPreviewImageUrl() {
      return this.avatar || this.blankImageUrl
    }
  },
  watch: {
    addPhotoLabel: function () {
      this.labels.addPhoto = this.addPhotoLabel
    },
    avatar: function () {
      this.isUserBlankAvatar = false
    },
    showAddPhotoLabel: function () {
      this.isShowAddPhotoLabel = this.showAddPhotoLabel
    }
  },
  mounted() {
    this.prepareImagesBeforeRender()
  }
}
</script>
