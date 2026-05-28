from django.db import models


class EmissionRecord(models.Model):

    SOURCE_CHOICES = [
        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
    ]

    source_type = models.CharField(max_length=20, choices=SOURCE_CHOICES)

    activity_type = models.CharField(max_length=100)

    amount = models.FloatField()

    unit = models.CharField(max_length=50)

    carbon_kg = models.FloatField(default=0)

    suspicious = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.source_type} - {self.activity_type}"
