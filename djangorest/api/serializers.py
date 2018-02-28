from rest_framework import serializers
from .models import *

class MunicipalitySerializer(serializers.ModelSerializer):

	class Meta:
		model = Municipality
		fields = ('id', 'municipality', 'state', 'country')

class CategorySerializer(serializers.ModelSerializer):

	class Meta:
		model = Category
		fields = ('cid', 'description')

class PollutantSourceSerializer(serializers.ModelSerializer):

	class Meta:
		model = PollutantSource
		fields = ('id', 'name', 'latitude', 'longitude', 'category')

class ReportPostSerializer(serializers.ModelSerializer):

	class Meta:
		model = Report
		fields = ('id', 'name', 'text', 'latitude', 'longitude', 'category', 'url')

class ReportGetSerializer(serializers.ModelSerializer):

	class Meta:
		model = Report
		fields = ('id', 'name', 'status', 'text', 'latitude', 'longitude', 'category', 'url')
