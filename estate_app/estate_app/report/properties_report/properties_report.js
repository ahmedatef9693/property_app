// Copyright (c) 2023, ahmed atef and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["properties report"] = {
  filters: [
    {
      fieldname: "property",
      label: "Property Name",
      fieldtype: "Link",
      options: "Property",
      width: 100,
      reqd: 0,
    },
    {
      fieldname: "from_date",
      label: "From Date",
      fieldtype: "Date",
      default: dateutil.year_start(),
      width: 80,
      reqd: 1,
    },
    {
      fieldname: "to_date",
      label: "To Date",
      fieldtype: "Date",
      default: dateutil.year_end(),
      width: 80,
      reqd: 1,
    },
    {
      fieldname: "agent",
      label: "Agent Name",
      fieldtype: "Link",
      options: "Agent",
      width: 100,
      reqd: 0,
    },
    {
      fieldname: "status",
      label: "Status",
      fieldtype: "Select",
      default: "",
      options: ["", "Rent", "Sale", "Lease"],
      width: 100,
      reqd: 0,
    },
  ],
};
