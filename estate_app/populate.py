import requests
import random
import frappe
from faker import Faker
fake = Faker()



address = fake.profile().get('address').replace('\n',',')
status = ['Rent','Sale','Lease']
cities = [city.name for city in frappe.db.sql(f"""SELECT name from `tabCity`""",as_dict=True)]
property_types = [property_type.name for property_type in frappe.db.sql(f"""SELECT name from `tabProperty Type`""",as_dict=True)]
agents = [agent.name for agent in frappe.db.sql(f"""SELECT name from `tabAgent`""",as_dict=True)]
amenities = frappe.db.sql(f""" select amenity,amenity_price from `tabProperty Amenity Item` ;""",as_dict=True)
def populate_property():
    Faker.seed(0)
    api_url = 'https://api.unsplash.com/search/photos?client_id=YXzNqxN407rhwLXl3oy2u5bCZDvSGAL0Z3UPn-1Nmjs&query=house'
    img_api = requests.get(api_url)
    house_images = []
    # [amenities[random.randint(0,len(amenities)-1)]]
    for n in range(10):
        house_images.extend(
            {'doctype':'Property',
            'description':fake.paragraph(nb_sentences=5,variable_nb_sentences=False),
            'discount':random.randint(0,11),
            'property_price':random.randint(40000,10000000),
            'city':random.choice(cities),'property_type':random.choice(property_types),
            'status':random.choice(status),
            'agent':random.choice(agents),
            'address':fake.address().replace('\n',','),
            'property_name':i.get('alt_description'),
            'image':i.get('urls').get('small')
            } for i in img_api.json().get('results')
        )
    i = 0
    for house in house_images:
        try:
            doc = frappe.get_doc(house)
            doc.insert(ignore_permissions = True)
            print(f" property inserted \n {doc.name}")
        except Exception as e:
            pass
    frappe.db.commit()

def populate_amenities():
    data = frappe.db.sql(f"""select
                         pr.name as property_id
                         from 
                            `tabProperty` as pr
                         left join
                            `tabProperty Amenity Detail` as pad
                         on
                            pr.name = pad.parent
                         where
                            pad.parent is null
                         """,as_dict=True)
    for prop in data:
        doc = frappe.get_doc('Property',prop.property_id)
        random_data = [amenities[random.randint(0,len(amenities)-1)]]
        doc.append('amenities',{'amenity_name':random_data[0].get('amenity')}) 
        doc.save(ignore_permissions=True,ignore_version=True)
    frappe.db.commit()
