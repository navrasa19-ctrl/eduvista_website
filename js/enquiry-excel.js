/**
 * EduVista International - Automatic Direct Excel & Google Sheet Enquiry Submission Handler
 */

// OPTIONAL: If you use SheetDB, Formspree, or Google Apps Script Webhook URL, paste your URL here:
// Example: const GOOGLE_SHEET_WEBHOOK_URL = "https://sheetdb.io/api/v1/YOUR_API_ID";
const GOOGLE_SHEET_WEBHOOK_URL = ""; 

document.addEventListener("DOMContentLoaded", function () {
  const enquiryForm = document.getElementById("enquiryForm");
  const enquiryAlert = document.getElementById("enquiryAlert");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("enqName").value.trim();
      const email = document.getElementById("enqEmail").value.trim();
      const phone = document.getElementById("enqPhone").value.trim();
      const country = document.getElementById("enqCountry").value;
      const message = document.getElementById("enqMessage").value.trim();
      const timestamp = new Date().toLocaleString();

      const enquiryData = {
        timestamp: timestamp,
        name: name,
        email: email,
        phone: phone,
        country: country,
        message: message
      };

      // 1. Save data locally (Ensures no submission is ever lost)
      let existingEnquiries = JSON.parse(localStorage.getItem("eduvista_enquiries") || "[]");
      existingEnquiries.push(enquiryData);
      localStorage.setItem("eduvista_enquiries", JSON.stringify(existingEnquiries));

      // 2. If Webhook/Google Sheet URL is configured, post directly to Excel / Google Sheet
      if (GOOGLE_SHEET_WEBHOOK_URL !== "") {
        fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(enquiryData)
        })
        .then(response => response.json())
        .then(data => console.log("Directly sent to Excel/Google Sheet:", data))
        .catch(error => console.error("Webhook Error:", error));
      }

      // 3. Show success alert to user
      if (enquiryAlert) {
        enquiryAlert.classList.remove("d-none");
        setTimeout(function () {
          enquiryAlert.classList.add("d-none");
        }, 5000);
      }

      enquiryForm.reset();
    });
  }
});
