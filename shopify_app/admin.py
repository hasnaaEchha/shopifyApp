__author__ = 'hasnaa'

from django.views.generic import TemplateView
from django.contrib import admin
from django.contrib.auth.models import Permission


class PartialGroupView(TemplateView):
    def get_context_data(self, **kwargs):
        context = super(PartialGroupView, self).get_context_data(**kwargs)
        # update the context
        return context