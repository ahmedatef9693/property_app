import frappe    
from estate_app.utils.utils import paginate

def get_context(context):

    proptype , status , city = frappe.form_dict.type , frappe.form_dict.status , frappe.form_dict.city  
    pagination  = paginate('Property',frappe.form_dict.page, 4,proptype , status , city)
    if pagination.get('properties'):
        context.properties = pagination.get('properties')
    else:
        frappe.msgprint("properties doesnt exist")
    
    context.next = pagination.get('next')
    context.prev = pagination.get('prev')
    context.series_count = pagination.get('series_count')
    context.cities = frappe.db.sql(f"""
                    select name from `tabCity`
                    """,as_dict=True)
    context.types = frappe.db.sql(f"""
                    select name from `tabProperty Type`
                    """,as_dict=True)
    context.status = frappe.db.sql(f"""
                    select Distinct status from `tabProperty`
                    """,as_dict=True)

    context.search = pagination.get('search')
    if context.search:
        context.proptype = frappe.form_dict.type
        context.propstatus = frappe.form_dict.status 
        context.propcity = frappe.form_dict.city
 

    

    return context




