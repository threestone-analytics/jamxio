# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Add these imports at the top
from rest_framework.test import APIClient
from rest_framework import status
from django.core.urlresolvers import reverse
from django.test import TestCase
from .models import *

# Create your tests here.
class MunicipalityTestCase(TestCase):
	"""This is a basic model for municipality"""

	def setUp(self):
		# old_count = Municipality.objects.count()
		# self.municipality = Municipality()
		# self.municipality.municipality = "Guadalajara"
		# self.municipality.state = "Jalisco"
		# self.municipality.country = "Mexico"
		# self.municipality.save()
		# new_count = Municipality.objects.count()
		# self.assertNotEquals(old_count, new_count)
		self.client = APIClient()
		self.municipality_data = {'municipality': 'Guadalajara', 'state': 'Jalisco', 'country': 'Mexico'}
		self.response = self.client.post(
			reverse('create'), 
			self.municipality_data, 
			format="json"
		)

	def test_api_can_create_municipality(self):
		self.assertEquals(self.response.status_code, status.HTTP_201_CREATED)

class CategoryTestCase(TestCase):
	"""This is a basic model for municipality"""
	def regularSetUp(self):
		old_count = Category.objects.count()
		self.category = Category()
		self.category.cid = "Miscelaneous"
		self.category.save()
		new_count = Category.objects.count()
		print "DESCRIPTION!!!!"
		print self.category.description
		self.assertNotEquals(old_count, new_count)
		self.assertEquals(self.category.description, "No description provided.")


	def postSetUp(self):
		# self.assertNotEquals(old_count, new_count)
		self.client = APIClient()
		self.category_data = {'cid': 'Miscelaneous', 'description': "NONE"}

		self.response = self.client.post(
			reverse('create'), 
			self.category_data, 
			format="json"
		)

	def test_api_can_create_category(self):
		self.assertEquals(self.response.status_code, status.HTTP_201_CREATED)




