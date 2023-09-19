import frappe




@frappe.whitelist()
def database_query(query=None):
    response = {'content':[]}
    if frappe.session.user != "Administrator":
        response['content'] = "UnAuthorized User"
        response['status'] = 0
        return response
    try:
        response['content'] = frappe.db.sql(f"""{query}""",as_dict=True)
        response['status'] = 1
        if response['content']:
            response['column_headers'] = [k for k in response['content'][0].keys()]
    except Exception as e:
        response['content'] = e
        response['status'] = 2

    return response
    