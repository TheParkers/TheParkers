from django.contrib.postgres.constraints import ExclusionConstraint
from django.contrib.postgres.fields import (
    DateTimeRangeField,
    RangeBoundary,
    RangeOperators,
)
from django.db import models
from django.db.models import Func, Q
from apps.users.models import User
from apps.parkingspace.models import ParkingSpace

# Create your models here.
class TsTzRange(Func):
    function = 'TSTZRANGE'
    output_field = DateTimeRangeField()

class BookingItems(models.Model):
    tpk_parkingspace = models.ForeignKey(ParkingSpace, related_name='tpk_parkingspace', on_delete=models.CASCADE, null=True, blank=True)
    tpk_booking_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tpk_user', null=True, blank=True)
    tpk_book_start_datetime = models.DateTimeField()
    tpk_book_end_datetime = models.DateTimeField()
    #tpk_hourly_rate = models.DecimalField(max_digits=6, decimal_places=2)
    tpk_book_cancelled = models.BooleanField(default=False)

    class Meta:
        constraints = [
            ExclusionConstraint(
                name='exclude_overlapping_booking',
                expressions=(
                    (TsTzRange('tpk_book_start_datetime', 'tpk_book_end_datetime', RangeBoundary()), RangeOperators.OVERLAPS),
                    ('tpk_parkingspace', RangeOperators.EQUAL),
                ),
                condition=Q(tpk_book_cancelled=False),
            ),
        ]