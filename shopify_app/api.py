__author__ = 'hasnaa'

class Shopify:


    def set_url(self, url):
        self.url = url

    def get_orders(self):
        return "/admin/orders.json"

    def get_orders_filtred_by_date(self, date_min,date_max):
        return"/admin/orders.json?created_at_min="+date_min+"&created_at_max="+date_max
class ShopifyMongo:
    def __init__(self, shopify_order, store_url, status=None, order_id=None):
        self.order_id = str(order_id)
        self.shipping_last_name = shopify_order['shipping_address']['last_name']
        self.shipping_first_name = shopify_order['shipping_address']['first_name']
        self.shipping_street_address = shopify_order['shipping_address']['address1']
        self.shipping_street_address2 = shopify_order['shipping_address']['address2']
        self.shipping_city = shopify_order['shipping_address']['city']
        self.shipping_country = shopify_order['shipping_address']['country']
        self.shipping_country_code = shopify_order['shipping_address']['country_code']
        self.shipping_latitude = shopify_order['shipping_address']['latitude']
        self.shipping_longitude = shopify_order['shipping_address']['longitude']
        self.customers_telephone = shopify_order['shipping_address']['phone']
        self.shipping_state = shopify_order['shipping_address']['province']
        self.shipping_postcode = shopify_order['shipping_address']['zip']
        self.billing_last_name = shopify_order['billing_address']['last_name']
        self.billing_first_name = shopify_order['billing_address']['first_name']
        self.billing_street_address = shopify_order['billing_address']['address1']
        self.billing_street_address2 = shopify_order['billing_address']['address2']
        self.billing_city = shopify_order['billing_address']['city']
        self.billing_country = shopify_order['billing_address']['country']
        self.billing_country_code = shopify_order['billing_address']['country_code']
        self.billing_latitude = shopify_order['billing_address']['latitude']
        self.billing_longitude = shopify_order['billing_address']['longitude']
        self.billing_state = shopify_order['billing_address']['province']
        self.billing_postcode = shopify_order['billing_address']['zip']
        self.ip_address = shopify_order['browser_ip']
        self.sku = shopify_order['line_items'][0]['sku']
        self.order_sales_tax = shopify_order['total_price']
        if len(shopify_order['fulfillments']) is not 0:
            self.tracking_number = shopify_order['fulfillments'][0]['tracking_number']
        self.store_url = store_url
        self.status = status
        self.workflow = "new"
        self.weight = str(shopify_order['total_weight'])

    def __getitem__(self, key):
        return self[key]