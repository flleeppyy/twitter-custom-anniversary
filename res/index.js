/* eslint-disable security/detect-unsafe-regex */
document.querySelector("#title").addEventListener("input", function () {
  document.querySelector("#tptitle").innerHTML = this.value;
  generate();
});

document.querySelector("#text").addEventListener("input", function () {
  document.querySelector("#tpdescription").innerHTML = this.value;
  generate();
});

document.querySelector("#action").addEventListener("input", function () {
  document.querySelector("#tpaction").innerHTML = this.value;
  generate();
});

const blobCache = {};

// On image update
document
  .querySelector("#image_attachment")
  .addEventListener("change", function () {
    if (blobCache[this.value]) {
      setPreviewImage(blobCache[this.value]);
      return;
    }
    // make sure the pattern matches before we fetch
    if (
      /^https:\/\/(?:[\w-]+.){0,1}(?:twitter\.com|x\.com|twimg\.com|t.co)/gi.test(
        this.value,
      )
    ) {
      document.querySelector("#tpimage").style.backgroundImage = "";
      fetch(this.value)
        .then((response) => response.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          blobCache[this.value] = objectURL;
          setPreviewImage(objectURL);
          return;
        })
        .catch((error) => {
          console.error(error);
        });
      generate();
    }
  });

function setPreviewImage(url) {
  document.querySelector("#tpimage").style.backgroundImage =
    "url('" + url + "')";
}

function getValues() {
  return {
    title:
      document.querySelector("#title").value ||
      document.querySelector("#title").placeholder,
    message:
      document.querySelector("#message").value ||
      document.querySelector("#message").placeholder,
    action:
      document.querySelector("#action").value ||
      document.querySelector("#action").placeholder,
    text:
      document.querySelector("#text").value ||
      document.querySelector("#text").placeholder,
    image_attachment:
      document.querySelector("#image_attachment").value ||
      document.querySelector("#image_attachment").placeholder,
  };
}

function generate() {
  const values = getValues();
  const queryParams = new URLSearchParams();
  queryParams.append("title", values.title);
  queryParams.append("message", values.message);
  queryParams.append("action", values.action);
  queryParams.append("text", values.text);
  queryParams.append("image_attachment", values.image_attachment);

  document.querySelector(
    "#result",
  ).value = `https://twitter.com/i/notifications/anniversary?${queryParams.toString()}`;
}

function updatePreview() {
  const values = getValues();
  document.querySelector("#tptitle").innerHTML = values.title;
  document.querySelector("#tpdescription").innerHTML = values.message;
  document.querySelector("#tpaction").innerHTML = values.action;
  document.querySelector("#tpimage").style.backgroundImage =
    values.image_attachment;
}

updatePreview();
generate();

const maxYears = 15;
const others = [
  [
    "girls are pretty",
    "https://pbs.twimg.com/media/FORwYYIX0AINflp?format=jpg&name=medium",
  ],
];
for (let i = 1; i <= maxYears; i++) {
  const option = document.createElement("option");
  option.value = `https://ton.twimg.com/ntab_public/twitterversary/year${i}.jpg`;
  option.text = `Year ${i}`;
  document.querySelector("#predefined_image").append(option);
}

for (const other of others) {
  const option = document.createElement("option");
  option.value = other[1];
  option.text = other[0];
  document.querySelector("#predefined_image").append(option);
}

document
  .querySelector("#predefined_image")
  .addEventListener("change", function () {
    document.querySelector("#image_attachment").value = this.value;
    document.querySelector("#image_attachment").onchange();
    // document.getElementById("tpimage").src = this.value;
  });
