
import frappe





@frappe.whitelist()
def get_total_price():
    return frappe.db.sql("""
            select 
                sum(grand_total) as total 
                from `tabProperty`;
            """,as_dict=True)[0].total



@frappe.whitelist()
def get_total_for_status():
    return frappe.db.sql("""
            select 
                status,
                sum(grand_total) as status_total 
                from `tabProperty` 
                group by 
                    status 
                order by 
                    status ASC;
            """,as_dict=True)