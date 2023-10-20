import frappe
import logging

import os


@frappe.whitelist()
def test_func():
    # print(os.getcwd())
    
    logging.basicConfig(filename='/home/ahmed/Desktop/frappe-bench/sites/new_app.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    # open in write mode clears file content
    open('/home/ahmed/Desktop/frappe-bench/sites/new_app.log', 'w').close()
    # logging.debug('This is a debug message')
    # logging.info('This is an info message')
    # logging.warning('This is a warning message')
    # logging.error('This is an error message')
    # logging.critical('This is a critical message')
    large_dict = {
        "name" : "ahmed",
        "id" : 222,
        "age" : "88"
    }    
    logging.debug(f'\n{large_dict}\n')
    


