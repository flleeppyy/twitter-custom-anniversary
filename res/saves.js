function resetSaves() {
  const saves = [];
  saves.push({
    name: "Default",
    data: {
      title: document.getElementById("title").placeholder,
      message: document.getElementById("message").placeholder,
      text: document.getElementById("text").placeholder,
      action: document.getElementById("action").placeholder,
      image_attachment: document.getElementById("image_attachment").placeholder,
    }
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
  saves.forEach((save, index) => {
    if (save.name === name) {
      saves.splice(index, 1);
    }
  });

  saves.push({
    name: name,
    data: {
      title: document.getElementById("title").value,
      message: document.getElementById("message").value,
      text: document.getElementById("text").value,
      action: document.getElementById("action").value,
      image_attachment: document.getElementById("image_attachment").value,
    }
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

  saves = saves.filter(e => e.name === name);
  let save;
  if (save.length > 1) {
    console.warn("Multiple saves with the same name. Choosing first one.");
    // remove all but the first one
    save = save.slice(1);

  } 
  if (save.length === 0) {
    return null;
  }

  const data = save[0].data;
  document.getElementById("title").value = data.title;
  document.getElementById("message").value = data.message;
  document.getElementById("text").value = data.text;
  document.getElementById("action").value = data.action;
  document.getElementById("image_attachment").value = data.image_attachment;
  updatePreview();
}