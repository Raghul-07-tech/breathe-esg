from django.urls import path

from .views import (
    upload_csv,
    get_records,
    update_status
)

urlpatterns = [

    path(
        'upload/',
        upload_csv
    ),

    path(
        'records/',
        get_records
    ),

    path(
        'records/<int:pk>/',
        update_status
    ),
]
