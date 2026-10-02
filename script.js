const checks = document.querySelectorAll(".check");

const good = document.getElementById("good");
const improve = document.getElementById("improve");
const mission = document.getElementById("mission");

const score = document.getElementById("score");
const dateElement = document.getElementById("date");


/* --------------------------------
   DAILY RESET
-------------------------------- */

const today = new Date().toDateString();

const savedDate = localStorage.getItem("checklistDate");


if (savedDate !== today) {

    localStorage.removeItem("checklist");

    localStorage.removeItem("good");

    localStorage.removeItem("improve");

    localStorage.removeItem("mission");

    localStorage.setItem("checklistDate", today);
}


/* --------------------------------
   SHOW DATE
-------------------------------- */

const currentDate = new Date();

dateElement.textContent =
    currentDate.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );


/* --------------------------------
   LOAD CHECKBOXES
-------------------------------- */

let savedChecks =
    JSON.parse(
        localStorage.getItem("checklist")
    ) || [];


checks.forEach((checkbox, index) => {

    checkbox.checked =
        savedChecks[index] || false;

    checkbox.addEventListener(
        "change",
        saveData
    );

});


/* --------------------------------
   LOAD TEXT
-------------------------------- */

good.value =
    localStorage.getItem("good") || "";

improve.value =
    localStorage.getItem("improve") || "";

mission.value =
    localStorage.getItem("mission") || "";


/* --------------------------------
   SAVE EVERYTHING
-------------------------------- */

function saveData() {

    const checked =
        Array.from(checks).map(
            checkbox => checkbox.checked
        );

    localStorage.setItem(
        "checklist",
        JSON.stringify(checked)
    );

    localStorage.setItem(
        "good",
        good.value
    );

    localStorage.setItem(
        "improve",
        improve.value
    );

    localStorage.setItem(
        "mission",
        mission.value
    );

    updateScore();
}


/* --------------------------------
   TEXT SAVE
-------------------------------- */

good.addEventListener(
    "input",
    saveData
);

improve.addEventListener(
    "input",
    saveData
);

mission.addEventListener(
    "input",
    saveData
);


/* --------------------------------
   SCORE
-------------------------------- */

function updateScore() {

    let completed = 0;

    checks.forEach(
        checkbox => {

            if (checkbox.checked) {
                completed++;
            }

        }
    );

    score.textContent = completed;
}


updateScore();


/* --------------------------------
   CHECK EVERY MINUTE
   FOR DATE CHANGE
-------------------------------- */

setInterval(() => {

    const newDate =
        new Date().toDateString();

    if (newDate !==
        localStorage.getItem("checklistDate")) {

        location.reload();

    }

}, 60000);