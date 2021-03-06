from django.conf.urls import patterns, include, url
from django.contrib import admin
import settings
from shopify_app.admin import PartialGroupView
from shopify_app import views
from django.views.generic.base import RedirectView


urlpatterns = patterns('',
                       # Examples:
                       url(r'^$', 'shopify_app.views.home', name='home'),
                       #url(r'^favicon\.ico$', RedirectView.as_view(url='/static/favicon.ico', permanent=True)),
                       url(r'^admin', include(admin.site.urls)),


)

urlpatterns += patterns('',
                        url(r'^templates/shopify_app/import_products/importProducts.html$',
                            PartialGroupView.as_view(template_name='shopify_app/import_products/importProducts.html'),
                            name='import_products'),
                        url(r'^templates/shopify_app/settings/imexSettings.html$',
                            PartialGroupView.as_view(template_name='shopify_app/settings/imexSettings.html'),
                            name='imexSettings'),
                        url(r'^templates/shopify_app/tracking/tracking.html$',
                            PartialGroupView.as_view(template_name='shopify_app/tracking/tracking.html'),
                            name='tracking'),

)
urlpatterns += patterns('shopify_app.views',
                        url(r'^shopify_app/get_products/$',
                            'get_products', name='get_products'),
                        url(r'^shopify_app/get_invasion_categories/$',
                            'get_invasion_categories', name='get_invasion_categories'),
                        url(r'^shopify_app/create_token/$',
                            'create_token', name='create_token'),
                        url(r'^shopify_app/export_products/$',
                            'export_products', name='export_products_to_shopify'),
                        url(r'^shopify_app/getInvasionCategoryTotal/$',
                            'get_chinavasion_cat_total', name='get_chinavasion_cat_total'),

)


# account manager

handler404 = views.error404
