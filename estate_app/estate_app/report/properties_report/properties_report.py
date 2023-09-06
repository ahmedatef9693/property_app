# Copyright (c) 2023, ahmed atef and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters=None):
	columns, data ,report_summary= [], [],[]
	calc_value = 500+600
	data , properties_count= getData(filters=filters)
	report_summary = get_report_summary(filters=filters,calc_value =properties_count)
	return getColumns(),  data,'',[],report_summary





def get_report_summary(filters,calc_value):
	return [
		{
			"value": calc_value,
			"label": ("Total Properties"),
			"datatype": "Int",
		},

	]

def getColumns():
	return[
		"name:Link/Property:100",
		"property name:Data:80",
		"Address:Data:80",
		"property_type:Data:50",
		"status:Data:50",
		"Price:Currency:100",
		"Discount:Currency:20",
		"Grand Total:Currency:150",
		"Agent:Link/Agent:100",
		"Agent Name:Data:100",
	]


def getData(filters):

	conditions = ""

	if(filters.get('property')):
		conditions += f"And name = '{filters.get('property')}'"
	if(filters.get('agent')):
		conditions += f"And agent = '{filters.get('agent')}'"
	if(filters.get('status')):
		conditions += f"And status = '{filters.get('status')}'" 

	data = frappe.db.sql(f"""
	select 
		name,	  
		property_name,
		address,
		property_type,
		status,
		property_price,
		discount,
		grand_total,
		agent,
		agent_name
	from 
		`tabProperty`
	where 
		creation between '{filters.get('from_date')}' And '{filters.get('to_date')}'
	{conditions}
	;
	""",as_dict=True)
	properties_count = len(data)
	return data , properties_count