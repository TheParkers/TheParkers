from tkinter import E
from django.db import models
from apps.users.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from apps.maps.models import ParkerMap



class ParkingSpaceFeatures(models.Model):
    tpk_has_car_charging = models.BooleanField(default=False)
    tpk_has_car_wash = models.BooleanField(default=False)
    tpk_has_indoor_parking = models.BooleanField(default=False)

class ParkingSpace(models.Model):
    tpk_user =  models.ForeignKey(User,
                on_delete=models.CASCADE,
                related_name='user',
                null=True, blank=True)
    tpk_ps_location = models.OneToOneField(ParkerMap,
                on_delete=models.CASCADE,
                related_name='tpk_ps_location')
    tpk_rating = models.PositiveSmallIntegerField(default=1,
                validators=[MinValueValidator(1), MaxValueValidator(5)])
    tpk_description = models.TextField(max_length=500)
    tpk_parking_area = models.FloatField()
    tpk_has_features = models.BooleanField(default=False)
    tpk_vehicle_capacity = models.IntegerField()
    tpk_parking_features = models.OneToOneField(ParkingSpaceFeatures,
                        blank=True, null=True, on_delete=models.CASCADE,
                        related_name="tpk_parking_features")
    tpk_created_on = models.DateTimeField(auto_now_add=True)
    tpk_last_booked = models.DateTimeField()
    tpk_is_booked = models.BooleanField(default=False)

class ParkingSpaceImages(models.Model):
    tpk_parkingspace = models.ForeignKey(ParkingSpace,
                    related_name='tpk_parkingspace_images',
                    on_delete=models.CASCADE, null=True)
    tpk_image = models.ImageField()

def setUp(self, mock_user, mockParkingSpace, mock_perm):
        '''
        setup for test cases
        '''
        from django.utils import timezone
        from django.contrib.gis.geos import Point

        #ENTRY 1

        user_1 = User.objects.create(tpk_firebaseid="test_firebase_id",
                                    tpk_name="test",
                                    tpk_email="test_email@test.com")
        mock_user.return_value = user_1
        parkingspacefeature_1 = ParkingSpaceFeatures.objects.create(tpk_has_car_charging = True,
                                tpk_has_car_wash = False, tpk_has_indoor_parking = False)
        #note, other fields for map location are being defaulted.
        #you can provide the fields in create func as comma separated key values pair.
        map_location = ParkerMap.objects.create(location=Point(43.47620, -80.54525))
        mockParkingSpace.return_value = ParkingSpace.objects.create(tpk_parking_area = 100,
                                        tpk_has_features = True, tpk_vehicle_capacity = 1,
                                        tpk_ps_location = map_location,
                                        tpk_parking_features = parkingspacefeature_1,
                                        tpk_created_on = timezone.now(),
                                        tpk_last_booked = timezone.now(),
                                        tpk_is_booked = False,
                                        tpk_user = user_1)
        

        #ENTRY 2
        user_2 = User.objects.create(tpk_firebaseid="test_firebase_id2",
                                    tpk_name="test2",
                                    tpk_email="test_email2@test.com")
        mock_user.return_value = user_1
        parkingspacefeature_2 = ParkingSpaceFeatures.objects.create(tpk_has_car_charging = True,
                                tpk_has_car_wash = False, tpk_has_indoor_parking = True)
        #note, other fields for map location are being defaulted.
        #you can provide the fields in create func as comma separated key values pair.
        map_location = ParkerMap.objects.create(location=Point(43.47620, -80.54525))
        mockParkingSpace.return_value = ParkingSpace.objects.create(tpk_parking_area = 500,
                                        tpk_has_features = True, tpk_vehicle_capacity = 1,
                                        tpk_ps_location = map_location,
                                        tpk_parking_features = parkingspacefeature_2,
                                        tpk_created_on = timezone.now(),
                                        tpk_last_booked = timezone.now(),
                                        tpk_is_booked = False,
                                        tpk_user = user_2)





