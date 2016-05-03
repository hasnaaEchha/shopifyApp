from django.db import models


class ShopifyKeys(models.Model):
    api_key = models.CharField(max_length=255, blank=True, null=True, unique=True)
    secret_key = models.CharField(max_length=255, blank=True, null=True)
    scope = models.CharField(default="read_orders,read_products", max_length=255)

    class Meta:
        db_table = 'shopify_keys'