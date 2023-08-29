document.querySelector("#contact-agent").addEventListener("click", (event) => {
  let agent_email = document.querySelector("#email").value;
  let property_code = document.querySelector("#property-name").textContent;
  // frappe.msgprint("hello world");
  let d = new frappe.ui.Dialog({
    title: "Enter details",
    fields: [
      {
        label: "Your Name",
        fieldname: "name",
        fieldtype: "Data",
      },
      {
        label: "Email",
        fieldname: "email",
        fieldtype: "Data",
      },
      {
        label: "Message",
        fieldname: "message",
        fieldtype: "Small Text",
      },
    ],
    size: "small", // small, large, extra-large
    primary_action_label: "Submit",
    primary_action(values) {
      console.log(values);
      values.property_code = property_code;
      values.agent_email = agent_email;
      frappe.call({
        method: "estate_app.api.get_contact",
        args: {
          args: values,
        },
        callback: function (r) {
          frappe.msgprint({
            title: __("Notification"),
            indicator: "green",
            message: r.message,
          });
        },
      });

      d.hide();
    },
  });

  d.show();
});
