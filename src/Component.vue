<template>
  <div id="app">
    <preview
      v-on:juicy-avatar-modal-show="openModal"
      :addPhotoLabel="addPhotoLabel"
      :showAddPhotoLabel="showAddPhotoLabel"
      :avatar="previewAvatar"
    />
    <modal
      v-on:juicy-avatar-modal-close="closeModal"
      v-on:juicy-avatar-image-save="saveImage"
      :is-open="modalIsOpen"
      :modalTitleLabel="modalTitleLabel"
      :modalUploadImageLabel="modalUploadImageLabel"
      :modalUploadBtnText="modalUploadBtnText"
      :modalDescriptionLabel="modalDescriptionLabel"
      :modalBtnSaveText="modalBtnSaveText"
      :avatar="modalAvatar"
    />
  </div>
</template>
<script>
import axios from 'axios'
import preview from './components/preview'
import modal from './components/modal'

export default {
  props: [
    'addPhotoLabel',
    'showAddPhotoLabel',
    'modalTitleLabel',
    'modalUploadImageLabel',
    'modalUploadBtnText',
    'modalDescriptionLabel',
    'modalBtnSaveText',
    'avatar',
    'styles',
    'uploadFile',
    'uploadUrl',
    'uploadParamName',
    'uploadCropParamName',
    'uploadAdditionalParams',
    'uploadHeaders',
  ],
  data () {
    return {
      modalIsOpen: false,
      previewAvatar: null,
      modalAvatar: null,
      isUploadFile: true,
      file: null,
      crop: null,
    }
  },
  methods: {
    saveImage(data) {
      this.previewAvatar = data.base64
      this.modalAvatar = data.base64
      this.crop = data.crop
      this.file = data.file
      this.$emit('juicy-avatar-image-changes', data)
      if (this.isUploadFile) {
        this.uploadAvatar()
      }
    },
    openModal() {
      this.modalIsOpen = true
      this.$emit('juicy-avatar-modal-open', true)
    },
    closeModal() {
      this.modalIsOpen = false
      this.$emit('juicy-avatar-modal-close', true)
    },
    checkUploadStatus() {
      if (!this.uploadFile) {
        this.isUploadFile = false
      }
    },
    uploadAvatar() {
      if (this.isUploadFile && this.file) {
        try {
          let formData = new FormData()
          const paramName = this.uploadParamName || 'image'
          const cropParamName = this.uploadCropParamName || 'crop'
          const url = this.uploadUrl || ''
          const headers = {
            'Content-Type': 'multipart/form-data'
          }
          formData.append(paramName, this.file)
          formData.append(cropParamName, this.crop)
          if (this.uploadAdditionalParams) {
            Object.keys(this.uploadAdditionalParams).map((key, index) => {
              const value = this.uploadAdditionalParams[key]
              formData.append(key, value)
            })
          }
          if (this.uploadHeaders) {
            Object.keys(this.uploadHeaders).map((key, index) => {
              headers[key] = this.uploadHeaders[key]
            })
          }

          axios.post(url, formData, { headers })
            .then(response => { this.$emit('juicy-avatar-success-uploaded', response) })
            .catch(err => { this.$emit('juicy-avatar-error-uploaded', err) })
        } catch (err) {
          this.$emit('juicy-avatar-error-uploaded', err)
        }
      } else {
        this.$emit('juicy-avatar-validation-error', 'missing file')
      }
    }
  },
  watch: {
    avatar: function () {
      this.previewAvatar = this.avatar
      this.modalAvatar = this.avatar
    },
    uploadFile: function () {
      this.checkUploadStatus()
    }
  },
  components: {
    preview,
    modal
  },
  mounted() {
    this.checkUploadStatus()
  }
}
</script>
<style src="./assets/styles/juicy-style.css"></style>
