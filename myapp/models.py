# models.py
from django.db import models

class Bookings(models.Model):
    first_name = models.CharField(max_length=255)
    reservation_date = models.DateField()
    reservation_slot = models.AutoField(primary_key=True)

    def __str__(self):
        return self.name
class New(models.Model):
    field1 = models.CharField(max_length=255)
    field2 = models.IntegerField()
