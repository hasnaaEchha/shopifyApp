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
from django.forms.models import model_to_dict


def home(request):
    return render(request, 'index.html', None)

def create_token(request):
    out={}
    request_data = json.loads(request.body)
    store_url = request_data['shop']
    code = request_data['code']
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
    r = json.loads(r.content)
    out['token']=r
    out = json.dumps(out)
    return HttpResponse(out, content_type="application/json")
def create_product(title, body_html, product_type, image, price,store_url, token):
    data={
        "product": {
            "title": title,
            "body_html": body_html,
            "product_type": product_type,
            "images":[{"src":image}],
            "variants":{"price":price},
            "published":True
        }
    }
    url = '{}{}'.format("https://"+store_url, "/admin/products.json")
    headers = {'content-type': 'application/json', 'X-Shopify-Access-Token': token}
    r = requests.post(
        url,

        data=json.dumps(data),
        headers=headers
    )


def get_chinavasion_products(category_name,api_key, start, count):
    data = {
            "key": api_key,
            "categories": [category_name],
            "pagination":{
                "start":start,
                "count":count
            }
    }
    url = '{}{}'.format('https://secure.chinavasion.com','/api/getProductList.php')
    headers = {'content-type': 'application/json'}
    r = requests.post(
        url,
        data=json.dumps(data),
        headers=headers

    )
    result = json.loads(r.content)
    return result['products']

def get_product_from_vasion_by_cat(category_name,api_key):
    start = 0
    result = []
    get_prod_bool=True
    count=10
    while get_prod_bool:
        data = {
                "key": api_key,
                "categories": [category_name],
                "pagination":{
                    "start":start,
                    "count":count
                }
        }
        url = '{}{}'.format('https://secure.chinavasion.com','/api/getProductList.php')
        print url
        headers = {'content-type': 'application/json'}
        r = requests.post(
            url,
            data=json.dumps(data),
            headers=headers

        )
        result_prod = json.loads(r.content)
        print result_prod, start
        
        for prod in result_prod['products']:
            result.append(prod)
        if start+count>=result_prod['pagination']['total']:
            print 'hehooo'
            get_prod_bool=False
        start = start +result_prod['pagination']['count']
        """
        if result_prod['pagination']['total']-start<count:
            count = result_prod['pagination']['total']-start
        """
        print result_prod['pagination']['total']
    print len(result)
    return result

def get_product_by_title(title,store_url,token):
    headers = {'content-type': 'application/json', 'X-Shopify-Access-Token': token}
    url = '{}{}'.format("https://"+store_url, "/admin/products.json?metafield="+title)
    products = requests.get(url, headers=headers)
    products = products.json()
    return products

def export_products(request):
    out = {}
    request_data = json.loads(request.body)
    store_url = request_data['shop']
    token = request_data['token']
    category_name = request_data['categoryName']
    api_key = request_data['apiKey']
    start = request_data['start']
    count = request_data['count']
    products = get_chinavasion_products(category_name,api_key, start, count)
    out['count'] = len(products)
    for product in products:
        create_product(product['short_product_name'],product['overview'],product['category_name'],product['main_picture'],float(product['price']),store_url,token)
    out = json.dumps(out)
    return HttpResponse(out, content_type="application/json")


def export_products_to_shopify(request):
    out = {}
    request_data = json.loads(request.body)
    store_url = request_data['shop']
    token = request_data['token']
    category_name = request_data['categoryName']
    api_key = request_data['apiKey']
    client_id = "96f604950d6a94b17031adcefa8148a5"
    client_secret = "01ac8cee614321f6e76f079dcd729a7e"
    url = '{}{}'.format("https://"+store_url, "/admin/products.json")
    headers = {'content-type': 'application/json', 'X-Shopify-Access-Token': token}
    products = get_product_from_vasion_by_cat(category_name,api_key)
    out['count'] = len(products)
    for product in products:

        create_product(product['short_product_name'],product['overview'],product['category_name'],product['main_picture'],store_url,token)
    
    out = json.dumps(out)
    return HttpResponse(out, content_type="application/json")

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
                    product=json.dumps(product)
                    data={
                        "product": json.loads(product)
                        #"title": str(product['title'])
                    }
                    r = requests.post(
                        url,

                        data=json.dumps(data),
                        headers=headers
                    )
                    print r.status_code
                    r = json.loads(r.content)
                    print r
        else:
            url = '{}{}'.format("https://"+store_url, "/admin/products.json")
            global admin_token
            headers = {'content-type': 'application/json', 'X-Shopify-Access-Token': admin_token}
            for product in products['products']:
                #product = model_to_dict(product)

                data = {
                    "title": str(product['title'])
                }
                r = requests.post(
                    url,

                    data=json.dumps(data),
                    headers=headers
                )
                print r.status_code
                r=json.loads(r.content)
                print r
        out['token'] = admin_token
        out = json.dumps(out)
        return HttpResponse(out, content_type="application/json")

def get_chinavasion_cat_total(request):
    request_data = json.loads(request.body)
    category_name = request_data['categoryName']
    api_key = request_data['apiKey']
    data = {
            "key": api_key,
            "categories": [category_name]

    }
    url = '{}{}'.format('https://secure.chinavasion.com','/api/getProductList.php')
    print url
    headers = {'content-type': 'application/json'}
    r = requests.post(
        url,
        data=json.dumps(data),
        headers=headers

    )
    result_prod = json.loads(r.content)
    out={}
    out['total']=result_prod['pagination']['total']
    out['category_name']=category_name
    out = json.dumps(out)
    return HttpResponse(out, content_type="application/json")
def get_invasion_categories(request):
    request_data = json.loads(request.body)

    api_key=request_data['apiKey']
    data = {
            "key": api_key,
            "include_content": "0"
    }
    url = '{}{}'.format('https://secure.chinavasion.com','/api/getCategory.php')
    print url
    headers = {'content-type': 'application/json'}
    r = requests.post(
        url,
        data=json.dumps(data),
        headers=headers

    )
    out=json.loads(r.content)
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