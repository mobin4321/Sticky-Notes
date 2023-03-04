const addBtn = document.querySelector("#btn");
const cont = document.querySelector("#cont");

// storing data
const updateLocalStorageData = () => {
  const textArea = document.querySelectorAll("textarea");
  const notes = [];
  textArea.forEach((note) => {
    notes.push(note.value);
  });
  console.log(JSON.stringify(notes));
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNote = (text = "") => {
  const note = document.createElement("div");

  note.classList.add("note");
  const htmlData = ` <textarea  name="" id="" cols="30" rows="10"></textarea>
        <div class="aftercontainer">
          <div class="after edit">
            <img src="edit.png" alt="" />
          </div>
          <div class="after delete"><img src="bin.png" alt="" /></div>
        </div>`;
  note.insertAdjacentHTML("afterbegin", htmlData);
  cont.insertAdjacentElement("beforeend", note);

  //   deleting
  const del = note.querySelector(".delete");
  del.addEventListener("click", () => {
    note.remove();
    updateLocalStorageData();
  });

  //   edit
  const edit = note.querySelector(".edit");
  const textarea = note.querySelector("textarea");
  textarea.value = text;
  edit.addEventListener("click", () => {
    if (textarea.readOnly === true) {
      textarea.readOnly = false;
    } else {
      textarea.readOnly = true;
    }
  });
  textarea.addEventListener("change", () => {
    updateLocalStorageData();
  });
};
addBtn.addEventListener("click", () => {
  addNote();
});
// accessing local data
const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((element) => addNote(element));
}
