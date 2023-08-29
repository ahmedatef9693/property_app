import frappe
from estate_app.utils.utils import send_mail
import json



@frappe.whitelist()
def get_contact(args = None):
    args = json.loads(args)
    doc = frappe.get_doc('Property',args.get('property_code'))
    msg = f"From : {args.get('name')} <br> Email : {args.get('email')} <br> {args.get('message')}"
    attachments = [frappe.attach_print(doc.doctype,doc.name,file_name=doc.name),]
    send_mail(doc=doc,recipients=[args.get('agent_email')],msg=msg,title="Property Enquiry",attachments=attachments)
    return "Email Has Been Sent Successfully"
