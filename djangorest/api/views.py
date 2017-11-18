# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import generics
from .serializers import *
from .models import *
from django.shortcuts import render

# Create your views here.
class CreateMunicipalityView(generics.ListCreateAPIView):
	"""This class defines the create behavior of our rest api."""
	queryset = Municipality.objects.all()
	serializer_class = MunicipalitySerializer

	def perform_create(self, serializer):
		serializer.save(
			municipality=self.request.POST['municipality'], 
			state=self.request.POST['state'], 
			country=self.request.POST['country'],
		)

class DetailsMunicipalityView(generics.RetrieveAPIView):
	"""Only handles GET"""
	queryset = Municipality.objects.all()
	serializer_class = MunicipalitySerializer

class CreateCategoryView(generics.ListCreateAPIView):
	"""This class defines the create behavior of our rest api."""
	queryset = Category.objects.all()
	serializer_class = CategorySerializer

	def perform_create(self, serializer):
		serializer.save(
			cid=self.request.POST['cid'], 
			description=self.request.POST['description'], 
		)

class DetailsCategoryView(generics.RetrieveAPIView):
	"""Only handles GET"""
	queryset = Category.objects.all()
	serializer_class = CategorySerializer


	
