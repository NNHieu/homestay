from django import template
from ..models import Homestay, validator_welcome_value

register = template.Library()


@register.filter
def welcomes_value2list(value):
    validator_welcome_value(value)
    W = Homestay.Welcome
    welcomes_list = []
    if value == W.ALL:
        return W.labels
    for key, label in W._value2label_map_.items():
        if key & value == key:
            welcomes_list.append(label)
    print(welcomes_list)
    return welcomes_list


@register.filter
def get_nav_links(names):
    names = names.split(',')
    links = {
        'home': 'homestay:index', 
        'about': 'homestay:about',
        'login': 'account:login',
        'logout': 'account:logout',
        'sign up': 'account:signup',
    }
    
    ret = []
    try:
        for name in names:
            ret.append((name, links[name]))
    except:
        pass
    return ret


@register.inclusion_tag('homestay/templatetags/welcomes.html')
def show_welcomes(value):
    welcomes = welcomes_value2list(value)
    show = ((label in welcomes, label) for label in Homestay.Welcome.labels)
    return {'show': show}


@register.inclusion_tag('homestay/templatetags/facilities.html')
def show_homestay_facilities(homestay):
    return {'facilities': homestay.facilities.filter(is_area_facility=False).filter(is_character=False)}


@register.inclusion_tag('homestay/templatetags/facilities.html')
def show_area_facilities(homestay):
    return {'facilities': homestay.facilities.filter(is_area_facility=True).filter(is_character=False)}