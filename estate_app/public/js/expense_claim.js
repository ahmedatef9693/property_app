// frappe.ui.form.on('Expense Claim', {
// 	refresh(frm) {
// 		console.log("hello js");
// 	}
// })

frappe.ui.form.on("Expense Claim Detail", {
  expenses_add: function (frm, cdt, cdn) {
    let row = frappe.get_doc(cdt, cdn);
    row.expense_date = frm.doc.posting_date;
    frm.refresh_field("expenses");
  },
});
