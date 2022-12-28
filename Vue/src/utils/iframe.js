export default class Iframe {
  constructor() {
    window.addEventListener("message", (e) => {
      const data = e.data;
      this.response = null;
      if (data.action) {
        switch (data.action) {
          case "interaction":
            this.response = data.interaction;
            break;
        }
      }
    });
  }
  async getInteraction() {
    window.parent.postMessage({ action: "getInteraction" }, "*");
    this.response = null;
    return new Promise((resolve, reject) => {
      let i = 0;
      let interval = setInterval(() => {
        if (this.response) {
          clearInterval(interval);
          resolve(this.response);
        }
        if (i > 50) {
          clearInterval(interval);
          reject({ error: "timeout" });
        }
        i++;
      }, 100);
    });
  }
  close() {
    window.parent.postMessage({ action: "close" }, "*");
  }
}
