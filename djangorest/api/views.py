# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import generics
from .serializers import *
from django.http import HttpResponse
from .models import *
from django.shortcuts import render
import os

# Create your views here.
def GetDistrictInformation(request, district):
	base = os.path.dirname(os.path.abspath(__file__))
	print base
	path = base + "/districts/" + district + ".json"
	with open(path , 'r') as myfile:
		data=myfile.read()
	print data
	response = HttpResponse(content=data)
	response['Content-Type'] = 'application/json'
	return response


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

class CreateReportView(generics.ListCreateAPIView):
	"""This class defines the create behavior of our rest api."""
	queryset = Report.objects.all()
	serializer_class = ReportPostSerializer

	def perform_create(self, serializer):
		serializer.save()

class DetailsReportView(generics.RetrieveAPIView):
	"""Only handles GET"""
	queryset = Report.objects.all()
	serializer_class = ReportGetSerializer




	
