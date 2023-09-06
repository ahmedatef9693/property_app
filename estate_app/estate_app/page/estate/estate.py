
import frappe





@frappe.whitelist()
def get_total_price():
    return frappe.db.sql(""" select sum(grand_total) as total from `tabProperty`;""",as_dict=True)[0].total