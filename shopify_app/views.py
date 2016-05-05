__author__ = 'hasnaa'

from django.dispatch import receiver
from django.shortcuts import render
from django.http import HttpResponse
from django.template import Context, loader
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
import requests
import json
import shopify

def home(request):
    return render(request, 'index.html', None)

def get_products(request):
        out = {}

        data = json.loads(request.body)
        store_url = data['shop']
        code = data['token']
        client_id = "96f604950d6a94b17031adcefa8148a5"
        client_secret = "01ac8cee614321f6e76f079dcd729a7e"


        data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
        }
        url = '{}{}'.format('https://'+store_url,'/admin/oauth/access_token')

        headers = {'content-type': 'application/json'}
        r = requests.post(
            url,
            data=json.dumps(data),
            headers=headers

        )
        print url
        print code
        print r
        if r.status_code is 200:
            r = json.loads(r.content)
            token = r['access_token']
            headers = {'content-type': 'application/json', 'X-Shopify-Access-Token': token}
            products = requests.get("https://"+store_url+"/products/admin.json", headers)
            products = products.content
            print products.title
            print dir(products)
        """
        session = shopify.Session(store_url)
        print store_url
        token = session.request_token({'client_id':client_id,'client_secret':client_secret,'code':code,'timestamp':timestamp})
        print token

        session = shopify.Session(store_url, token)
        shopify.ShopifyResource.activate_session(session)
        shop = shopify.Shop.current()
        product = shopify.Product.find(179761209)
        print product
        """
        out = json.dumps(out)
        return HttpResponse(out, content_type="application/json")



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