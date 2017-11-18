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
		print "Creating new Municipality"
		serializer.save()

class DetailsMunicipalityView(generics.RetrieveAPIView):
	"""Only handles GET"""
	queryset = Municipality.objects.all()
	serializer_class = MunicipalitySerializer

class CreateCategoryView(generics.ListCreateAPIView):
	"""This class defines the create behavior of our rest api."""
	queryset = Category.objects.all()
	serializer_class = CategorySerializer

	def perform_create(self, serializer):
		print "Creating new Category"
		serializer.save()

class DetailsCategoryView(generics.RetrieveAPIView):
	"""Only handles GET"""
	queryset = Category.objects.all()
	serializer_class = CategorySerializer

class CreatePollutantSourceView(generics.ListCreateAPIView):
	"""This class defines the create behavior of our rest api."""
	queryset = PollutantSource.objects.all()
	serializer_class = PollutantSourceSerializer

	def perform_create(self, serializer):
		print "Create Pollutant Data"
		serializer.save()

class DetailsPollutantSourceView(generics.RetrieveAPIView):
	"""Only handles GET"""
	queryset = PollutantSource.objects.all()
	serializer_class = PollutantSourceSerializer




	
