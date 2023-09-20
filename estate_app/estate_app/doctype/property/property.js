// Copyright (c) 2023, ahmed atef and contributors
// For license information, please see license.txt
var deletedList = [];
frappe.ui.form.on("Property", {
  //   setup: function (frm) {
  //     console.log(frm);
  //   },
  refresh: function (frm) {
    //check amenities duplicate values
    frm.checkDuplicate = function (frm, row) {
      frm.doc.amenities.forEach((element) => {
        if (
          element.amenity_name === row.amenity_name &&
          element.idx !== row.idx
        ) {
          row.amenity_name = "";
          row.amenity_price = "";
          frappe.msgprint(
            `element = ${element.amenity_name} = row ${row.amenity_name}`
          );
        } else {
        }
      });
    };

    frm.check_flat_against_outdoor = function (frm, row) {
      if (
        frm.doc.property_type === "Flat" &&
        row.amenity_name === "Outdoor Kitchen"
      ) {
        row.amenity_name = " ";
        row.amenity_price = " ";
        frm.refresh_field("amenities");
        frappe.throw(`property ${frm.doc.property_type} cannot be in a flat`);
      }
    };

    frm.computeTotal = (frm) => {
      let total = 0;

      if (frm.doc.amenities) {
        if (frm.doc.amenities.length > 0) {
          frm.doc.amenities.forEach((element) => {
            total += element.amenity_price;
            console.log(total);
          });
        }
      }

      total += frm.doc.property_price;
      if (frm.doc.discount) {
        let discount = frm.doc.discount / 100;
        total = total - total * discount;
        console.log("total = " + total);
        console.log("discount = " + discount);
      }
      frm.set_value("grand_total", total);
    };

    frm.add_custom_button(
      "Set Address",
      function () {
        frappe.prompt("Address", ({ value }) => {
          if (value) {
            frm.set_value("address", value);
            frm.refresh_field("address");
            frappe.msgprint(`address field updated with ${value}`);
          }
        });
      },
      "Actions"
    );
    frm.add_custom_button(
      "check_property_type",
      function () {
        frappe.call({
          method:
            "estate_app.estate_app.doctype.property.api.check_property_type",
          args: {
            property_type: frm.doc.property_type,
          },
          callback: (response) => {
            let body = "";
            if (response.message.length > 0) {
              response.message.forEach((element) => {
                body += `visit : <a href="${element.name}"><strong>${element.name}</strong></a>  <br>`;
              });
              let header = `here is the docs and links for type <strong>${frm.doc.property_type}</strong> <br>`;

              frappe.msgprint(header + body);
            }
          },
        });
      },
      "Actions"
    );

    frm.copyDiscountData = function (frm) {
      frm.doc.amenities.forEach((amenity) => {
        amenity.discount = frm.doc.discount;
      });
      frm.refresh_field("amenities");
    };
  },
  property_price(frm) {
    // if (frm.doc.amenities) {
    frm.computeTotal(frm);
    // }
  },
  discount(frm) {
    // if (frm.doc.amenities) {
    frm.computeTotal(frm);
    //copy discount data
    if (frm.doc.amenities) {
      frm.copyDiscountData(frm);
    }
    // }
  },
  map(frm) {
    let map_data = "";
    try {
      map_data = JSON.parse(frm.doc.map).features[0].geometry;
    } catch (err) {
      console.log(err);
    }
    if (map_data && map_data.type === "Point") {
      let longitude = map_data.coordinates[0];
      let latitude = map_data.coordinates[1];
      console.log(longitude, latitude);
      //api call
      frappe.call({
        type: "GET",
        url: `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        callback: function (r) {
          frm.set_value("address", r.display_name);
        },
      });
    }
  },
});

frappe.ui.form.on("Property Amenity Detail", {
  amenity_name: function (frm, cdt, cdn) {
    let row = frappe.get_doc(cdt, cdn);
    console.log(row);

    frm.check_flat_against_outdoor(frm, row);
    frm.checkDuplicate(frm, row);
    if (frm.doc.amenities) {
      frm.copyDiscountData(frm);
    }

    frm.computeTotal(frm);
  },
  amenities_remove: function (frm, cdt, cdn) {
    // console.log(cdt);

    deletedList.push(cdn);
    // console.log(deletedList);
    // console.log(frappe.get_doc(cdt, cdn));
    // let row = locals[frm.doctype][frm.docname];
    // console.log(row);
    // frappe.call({
    //   method: "frappe.client.get",
    //   args: {
    //     doctype: frm.doctype,
    //     name: frm.docname,
    //   },
    //   callback: function (response) {
    //     let doc = response.message;
    //     let row = doc.amenities.find((row) => row.name === cdn);
    //     console.log("row:", row);
    //     frm.computeTotal(frm);
    //   },
    // });
  },
  amenities_add: function (frm, cdt, cdn) {
    let rowAdded = frappe.get_doc(cdt, cdn);
    console.log("added" + rowAdded.amenity_name);
  },
});

// frappe.ui.form.on("Property Amenity Detail", {
//   amenity_name: function (frm, cdt, cdn) {
//     frm.doc.amenities.forEach((element) => {
//       let row = frappe.get_doc(cdt, cdn);
//       if (row.idx !== element.idx) {
//         if (element.amenity_name === row.amenity_name) {
//           console.log("element : " + element.amenity_name);
//           console.log("row : " + row.amenity_name);
//         }
//       }
//     });
//   },
// });
