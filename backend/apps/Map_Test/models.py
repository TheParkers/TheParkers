from django.db import models

# Create your models here.
class GCoordList(models.Model):
    Lat_db = models.CharField(max_length=100)
    Long_db = models.CharField(max_length=100)

    # class Meta:
    #     app_label = 'Map_Test'

    def __str__(self):
        coords = (self.Lat_db,self.Long_db)
        return coords