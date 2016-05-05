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
admin_token = ""

def home(request):
    return render(request, 'index.html', None)

def get_products(request):
        out = {}

        request_data = json.loads(request.body)
        store_url = request_data['shop']
        code = request_data['token']
        client_id = "96f604950d6a94b17031adcefa8148a5"
        client_secret = "01ac8cee614321f6e76f079dcd729a7e"

        data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
        }
        url = '{}{}'.format('https://'+store_url,'/admin/oauth/access_token')
        print url
        headers = {'content-type': 'application/json'}
        r = requests.post(
            url,
            data=json.dumps(data),
            headers=headers

        )
        print r.status_code
        if r.status_code is 200:
            r = json.loads(r.content)
            token = r['access_token']
            headers = {'content-type': 'application/json', 'X-Shopify-Access-Token': token}
            url = '{}{}'.format("https://"+store_url, "/admin/products.json")
            products = requests.get(url, headers=headers)
            products = products.json()


        store_url = request_data['adminShop']
        code = request_data['adminToken']
        global admin_token
        if len(admin_token) is 0:
            data = {
                'client_id': client_id,
                'client_secret': client_secret,
                'code': code,
            }
            url = '{}{}'.format('https://'+store_url,'/admin/oauth/access_token')
            print url
            headers = {'content-type': 'application/json'}
            r = requests.post(
                url,
                data=json.dumps(data),
                headers=headers

            )
            print r.status_code
            if r.status_code is 200:
                r = json.loads(r.content)
                admin_token = r['access_token']
                url = '{}{}'.format("https://"+store_url, "/admin/products.json")
                headers = {'content-type': 'application/json', 'X-Shopify-Access-Token': admin_token}
                print products
                for product in products['products']:
                    print product
                    data={
                        "product": json.load(product)
                    }
                    print str(product['title'])
                    r = requests.post(
                        url,

                        data=data,
                        headers=headers
                    )
                    print r.status_code
                    r=json.loads(r.content)
                    print r
        else:
            url = '{}{}'.format("https://"+store_url, "/admin/products.json")
            global admin_token
            headers = {'content-type': 'application/json', 'X-Shopify-Access-Token': admin_token}
            print products
            for product in products['products']:
                print product
                data={
                    "product": json.load(product)
                }
                print str(product['title'])
                r = requests.post(
                    url,

                    data=data,
                    headers=headers
                )
                print r.status_code
                r=json.loads(r.content)
                print r
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