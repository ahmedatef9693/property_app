import frappe
# from console import console

@frappe.whitelist()
def check_property_type(property_type = None):
    return frappe.db.sql(f"""
    select name,property_type from `tabProperty` where property_type = '{property_type}';
    """,as_dict=1)    





