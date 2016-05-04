from django.conf.urls import patterns, include, url
from django.contrib import admin
import settings
from shopify_app.admin import PartialGroupView
from shopify_app import views


urlpatterns = patterns('',
                       # Examples:
                       url(r'^$', 'shopify_app.views.home', name='home'),
                       url(r'^shopify_app/getProducts/$', 'shopify_app.views.get_products', name='home'),

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

urlpatterns += patterns('imex.view',
                        url(r'^imex/track/$',
                            'track', name='track'),
                        url(r'^imex/updateSetting/$',
                            'update_setting', name='update_setting'),
                        url(r'^imex/getKeys/$',
                            'get_keys', name='get_keys'),

)
# account manager

handler404 = views.error404