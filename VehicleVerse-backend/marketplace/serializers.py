from rest_framework import serializers
from .models import Vehicle, Rental, CustomUser
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone_number', 'date_joined', 'address')


class VehicleSerializer(serializers.ModelSerializer):
    seller = serializers.SerializerMethodField()

    class Meta:
        model = Vehicle
        fields = '__all__'

    def get_seller(self, obj):
        return obj.user.username.capitalize() if obj.user else None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['seller'] = self.get_seller(instance)
        return representation


class RentalSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()

    class Meta:
        model = Rental
        fields = '__all__'

    def get_owner(self, obj):
        return obj.user.username.capitalize() if obj.user else None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['owner'] = self.get_owner(instance)
        return representation
