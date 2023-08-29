import frappe



#recipients is a list of emails
#attachments is a print format

def send_mail(doc,recipients,msg,title,attachments = None):

	email_args = {
		'recipients':recipients,
		'message':msg,
		'subject':title,
		'reference_doctype':doc.doctype,
		'reference_name':doc.name,
	}
	
	if attachments:
		email_args['attachments'] = attachments

	#send mail
	frappe.enqueue(method=frappe.sendmail,queue = 'short',timeout=300,**email_args)




def paginate(doctype , page=0,paginate_by =4,proptype =None, status = None , city = None):
	prev_page = 0
	next_page = 2
	search = False
	conditions = ' '
	properties = ''
	if proptype and status and city:
		search = True
		conditions += f""" where property_type = '{proptype}' And status = '{status}' And city = '{city}' """

	
	count = frappe.db.sql(f"""Select count(name) as count from `tab{doctype}` {conditions} """,as_dict=True)[0].count
	


	query = f"""
			select name,
			property_name,
			status,
			address,
			grand_total,
			image
			from `tab{doctype}`
			{conditions}
			order by creation Desc """

	if page:
		page = int(page)
		properties = frappe.db.sql(query + f"""LIMIT {(page * paginate_by) - paginate_by},{paginate_by};""",as_dict =True)
		next_set = frappe.db.sql(query + f"""LIMIT {(page * paginate_by)} , {paginate_by} """,as_dict=True)

		if next_set:
			prev_page = page - 1
			next_page = page + 1 
		else:
			prev_page = page - 1
			next_page = 0


	else:
		if count:
			if count < paginate_by:
				prev_page = 0
				next_page = 2
				properties = frappe.db.sql(query + f"""LIMIT {paginate_by};""",as_dict=True)
			else:
				properties = frappe.db.sql(query + f"""LIMIT {paginate_by};""",as_dict=True)
	series_count = int(count/paginate_by)
	return {
		'properties':properties,
		'next':next_page,
		'prev':prev_page,
		'series_count':series_count,
		'search':search
	}






















	















	