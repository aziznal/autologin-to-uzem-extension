let extensionIsActive = false;


// Set this value when the background service first starts
try {
  chrome.storage.sync.get("extensionIsActive", (data) => {
    extensionIsActive = data.extensionIsActive;
  })
} catch (e) {
  chrome.storage.sync.set({ extensionIsActive })
}

// To update extensionIsActive whenever it changes
chrome.storage.onChanged.addListener( (changes, namespace) => {
  extensionIsActive = changes["extensionIsActive"]["newValue"];
})


const executeScriptInActiveTab = async (callback) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab.url)
  callback(tab);
}


console.log("Background Service Worker is running!")




const attemptLogin = (tab) => {

  setTimeout(() => executeScriptInActiveTab(activeTab => {
    if ( extensionIsActive && activeTab.url.includes("karatay.almscloud.com")) {

      chrome.scripting.executeScript(
        {

          target: { tabId: activeTab.id },

          function: () => {

            let usernameField = document.getElementById("UserName");
            if (usernameField === null || usernameField.type === "hidden") return;
            usernameField.value = "your_student_number_here";

            let firstLoginButton = document.getElementById("btnLoginName");
            firstLoginButton.click();

          }

        }
      )

    } else {
      console.log("Nope.")
    }
  }), 750);


}

const attemptToEnterUsePassword = (tab) => {

  setTimeout(() => {

    executeScriptInActiveTab((activeTab) => {

      if (activeTab.url.includes("karatay.almscloud.com")) {

        console.log("You are on the UZEM site!");

        chrome.scripting.executeScript(
          {

            target: { tabId: activeTab.id },

            function: () => {

              let passwordField = document.getElementById("Password");
              if (passwordField === null || passwordField.type === "hidden") return;
              passwordField.value = "your_real_password_here";

              let secondLoginButton = document.getElementById("btnLoginPass");
              secondLoginButton.click();

            }

          }
        )

      } else {
        console.log("Nope.")
      }

    }, 750)


  }

  )
}

chrome.tabs.onActivated.addListener(attemptLogin);
chrome.tabs.onCreated.addListener(attemptLogin);
chrome.tabs.onUpdated.addListener(attemptLogin);

chrome.tabs.onUpdated.addListener(attemptToEnterUsePassword);
