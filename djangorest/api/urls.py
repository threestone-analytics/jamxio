from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = {
    url(r'^municipalities/$', CreateMunicipalityView.as_view(), name="create"),
    url(r'^municipalities/(?P<pk>[0-9]+)/$',
        DetailsMunicipalityView.as_view(), name="details"),
    url(r'^categories/$', CreateCategoryView.as_view(), name="create"),
    url(r'^categories/(?P<pk>[0-9]+)/$',
        DetailsCategoryView.as_view(), name="details"),
}

urlpatterns = format_suffix_patterns(urlpatterns)