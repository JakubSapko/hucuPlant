from rest_framework.serializers import ModelSerializer
from base.models import Plant

class PlantSerializer(ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'