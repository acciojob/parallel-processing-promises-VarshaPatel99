const imageUrls = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/200",
  "https://via.placeholder.com/250"
];

const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");

// function to load a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject("Failed to load image: " + url);

    img.src = url;
  });
}

function downloadImages() {
  // show loading spinner
  loadingDiv.style.display = "block";
  errorDiv.innerText = "";
  output.innerHTML = "";

  const promises = imageUrls.map((url) => downloadImage(url));

  Promise.all(promises)
    .then((images) => {
      loadingDiv.style.display = "none";

      images.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      loadingDiv.style.display = "none";
      errorDiv.innerText = err;
    });
}

// call function
downloadImages();