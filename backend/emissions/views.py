import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import EmissionRecord
from .serializers import EmissionRecordSerializer


@api_view(['POST'])
def upload_csv(request):

    file = request.FILES['file']

    source_type = request.data.get('source_type')

    df = pd.read_csv(file)

    created = []

    for _, row in df.iterrows():

        activity = str(row.get('activity_type', 'Unknown'))

        amount = float(row.get('amount', 0))

        unit = str(row.get('unit', ''))

        suspicious = False

        if amount <= 0 or amount > 10000:
            suspicious = True

        carbon_kg = amount * 2.5

        record = EmissionRecord.objects.create(
            source_type=source_type,
            activity_type=activity,
            amount=amount,
            unit=unit,
            carbon_kg=carbon_kg,
            suspicious=suspicious,
        )

        created.append(record.id)

    return Response({
        "message": "Upload successful",
        "records_created": len(created)
    })


@api_view(['GET'])
def get_records(request):

    records = EmissionRecord.objects.all().order_by('-uploaded_at')

    serializer = EmissionRecordSerializer(records, many=True)

    return Response(serializer.data)


@api_view(['PATCH'])
def update_status(request, pk):

    record = EmissionRecord.objects.get(id=pk)

    status = request.data.get('status')

    record.status = status

    record.save()

    return Response({
        "message": "Status updated"
    })
