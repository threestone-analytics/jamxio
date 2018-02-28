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
		self.client = APIClient()
		self.municipality_data = {'municipality': 'Guadalajara II', 'state': 'Jalisco', 'country': 'Mexico'}
		self.response = self.client.post(
			reverse('create_municipality'), 
			self.municipality_data, 
			format="json"
		)

	def test_properly_posts_to_municipality(self):
		self.assertEquals(self.response.status_code, status.HTTP_201_CREATED)

class CategoryTestCase(TestCase):
	"""This is a basic model for municipality"""
	def setUp(self):
		self.client = APIClient()
		self.category_data = {'cid': 'Miscelaneous', 'description': 'Nope'}

		self.response = self.client.post(
			reverse('create_category'), 
			self.category_data, 
			format="json"
		)


	def test_try_category_post(self):
		self.assertEquals(self.response.status_code, status.HTTP_201_CREATED)

class PollutantSourceTestCase(TestCase):
	"""This is a basic model for municipality"""
	def setUp(self):
		self.category = Category(cid="Oil")
		self.category.save()
		self.client = APIClient()
		self.source_data = {
			'name': 'Offshore Oil Drill',
			'description': 'Burns Oil',
			'latitude': 0, 
			'longitude': 0, 
			'category': 'Oil'
			}

		self.response = self.client.post(
			reverse('create_source'), 
			self.source_data, 
			format="json"
		)
		print self.response


	def test_try_category_post(self):
		self.assertEquals(self.response.status_code, status.HTTP_201_CREATED)
		




