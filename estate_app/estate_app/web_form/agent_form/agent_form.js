frappe.ready(function () {
  document.querySelector(
    ".page-header"
  ).innerHTML = `<h1 class='text-danger'>Agent New Form</h1>`;
  frappe.web_form.after_load = () => {
    // validation on change of email address
    frappe.web_form.on("email", (field, value) => {
      if (value) {
        var email_value = String(value);
        if (email_value.indexOf("@") === email_value.lastIndexOf("@")) {
          if (email_value.indexOf("@") !== -1) {
          } else {
            frappe.throw(__("Invalid Email Address"));
          }
        } else {
          frappe.throw(__("Invalid Email Address"));
        }
      }
    });
    frappe.web_form.validate = () => {
      let data = frappe.web_form.get_values();
      console.log(data);
      var email_value = String(data.email);
      if (email_value.indexOf("@") === email_value.lastIndexOf("@")) {
        if (email_value.indexOf("@") !== -1) {
          return true;
        } else if (email_value.indexOf("@") === -1) {
          frappe.throw(__("Invalid Email Address"));
          return false;
        }
      } else {
        frappe.throw(__("Invalid Email Address"));
        return false;
      }
    };
    // validation on save
  };
});
