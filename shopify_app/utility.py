__author__ = 'hasnaa'

import shopify
from models import ShopifyKeys
from common.httpUtil import *
from django.http import HttpResponse
from bson.json_util import dumps
import json
import requests

api_key = ""
api_secret = ""





def get_setting():
    if ShopifyKeys.objects.count() == 0:
        return None
    else:
        return ShopifyKeys.objects()[0]

def get_setting():
    if ShopifyKeys.objects.count() == 0:
        return None
    else:
        return ShopifyKeys.objects()[0]


def set_api():
    if get_setting() is not None:
        global api_key
        api_key = get_setting().api_key
        global api_secret
        api_secret = get_setting().api_secret
set_api()

def update_setting(request):
    out = {}
    data = json.loads(request.body)
    shopify_setting = data['setting']
    shopify_connection = ShopifyKeys(**shopify_setting)
    old_setting = get_setting()
    if old_setting is not None and old_setting.api_secret is not None and old_setting.api_key is not None:
        shopify_connection_to_delete = ShopifyKeys.objects.get(api_key=old_setting.api_key)
        shopify_connection_to_delete.delete()
    shopify_connection.save()
    set_api()
    out = json.dumps(out)
    return HttpResponse(out, content_type="application/json")



def get_orders_filtred_by_date(request):
    out = {}
    out['orders'] = []
    zip_code_not_found = []
    repeat_sku = set()
    repeat_zip = set()
    sku_not_found = []
    data = json.loads(request.body)
    url = data['url']
    date_from = data['dateFrom']
    date_to = data['dateTo']
    token = get_auth(url)
    if token is not None:
        headers = {'content-type': 'application/json', 'X-Shopify-Access-Token': token}
        shopify_helper = Shopify()
        out['orders'] = get("https://"+url, headers, shopify_helper.get_orders_filtred_by_date(date_from,date_to))
        for order in out['orders']['orders']:
            order['sku'] = order['line_items'][0]['sku']
            if not sku_exist(order):
                if order['sku'] not in repeat_sku:
                    sku_not_found.append(order['sku'])
                    repeat_sku.add(order['sku'])
            order['shipping_postcode'] = order['shipping_address']['zip']
            if not zip_code_exist(order):
                if order['shipping_postcode'] not in repeat_zip:
                    zip_code_not_found.append(order['shipping_postcode'])
                    repeat_zip.add(order['shipping_postcode'])
        out['zip_codes_not_found'] = zip_code_not_found
        out['skus_not_found'] = sku_not_found
    out = json.dumps(out)
    return HttpResponse(out, content_type="application/json")


def get_orders(request):
    out = {}
    out['orders'] = []
    data = json.loads(request.body)
    url = data['url']
    token = get_auth(url)
    if token is not None:
        headers = {'content-type': 'application/json', 'X-Shopify-Access-Token': token}
        shopify_helper = Shopify()
        out['orders'] = get("https://"+url, headers, shopify_helper.get_orders())
    out = json.dumps(out)
    return HttpResponse(out, content_type="application/json")