import frappe



jenvs = {
    "methods": [
        "exp:estate_app.jinja.exp",
        
    ],
    "filters": [
        "add:estate_app.jinja.add"
    ]
}




# Methods

def exp(num):
    return float(num)**2


def add(v1, v2):
    return float(v1) + float(v2)
