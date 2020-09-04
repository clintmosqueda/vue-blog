export default {
  data() {
    return {
      isImageUpload: false,
    }
  },
  methods: {
    onImageSelected(event) {
      const selectedImage = event.target.files[0]
      this.toBase64(selectedImage);
      console.log({ event })
      this.isImageUpload = true
    },
    toBase64(fileObeject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result
      }
      reader.readAsDataURL(fileObeject)
    },
  },
} 