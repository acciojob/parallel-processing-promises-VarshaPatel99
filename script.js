const imageUrls = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/200",
  "https://via.placeholder.com/250"
];

const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject("Failed to load image: " + url);

    img.src = url;
  });
}

function downloadImages() {
  loadingDiv.style.display = "block";
  errorDiv.innerText = "";
  output.innerHTML = "";

  Promise.all(imageUrls.map(downloadImage))
    .then((images) => {
      loadingDiv.style.display = "none";
      images.forEach(img => output.appendChild(img));
    })
    .catch((err) => {
      loadingDiv.style.display = "none";
      errorDiv.innerText = err;
    });
}

downloadImages();