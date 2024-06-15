// Functions

async function addSpec(title, id) {
  let spec = document.createElement("div");
  spec.classList.add("spec-item");
  let header = document.createElement("div");
  header.classList.add("spec-item-title");
  header.innerText = title;
  let checkbox = document.createElement("div");
  checkbox.classList.add("spec-item-checkbox-box");
  checkbox.innerHTML =
    "<div class='checkbox-wrapper-8'><input type='checkbox' id=`exme-${id}` class='tgl tgl-skewed'/><label for=`exme-${id}` data-tg-on='Yes' data-tg-off='No' class='tgl-btn'></label></div>";
  checkbox.addEventListener("click", (ev) => {
    let obj = JSON.parse(localStorage.getItem("excludeme"));
    obj[`exme-${id}`] = document.getElementById(`exme-${id}`).checked;
    localStorage.setItem("excludeme", JSON.stringify(obj));
  });
  spec.appendChild(header);
  spec.appendChild(checkbox);
  document.getElementById("spec-list").appendChild(spec);
}

window.onload = async () => {
  let packs = localStorage.getItem("excludeMe");
  if (packs === null) {
    return localStorage.setItem("excludeMe", JSON.stringify({}));
  }

  packs = JSON.parse(packs);
  if (!packs) return;

  packs = packs.packs;

  if (!packs) return;

  for (let i = 0; i < packs.length; i++) {
    await fetch("https://leontm.me/api/projects/excludeMe/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.processable) {
          addSpec(data.data.title, data.data._id);
        }
      });
  }
  document.getElementById("loader").style.display = "none";
};
