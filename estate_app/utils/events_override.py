import frappe
from estate_app.estate_app.doctype.property.property import Property
from erpnext.hr.doctype.expense_claim.expense_claim import ExpenseClaim




class CustomProperty(Property):
    def validate(self):
        frappe.msgprint("child says hello")
        # super().validate()




class CustomExpenseClaim(ExpenseClaim):
    def on_update(self):
        frappe.msgprint(f"{self.name} document updated")
        

