# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Municipality(models.Model):
	municipality = models.CharField(max_length=100, blank=False)
	state = models.CharField(max_length=100, blank=False)
	country = models.CharField(max_length=100, blank=False)

	def __str__(self):
		return self.municipality + ", " + self.state + ", " + self.country

class Category(models.Model):
	cid = models.CharField(max_length=100, blank=False, primary_key=True)
	description = models.TextField()

	def save(self, *args, **kwargs):
		if not self.description:
			self.description = "No description provided."
		super(Category, self).save(*args, **kwargs)
		