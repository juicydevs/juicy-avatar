<template>
  <div class="juicy-modal-container" :class="{'juicy-modal-visible': isOpen}">
    <div class="juicy-modal-table">
      <div class="juicy-modal-middle-align">
        <div class="juicy-modal-content">
          <div class="juicy-modal-inner">
            <button class="juicy-modal-closer" @click="closeModal">
              <span class="juicy-modal-closer-icon" aria-hidden="true">
                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M6.586 8L.93 2.343 2.342.93 8 6.585 13.657.93l1.414 1.413L9.42 8l5.657 5.657-1.413 1.414L8 9.42l-5.657 5.65L.93 13.658 6.585 8z"></path>
                </svg>
              </span>
            </button>
            <div class="avatar-wrap">
              <div class="juicy-p-control-modal">
                <h2 class="juicy-modal-title" :style="modalTitleStyle ? modalTitleStyle : {}">
                  {{ labels.modalTitle }}
                </h2>
                <div class="juicy-modal-body">
                  <div class="juicy-avatar-image">
                    <div class="image-box">
                    <div class="w-260">
                      <img :src="getRenderedImage()" id="juicy-user-avatar" v-if="!avatarFile">
                      <cropper
                        v-if="avatarFile"
                        :src="getRenderedImage()"
                        @change="cropChange"
                      />
                    </div>
                  </div>
                  </div>
                  <div class="juicy-avatar-load">
                    <div class="juicy-avatar-load_item">
                      <div class="field-text" :style="modalUploadImageStyle ? modalUploadImageStyle : {}">
                        {{ labels.modalUploadImage }}:
                      </div>
                      <span id="profile_page_load_avatar">
                        <span class="juicy-upload-container">
                          <span aria-label="Загрузить" tabindex="0" class="juicy-upload-btn" aria-disabled="false" role="button">
                            <span class="juicy-upload-btn-text">{{ labels.modalUploadBtn }}</span>
                            <input @change="changeAvatar" ref="juicyAvatarFileRef" autocomplete="off" class="juicy-file-input" tabindex="-1" type="file" />
                          </span>
                        </span>
                      </span>
                    </div>
                    <div class="juicy-avatar-size_description" :style="modalDescriptionStyle ? modalDescriptionStyle : {}">
                      {{ labels.description }}
                    </div>
                  </div>
                </div>
                <div class="juicy-modal-footer">
                  <div class="juicy-btn-save">
                    <span class="juicy-btn-save-avatar-line">
                      <button @click="saveImageAction" type="button" class="juicy-button-save" aria-disabled="false" autocomplete="off">
                        <span class="juicy-button-save-label">{{ labels.btnSave }}</span>
                      </button>
                    </span>
                  </div>
                  <div class="juicy-btn-cancel">
                    <button @click="closeModal" type="button" class="juicy-button-cancel" aria-disabled="false" autocomplete="off">
                      <span class="juicy-button-save-label">{{ labels.btnCancel }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Cropper } from 'vue-advanced-cropper'
export default {
  props: [
    'modalTitleLabel',
    'isOpen',
    'avatar',
    'modalUploadImageLabel',
    'modalUploadBtnText',
    'modalDescriptionLabel',
    'modalBtnSaveText',
    'modalBtnCancelText',
    'modalTitleStyle',
    'modalUploadImageStyle',
    'modalDescriptionStyle',
  ],
  data () {
    return {
      labels: {
        modalTitle: 'User Portrait',
        modalUploadImage: 'Upload Image',
        modalUploadBtn: 'Upload',
        description: 'You can upload a picture in png, jpg and gif format. Dimensions not less than 200 × 200 pixels, file size not more than 7MB.',
        btnSave: 'Save',
        btnCancel: 'Cancel',
      },
      cropData: null,
      avatarFile: null,
      base64: null,
      defaultAvatar: 'https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-300'
    }
  },
  methods: {
    saveImageAction() {
      if (this.avatarFile) {
        const data = {
          file: this.avatarFile,
          base64: this.base64,
          crop: this.cropData
        }
        this.$emit('juicy-avatar-image-save', data)
        this.closeModal()
      }
    },
    cropChange({ coordinates, canvas }) {
      this.cropData = {
        coordinates,
        canvas
      }
    },
    getRenderedImage() {
      return this.base64 ? this.base64 : this.avatar || this.defaultAvatar
    },
    changeAvatar(event) {
      const file = event.target && event.target.files ? event.target.files[0] : null
      if (file) {
        this.avatarFile = file
      }
    },
    prepareBase64() {
      if (this.avatarFile) {
        const reader = new FileReader()
        reader.onloadend = () => {
          this.base64 = reader.result
        }
        reader.readAsDataURL(this.avatarFile)
      }
    },
    closeModal() {
      this.$emit('juicy-avatar-modal-close', true)
      this.reset()
    },
    reset() {
      this.avatarFile = null
      this.base64 = null
    }
  },
  watch: {
    avatarFile: function () {
      this.prepareBase64()
    },
    modalDescriptionLabel: function () {
      this.labels.description = this.modalDescriptionLabel
    },
    modalTitleLabel: function () {
      this.labels.modalTitle = this.modalTitleLabel
    },
    modalUploadImageLabel: function () {
      this.labels.modalUploadImage = this.modalUploadImageLabel
    },
    modalUploadBtnText: function () {
      this.labels.modalUploadBtn = this.modalUploadBtnText
    },
    modalBtnCancelText: function () {
      this.labels.btnCancel = this.modalBtnCancelText
    },
    modalBtnSaveText: function () {
      this.labels.btnSave = this.modalBtnSaveText
    }
  },
  components: {
    Cropper
  }
}
</script>
