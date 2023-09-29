function resetSaves() {
  const saves = [];
  saves.push({
    name: "Default",
    data: {
      title: document.querySelector("#title").placeholder,
      message: document.querySelector("#message").placeholder,
      text: document.querySelector("#text").placeholder,
      action: document.querySelector("#action").placeholder,
      image_attachment: document.querySelector("#image_attachment").placeholder,
    },
  });

  localStorage.setItem("saves", saves);
}

if (!localStorage.getItem("saves")) {
  resetSaves();
}

function saveSave(name) {
  if (!name || name instanceof String) {
    throw new Error("No name provided or incorrect type");
  }

  /**
   * @type {Array<{name: string, data: {title: string, message: string, text: string, action: string, image_attachment: string}}>}
   */
  const saves = localStorage.getItem("saves");

  if (!saves) {
    resetSaves();
  }

  // If there are any duplicates, delete them
  for (const [index, save] of saves.entries()) {
    if (save.name === name) {
      saves.splice(index, 1);
    }
  }

  saves.push({
    name: name,
    data: {
      title: document.querySelector("#title").value,
      message: document.querySelector("#message").value,
      text: document.querySelector("#text").value,
      action: document.querySelector("#action").value,
      image_attachment: document.querySelector("#image_attachment").value,
    },
  });
}

function loadSave(name) {
  if (!name || name instanceof String) {
    throw new Error("No name provided or incorrect type");
  }
  /**
   * @type {Array<{name: string, data: {title: string, message: string, text: string, action: string, image_attachment: string}}>}
   */
  let saves = localStorage.getItem("saves");

  if (!saves) {
    resetSaves();
  }

  saves = saves.filter((e) => e.name === name);
  let save;
  if (save.length > 1) {
    console.warn("Multiple saves with the same name. Choosing first one.");
    // remove all but the first one
    save = save.slice(1);
  }
  if (save.length === 0) {
    return;
  }

  const data = save[0].data;
  document.querySelector("#title").value = data.title;
  document.querySelector("#message").value = data.message;
  document.querySelector("#text").value = data.text;
  document.querySelector("#action").value = data.action;
  document.querySelector("#image_attachment").value = data.image_attachment;
  // eslint-disable-next-line no-undef
  updatePreview();
}
