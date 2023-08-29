# about.py
import frappe


def get_context(context):
	

	
	# try:
	docname = frappe.form_dict.docname
	context.property = frappe.get_doc("Property",docname)
	context.agent = frappe.get_doc("Agent",context.property.agent)
   
	# except Exception as e:
	#     print(f"\n\n\nerror is here\n\n\n")
	#     frappe.local.flags.redirect_location = '/404'
	#     raise frappe.Redirect



	related_properties = frappe.db.sql(f"""
				select 
					creation
					,name
					,property_type
					,property_name
					,status
					,address
					,grand_total
					,image
					,agent 
					from 
						`tabProperty` 
					where 
						property_type = '{context.property.property_type}'
					And
						name != '{context.property.name}'
					order by 
						creation DESC 
					limit 3;
	""",as_dict=True)
	context.related_properties = related_properties
	
	
	return context
