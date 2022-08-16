from math import perm
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer, PlantSerializer
from base.models import Plant

from base.api import serializers


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/plants_data',
        '/api/update_plant/<str:pk>'
    ]
    return Response(routes)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class PlantsView(APIView):
    
    @permission_classes([IsAuthenticated])
    def get(self, request, *args, **kwargs):
        user = request.user
        plants = user.plant_set.all()
        serializer = PlantSerializer(plants, many=True)
        return Response(serializer.data)

class SpecificPlantView(APIView):
    
    def get_object(self, plant_id):
        try:
            return Plant.objects.get(id=plant_id)
        except Plant.DoesNotExist:
            return None
    
    @permission_classes([IsAuthenticated])
    def get(self, request, plant_id, *args, **kwargs):
        plant_instance = self.get_object(plant_id)
        if not plant_instance:
            return Response(
                {"res": "Object with this plant id does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = PlantSerializer(plant_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    def post(self, request, plant_id, *args, **kwargs):
        plant_instance = self.get_object(plant_id)
        serializer = PlantSerializer(instance=plant_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getPlants(request):
#     user = request.user
#     plants = user.plant_set.all()
#     serializer = PlantSerializer(plants, many=True)
#     return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def updatePlantTracking(request, pk):
#     plant = Plant.objects.get(id=pk)
#     serializer = PlantSerializer(instance=plant, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=400)
