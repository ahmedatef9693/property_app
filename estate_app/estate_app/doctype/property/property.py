# Copyright (c) 2023, ahmed atef and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Property(Document):
    pass
    
    # def after_save(self):
    #     frappe.msgprint("after_save")
    # def after_insert(self):
    #     frappe.msgprint("after_insert")
	
	# pass
		# def validate(doc):
		# 	frappe.msgprint("original class validate")
		# if self.property_type == 'Flat':

		# 	amenity = frappe.db.sql(f""" Select amenity_name from `tabProperty Amenity Detail` where parent = "{self.name}" And parenttype ="Property" And amenity_name = "Tennis Courts";  """,as_dict=True)
		# 	print('\n')
		# 	print('\n')
		# 	print(amenity)
		# 	print('\n')
		# 	print('\n')
		# 	if amenity:
		# 		frappe.throw(f'you cannot add for property of type {self.property_type} amenity of <br>{amenity[0].amenity_name}</br>')
	
	
	# def validate(self):


	# 	# if self.property_type == 'Flat':

	# 		# amenity = frappe.db.sql(f""" Select amenity_name from `tabProperty Amenity Detail` where parent = "{self.name}" And parenttype ="Property" And amenity_name = "Tennis Courts";  """,as_dict=True)
	# 		# print('\n')
	# 		# print('\n')
	# 		# print(amenity)
	# 		# print('\n')
	# 		# print('\n')
	# 		# if amenity:
	# 		# 	frappe.throw(f'you cannot add amenity of type {self.name}')





		

	# 	if self.property_type == 'Flat':
	# 		for amenity in self.amenities:
	# 			if amenity.amenity_name == 'Tennis Courts':
	# 				frappe.throw(f'Property of type {self.property_type} cannot have <b>{amenity.amenity_name}</b>')


	# 	# property_doc = frappe.get_all("Property",fields = ['*'])
	# 	# print('\n')
	# 	# print('\n')
	# 	# print(property_doc[0])
	# 	# print('\n')
	# 	# print('\n')
	# 	# print('\n')
	# 	# print('\n')
	# 	# print(property_doc[1])
	# 	# print('\n')
	# 	# print('\n')
	# 	# frappe.throw(f'you are not allowed to save <b>{self.name}</b>')
