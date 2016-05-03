__author__ = 'hasnaa'

from django.dispatch import receiver
from django.shortcuts import render
from django.http import HttpResponse
from django.template import Context, loader
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
import requests
import json

def home(request):
    return render(request, 'index.html', None)



def error404(request):

    # 1. Load models for this view
    #from idgsupply.models import My404Method

    # 2. Generate Content for this view
    template = loader.get_template('index.html')
    context = Context({
        'message': 'All: %s' % request,
        })

    # 3. Return Template for this view + Data
    return HttpResponse(content=template.render(context), content_type='text/html; charset=utf-8', status=404)

def get_products(request):
    out = {}
    shop_url = "https://globaldeal-2.myshopify.com/admin" % ("d04f20c9b6eff06f54b73746ebaf5478", "4c68946bcbb3d3e516e0d52b033f867f")

    print json.loads(shopify_request.get('https://globaldeal-2.myshopify.com/admin/assets.json').content)
    return HttpResponse(out, content_type="application/json")