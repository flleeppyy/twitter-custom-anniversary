document.getElementById("title").oninput = function() {
  document.getElementById("tptitle").innerHTML = this.value;
  generate();
};

document.getElementById("text").oninput = function() {
  document.getElementById("tpdescription").innerHTML = this.value;
  generate();
};


document.getElementById("action").oninput = function() {
  document.getElementById("tpaction").innerHTML = this.value;
  generate();
};

const blobCache = {};

// On image update
document.getElementById("image_attachment").onchange = function() {
  if (blobCache[this.value]) {
    setPreviewImage(blobCache[this.value]);
    return;
  }
  // make sure the pattern matches before we fetch
  if (new RegExp(/^https:\/\/(?:[\w-]+.){0,1}(?:twitter\.com|x\.com|twimg\.com|t.co)/ig).test(this.value)) {
    document.getElementById("tpimage").style.backgroundImage = "";
    fetch(this.value)
    .then(response => response.blob())
    .then(blob => {
      const objectURL = URL.createObjectURL(blob);
      blobCache[this.value] = objectURL;
      setPreviewImage(objectURL);
    });
    generate();
  }
};

function setPreviewImage(url) {
  document.getElementById("tpimage").style.backgroundImage = "url('" + url + "')";
}

function getValues() {
  return {
    title: document.getElementById("title").value || document.getElementById("title").placeholder,
    message: document.getElementById("message").value || document.getElementById("message").placeholder,
    action: document.getElementById("action").value || document.getElementById("action").placeholder,
    text: document.getElementById("text").value || document.getElementById("text").placeholder,
    image_attachment: document.getElementById("image_attachment").value || document.getElementById("image_attachment").placeholder,
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

  document.getElementById("result").value =
   `https://twitter.com/i/notifications/anniversary?${queryParams.toString()}`;
}

function updatePreview() {
  const values = getValues();
  document.getElementById("tptitle").innerHTML = values.title;
  document.getElementById("tpdescription").innerHTML = values.message;
  document.getElementById("tpaction").innerHTML = values.action;
  document.getElementById("tpimage").style.backgroundImage = values.image_attachment;
}

updatePreview();
generate();

const maxYears = 15;
const others = [
  ["girls are pretty", "https://pbs.twimg.com/media/FORwYYIX0AINflp?format=jpg&name=medium"],
]
for (let i = 1; i <= maxYears; i++) {
  const option = document.createElement("option");
  option.value = `https://ton.twimg.com/ntab_public/twitterversary/year${i}.jpg`;
  option.text = `Year ${i}`;
  document.getElementById("predefined_image").appendChild(option);
}

for (let i = 0; i < others.length; i++) {
  const option = document.createElement("option");
  option.value = others[i][1];
  option.text = others[i][0];
  document.getElementById("predefined_image").appendChild(option);
}

document.getElementById("predefined_image").addEventListener("change", function() {
  document.getElementById("image_attachment").value = this.value;
  document.getElementById("image_attachment").onchange();
  // document.getElementById("tpimage").src = this.value;
});