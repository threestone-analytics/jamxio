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

	def __str__(self):
		return self.cid

class PollutantSource(models.Model):
	name = models.CharField(max_length=100, blank=False)
	description = models.TextField(blank=False)
	latitude = models.DecimalField(blank=False, max_digits=10, decimal_places=8)
	longitude = models.DecimalField(blank=False, max_digits=10, decimal_places=8)
	category = models.ForeignKey(Category)

	def __str__(self):
		return name

class Report(models.Model):
	
	name = models.CharField(max_length=100, blank=False)
	status = models.CharField(max_length=100)
	text = models.TextField(blank=False)
	latitude = models.DecimalField(max_digits=10, decimal_places=8, blank=True, null=True)
	longitude = models.DecimalField(max_digits=10, decimal_places=8, blank=True, null=True)
	url = models.CharField(max_length=100, blank=True, null=True)

	category = models.ForeignKey(Category, blank=True, null=True)

	def save(self, *args, **kwargs):
		if not self.status:
			self.status = "Open"

		
		super(Report, self).save(*args, **kwargs)


		