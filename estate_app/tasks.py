import frappe
import string
import random


def cron():
    print("hello")
    letters = string.ascii_letters
    random_str = " ".join([random.choice(letters) for i in range(20)])
    print(random_str)
    frappe.get_doc({
        'doctype':"Note",
        'title':random_str
    }).insert()
    frappe.db.commit()

