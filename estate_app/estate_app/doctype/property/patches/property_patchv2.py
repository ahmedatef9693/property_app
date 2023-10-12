import frappe




def execute():
    properties = frappe.db.get_all('Property',fields = ['name',"city"])
    for prop in properties:
        if prop.city == "Bushfort":
            frappe.db.set_value("Property",prop.name,"is_sold","1",update_modified=False)


