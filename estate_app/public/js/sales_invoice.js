frappe.ui.form.on("Sales Invoice", {
  refresh(frm) {
    frm.add_custom_button(__("Test Logs"), function () {
      frappe.call({
        method: "estate_app.public.py.sales_invoice.test_func",
        callback: function (r) {
          if (!r.exc) {
            console.log("done");
          }
        },
      });
    });
  },
});
