from rest_framework.serializers import ModelSerializer
from base.models import Plant

class PlantSerializer(ModelSerializer):

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.tracked = validated_data.get('tracked', instance.tracked)
        instance.save()
        return instance
    class Meta:
        model = Plant
        fields = '__all__'