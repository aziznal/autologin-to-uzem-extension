
let checkbox = document.getElementById("setActiveCheckbox");


function setCheckboxStatusOnPopupActivated() {

    chrome.storage.sync.get("extensionIsActive", async ({ extensionIsActive }) => {

        checkbox.checked = extensionIsActive === undefined ? false : extensionIsActive;

    })

}

setCheckboxStatusOnPopupActivated();


function onCheckboxToggle() {

    let extensionIsActive = checkbox.checked;

    chrome.storage.sync.set({ extensionIsActive }, () => {
        console.log("Set extensionIsActive to " + extensionIsActive);
    });

}

checkbox.addEventListener("change", onCheckboxToggle);
