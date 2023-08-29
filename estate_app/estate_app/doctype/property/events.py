import frappe
from frappe.utils.background_jobs import enqueue
from estate_app.utils.utils import send_mail


def validate(doc,event):
    pass
    # try:
    #     x = 5
    #     y = 0

    #     z = x/y

    



    # except Exception as e:
    #     error = frappe.log_error(frappe.get_traceback(),f"{e}")
    #     frappe.msgprint(f"an error has occured <a href='/desk/error-log/{error.name}'><strong>error link</strong></a>")


def on_update(doc,event):
    pass



def after_insert(doc,event):
    try:
        newNote = frappe.new_doc('Note')
        newNote.title = doc.name
        newNote.public = True
        newNote.content = doc.description
        newNote.insert()
        frappe.db.commit()
        
        frappe.msgprint(f'Note <strong>{newNote.title} has been created</strong>')
        
        agent_document = frappe.get_doc('Agent',doc.agent)
        agent_email = agent_document.email
        print(f'\n\n\n\n\n {agent_email} \n\n\n\n')
        msg = f"Hello <b>{doc.agent_name} , a property has been created on your behalf.</b>"
        attachments = [frappe.attach_print(doc.doctype,doc.name,file_name=doc.name)]
        #send mail

        send_mail(doc,[agent_email],msg,'New Property',attachments)
    except Exception as e:
        frappe.log_error(frappe.get_traceback(),f"{e}")









# def after_save(doc,event):
#     print(f"\n\n\n\n\n\n\nhello\n\n\n\n\n\n\n")
#     frappe.msgprint("after save is here")








    



