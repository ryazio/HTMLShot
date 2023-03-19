const html2canvasLib = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';

const getScript = url => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;

  script.onerror = reject;

  script.onload = script.onreadystatechange = () => {
    const loadState = this.readyState;

    if (loadState && loadState !== 'loaded' && loadState !== 'complete') return

    script.onload = script.onreadystatechange = null;

    resolve();
  }

  document.head.appendChild(script);
});

const HTMLShot = (selector, filename = 'htmlshot-') => {
  if (filename === 'htmlshot-') {
    const currentDate = new Date();
    filename += `${currentDate.getMonth()}-${currentDate.getDate()}`;
    filename += `-${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;
  }
  getScript(html2canvasLib)
    .then(() => {
      html2canvas(document.querySelector(selector)).then(screenshot => {
        let downloadLink = document.createElement("a");
        downloadLink.setAttribute("download", `${filename}.png`);

        screenshot.toBlob(function (blob) {
          let url = URL.createObjectURL(blob);
          downloadLink.setAttribute("href", url);
          downloadLink.click();
        });
      });
    })
    .catch(() => {
      console.error('Could not load script')
    })
}
