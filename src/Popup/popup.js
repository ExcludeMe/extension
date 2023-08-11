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
