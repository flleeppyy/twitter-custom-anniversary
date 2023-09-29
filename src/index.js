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

// On image update
document.getElementById("image_attachment").onchange = function() {
  console.log(this.value)
  // make sure the pattern matches before we fetch
  if (new RegExp(/^https:\/\/(?:[\w-]+.){0,1}(?:twitter\.com|x\.com|twimg\.com|t.co)/ig).test(this.value)) {
    console.log("meowmeow");
    document.getElementById("tpimage").style.backgroundImage = "";
    fetch(this.value)
    .then(response => response.blob())
    .then(blob => {
      const objectURL = URL.createObjectURL(blob);
      console.log(objectURL);
      document.getElementById("tpimage").style.backgroundImage = "url('" + objectURL + "')";
    });
    generate();
  }
};

function generate() {
  const queryParams = new URLSearchParams();
  queryParams.append("title", document.getElementById("title").value);
  queryParams.append("message", document.getElementById("message").value);
  queryParams.append("action", document.getElementById("action").value);
  queryParams.append("text", document.getElementById("text").value);
  queryParams.append("image_attachment", document.getElementById("image_attachment").value);

  document.getElementById("result").value =
   `https://twitter.com/i/notifications/anniversary?${queryParams.toString()}`;
}

function updatePreview() {
  document.getElementById("tptitle").innerHTML = document.getElementById("title").value || document.getElementById("title").placeholder;
  document.getElementById("tpdescription").innerHTML = document.getElementById("text").value || document.getElementById("text").placeholder;
  document.getElementById("tpaction").innerHTML = document.getElementById("action").value || document.getElementById("action").placeholder;
  document.getElementById("tpimage").style.backgroundImage = document.getElementById("image_attachment").value || document.getElementById("image_attachment").placeholder;
}

function setPlaceholdersAsValues() {
  document.getElementById("title").value = document.getElementById("tptitle").placeholder;
  document.getElementById("text").value = document.getElementById("tpdescription").placeholder;
  document.getElementById("action").value = document.getElementById("tpaction").placeholder;
  document.getElementById("tpimage").style.backgroundImage = document.getElementById("image_attachment").placeholder;
}

updatePreview();