<!-- This is currently just for testing purpose. This code tries to show a webcam stream on the
monitor. Currently (3.7.22) it does not work-->

<template>
  <div class="camera-box">
    <div style="display: flex; justify-content: center">
      <img
        style="height: 25px"
        v-if="isCameraOpen"
        src="../../assets/pictures/webcam/camOpen.png"
        class="button-img camera-shoot"
        @click="capture"
      />
      <div class="camera-button">
        <button
          type="button"
          class="button is-rounded cam-button"
          style="margin-left: 40%; background-color: white; border: 0px"
          @click="toggleCamera"
        >
          <span v-if="!isCameraOpen"
            ><img
              style="height: 25px"
              class="button-img"
              src="../../assets/pictures/webcam/camOpen.png"
          /></span>
          <span v-else
            ><img
              style="height: 25px"
              class="button-img"
              src="../../assets/pictures/webcam/cancel.png"
          /></span>
        </button>
      </div>
    </div>
    <div style="height: 200px">
      <div v-if="isCameraOpen" class="camera-canvas">
        <video
          ref="camera"
          :width="canvasWidth"
          :height="canvasHeight"
          autoplay
        ></video>
        <canvas
          v-show="false"
          id="photoTaken"
          ref="canvas"
          :width="canvasWidth"
          :height="canvasHeight"
        ></canvas>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Camera",
  components: {},
  data() {
    return {
      isCameraOpen: false,
      canvasHeight: 200,
      canvasWidth: 190,
      items: [],
    };
  },
  methods: {
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.startCameraStream();
      }
    },
    startCameraStream() {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 1280, height: 720 } })
        .then((stream) => {
          this.$refs.camera[0].srcObject = stream;
        })
        .catch((error) => {
          alert(`Browser doesn't support or there is some errors. ${error}`);
        });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera[0].srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    },

    capture() {
      const FLASH_TIMEOUT = 50;
      let self = this;
      setTimeout(() => {
        const context = self.$refs.canvas.getContext("2d");
        context.drawImage(
          self.$refs.camera,
          0,
          0,
          self.canvasWidth,
          self.canvasHeight
        );
        const dataUrl = self.$refs.canvas
          .toDataURL("image/jpeg")
          .replace("image/jpeg", "image/octet-stream");
        self.addToPhotoGallery(dataUrl);
        self.uploadPhoto(dataUrl);
        self.isCameraOpen = false;
        self.stopCameraStream();
      }, FLASH_TIMEOUT);
    },

    addToPhotoGallery(dataURI) {
      this.items.push({
        src: dataURI,
        thumbnail: dataURI,
        w: this.canvasWidth,
        h: this.canvasHeight,
        alt: "some numbers on a grey background", // optional alt attribute for thumbnail image
      });
    },
    uploadPhoto(dataURL) {
      let uniquePictureName = this.generateCapturePhotoName();
      let capturedPhotoFile = this.dataURLtoFile(
        dataURL,
        `${uniquePictureName} + .jpg`
      );
      let formData = new FormData();
      formData.append("file", capturedPhotoFile);
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },

    generateCapturePhotoName() {
      return Math.random().toString(36).substring(2, 15);
    },

    dataURLtoFile(dataURL, filename) {
      let arr = dataURL.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  },
};
</script>

<style scoped>
    .camera-box {
        border: 1px dashed #d6d6d6;
        border-radius: 4px;
        padding: 2px;
        width: 80%;
        min-height: 300px;
    }

</style>