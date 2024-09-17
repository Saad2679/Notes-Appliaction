const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

addBtn.addEventListener("click", addNote);

function addNote() {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tool">
            <i class="save fas fa-save"></i>
            <i class="trash fas fa-trash-alt"></i>
        </div>
        <textarea placeholder="Type your note here..."></textarea>
    `;

    const save = note.querySelector(".save");
    const trash = note.querySelector(".trash");
    const textarea = note.querySelector("textarea");

    save.addEventListener("click", saveNote);
    textarea.addEventListener("input", saveNote);
    trash.addEventListener("click", () => {
        note.remove();
        saveNote();
    });

    main.appendChild(note);
    textarea.focus();

    function saveNote() {
        const notes = Array.from(document.querySelectorAll(".note textarea")).map(note => note.value);
        if (notes.length === 0) {
            localStorage.removeItem("notes");
        } else {
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    }
}

function loadNotes() {
    const lsnotes = JSON.parse(localStorage.getItem("notes"));
    if (lsnotes !== null) {
        lsnotes.forEach(noteText => {
            addNote();
            const notes = document.querySelectorAll(".note textarea");
            const lastNote = notes[notes.length - 1];
            lastNote.value = noteText;
        });
    }
}

loadNotes();
